import type { IMenuItem, INotification } from '@/types';

export interface IAppAsideProps {
  isSidebar?: boolean;
}
export interface IAppAsideEmits {
  (e: 'sidebar', value: boolean): void;
}

export interface IAppHeaderProps {
  changeTheme?: (value?: string) => void;
  notifications: INotification[];
  showLogout?: boolean;
}
export interface IAppHeaderEmits {
  (e: 'sidebar' | 'notif', value: Event): void;
}

export interface IAppMenuGroup {
  key?: string;
  title: string;
  items: IMenuItem[];
}

export interface IAppNavProps {
  menu?: IMenuItem[];
  groups?: IAppMenuGroup[];
  fullPath?: string;
  isSidebar?: boolean;
  storageKey?: string;
}
export interface IAppNavEmits {
  (e: 'sidebar', value: boolean): void;
}

export interface IAppNotificationProps {
  value: boolean;
  notifications: INotification[];
}
export interface IAppNotificationEmits {
  (e: 'close', event: Event): void;
  (e: 'remove' | 'read', item: INotification): void;
}

export interface IAppProgressProps {
  status?: number;
  empty?: number;
  size?: number;
  length?: number;
  timeout?: number;
}
