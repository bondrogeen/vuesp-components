import type { IMenuItem, INotification, IMessageProgress } from '@/types';

export interface IAppAsideProps {
  isSidebar?: boolean;
}
export interface IAppAsideEmits {
  (e: 'sidebar', value: boolean): void;
}

export interface IAppHeaderProps {
  changeTheme?: (value?: string) => void;
  notifications: INotification[];
}
export interface IAppHeaderEmits {
  (e: 'sidebar' | 'notif', value: Event): void;
}

export interface IAppNavProps {
  menu?: IMenuItem[];
  fullPath?: string;
  isSidebar?: boolean;
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

export interface IAppProgressProps extends IMessageProgress {
  timeout?: number;
}
