import { jsonString, jsonParse } from './general';

export const createDownloadLink = (href: string, name = 'file') => {
  const link = document.createElement('a');
  link.setAttribute('download', name);
  link.href = href;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const getStorage = (store: Storage) => (name: string) => jsonParse(store.getItem(name));
const setStorage = (store: Storage) => (name: string, data: unknown) => {
  if (store) store.setItem(name, jsonString(data));
};

export const localGet = getStorage(localStorage);
export const localSet = setStorage(localStorage);
export const sessionGet = getStorage(sessionStorage);
export const sessionSet = setStorage(sessionStorage);
