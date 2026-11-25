export type TSerialConsoleStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
export type TSerialConsoleDirection = 'rx' | 'tx';
export type TSerialConsoleEncoding = 'utf8' | 'cp1251';
export type TSerialConsoleFraming = 'line' | 'gap';
export type TSerialConsoleLineEnding = 'none' | 'cr' | 'lf' | 'crlf';
export type TSerialConsoleMode = 'text' | 'hex' | 'bin';
export type TSerialConsoleLocale = 'ru' | 'en';

export interface ISelectItem<T> {
  name: string;
  value: T;
}

export interface ISerialConsoleLine {
  id: number;
  dir: TSerialConsoleDirection;
  at: string;
  text: string;
  hex: string;
  bytes: number;
  data?: number[];
}

export interface ISerialConsoleView {
  encoding: TSerialConsoleEncoding;
  framing: TSerialConsoleFraming;
  gapMs: number;
  paused: boolean;
}

export interface ISerialConsoleTransport {
  start: () => void | Promise<void>;
  stop: () => void | Promise<void>;
  send: (bytes: Uint8Array) => Promise<boolean>;
  subscribe: (onData: (bytes: Uint8Array) => void) => () => void;
}

export interface ISerialConsoleCapabilities {
  connection?: boolean;
  binary?: boolean;
  inspector?: boolean;
  export?: boolean;
  session?: boolean;
  escape?: boolean;
  file?: boolean;
  repeat?: boolean;
  pause?: boolean;
  framing?: boolean;
  encoding?: boolean;
  search?: boolean;
  counters?: boolean;
  quickCommands?: boolean;
  download?: boolean;
  history?: boolean;
}

export interface ISerialConsoleLabels {
  connect: string;
  disconnect: string;
  connected: string;
  connecting: string;
  disconnected: string;
  error: string;
  noPort: string;
  usb: string;
  settings: string;
  hexView: string;
  showTime: string;
  wrap: string;
  autoscroll: string;
  lines: string;
  pause: string;
  resume: string;
  paused: string;
  search: string;
  searchPlaceholder: string;
  noMatches: string;
  clear: string;
  copy: string;
  copied: string;
  download: string;
  empty: string;
  waiting: string;
  follow: string;
  input: string;
  placeholder: string;
  send: string;
  quickCommands: string;
  quickAdd: string;
  quickPlaceholder: string;
  quickAddButton: string;
  quickRemove: string;
  quickEmpty: string;
  textMode: string;
  hexMode: string;
  binMode: string;
  inspector: string;
  offset: string;
  export: string;
  exportLog: string;
  exportCsv: string;
  exportJson: string;
  exportRxBin: string;
  sessionRestored: string;
  escape: string;
  file: string;
  repeat: string;
  repeatStop: string;
  repeatInterval: string;
  hexLabel: string;
  hexPlaceholder: string;
  hexHint: string;
  hexInvalid: string;
  hexOdd: string;
  bytes: string;
  lineEnding: string;
  lineNone: string;
  lineCr: string;
  lineLf: string;
  lineCrlf: string;
  encoding: string;
  encodingUtf8: string;
  encodingCp1251: string;
  framing: string;
  framingLine: string;
  framingGap: string;
  framingHint: string;
  gap: string;
  ms: string;
  rx: string;
  tx: string;
  byteShort: string;
  kiloShort: string;
  megaShort: string;
  perSecond: string;
  shortcuts: string;
  apply: string;
  reset: string;
  unsaved: string;
}

export interface ISerialConsoleNoReplyHint {
  text: string;
  actionLabel?: string;
  delay?: number;
  resend?: boolean;
  onAction?: () => void | Promise<void>;
}

export interface ISerialConsoleProps {
  status?: TSerialConsoleStatus;
  error?: string;
  portLabel?: string;
  transport: ISerialConsoleTransport;
  locale?: TSerialConsoleLocale;
  labels?: Partial<ISerialConsoleLabels>;
  maxLines?: number;
  capabilities?: ISerialConsoleCapabilities;
  initialQuickCommands?: string[];
  initialLineEnding?: TSerialConsoleLineEnding;
  storageKey?: string;
  compact?: boolean;
  dirty?: boolean;
  onApply?: () => void;
  onReset?: () => void;
  noReplyHint?: ISerialConsoleNoReplyHint;
}
