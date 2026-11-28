import type { IListItem } from '@/types';

export interface IModbusDeviceModel {
  id: string;
  name: string;
  address: number;
  enabled: number;
  interval: number;
  timeout: number;
  retries: number;
}

export interface IModbusPointModel {
  device: number;
  id: string;
  name: string;
  fc: number;
  address: number;
  type: number;
  flags: number;
  registers: number;
  decimals: number;
  scale: number;
  offset: number;
  unit: string;
  var: number;
}

export interface IModbusVarModel {
  id: string;
  name: string;
  type: number;
  flags: number;
  unit: string;
  decimals: number;
  point: number;
  source: string;
}

export interface IModbusVarValueModel {
  quality?: number;
  value?: number;
  text?: string;
}

export interface IModbusStatusModel {
  role: number;
  address: number;
  baud: number;
  dataBits: number;
  parity: number;
  stopBits: number;
  txPin?: number;
  rxPin?: number;
  dePin?: number;
  status: number;
  lastError: number;
  requests: number;
  errors: number;
  lastFunction: number;
  lastAddress: number;
  varCount?: number;
  vars?: IModbusVarValueModel[];
}

export type TModbusSlaveSourceKind = 'data' | 'script';
export type TModbusProfileAction = 'apply' | 'save';
export type TModbusDeleteKind = 'device' | 'point' | 'var';

export interface IModbusSlaveForm {
  sourceKind: TModbusSlaveSourceKind;
  sourcePath: string;
  id: string;
  name: string;
  address: number;
  type: number;
  scale: number;
  offset: number;
  decimals: number;
  unit: string;
  writable: boolean;
}

export interface IModbusDeleteTarget {
  kind: TModbusDeleteKind;
  index: number;
  name: string;
}

export interface IModbusDeviceView {
  index: number;
  title: string;
  meta: string;
}

export interface IModbusPointView {
  index: number;
  title: string;
  meta: string;
  value: string;
  quality: string;
  qualityClass: string;
  isWritable: boolean;
  writeValue: string;
}

export interface IModbusVarView {
  index: number;
  title: string;
  meta: string;
  value: string;
  quality: string;
  qualityClass: string;
}

export interface IModbusSlaveView {
  index: number;
  title: string;
  meta: string;
  value: string;
  quality: string;
  qualityClass: string;
}

export interface IModbusConnectionForm {
  role: number;
  address: number;
  baud: number;
  parity: number;
  stopBits: number;
  txPin: number;
  rxPin: number;
  dePin: number;
}

export interface IModbusStatusItem {
  label: string;
  value: string;
  className: string;
}

export interface IModbusConnectionCardProps {
  form: IModbusConnectionForm;
  status: IModbusStatusModel;
  isConnected: boolean;
  isDirty: boolean;
  isSettingsOpen: boolean;
  roles: IListItem<number>[];
  bauds: IListItem<number>[];
  parities: IListItem<number>[];
  stopBits: IListItem<number>[];
  statusItems: IModbusStatusItem[];
  roleName: string;
  baudName: string;
  parityName: string;
  stopBitsName: string;
  formatText: string;
  statusText: string;
  statusDotClass: string;
}

export interface IModbusConnectionCardEmits {
  'toggle-settings': [];
  'toggle-connection': [];
  role: [item: IListItem<number>];
  baud: [item: IListItem<number>];
  parity: [item: IListItem<number>];
  'stop-bits': [item: IListItem<number>];
  address: [value: string];
  pin: [key: 'tx' | 'rx' | 'de', value: string];
}

export interface IModbusProfileToolbarProps {
  isDirty: boolean;
  isLoading: boolean;
  isSending: TModbusProfileAction | null;
  message: string;
  error: string;
  isValid: boolean;
}

export interface IModbusProfileToolbarEmits {
  import: [file: File];
  export: [];
  apply: [];
  save: [];
}

export interface IModbusDeviceListProps {
  items: IModbusDeviceView[];
  countLabel: string;
  canAdd: boolean;
  isDisabled: boolean;
}

export interface IModbusDeviceListEmits {
  add: [];
  edit: [index: number];
  remove: [index: number];
}

export interface IModbusPointListProps {
  items: IModbusPointView[];
  countLabel: string;
  canAdd: boolean;
  isDisabled: boolean;
}

export interface IModbusPointListEmits {
  add: [];
  edit: [index: number];
  remove: [index: number];
  write: [index: number];
  'update:write-value': [index: number, value: string];
}

export interface IModbusVarListProps {
  items: IModbusVarView[];
  countLabel: string;
  canAdd: boolean;
  isDisabled: boolean;
}

export interface IModbusVarListEmits {
  add: [];
  edit: [index: number];
  remove: [index: number];
}

export interface IModbusSlaveListProps {
  items: IModbusSlaveView[];
  countLabel: string;
  canAdd: boolean;
  isDisabled: boolean;
}

export interface IModbusSlaveListEmits {
  add: [];
  edit: [index: number];
  remove: [index: number];
}

export interface IModbusDeviceDialogProps {
  title: string;
  errors: Record<string, string>;
  enabledItems: IListItem<number>[];
}

export interface IModbusDeviceDialogEmits {
  save: [];
  close: [];
}

export interface IModbusVarDialogProps {
  title: string;
  errors: Record<string, string>;
  typeItems: IListItem<number>[];
  pointItems: IListItem<number>[];
}

export interface IModbusVarDialogEmits {
  save: [];
  close: [];
  'update:type': [value: number];
}

export interface IModbusSlaveDialogProps {
  title: string;
  errors: Record<string, string>;
  sourceKindItems: IListItem<TModbusSlaveSourceKind>[];
  sourceKindName: string;
  sourcePath: string;
  typeItems: IListItem<number>[];
  typeText: string;
  writableHint: boolean;
  advanced: boolean;
}

export interface IModbusSlaveDialogEmits {
  save: [];
  close: [];
  'source-kind': [value: string];
  'pick-source': [];
  'update:advanced': [value: boolean];
}

export interface IModbusPointDialogProps {
  title: string;
  errors: Record<string, string>;
  deviceItems: IListItem<number>[];
  fcItems: IListItem<number>[];
  typeItems: IListItem<number>[];
  varItems: IListItem<number>[];
  pointTabs: Array<{ title: string }>;
  pointTab: number;
  testAutoCrc: boolean;
  testFrame: string;
  testPending: boolean;
  testValid: boolean;
  testError: string;
  testSummary: string;
  testElapsed: string;
  testResult: boolean;
  testStatusName: string;
  testStatusClass: string;
  testResponse: string;
  testDecoded: string;
  testException: number | null;
}

export interface IModbusPointDialogEmits {
  save: [];
  close: [];
  'update:point-tab': [value: number];
  'update:test-auto-crc': [value: boolean];
  'update:test-frame': [value: string];
  'update:type': [value: number];
  rebuild: [];
  test: [];
}

export interface IModbusDeleteDialogProps {
  hint: string;
}

export interface IModbusDeleteDialogEmits {
  confirm: [];
  close: [];
}

export interface IModbusMapTableProps {
  headers: Array<{ name: string; key: string; className: string }>;
  items: import('./modbusMapTypes').IMapItem[];
  details: import('./modbusMapTypes').IMapDetails | null;
  isDesktop: boolean;
}

export interface IModbusMapTableEmits {
  click: [item: import('./modbusMapTypes').IMapItem];
  close: [];
}
