import { App, Plugin, Component } from 'vue';

import directives from '@/utils/directives';
import type { IItemDirective } from '@/utils/directives';

import { VButton, VSelect, VLoader, VDropdown, VList, VTextField, VWifiIcon, VIconLogoMini, VIconLogo, VDialog } from '@/components/';

import '@/assets/tailwind.css';

const components: Record<string, Component> = {
  VButton,
  VLoader,
  VDropdown,
  VList,
  VTextField,
  VSelect,
  VWifiIcon,
  VIconLogoMini,
  VIconLogo,
  VDialog,
};

const vuesp: Plugin = {
  install: (app: App) => {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name]);
    });
    directives.forEach(({ name, directive }: IItemDirective) => app.directive(name, directive));
  },
};

export default vuesp;
