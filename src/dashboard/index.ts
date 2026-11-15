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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Старые dashboard.json писали `set` как `({ ...a, value: v, command: 2 })`,
 * где `a` был объектом сущности. Ядро теперь передаёт `a` = args[0] (значение),
 * поэтому команда выходит без `key` и не уходит на устройство.
 * Возвращаем сущность из args[1], не переписывая пользовательские выражения.
 */
const withLegacyEntity = (data: unknown, item: IDashboardItem, object: unknown): unknown => {
  const entity = getParamsData(item, object)[1];
  if (!isRecord(entity) || !('key' in entity)) return data;

  const merge = (command: unknown) => {
    if (!isRecord(command) || 'key' in command) return command;
    return { ...entity, ...command };
  };

  return Array.isArray(data) ? data.map(merge) : merge(data);
};

export const setStateItem = <T>(item: IDashboardItem, value: unknown, object: T): unknown => {
  try {
    return withLegacyEntity(buildDashboardCommands(item, value, object, browserEvaluator), item, object);
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
