export interface ILocaleMessages {
  [key: string]: string | ILocaleMessages;
}

export interface ILocales {
  [locale: string]: ILocaleMessages;
}

export type I18nPluralRule = (count: number, forms: string[]) => string;

export interface I18nState {
  locale: string;
}

export type I18nGet = (key: string, params?: Record<string, string | number>) => string;

export interface I18nInstance {
  state: Readonly<I18nState>;
  $t: I18nGet;
  setLocale(locale: string): void;
  getLocale(): string;
  getListLocales(): string[];
}

export interface I18nOptions {
  defaultLocale?: string;
  locales?: ILocales;
  pluralize: (locale: string, count: number, forms: string[]) => string;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18n: I18nInstance;
    $t: I18nGet;
  }
}

declare global {
  interface Window {
    $i18n?: I18nInstance;
  }
}

export {};
