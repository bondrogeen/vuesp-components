import { createApp } from 'vue';
import App from './App.vue';
import directives from '@/utils/directives/index.ts';

import '@/assets/tailwind.css';

const app = createApp(App);

directives.forEach(({ name, directive }) => app.directive(name, directive));

app.mount('#app');
