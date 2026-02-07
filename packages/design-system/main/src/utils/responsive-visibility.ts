/**
 * Responsive Visibility Utilities
 *
 * Helper functions and types for implementing responsive show/hide behavior
 * across Lufa Design System components.
 *
 * @module utils/responsive-visibility
 */

/**
 * Breakpoint keys from Lufa token system
 * Matches primitives in: tokens/src/primitives/breakpoint/scale.json
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Breakpoint values in pixels (must match token definitions)
 */
export const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Responsive value that can be a boolean or object with breakpoint keys
 *
 * @example
 * ```tsx
 * // Simple boolean
 * show={true}
 *
 * // Responsive object (show on mobile, hide on desktop)
 * show={{ base: true, md: false }}
 * ```
 */
export type ResponsiveValue<T> =
  | T
  | {
      /** Base value (applies to all breakpoints unless overridden) */
      base?: T;
      /** Extra small breakpoint (320px+) */
      xs?: T;
      /** Small breakpoint (640px+) */
      sm?: T;
      /** Medium breakpoint (768px+) */
      md?: T;
      /** Large breakpoint (1024px+) */
      lg?: T;
      /** Extra large breakpoint (1280px+) */
      xl?: T;
      /** 2X extra large breakpoint (1536px+) */
      '2xl'?: T;
    };

/**
 * Props for responsive visibility control
 */
export interface ResponsiveVisibilityProps {
  /**
   * Control element visibility at different breakpoints
   *
   * @example
   * ```tsx
   * // Show only on mobile
   * <Box show={{ base: true, md: false }}>Mobile only</Box>
   *
   * // Show only on desktop
   * <Box show={{ base: false, md: true }}>Desktop only</Box>
   * ```
   */
  show?: ResponsiveValue<boolean>;

  /**
   * Hide element at different breakpoints (opposite of show)
   *
   * @example
   * ```tsx
   * // Hide on mobile
   * <Box hide={{ base: true, md: false }}>Desktop only</Box>
   *
   * // Hide on desktop
   * <Box hide={{ base: false, md: true }}>Mobile only</Box>
   * ```
   */
  hide?: ResponsiveValue<boolean>;

  /**
   * Hide element from this breakpoint and up
   *
   * @example
   * ```tsx
   * // Hidden on md, lg, xl, 2xl
   * <Box hideFrom="md">Mobile/tablet only</Box>
   * ```
   */
  hideFrom?: Breakpoint;

  /**
   * Show element from this breakpoint and up (hidden below)
   *
   * @example
   * ```tsx
   * // Visible on lg, xl, 2xl only
   * <Box showFrom="lg">Desktop only</Box>
   * ```
   */
  showFrom?: Breakpoint;
}

/**
 * Check if a responsive value is a simple value or responsive object
 */
function isResponsiveValue<T>(value: ResponsiveValue<T>): value is Exclude<ResponsiveValue<T>, T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Generate CSS class names for responsive visibility
 *
 * This function handles the logic for combining show/hide props and generating
 * appropriate CSS utility classes.
 *
 * For responsive objects like show={{ base: true, md: false }}, we interpret this as:
 * - "show by default, then hide from md onwards"
 *
 * The key insight: when base is true (or implicitly true), we don't hide the element by default.
 * We only add hide-from classes for breakpoints where the value changes to false.
 *
 * When combining hide and show at different breakpoints (e.g., show={{ base: true, md: false, lg: true }}),
 * we use the -override variant of show-from classes to avoid conflicting base display: none rules.
 *
 * @param props - Responsive visibility props
 * @returns Array of CSS class names to apply
 */
