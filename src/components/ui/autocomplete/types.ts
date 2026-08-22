import type { IListItem } from '@/types';

export { IListItem };

export interface IVAutocompleteProps<T> {
  modelValue?: string | number | undefined;
  label: string;
  name?: string;
  message?: string;
  items: T[];
}
export interface IVAutocompleteEmits<T> {
  (e: 'update:modelValue', value: string): void;
  (e: 'select', item: T): void;
}
