import type { IMessageScan } from '@/types';

export interface IBlockScanProps {
  items: Partial<IMessageScan>[];
}

export interface IBlockScanEmit {
  (e: 'scan', event: Event): void;
  (e: 'select', event: IMessageScan): void;
}
