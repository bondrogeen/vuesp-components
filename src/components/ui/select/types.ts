import { IVDropdownProps } from '../dropdown/types';

export interface IVSelectProps<T> extends IVDropdownProps {
  modelValue: string | number;
  label?: string;
  disabled?: boolean;
  items: T[];
}

export interface IVSelectEmits<T> {
  (e: 'change', item: T): void;
}
