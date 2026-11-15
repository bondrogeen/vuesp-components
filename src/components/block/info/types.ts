import type { IMessageInfo, IPackage } from '@/types';

export interface IBlockInfoProps extends Omit<IMessageInfo, 'key'> {
  pkg?: IPackage;
}
