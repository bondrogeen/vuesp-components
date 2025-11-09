import type { IListItem } from '@/types/types';
import type { VListObjectReturnData } from '@/types/components';

export { IListItem };

export interface IVListProps {
  list: IListItem[];
  className?: string;
}
export interface IVListEmits {
  (e: 'click', value: IListItem, event: Event): void;
}

export interface IVListObjectProps {
  items: object;
  path?: string;
  onlyValue?: boolean;
}
export interface IVListObjectEmits {
  (e: 'click', data: VListObjectReturnData): void;
}
