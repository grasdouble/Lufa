import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    externalizeDeps({
      deps: true,
      devDeps: false,
      optionalDeps: false,
      peerDeps: false,
      except: ["single-spa-react"],
      nodeBuiltins: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("dev"),
    "process.env": {},
  },
  build: {
    minify: true,
    lib: {
      formats: ["es"],
      entry: {
        index: "src/parcel.jsx",
      },
      fileName: () => "home.mjs",
      preserveEntrySignatures: "strict",
    },
    sourcemap: true,
  },
  server: {
    port: 4101,
    hmr: true,
  },
  preview: {
    port: 4101,
  },
});
