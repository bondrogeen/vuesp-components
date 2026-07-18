export interface IVSelectProps<T> {
  modelValue: string | number;
  label?: string;
  disabled?: boolean;
  items: T[];
}

export interface IVSelectEmits<T> {
  (e: 'change', item: T): void;
}
