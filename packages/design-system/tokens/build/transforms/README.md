# Custom Transform: Responsive Token Detection

Custom Style Dictionary transform for detecting and processing responsive design tokens with breakpoint-specific values.

**Created:** Phase 2C (Spacing & Layout)  
**Used by:** 18 responsive layout tokens (page-padding, section-gap, container-gutter, grid-gap, header-height, modal-padding)

---

## Purpose

This transform extends Style Dictionary to identify tokens with responsive variants (base, sm, md, lg, xl, 2xl) and add breakpoint metadata. It enables the generation of mobile-first CSS with media queries, allowing design tokens to adapt across different viewport sizes.

### Why It Exists

Standard Style Dictionary doesn't have built-in support for responsive token variants. This transform:

- **Detects responsive tokens** by checking for `$extensions.lufa.responsive` metadata
- **Extracts breakpoint information** from token definitions
- **Maps breakpoints to media queries** using Tailwind-style breakpoint system
- **Adds metadata attributes** that downstream formats can use to generate media queries

Without this transform, responsive tokens would need manual media query generation and wouldn't benefit from the design token cascade.

---

## How It Works

### Detection Flow

1. **Token Analysis**: Examines each token for `$extensions.lufa.responsive` metadata
2. **Breakpoint Extraction**: Reads the `breakpoint` value from metadata (base, md, lg, etc.)
3. **Media Query Mapping**: Converts breakpoints to CSS media queries using predefined map
4. **Attribute Addition**: Adds `responsive`, `breakpoint`, and `mediaQuery` attributes to token

### Mobile-First Approach

- **Base tokens** have no media query (`null`) and apply by default
- **Breakpoint tokens** have min-width media queries that override base values
- Follows progressive enhancement pattern (mobile → tablet → desktop)

---

## API Reference

### `isResponsiveToken(token)`

Checks if a token has responsive metadata.

**Parameters:**
- `token` (Object) - Style Dictionary token object

**Returns:**
- `boolean` - `true` if token has `$extensions.lufa.responsive`, `false` otherwise

**Example:**
```javascript
import { isResponsiveToken } from './transforms/responsive.js';

if (isResponsiveToken(token)) {
  // Process as responsive token
}
```

---

### `getTokenBreakpoint(token)`

Extracts the breakpoint name from a responsive token.

**Parameters:**
- `token` (Object) - Style Dictionary token object

**Returns:**
- `string|null` - Breakpoint name (`'base'`, `'md'`, `'lg'`, etc.) or `null` if not responsive

**Example:**
```javascript
import { getTokenBreakpoint } from './transforms/responsive.js';

const breakpoint = getTokenBreakpoint(token);
// Returns: 'md'
```

---

### `getMediaQuery(breakpoint)`

Maps breakpoint names to CSS media queries.

**Parameters:**
- `breakpoint` (string) - Breakpoint name (base, sm, md, lg, xl, 2xl)

**Returns:**
- `string|null` - Media query string or `null` for base (mobile-first)

**Example:**
```javascript
import { getMediaQuery } from './transforms/responsive.js';

getMediaQuery('base'); // null (no media query)
getMediaQuery('md');   // '(min-width: 768px)'
getMediaQuery('lg');   // '(min-width: 1024px)'
```

---

### `responsiveTransform`

The transform object registered with Style Dictionary.

**Properties:**
- `name`: `'attribute/responsive'`
- `type`: `'attribute'` (adds metadata without changing token value)
- `transform`: Function that returns attributes object

**Transform Output:**
```javascript
{
  responsive: true,
  breakpoint: 'md',
  mediaQuery: '(min-width: 768px)'
}
```

For non-responsive tokens, returns empty object `{}`.

---

## Usage

### Registration in `style-dictionary.config.js`

```javascript
import StyleDictionary from 'style-dictionary';
import { responsiveTransform } from './build/transforms/responsive.js';

// Register the transform
StyleDictionary.registerTransform(responsiveTransform);

export default {
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/kebab',
        'size/rem',
        'color/css',
        'attribute/responsive', // ← Add to transform list
      ],
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables-with-media-queries',
        },
      ],
    },
  },
};
```

### Transform Order

Place `attribute/responsive` **after** value transforms (size/rem, color/css) but **before** custom formats that need responsive metadata.

---

## Token Structure

### Required Metadata Format

Tokens must include `$extensions.lufa.responsive` with a `breakpoint` property:

```json
{
  "core": {
    "layout": {
      "page-padding": {
        "base": {
          "$value": "16px",
          "$type": "dimension",
          "$description": "Horizontal padding for page container on mobile viewports",
          "$extensions": {
            "lufa": {
              "responsive": {
                "breakpoint": "base",
                "applyAt": "all"
              }
            }
          }
        },
        "md": {
          "$value": "24px",
          "$type": "dimension",
          "$description": "Horizontal padding for page container on tablet viewports",
          "$extensions": {
            "lufa": {
              "responsive": {
                "breakpoint": "md",
                "applyAt": "768px"
              }
            }
          }
        },
        "lg": {
          "$value": "32px",
          "$type": "dimension",
          "$description": "Horizontal padding for page container on desktop viewports",
          "$extensions": {
            "lufa": {
              "responsive": {
                "breakpoint": "lg",
                "applyAt": "1024px"
              }
            }
          }
        }
      }
    }
  }
}
```

