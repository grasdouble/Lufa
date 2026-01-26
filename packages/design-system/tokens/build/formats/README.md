# Custom Style Dictionary Format: CSS with Media Queries

A custom Style Dictionary format that generates responsive, mobile-first CSS with automatic media query generation and theme mode support.

**Created:** Phase 2C (Spacing & Layout)  
**Output:** `dist/tokens.css` (~67 KB)  
**File:** `css-with-media-queries.js`

---

## Table of Contents

- [Purpose](#purpose)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [CSS Output Structure](#css-output-structure)
- [Usage](#usage)
- [Helper Functions](#helper-functions)
- [Testing](#testing)
- [Related Files](#related-files)

---

## Purpose

This custom format solves a critical problem in design systems: **generating responsive CSS variables that adapt across breakpoints while maintaining a clean, maintainable output.**

Traditional Style Dictionary formats output one CSS variable per token, resulting in verbose code like:

```css
:root {
  --lufa-core-layout-page-padding-base: 16px;
  --lufa-core-layout-page-padding-md: 24px;
  --lufa-core-layout-page-padding-lg: 32px;
}
```

This format instead generates **mobile-first CSS with automatic media queries:**

```css
:root {
  --lufa-core-layout-page-padding: 16px; /* Base value */
}

@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: 24px; /* md override */
  }
}

@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: 32px; /* lg override */
  }
}
```

### Why This Matters

1. **Cleaner API:** Components use `var(--lufa-core-layout-page-padding)` instead of manually choosing breakpoint variants
2. **Mobile-First:** Progressive enhancement from smallest to largest screens
3. **Theme Support:** Automatic `[data-mode]` selectors for light/dark/high-contrast modes
4. **DRY Principle:** One variable name across all breakpoints
5. **Token References:** Preserves cascading relationships (`outputReferences: true`)

---

## Key Features

### 1. **Mobile-First Approach**

Base values are set in `:root` without media queries. Larger breakpoints progressively override using `min-width` media queries.

### 2. **Automatic Media Query Generation**

The format automatically detects responsive tokens (via `$extensions.lufa.responsive` metadata) and generates appropriate `@media` blocks.

### 3. **Variable Name Normalization**

Removes breakpoint suffixes (`.base`, `.md`, `.lg`) from CSS variable names:

- Token: `core.layout.page-padding.base`
- Output: `--lufa-core-layout-page-padding` (not `--lufa-core-layout-page-padding-base`)

### 4. **Token Reference Resolution**

When `outputReferences: true` is enabled, tokens that reference other tokens are output as `var()` references:

```css
/* Token: { "$value": "{primitive.spacing.16}" } */
--lufa-core-layout-page-padding: var(--lufa-primitive-spacing-16);
```

### 5. **Multi-Mode Theme Support**

Generates `[data-mode]` attribute selectors for theme modes:

- `:root` and `[data-mode='light']` - Default/light theme
- `[data-mode='dark']` - Dark theme
- `[data-mode='high-contrast']` - High contrast theme

---

## How It Works

The format processes tokens in **4 distinct phases:**

### **Phase 1: Categorize Tokens**

Tokens are sorted into three categories:

```javascript
const staticTokens = [];           // No responsive variants, no modes
const responsiveTokensByBreakpoint = {
  base: [],
  sm: [],
  md: [],
  lg: [],
  xl: [],
  '2xl': [],
};
const tokensWithModes = [];        // Tokens with light/dark/HC modes
```

**Classification Logic:**

1. **Tokens with Modes:** Has `$extensions.lufa.modes` metadata → `tokensWithModes[]`
2. **Responsive Tokens:** Has `$extensions.lufa.responsive` metadata → `responsiveTokensByBreakpoint[breakpoint]`
3. **Static Tokens:** Everything else → `staticTokens[]`

### **Phase 2: Generate `:root` with Base Values**

Outputs the `:root` selector with all base values:

```css
:root,
[data-mode='light'] {
  /* Static tokens (no responsive variants) */
  --lufa-primitive-spacing-16: 16px;
  --lufa-primitive-color-blue-500: #3b82f6;

  /* Responsive base values (mobile-first) */
  --lufa-core-layout-page-padding: var(--lufa-primitive-spacing-16);
  --lufa-core-layout-section-gap: var(--lufa-primitive-spacing-24);

  /* Tokens with modes (light mode values) */
  --lufa-core-neutral-background: #ffffff;
  --lufa-core-neutral-text-primary: #111827;
}
```

**Key Operations:**

- Static tokens use full path: `--lufa-primitive-spacing-16`
- Responsive tokens have breakpoint suffix removed: `page-padding.base` → `page-padding`
- Mode tokens output their base value (light mode)

### **Phase 3: Generate `@media` Queries for Responsive Overrides**

For each breakpoint with responsive tokens, generate a media query:

```css
@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-primitive-spacing-24);
    --lufa-core-layout-section-gap: var(--lufa-primitive-spacing-32);
  }
}

@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-primitive-spacing-32);
    --lufa-core-layout-section-gap: var(--lufa-primitive-spacing-40);
  }
}
```

**Breakpoint Mappings:**

| Breakpoint | Media Query             | Use Case                    |
|------------|-------------------------|-----------------------------|
| `base`     | *(none)*                | Mobile portrait (default)   |
| `sm`       | `(min-width: 640px)`    | Mobile landscape            |
| `md`       | `(min-width: 768px)`    | Tablets portrait            |
| `lg`       | `(min-width: 1024px)`   | Tablets landscape, desktop  |
| `xl`       | `(min-width: 1280px)`   | Large desktop               |
| `2xl`      | `(min-width: 1536px)`   | Ultra-wide displays         |

### **Phase 4: Generate `[data-mode]` Selectors for Theme Modes**

For tokens with mode variants, generate theme selectors:

```css
[data-mode='dark'] {
  --lufa-core-neutral-background: #111827;
  --lufa-core-neutral-text-primary: #f9fafb;
  --lufa-core-brand-primary: #3b82f6;
  --lufa-core-semantic-success: #4ade80;
}

[data-mode='high-contrast'] {
  --lufa-core-neutral-background: var(--lufa-primitive-color-hc-black);
  --lufa-core-neutral-text-primary: var(--lufa-primitive-color-hc-white);
  --lufa-core-brand-primary: var(--lufa-primitive-color-hc-blue);
  --lufa-core-semantic-success: var(--lufa-primitive-color-hc-green);
}
```

---

## CSS Output Structure

### Complete Example

```css
/**
 * Do not edit directly, this file was auto-generated.
 */

/* ========================================
   Phase 2: Base Styles (:root)
   ======================================== */
:root,
[data-mode='light'] {
  /* Static tokens (no breakpoints, no modes) */
  --lufa-primitive-spacing-16: 16px;
  --lufa-primitive-spacing-24: 24px;
  --lufa-primitive-spacing-32: 32px;
  --lufa-primitive-color-blue-500: #3b82f6;

  /* Responsive tokens (base/mobile values) */
  --lufa-core-layout-page-padding: var(--lufa-primitive-spacing-16); /** Mobile padding */
  --lufa-core-layout-section-gap: var(--lufa-primitive-spacing-24); /** Mobile section spacing */
  --lufa-core-typography-heading-size: clamp(1.5rem, 2vw, 2rem); /** Fluid heading size */

  /* Tokens with modes (light mode values) */
  --lufa-core-neutral-background: #ffffff; /** Light mode background */
  --lufa-core-neutral-text-primary: #111827; /** Light mode text */
  --lufa-core-brand-primary: #3b82f6; /** Light mode brand color */
}

/* ========================================
   Phase 3: Responsive Overrides
   ======================================== */
@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-primitive-spacing-24); /** Tablet padding */
    --lufa-core-layout-section-gap: var(--lufa-primitive-spacing-32); /** Tablet section spacing */
  }
}

@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-primitive-spacing-32); /** Desktop padding */
    --lufa-core-layout-section-gap: var(--lufa-primitive-spacing-40); /** Desktop section spacing */
  }
}

/* ========================================
   Phase 4: Theme Modes
   ======================================== */
[data-mode='dark'] {
  --lufa-core-neutral-background: #111827; /** Dark mode background */
  --lufa-core-neutral-text-primary: #f9fafb; /** Dark mode text */
  --lufa-core-brand-primary: #3b82f6; /** Dark mode brand color */
}

[data-mode='high-contrast'] {
  --lufa-core-neutral-background: var(--lufa-primitive-color-hc-black); /** HC black background */
  --lufa-core-neutral-text-primary: var(--lufa-primitive-color-hc-white); /** HC white text */
  --lufa-core-brand-primary: var(--lufa-primitive-color-hc-blue); /** HC pure blue */
}
```

### Output Characteristics

- **File size:** ~67 KB (uncompressed)
- **Total tokens:** ~400+ variables
- **Media queries:** 2-5 breakpoints (sm, md, lg, xl, 2xl)
- **Theme modes:** 3 modes (light, dark, high-contrast)
- **Comments:** Preserved from `$description` metadata

---

## Usage

### 1. Register the Format

In `style-dictionary.config.js`:

```javascript
import { cssWithMediaQueries } from './build/formats/css-with-media-queries.js';
import { responsiveTransform } from './build/transforms/responsive.js';

// Register responsive transform (provides metadata)
StyleDictionary.registerTransform(responsiveTransform);

// Register custom format
StyleDictionary.registerFormat(cssWithMediaQueries);
```

### 2. Configure the Platform

```javascript
export default {
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'lufa',
      buildPath: 'dist/',
      transforms: [
        'attribute/cti',
        'name/kebab',
        'size/rem',
        'color/css',
        // ... other transforms
        'attribute/responsive', // ✅ Required for responsive tokens
      ],
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables-with-media-queries', // ✅ Use custom format
          options: {
            outputReferences: true, // ✅ Preserve token references
            prefix: 'lufa',
          },
        },
      ],
    },
  },
};
```

### 3. Build Tokens

```bash
npm run build:tokens
# or
npx style-dictionary build --config style-dictionary.config.js
```

---

## Helper Functions

The format uses three internal helper functions:

### `formatValue(token, dictionary)`

Resolves token values, converting references to CSS `var()` syntax.

**Signature:**
```javascript
const formatValue = (token, dictionary) => { /* ... */ }
```

**Purpose:**
- Detects if token value is a reference (starts with `{`)
- Converts `{primitive.spacing.16}` → `var(--lufa-primitive-spacing-16)`
- Returns raw value if not a reference

**Examples:**

| Input Token Value            | Output CSS Value                         |
|------------------------------|------------------------------------------|
| `"16px"`                     | `16px`                                   |
| `"{primitive.spacing.16}"`   | `var(--lufa-primitive-spacing-16)`       |
| `"#3b82f6"`                  | `#3b82f6`                                |
| `"{core.brand.primary}"`     | `var(--lufa-core-brand-primary)`         |

**Code Flow:**

```javascript
// 1. Check if outputReferences is enabled
if (outputReferences && 
    token.original.$value && 
    typeof token.original.$value === 'string' && 
    token.original.$value.startsWith('{')) {
  
  // 2. Extract reference path
  const refPath = token.original.$value.replace(/[{}]/g, '').split('.');
  // "{primitive.spacing.16}" → ["primitive", "spacing", "16"]
  
  // 3. Convert to CSS variable name
  const cssVarName = `--${prefix}-${refPath.join('-')}`;
  // ["primitive", "spacing", "16"] → "--lufa-primitive-spacing-16"
  
  // 4. Return as var() reference
  return `var(${cssVarName})`;
}

// 5. Return raw value if not a reference
return token.value || token.original?.$value || token.$value;
```

---

### `getResponsiveCSSVarName(token)`

Normalizes CSS variable names for responsive tokens by removing breakpoint suffixes.

**Signature:**
```javascript
const getResponsiveCSSVarName = (token) => { /* ... */ }
```

**Purpose:**
- Removes `.base`, `.md`, `.lg` suffixes from token paths
- Ensures all breakpoint variants share the same CSS variable name
- Prevents false positives for tokens naturally ending with "md", "lg", etc.

**Examples:**

| Token Path                               | CSS Variable Name                   |
|------------------------------------------|-------------------------------------|
| `core.layout.page-padding.base`          | `--lufa-core-layout-page-padding`   |
| `core.layout.page-padding.md`            | `--lufa-core-layout-page-padding`   |
| `core.layout.page-padding.lg`            | `--lufa-core-layout-page-padding`   |
| `core.layout.section-gap.base`           | `--lufa-core-layout-section-gap`    |
| `primitive.spacing.md` *(not responsive)*| `--lufa-primitive-spacing-md`       |

**Code Flow:**

```javascript
// 1. Copy token path
const path = [...token.path];
// ["core", "layout", "page-padding", "base"]

// 2. Get breakpoint from metadata
const breakpoint = getTokenBreakpoint(token);
// "base"

// 3. Check if token is responsive AND ends with breakpoint name
if (isResponsiveToken(token) && 
    ['base', 'sm', 'md', 'lg', 'xl', '2xl'].includes(path[path.length - 1])) {
  
  // 4. Remove breakpoint suffix
  path.pop();
  // ["core", "layout", "page-padding"]
}

// 5. Convert to CSS variable name
return `--${prefix}-${path.join('-')}`;
// "--lufa-core-layout-page-padding"
```

**Why the Double-Check?**

The function checks both `isResponsiveToken(token)` AND whether the path ends with a breakpoint name. This prevents false positives:

- ✅ `core.layout.page-padding.md` (responsive) → removes `.md`
- ❌ `primitive.spacing.md` (not responsive) → keeps `.md`

---

### `getTokenBreakpoint(token)`

Extracts the breakpoint name from token metadata.

**Signature:**
```javascript
export const getTokenBreakpoint = (token) => {
  const responsive = token.$extensions?.lufa?.responsive || 
                     token.original?.$extensions?.lufa?.responsive;
  return responsive?.breakpoint || null;
};
```

**Purpose:**
- Reads `$extensions.lufa.responsive.breakpoint` metadata
- Returns breakpoint name (`base`, `md`, `lg`, etc.)
- Returns `null` if token is not responsive

**Examples:**

| Token Metadata                                      | Return Value |
|-----------------------------------------------------|--------------|
| `{ $extensions: { lufa: { responsive: { breakpoint: "base" } } } }` | `"base"` |
| `{ $extensions: { lufa: { responsive: { breakpoint: "md" } } } }`   | `"md"`   |
| `{ $extensions: { lufa: { responsive: { breakpoint: "lg" } } } }`   | `"lg"`   |
| `{ }` *(no metadata)*                               | `null`       |

---

### `getMediaQuery(breakpoint)`

Maps breakpoint names to CSS media query strings.

**Signature:**
```javascript
export const getMediaQuery = (breakpoint) => {
  const breakpoints = {
    base: null,
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  };
  return breakpoints[breakpoint] || null;
};
```

**Purpose:**
- Converts breakpoint names to standard media queries
- Returns `null` for `base` (no media query needed for mobile-first)

**Examples:**

| Breakpoint | Media Query              |
|------------|--------------------------|
| `base`     | `null` *(no query)*      |
| `sm`       | `(min-width: 640px)`     |
| `md`       | `(min-width: 768px)`     |
| `lg`       | `(min-width: 1024px)`    |
| `xl`       | `(min-width: 1280px)`    |
| `2xl`      | `(min-width: 1536px)`    |

---

## Testing

### 1. Verify Output Structure

After building, check the generated CSS:

```bash
cat dist/tokens.css | head -100
```

**Expected:**
- `:root` selector at the top
- Static tokens first
- Responsive base values
- Mode tokens (light mode)

### 2. Check Media Queries

Verify media queries are generated for each breakpoint:

```bash
grep -n "@media" dist/tokens.css
```

**Expected Output:**
```
545:@media (min-width: 768px) {
556:@media (min-width: 1024px) {
```

### 3. Verify Responsive Variables

Check that breakpoint suffixes are removed:

```bash
grep "page-padding" dist/tokens.css
```

**Expected:**
```css
--lufa-core-layout-page-padding: var(--lufa-primitive-spacing-16);
```

**NOT:**
```css
--lufa-core-layout-page-padding-base: var(--lufa-primitive-spacing-16);
--lufa-core-layout-page-padding-md: var(--lufa-primitive-spacing-24);
```

### 4. Verify Token References

Check that `outputReferences: true` works:

```bash
grep "var(--" dist/tokens.css | head -5
```

**Expected:**
```css
--lufa-core-layout-page-padding: var(--lufa-primitive-spacing-16);
--lufa-core-brand-primary: var(--lufa-primitive-color-blue-500);
```

### 5. Verify Theme Modes

Check that mode selectors are generated:

```bash
grep -A 5 "\[data-mode='dark'\]" dist/tokens.css
```

**Expected:**
```css
[data-mode='dark'] {
  --lufa-core-neutral-background: #111827;
  --lufa-core-neutral-text-primary: #f9fafb;
  --lufa-core-brand-primary: #3b82f6;
}
```

### 6. Test in Browser

Load the CSS and test with browser DevTools:

```javascript
// Check base value (mobile)
getComputedStyle(document.documentElement)
  .getPropertyValue('--lufa-core-layout-page-padding');
// Expected: "16px"

// Resize to tablet (768px+)
// Expected: "24px"

// Resize to desktop (1024px+)
// Expected: "32px"

// Toggle dark mode
document.documentElement.setAttribute('data-mode', 'dark');
getComputedStyle(document.documentElement)
  .getPropertyValue('--lufa-core-neutral-background');
// Expected: "#111827"
```

---

## Related Files

### Required Dependencies

| File                                      | Purpose                                          |
|-------------------------------------------|--------------------------------------------------|
| `build/transforms/responsive.js`          | Provides responsive metadata (`$extensions.lufa.responsive`) |
| `style-dictionary.config.js`              | Registers and configures the format              |

### Token Source Files

| Path                          | Contents                                |
|-------------------------------|-----------------------------------------|
| `src/primitives/`             | Base tokens (spacing, colors, etc.)     |
| `src/core/`                   | Core tokens (responsive + mode tokens)  |
| `src/semantic/`               | Semantic tokens (success, error, etc.)  |
| `src/component/`              | Component-specific tokens               |

### Related Documentation

- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Design Tokens Format Module Spec](https://design-tokens.github.io/community-group/format/)
- [Lufa Design System - Token Architecture](../../docs/tokens.md) *(if exists)*

---

## Troubleshooting

### Issue: Variables include breakpoint suffixes

**Problem:**
```css
--lufa-core-layout-page-padding-base: 16px;
--lufa-core-layout-page-padding-md: 24px;
```

**Solution:**
Ensure the `attribute/responsive` transform is registered and running:

```javascript
transforms: [
  // ... other transforms
  'attribute/responsive', // ✅ Must be included
]
```

---

### Issue: Media queries are not generated

**Problem:**
```css
:root {
  --lufa-core-layout-page-padding: 16px;
  --lufa-core-layout-page-padding-md: 24px; /* ❌ Should be in @media block */
}
```

**Solution:**
Verify that tokens have responsive metadata:

```json
{
  "page-padding": {
    "base": {
      "$value": "16px",
      "$extensions": {
        "lufa": {
          "responsive": {
            "breakpoint": "base"
          }
        }
      }
    }
  }
}
```

---

### Issue: Token references are not preserved

**Problem:**
```css
--lufa-core-layout-page-padding: 16px; /* ❌ Should be var(--lufa-primitive-spacing-16) */
```

**Solution:**
Enable `outputReferences` in config:

```javascript
files: [
  {
    destination: 'tokens.css',
    format: 'css/variables-with-media-queries',
    options: {
      outputReferences: true, // ✅ Required for token references
      prefix: 'lufa',
    },
  },
]
```

---

### Issue: Mode tokens are not generated

**Problem:**
No `[data-mode='dark']` selector in output.

**Solution:**
Verify tokens have mode metadata:

```json
{
  "background": {
    "$value": "#ffffff",
    "$type": "color",
    "$extensions": {
      "lufa": {
        "modes": {
          "light": "#ffffff",
          "dark": "#111827",
          "high-contrast": "{primitive.color.hc-black}"
        }
      }
    }
  }
}
```

---

## Contributing

When modifying this format:

1. **Test thoroughly** - Changes affect ALL tokens in the system
2. **Update tests** - Add test cases for new features
3. **Document changes** - Update this README
4. **Check output** - Verify `dist/tokens.css` looks correct
5. **Test in browser** - Ensure media queries work as expected

---

## License

Part of the Lufa Design System.
