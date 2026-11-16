import type { IVListObjectReturnData } from '@/types/components';

export interface IVListProps<T> {
  items: T[];
  
  plain?: boolean;
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
  (e: 'click', data: IVListObjectReturnData): void;
}
