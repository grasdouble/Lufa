export default function reactPreamblePlugin() {
  let isDev = false;

  return {
    name: "vite-plugin-react-preamble",
    // Le hook configResolved permet d'accéder à la config complète
    configResolved(config) {
      isDev = config.env.MODE === "development";
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        // En mode production, on ne modifie pas l'HTML
        if (!isDev) return html;

        // En mode dev, on injecte les balises nécessaires
        return {
          html,
          tags: [
            {
              tag: "script",
              attrs: { type: "module" },
              children: `
                  import RefreshRuntime from 'http://localhost:4101/@react-refresh'
                  RefreshRuntime.injectIntoGlobalHook(window)
                  window.$RefreshReg$ = () => { }
                  window.$RefreshSig$ = () => (type) => type
                  window.__vite_plugin_react_preamble_installed__ = true
                `,
              injectTo: "head",
            },
            {
              tag: "script",
              attrs: {
                type: "module",
                src: "http://localhost:4101/@vite/client",
              },
              injectTo: "head",
            },
          ],
        };
      },
    },
  };
}
