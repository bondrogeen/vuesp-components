import type { IMetricStyle, MetricAlign, MetricColor, MetricSize, MetricWeight } from './types';

export const DEFAULT_METRIC_STYLE: Required<IMetricStyle> = {
  size: 'sm',
  color: 'default',
  weight: 'semibold',
  align: 'right',
};

export const METRIC_SIZE_CLASS: Record<MetricSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export const METRIC_COLOR_CLASS: Record<MetricColor, string> = {
  default: 'text-gray-dark-40 dark:text-white',
  muted: 'text-gray-dark-25 dark:text-gray-main',
  primary: 'text-cyan-main',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-rose-600 dark:text-rose-400',
};

export const METRIC_WEIGHT_CLASS: Record<MetricWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
};

export const METRIC_ALIGN_CLASS: Record<MetricAlign, string> = {
  left: 'text-left',
  right: 'text-right',
};

export const METRIC_SIZE_OPTIONS: Array<{ value: MetricSize; name: string }> = [
  { value: 'xs', name: 'Мелкий' },
  { value: 'sm', name: 'Обычный' },
  { value: 'base', name: 'Средний' },
  { value: 'lg', name: 'Крупный' },
  { value: 'xl', name: 'Очень крупный' },
];

export const METRIC_COLOR_OPTIONS: Array<{ value: MetricColor; name: string }> = [
  { value: 'default', name: 'Основной' },
  { value: 'muted', name: 'Приглушённый' },
  { value: 'primary', name: 'Акцент' },
  { value: 'success', name: 'Успех' },
  { value: 'warning', name: 'Внимание' },
  { value: 'danger', name: 'Опасность' },
];

export const METRIC_WEIGHT_OPTIONS: Array<{ value: MetricWeight; name: string }> = [
  { value: 'normal', name: 'Обычное' },
  { value: 'medium', name: 'Среднее' },
  { value: 'semibold', name: 'Полужирное' },
];

export const METRIC_ALIGN_OPTIONS: Array<{ value: MetricAlign; name: string }> = [
  { value: 'left', name: 'Слева' },
  { value: 'right', name: 'Справа' },
];

export const metricClasses = (style?: IMetricStyle): string => {
  const resolved = { ...DEFAULT_METRIC_STYLE, ...style };

  return [
    METRIC_SIZE_CLASS[resolved.size],
    METRIC_COLOR_CLASS[resolved.color],
    METRIC_WEIGHT_CLASS[resolved.weight],
    METRIC_ALIGN_CLASS[resolved.align],
  ].join(' ');
};
