import type { IMenuItem } from '@/types/types';
import { localSet, localGet } from '@/helpers/web-api';

export const isNewVersion = (name = 'isShow') => {
  const isShow = localGet(name);
  if (!isShow) localSet(name, true);
  return !isShow;
};

export const changeTheme = (value: string) => {
  localSet('theme', value);
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.remove('light');
  document.documentElement.classList.add(value);
};

export const findMenuItem = (items: IMenuItem[] | null, path: string): IMenuItem | null => {
  if (!items) return null;
  for (const item of items) {
    if (path === '/' || item.path === '/') continue;
    if (item.path === path || path.includes(item.path)) return item;
  }
  return null;
};

export const getPageTitle = (menu: IMenuItem[], path: string): IMenuItem | null => findMenuItem(menu, path);
