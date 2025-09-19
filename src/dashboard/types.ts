export interface ISelectList {
  name: string;
  value: string | number;
}

export interface IDashboardItem {
  id: string;
  name: string;
  keyValue: string;
  type?: string;
  icon?: string;
  value?: any;
  min?: number;
  max?: number;
  list?: ISelectList[];
  get?: (output: any) => any;
  set?: (output: any, value: any) => any;
  modifyValue?: (value: any) => any;
  getItem?: (output: any) => any;
  setItem?: (output: any, value: any) => any;
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
