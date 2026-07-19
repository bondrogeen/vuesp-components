import type { ILocaleMessages, ILocales, I18nOptions, I18nState, I18nInstance, I18nPluralRule } from '@/plugins/i18n/types';

export { ILocaleMessages, ILocales, I18nOptions, I18nState, I18nInstance, I18nPluralRule };

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
