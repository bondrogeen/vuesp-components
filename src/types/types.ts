export interface IListItem {
  id: number;
  name: string;
  type?: string;
  icon?: string;
  event?: string;
}

export interface ISelectList {
  name: string;
  value: string | number;
}
export interface IWSSend {
  comm: string;
  data?: any;
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

export interface IStateInfo {
  id?: number;
  firmware?: number[];
  totalBytes?: number;
  usedBytes?: number;
  uptime?: number;
  name?: string;
}
export interface IStateFile {
  key: number;
  isDir: number;
  isFile: number;
  command?: number;
  size?: number;
  name?: string;
}

export interface IStateScan {
  key: number;
  id: number;
  isHidden: number;
  encryptionType: number;
  channel: number;
  rssi: number;
  ssid: string;
}

export interface IGpio {
  key: number;
  command: number;
  gpio: number;
  mode: number;
  value: number;
  interrupt: number;
  disabled: number;
}

export interface IStateMain {
  info?: IStateInfo;
  gpio: Record<string, IGpio>;
  device: any;
  dallas: any;
}
export interface IStateSettings {
  key?: number;
  wifiDhcp?: number;
  wifiMode?: number;
  authMode?: number;
  version?: number;
  device?: number;
  wifiIp?: number[];
  wifiSubnet?: number[];
  wifiGateway?: number[];
  wifiDns?: number[];
  wifiSsid?: string;
  wifiPass?: string;
  authLogin?: string;
  authPass?: string;
}

export interface IStateWebSocket {
  fileList: IStateFile[];
  scanList: IStateScan[];
  path: string[];
  settings: IStateSettings;
  main: IStateMain;
  progress: any;
}

export interface INotificationItem {
  id?: number;
  text?: string;
  timeout?: number;
}
export interface IStateApp {
  menu: IMenuItem[];
  isLoading: boolean;
  theme: string;
  dialog: IDialog;
  notifications: INotificationItem[];
  struct: {};
}

export interface IPropertyString {
  id: string;
  name: string;
  keyValue: string;
  icon?: string;
  type?: string;
  min?: number;
  max?: number;
  list?: ISelectList[];
  get?: string;
  set?: string;
  modifyValue?: string;
}

export interface IProperty {
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

export interface IWSSend {
  comm: string;
  data?: any;
}

export interface IWebSocket {
  socket: WebSocket | null;
  pingClient: number;
  pingDevice: number;
  struct: any;
}

export interface IListWiFi {
  name: string;
  value: number;
}

export interface INotificationItem {
  id?: number;
  text?: string;
  timeout?: number;
}
export interface IStateApp {
  menu: IMenuItem[];
  isLoading: boolean;
  theme: string;
  dialog: IDialog;
  notifications: INotificationItem[];
  struct: {};
}
