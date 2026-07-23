import type { VListObjectReturnData } from '@/types/components';

export interface IVListProps<T> {
  items: T[];
}
export interface IVListEmits<T> {
  (e: 'click', value: T, event: Event): void;
}

export interface IVListObjectProps {
  items: object;
  path?: string;
  onlyValue?: boolean;
}
export interface IVListObjectEmits {
  (e: 'click', data: VListObjectReturnData): void;
}