export function getResponsiveVisibilityClasses(props: ResponsiveVisibilityProps): string[] {
  const classes: string[] = [];

  // Handle hideFrom prop
  if (props.hideFrom) {
    classes.push(`lufa-hide-from-${props.hideFrom}`);
    return classes; // Early return - hideFrom is standalone
  }

  // Handle showFrom prop
  if (props.showFrom) {
    classes.push(`lufa-show-from-${props.showFrom}`);
    return classes; // Early return - showFrom is standalone
  }

  // Handle show prop (responsive object or boolean)
  if (props.show !== undefined) {
    if (isResponsiveValue(props.show)) {
      // Responsive object: { base: true, md: false, lg: true }
      // Strategy: Determine visibility at each breakpoint by checking the cascade
      const showValue = props.show;

      // Determine base visibility (default to true if not specified)
      const baseVisible = showValue.base !== false;

      // Track current visibility state as we go through breakpoints
      let currentlyVisible = baseVisible;

      // Track if we've added any hide classes (to know if we need override variant)
      let hasHideClass = false;

      // If base is false, start hidden
      if (!baseVisible) {
        classes.push('lufa-hide');
        hasHideClass = true;
      }

      // Process breakpoints in order
      (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).forEach((bp) => {
        const value = showValue[bp];

        if (value !== undefined) {
          // Visibility changes at this breakpoint
          if (value === true && !currentlyVisible) {
            // Was hidden, now show from this breakpoint
            // Use override variant if we previously added hide classes
            if (hasHideClass) {
              classes.push(`lufa-show-from-${bp}-override`);
            } else {
              classes.push(`lufa-show-from-${bp}`);
            }
            currentlyVisible = true;
          } else if (value === false && currentlyVisible) {
            // Was visible, now hide from this breakpoint
            classes.push(`lufa-hide-from-${bp}`);
            hasHideClass = true;
            currentlyVisible = false;
          }
        }
      });
    } else {
      // Simple boolean: show={false}
      if (props.show === false) {
        classes.push('lufa-hide');
      }
    }
  }

  // Handle hide prop (responsive object or boolean)
  if (props.hide !== undefined) {
    if (isResponsiveValue(props.hide)) {
      // Responsive object: { base: false, md: true }
      const hideValue = props.hide;

      // Determine base visibility (default to true/visible if base not specified)
      const baseVisible = hideValue.base !== true;

      // Track current visibility state
      let currentlyVisible = baseVisible;

      // Track if we've added any hide classes (to know if we need override variant)
      let hasHideClass = false;

      // If base is true (hidden), start hidden
      if (!baseVisible) {
        classes.push('lufa-hide');
        hasHideClass = true;
      }

      // Process breakpoints in order
      (['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).forEach((bp) => {
        const value = hideValue[bp];

        if (value !== undefined) {
          // Visibility changes at this breakpoint
          if (value === true && currentlyVisible) {
            // Was visible, now hide from this breakpoint
            classes.push(`lufa-hide-from-${bp}`);
            hasHideClass = true;
            currentlyVisible = false;
          } else if (value === false && !currentlyVisible) {
            // Was hidden, now show from this breakpoint
            // Use override variant if we previously added hide classes
            if (hasHideClass) {
              classes.push(`lufa-show-from-${bp}-override`);
            } else {
              classes.push(`lufa-show-from-${bp}`);
            }
            currentlyVisible = true;
          }
        }
      });
    } else {
      // Simple boolean: hide={true}
      if (props.hide === true) {
        classes.push('lufa-hide');
      }
    }
  }

  return classes;
}

/**
 * Get aria-hidden attribute value based on visibility props
 *
 * Elements that are visually hidden should be marked as aria-hidden
 * for accessibility.
 *
 * @param props - Responsive visibility props
 * @returns true if element is hidden, undefined otherwise
 */
export function getAriaHiddenAttribute(props: ResponsiveVisibilityProps): true | undefined {
  // If simple boolean hide/show
  if (props.hide === true || props.show === false) {
    return true;
  }

  // For responsive values, we can't determine aria-hidden statically
  // (it depends on viewport), so return undefined and let CSS handle it
  return undefined;
}
