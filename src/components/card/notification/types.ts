import type { INotification } from '@/types';

export interface ICardNotificationProps extends Omit<INotification, 'key'> {
  empty?: string;
}

export interface ICardNotificationEmits {
  (e: 'remove' | 'read', event: Event): void;
}
