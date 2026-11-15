// vite.config.ts
import { defineConfig } from "file:///home/brg/github/pets/vuesp-projects/vuesp-components/node_modules/vite/dist/node/index.js";
import vue from "file:///home/brg/github/pets/vuesp-projects/vuesp-components/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///home/brg/github/pets/vuesp-projects/vuesp-components/node_modules/vite-plugin-dts/dist/index.mjs";
import * as path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "file:///home/brg/github/pets/vuesp-projects/vuesp-components/node_modules/@tailwindcss/vite/dist/index.mjs";
import Components from "file:///home/brg/github/pets/vuesp-projects/vuesp-components/node_modules/unplugin-vue-components/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///home/brg/github/pets/vuesp-projects/vuesp-components/vite.config.ts";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig(() => ({
  cacheDir: ".vite",
  plugins: [
    vue(),
    tailwindcss(),
    Components(),
    dts({
      entryRoot: "src",
      tsconfigPath: path.join(__dirname, "tsconfig.lib.json")
    })
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      entry: {
        main: path.resolve(__dirname, "src/index.ts"),
        components: path.resolve(__dirname, "src/components/index.ts"),
        dashboard: path.resolve(__dirname, "src/dashboard/index.ts"),
        plugins: path.resolve(__dirname, "src/plugins/index.ts"),
        composables: path.resolve(__dirname, "src/composables/index.ts"),
        helpers: path.resolve(__dirname, "src/helpers/index.ts"),
        validate: path.resolve(__dirname, "src/validate/index.ts")
      },
      fileName: (format, entryName) => {
        if (entryName === "main") return `index.${format}.js`;
        return `${entryName}/index.${format}.js`;
      },
      name: "vuesp-components",
      formats: ["es"]
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false
      },
      external: ["vue"],
      output: {
        inlineDynamicImports: false,
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3e3
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9icmcvZ2l0aHViL3BldHMvdnVlc3AtcHJvamVjdHMvdnVlc3AtY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYnJnL2dpdGh1Yi9wZXRzL3Z1ZXNwLXByb2plY3RzL3Z1ZXNwLWNvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYnJnL2dpdGh1Yi9wZXRzL3Z1ZXNwLXByb2plY3RzL3Z1ZXNwLWNvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSc7XG5cbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+ICh7XG4gIGNhY2hlRGlyOiAnLnZpdGUnLFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgICBDb21wb25lbnRzKCksXG4gICAgZHRzKHtcbiAgICAgIGVudHJ5Um9vdDogJ3NyYycsXG4gICAgICB0c2NvbmZpZ1BhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICd0c2NvbmZpZy5saWIuanNvbicpLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgZXh0ZW5zaW9uczogWycubWpzJywgJy5qcycsICcudHMnLCAnLmpzeCcsICcudHN4JywgJy5qc29uJywgJy52dWUnXSxcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICcuL2Rpc3QnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgfSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgY29tcG9uZW50czogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzL2luZGV4LnRzJyksXG4gICAgICAgIGRhc2hib2FyZDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9kYXNoYm9hcmQvaW5kZXgudHMnKSxcbiAgICAgICAgcGx1Z2luczogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wbHVnaW5zL2luZGV4LnRzJyksXG4gICAgICAgIGNvbXBvc2FibGVzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvc2FibGVzL2luZGV4LnRzJyksXG4gICAgICAgIGhlbHBlcnM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaGVscGVycy9pbmRleC50cycpLFxuICAgICAgICB2YWxpZGF0ZTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy92YWxpZGF0ZS9pbmRleC50cycpLFxuICAgICAgfSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0LCBlbnRyeU5hbWUpID0+IHtcbiAgICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gJ21haW4nKSByZXR1cm4gYGluZGV4LiR7Zm9ybWF0fS5qc2A7XG4gICAgICAgIHJldHVybiBgJHtlbnRyeU5hbWV9L2luZGV4LiR7Zm9ybWF0fS5qc2A7XG4gICAgICB9LFxuICAgICAgbmFtZTogJ3Z1ZXNwLWNvbXBvbmVudHMnLFxuICAgICAgZm9ybWF0czogWydlcycgYXMgY29uc3RdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgdHJlZXNoYWtlOiB7XG4gICAgICAgIG1vZHVsZVNpZGVFZmZlY3RzOiBmYWxzZSxcbiAgICAgICAgcHJvcGVydHlSZWFkU2lkZUVmZmVjdHM6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGlubGluZUR5bmFtaWNJbXBvcnRzOiBmYWxzZSxcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVixTQUFTLG9CQUFvQjtBQUM5VyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBQ2hCLFlBQVksVUFBVTtBQUN0QixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLGlCQUFpQjtBQUV4QixPQUFPLGdCQUFnQjtBQVAyTCxJQUFNLDJDQUEyQztBQVNuUSxJQUFNLFlBQWlCLGFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBRTdELElBQU8sc0JBQVEsYUFBYSxPQUFPO0FBQUEsRUFDakMsVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsSUFBSTtBQUFBLE1BQ0YsV0FBVztBQUFBLE1BQ1gsY0FBbUIsVUFBSyxXQUFXLG1CQUFtQjtBQUFBLElBQ3hELENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZLENBQUMsUUFBUSxPQUFPLE9BQU8sUUFBUSxRQUFRLFNBQVMsTUFBTTtBQUFBLElBQ2xFLE9BQU87QUFBQSxNQUNMLEtBQVUsYUFBUSxXQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLHNCQUFzQjtBQUFBLElBQ3RCLGlCQUFpQjtBQUFBLE1BQ2YseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxRQUNMLE1BQVcsYUFBUSxXQUFXLGNBQWM7QUFBQSxRQUM1QyxZQUFpQixhQUFRLFdBQVcseUJBQXlCO0FBQUEsUUFDN0QsV0FBZ0IsYUFBUSxXQUFXLHdCQUF3QjtBQUFBLFFBQzNELFNBQWMsYUFBUSxXQUFXLHNCQUFzQjtBQUFBLFFBQ3ZELGFBQWtCLGFBQVEsV0FBVywwQkFBMEI7QUFBQSxRQUMvRCxTQUFjLGFBQVEsV0FBVyxzQkFBc0I7QUFBQSxRQUN2RCxVQUFlLGFBQVEsV0FBVyx1QkFBdUI7QUFBQSxNQUMzRDtBQUFBLE1BQ0EsVUFBVSxDQUFDLFFBQVEsY0FBYztBQUMvQixZQUFJLGNBQWMsT0FBUSxRQUFPLFNBQVMsTUFBTTtBQUNoRCxlQUFPLEdBQUcsU0FBUyxVQUFVLE1BQU07QUFBQSxNQUNyQztBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLElBQWE7QUFBQSxJQUN6QjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsV0FBVztBQUFBLFFBQ1QsbUJBQW1CO0FBQUEsUUFDbkIseUJBQXlCO0FBQUEsTUFDM0I7QUFBQSxNQUNBLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBLFFBQ04sc0JBQXNCO0FBQUEsUUFDdEIsU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
