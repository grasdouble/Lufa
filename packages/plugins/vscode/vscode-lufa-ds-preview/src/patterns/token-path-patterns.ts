/**
 * Regex patterns for token paths in TypeScript/JavaScript.
 * Supports: tokens.*, primitive.*, core.*, semantic.*, component.*
 */
const pathSegmentRe = /(?:\.(?:[A-Za-z0-9_$]+)|\[(?:\d+|["'][^"']+["'])\])/;

const tokenPathRe = new RegExp(
  `\\b(?:tokens|primitive|core|semantic|component)\\.[A-Za-z_$][A-Za-z0-9_$]*${pathSegmentRe.source}+`
);

/**
 * Match color path references (tokens.color.*, primitive.color.*, etc.)
 */
const createColorPathRe = (): RegExp =>
  new RegExp(`\\b(?:tokens|primitive|core|semantic|component)\\.color${pathSegmentRe.source}+`, 'g');

export { tokenPathRe, createColorPathRe };
