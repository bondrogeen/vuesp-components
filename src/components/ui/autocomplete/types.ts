import type { IListItem } from '@/types';

export { IListItem };

export interface IVAutocompleteProps {
  modelValue?: string | number | undefined;
  label: string;
  name?: string;
  message?: string;
  items: IListItem[];
}
export interface IVAutocompleteEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'select', item: IListItem): void;
}
