import type { TypeGetDataValue, TypeGetParamsData, IDashboardItem } from '@/types/types';

export const getDataValue: TypeGetDataValue = (key, main) => {
  const keys = key.split('.') as string[];
  let current: any = main;

  for (const k of keys) {
    if (current !== null && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }
  return current;
};

export const getParamsData: TypeGetParamsData = ({ args }, main) => {
  return args.map((i: string) => getDataValue(i, main));
};

export const getFunction = (body: string | undefined) => {
  if (!body) return null;
  body = body.includes('return') ? body : `return ${body}`;
  return new Function('v', 'a', 'b', 'c', body);
};

export const setStateItem = <T>(item: IDashboardItem, value: unknown, object: T) => {
  const [_, ...args] = getParamsData(item, object);
  let data = null;
  const setFunc = getFunction(item.set);
  if (setFunc) data = setFunc(value, ...args);
  return data;
};

export const getStateItem = <T>(item: IDashboardItem, object: T) => {
  const args = getParamsData(item, object);
  let value = null;

  const getFunc = getFunction(item.get);
  if (getFunc) value = getFunc(...args);

  let valueTo = null;
  const getToFunc = getFunction(item.getTo);
  if (getToFunc) valueTo = getToFunc(...args);

  return { ...item, value, valueTo };
};
