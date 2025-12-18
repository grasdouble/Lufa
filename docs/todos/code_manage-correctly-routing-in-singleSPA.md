# Resolving Microfrontend Loading Issues in SingleSPA

## Problem: Microfrontend for `/` is Loading on Other Routes (e.g., `/doc`)

This issue occurs because the microfrontend registered for `/` in **SingleSPA** is likely configured to be active on all routes. This happens if the `activeWhen` function for that application is too permissive and returns `true` for routes where it shouldn't.

---

## Solution: Fix the `activeWhen` Function

The `activeWhen` function determines when a microfrontend should be active based on the current URL. If your application for `/` is loading on all routes, you need to restrict its `activeWhen` function.

---

### 1. Check Your `activeWhen` Function

When registering an application in SingleSPA, you use the `registerApplication` method. If your `activeWhen` function is too broad, it might look like this:

```javascript
registerApplication({
  name: '@org/app-home',
  app: () => System.import('@org/app-home'),
  activeWhen: () => true, // This activates the app on all routes
});
```

This will cause the application to load on every route.

---

### 2. Restrict the `activeWhen` Function

To ensure the application is only active on `/`, update the `activeWhen` function like this:

```javascript
registerApplication({
  name: '@org/app-home',
  app: () => System.import('@org/app-home'),
  activeWhen: (location) => location.pathname === '/', // Active only on "/"
});
```

If you want the application to be active on `/` and its sub-routes (e.g., `/about`), use:

```javascript
registerApplication({
  name: '@org/app-home',
  app: () => System.import('@org/app-home'),
  activeWhen: (location) => location.pathname.startsWith('/'),
});
```

For an application that should only be active on `/doc`:

```javascript
registerApplication({
  name: '@org/app-doc',
  app: () => System.import('@org/app-doc'),
  activeWhen: (location) => location.pathname.startsWith('/doc'),
});
```

---

### 3. Prioritize Applications if Necessary

If multiple applications can be active on the same route, SingleSPA will load all of them. To avoid this, ensure your `activeWhen` functions are specific and do not overlap unnecessarily.

---

### 4. Debug with SingleSPA DevTools

To see which applications are active for a given route, use the **SingleSPA Inspector** browser extension. You can install it for [Chrome](https://chrome.google.com/webstore/detail/single-spa-inspector/annopcfmbiofommjmcmcfmhklhgbhkce) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/single-spa-inspector/).

---

## Example Configuration

Here’s an example configuration for two microfrontends:

```javascript
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@org/app-home',
  app: () => System.import('@org/app-home'),
  activeWhen: (location) => location.pathname === '/', // Active only on "/"
});

registerApplication({
  name: '@org/app-doc',
  app: () => System.import('@org/app-doc'),
  activeWhen: (location) => location.pathname.startsWith('/doc'), // Active only on "/doc"
});

start();
```

---

## Expected Behavior

- If the URL is `/`, only the `@org/app-home` microfrontend will load.
- If the URL is `/doc` or a sub-route like `/doc/guide`, only the `@org/app-doc` microfrontend will load.
- Both applications will not load simultaneously unless their `activeWhen` functions overlap.

---

## Additional Notes

If the issue persists, ensure your server or routing configuration (e.g., Nginx) correctly redirects all routes to your SingleSPA application. Misconfigured routing can also cause unexpected behavior.
