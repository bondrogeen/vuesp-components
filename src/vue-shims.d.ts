declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module 'vuesp-components' {
  import * as components from 'vuesp-components/dist/types';
  export = components;
}
