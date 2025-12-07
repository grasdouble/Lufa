# Design System Scripts

This directory contains utility scripts for generating CSS variables from TypeScript design tokens.

## Overview

The design system uses TypeScript as the source of truth for all design tokens. CSS variables are automatically generated from these tokens to ensure consistency and enable easy theming.

## Available Scripts

### Master Generation Script

Generate all CSS variables at once:

```bash
pnpm run generate:foundation
```

This will run all individual generation scripts in sequence.

### Individual Generation Scripts

Generate CSS variables for specific foundation tokens:

```bash
pnpm run generate:colors      # Generate colors.css from color tokens
pnpm run generate:typography  # Generate typography.css from typography tokens
pnpm run generate:spacing     # Generate spacing.css from spacing tokens
pnpm run generate:radius      # Generate radius.css from border radius tokens
pnpm run generate:shadows     # Generate shadows.css from shadow tokens
pnpm run generate:zindex      # Generate zIndex.css from z-index tokens
pnpm run generate:breakpoints # Generate breakpoints.css from breakpoint tokens
```

## When to Regenerate

Regenerate CSS variables whenever you:

- Modify any TypeScript token files in `src/foundation/`
- Add new token values
- Change existing token values
- Update token naming

**Important:** Always run the appropriate generation script after modifying tokens to keep CSS in sync with TypeScript.

## Token Architecture

Each foundation token type follows this pattern:

1. **TypeScript file** (e.g., `spacing.ts`) - Single source of truth
2. **Generation script** (e.g., `generate-spacing-css.ts`) - Converts TS to CSS
3. **CSS file** (e.g., `spacing.css`) - Auto-generated CSS variables (DO NOT EDIT MANUALLY)

```
src/foundation/
├── spacing.ts          → scripts/generate-spacing-css.ts → spacing.css
├── radius.ts           → scripts/generate-radius-css.ts → radius.css
├── shadows.ts          → scripts/generate-shadows-css.ts → shadows.css
├── zIndex.ts           → scripts/generate-zindex-css.ts → zIndex.css
├── breakpoints.ts      → scripts/generate-breakpoints-css.ts → breakpoints.css
├── typography.ts       → scripts/generate-typography-css.ts → typography.css
└── colors/
    ├── primitives.ts   → scripts/generate-colors-css.ts → colors/colors.css
    └── semantic.ts
```

## Usage in Components

Components use CSS variables instead of hardcoded values:

```css
/* ❌ Don't do this */
.button {
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    font-size: 0.875rem;
    font-weight: 500;
}

/* ✅ Do this */
.button {
    padding: var(--spacing-base);
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
}
```

## Benefits

- **Single Source of Truth**: TypeScript tokens are the only place to update values
- **Automatic Propagation**: Changes to tokens automatically update all CSS
- **Type Safety**: TypeScript provides autocomplete and validation
- **Maintainability**: No manual synchronization between TS and CSS
- **Theming**: CSS variables enable runtime theming
- **Consistency**: Ensures all components use the same design values

## Script Details

### `generate-colors-css.ts`

Generates CSS variables for the color system including primitives, semantic colors, and dark mode overrides.

### `generate-typography-css.ts`

Generates CSS variables for typography including font sizes, line heights, font weights, letter spacing, and preset scale combinations.

### `generate-spacing-css.ts`

Generates CSS variables for spacing based on an 8px grid system.

### `generate-radius-css.ts`

Generates CSS variables for border radius values.

### `generate-shadows-css.ts`

Generates CSS variables for shadow/elevation values following Material Design principles.

### `generate-zindex-css.ts`

Generates CSS variables for z-index stacking layers.

### `generate-breakpoints-css.ts`

Generates CSS variables for responsive breakpoints (note: CSS variables cannot be used in media queries directly, these are for JavaScript integration).

### `generate-foundation-css.ts`

Master script that runs all individual generation scripts in sequence.
