/**
 * Token Metadata Type Definitions
 *
 * Defines the structure of Lufa token metadata extensions.
 *
 * @see ADR-011: Token Architecture - Primitives as Immutable Constants
 * @see ADR-013: Token Metadata Simplification
 * @see ADR-014: Non-color primitive reference exception
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
 * Mode definitions for accessibility contexts.
 *
 * **Light mode is intentionally absent** — it is always implicit and equals
 * the token's top-level `$value`.  Declaring `modes.light` in a source token
 * is a validation error (RULE 4 in token-consistency.js).
 *
 * @see token-consistency.js RULE 4
 */
export interface TokenModes {
  /** Dark mode value */
  dark: string;
  /** High-contrast mode value */
  'high-contrast'?: string;
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
 * Fluid range configuration for tokens using CSS clamp()
 *
 * @see ADR-008: Responsive Typography Strategy
 * @see docs/FLUID_VS_RESPONSIVE.md for complete guide
 */
export interface FluidRange {
  /** Minimum value (e.g., "32px") */
  min: string;
  /** Maximum value (e.g., "48px") */
  max: string;
  /** Viewport range for scaling */
  viewport: {
    /** Minimum viewport width (e.g., "320px") */
    min: string;
    /** Maximum viewport width (e.g., "1280px") */
    max: string;
  };
}

/**
 * Responsive configuration for tokens using media queries
 *
 * @see ADR-006: Responsive Spacing Architecture
 * @see docs/FLUID_VS_RESPONSIVE.md for complete guide
 */
export interface ResponsiveConfig {
  /** Breakpoint name (base, sm, md, lg, xl, 2xl) */
  breakpoint: string;
  /** Viewport width where this variant applies (e.g., "768px" or "all" for base) */
  applyAt: string;
}

/**
 * Lufa-specific token metadata extensions — **source token file shape**.
 *
 * Use this interface when authoring token JSON files under `src/`.
 *
 * Fields that are **inferred at build time and therefore forbidden in sources**:
 * - `level`  — inferred from the token's path segment (RULE 6)
 * - `modeAware` — inferred from the presence of `modes` (RULE 7)
 *
 * @see token-consistency.js RULE 6, RULE 7
 */
export interface LufaExtensionsSource {
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
   * Note: Primitives MUST NOT include this field (RULE 8).
   *
   * @default false for primitives and layout, true for others
   */
  themeable?: boolean;

  /**
   * Mode-specific token values
   *
   * Presence of this field implies `modeAware: true` — do **not** also set
   * `modeAware` explicitly (forbidden by RULE 7).
   *
   * Must define at least `dark`. Light mode is implicit (= `$value`).
   */
  modes?: TokenModes;

  /**
   * Theme-specific token values (Phase 6)
   *
   * Only valid if `themeable: true`
   */
  themes?: TokenThemes;

  /**
   * Does this token use CSS clamp() for continuous viewport scaling?
   *
   * **Fluid tokens scale continuously across ALL viewport sizes using CSS clamp().**
   *
   * - `true`: Token uses CSS clamp() (e.g., `clamp(2rem, 1.5rem + 2vw, 3rem)`)
   * - `false` or undefined: Token uses fixed values
   *
   * **Mutually exclusive with `responsive`** (RULE 9).
   *
   * @default false
   * @see ADR-008: Responsive Typography Strategy
   * @see docs/FLUID_VS_RESPONSIVE.md for complete guide
   * @see fluidRange for scaling configuration
   */
  fluid?: boolean;

  /**
   * Fluid scaling range configuration (only valid if `fluid: true`)
   *
   * @see fluid
   * @see docs/FLUID_VS_RESPONSIVE.md
   */
  fluidRange?: FluidRange;

  /**
   * Does this token change at specific breakpoints using media queries?
   *
   * **Mutually exclusive with `fluid`** (RULE 9).
   *
   * @see ADR-006: Responsive Spacing Architecture
   * @see docs/FLUID_VS_RESPONSIVE.md for complete guide
   */
  responsive?: ResponsiveConfig;

  /**
   * Additional notes or documentation
   */
  description?: string;
}

/**
 * Lufa-specific token metadata extensions — **processed/output shape**.
 *
 * This interface describes the shape produced by Style Dictionary after
 * build-time inference.  Use it when reading `dist/tokens-metadata.json`
 * or the output of the SD preprocessors/transforms.
 *
 * `level` and `modeAware` are present here because they are *added* by
 * the build pipeline (inferred from path / `modes` presence) and will
 * appear in the final output even though they must not appear in sources.
 */
export interface LufaExtensions extends LufaExtensionsSource {
  /**
   * Token layer in the architecture — inferred from path at build time.
   *
   * **Do NOT set this field in source token files** (RULE 6 — validation error).
   *
   * @see token-consistency.js RULE 6
   */
  level?: TokenLevel;

  /**
   * Whether this token varies by mode — inferred from `modes` presence at build time.
   *
   * **Do NOT set this field in source token files** (RULE 7 — validation error).
   *
   * @see token-consistency.js RULE 7
   */
  modeAware?: boolean;
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
 * All 13 validation rules enforced by token-consistency.js
 *
 * @see token-consistency.js for rule descriptions
 */
export type ValidationRule =
  | 'primitives-no-modes'
  | 'layout-no-modes'
  | 'modes-require-dark'
  | 'modes-no-light'
  | 'no-typo-themable'
  | 'no-explicit-level'
  | 'no-explicit-modeAware'
  | 'fluid-responsive-exclusive'
  | 'primitives-no-themeable'
  | 'no-primitive-self-references'
  | 'hierarchy-chain-validation'
  | 'no-raw-hex-colors-outside-primitives'
  | 'z-index-must-reference-semantic';

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
 * Type guard: Check if token is mode-aware (has mode-specific values).
 *
 * A token is mode-aware when its `modes` object is present — the
 * `modeAware` flag is inferred from this and should not be relied on
 * in source files.
 */
export function isModeAwareToken(token: DesignToken): boolean {
  return token.$extensions?.lufa?.modes !== undefined;
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

/**
 * Type guard: Check if token is fluid (uses CSS clamp)
 *
 * @see ADR-008: Responsive Typography Strategy
 * @see docs/FLUID_VS_RESPONSIVE.md
 */
export function isFluidToken(token: DesignToken): boolean {
  return token.$extensions?.lufa?.fluid === true;
}

/**
 * Type guard: Check if token is responsive (uses media queries)
 *
 * @see ADR-006: Responsive Spacing Architecture
 * @see docs/FLUID_VS_RESPONSIVE.md
 */
export function isResponsiveToken(token: DesignToken): boolean {
  return token.$extensions?.lufa?.responsive !== undefined;
}

/**
 * Validation: Check if token violates fluid-responsive exclusivity
 *
 * Tokens cannot be both fluid AND responsive - they are mutually exclusive.
 *
 * @returns true if token is valid (not both fluid and responsive)
 * @see docs/FLUID_VS_RESPONSIVE.md for explanation
 */
export function validateFluidResponsiveExclusivity(token: DesignToken): boolean {
  const isFluid = isFluidToken(token);
  const isResponsive = isResponsiveToken(token);

  // Valid: token is neither, or only one of them
  // Invalid: token is BOTH fluid and responsive
  return !(isFluid && isResponsive);
}
