/**
 * TypeScript declaration file for style.css
 * This allows TypeScript to recognize CSS imports without errors
 */

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
