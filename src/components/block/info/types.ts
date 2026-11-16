import type { IPackage } from '@/types';

export interface IBlockInfoProps {
  id?: number;
  firmware?: number[];
  totalBytes?: number;
  usedBytes?: number;
  uptime?: number;
  name?: string;
  board?: number;
  pkg?: IPackage;
}
