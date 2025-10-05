import type { ILocaleMessages, ILocales, I18nOptions, I18nState, I18nInstance } from '@/plugins/i18n/types';

export { ILocaleMessages, ILocales, I18nOptions, I18nState, I18nInstance };

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
