/// <reference types="vite/client" />

/**
 * CSS Modules type declarations
 * Allows importing .module.css files with TypeScript support
 */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

/**
 * Regular CSS imports
 */
declare module '*.css' {
  const content: string;
  export default content;
}
