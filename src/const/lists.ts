import type { IListItem } from '@/types/types';

const icons = [
  'Dots',
  'Air',
  'Bulb',
  'Cold',
  'Camera',
  'Vent',
  'Garage',
  'Video',
  'Light',
  'Tv',
  'Therm',
  'Store',
  'Socket',
  'Search',
  'Save',
  'Noti',
  'Logout',
  'Lock',
  'Folder',
  'Chevron',
  'Close',
  'Dashboard',
  'Device',
  'Drop',
  'Burger',
  'EyeClose',
  'EyeOpen',
  'File',
  'Gpio',
  'Update',
  'Heater',
  'Setting',
  'Logo',
  'LogoMini',
  'Power',
  'Theme',
  'Info',
  'Plus',
];

const dashboardCards = ['Button', 'Info', 'Dimmer', 'Date', 'Input', 'List'];

export const listIcons: IListItem[] = icons.map((item, i) => ({ id: ++i, name: `${item}`, value: `Icon${item}` }));
export const listDashboard: IListItem[] = dashboardCards.map((item, i) => ({ id: ++i, name: `${item}`, value: `${item.toLowerCase()}` }));
