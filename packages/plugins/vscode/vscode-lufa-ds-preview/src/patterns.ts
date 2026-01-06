export const tokenHoverRe =
  /--lufa-[a-zA-Z0-9-]+|(?:tokens|primitives)\.[A-Za-z_$][A-Za-z0-9_$]*(?:\.(?:[A-Za-z_$][A-Za-z0-9_$]*)|\[(?:\d+|["'][^"']+["'])\])+/;

export const createCssVarInVarRe = (): RegExp =>
  /var\(\s*(--lufa-(?:color|primitive)-[a-zA-Z0-9-]+)\s*(?:,[^)]+)?\)/gi;

export const createCssVarDirectRe = (): RegExp =>
  /(--lufa-(?:color|primitive)-[a-zA-Z0-9-]+)(?=\s*:)/gi;

export const createPrimitivePathRe = (): RegExp =>
  /\bprimitives.color\.(?:chromatic|neutral)\.[a-zA-Z_][a-zA-Z0-9_]*\[\d+\]/g;

export const createTokenPathRe = (): RegExp => /\btokens\.color(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+/g;
