import { App } from 'vue';
import { ObjectPlugin } from 'node_modules/@vue/runtime-core/dist/runtime-core';

import directives from '@/utils/directives';

import { VButton, VLoader, VDropdown, VList, VTextField, WifiIcon, VIcons, VCardGray } from '@/components/general';
import * as dashboard from '@/components/dashboard';
import * as app from '@/components/app';

import '@/assets/tailwind.css';

const components: any = { ...app, ...dashboard, VButton, VLoader, VDropdown, VList, VTextField, WifiIcon, VIcons, VCardGray };

export * from '@/components/general/';
export * from '@/components/app/';

export default {
  install: (app: App, options?: any) => {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name]);
    });
    directives.forEach(({ name, directive }: any) => app.directive(name, directive));
  },
} as ObjectPlugin;
