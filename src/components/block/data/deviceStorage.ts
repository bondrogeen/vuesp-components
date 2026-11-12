import type { BlockMetricGroup, IBlockConfig, IBlockMetric, IBlockStorage, IMetricStyle } from './types';

const DEFAULT_FILE_PATH = '/tmp/blocks.json';
const FS_PATH = '/fs';
const VERSION = 1;
const MAX_BLOCKS = 8;
const MAX_METRICS = 10;
const MAX_METRIC_ARGS = 4;
const MAX_EXPRESSION = 512;
const MAX_METRIC_LABEL = 64;
const MAX_BYTES = 8192;
const LEGACY_KEYS = ['vuesp.blocks', 'vuesp.block.energy'];

const METRIC_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
const METRIC_COLORS = ['default', 'muted', 'primary', 'success', 'warning', 'danger'];
const METRIC_WEIGHTS = ['normal', 'medium', 'semibold'];
const METRIC_ALIGNS = ['left', 'right'];

interface IStoredMetric {
  i: string;
  l: string;
  v: string;
  f: string;
  s?: IMetricStyle;
}

interface IStoredBlock {
  i: string;
  t: string;
  p?: string;
  m: IBlockConfig['bindings'];
  u?: Record<string, string>;
  A?: Partial<Record<BlockMetricGroup, string[]>>;
  g?: Partial<Record<BlockMetricGroup, IStoredMetric[]>>;
}

interface IStoredFile {
  v: number;
  b: IStoredBlock[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const pickStyle = (value: unknown): IMetricStyle | undefined => {
  if (!isRecord(value)) return undefined;

  const style: IMetricStyle = {};
  if (typeof value.size === 'string' && METRIC_SIZES.includes(value.size)) style.size = value.size as IMetricStyle['size'];
  if (typeof value.color === 'string' && METRIC_COLORS.includes(value.color)) style.color = value.color as IMetricStyle['color'];
  if (typeof value.weight === 'string' && METRIC_WEIGHTS.includes(value.weight)) style.weight = value.weight as IMetricStyle['weight'];
  if (typeof value.align === 'string' && METRIC_ALIGNS.includes(value.align)) style.align = value.align as IMetricStyle['align'];

  return Object.keys(style).length ? style : undefined;
};

const decodeMetric = (value: unknown): IBlockMetric | null => {
  if (!isRecord(value) || typeof value.i !== 'string' || !value.i) return null;

  return {
    id: value.i,
    label: typeof value.l === 'string' ? value.l : '',
    value: typeof value.v === 'string' ? value.v : '',
    format: typeof value.f === 'string' ? value.f : '',
    style: pickStyle(value.s),
  };
};

const decodeMetricArgs = (value: unknown): IBlockConfig['metricArgs'] => {
  if (!isRecord(value)) return undefined;

  const result: Partial<Record<BlockMetricGroup, string[]>> = {};

  for (const [group, list] of Object.entries(value)) {
    if (!Array.isArray(list)) continue;

    result[group as BlockMetricGroup] = list
      .filter((arg): arg is string => typeof arg === 'string')
      .slice(0, MAX_METRIC_ARGS);
  }

  return Object.keys(result).length ? result : undefined;
};

const decodeMetrics = (value: unknown): IBlockConfig['metrics'] => {
  if (!isRecord(value)) return undefined;

  const result: Partial<Record<BlockMetricGroup, IBlockMetric[]>> = {};

  for (const [group, list] of Object.entries(value)) {
    if (!Array.isArray(list)) continue;

    const metrics = list
      .map(decodeMetric)
      .filter((metric): metric is IBlockMetric => metric !== null)
      .slice(0, MAX_METRICS);

    if (metrics.length || Array.isArray(list)) result[group as BlockMetricGroup] = metrics;
  }

  return Object.keys(result).length ? result : undefined;
};

const encodeMetrics = (metrics: IBlockConfig['metrics']): Partial<Record<BlockMetricGroup, IStoredMetric[]>> | undefined => {
  if (!metrics) return undefined;

  const result: Partial<Record<BlockMetricGroup, IStoredMetric[]>> = {};

  for (const [group, list] of Object.entries(metrics)) {
    if (!list) continue;

    result[group as BlockMetricGroup] = list.map((metric) => ({
      i: metric.id,
      l: metric.label,
      v: metric.value,
      f: metric.format,
      ...(metric.style && Object.keys(metric.style).length ? { s: metric.style } : {}),
    }));
  }

  return Object.keys(result).length ? result : undefined;
};

const sanitizeMetric = (metric: IBlockMetric): IBlockMetric => ({
  id: metric.id.slice(0, 64),
  label: String(metric.label ?? '').slice(0, MAX_METRIC_LABEL),
  value: String(metric.value ?? '').slice(0, MAX_EXPRESSION),
  format: String(metric.format ?? '').slice(0, MAX_EXPRESSION),
  ...(metric.style ? { style: pickStyle(metric.style) } : {}),
});

const sanitizeMetricArgs = (args: IBlockConfig['metricArgs']): IBlockConfig['metricArgs'] => {
  if (!args) return undefined;

  const result: Partial<Record<BlockMetricGroup, string[]>> = {};

  for (const [group, list] of Object.entries(args)) {
    if (!Array.isArray(list)) continue;

    result[group as BlockMetricGroup] = list
      .slice(0, MAX_METRIC_ARGS)
      .map((arg) => String(arg).slice(0, MAX_EXPRESSION));
  }

  return Object.keys(result).length ? result : undefined;
};

const sanitizeMetrics = (metrics: IBlockConfig['metrics']): IBlockConfig['metrics'] => {
  if (!metrics) return undefined;

  const result: Partial<Record<BlockMetricGroup, IBlockMetric[]>> = {};

  for (const [group, list] of Object.entries(metrics)) {
    if (!list) continue;

    result[group as BlockMetricGroup] = list.slice(0, MAX_METRICS).map(sanitizeMetric);
  }

  return Object.keys(result).length ? result : undefined;
};

const decodeBlocks = (payload: unknown): IBlockConfig[] => {
  if (Array.isArray(payload)) return payload as IBlockConfig[];

  if (isRecord(payload) && typeof payload.type === 'string' && isRecord(payload.bindings)) {
    return [payload as unknown as IBlockConfig];
  }

  if (!isRecord(payload) || !Array.isArray(payload.b)) return [];

  return payload.b
    .filter(isRecord)
    .map((item) => ({
      id: String(item.i ?? ''),
      type: String(item.t ?? ''),
      provider: item.p ? String(item.p) : undefined,
      bindings: isRecord(item.m) ? (item.m as IBlockConfig['bindings']) : {},
      units: isRecord(item.u) ? (item.u as Record<string, string>) : undefined,
      metricArgs: decodeMetricArgs(item.A),
      metrics: decodeMetrics(item.g),
    }))
    .filter((block) => block.id && block.type);
};

const encodeBlocks = (blocks: IBlockConfig[]): IStoredFile => ({
  v: VERSION,
  b: blocks.map((block) => ({
    i: block.id,
    t: block.type,
    ...(block.provider ? { p: block.provider } : {}),
    m: block.bindings,
    ...(block.units && Object.keys(block.units).length ? { u: block.units } : {}),
    ...(block.metricArgs && Object.keys(block.metricArgs).length ? { A: block.metricArgs } : {}),
    ...(block.metrics && Object.keys(block.metrics).length ? { g: encodeMetrics(block.metrics) } : {}),
  })),
});

const sanitizeBlocks = (blocks: IBlockConfig[]): IBlockConfig[] => {
  const cleaned = blocks.slice(0, MAX_BLOCKS).map((block) => ({
    ...block,
    bindings: Object.fromEntries(
      Object.entries(block.bindings)
        .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, MAX_EXPRESSION) : value] as const)
        .filter(([, value]) => value !== ''),
    ),
    metricArgs: sanitizeMetricArgs(block.metricArgs),
    metrics: sanitizeMetrics(block.metrics),
  }));

  while (cleaned.length > 0 && JSON.stringify(encodeBlocks(cleaned)).length > MAX_BYTES) {
    cleaned.pop();
  }

  return cleaned;
};

