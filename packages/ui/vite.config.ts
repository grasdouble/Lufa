import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import reactPlugin from "@vitejs/plugin-react";

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  const defaultDefine = {
    __APP_ENV__: JSON.stringify(env.APP_ENV),
  };

  const defaultPlugin = [reactPlugin()];

  if (command === "serve") {
    return {
      // dev specific config
      plugins: [...defaultPlugin],
      define: {
        ...defaultDefine,
      },
    };
  } else if (isPreview) {
    return {
      // preview specific config
      plugins: [...defaultPlugin],
      define: {
        ...defaultDefine,
      },
    };
  } else if (command === "build") {
    return {
      // build specific config
      plugins: [
        ...defaultPlugin,
        dts({
          entryRoot: "src",
          tsconfigPath: "./tsconfig.build.json",
          rollupTypes: false,
          outDir: "dist",
          exclude: ["**/*.test.*"],
        }),
        externalizeDeps({
          deps: false,
          devDeps: false,
          except: [],
          nodeBuiltins: false,
          optionalDeps: false,
          peerDeps: true,
        }),
      ],
      define: {
        ...defaultDefine,
      },
      build: {
        target: "modules",
        minify: true,
        sourcemap: true,
        cssMinify: false,
        outDir: "dist",
        lib: {
          formats: ["es"],
          entry: resolve(__dirname, "src/index.ts"),
          name: "LufaUi",
          cssFileName: "style",
          fileName: (format: string, entryName: string) => {
            let output = "lufa-ui";
            if (format === "es") {
              output += ".mjs";
            } else if (format === "umd") {
              output += ".umd.cjs";
            } else {
              throw new Error("format not managed");
            }
            return output;
          },
        },
        // rollupOptions:{
        //   external:['react'],
        //   output: {
        //     globals: {
        //       react: "react"
        //     },
        //   },
        // }
      },
    };
  } else {
    // Oops something wrong should happen
    return {};
  }
});
