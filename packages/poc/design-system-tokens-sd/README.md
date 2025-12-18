# @grasdouble/lufa_design-system-tokens-sd

Design tokens for Lufa Design System using [Style Dictionary v5](https://amzn.github.io/style-dictionary).

## Overview

This package is a **proof-of-concept** to test Style Dictionary v5.1.1 (latest) as an alternative approach to managing design tokens. It runs in parallel with the existing TypeScript-based tokens package.

## Comparison: Style Dictionary vs TypeScript

### Style Dictionary Approach (this package)

**Pros:**

- Industry-standard tool (Amazon, Salesforce, etc.)
- JSON-first, platform-agnostic token definition
- Built-in transforms for multiple platforms (CSS, JS, iOS, Android, etc.)
- Token aliasing/references with `{token.path}` syntax
- Extensible with custom transforms and formats
- Can generate multiple output formats from single source

**Cons:**

- Additional build dependency
- JSON can be less type-safe than TypeScript
- Learning curve for configuration
- Less flexible for complex logic

### TypeScript Approach (current package)

**Pros:**

- Full TypeScript type safety
- Easier to understand for JS/TS developers
- More flexible for custom logic
- Direct IDE autocomplete
- Simpler build process (just Node scripts)

**Cons:**

- Custom scripts need maintenance
- Limited to JS/TS ecosystem
- Manual implementation of transforms

## Usage

### Install

```bash
pnpm add @grasdouble/lufa_design-system-tokens-sd
```

### Import CSS Variables

```css
@import '@grasdouble/lufa_design-system-tokens-sd/tokens.css';
```

### Import JavaScript/TypeScript

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens-sd/tokens.json';

// Use tokens
console.log(tokens['color-semantic-interactive-default']); // #3b82f6
```

## Token Structure

Tokens are organized in JSON files:

- `tokens/colors.json` - Primitive and semantic colors
- `tokens/spacing.json` - Spacing scale
- `tokens/typography.json` - Font families, sizes, weights, line heights
- `tokens/radius.json` - Border radius values
- `tokens/shadows.json` - Box shadow definitions

### Token References

Style Dictionary supports token aliasing using `{token.path}` syntax:

```json
{
  "color": {
    "primitive": {
      "blue": {
        "500": { "value": "#3b82f6" }
      }
    },
    "semantic": {
      "interactive": {
        "default": { "value": "{color.primitive.blue.500}" }
      }
    }
  }
}
```

## Build

```bash
pnpm build
```

This generates:

- `dist/tokens.css` - CSS custom properties
- `dist/tokens.json` - Flat JSON format
- `dist/tokens.js` - ES6 module

## Configuration

Token transformation is configured in `style-dictionary.config.js`. You can:

- Add custom transforms
- Define new output formats
- Generate platform-specific tokens (iOS, Android, etc.)
- Customize naming conventions

## Recommendation

After testing this approach, compare:

1. Developer experience
2. Build complexity
3. Output quality
4. Maintainability
5. Team familiarity

Choose the approach that best fits your team's workflow.
