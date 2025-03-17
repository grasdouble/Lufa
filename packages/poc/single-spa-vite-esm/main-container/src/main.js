import { registerApplication, start } from "single-spa";
import "import-map-overrides";

const loadApp = (url) => () => import(/* @vite-ignore */ url);

// PARCELS
registerApplication({
  name: "parcelA",
  app: loadApp("@app/parcelA"),
  activeWhen: ["/"],
});

start();
