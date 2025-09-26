import type { IMenuItem, IDialog, IMessageInfo, IMessagePort, IMessageSettings, IMessageNotification, IMessageProgress } from '@/types/types';

export interface IPackage {
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

export interface IStateInfo extends IMessageInfo {
  pkg?: IPackage;
}
export interface IStateMain {
  info: IStateInfo;
  ports: Record<string, IMessagePort>;
}

export interface IStateApp {
  menu: IMenuItem[];
  theme: string;
  dialog: IDialog;
}

export interface IStateWebSocket {
  socket: WebSocket | null;
  pingClient: number;
  pingDevice: number;
}
export interface IStateWebSocketStore {
  settings: IMessageSettings;
  main: IStateMain;
  progress: IMessageProgress;
  notifications: IMessageNotification[];
}
