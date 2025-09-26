import type { IListItem } from '@/types/types';
export interface IDashboardItemOptions {
  disabled?: boolean | number;
  min?: number;
  max?: number;
  step?: number;
}

export interface IDashboardItem {
  id: string;
  name: string;
  type: string;
  icon: string;
  value: string | number;
  convert: string;
  options?: IDashboardItemOptions;
  list?: IListItem[];
  parameters: string[];
  get: string[];
  set?: string[];
  modify?: string[];
}

export interface IDashboardItemString extends Omit<IDashboardItem, 'get' | 'set' | 'modifyValue'> {
  get?: string;
  set?: string;
  modifyValue?: string;
}

export interface IDashboard {
  items: Map<string, IDashboardItem>;
  data: any;
  removeItem: (id: string) => void;
  editItem: (id: string, item: IDashboardItemString) => void;
  setData: (data: any) => IDashboard;
  getData: () => any;
  saveList: () => string;
  getList: () => IDashboardItem[];

  get: (id: string) => any;
  set: (id: string, value: any) => any;
}

type GetTypeByPath<T, Path extends string> = Path extends keyof T ? T[Path] : Path extends `${infer K}.${infer R}` ? (K extends keyof T ? GetTypeByPath<T[K], R> : never) : never;

export type TypeGetDataValue = <T extends string, S>(key: T, main: S) => GetTypeByPath<S, T> | undefined;
