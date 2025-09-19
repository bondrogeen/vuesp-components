export interface IListItem {
  id: number;
  name: string;
  type?: string;
  icon?: string;
  event?: string;
  value?: string | number | boolean;
}

export interface IMenuChild {
  name: string;
  path?: string;
}

export interface IMenuItem {
  name: string;
  icon: string;
  path: string;
  children?: IMenuChild[];
}

export interface IDialog {
  message?: string;
  title?: string;
  value?: boolean;
  callback?: () => void;
}

export interface ITextFieldFile {
  name: string;
  size: number;
}
export interface ITextFieldInfo {
  files: ITextFieldFile[];
  totalSize: number;
}
export interface ITextFieldEvent {
  files: any;
  info?: ITextFieldInfo;
}
