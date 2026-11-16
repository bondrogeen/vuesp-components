import type { Component } from 'vue';

export type TBlockFieldType = 'number' | 'string' | 'boolean';

export interface IBlockField {
  key: string;
  label: string;
  type: TBlockFieldType;
  group?: string;
  block?: string;
  advanced?: boolean;
  plain?: boolean;
  previewKey?: string;
  formatFor?: string;
  unit?: string;
  default?: string | number | boolean;
  hint?: string;
}

export type TBlockMetricGroup = 'solar' | 'grid' | 'battery' | 'house' | 'inverter';

export type TMetricSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

export type TMetricColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'danger';

export type TMetricWeight = 'normal' | 'medium' | 'semibold';

export type TMetricAlign = 'left' | 'right';

export interface IMetricStyle {
  size?: TMetricSize;
  color?: TMetricColor;
  weight?: TMetricWeight;
  align?: TMetricAlign;
}

export interface IBlockMetric {
  id: string;
  label: string;
  value: string;
  format: string;
  style?: IMetricStyle;
}

export interface IBlockResolvedMetric {
  id: string;
  label: string;
  value: string;
  raw: unknown;
  style: Required<IMetricStyle>;
}

export interface IBlockBindingExpression {
  expr: string;
  fallback?: string | number | boolean;
}

export type TBlockBinding = string | IBlockBindingExpression;

export interface IBlockBindings {
  [key: string]: TBlockBinding;
}

export interface IBlockConfig {
  id: string;
  type: string;
  provider?: string;
  title?: string;
  bindings: IBlockBindings;
  units?: Record<string, string>;
  metricArgs?: Partial<Record<TBlockMetricGroup, string[]>>;
  metrics?: Partial<Record<TBlockMetricGroup, IBlockMetric[]>>;
}

export interface IBlockContext {
  kind: 'device' | 'hub' | 'yandex' | 'custom';
  roots: Record<string, unknown>;
  get(path: string): unknown;
  helpers?: Record<string, (...args: unknown[]) => unknown>;
  meta?: Record<string, unknown>;
}

export type IBlockData = IBlockContext;

export interface IBlockDefinition {
  type: string;
  defaultId?: string;
  name: string;
  description?: string;
  icon?: string;
  component: Component;
  fields: IBlockField[];
  defaults?: IBlockBindings;
  metricArgs?: Partial<Record<TBlockMetricGroup, string[]>>;
  metrics?: Partial<Record<TBlockMetricGroup, IBlockMetric[]>>;
}

export interface IBlockResolvedData {
  [key: string]: unknown;
}

export interface IBlockStorage {
  read(): Promise<IBlockConfig[]>;
  write(blocks: IBlockConfig[]): Promise<void>;
}
