import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import typescript2 from 'rollup-plugin-typescript2';
import dts from 'vite-plugin-dts';

const path = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
    typescript2({
      check: false,
      include: ['src/components/**/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          outDir: 'dist',
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ['vite.config.ts', 'index.ts'],
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path,
    },
  },

  build: {
    target: 'esnext',
    lib: {
      entry: `${path}/index.ts`,
      name: 'VuespComponents',
      fileName: (format) => `vuesp-components.${format}.js`,
    },
    // filenameHashing: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
