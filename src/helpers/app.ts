import type { IMenuItem } from '@/types/types';
import { localSet, localGet } from '@/helpers/general';

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

const addZero = (value: number) => (value >= 10 ? value : `0${value}`);

export const secToTime = (seconds: number) => {
  // let y = Math.floor(seconds / 31536000);
  // let mo = Math.floor((seconds % 31536000) / 2628000);
  let d = Math.floor(((seconds % 31536000) % 2628000) / 86400);
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);
  return `${d ? d + ' days ' : ''} ${addZero(h)}:${addZero(m)}:${addZero(s)}`;
};
