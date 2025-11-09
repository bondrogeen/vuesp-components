import type { IMessageNotification } from '@/types/types';

export interface ICardNotificationProps extends IMessageNotification {
  empty?: string;
}

export interface ICardNotificationEmits {
  (e: 'remove' | 'read', event: Event): void;
}
