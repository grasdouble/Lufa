/**
 * Button Component - Utility Classes Configuration
 *
 * This configuration defines ALL generated classes for the Button component.
 * The script `generate-utilities.cjs` reads this file and generates Button.module.css.
 *
 * Architecture: Two-dimensional design
 * - TYPE:    Visual style approach (solid, outline, ghost)
 * - VARIANT: Semantic color intention (primary, secondary, success, danger, warning, info, neutral)
 *
 * Sections generated:
 * - base:      Base .button class
 * - utilities: Single-dimension utility classes (type, variant, size, radius, fullWidth, disabled, loading)
 * - compounds: Type × Variant combinations (21 total) with hover/active states
 * - selectors: Standalone selectors (focus, animation target, visually-hidden)
 * - keyframes: @keyframes animations (spin)
 *
 * @see packages/design-system/main/scripts/generate-utilities.cjs
 */

module.exports = {
  component: 'Button',
  outputFile: 'Button.module.css',

  // Base CSS for the component (non-utility fundamental styles)
  base: {
    display: 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    gap: 'var(--lufa-semantic-ui-spacing-compact)', // 8px gap for icons
    cursor: 'pointer',
    'font-family': 'inherit',
    'font-weight': 'var(--lufa-primitive-typography-font-weight-semibold)',
    'text-decoration': 'none',
    'border-radius': 'var(--lufa-component-button-border-radius)', // Default radius (8px)
    transition:
      'all var(--lufa-semantic-ui-transition-duration-fast) var(--lufa-semantic-ui-transition-timing-function-default)',
    'user-select': 'none',
    'white-space': 'nowrap',
  },

  utilities: {
    // ==========================================
    // TYPE - Visual Style Approach (3 values)
    // ==========================================
    type: {
      property: ['border-width', 'border-style'],
      values: {
        solid: ['0', 'none'],
        outline: ['1px', 'solid'],
        ghost: ['0', 'none'],
      },
    },

    // ==========================================
    // VARIANT - Semantic Color Intention (7 values)
    // ==========================================
    // Marker classes — actual colors come from compound selectors below
    variant: {
      property: 'content',
      values: {
        primary: '""',
        secondary: '""',
        success: '""',
        danger: '""',
        warning: '""',
        info: '""',
        neutral: '""',
      },
    },

    // ==========================================
    // SIZES - Dimensions and Padding
    // ==========================================
    size: {
      property: ['height', 'padding-left', 'padding-right', 'font-size'],
      values: {
        sm: [
          'var(--lufa-component-button-height-sm)', // 32px
          'var(--lufa-semantic-ui-spacing-compact)', // 8px
          'var(--lufa-semantic-ui-spacing-compact)',
          'var(--lufa-component-button-font-size-sm)', // 14px
        ],
        md: [
          'var(--lufa-component-button-height-md)', // 40px
          'var(--lufa-semantic-ui-spacing-default)', // 16px
          'var(--lufa-semantic-ui-spacing-default)',
          'var(--lufa-component-button-font-size-md)', // 16px
        ],
        lg: [
          'var(--lufa-component-button-height-lg)', // 48px
          'var(--lufa-semantic-ui-spacing-comfortable)', // 24px
          'var(--lufa-semantic-ui-spacing-comfortable)',
          'var(--lufa-component-button-font-size-lg)', // 18px
        ],
      },
    },

    // ==========================================
    // RADIUS - Border Radius
    // ==========================================
    radius: {
      property: 'border-radius',
      values: {
        none: '0px', // Sharp corners
        sm: 'var(--lufa-semantic-ui-border-radius-small)', // 2px - subtle rounding
        base: 'var(--lufa-semantic-ui-border-radius-default)', // 8px - default (same as base)
        md: 'var(--lufa-semantic-ui-border-radius-medium)', // 12px - emphasized rounding
        full: 'var(--lufa-semantic-ui-border-radius-full)', // 9999px - pill shape
      },
    },

    // ==========================================
    // FULL WIDTH
    // ==========================================
    fullWidth: {
      property: 'width',
      values: {
        true: '100%',
      },
    },

    // ==========================================
    // DISABLED STATE
    // ==========================================
    disabled: {
      property: ['opacity', 'cursor', 'pointer-events'],
      values: {
        true: [
          'var(--lufa-component-button-disabled-opacity)', // 0.5
          'var(--lufa-component-button-disabled-cursor)', // not-allowed
          'none',
        ],
      },
    },

    // ==========================================
    // LOADING STATE
    // ==========================================
    loading: {
      property: ['opacity', 'cursor'],
      values: {
        true: ['0.7', 'wait'],
      },
    },
  },

  // ==========================================
  // COMPOUND SELECTORS — Type × Variant combinations
  // 21 total (3 types × 7 variants), each with hover/active states
  // ==========================================
  compounds: [
    // ------------------------------------------
    // SOLID TYPE (Filled background, no border)
    // ------------------------------------------
    {
      comment: 'Solid + Primary (Blue)',
      selector: '.button.type-solid.variant-primary',
      properties: {
        'background-color': 'var(--lufa-component-button-primary-background-default)',
        color: 'var(--lufa-component-button-primary-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-primary-background-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-primary-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Secondary (Purple)',
      selector: '.button.type-solid.variant-secondary',
      properties: {
        'background-color': 'var(--lufa-component-button-secondary-background-default)',
        color: 'var(--lufa-component-button-secondary-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-secondary-background-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-secondary-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Success (Green)',
      selector: '.button.type-solid.variant-success',
      properties: {
        'background-color': 'var(--lufa-component-button-success-background-default)',
        color: 'var(--lufa-component-button-success-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-success-background-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-success-hover)',
        },
      },
    },
    {
      comment: 'Solid + Danger (Red)',
      selector: '.button.type-solid.variant-danger',
      properties: {
        'background-color': 'var(--lufa-component-button-destructive-background-default)',
        color: 'var(--lufa-component-button-destructive-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-destructive-background-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-error-hover)',
        },
      },
    },
    {
      comment: 'Solid + Warning (Orange/Yellow-600)',
      selector: '.button.type-solid.variant-warning',
      properties: {
        'background-color': 'var(--lufa-semantic-button-warning-background-default)',
        color: 'var(--lufa-semantic-button-warning-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-semantic-button-warning-background-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-warning-hover)',
        },
      },
    },
    {
      comment: 'Solid + Info (Blue-500)',
      selector: '.button.type-solid.variant-info',
      properties: {
        'background-color': 'var(--lufa-semantic-button-info-background-default)',
        color: 'var(--lufa-semantic-button-info-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-info-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-info-hover)',
        },
      },
    },
    {
      comment: 'Solid + Neutral (Gray)',
      selector: '.button.type-solid.variant-neutral',
      properties: {
        'background-color': 'var(--lufa-core-neutral-surface-hover)',
        color: 'var(--lufa-core-neutral-text-primary)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-border-default)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-border-strong)',
        },
      },
    },

    // ------------------------------------------
    // OUTLINE TYPE (Transparent bg + border)
    // ------------------------------------------
    {
      comment: 'Outline + Primary (Blue)',
      selector: '.button.type-outline.variant-primary',
      properties: {
        'background-color': 'var(--lufa-component-button-outline-background-default)',
        color: 'var(--lufa-component-button-outline-text-default)',
        'border-color': 'var(--lufa-component-button-outline-border-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-outline-background-hover)',
          color: 'var(--lufa-component-button-outline-text-hover)',
          'border-color': 'var(--lufa-component-button-outline-border-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-brand-primary-active)',
          'border-color': 'var(--lufa-core-brand-primary-active)',
        },
      },
    },
    {
      comment: 'Outline + Secondary (Purple)',
      selector: '.button.type-outline.variant-secondary',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-brand-secondary-default)',
        'border-color': 'var(--lufa-core-brand-secondary-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-brand-secondary-default)',
          color: 'var(--lufa-semantic-ui-background-on-secondary)',
          'border-color': 'var(--lufa-core-brand-secondary-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-brand-secondary-active)',
          'border-color': 'var(--lufa-core-brand-secondary-active)',
        },
      },
    },
    {
      comment: 'Outline + Success (Green)',
      selector: '.button.type-outline.variant-success',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-success-default)',
        'border-color': 'var(--lufa-core-semantic-success-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-success-default)',
          color: 'var(--lufa-semantic-button-success-text)',
          'border-color': 'var(--lufa-core-semantic-success-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-success-hover)',
          'border-color': 'var(--lufa-core-semantic-success-hover)',
        },
      },
    },
    {
      comment: 'Outline + Danger (Red)',
      selector: '.button.type-outline.variant-danger',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-error-default)',
        'border-color': 'var(--lufa-core-semantic-error-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-error-default)',
          color: 'var(--lufa-semantic-button-destructive-text)',
          'border-color': 'var(--lufa-core-semantic-error-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-error-hover)',
          'border-color': 'var(--lufa-core-semantic-error-hover)',
        },
      },
    },
    {
      comment: 'Outline + Warning (Orange/Yellow-600)',
      selector: '.button.type-outline.variant-warning',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-warning-hover)',
        'border-color': 'var(--lufa-core-semantic-warning-hover)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-warning-hover)',
          color: 'var(--lufa-semantic-button-warning-text)',
          'border-color': 'var(--lufa-core-semantic-warning-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-warning-hover)',
          'border-color': 'var(--lufa-core-semantic-warning-hover)',
        },
      },
    },
    {
      comment: 'Outline + Info (Blue-500)',
      selector: '.button.type-outline.variant-info',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-info-default)',
        'border-color': 'var(--lufa-core-semantic-info-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-info-default)',
          color: 'var(--lufa-semantic-button-info-text)',
          'border-color': 'var(--lufa-core-semantic-info-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-semantic-info-hover)',
          'border-color': 'var(--lufa-core-semantic-info-hover)',
        },
      },
    },
    {
      comment: 'Outline + Neutral (Gray)',
      selector: '.button.type-outline.variant-neutral',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-neutral-text-secondary)',
        'border-color': 'var(--lufa-core-neutral-border-strong)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          'border-color': 'var(--lufa-core-neutral-text-secondary)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-border-default)',
          'border-color': 'var(--lufa-core-neutral-text-secondary)',
        },
      },
    },

    // ------------------------------------------
    // GHOST TYPE (Transparent bg, no border)
    // ------------------------------------------
    {
      comment: 'Ghost + Primary (Blue)',
      selector: '.button.type-ghost.variant-primary',
      properties: {
        'background-color': 'var(--lufa-component-button-ghost-background-default)',
        color: 'var(--lufa-component-button-ghost-text-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-component-button-ghost-background-hover)',
          color: 'var(--lufa-component-button-ghost-text-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          color: 'var(--lufa-core-brand-primary-active)',
        },
      },
    },
    {
      comment: 'Ghost + Secondary (Purple)',
      selector: '.button.type-ghost.variant-secondary',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-brand-secondary-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-semantic-button-ghost-background-hover)',
          color: 'var(--lufa-core-brand-secondary-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          color: 'var(--lufa-core-brand-secondary-active)',
        },
      },
    },
    {
      comment: 'Ghost + Success (Green)',
      selector: '.button.type-ghost.variant-success',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-success-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-semantic-button-ghost-background-hover)',
          color: 'var(--lufa-core-semantic-success-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          color: 'var(--lufa-core-semantic-success-hover)',
        },
      },
    },
    {
      comment: 'Ghost + Danger (Red)',
      selector: '.button.type-ghost.variant-danger',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-error-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-semantic-button-ghost-background-hover)',
          color: 'var(--lufa-core-semantic-error-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          color: 'var(--lufa-core-semantic-error-hover)',
        },
      },
    },
    {
      comment: 'Ghost + Warning (Orange/Yellow-600)',
      selector: '.button.type-ghost.variant-warning',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-warning-hover)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-semantic-button-ghost-background-hover)',
          color: 'var(--lufa-core-semantic-warning-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          color: 'var(--lufa-core-semantic-warning-hover)',
        },
      },
    },
    {
      comment: 'Ghost + Info (Blue-500)',
      selector: '.button.type-ghost.variant-info',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-semantic-info-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-semantic-button-ghost-background-hover)',
          color: 'var(--lufa-core-semantic-info-hover)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          color: 'var(--lufa-core-semantic-info-hover)',
        },
      },
    },
    {
      comment: 'Ghost + Neutral (Gray)',
      selector: '.button.type-ghost.variant-neutral',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-core-neutral-text-secondary)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-semantic-button-ghost-background-hover)',
          color: 'var(--lufa-core-neutral-text-primary)',
        },
        ':active:not(:disabled):not(.disabled-true)': {
          'background-color': 'var(--lufa-core-neutral-surface-hover)',
          color: 'var(--lufa-core-neutral-text-primary)',
        },
      },
    },
  ],

  // ==========================================
  // STANDALONE SELECTORS — Focus, animation, accessibility
  // ==========================================
  selectors: [
    {
      comment: 'Focus ring (keyboard navigation)',
      selector: '.button:focus-visible',
      properties: {
        outline:
          'var(--lufa-component-shared-focus-outline-width) solid var(--lufa-component-shared-focus-outline-color)',
        'outline-offset': 'var(--lufa-component-shared-focus-outline-offset)',
      },
    },
    {
      comment: 'Loading spinner — animates first child icon',
      selector: '.button.loading-true > :first-child svg',
      properties: {
        animation: 'spin 1s linear infinite',
      },
    },
    {
      comment: 'Visually hidden — for screen readers (e.g. icon-only loading label)',
      selector: '.visually-hidden',
      properties: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        'white-space': 'nowrap',
        'border-width': '0',
      },
    },
  ],

  // ==========================================
  // KEYFRAMES — CSS animations
  // ==========================================
  keyframes: [
    {
      name: 'spin',
      steps: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
  ],
};
