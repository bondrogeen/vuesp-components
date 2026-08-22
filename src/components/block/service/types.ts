import type { IListItem } from '@/types';

export interface IBlockServiceProps {
  locale: string;
  locales: IListItem[];
}

export interface IBlockServiceEmit {
  (e: 'reboot' | 'reset', event: Event): void;
  (e: 'locale', item: IListItem): void;
}
