import type { ILocaleMessages, ILocales, II18nOptions, II18nState, II18nInstance, TI18nPluralRule } from '@/plugins/i18n/types';

export { ILocaleMessages, ILocales, II18nOptions, II18nState, II18nInstance, TI18nPluralRule };

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $i18n: II18nInstance;
  }
}

declare global {
  interface Window {
    $i18n?: II18nInstance;
  }
}
