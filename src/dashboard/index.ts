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

export const getFunction = (body: string | undefined, params: string[] = ['v', 'a', 'b', 'c', 'd']) => {
  const normalized = normalizeFunctionBody(body);
  if (!normalized) return null;
  return new Function(...params, normalized);
};

const browserEvaluator: DashboardEvaluator = (body, scope) => {
  const fn = new Function(...Object.keys(scope), body);

  return fn(...Object.values(scope));
};

// The dashboard page consumes the command result as an untyped payload.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
