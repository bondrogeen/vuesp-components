import { createApp } from 'vue';
import App from './App.vue';
import directives from '@/utils/directives/index';
import { i18nPlugin } from '@/plugins';

import '@/assets/tailwind.css';

const app = createApp(App);

directives.forEach(({ name, directive }) => app.directive(name, directive));

app.use(i18nPlugin, {
  defaultLocale: 'en',
  locales: {
    en: {
      add: 'Add',
      all: 'All',
      copied: 'Copied',
      lang: 'Language',
      reboot: 'Reboot',
      remove: 'Remove',
      reset: 'Reset',
      save: 'Save',
      scan: 'Scan',
      security: 'Security',
      select: 'Select',
      selectLang: 'Interface language',
      btnUpdate: 'Update',
      rebootDev: 'Reboot device',
      resetConf: 'Reset configuration',
      used: 'This ID is already in use',
      dashboard: {
        argument: 'Argument',
        getResult: 'Return value',
        newValue: 'New value',
      },
    },
    ru: {
      add: 'Добавить',
      all: 'Все',
      copied: 'Скопировано',
      lang: 'Язык',
      reboot: 'Перезагрузить',
      remove: 'Удалить',
      reset: 'Сбросить',
      save: 'Сохранить',
      scan: 'Сканировать',
      security: 'Защита',
      select: 'Выбрать',
      selectLang: 'Язык интерфейса',
      btnUpdate: 'Обновить',
      rebootDev: 'Перезагрузить устройство',
      resetConf: 'Сбросить настройки',
      used: 'Этот ID уже используется',
      dashboard: {
        argument: 'Аргумент',
        getResult: 'Результат',
        newValue: 'Новое значение',
      },
    },
  },
  pluralize: (_locale: string, count: number, forms: string[]) => forms[count === 1 ? 0 : 1] ?? forms[0] ?? '',
});

app.mount('#app');
