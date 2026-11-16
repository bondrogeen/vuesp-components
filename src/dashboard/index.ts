import { buildDashboardCommands, getDataValue as coreGetDataValue, getParamsData as coreGetParamsData, normalizeFunctionBody, resolveDashboardItem } from 'vuesp-dashboard-core';
import type { TDashboardEvaluator } from 'vuesp-dashboard-core';

import type { TGetDataValue, TGetParamsData, IDashboardItem, TGetTypeByPath } from '@/types';

export const dashboardCards = ['button', 'info', 'dimmer', 'date', 'input', 'list'];

export const getDataValue: TGetDataValue = <T extends string, S>(key: T, main: S) => {
  return coreGetDataValue(key, main) as TGetTypeByPath<S, T> | undefined;
};

export const getParamsData: TGetParamsData = (item, main) => {
  return coreGetParamsData(item, main) as (TGetTypeByPath<typeof main, string> | undefined)[];
};

export const getFunction = (body: string | undefined, params: string[] = ['v', 'a', 'b', 'c', 'd']) => {
  const normalized = normalizeFunctionBody(body);
  if (!normalized) return null;
  return new Function(...params, normalized);
};

const browserEvaluator: TDashboardEvaluator = (body, scope) => {
  const fn = new Function(...Object.keys(scope), body);

  return fn(...Object.values(scope));
};

/** Дополнительные переменные для `set`/`get`/`getTo`: `cmd`, `keys`, `flags`. */
export type TDashboardScope = Record<string, unknown>;

const withScope = (extra?: TDashboardScope): TDashboardEvaluator => {
  if (!extra) return browserEvaluator;

  return (body, scope) => browserEvaluator(body, { ...extra, ...scope });
};

export const setStateItem = <T>(item: IDashboardItem, value: unknown, object: T, scope?: TDashboardScope): unknown => {
  try {
    return buildDashboardCommands(item, value, object, withScope(scope));
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const getStateItem = <T>(item: IDashboardItem, object: T, scope?: TDashboardScope): IDashboardItem => {
  try {
    return resolveDashboardItem(item, object, withScope(scope)) as unknown as IDashboardItem;
  } catch (error) {
    console.warn(error);
    const args = getParamsData(item, object);
    const value = (args[0] ?? '') as string | number;
    return { ...item, value, valueTo: value } as IDashboardItem;
  }
};