### Token Naming Convention

Responsive tokens should follow this pattern:
- Group name: `page-padding`, `section-gap`, `grid-gap`
- Variant suffix: `base`, `md`, `lg` (matches breakpoint name)

---

## Output

### Attributes Added to Tokens

After transformation, responsive tokens receive these additional attributes:

```javascript
{
  name: 'core-layout-page-padding-md',
  value: '24px',
  path: ['core', 'layout', 'page-padding', 'md'],
  
  // Added by responsive transform
  attributes: {
    responsive: true,
    breakpoint: 'md',
    mediaQuery: '(min-width: 768px)',
    // ... other attributes from previous transforms
  }
}
```

Non-responsive tokens remain unchanged.

---

## Breakpoint Map

The transform uses this breakpoint system (Tailwind-compatible):

| Breakpoint | Media Query            | Min Width | Typical Device |
|------------|------------------------|-----------|----------------|
| `base`     | `null` (no query)      | 0px       | Mobile         |
| `sm`       | `(min-width: 640px)`   | 640px     | Large phone    |
| `md`       | `(min-width: 768px)`   | 768px     | Tablet         |
| `lg`       | `(min-width: 1024px)`  | 1024px    | Desktop        |
| `xl`       | `(min-width: 1280px)`  | 1280px    | Large desktop  |
| `2xl`      | `(min-width: 1536px)`  | 1536px    | Wide screen    |

### Mobile-First Strategy

- Base styles apply to all viewports
- Each breakpoint overrides previous values at larger sizes
- No max-width queries (progressive enhancement)

---

## Testing

### Verify Transform Registration

```bash
# Build tokens and check output
npm run build:tokens

# Check that responsive tokens have attributes
grep -A 5 "page-padding" dist/tokens.css
```

### Expected CSS Output

Base value in `:root`:
```css
:root {
  --lufa-core-layout-page-padding: 16px;
}
```

Media query overrides:
```css
@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: 24px;
  }
}

@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: 32px;
  }
}
```

### Unit Testing Example

```javascript
import { isResponsiveToken, getTokenBreakpoint, getMediaQuery } from './responsive.js';

const responsiveToken = {
  $extensions: {
    lufa: {
      responsive: {
        breakpoint: 'md'
      }
    }
  }
};

console.assert(isResponsiveToken(responsiveToken) === true);
console.assert(getTokenBreakpoint(responsiveToken) === 'md');
console.assert(getMediaQuery('md') === '(min-width: 768px)');
```

---

## Related Files

### Format Using This Transform

- **[`css-with-media-queries.js`](../formats/css-with-media-queries.js)** - Custom CSS format that consumes responsive metadata and generates media query blocks

### Token Files Using Responsive Metadata

- [`src/core/layout/spacing.json`](../../src/core/layout/spacing.json) - Contains 6 responsive token groups (18 variants total)

### Configuration

- [`style-dictionary.config.js`](../../style-dictionary.config.js) - Transform registration and build configuration

---

## Examples

### 18 Responsive Layout Tokens

1. **page-padding** (base, md, lg) - Page container horizontal padding
2. **section-gap** (base, md, lg) - Vertical spacing between sections
3. **container-gutter** (base, md, lg) - Container internal gutters
4. **grid-gap** (base, md, lg) - CSS Grid gap spacing
5. **header-height** (base, md, lg) - Navigation header height
6. **modal-padding** (base, md, lg) - Modal dialog internal padding

Each group has 3 breakpoint variants (base, md, lg) = 18 total tokens.

### Usage in Components

```css
/* Automatically responsive via CSS variables */
.page-container {
  padding-inline: var(--lufa-core-layout-page-padding);
  /* 16px on mobile, 24px on tablet, 32px on desktop */
}

.section {
  margin-block: var(--lufa-core-layout-section-gap);
  /* 48px → 64px → 80px */
}
```

---

## Limitations

- Only supports min-width media queries (mobile-first)
- Breakpoint names must match the predefined map
- Doesn't support container queries or other responsive strategies
- Assumes all responsive tokens follow naming convention (group-breakpoint)

---

## Future Enhancements

- [ ] Support for max-width queries (desktop-first)
- [ ] Container query generation for component-level responsiveness
- [ ] Dynamic breakpoint registration from token metadata
- [ ] Hover/focus state variants for interactive responsiveness
- [ ] Print media query support

---

**Last Updated:** Phase 2C (Spacing & Layout)  
**Maintainer:** Design System Team  
**Related Documentation:** [Style Dictionary Transforms](https://amzn.github.io/style-dictionary/#/transforms)
