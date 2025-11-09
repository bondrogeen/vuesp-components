import { App } from 'vue';
import { ObjectPlugin } from 'node_modules/@vue/runtime-core/dist/runtime-core';

import directives from '@/utils/directives';
import type { ItemDirective } from '@/utils/directives';

import { VButton, VSelect, VLoader, VDropdown, VList, VTextField, VWifiIcon, VIcon, CardMain } from '@/components/';
import * as dashboard from '@/components/dashboard';
import * as app from '@/components/app';

import '@/assets/tailwind.css';

import { Component } from 'vue';

const components: Record<string, Component> = { ...app, ...dashboard, VButton, VLoader, VDropdown, VList, VTextField, VSelect, VWifiIcon, VIcon, CardMain };

export * from '@/components/';

export default {
  install: (app: App) => {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name]);
    });
    directives.forEach(({ name, directive }: ItemDirective) => app.directive(name, directive));
  },
} as ObjectPlugin;

export * from '@/dashboard';
