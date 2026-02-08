/**
 * Bleed Component - Utility Classes Configuration
 *
 * This configuration defines all utility classes that will be generated
 * for the Bleed component. The script `generate-utilities.js` reads this
 * file and generates Bleed.module.css automatically.
 *
 * The Bleed component uses negative margins to allow content to break out
 * of container constraints. For "full" width, it uses the 100vw technique.
 *
 * @see packages/design-system/main/scripts/generate-utilities.js
 */

module.exports = {
  component: 'Bleed',
  outputFile: 'Bleed.module.css',

  // Base CSS for the component (non-utility fundamental styles)
  base: {
    display: 'block',
  },

  utilities: {
    // ==========================================
    // INLINE BLEED (Horizontal)
    // ==========================================
    inline: {
      property: 'margin-inline',
      responsive: true,
      values: {
        // Negative margins using spacing scale
        0: '0',
        4: 'calc(var(--lufa-primitive-spacing-4) * -1)',
        8: 'calc(var(--lufa-primitive-spacing-8) * -1)',
        12: 'calc(var(--lufa-primitive-spacing-12) * -1)',
        16: 'calc(var(--lufa-primitive-spacing-16) * -1)',
        24: 'calc(var(--lufa-primitive-spacing-24) * -1)',
        32: 'calc(var(--lufa-primitive-spacing-32) * -1)',
        40: 'calc(var(--lufa-primitive-spacing-40) * -1)',
        48: 'calc(var(--lufa-primitive-spacing-48) * -1)',
        64: 'calc(var(--lufa-primitive-spacing-64) * -1)',
        80: 'calc(var(--lufa-primitive-spacing-80) * -1)',
        96: 'calc(var(--lufa-primitive-spacing-96) * -1)',
      },
    },

    // ==========================================
    // BLOCK BLEED (Vertical)
    // ==========================================
    block: {
      property: 'margin-block',
      responsive: true,
      values: {
        // Negative margins using spacing scale
        0: '0',
        4: 'calc(var(--lufa-primitive-spacing-4) * -1)',
        8: 'calc(var(--lufa-primitive-spacing-8) * -1)',
        12: 'calc(var(--lufa-primitive-spacing-12) * -1)',
        16: 'calc(var(--lufa-primitive-spacing-16) * -1)',
        24: 'calc(var(--lufa-primitive-spacing-24) * -1)',
        32: 'calc(var(--lufa-primitive-spacing-32) * -1)',
        40: 'calc(var(--lufa-primitive-spacing-40) * -1)',
        48: 'calc(var(--lufa-primitive-spacing-48) * -1)',
        64: 'calc(var(--lufa-primitive-spacing-64) * -1)',
        80: 'calc(var(--lufa-primitive-spacing-80) * -1)',
        96: 'calc(var(--lufa-primitive-spacing-96) * -1)',
      },
    },
  },

  // Custom classes for special cases (full-width bleed uses 100vw technique)
  custom: {
    // Full-width inline bleed at base breakpoint
    'inline-full-base': {
      width: '100vw',
      'margin-left': 'calc(50% - 50vw)',
      'margin-right': 'calc(50% - 50vw)',
    },
    // Full-width inline bleed at sm breakpoint
    'inline-full-sm': {
      width: '100vw',
      'margin-left': 'calc(50% - 50vw)',
      'margin-right': 'calc(50% - 50vw)',
    },
    // Full-width inline bleed at md breakpoint
    'inline-full-md': {
      width: '100vw',
      'margin-left': 'calc(50% - 50vw)',
      'margin-right': 'calc(50% - 50vw)',
    },
    // Full-width inline bleed at lg breakpoint
    'inline-full-lg': {
      width: '100vw',
      'margin-left': 'calc(50% - 50vw)',
      'margin-right': 'calc(50% - 50vw)',
    },
    // Full-width inline bleed at xl breakpoint
    'inline-full-xl': {
      width: '100vw',
      'margin-left': 'calc(50% - 50vw)',
      'margin-right': 'calc(50% - 50vw)',
    },
    // Full-width inline bleed at 2xl breakpoint
    'inline-full-2xl': {
      width: '100vw',
      'margin-left': 'calc(50% - 50vw)',
      'margin-right': 'calc(50% - 50vw)',
    },
  },
};
