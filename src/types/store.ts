import type { IMenuItem, IDialog } from './components';

export interface IStorePackage {
  name: string;
  version: string;
  author: string;
  email: string;
  homepage: string;
  description: string;
  repository: { type: string; url: string };
  bugs: { url: string };
  license: string;
}

export interface IStoreFile {
  key: number;
  isDir: number;
  isFile: number;
  command?: number;
  size?: number;
  name?: string;
}

export interface IStoreScan {
  key: number;
  id: number;
  isHidden: number;
  encryptionType: number;
  channel: number;
  rssi: number;
  ssid: string;
}

export interface IStoreGpio {
  key: number;
  command: number;
  gpio: number;
  mode: number;
  value: number;
  interrupt: number;
  disabled: number;
}

export interface IStoreSettings {
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

export interface IStoreInfo {
  id?: number;
  firmware?: number[];
  totalBytes?: number;
  usedBytes?: number;
  uptime?: number;
  name?: string;
  pkg?: IStorePackage;
}

export interface IStoreMain {
  info?: IStoreInfo;
  gpio: Record<string, IStoreGpio>;
  device: any;
  dallas: any;
}
export interface IStoreWebSocket {
  fileList: IStoreFile[];
  scanList: IStoreScan[];
  path: string[];
  settings: IStoreSettings;
  main: IStoreMain;
  progress: any;
}

export interface INotificationItem {
  id?: number;
  text?: string;
  timeout?: number;
}

export interface IWSSend {
  comm: string;
  data?: any;
}

export interface IWebSocket {
  socket: WebSocket | null;
  pingClient: number;
  pingDevice: number;
}

export interface IStoreApp {
  menu: IMenuItem[];
  isLoading: boolean;
  theme: string;
  dialog: IDialog;
  notifications: INotificationItem[];
}
