export interface IVSelectProps<T> {
  modelValue: string | number;
  label?: string;
  items: T[];
}

export interface IVSelectEmits<T> {
  (e: 'select', item: T): void;
}
