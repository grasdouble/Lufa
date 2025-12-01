# Design System Scripts

This directory contains utility scripts for maintaining the design system.

## Available Scripts

### `generate-colors-css.ts`

Generates the `src/colors/colors.css` file from TypeScript color tokens.

**Usage:**

```bash
pnpm run generate:colors
```

**When to run:**

- After modifying color values in `src/colors/primitives.ts` or `src/colors/semantic.ts`
- After changing the structure of the color system
- To ensure CSS custom properties stay in sync with TypeScript tokens

**What it does:**

- Reads color tokens from TypeScript files
- Generates CSS custom properties (CSS variables) for all colors
- Creates light mode variables in `:root`
- Creates dark mode overrides in `[data-theme="dark"], .dark`
- Adds timestamp and warning header to the generated file

**Note:** The generated `colors.css` file should not be edited manually. Any changes will be overwritten the next time the script runs.
