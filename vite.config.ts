import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/vuesp-components',
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader({ svgoConfig: { plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }] } }),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: {
        main: path.resolve(__dirname, 'src/index.ts'),
        dashboard: path.resolve(__dirname, 'src/dashboard/index.ts'),
        plugins: path.resolve(__dirname, 'src/plugins/index.ts'),
        composables: path.resolve(__dirname, 'src/composables/index.ts'),
        helpers: path.resolve(__dirname, 'src/helpers/index.ts'),
      },
      fileName: (format, entryName) => {
        if (entryName === 'main') return `index.${format}.js`;
        return `${entryName}/index.${format}.js`;
      },
      name: 'vuesp-components',
      formats: ['es' as const],
    },
    rollupOptions: {
      treeshake: 'smallest',
      external: ['vue'],
      output: {
        inlineDynamicImports: false,
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
}));
