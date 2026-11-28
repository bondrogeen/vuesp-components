import { inject } from 'vue';

import type { II18nInstance } from '@/plugins/i18n/types';

export const useI18n = (): II18nInstance => {
  const i18n = inject<II18nInstance>('i18n');

  if (!i18n) {
    throw new Error('i18n not provided');
  }

  return i18n;
};
