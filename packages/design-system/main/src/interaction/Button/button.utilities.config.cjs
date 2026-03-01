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
    cursor: 'var(--lufa-component-button-state-default-cursor)',
    'font-family': 'inherit',
    'font-weight': 'var(--lufa-primitive-typography-font-weight-semibold)',
    'text-decoration': 'none',
    'border-radius': 'var(--lufa-semantic-ui-border-radius-default)', // Default radius (8px)
    transition:
      'all var(--lufa-semantic-ui-transition-duration-fast) var(--lufa-semantic-ui-transition-timing-function-default)',
    'user-select': 'none',
    'white-space': 'nowrap',
    'box-shadow': 'var(--lufa-component-button-effect-glow-default)', // Themeable glow effect (default: none)
    'text-shadow': 'var(--lufa-component-button-effect-text-glow-default)', // Themeable text glow (default: none)
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
          'var(--lufa-semantic-ui-height-sm)', // 32px
          'var(--lufa-semantic-ui-spacing-compact)', // 8px
          'var(--lufa-semantic-ui-spacing-compact)',
          'var(--lufa-semantic-typography-body-small)', // 14px
        ],
        md: [
          'var(--lufa-semantic-ui-height-md)', // 40px
          'var(--lufa-semantic-ui-spacing-default)', // 16px
          'var(--lufa-semantic-ui-spacing-default)',
          'var(--lufa-semantic-typography-button)', // 16px
        ],
        lg: [
          'var(--lufa-semantic-ui-height-lg)', // 48px
          'var(--lufa-semantic-ui-spacing-comfortable)', // 24px
          'var(--lufa-semantic-ui-spacing-comfortable)',
          'var(--lufa-semantic-typography-body-large)', // 18px
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
          'var(--lufa-component-button-state-disabled-opacity)', // 0.5
          'var(--lufa-component-button-state-disabled-cursor)', // not-allowed
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
        true: ['var(--lufa-semantic-interactive-opacity-loading)', 'var(--lufa-component-button-state-loading-cursor)'],
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
        'background-color': 'var(--lufa-component-button-type-solid-variant-primary-background-default)',
        color: 'var(--lufa-component-button-type-solid-variant-primary-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-secondary-background-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-secondary-background-active)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-primary-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Secondary (Purple)',
      selector: '.button.type-solid.variant-secondary',
      properties: {
        'background-color': 'var(--lufa-component-button-type-solid-variant-secondary-background-default)',
        color: 'var(--lufa-component-button-type-solid-variant-secondary-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-secondary-background-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-secondary-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Success (Green)',
      selector: '.button.type-solid.variant-success',
      properties: {
        'background-color': 'var(--lufa-component-button-type-solid-variant-success-background-default)',
        color: 'var(--lufa-component-button-type-solid-variant-success-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-success-background-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-success-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Danger (Red)',
      selector: '.button.type-solid.variant-danger',
      properties: {
        'background-color': 'var(--lufa-component-button-type-solid-variant-destructive-background-default)',
        color: 'var(--lufa-component-button-type-solid-variant-destructive-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-destructive-background-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-destructive-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Warning (Orange/Yellow-600)',
      selector: '.button.type-solid.variant-warning',
      properties: {
        'background-color': 'var(--lufa-component-button-type-solid-variant-warning-background-default)',
        color: 'var(--lufa-component-button-type-solid-variant-warning-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-warning-background-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-warning-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Info (Blue-500)',
      selector: '.button.type-solid.variant-info',
      properties: {
        'background-color': 'var(--lufa-component-button-type-solid-variant-info-background-default)',
        color: 'var(--lufa-component-button-type-solid-variant-info-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-info-background-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-info-background-active)',
        },
      },
    },
    {
      comment: 'Solid + Neutral (Gray)',
      selector: '.button.type-solid.variant-neutral',
      properties: {
        'background-color': 'var(--lufa-component-button-type-solid-variant-neutral-background-default)',
        color: 'var(--lufa-component-button-type-solid-variant-neutral-text)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-neutral-background-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-solid-variant-neutral-background-active)',
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
        'background-color': 'var(--lufa-component-button-type-outline-background-default)',
        color: 'var(--lufa-component-button-type-outline-text-default)',
        'border-color': 'var(--lufa-component-button-type-outline-border-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-background-hover)',
          color: 'var(--lufa-component-button-type-outline-text-hover)',
          'border-color': 'var(--lufa-component-button-type-outline-border-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-variant-primary-background-active)',
          'border-color': 'var(--lufa-component-button-type-outline-variant-primary-border-active)',
        },
      },
    },
    {
      comment: 'Outline + Secondary (Purple)',
      selector: '.button.type-outline.variant-secondary',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-secondary-default)',
        'border-color': 'var(--lufa-semantic-interactive-action-secondary-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-semantic-interactive-action-secondary-default)',
          color: 'var(--lufa-semantic-ui-background-on-secondary)',
          'border-color': 'var(--lufa-semantic-interactive-action-secondary-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-variant-secondary-background-active)',
          'border-color': 'var(--lufa-component-button-type-outline-variant-secondary-border-active)',
        },
      },
    },
    {
      comment: 'Outline + Success (Green)',
      selector: '.button.type-outline.variant-success',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-success-default)',
        'border-color': 'var(--lufa-semantic-interactive-action-success-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-semantic-interactive-action-success-default)',
          color: 'var(--lufa-component-button-type-outline-text-hover)',
          'border-color': 'var(--lufa-semantic-interactive-action-success-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-variant-success-background-active)',
          'border-color': 'var(--lufa-component-button-type-outline-variant-success-border-active)',
        },
      },
    },
    {
      comment: 'Outline + Danger (Red)',
      selector: '.button.type-outline.variant-danger',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-destructive-default)',
        'border-color': 'var(--lufa-semantic-interactive-action-destructive-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-semantic-interactive-action-destructive-default)',
          color: 'var(--lufa-component-button-type-outline-text-hover)',
          'border-color': 'var(--lufa-semantic-interactive-action-destructive-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-variant-destructive-background-active)',
          'border-color': 'var(--lufa-component-button-type-outline-variant-destructive-border-active)',
        },
      },
    },
    {
      comment: 'Outline + Warning (Orange/Yellow-600)',
      selector: '.button.type-outline.variant-warning',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-warning-default)', // default = resting state (not hover)
        'border-color': 'var(--lufa-semantic-interactive-action-warning-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-semantic-interactive-action-warning-default)', // fills with default color on hover
          color: 'var(--lufa-component-button-type-outline-text-hover)',
          'border-color': 'var(--lufa-semantic-interactive-action-warning-hover)', // border gets darker on hover
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-variant-warning-background-active)',
          'border-color': 'var(--lufa-component-button-type-outline-variant-warning-border-active)',
        },
      },
    },
    {
      comment: 'Outline + Info (Blue-500)',
      selector: '.button.type-outline.variant-info',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-info-default)',
        'border-color': 'var(--lufa-semantic-interactive-action-info-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-semantic-interactive-action-info-default)',
          color: 'var(--lufa-component-button-type-outline-text-hover)',
          'border-color': 'var(--lufa-semantic-interactive-action-info-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-variant-info-background-active)',
          'border-color': 'var(--lufa-component-button-type-outline-variant-info-border-active)',
        },
      },
    },
    {
      comment: 'Outline + Neutral (Gray)',
      selector: '.button.type-outline.variant-neutral',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-ui-text-secondary)',
        'border-color': 'var(--lufa-semantic-interactive-border-hover)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-semantic-interactive-background-hover)',
          'border-color': 'var(--lufa-semantic-interactive-border-hover)', // stays border-strong on hover
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-outline-variant-neutral-background-active)',
          'border-color': 'var(--lufa-semantic-interactive-border-hover)', // stays border-strong on active
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
        'background-color': 'var(--lufa-component-button-type-ghost-background-default)',
        color: 'var(--lufa-component-button-type-ghost-text-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-hover)',
          color: 'var(--lufa-component-button-type-ghost-text-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-active)',
          color: 'var(--lufa-component-button-type-ghost-variant-primary-text-active)',
        },
      },
    },
    {
      comment: 'Ghost + Secondary (Purple)',
      selector: '.button.type-ghost.variant-secondary',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-secondary-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-hover)',
          color: 'var(--lufa-semantic-interactive-action-secondary-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-active)',
          color: 'var(--lufa-component-button-type-ghost-variant-secondary-text-active)',
        },
      },
    },
    {
      comment: 'Ghost + Success (Green)',
      selector: '.button.type-ghost.variant-success',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-success-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-hover)',
          color: 'var(--lufa-semantic-interactive-action-success-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-active)',
          color: 'var(--lufa-component-button-type-ghost-variant-success-text-active)',
        },
      },
    },
    {
      comment: 'Ghost + Danger (Red)',
      selector: '.button.type-ghost.variant-danger',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-destructive-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-hover)',
          color: 'var(--lufa-semantic-interactive-action-destructive-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-active)',
          color: 'var(--lufa-component-button-type-ghost-variant-destructive-text-active)',
        },
      },
    },
    {
      comment: 'Ghost + Warning (Orange/Yellow-600)',
      selector: '.button.type-ghost.variant-warning',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-warning-default)', // default = resting (not hover)
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-hover)',
          color: 'var(--lufa-semantic-interactive-action-warning-hover)', // hover = darker
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-active)',
          color: 'var(--lufa-component-button-type-ghost-variant-warning-text-active)',
        },
      },
    },
    {
      comment: 'Ghost + Info (Blue-500)',
      selector: '.button.type-ghost.variant-info',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-interactive-action-info-default)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-hover)',
          color: 'var(--lufa-semantic-interactive-action-info-hover)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-active)',
          color: 'var(--lufa-component-button-type-ghost-variant-info-text-active)',
        },
      },
    },
    {
      comment: 'Ghost + Neutral (Gray)',
      selector: '.button.type-ghost.variant-neutral',
      properties: {
        'background-color': 'transparent',
        color: 'var(--lufa-semantic-ui-text-secondary)',
      },
      states: {
        ':hover:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-hover)',
          color: 'var(--lufa-semantic-ui-text-primary)',
        },
        ':active:not(:disabled):not(.disabled)': {
          'background-color': 'var(--lufa-component-button-type-ghost-background-active)',
          color: 'var(--lufa-component-button-type-ghost-variant-neutral-text-active)',
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
      comment: 'Glow hover state — enhanced box-shadow and text-shadow on hover (themeable)',
      selector: '.button:hover:not(:disabled):not(.disabled)',
      properties: {
        'box-shadow': 'var(--lufa-component-button-effect-glow-hover)',
        'text-shadow': 'var(--lufa-component-button-effect-text-glow-hover)',
      },
    },
    {
      comment: 'Loading spinner — animates first child icon',
      selector: '.button.loading > :first-child svg',
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
