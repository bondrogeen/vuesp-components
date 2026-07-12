import type { INotification } from '@/types/types';

export interface ICardNotificationProps extends INotification {
  empty?: string;
}

export interface ICardNotificationEmits {
  (e: 'remove' | 'read', event: Event): void;
}
