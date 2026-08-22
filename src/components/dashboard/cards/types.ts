import type { IDashboardItem } from '@/types';

export interface ICardBaseProps extends IDashboardItem {
  size?: 'sm' | 'md' | 'lg' | 'full';
}
export interface ICardBaseEmits {
  (e: 'edit' | 'close' | 'click' | 'clone', event: Event): void;
  (e: 'open', event: boolean): void;
  (e: 'setState', item: string | number | boolean): void;
}
