import type { App } from 'vue';

import directives from '@/utils/directives/index.ts';

import * as general from '@/components/general/index.ts';
import * as icons from '@/components/icons/index.ts';
import * as cards from '@/components/cards/index.ts';
import * as dashboard from '@/components/dashboard/index.ts';
import * as app from '@/components/app/index.ts';

import '@/assets/tailwind.css';

const components: any = { ...icons, ...general, ...cards, ...dashboard, ...app };

export default {
  install: (app: App) => {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name]);
    });

    directives.forEach(({ name, directive }) => app.directive(name, directive));
  },
};
