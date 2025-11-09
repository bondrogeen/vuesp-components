import type { IListItem } from '@/types/types';

export { IListItem };

export interface IVAutocompleteProps {
  modelValue?: string | number | undefined;
  label: string;
  name?: string;
  message?: string;
  list: IListItem[];
}
export interface IVAutocompleteEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'select', item: IListItem): void;
}
