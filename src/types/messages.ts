export interface IMessageSettings {
  key?: number;
  wifiDhcp: number;
  wifiMode: number;
  authMode: number;
  version: number;
  device: number;
  wifiIp: number[];
  wifiSubnet: number[];
  wifiGateway: number[];
  wifiDns: number[];
  wifiSsid: string;
  wifiPass: string;
  authLogin: string;
  authPass: string;
}

export interface IMessageInfo {
  key?: number;
  id: number;
  firmware: number[];
  totalBytes: number;
  usedBytes: number;
  uptime: number;
  name: string;
}

export interface IMessagePing {
  key?: number;
}

export interface IMessageScan {
  key?: number;
  id: number;
  isHidden: number;
  encryptionType: number;
  channel: number;
  rssi: number;
  ssid: string;
}

export interface IMessageProgress {
  key?: number;
  status: number;
  empty: number;
  size: number;
  length: number;
}

export interface IMessageFile {
  key?: number;
  isDir?: number;
  isFile?: number;
  command: number;
  size?: number;
  name: string;
}

export interface IMessageReboot {
  key?: number;
}

export interface IMessagePort {
  key?: number;
  gpio: number;
  value?: number;
  mode?: number;
  interrupt?: number;
  disabled?: number;
  command?: number;
  list?: number;
  empty?: number;
}

export interface IMessageInit {
  key?: number;
}

export interface IMessageMessage {
  key?: number;
  type: number;
  id?: number;
  active?: number;
  handler?: number;
  index?: number;
  len?: number;
  date?: number;
  text?: string;
}

interface IKeyMessageSettings {
  key: 'SETTINGS';
  object?: IMessageSettings;
}

interface IKeyMessageInfo {
  key: 'INFO';
  object?: IMessageInfo;
}

interface IKeyMessagePing {
  key: 'PING';
  object?: IMessageFile;
}

interface IKeyMessageScan {
  key: 'SCAN';
  object?: IMessageScan;
}

interface IKeyMessageProgress {
  key: 'PROGRESS';
  object?: IMessageProgress;
}

interface IKeyMessageFiles {
  key: 'FILES';
  object?: IMessageFile;
}

interface IKeyMessageReboot {
  key: 'REBOOT';
  object?: IMessageReboot;
}

interface IKeyMessagePort {
  key: 'PORT';
  object?: IMessagePort;
}

interface IKeyMessageMessage {
  key: 'MESSAGE';
  object?: IMessageMessage;
}

export type TypeConstMessage = IKeyMessageSettings | IKeyMessageInfo | IKeyMessagePing | IKeyMessageScan | IKeyMessageProgress | IKeyMessageFiles | IKeyMessageReboot | IKeyMessagePort | IKeyMessageMessage;
