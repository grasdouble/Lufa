# CSS Architecture & Preflight Management

**For AI Assistants**: This document explains how CSS resets and Tailwind preflight are managed in the Lufa Design System.

## Overview

The Lufa Design System uses a **component-level reset strategy** instead of global Tailwind preflight to avoid conflicts with host applications (especially Docusaurus and other frameworks that have their own CSS).

## Why No Global Preflight?

Tailwind's preflight is a comprehensive CSS reset that normalizes browser styles. However, when used in a design system library:

1. **It breaks host application styles**: Global resets like `h1 { font-size: 2em; margin: 0; }` override the host app's typography
2. **CSS layers don't provide selector scoping**: Using `@layer` only controls cascade order, not selector specificity
3. **Framework conflicts**: Docusaurus, Next.js, and other frameworks have their own resets that conflict

## Architecture

### 1. Minimal Global Reset

Located in [`src/tailwind.css`](src/tailwind.css):

```css
@layer base {
    * {
        box-sizing: border-box;
        border-width: 0;
        border-style: solid;
        border-color: currentColor;
    }
}
```

This provides only the **essential** reset needed for Tailwind utilities to work correctly:

- `box-sizing: border-box` - Required for width/height utilities
- Border defaults - Required for border utilities

**Do NOT add more global resets here** - it will break host applications.

### 2. Component-Level Reset Utilities

Custom utilities are defined in [`src/css/component-resets.css`](src/css/component-resets.css):

```css
@utility reset-button {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    background-color: transparent;
    background-image: none;
    border: 0;
    cursor: pointer;
}

@utility reset-input {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    background-color: transparent;
    background-image: none;
    border: 0;
}

@utility reset-heading {
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    padding: 0;
}

@utility reset-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

@utility reset-image {
    display: block;
    max-width: 100%;
    height: auto;
}
```

### 3. Applying Resets in Components

Each component applies the appropriate reset utility in its CSS module:

**Example: Button Component** ([`src/components/Button/Button.module.css`](src/components/Button/Button.module.css))

```css
@layer components {
    @reference '../../../tailwind.css';

    .button {
        @apply reset-button;
        @apply inline-flex items-center justify-center;
        @apply rounded-md font-medium transition-colors;
        /* ... rest of styles */
    }
}
```

**Example: Typography Component** ([`src/components/Typography/Typography.module.css`](src/components/Typography/Typography.module.css))

```css
@layer components {
    @reference '../../../tailwind.css';

    .heading {
        @apply reset-heading;
        @apply font-bold text-gray-900 dark:text-gray-100;
        /* ... rest of styles */
    }
}
```

**Example: Input Component** ([`src/components/Input/Input.module.css`](src/components/Input/Input.module.css))

```css
@layer components {
    @reference '../../../tailwind.css';

    .input {
        @apply reset-input;
        @apply w-full rounded-md border px-3 py-2;
        /* ... rest of styles */
    }
}
```

## Guidelines for New Components

When creating a new component:

1. **Identify the base HTML element**: `<button>`, `<input>`, `<h1>`, `<ul>`, `<img>`, etc.

2. **Choose the appropriate reset utility**:
    - Buttons: `@apply reset-button`
    - Inputs/textareas/selects: `@apply reset-input`
    - Headings (h1-h6): `@apply reset-heading`
    - Lists (ul, ol): `@apply reset-list`
    - Images: `@apply reset-image`

3. **Apply it first in the component's CSS module**:

    ```css
    @layer components {
        @reference '../../../tailwind.css';

        .myComponent {
            @apply reset-button; /* or appropriate reset */
            @apply /* your styles */;
        }
    }
    ```

4. **Create a new reset utility if needed**: If you're working with an element type not covered (e.g., tables, forms), add a new `@utility` in `component-resets.css`

## What NOT to Do

❌ **Don't enable Tailwind preflight globally**:

```css
/* DON'T DO THIS */
@import 'tailwindcss/preflight' layer(base);
```

❌ **Don't add element-level resets in tailwind.css**:

```css
/* DON'T DO THIS */
@layer base {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
        font-weight: inherit;
    }
}
```

❌ **Don't rely on cascade without explicit resets**:

```css
/* DON'T DO THIS */
.myButton {
    /* Missing reset - will inherit browser styles */
    @apply bg-blue-500 text-white;
}
```

✅ **Do apply component-level resets**:

```css
/* DO THIS */
.myButton {
    @apply reset-button;
    @apply bg-blue-500 text-white;
}
```

## CSS Layer Structure

The design system uses standard Tailwind layers:

```css
@layer base {
    /* Minimal global reset only */
}

@layer components {
    /* All component styles */
}

@layer utilities {
    /* Tailwind utilities + custom utilities */
}
```

Component CSS modules use `@layer components` and `@reference '../../../tailwind.css'` to ensure proper cascade order.

## Testing Integration

After making CSS changes:

1. **Build the design system**:

    ```bash
    cd packages/design-system/main
    pnpm build
    ```

2. **Clear Docusaurus cache** (important!):

    ```bash
    cd packages/design-system/documentation
    pnpm clear
    ```

3. **Start Docusaurus**:

    ```bash
    pnpm start
    ```

4. **Verify**:
    - Components render correctly
    - No "Module not found" errors
    - Docusaurus typography/styles are not broken
    - Design system components look correct

## Build Output

The final CSS bundle (`dist/style.css`) should be around:

- **~165 kB** uncompressed
- **~22 kB** gzipped

This includes:

- Tailwind base utilities
- Custom reset utilities
- All component styles
- Primitive CSS variables
- Token overrides

## Common Issues

### "Module not found: @grasdouble/lufa_design-system"

**Solution**: Clear Docusaurus cache

```bash
cd packages/design-system/documentation
pnpm clear
pnpm start
```

### Docusaurus styles are broken

**Cause**: Too much global reset in `tailwind.css`

**Solution**: Remove global element resets, use component-level utilities only

### Component doesn't reset properly

**Cause**: Missing reset utility application

**Solution**: Add `@apply reset-{type}` as the first line in the component's base class

## Files Reference

- [`src/tailwind.css`](src/tailwind.css) - Main CSS orchestration, minimal global reset
- [`src/css/component-resets.css`](src/css/component-resets.css) - Custom reset utilities
- [`src/components/*/Component.module.css`](src/components/) - Component styles with resets applied
- [`vite.config.ts`](vite.config.ts) - Build configuration
- [`package.json`](package.json) - Package exports (`main`, `module`, `types`, `exports`)

---

**Last Updated**: December 13, 2025  
**Tailwind CSS Version**: 4.1.17  
**Architecture**: Component-level resets, no global preflight
