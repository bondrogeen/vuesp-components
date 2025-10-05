export const jsonParse = (data: string | null) => {
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return data;
  }
};

export const jsonString = (data: unknown): string => (typeof data === 'object' ? JSON.stringify(data) : (data as string));

export const clone = (obj: object) => jsonParse(jsonString(obj));

export const toByte = (value: number) => {
  const sizes = ['B', 'KB', 'MB'];
  if (value == 0) return '0 B';
  let i = Math.floor(Math.log(value) / Math.log(1024));
  if (i > 1) i = 1;
  return Math.round(value / Math.pow(1024, i)) + ' ' + sizes[i];
};

export const dateUtcToString = (value: string | number | Date, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }, location = []) =>
  new Date(value).toLocaleDateString(location, options);

export const timeUtcToString = (value: string | number | Date, options: Intl.DateTimeFormatOptions = { minute: '2-digit', hour: '2-digit' }, location = []) =>
  new Date(value).toLocaleTimeString(location, options);

export const addZero = (value: number) => (value >= 10 ? value : `0${value}`);

export const secToTime = (seconds: number) => {
  // let y = Math.floor(seconds / 31536000);
  // let mo = Math.floor((seconds % 31536000) / 2628000);
  let d = Math.floor(((seconds % 31536000) % 2628000) / 86400);
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor(seconds % 60);
  return `${d ? d + ' days ' : ''} ${addZero(h)}:${addZero(m)}:${addZero(s)}`;
};

export const arrToStr = (v: number[]) => v.join('.');
export const strToArr = (v: string) => v.split('.').map((i) => +i);
