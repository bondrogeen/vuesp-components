import type { IDashboardItem, IListItem, IDashboardItemOptions, TypeValueDashboardItemOptions } from '@/types';

export interface IItemEditProps {
  items: IDashboardItem[];
  item: IDashboardItem | null;
  object: object;
  listDashboard: IListItem<string>[];
  listIcons: IListItem<string>[];
}

export interface IItemEditEmits {
  (e: 'button', key: string, value: IDashboardItem): void;
}

export interface IItemOptionsProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: number;
  items?: IListItem<string>[];
  value?: string | number;
  type: string;
}
export interface IItemOptionsEmits {
  (e: 'update', key: keyof IDashboardItemOptions, value: TypeValueDashboardItemOptions): void;
}
