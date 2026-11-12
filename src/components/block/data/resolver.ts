import type {
  BlockFieldType,
  BlockMetricGroup,
  IBlockConfig,
  IBlockContext,
  IBlockDefinition,
  IBlockMetric,
  IBlockResolvedData,
  IBlockResolvedMetric,
} from './types';

import { DEFAULT_METRIC_STYLE } from './metricStyles';

const PATH_PATTERN = /^[A-Za-z_$][\w$]*(\.[\w$]+)+$/;
const IDENTIFIER_PATTERN = /^[A-Za-z_$][\w$]*$/;
const RESERVED_WORDS = new Set([
  'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
  'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import',
  'in', 'instanceof', 'let', 'new', 'null', 'return', 'static', 'super', 'switch', 'this', 'throw',
  'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
]);

export const MAX_METRICS = 10;
export const MAX_METRIC_ARGS = 4;
export const METRIC_ARG_LABELS = ['a', 'b', 'c', 'd'] as const;

const isScopeKey = (key: string): boolean => IDENTIFIER_PATTERN.test(key) && !RESERVED_WORDS.has(key);

const evaluate = (expression: string, scope: Record<string, unknown>): unknown => {
  try {
    const keys = Object.keys(scope).filter(isScopeKey);
    const values = keys.map((key) => scope[key]);
    const fn = new Function(...keys, `"use strict"; return (${expression});`);

    return fn(...values);
  } catch {
    return undefined;
  }
};

const evaluateValue = (expression: string, scope: Record<string, unknown>, context: IBlockContext): unknown => {
  if (!expression.trim()) return undefined;

  const value = evaluate(expression, scope);

  if (value === undefined && PATH_PATTERN.test(expression)) return context.get(expression);

  return value;
};

const formatMetricValue = (value: unknown): string => {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'да' : 'нет';
  if (typeof value === 'number') return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));

  return String(value);
};

const displayLineBreaks = (value: string): string => value.replace(/<br\s*\/?>/gi, '\n');

const normalizeNumber = (value: unknown): unknown =>
  typeof value === 'number' && !Number.isFinite(value) ? undefined : value;

const coerce = (value: unknown, type: BlockFieldType): unknown => {
  if (value === undefined || value === null || value === '') return undefined;

  if (type === 'number') {
    const number = typeof value === 'number' ? value : Number.parseFloat(String(value));

    return Number.isFinite(number) ? number : undefined;
  }

  if (type === 'boolean') {
    if (typeof value === 'boolean') return value;

    return value === 1 || value === '1' || value === 'true';
  }

  return String(value);
};

const toNumber = (value: unknown): number => {
  const number = typeof value === 'number' ? value : Number.parseFloat(String(value));

  return Number.isFinite(number) ? number : 0;
};

const helperScope = (context: IBlockContext): Record<string, unknown> => ({
  ...context.helpers,
  ...context.roots,
  get: context.get,
  num: (value: unknown) => toNumber(value),
  scale: (value: unknown, factor = 1, offset = 0) => toNumber(value) * factor + offset,
  round: (value: unknown, digits = 0) => Number(toNumber(value).toFixed(digits)),
  clamp: (value: unknown, min: number, max: number) => Math.min(max, Math.max(min, toNumber(value))),
});

export const resolveMetricArgValues = (
  args: string[],
  context: IBlockContext,
  data: IBlockResolvedData,
): unknown[] => {
  const scope = { ...helperScope(context), ...data };

  return args
    .slice(0, MAX_METRIC_ARGS)
    .map((expression) => normalizeNumber(evaluateValue(expression, scope, context)));
};

export const resolveMetric = (
  metric: IBlockMetric,
  args: string[],
  context: IBlockContext,
  data: IBlockResolvedData,
): IBlockResolvedMetric => {
  const scope = { ...helperScope(context), ...data };

  args.slice(0, MAX_METRIC_ARGS).forEach((expression, index) => {
    scope[METRIC_ARG_LABELS[index]] = normalizeNumber(evaluateValue(expression, scope, context));
  });

  let value = normalizeNumber(evaluateValue(metric.value, scope, context));

  if (value === undefined) value = scope.a;
  scope.v = value;
  scope.a = scope.a ?? value;

  let formatted: string | undefined;

  if (metric.format.trim() && value !== undefined && value !== null) {
    const result = normalizeNumber(evaluateValue(metric.format, scope, context));

    if (result !== undefined && result !== null) formatted = String(result);
  }

  return {
    id: metric.id,
    label: metric.label.trim() || 'Показатель',
    value: displayLineBreaks(formatted ?? formatMetricValue(value)),
    raw: value,
    style: { ...DEFAULT_METRIC_STYLE, ...metric.style },
  };
};

export const resolveBlockMetrics = (
  definition: IBlockDefinition,
  config: IBlockConfig,
  context: IBlockContext,
  data: IBlockResolvedData,
): Record<string, IBlockResolvedMetric[]> => {
  const groups = new Set<BlockMetricGroup>([
    ...(Object.keys(definition.metrics ?? {}) as BlockMetricGroup[]),
    ...(Object.keys(config.metrics ?? {}) as BlockMetricGroup[]),
  ]);
  const result: Record<string, IBlockResolvedMetric[]> = {};

  for (const group of groups) {
    const metrics = config.metrics?.[group] ?? definition.metrics?.[group] ?? [];
    const args = config.metricArgs?.[group] ?? definition.metricArgs?.[group] ?? [];

    result[group] = metrics.slice(0, MAX_METRICS).map((metric) => resolveMetric(metric, args, context, data));
  }

  return result;
};

export const resolveBlockBindings = (
  definition: IBlockDefinition,
  config: IBlockConfig,
  context: IBlockContext,
): IBlockResolvedData => {
  const scope: Record<string, unknown> = helperScope(context);
  const result: IBlockResolvedData = {};

  for (const field of definition.fields) {
    const binding = config.bindings[field.key];
    const expression = typeof binding === 'string' ? binding : binding?.expr;
    const fallback = typeof binding === 'object' ? binding?.fallback : undefined;

    let value: unknown;

    if (field.formatFor) scope.v = result[field.formatFor];

    if (expression) {
      value = evaluate(expression, scope);

      if (value === undefined && PATH_PATTERN.test(expression)) {
        value = context.get(expression);
      }
    }

    const next = coerce(value ?? fallback ?? field.default, field.type);

    result[field.key] = next;
    scope[field.key] = next;
  }

  result.metrics = resolveBlockMetrics(definition, config, context, result);

  return result;
};

