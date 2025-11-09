import type { IMenuItem, IMessageNotification, IMessageProgress } from '@/types/types';

export interface IAppAsideProps {
  isSidebar?: boolean;
}
export interface IAppAsideEmits {
  (e: 'sidebar', value: boolean): void;
}

export interface IAppDialogProps {
  value?: boolean;
  title: string;
  message?: string;
  callback?: () => void;
  button?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface IAppDialogEmits {
  (e: 'close', value: Event): void;
  (e: 'open', value: boolean): void;
}

export interface IAppHeaderProps {
  changeTheme?: (value?: string) => void;
  notifications: IMessageNotification[];
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
  notifications: IMessageNotification[];
}
export interface IAppNotificationEmits {
  (e: 'close', event: Event): void;
  (e: 'remove' | 'read', item: IMessageNotification): void;
}

export interface IAppProgressProps extends IMessageProgress {
  timeout?: number;
}
