import type { IDashboardItem, TypeGetDataValue } from '@/types/types';

const getDataValue: TypeGetDataValue = (key, main) => {
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

const getParamsData = ({ parameters }: IDashboardItem, main: IMyIStateMain): ReturnType<typeof getDataValue>[] => {
  return parameters.map((i: string) => getDataValue(i, main));
};

const getFunction = (parameters?: string[]) => {
  if (!parameters?.length) return null;
  let body = parameters[parameters.length - 1];
  const params = parameters.slice(0, parameters.length - 1);
  body = body.trim().startsWith('return') ? body : `return ${body}`;
  return new Function(...[...params, body]);
};

const getBind = (item: IDashboardItem) => {
  const args = getParamsData(item, main.value);
  let value = null;
  const getFunc = getFunction(item.get);
  if (getFunc) value = getFunc(...args);

  let convert = null;
  const modifyFunc = getFunction(item.modify);
  if (modifyFunc) convert = modifyFunc(...args);

  return { ...item, value, convert };
};
