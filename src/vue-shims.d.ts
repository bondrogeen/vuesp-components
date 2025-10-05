declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module 'vuesp-components' {
  import * as components from 'vuesp-components/dist/types';
  export = components;
}

declare module 'vuesp-components/types' {
  export * from 'vuesp-components/dist/types';
}

declare module 'vuesp-components/helpers' {
  export * from 'vuesp-components/dist/helpers';
}
declare module 'vuesp-components/plugins' {
  export * from 'vuesp-components/dist/plugins';
}
