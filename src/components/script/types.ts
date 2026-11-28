export interface ISuggestion {
  label: string;
  type: 'word' | 'func' | 'var' | 'event';
  description?: string;
  insert?: string;
  detail?: string;
  cursorOffset?: number;
}

export type TTranslator = (key: string) => string;

export type TStatusTone = 'amber' | 'red' | 'green' | 'blue' | 'gray';

export type TLogMode = 'text' | 'hex';

export interface IScriptListItem {
  name: string;
  state: number;
}

export interface IStatusMeta {
  label: string;
  tone: TStatusTone;
}

export interface IRuntimeMetric {
  key: string;
  label: string;
  value: string;
  isError?: boolean;
  title?: string;
}

export interface IScriptLog {
  time: string;
  text: string;
  type?: number;
}

export interface IScriptStudioToolbarProps {
  name: string;
  isBusy: boolean;
  isVmAvailable: boolean;
  isSettingsOpen: boolean;
  isDownloadAvailable: boolean;
  isDirty: boolean;
}

export interface IScriptStudioToolbarEmits {
  save: [];
  rename: [];
  reload: [];
  import: [];
  download: [];
  'stop-all': [];
  'toggle-settings': [];
}

export interface IScriptStudioMetricsProps {
  metrics: IRuntimeMetric[];
}

export interface IScriptStudioActionBarProps {
  logsCount: number;
  lineCount: number;
  byteCount: number;
  stackMax: number | null;
}

export interface IScriptStudioActionBarEmits {
  details: [];
  'show-logs': [];
}

export interface IScriptStudioTabsProps {
  scripts: IScriptListItem[];
  activeName: string;
  draftName: string | null;
  isBusy: boolean;
  isDirty: boolean;
  maxScripts: number;
  ranName: string | null;
}

export interface IScriptStudioTabsEmits {
  select: [script: IScriptListItem];
  'toggle-run': [script: IScriptListItem];
  remove: [name: string];
  create: [];
}

export interface IScriptStudioLogsProps {
  name: string;
  logs: IScriptLog[];
}

export interface IScriptStudioLogsEmits {
  'update:count': [count: number];
  clear: [];
}

export interface IScriptDetailsDialogProps {
  disassembly: string;
  hex: string;
}

export interface IScriptDetailsDialogEmits {
  close: [];
}

export interface IScriptDeleteDialogProps {
  name: string;
  isBusy: boolean;
}

export interface IScriptDeleteDialogEmits {
  confirm: [];
  close: [];
}

export interface IScriptRenameDialogProps {
  name: string;
  isBusy: boolean;
}

export interface IScriptRenameDialogEmits {
  save: [name: string];
  close: [];
}

export interface IScriptDiscardDialogEmits {
  save: [];
  discard: [];
  cancel: [];
}
