import { App, Plugin, Component } from 'vue';

import directives from '@/utils/directives';
import type { ItemDirective } from '@/utils/directives';

import { VButton, VSelect, VLoader, VDropdown, VList, VTextField, VWifiIcon, VIcon, CardMain } from '@/components/';
import * as dashboard from '@/components/dashboard';
import * as app from '@/components/app';

import '@/assets/tailwind.css';

const components: Record<string, Component> = { ...app, ...dashboard, VButton, VLoader, VDropdown, VList, VTextField, VSelect, VWifiIcon, VIcon, CardMain };

export * from '@/components/';

export default {
  install: (app: App) => {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name]);
    });
    directives.forEach(({ name, directive }: ItemDirective) => app.directive(name, directive));
  },
} as Plugin;

export * from '@/dashboard';
