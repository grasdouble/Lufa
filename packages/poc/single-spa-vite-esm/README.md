# SingleSPA with Vite and ESM

## What

**SingleSPA** is a JavaScript framework that enables you to combine multiple micro-frontends into a single application.

It allows you to load and run multiple independent front-end applications, **written with different frameworks** (such as React, Angular, Vue, etc.), on the same web page.

This makes it easier to manage and develop large applications by breaking them down into smaller, autonomous parts.

## Goal

SingleSPA is known to work with SystemJS and Webpack, but now it's possible to use SingleSPA with ESM and Vite and I want to test that.

## Why

SystemJS is an old module loader that was designed to support the dynamic loading of modules in JavaScript. While it has been a useful tool in the past, it has several limitations and drawbacks compared to modern standards:

1. **Performance**: SystemJS can be slower because it relies on dynamic loading and parsing of modules at runtime, which can introduce latency and affect the performance of your application.

2. **Complexity**: Managing dependencies and configurations with SystemJS can be more complex and error-prone, especially for large projects with many dependencies.

3. **Compatibility**: SystemJS was designed before the advent of modern JavaScript module standards, which means it may not be fully compatible with the latest features and best practices in the JavaScript ecosystem.

On the other hand, ECMAScript Modules (ESM) are the standardized way to define and import modules in JavaScript. ESM offers several advantages:

1. **Native Support**: ESM is natively supported by modern browsers and Node.js, which means you don't need additional tools or polyfills to use it.

2. **Static Analysis**: ESM allows for static analysis of module dependencies, which can lead to better optimization and tree-shaking during the build process, resulting in smaller and more efficient bundles.

3. **Simplicity**: ESM provides a simpler and more intuitive syntax for importing and exporting modules, making it easier to manage dependencies and understand the structure of your code.

4. **Future-Proof**: As the official standard for JavaScript modules, ESM is the future of module management in JavaScript, ensuring long-term compatibility and support.

For these reasons, it is preferable to use ESM with modern tools like Vite to build efficient, maintainable, and future-proof applications.

## POC description

In this POC, you will find 4 packages:

- **main-container**: This package is the root container of the SingleSPA. It will be responsible for loading parcels.
- **parcel-a**: It's a simple parcel containing the react demo.
- **vitePlugin-importMapInjector**: It's a vite plugin used to manage importMap depdending of the mode (dev or production).
- **vitePlugin-reactPreamble**: It's another vite plugin and this one is to make the HMR possible in dev mode with react.
