import {
  buildDashboardCommands,
  getDataValue as coreGetDataValue,
  getParamsData as coreGetParamsData,
  normalizeFunctionBody,
  resolveDashboardItem,
} from 'vuesp-dashboard-core';
import type { DashboardEvaluator } from 'vuesp-dashboard-core';

import type { TypeGetDataValue, TypeGetParamsData, IDashboardItem, GetTypeByPath } from '@/types';

export const dashboardCards = ['button', 'info', 'dimmer', 'date', 'input', 'list'];

export const getDataValue: TypeGetDataValue = <T extends string, S>(key: T, main: S) => {
  return coreGetDataValue(key, main) as GetTypeByPath<S, T> | undefined;
};

export const getParamsData: TypeGetParamsData = (item, main) => {
  return coreGetParamsData(item, main) as (GetTypeByPath<typeof main, string> | undefined)[];
};

export const getFunction = (body: string | undefined) => {
  const normalized = normalizeFunctionBody(body);
  if (!normalized) return null;
  return new Function('v', 'a', 'b', 'c', normalized);
};

const browserEvaluator: DashboardEvaluator = (body, v, a, b, c) => {
  const fn = new Function('v', 'a', 'b', 'c', body);
  return fn(v, a, b, c);
};

export const setStateItem = <T>(item: IDashboardItem, value: unknown, object: T): any => {
  try {
    return buildDashboardCommands(item, value, object, browserEvaluator);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const getStateItem = <T>(item: IDashboardItem, object: T): IDashboardItem => {
  try {
    return resolveDashboardItem(item, object, browserEvaluator) as unknown as IDashboardItem;
  } catch (error) {
    console.warn(error);
    const args = getParamsData(item, object);
    const value = (args[0] ?? '') as string | number;
    return { ...item, value, valueTo: value } as IDashboardItem;
  }
};
