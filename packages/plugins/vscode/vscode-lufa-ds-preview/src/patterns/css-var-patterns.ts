/**
 * Regex patterns for CSS variables in Lufa tokens and primitives.
 */
const cssVarNameRe = /--lufa-(?:token|primitive)-[a-zA-Z0-9-]+/;
const cssColorVarNameRe = /--lufa-(?:token|primitive)-color-[a-zA-Z0-9-]+/;

/**
 * Match var(--lufa-*) usages for Lufa color CSS variables, including optional fallback values.
 */
const createCssColorVarInVarRe = (): RegExp =>
  new RegExp(`var\\(\\s*(${cssColorVarNameRe.source})\\s*(?:,[^)]+)?\\)`, 'gi');

/**
 * Match direct declarations for Lufa color CSS variables.
 */
const createCssColorVarDirectRe = (): RegExp =>
  new RegExp(`(${cssColorVarNameRe.source})(?=\\s*:)`, 'gi');

/**
 * Match literal oklch() color values.
 */
const createOklchColorRe = (): RegExp => /oklch\(\s*[^)]+\)/gi;

export {
  cssVarNameRe,
  createCssColorVarInVarRe,
  createCssColorVarDirectRe,
  createOklchColorRe,
};
