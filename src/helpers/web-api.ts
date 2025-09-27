import { jsonString, jsonParse } from './general';

export const createDownloadLink = (href: string, name = 'file') => {
  const link = document.createElement('a');
  link.setAttribute('download', name);
  link.href = href;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const localGet = (name: string) => jsonParse(localStorage.getItem(name));
export const localSet = (name: string, data: unknown) => {
  if (localStorage) localStorage.setItem(name, jsonString(data));
};

export const sessionGet = (name: string) => jsonParse(sessionStorage.getItem(name));
export const sessionSet = (name: string, data: unknown) => {
  if (sessionStorage) sessionStorage.setItem(name, jsonString(data));
};
