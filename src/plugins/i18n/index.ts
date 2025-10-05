import { reactive, readonly, App } from 'vue';
import type { I18nInstance, I18nState, I18nOptions, ILocales } from '@/plugins/i18n/types';

import { ObjectPlugin } from 'node_modules/@vue/runtime-core/dist/runtime-core';

const locales = { en: {} };
const defaultLocale = 'en';

const i18nPlugin = {
  install(app: App, options: I18nOptions = {}) {
    const finalLocales: ILocales = options?.locales || locales;
    const finalDefaultLocale = options?.defaultLocale || defaultLocale;

    const state: I18nState = reactive({
      locale: finalDefaultLocale,
    });

    const i18n: I18nInstance = {
      state: readonly(state),

      t(key: string, params: Record<string, string> = {}): string {
        const keys: string[] = key.split('.');
        let value: any = finalLocales[state.locale];

        for (const k of keys) {
          value = value?.[k];
        }

        if (typeof value !== 'string') return key;

        return value.replace(/{(\w+)}/g, (match: string, param: string): string => {
          return params[param] || match;
        });
      },

      setLocale(locale: string): void {
        if (finalLocales[locale]) {
          state.locale = locale;
        }
      },

      getLocale(): string {
        return state.locale;
      },
    };

    app.config.globalProperties.$i18n = i18n;
    app.provide('i18n', i18n);

    window.$i18n = i18n;
  },
} as ObjectPlugin;

export default i18nPlugin;
