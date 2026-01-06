/**
 * Regex patterns used to detect Lufa token references in documents.
 */
export const tokenHoverRe =
  /--lufa-[a-zA-Z0-9-]+|(?:tokens|primitives)\.[A-Za-z_$][A-Za-z0-9_$]*(?:\.(?:[A-Za-z_$][A-Za-z0-9_$]*)|\[(?:\d+|["'][^"']+["'])\])+/;

/**
 * Match var(--lufa-*) usages, including optional fallback values.
 */
export const createCssVarInVarRe = (): RegExp =>
  /var\(\s*(--lufa-(?:color|primitive)-[a-zA-Z0-9-]+)\s*(?:,[^)]+)?\)/gi;

/**
 * Match direct --lufa-* CSS variable declarations.
 */
export const createCssVarDirectRe = (): RegExp =>
  /(--lufa-(?:color|primitive)-[a-zA-Z0-9-]+)(?=\s*:)/gi;

/**
 * Match primitives.color.* path references for chromatic and neutral sets.
 */
export const createPrimitivePathRe = (): RegExp =>
  /\bprimitives.color\.(?:chromatic|neutral)\.[a-zA-Z_][a-zA-Z0-9_]*\[\d+\]/g;

/**
 * Match tokens.color.* path references.
 */
export const createTokenPathRe = (): RegExp => /\btokens\.color(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+/g;
