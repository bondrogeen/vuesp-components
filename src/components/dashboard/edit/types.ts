import type { IDashboardItem, IListItem, IDashboardItemOptions, TypeValueDashboardItemOptions } from '@/types';

export interface IItemEditProps {
  item: IDashboardItem;
  object: object;
  listDashboard: IListItem[];
  listIcons: IListItem[];
}

export interface IItemEditEmits {
  (e: 'button', key: string, value: IDashboardItem): void;
}

export interface IItemOptionsProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: number;
  items?: IListItem[];
  value?: string | number;
  type: string;
}
export interface IItemOptionsEmits {
  (e: 'update', key: keyof IDashboardItemOptions, value: TypeValueDashboardItemOptions): void;
}
