import type { IMessageInfo, IPackage } from '@/types';

export interface IBlockInfoProps extends IMessageInfo {
  pkg?: IPackage;
}
