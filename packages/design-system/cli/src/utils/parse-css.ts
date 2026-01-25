/**
 * CSS Parser Utilities
 *
 * Parse CSS files and extract custom properties (CSS variables)
 */

import { readFile } from 'fs/promises';

export interface CSSCustomProperty {
  name: string;
  value: string;
  line: number;
}

/**
 * Parse CSS file and extract all custom properties
 */
export async function parseCSSFile(filePath: string): Promise<CSSCustomProperty[]> {
  const content = await readFile(filePath, 'utf-8');
  return parseCSSContent(content);
}

/**
 * Parse CSS content and extract all custom properties
 */
export function parseCSSContent(content: string): CSSCustomProperty[] {
  const properties: CSSCustomProperty[] = [];

  // Remove comments first to avoid confusion
  const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match CSS custom properties including multi-line values
  // Regex explanation:
  // - (--[\w-]+) - captures property name
  // - \s*:\s* - matches colon with optional whitespace
  // - ([^;]+) - captures value (everything until semicolon)
  // - ; - matches semicolon
  // The /s flag makes . match newlines too
  const customPropRegex = /(--[\w-]+)\s*:\s*([^;]+);/gs;

  let match;
  while ((match = customPropRegex.exec(cleanContent)) !== null) {
    const [fullMatch, name, value] = match;

    // Find the line number by counting newlines before this match
    const textBefore = cleanContent.substring(0, match.index);
    const lineNumber = (textBefore.match(/\n/g) || []).length + 1;

    properties.push({
      name: name.trim(),
      value: value.trim().replace(/\s+/g, ' '), // Normalize whitespace
      line: lineNumber,
    });
  }

  return properties;
}

/**
 * Extract token name from CSS custom property name
 * Example: --lufa-primitive-color-blue-500 -> primitive.color.blue.500
 */
export function tokenNameFromCSSVar(cssVarName: string): string {
  // Remove leading -- and lufa- prefix
  const cleaned = cssVarName.replace(/^--lufa-/, '');

  // Convert kebab-case to dot notation
  return cleaned.replace(/-/g, '.');
}

/**
 * Convert token name to CSS variable name
 * Example: primitive.color.blue.500 -> --lufa-primitive-color-blue-500
 */
export function cssVarNameFromToken(tokenName: string): string {
  // Convert dot notation to kebab-case
  const kebab = tokenName.replace(/\./g, '-');

  // Add --lufa- prefix
  return `--lufa-${kebab}`;
}

/**
 * Check if a value is a CSS variable reference
 */
export function isCSSVarReference(value: string): boolean {
  return /^var\(--[\w-]+\)$/.test(value.trim());
}

/**
 * Extract CSS variable name from a var() reference
 * Example: var(--lufa-primitive-color-blue-500) -> --lufa-primitive-color-blue-500
 */
export function extractCSSVarName(varReference: string): string | null {
  const match = varReference.match(/^var\((--[\w-]+)\)$/);
  return match ? match[1] : null;
}

/**
 * Check if a value is a valid hex color
 */
export function isValidHexColor(value: string): boolean {
  return /^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/.test(value.trim());
}

/**
 * Check if a value is a valid dimension (px, rem, em, etc.)
 */
export function isValidDimension(value: string): boolean {
  return /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax)$/.test(value.trim());
}

/**
 * Check if a value is a valid duration (ms, s)
 */
export function isValidDuration(value: string): boolean {
  return /^\d+(\.\d+)?(ms|s)$/.test(value.trim());
}

/**
 * Group custom properties by category (primitive, core, semantic, component)
 */
export function groupPropertiesByLevel(properties: CSSCustomProperty[]): Record<string, CSSCustomProperty[]> {
  const grouped: Record<string, CSSCustomProperty[]> = {
    primitive: [],
    core: [],
    semantic: [],
    component: [],
    unknown: [],
  };

  properties.forEach((prop) => {
    if (prop.name.startsWith('--lufa-primitive-')) {
      grouped.primitive.push(prop);
    } else if (prop.name.startsWith('--lufa-core-')) {
      grouped.core.push(prop);
    } else if (prop.name.startsWith('--lufa-semantic-')) {
      grouped.semantic.push(prop);
    } else if (prop.name.startsWith('--lufa-component-')) {
      grouped.component.push(prop);
    } else {
      grouped.unknown.push(prop);
    }
  });

  return grouped;
}
