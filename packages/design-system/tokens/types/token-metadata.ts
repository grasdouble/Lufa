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
   * Does this token use CSS clamp() for continuous viewport scaling?
   *
   * **Fluid tokens scale continuously across ALL viewport sizes using CSS clamp().**
   *
   * - `true`: Token uses CSS clamp() (e.g., `clamp(2rem, 1.5rem + 2vw, 3rem)`)
   * - `false` or undefined: Token uses fixed values
   *
   * **When to use:**
   * - ✅ Typography tokens (headings 2xl and above)
   * - ✅ Large-scale spacing that should scale smoothly
   * - ❌ Layout spacing (use `responsive` instead)
   * - ❌ Body text (use fixed values)
   *
   * **Mutually exclusive with `responsive`** - A token cannot be both fluid and responsive.
   *
   * **Examples:**
   * - Fluid H1: `clamp(2rem, 1.5rem + 2vw, 3rem)` → 32px to 48px smoothly
   * - Fixed body: `16px` → Same at all viewport sizes
   *
   * **Performance:**
   * - File size impact: ~80 bytes per token (minimal)
   * - Runtime: Single CSS calculation, no media queries
   * - Browser support: 96.1% (Chrome 79+, Firefox 75+, Safari 13.1+)
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
   * Documents the min/max values and viewport range for CSS clamp() tokens.
   *
   * **Example:**
   * ```json
   * {
   *   "fluid": true,
   *   "fluidRange": {
   *     "min": "32px",
   *     "max": "48px",
   *     "viewport": { "min": "320px", "max": "1280px" }
   *   }
   * }
   * ```
   *
   * **Generates CSS:**
   * ```css
   * clamp(2rem, 1.5rem + 2vw, 3rem)
   * ```
   *
   * @see fluid
   * @see docs/FLUID_VS_RESPONSIVE.md
   */
  fluidRange?: FluidRange;

  /**
   * Does this token change at specific breakpoints using media queries?
   *
   * **Responsive tokens have discrete values at specific viewport breakpoints.**
   *
   * - Defined: Token has variants for different breakpoints (e.g., base, md, lg)
   * - Undefined: Token uses the same value at all viewport sizes
   *
   * **When to use:**
   * - ✅ Layout spacing (page-padding, section-gap, container-gutter)
   * - ✅ Structural tokens that define page layout
   * - ✅ Tokens needing precise control at specific breakpoints
   * - ❌ Typography (use `fluid` instead for better performance)
   * - ❌ Component spacing (typically fixed)
   *
   * **Mutually exclusive with `fluid`** - A token cannot be both fluid and responsive.
   *
   * **Examples:**
   * - Responsive page-padding:
   *   - `base`: 16px (mobile, all viewports)
   *   - `md`: 24px (tablet, 768px+)
   *   - `lg`: 32px (desktop, 1024px+)
   * - Fixed button padding: 12px 16px (same at all sizes)
   *
   * **Implementation:**
   * Responsive tokens are implemented as separate token variants with suffixes:
   * - `page-padding.base` → 16px
   * - `page-padding.md` → 24px (applies at 768px+)
   * - `page-padding.lg` → 32px (applies at 1024px+)
   *
   * **CSS Output:**
   * ```css
   * --token-base: 16px;
   *
   * @media (min-width: 768px) {
   *   --token-md: 24px;
   * }
   *
   * @media (min-width: 1024px) {
   *   --token-lg: 32px;
   * }
   * ```
   *
   * **Performance:**
   * - File size impact: ~150 bytes per token set (3 variants)
   * - Runtime: Native media query handling (highly optimized)
   * - Browser support: 99.9% (universal)
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
  | 'no-typo-themable'
  | 'fluid-responsive-exclusive';

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
