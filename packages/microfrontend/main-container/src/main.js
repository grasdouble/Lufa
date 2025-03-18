import { registerApplication, start } from "single-spa";
import "import-map-overrides";

const loadApp = (url) => () => import(/* @vite-ignore */ url);

// PARCELS
registerApplication({
  name: "@lufa/microfrontend_home",
  app: loadApp("@lufa/microfrontend_home"),
  activeWhen: ["/"],
});
registerApplication({
  name: "@lufa/apps_storybook",
  app: async () => {
    // Create a false module to encapsulate your storybook application
    return {
      bootstrap: () => Promise.resolve(),
      mount: () => {
        // Create an iframe to encapsulate the storybook application
        const iframe = document.createElement("iframe");
        iframe.src = "https://storybook.sebastien-lemouillour.fr";
        iframe.style.width = "100%";
        iframe.style.height = "100vh";
        iframe.style.border = "none";
        document.getElementById("app").appendChild(iframe);
        return Promise.resolve();
      },
      unmount: () => {
        // Unmount the iframe and remove it from the DOM
        const iframe = document.getElementById("storybook-iframe");
        if (iframe) {
          iframe.remove();
        }
        return Promise.resolve();
      },
    };
  },
  activeWhen: ["/storybook"], // Active when the URL is /storybook
});

start();
