import type { INotification } from '@/types';

export interface ICardNotificationProps extends INotification {
  empty?: string;
}

export interface ICardNotificationEmits {
  (e: 'remove' | 'read', event: Event): void;
}
