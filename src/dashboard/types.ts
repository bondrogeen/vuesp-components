import type { IDashboardItemOptions } from 'vuesp-dashboard-core';

export type { IDashboardItemOptions };

// Поля повторяют IDashboardItem из vuesp-dashboard-core и добавляют UI-поля.
// Наследование от типа из другого пакета ломает компилятор Vue SFC (`extends`).
export interface IDashboardItem {
  id: string;
  name: string;
  type: string;
  entityType?: string;
  icon: string;
  opts?: IDashboardItemOptions;
  args: string[];
  get?: string;
  getTo?: string;
  set?: string;
  meta?: Record<string, unknown>;
  value: string | number;
  valueTo?: string | number;
}

export type TGetTypeByPath<T, Path extends string> = Path extends keyof T ? T[Path] : Path extends `${infer K}.${infer R}` ? (K extends keyof T ? TGetTypeByPath<T[K], R> : never) : never;

export type TGetDataValue = <T extends string, S>(key: T, main: S) => TGetTypeByPath<S, T> | undefined;

export type TGetParamsData = <S>(item: IDashboardItem, main: S) => (TGetTypeByPath<S, string> | undefined)[];

export type TValueDashboardItemOptions = IDashboardItemOptions[keyof IDashboardItemOptions];

