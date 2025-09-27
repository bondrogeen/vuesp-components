import type { TypeGetDataValue, TypeGetParamsData } from '@/types/types';

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

export const getParamsData: TypeGetParamsData = ({ parameters }, main) => {
  return parameters.map((i: string) => getDataValue(i, main));
};

export const getFunction = (parameters?: string[]) => {
  if (!parameters?.length) return null;
  let body = parameters[parameters.length - 1];
  const params = parameters.slice(0, parameters.length - 1);
  body = body.trim().startsWith('return') ? body : `return ${body}`;
  return new Function(...[...params, body]);
};
