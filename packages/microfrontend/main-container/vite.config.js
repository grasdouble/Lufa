import { defineConfig } from "vite";
import reactPreamblePlugin from "@grasdouble/lufa_plugin_vite_vite-plugin-react-preamble";
import importMapInjectorPlugin from "@grasdouble/lufa_plugin_vite_vite-plugin-import-map-injector";

export default defineConfig({
  plugins: [
    importMapInjectorPlugin({
      devImportMap: "src/importMap.dev.json",
      prodImportMap: "src/importMap.json",
    }),
    reactPreamblePlugin(),
  ],
  build: {
    target: "esnext",
    modulePreload: false, // Single-SPA manages the loading of modules
    minify: false,
    rollupOptions: {
      output: {
        format: "esm",
        entryFileNames: "[name].js",
      },
    },
  },
  server: {
    port: 5173,
    cors: true,
    hmr: true,
  },
  preview: {
    port: 5173,
  },
});
