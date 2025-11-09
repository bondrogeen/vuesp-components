import type { IListItem } from '@/types/types';

export { IListItem };

export interface IVSelectProps {
  value?: number | string;
  label: string;
  disabled?: boolean | number;
  list: IListItem[];
}
export interface IVSelectEmits {
  (e: 'update:modelValue', value: Event): void;
  (e: 'change', item: IListItem): void;
}
