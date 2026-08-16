export type TypeKEYS = 'INIT' | 'SETTINGS' | 'INFO' | 'PING' | 'SCAN' | 'PROGRESS' | 'FILES' | 'REBOOT' | 'EVENT' | 'PORT' | 'MESSAGE' | 'DALLAS' | 'BUFFER' | 'DEVICE' | 'DISCOVERY';

export interface IMessageInit {
  key?: number;
}
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
  discovery: number;
  discoveryInterval: number;
  discoveryPort: number;
}

export interface IMessageInfo {
  key?: number;
  id: number;
  firmware: number[];
  totalBytes: number;
  usedBytes: number;
  uptime: number;
  name: string;
  board: number;
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

export interface IMessageEvent {
  key?: number;
  comm?: number;
  comm2?: number;
  value1: number;
  value2?: number;
  name: string;
}

export interface IMessagePort {
  key?: number;
  gpio: number;
  value?: number;
  mode?: number;
  interrupt?: number;
  list?: number;
  disabled?: number;
  isButton?: number;
  command?: number;
  isPressed?: number;
  count?: number;
  empty?: number;
  valueOld?: number;
  pressStart?: number;
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
export interface IMessageDallas {
  key?: number;
  comm: number;
  comm2?: number;
  address?: number[];
  temp?: number;
}
export interface IMessageBuffer {
  key?: number;
  empty: number;
  head?: number;
  tail?: number;
  count?: number;
  data?: number[];
}

export interface IMessageDiscovery {
  key?: number;
  status: number;
  empty: number;
  id: number;
  ip: number;
  lastSeen: number;
}

export interface IMessageReboot {
  key?: number;
}

interface IKeyMessageInit {
  key: Extract<TypeKEYS, 'INIT'>;
  object?: IMessageInit;
}

interface IKeyMessageSettings {
  key: Extract<TypeKEYS, 'SETTINGS'>;
  object?: IMessageSettings;
}

interface IKeyMessageInfo {
  key: Extract<TypeKEYS, 'INFO'>;
  object?: IMessageInfo;
}

interface IKeyMessagePing {
  key: Extract<TypeKEYS, 'PING'>;
  object?: IMessageFile;
}

interface IKeyMessageScan {
  key: Extract<TypeKEYS, 'SCAN'>;
  object?: IMessageScan;
}

interface IKeyMessageProgress {
  key: Extract<TypeKEYS, 'PROGRESS'>;
  object?: IMessageProgress;
}

interface IKeyMessageFiles {
  key: Extract<TypeKEYS, 'FILES'>;
  object?: IMessageFile;
}

interface IKeyMessageReboot {
  key: Extract<TypeKEYS, 'REBOOT'>;
  object?: IMessageReboot;
}

interface IKeyMessageEvent {
  key: Extract<TypeKEYS, 'EVENT'>;
  object?: IMessageEvent;
}

interface IKeyMessagePort {
  key: Extract<TypeKEYS, 'PORT'>;
  object?: IMessagePort;
}

interface IKeyMessageMessage {
  key: Extract<TypeKEYS, 'MESSAGE'>;
  object?: IMessageMessage;
}

interface IKeyMessageDallas {
  key: Extract<TypeKEYS, 'DALLAS'>;
  object?: IMessageDallas;
}

interface IKeyMessageBuffer {
  key: Extract<TypeKEYS, 'BUFFER'>;
  object?: IMessageBuffer;
}

interface IKeyMessageDiscovery {
  key: Extract<TypeKEYS, 'DISCOVERY'>;
  object?: IMessageDiscovery;
}

export type TypeConstMessage =
  | IKeyMessageInit
  | IKeyMessageSettings
  | IKeyMessageInfo
  | IKeyMessagePing
  | IKeyMessageScan
  | IKeyMessageProgress
  | IKeyMessageFiles
  | IKeyMessageReboot
  | IKeyMessageEvent
  | IKeyMessagePort
  | IKeyMessageMessage
  | IKeyMessageDallas
  | IKeyMessageBuffer
  | IKeyMessageDiscovery;
