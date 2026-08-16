import { jsonString, jsonParse } from './general';

export const createDownloadLink = (href: string, name = 'file') => {
  const link = document.createElement('a');
  link.setAttribute('download', name);
  link.href = href;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта: ${src}`));
    document.head.appendChild(script);
  });
};

const isClient = typeof window !== 'undefined';

const getStorage = (store: Storage) => (name: string, isJSON?: boolean) => {
  return isJSON ? jsonParse(store.getItem(name)) : store.getItem(name);
};

const setStorage = (store: Storage) => (name: string, data: string | object) => {
  store.setItem(name, typeof data === 'string' ? data : jsonString(data));
};

export const localGet = isClient ? getStorage(localStorage) : () => null;
export const localSet = isClient ? setStorage(localStorage) : () => undefined;
export const sessionGet = isClient ? getStorage(sessionStorage) : () => null;
export const sessionSet = isClient ? setStorage(sessionStorage) : () => undefined;