const legacyBlocks = (): IBlockConfig[] => {
  for (const key of LEGACY_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const decoded = decodeBlocks(JSON.parse(raw) as unknown);
      if (decoded.length) return decoded;
    } catch {
      // Ignore broken legacy settings.
    }
  }

  return [];
};

const clearLegacy = () => {
  for (const key of LEGACY_KEYS) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors.
    }
  }
};

/**
 * Block settings stored on a vuesp device via the /fs endpoint.
 * The compact format is designed for LittleFS: short keys and hard limits.
 */
export const createDeviceBlockStorage = (filePath = DEFAULT_FILE_PATH): IBlockStorage => {
  const write = async (blocks: IBlockConfig[]): Promise<void> => {
    const body = new FormData();
    body.append('file[0]', new Blob([JSON.stringify(encodeBlocks(sanitizeBlocks(blocks)))], { type: 'application/json' }), filePath);

    const response = await fetch(FS_PATH, { method: 'POST', body });

    if (!response.ok) throw new Error(`Не удалось сохранить настройки блока: HTTP ${response.status}`);
  };

  const read = async (): Promise<IBlockConfig[]> => {
    try {
      const response = await fetch(`${FS_PATH}?file=${filePath}`);

      if (response.ok) {
        const decoded = decodeBlocks((await response.json()) as unknown);
        if (decoded.length) return decoded;
      }
    } catch {
      // Fall back to legacy localStorage settings.
    }

    const legacy = legacyBlocks();
    if (legacy.length) {
      try {
        await write(legacy);
        clearLegacy();
      } catch {
        // Keep legacy settings in memory even if the device is unavailable.
      }
    }

    return legacy;
  };

  return { read, write };
};

export const deviceBlockStorage = createDeviceBlockStorage();
