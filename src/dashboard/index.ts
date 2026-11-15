import { buildDashboardCommands, getDataValue as coreGetDataValue, getParamsData as coreGetParamsData, normalizeFunctionBody, resolveDashboardItem } from 'vuesp-dashboard-core';
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

const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value);

const withLegacyEntity = (data: unknown, item: IDashboardItem, object: unknown): unknown => {
  const entity = getParamsData(item, object)[1];
  if (!isRecord(entity) || !('key' in entity)) return data;
  const base: Record<string, unknown> = entity;

  const merge = (command: unknown) => {
    if (!isRecord(command) || 'key' in command) return command;
    return { ...base, ...command };
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

/**
 * График ждёт объект буфера ({ data, head, tail, count }), а старые dashboard.json
 * брали его через `get: "a"`, который теперь указывает на значение, а не на сущность.
 * Если для chart получилось не объект — берём сущность из args[1].
 */
const withLegacyChartEntity = (data: IDashboardItem, item: IDashboardItem, object: unknown): IDashboardItem => {
  if (item.type !== 'chart' || isRecord(data.value)) return data;
  const entity = getParamsData(item, object)[1];
  if (!isRecord(entity)) return data;
  return { ...data, value: entity } as IDashboardItem;
};

export const getStateItem = <T>(item: IDashboardItem, object: T): IDashboardItem => {
  try {
    const data = resolveDashboardItem(item, object, browserEvaluator) as unknown as IDashboardItem;
    return withLegacyChartEntity(data, item, object);
  } catch (error) {
    console.warn(error);
    const args = getParamsData(item, object);
    const value = (args[0] ?? '') as string | number;
    return { ...item, value, valueTo: value } as IDashboardItem;
  }
};
