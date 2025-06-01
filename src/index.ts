import type { App } from 'vue';

import directives from '@/utils/directives/index.ts';

import * as general from '@/components/general/index.ts';
import * as icons from '@/components/icons/index.ts';
import * as cards from '@/components/cards/index.ts';

import '@/assets/tailwind.css';

const components: any = { ...icons, ...general, ...cards };

export default {
  install: (app: App) => {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name]);
    });

    directives.forEach(({ name, directive }) => app.directive(name, directive));
  },
};
