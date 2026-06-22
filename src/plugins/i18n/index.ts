import { reactive, readonly, App, Plugin } from 'vue';
import type { I18nInstance, I18nState, I18nOptions, ILocales, ILocaleMessages } from '@/plugins/i18n/types';

const locales = { en: {} };
const defaultLocale = 'en';

const i18nPlugin: Plugin = {
  install(app: App, options: I18nOptions = {}) {
    const finalLocales: ILocales = options?.locales || locales;
    const finalDefaultLocale = options?.defaultLocale || defaultLocale;

    const state: I18nState = reactive({
      locale: finalDefaultLocale,
    });

    const i18n: I18nInstance = {
      state: readonly(state),

      $t(key: string, params: Record<string, string> | undefined = {}): string {
        const keys: string[] = key.split('.');
        let value: string | ILocaleMessages | undefined = finalLocales[state.locale];

        for (const k of keys) {
          if (typeof value === 'object' && value !== null) {
            value = (value as ILocaleMessages)[k];
          } else {
            value = undefined;
            break;
          }
        }
        if (typeof value !== 'string') return key;
        return value.replace(/{(\w+)}/g, (match: string, param: string): string => params[param] || match);
      },

      setLocale(locale: string): void {
        if (finalLocales[locale]) {
          state.locale = locale;
          return;
        }
        state.locale = finalDefaultLocale;
      },

      getLocale(): string {
        return state.locale;
      },

      getListLocales() {
        return Object.keys(finalLocales);
      },
    };

    app.config.globalProperties.$t = i18n.$t;
    app.config.globalProperties.$i18n = i18n;
    app.provide('i18n', i18n);
  },
};

export default i18nPlugin;
