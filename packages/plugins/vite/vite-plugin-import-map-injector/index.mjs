import fs from "fs";
import path from "path";

export default function importMapPlugin({
  prodImportMap = "importMap.json",
  devImportMap = "importMap.dev.json",
} = {}) {
  return {
    name: "vite-plugin-importmap",
    transformIndexHtml(html, ctx) {
      const isDev = ctx?.server ? true : false;
      const prodImportMapPath = path.resolve(process.cwd(), prodImportMap);
      const devImportMapPath = path.resolve(process.cwd(), devImportMap);

      let prodImportMapContent = {};
      let devImportMapContent = {};

      if (fs.existsSync(prodImportMapPath)) {
        prodImportMapContent = JSON.parse(
          fs.readFileSync(prodImportMapPath, "utf-8")
        );
      } else {
        console.warn(
          `[vite-plugin-importmap-injector] ⚠️ import-map for production not found: ${prodImportMapPath}`
        );
      }

      if (isDev && fs.existsSync(devImportMapPath)) {
        devImportMapContent = JSON.parse(
          fs.readFileSync(devImportMapPath, "utf-8")
        );
      } else if (isDev) {
        console.warn(
          `[vite-plugin-importmap-injector] ⚠️ import-map for development not found: ${devImportMapPath}`
        );
      }

      const mergedImportMap = {
        imports: {
          ...(!isDev ? prodImportMapContent.imports || {} : {}),
          ...(isDev ? devImportMapContent.imports || {} : {}),
        },
      };

      // overridable-importmap is a custom attribute used by single-spa and import-map-overrides
      // to allow the import map to be overridden at runtime
      // see https://github.com/single-spa/import-map-overrides/blob/main/docs/configuration.md#client-side-single-map
      return html.replace(
        "</head>",
        `<script type="overridable-importmap">${JSON.stringify(
          mergedImportMap,
          null,
          2
        )}</script>\n</head>`
      );
    },
  };
}
