/**
 * Regex patterns for token paths in TypeScript/JavaScript.
 */
const pathSegmentRe = /(?:\.(?:[A-Za-z_$][A-Za-z0-9_$]*)|\[(?:\d+|["'][^"']+["'])\])/;

const tokenPathRe = new RegExp(
  `\\b(?:tokens|primitives)\\.[A-Za-z_$][A-Za-z0-9_$]*${pathSegmentRe.source}+`
);

/**
 * Match tokens.color.* and primitives.color.* path references.
 */
const createColorPathRe = (): RegExp =>
  new RegExp(`\\b(?:tokens|primitives)\\.color${pathSegmentRe.source}+`, 'g');

export { tokenPathRe, createColorPathRe };
