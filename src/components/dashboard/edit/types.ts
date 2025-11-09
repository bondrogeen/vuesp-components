import type { IDashboardItem, IListItem, IDashboardItemOptions, TypeValueDashboardItemOptions } from '@/types/types';

export interface IItemEditProps {
  item: IDashboardItem;
  object: object;
}

export interface IItemEditEmits {
  (e: 'button', key: string, value: IDashboardItem): void;
}

export interface IItemOptionsProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: number;
  list?: IListItem[];
  value?: string | number;
  type: string;
}
export interface IItemOptionsEmits {
  (e: 'update', key: keyof IDashboardItemOptions, value: TypeValueDashboardItemOptions): void;
}
