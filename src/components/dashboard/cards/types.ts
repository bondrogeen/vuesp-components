import type { IDashboardItem } from '@/types/types';

export interface ICardBaseProps extends IDashboardItem {
  size?: string;
}
export interface ICardBaseEmits {
  (e: 'edit' | 'close' | 'click', event: Event): void;
  (e: 'open', event: boolean): void;
  (e: 'setState', item: string | number | boolean): void;
}
