import { reactive, readonly, App, Plugin } from 'vue';
import type { I18nInstance, I18nState, I18nOptions, ILocales, ILocaleMessages, I18nPluralRule } from '@/plugins/i18n/types';

const locales = { en: {} };
const defaultLocale = 'en';

export function i18nPluralizer(rules: Record<string, I18nPluralRule>) {
  return function pluralize(locale: string, count: number, forms: string[]): string {
    const rule = rules[locale] || rules.en || rules.ru;
    if (!forms || forms.length === 0) return '';

    return rule(count, forms);
  };
}

export const i18nPlugin: Plugin = {
  install(app: App, options: I18nOptions) {
    if (!options?.pluralize) {
      console.warn('[i18n-plugin] pluralize function is required. Please provide it in options.');
      const fallbackPluralize = (locale: string, count: number, forms: string[]): string => {
        return forms[0] || '';
      };
      options = { ...options, pluralize: fallbackPluralize };
    }

    const finalLocales: ILocales = options?.locales || locales;
    const finalDefaultLocale = options?.defaultLocale || defaultLocale;
    const pluralize = options.pluralize;

    const state: I18nState = reactive({
      locale: finalDefaultLocale,
    });

    const i18n: I18nInstance = {
      state: readonly(state),

      $t(key: string, params: Record<string, string | number> | undefined = {}): string {
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

        if (value.includes('|')) {
          const forms = value.split('|').map((form) => form.trim());
          const count = params.count !== undefined ? Number(params.count) : 0;

          const pluralized = pluralize(state.locale, count, forms);

          let result = pluralized;
          if (pluralized.includes('{count}')) {
            result = pluralized.replace(/{count}/g, String(count));
          }

          result = result.replace(/{(\w+)}/g, (match: string, param: string): string => {
            const paramValue = params[param];
            return paramValue !== undefined ? String(paramValue) : match;
          });

          return result;
        }

        return value.replace(/{(\w+)}/g, (match: string, param: string): string => {
          const paramValue = params[param];
          return paramValue !== undefined ? String(paramValue) : match;
        });
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
