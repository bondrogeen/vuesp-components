export type TSerialConsoleStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
export type TSerialConsoleDirection = 'rx' | 'tx';
export type TSerialConsoleEncoding = 'utf8' | 'cp1251';
export type TSerialConsoleFraming = 'line' | 'gap';
export type TSerialConsoleLineEnding = 'none' | 'cr' | 'lf' | 'crlf';
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
}
