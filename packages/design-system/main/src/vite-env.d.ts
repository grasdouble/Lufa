/// <reference types="vite/client" />

/**
 * CSS Modules type declarations
 * Allows importing .module.css files with TypeScript support
 */
declare module '*.module.css' {
  type CSSModuleClasses = Readonly<Record<string, string>>;
  const classes: CSSModuleClasses;
  export default classes;
}

/**
 * Regular CSS imports
 */
declare module '*.css' {
  const content: string;
  export default content;
}
