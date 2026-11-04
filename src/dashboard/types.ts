import type { DashboardItem, DashboardItemOptions } from 'vuesp-dashboard-core';

export interface IDashboardItemOptions extends DashboardItemOptions {}

export interface IDashboardItem extends DashboardItem {
  icon: string;
  value: string | number;
  valueTo?: string | number;
  opts?: IDashboardItemOptions;
}

export type GetTypeByPath<T, Path extends string> = Path extends keyof T ? T[Path] : Path extends `${infer K}.${infer R}` ? (K extends keyof T ? GetTypeByPath<T[K], R> : never) : never;

export type TypeGetDataValue = <T extends string, S>(key: T, main: S) => GetTypeByPath<S, T> | undefined;

export type TypeGetParamsData = <S>(item: IDashboardItem, main: S) => (GetTypeByPath<S, string> | undefined)[];

export type TypeValueDashboardItemOptions = IDashboardItemOptions[keyof IDashboardItemOptions];

// export type TypeGetBind = <S>(item: IDashboardItem, main: S) => IDashboardItem;
