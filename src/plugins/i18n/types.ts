export interface ILocaleMessages {
  [key: string]: string | ILocaleMessages;
}

export interface ILocales {
  [locale: string]: ILocaleMessages;
}

export type TI18nPluralRule = (count: number, forms: string[]) => string;

export interface II18nState {
  locale: string;
}

export type TI18nGet = (key: string, params?: Record<string, string | number>) => string;

export interface II18nInstance {
  state: Readonly<II18nState>;
  $t: TI18nGet;
  setLocale(locale: string): void;
  getLocale(): string;
  getListLocales(): string[];
}

export interface II18nOptions {
  defaultLocale?: string;
  locales?: ILocales;
  pluralize: (locale: string, count: number, forms: string[]) => string;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18n: II18nInstance;
    $t: TI18nGet;
  }
}

declare global {
  interface Window {
    $i18n?: II18nInstance;
  }
}

export {};
