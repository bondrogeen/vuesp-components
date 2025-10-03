export interface IListItem {
  id?: number;
  name: string;
  value: string | number;
}

export interface IMenuItem {
  name: string;
  icon: string;
  path: string;
  children?: IMenuItem[];
}

export interface IDialog {
  message?: string;
  title?: string;
  value?: boolean;
  callback?: () => void;
}

export interface VListObjectReturnData {
  key: string;
  path: string;
  isObject: boolean;
}
