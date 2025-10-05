export interface ILocaleMessages {
  [key: string]: string | ILocaleMessages;
}

export interface ILocales {
  [locale: string]: ILocaleMessages;
}

export interface I18nState {
  locale: string;
}

export interface I18nInstance {
  state: Readonly<I18nState>;
  t(key: string, params?: Record<string, string>): string;
  setLocale(locale: string): void;
  getLocale(): string;
}

export interface I18nOptions {
  defaultLocale?: string;
  locales?: ILocales;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18n: I18nInstance;
  }
}

declare global {
  interface Window {
    $i18n?: I18nInstance;
  }
}

export {};
