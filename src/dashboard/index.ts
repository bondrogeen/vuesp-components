import type { TypeGetDataValue, TypeGetParamsData, IDashboardItem, GetTypeByPath } from '@/types/types';

export const getDataValue: TypeGetDataValue = <T extends string, S>(key: T, main: S) => {
  const keys = key.split('.') as string[];
  let current: unknown = main;

  for (const k of keys) {
    if (current !== null && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  return current as GetTypeByPath<S, T> | undefined;
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
  const [, ...args] = getParamsData(item, object);
  let data = null;
  try {
    const setFunc = getFunction(item.set);
    if (setFunc) data = setFunc(value, ...args);
  } catch (error) {
    console.warn(error);
  }
  return data;
};

export const getStateItem = <T>(item: IDashboardItem, object: T) => {
  const args = getParamsData(item, object);
  const [v, a, b, c] = args;
  let value = v ?? '';
  let valueTo = value;

  try {
    const getFunc = getFunction(item.get);
    if (getFunc) value = getFunc(value, a, b, c);
    const getToFunc = getFunction(item.getTo);
    if (getToFunc) {
      valueTo = getToFunc(value, a, b, c);
    }
  } catch (error) {
    console.warn(error);
  }

  return { ...item, value, valueTo };
};
