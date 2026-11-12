import type { IBlockContext } from './types';

export interface IBlockProvider {
  id: string;
  label: string;
  createContext(source: unknown): IBlockContext;
}
