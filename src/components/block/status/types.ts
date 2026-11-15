import type { IMessageInfo, IPackage } from '@/types';

export interface IBlockStatusProps extends Omit<IMessageInfo, 'key'> {
  pkg?: IPackage;
}
