/**
 * Token Metadata Type Definitions
 *
 * Defines the structure of Lufa token metadata extensions.
 *
 * @see ADR-011: Token Architecture - Primitives as Immutable Constants
 */

/**
 * Token layer in the architecture hierarchy
 */
export type TokenLevel = 'primitive' | 'core' | 'semantic' | 'component' | 'layout';

/**
 * Token category (for organizational purposes)
 */
export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'typography'
  | 'shadow'
  | 'radius'
  | 'motion'
  | 'breakpoint'
  | 'height'
  | 'brand'
  | 'neutral'
  | 'semantic'
  | 'layout';

/**
 * Mode definitions for accessibility contexts
 */
export interface TokenModes {
  /** Light mode value */
  light: string;
  /** Dark mode value */
  dark: string;
  /** High-contrast mode value */
  'high-contrast': string;
}

/**
 * Theme definitions for brand variations (Phase 6)
 */
export interface TokenThemes {
  /** Default Lufa theme */
  default: string;
  /** Partner theme variants */
  [themeName: string]: string;
}

/**
 * Lufa-specific token metadata extensions
 */
export interface LufaExtensions {
  /**
   * Token layer in the architecture
   *
   * @see ADR-011 for layer definitions
   */
  level: TokenLevel;

  /**
   * Token category for organization
   */
  category?: TokenCategory;

  /**
   * Can this token vary by theme (branding)?
   *
   * - `true`: Token can be overridden by different themes (e.g., brand colors)
   * - `false`: Token is a constant across all themes (e.g., primitives, layout)
   *
   * @default false for primitives and layout, true for others
   */
  themeable: boolean;

  /**
   * Can this token vary by mode (light/dark/high-contrast)?
   *
   * - `true`: Token has different values for different accessibility modes
   * - `false`: Token value is the same across all modes
   *
   * @default false for primitives and layout, varies for others
   */
  modeAware: boolean;

  /**
   * Mode-specific token values
   *
   * Only valid if `modeAware: true`
   * Must define all three modes: light, dark, high-contrast
   */
  modes?: TokenModes;

  /**
   * Theme-specific token values (Phase 6)
   *
   * Only valid if `themeable: true`
   */
  themes?: TokenThemes;

  /**
   * Additional notes or documentation
   */
  description?: string;
}

/**
 * Design Token structure (DTCG format)
 */
export interface DesignToken {
  /** Token value */
  $value: string | number;

  /** Token type (color, dimension, fontFamily, etc.) */
  $type?: string;

  /** Human-readable description */
  $description?: string;

  /** Platform-specific extensions */
  $extensions?: {
    /** Lufa-specific metadata */
    lufa?: LufaExtensions;
    /** Other extensions */
    [key: string]: unknown;
  };
}

/**
 * Token collection (recursive structure)
 */
export interface TokenCollection {
  [key: string]: DesignToken | TokenCollection;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Is the token valid? */
  valid: boolean;
  /** Validation errors */
  errors: ValidationError[];
}

/**
 * Validation error details
 */
export interface ValidationError {
  /** Error message */
  message: string;
  /** Token path (e.g., "primitive.color.blue.600") */
  tokenPath: string;
  /** File where error occurred */
  file: string;
  /** Rule that was violated */
  rule: ValidationRule;
}

/**
 * Validation rules
 */
export type ValidationRule =
  | 'primitives-immutable'
  | 'modes-require-modeAware'
  | 'themes-require-themeable'
  | 'layout-structural'
  | 'modes-complete'
  | 'no-typo-themable';

/**
 * Type guard: Check if object is a DesignToken
 */
export function isDesignToken(obj: unknown): obj is DesignToken {
  return typeof obj === 'object' && obj !== null && ('$value' in obj || '$extensions' in obj);
}

/**
 * Type guard: Check if token is a primitive
 */
export function isPrimitiveToken(token: DesignToken): boolean {
  return token.$extensions?.lufa?.level === 'primitive';
}

/**
 * Type guard: Check if token is mode-aware
 */
export function isModeAwareToken(token: DesignToken): boolean {
  return token.$extensions?.lufa?.modeAware === true;
}

/**
 * Type guard: Check if token is themeable
 */
export function isThemeableToken(token: DesignToken): boolean {
  return token.$extensions?.lufa?.themeable === true;
}

/**
 * Type guard: Check if token is a layout token
 */
export function isLayoutToken(token: DesignToken): boolean {
  return token.$extensions?.lufa?.level === 'layout';
}
