# Technical Specification: Spacing & Layout Tokens Refinement

**Subject:** spacing-layout-tokens  
**Version:** 1.0  
**Date:** 2026-01-26  
**Design System Version:** v0.7.1 → v0.8.0  
**Phase:** 2 - Planning

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Scope](#scope)
3. [Architecture Overview](#architecture-overview)
4. [Token Additions](#token-additions)
5. [Token Migrations](#token-migrations)
6. [Component Updates](#component-updates)
7. [Build System Changes](#build-system-changes)
8. [File Structure](#file-structure)
9. [CSS Output](#css-output)
10. [Performance Impact](#performance-impact)
11. [Migration Strategy](#migration-strategy)
12. [Testing Requirements](#testing-requirements)
13. [Rollout Plan](#rollout-plan)

---

## Executive Summary

### Objectives

Refine the Lufa Design System spacing and layout token architecture to:

1. **Add breakpoint token system** - Define 6 responsive breakpoints (320-1536px)
2. **Implement responsive spacing** - Add variants for layout-critical tokens
3. **Fix spacing-none bug** - Correct Box component padding/margin "none" value
4. **Add grid system tokens** - Define gap and gutter tokens
5. **Create height token scale** - Separate heights from spacing tokens
6. **Add fluid spacing tokens** - Enable smooth viewport-based scaling

### Impact

**New Tokens Created:** 47 tokens  
**Existing Tokens Updated:** 8 tokens  
**Files Modified:** ~18 files  
**Breaking Changes:** 1 (spacing-none bug fix - breaking in fixing way)  
**Estimated Effort:** 36-40 hours (9-10 days)  
**Target Release:** v0.8.0

### Key Decisions (from ADRs)

- **ADR-005:** 6-breakpoint system (xs-2xl) aligned with Tailwind, mobile-first, pixel units
- **ADR-006:** Hybrid responsive approach (3-variant manual + fluid tokens + static base)
- **ADR-007:** Fix spacing-none bug by mapping to spacing-0 (0px)

---

## Scope

### In Scope ✅

**Token Changes:**

- Create 6 breakpoint primitive tokens
- Create 8 height primitive tokens
- Add 18 responsive layout token variants (3 variants × 6 tokens)
- Add 4 fluid spacing tokens
- Add 6 grid system tokens
- Add 5 container size tokens
- Update 2 existing tokens (deprecate mobile-specific variants)

**Component Updates:**

- Fix Box component spacing-none bug
- Update Box component configuration
- Update Storybook breakpoint definitions
- Generate new utility classes

**Build System:**

- Configure Style Dictionary for responsive token generation
- Add media query output format
- Update CSS build pipeline

**Documentation:**

- Breakpoint usage guide
- Responsive spacing guide
- Grid system documentation
- Migration guide (v0.7.1 → v0.8.0)

### Out of Scope ❌

**Not in This Phase:**

- Container query tokens (deferred to Phase 3 - 2027+)
- Negative spacing tokens (deferred to Phase 3)
- Density mode tokens (deferred to Phase 3)
- Component-level responsive spacing (beyond Box)
- Automated responsive spacing generation
- Aspect ratio tokens
- Z-index token system
- Vertical rhythm tokens

---

## Architecture Overview

### Token Hierarchy (Unchanged)

The existing 4-tier hierarchy remains:

```
Primitive → Core → Semantic → Component
```

### New Token Categories

```
primitives/
  ├── breakpoint/
  │   └── scale.json          ← NEW: 6 breakpoint tokens
  ├── spacing/
  │   └── scale.json          ← EXISTING: 12 spacing tokens
  └── height/
      └── scale.json          ← NEW: 8 height tokens

core/
  ├── layout/
  │   ├── spacing.json        ← UPDATE: Add responsive variants
  │   ├── containers.json     ← NEW: Container size tokens
  │   └── grid.json           ← NEW: Grid system tokens
  └── component/
      └── sizing.json         ← NEW: Component heights

semantic/
  └── (no changes in this phase)

component/
  └── (button height updates)
```

---

## Token Additions

### 1. Breakpoint Tokens (6 tokens)

**File:** `tokens/src/primitives/breakpoint/scale.json` (NEW)

**Tokens:**

| Token | Value  | Description                | Device Target      |
| ----- | ------ | -------------------------- | ------------------ |
| `xs`  | 320px  | Extra small - Mobile base  | Mobile portrait    |
| `sm`  | 640px  | Small - Mobile landscape   | Mobile landscape   |
| `md`  | 768px  | Medium - Tablets           | Tablets            |
| `lg`  | 1024px | Large - Desktop            | Desktop/Laptops    |
| `xl`  | 1280px | Extra large - Large screen | Large desktop, HD  |
| `2xl` | 1536px | 2X large - Wide screen     | Ultra-wide, 1440p+ |

**JSON Structure:**

```json
{
  "primitive": {
    "breakpoint": {
      "xs": {
        "$value": "320px",
        "$type": "dimension",
        "$description": "Extra small - Mobile portrait (minimum supported width)",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "mobile-portrait",
            "useCase": "Base mobile styles, minimum device width"
          }
        }
      },
      "sm": {
        "$value": "640px",
        "$type": "dimension",
        "$description": "Small - Mobile landscape, small tablets",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "mobile-landscape",
            "useCase": "Landscape orientation, phablets, small tablets"
          }
        }
      },
      "md": {
        "$value": "768px",
        "$type": "dimension",
        "$description": "Medium - Tablets, small desktop screens",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "tablet",
            "useCase": "Tablets (iPad), small desktop viewports"
          }
        }
      },
      "lg": {
        "$value": "1024px",
        "$type": "dimension",
        "$description": "Large - Desktop, laptops (13-15 inch)",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "desktop",
            "useCase": "Standard desktop, laptops"
          }
        }
      },
      "xl": {
        "$value": "1280px",
        "$type": "dimension",
        "$description": "Extra large - Large desktop, HD displays",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "desktop-large",
            "useCase": "Large monitors, HD displays, wide layouts"
          }
        }
      },
      "2xl": {
        "$value": "1536px",
        "$type": "dimension",
        "$description": "2X large - Extra wide displays, 1440p+",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "desktop-extra-large",
            "useCase": "Ultra-wide monitors, 1440p+, professional displays"
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
:root {
  --lufa-primitive-breakpoint-xs: 320px;
  --lufa-primitive-breakpoint-sm: 640px;
  --lufa-primitive-breakpoint-md: 768px;
  --lufa-primitive-breakpoint-lg: 1024px;
  --lufa-primitive-breakpoint-xl: 1280px;
  --lufa-primitive-breakpoint-2xl: 1536px;
}
```

---

### 2. Height Tokens (8 tokens)

**File:** `tokens/src/primitives/height/scale.json` (NEW)

**Rationale:** Heights are currently mixed with spacing tokens. Separating them provides semantic clarity (heights vs gaps/margins).

**Tokens:**

| Token       | Value | Description           | Use Cases                     |
| ----------- | ----- | --------------------- | ----------------------------- |
| `height-24` | 24px  | Extra small height    | Small badges, tags            |
| `height-32` | 32px  | Small height          | Small buttons, compact inputs |
| `height-40` | 40px  | Medium height         | Default buttons, inputs       |
| `height-48` | 48px  | Large height          | Large buttons, select         |
| `height-56` | 56px  | Extra large height    | Extra large buttons           |
| `height-64` | 64px  | Header height         | Navigation bars, headers      |
| `height-80` | 80px  | Large header height   | Hero headers                  |
| `height-96` | 96px  | Extra large component | Large cards, panels           |

**JSON Structure (example):**

```json
{
  "primitive": {
    "height": {
      "24": {
        "$value": "24px",
        "$type": "dimension",
        "$description": "Extra small height - for small badges and tags",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "height",
            "useCase": "Small badges, compact tags, minimal components"
          }
        }
      },
      "32": {
        "$value": "32px",
        "$type": "dimension",
        "$description": "Small height - for small buttons and compact inputs",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "height",
            "useCase": "Small buttons, compact form inputs, dense layouts"
          }
        }
      }
      // ... (6 more height tokens)
    }
  }
}
```

**CSS Output:**

```css
:root {
  --lufa-primitive-height-24: 24px;
  --lufa-primitive-height-32: 32px;
  --lufa-primitive-height-40: 40px;
  --lufa-primitive-height-48: 48px;
  --lufa-primitive-height-56: 56px;
  --lufa-primitive-height-64: 64px;
  --lufa-primitive-height-80: 80px;
  --lufa-primitive-height-96: 96px;
}
```

---

### 3. Responsive Layout Tokens (18 tokens)

**File:** `tokens/src/core/layout/spacing.json` (UPDATE)

**Tokens with 3 Variants (base, md, lg):**

1. **page-padding** (horizontal page margins)
   - base: 16px
   - md: 24px
   - lg: 32px

2. **section-gap** (vertical section spacing)
   - base: 48px
   - md: 64px
   - lg: 80px

3. **container-gutter** (grid container side margins)
   - base: 16px
   - md: 24px
   - lg: 32px

4. **grid-gap** (grid item spacing)
   - base: 16px
   - md: 24px
   - lg: 32px

5. **header-height** (navigation bar height)
   - base: 56px
   - md: 64px
   - lg: 64px

6. **modal-padding** (modal content padding)
   - base: 24px
   - md: 32px
   - lg: 40px

**Total:** 6 base tokens + 12 variant tokens = **18 tokens**

**JSON Structure (example for page-padding):**

```json
{
  "core": {
    "layout": {
      "page-padding": {
        "$value": "{primitive.spacing.16}",
        "$type": "dimension",
        "$description": "Horizontal page padding (mobile base)",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "layout",
            "responsive": true,
            "variants": {
              "base": "{primitive.spacing.16}",
              "md": "{primitive.spacing.24}",
              "lg": "{primitive.spacing.32}"
            }
          }
        }
      }
    }
  }
}
```

**Style Dictionary Transform:**

```javascript
// custom-transforms.js
function responsiveTokenTransform(token) {
  if (token.$extensions?.lufa?.responsive) {
    const variants = token.$extensions.lufa.variants;
    return {
      base: token.$value,
      md: variants.md,
      lg: variants.lg,
    };
  }
  return token.$value;
}
```

**CSS Output:**

```css
:root {
  /* Base values */
  --lufa-core-layout-page-padding: 16px;
  --lufa-core-layout-page-padding-md: 24px;
  --lufa-core-layout-page-padding-lg: 32px;
}

/* Responsive overrides */
@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-core-layout-page-padding-md);
  }
}

@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-core-layout-page-padding-lg);
  }
}
```

---

### 4. Fluid Spacing Tokens (4 tokens)

**File:** `tokens/src/core/layout/spacing.json` (UPDATE)

**Tokens:**

1. **section-gap-fluid**
   - Value: `clamp(48px, 8vw, 96px)`
   - Description: Fluid section spacing that scales smoothly

2. **hero-padding-fluid**
   - Value: `clamp(32px, 6vw, 80px)`
   - Description: Fluid hero section padding

3. **container-gutter-fluid**
   - Value: `clamp(16px, 4vw, 48px)`
   - Description: Fluid container side margins

4. **page-margin-fluid**
   - Value: `clamp(16px, 3vw, 32px)`
   - Description: Fluid page outer margins

**JSON Structure (example):**

```json
{
  "core": {
    "layout": {
      "section-gap-fluid": {
        "$value": "clamp(48px, 8vw, 96px)",
        "$type": "dimension",
        "$description": "Fluid section spacing - scales smoothly from mobile to desktop",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "layout",
            "fluid": true,
            "clamp": {
              "min": "48px",
              "preferred": "8vw",
              "max": "96px"
            }
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
:root {
  --lufa-core-layout-section-gap-fluid: clamp(48px, 8vw, 96px);
  --lufa-core-layout-hero-padding-fluid: clamp(32px, 6vw, 80px);
  --lufa-core-layout-container-gutter-fluid: clamp(16px, 4vw, 48px);
  --lufa-core-layout-page-margin-fluid: clamp(16px, 3vw, 32px);
}
```

---

### 5. Grid System Tokens (6 tokens)

**File:** `tokens/src/core/layout/grid.json` (NEW)

**Tokens:**

| Token                   | Value          | Description                      |
| ----------------------- | -------------- | -------------------------------- |
| `grid-columns`          | 12             | Standard 12-column grid          |
| `grid-gap-tight`        | `{spacing.8}`  | 8px - Tight grid spacing         |
| `grid-gap-default`      | `{spacing.16}` | 16px - Default grid spacing      |
| `grid-gap-comfortable`  | `{spacing.24}` | 24px - Comfortable grid spacing  |
| `grid-gap-spacious`     | `{spacing.32}` | 32px - Spacious grid spacing     |
| `grid-min-column-width` | 280px          | Minimum column width (auto-fill) |

**JSON Structure:**

```json
{
  "core": {
    "layout": {
      "grid": {
        "columns": {
          "$value": "12",
          "$type": "number",
          "$description": "Standard 12-column grid system",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "grid",
              "useCase": "Grid template columns, CSS Grid layouts"
            }
          }
        },
        "gap-tight": {
          "$value": "{primitive.spacing.8}",
          "$type": "dimension",
          "$description": "Tight grid gap - minimal spacing between grid items",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "grid",
              "useCase": "Dense grids, compact layouts"
            }
          }
        },
        "gap-default": {
          "$value": "{primitive.spacing.16}",
          "$type": "dimension",
          "$description": "Default grid gap - standard spacing",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "grid",
              "useCase": "Most grid layouts, standard card grids"
            }
          }
        },
        "gap-comfortable": {
          "$value": "{primitive.spacing.24}",
          "$type": "dimension",
          "$description": "Comfortable grid gap - generous spacing",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "grid",
              "useCase": "Relaxed layouts, marketing pages"
            }
          }
        },
        "gap-spacious": {
          "$value": "{primitive.spacing.32}",
          "$type": "dimension",
          "$description": "Spacious grid gap - extra generous spacing",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "grid",
              "useCase": "Hero sections, large card displays"
            }
          }
        },
        "min-column-width": {
          "$value": "280px",
          "$type": "dimension",
          "$description": "Minimum column width for auto-fill grids",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "grid",
              "useCase": "CSS Grid auto-fill/auto-fit patterns"
            }
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
:root {
  --lufa-core-layout-grid-columns: 12;
  --lufa-core-layout-grid-gap-tight: 8px;
  --lufa-core-layout-grid-gap-default: 16px;
  --lufa-core-layout-grid-gap-comfortable: 24px;
  --lufa-core-layout-grid-gap-spacious: 32px;
  --lufa-core-layout-grid-min-column-width: 280px;
}
```

**Usage Example:**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(var(--lufa-core-layout-grid-columns), 1fr);
  gap: var(--lufa-core-layout-grid-gap-default);
}

/* Auto-fill responsive grid */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--lufa-core-layout-grid-min-column-width), 1fr));
  gap: var(--lufa-core-layout-grid-gap-default);
}
```

---

### 6. Container Size Tokens (5 tokens)

**File:** `tokens/src/core/layout/containers.json` (NEW)

**Tokens:**

| Token           | Value              | Description                            |
| --------------- | ------------------ | -------------------------------------- |
| `container-sm`  | `{breakpoint.sm}`  | 640px - Small container                |
| `container-md`  | `{breakpoint.md}`  | 768px - Medium container               |
| `container-lg`  | `{breakpoint.lg}`  | 1024px - Large container               |
| `container-xl`  | `{breakpoint.xl}`  | 1280px - Extra large (current default) |
| `container-2xl` | `{breakpoint.2xl}` | 1536px - Extra wide container          |

**JSON Structure:**

```json
{
  "core": {
    "layout": {
      "container": {
        "sm": {
          "$value": "{primitive.breakpoint.sm}",
          "$type": "dimension",
          "$description": "Small container max-width - 640px",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "container",
              "useCase": "Narrow content containers, forms"
            }
          }
        },
        "md": {
          "$value": "{primitive.breakpoint.md}",
          "$type": "dimension",
          "$description": "Medium container max-width - 768px",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "container",
              "useCase": "Standard content containers"
            }
          }
        },
        "lg": {
          "$value": "{primitive.breakpoint.lg}",
          "$type": "dimension",
          "$description": "Large container max-width - 1024px",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "container",
              "useCase": "Wide content containers, dashboards"
            }
          }
        },
        "xl": {
          "$value": "{primitive.breakpoint.xl}",
          "$type": "dimension",
          "$description": "Extra large container max-width - 1280px (current default)",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "container",
              "useCase": "Default page container, main content wrapper"
            }
          }
        },
        "2xl": {
          "$value": "{primitive.breakpoint.2xl}",
          "$type": "dimension",
          "$description": "Extra wide container max-width - 1536px",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "container",
              "useCase": "Ultra-wide layouts, professional displays"
            }
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
:root {
  --lufa-core-layout-container-sm: 640px;
  --lufa-core-layout-container-md: 768px;
  --lufa-core-layout-container-lg: 1024px;
  --lufa-core-layout-container-xl: 1280px;
  --lufa-core-layout-container-2xl: 1536px;
}
```

---

## Token Migrations

### 1. Deprecate Old Mobile-Specific Tokens

**Tokens to Deprecate:**

- `page-padding-mobile` → Use `page-padding` (base)
- `section-gap-mobile` → Use `section-gap` (base)

**Update:**

```json
{
  "core": {
    "layout": {
      "page-padding-mobile": {
        "$value": "{core.layout.page-padding}",
        "$type": "dimension",
        "$description": "DEPRECATED: Use page-padding (base) instead. Horizontal page padding for mobile.",
        "$extensions": {
          "lufa": {
            "deprecated": true,
            "deprecatedVersion": "0.8.0",
            "replacement": "core.layout.page-padding",
            "removalVersion": "1.0.0"
          }
        }
      },
      "section-gap-mobile": {
        "$value": "{core.layout.section-gap}",
        "$type": "dimension",
        "$description": "DEPRECATED: Use section-gap (base) instead. Vertical section spacing for mobile.",
        "$extensions": {
          "lufa": {
            "deprecated": true,
            "deprecatedVersion": "0.8.0",
            "replacement": "core.layout.section-gap",
            "removalVersion": "1.0.0"
          }
        }
      }
    }
  }
}
```

**Console Warning (Optional):**

```typescript
// deprecation-warnings.ts
export function warnDeprecatedToken(tokenName: string, replacement: string) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      `[Lufa DS v0.8.0] Token "${tokenName}" is deprecated. Use "${replacement}" instead. ` +
        `This token will be removed in v1.0.0.`
    );
  }
}
```

---

### 2. Update Container Max-Width

**Current:**

```json
{
  "container-max-width": "1280px"
}
```

**New (with backward compatibility):**

```json
{
  "container-max-width": {
    "$value": "{core.layout.container.xl}",
    "$type": "dimension",
    "$description": "DEPRECATED: Use container-xl instead. Maximum width for centered content container.",
    "$extensions": {
      "lufa": {
        "deprecated": true,
        "deprecatedVersion": "0.8.0",
        "replacement": "core.layout.container.xl",
        "removalVersion": "1.0.0"
      }
    }
  },
  "container": {
    "xl": {
      "$value": "{primitive.breakpoint.xl}",
      "$type": "dimension",
      "$description": "Extra large container max-width - 1280px (default)"
    }
  }
}
```

---

### 3. Migrate Component Heights to Height Tokens

**Button Component:**

**Before:**

```json
{
  "component": {
    "button": {
      "size": {
        "sm": {
          "height": {
            "$value": "32px"
          }
        },
        "md": {
          "height": {
            "$value": "40px"
          }
        },
        "lg": {
          "height": {
            "$value": "48px"
          }
        }
      }
    }
  }
}
```

**After:**

```json
{
  "component": {
    "button": {
      "size": {
        "sm": {
          "height": {
            "$value": "{primitive.height.32}",
            "$type": "dimension",
            "$description": "Small button height"
          }
        },
        "md": {
          "height": {
            "$value": "{primitive.height.40}",
            "$type": "dimension",
            "$description": "Medium button height (default)"
          }
        },
        "lg": {
          "height": {
            "$value": "{primitive.height.48}",
            "$type": "dimension",
            "$description": "Large button height"
          }
        }
      }
    }
  }
}
```

**Input Component:**

**Before:**

```json
{
  "input-height": "{primitive.spacing.40}"
}
```

**After:**

```json
{
  "input-height": "{primitive.height.40}"
}
```

---

## Component Updates

### 1. Box Component - Fix Spacing-None Bug

**File:** Find Box utilities configuration (e.g., `box.utilities.config.js`)

**Before:**

```javascript
const spacingMap = {
  none: 'spacing-tight', // ❌ BUG: 4px instead of 0px
  tight: 'spacing-tight',
  compact: 'spacing-compact',
  default: 'spacing-default',
  comfortable: 'spacing-comfortable',
  spacious: 'spacing-spacious',
};
```

**After:**

```javascript
const spacingMap = {
  none: 'spacing-0', // ✅ FIX: 0px
  tight: 'spacing-tight',
  compact: 'spacing-compact',
  default: 'spacing-default',
  comfortable: 'spacing-comfortable',
  spacious: 'spacing-spacious',
};
```

**CSS Output Change:**

```css
/* Before (wrong) */
.padding-none {
  padding: var(--lufa-semantic-ui-spacing-tight); /* 4px */
}

/* After (correct) */
.padding-none {
  padding: var(--lufa-primitive-spacing-0); /* 0px */
}
```

---

### 2. Storybook Breakpoints Integration

**File:** `packages/design-system/storybook/.storybook/breakpoints.ts`

**Before:**

```typescript
export const Breakpoints = {
  xsmall: { width: 320 },
  small: { width: 576 }, // ⚠️ Will change to 640
  medium: { width: 768 },
  large: { width: 1024 },
  xlarge: { width: 1280 },
  xxlarge: { width: 1536 },
};
```

**After:**

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens';

// Helper to extract px value from token
const px = (token: string) => parseInt(token.replace('px', ''));

export const Breakpoints = {
  xs: { width: px(tokens.primitive.breakpoint.xs) }, // 320
  sm: { width: px(tokens.primitive.breakpoint.sm) }, // 640 (changed from 576)
  md: { width: px(tokens.primitive.breakpoint.md) }, // 768
  lg: { width: px(tokens.primitive.breakpoint.lg) }, // 1024
  xl: { width: px(tokens.primitive.breakpoint.xl) }, // 1280
  '2xl': { width: px(tokens.primitive.breakpoint['2xl']) }, // 1536
};

// Legacy names for backwards compatibility (deprecated)
export const LegacyBreakpoints = {
  xsmall: Breakpoints.xs,
  small: Breakpoints.sm, // ⚠️ VALUE CHANGED: 576 → 640
  medium: Breakpoints.md,
  large: Breakpoints.lg,
  xlarge: Breakpoints.xl,
  xxlarge: Breakpoints['2xl'],
};
```

**Breaking Change Note:** Storybook's "small" viewport changes from 576px to 640px.

---

## Build System Changes

### Style Dictionary Configuration

**File:** `packages/design-system/tokens/config.json` (UPDATE)

**Add Responsive Token Transform:**

```json
{
  "transforms": [
    // ... existing transforms
    "lufa/responsive-tokens" // NEW
  ],
  "files": [
    {
      "destination": "css/tokens.css",
      "format": "css/variables",
      "options": {
        "outputReferences": true,
        "mediaQueries": true // NEW: Enable media query generation
      }
    }
  ]
}
```

**Custom Transform (NEW):**

**File:** `packages/design-system/tokens/build/transforms/responsive.js`

```javascript
/**
 * Transform responsive tokens into base + variant CSS variables
 * with media query overrides
 */
module.exports = {
  name: 'lufa/responsive-tokens',
  type: 'value',
  matcher: (token) => {
    return token.$extensions?.lufa?.responsive === true;
  },
  transformer: (token) => {
    const variants = token.$extensions.lufa.variants;

    // Return an object that the formatter can use
    return {
      base: token.$value,
      variants: {
        md: variants.md,
        lg: variants.lg,
      },
      breakpoints: {
        md: '768px',
        lg: '1024px',
      },
    };
  },
};
```

**Custom Format (NEW):**

**File:** `packages/design-system/tokens/build/formats/css-with-media-queries.js`

```javascript
/**
 * CSS format that generates media queries for responsive tokens
 */
module.exports = function ({ dictionary, options }) {
  const tokens = dictionary.allTokens;
  let css = ':root {\n';
  const mediaQueries = { md: [], lg: [] };

  tokens.forEach((token) => {
    const responsive = token.$extensions?.lufa?.responsive;

    if (responsive) {
      // Base value
      css += `  --${token.name}: ${token.value.base};\n`;

      // Variant values
      css += `  --${token.name}-md: ${token.value.variants.md};\n`;
      css += `  --${token.name}-lg: ${token.value.variants.lg};\n`;

      // Collect media query overrides
      mediaQueries.md.push({
        name: token.name,
        value: token.value.variants.md,
      });
      mediaQueries.lg.push({
        name: token.name,
        value: token.value.variants.lg,
      });
    } else {
      // Regular token
      css += `  --${token.name}: ${token.value};\n`;
    }
  });

  css += '}\n\n';

  // Generate media queries
  if (mediaQueries.md.length > 0) {
    css += '@media (min-width: 768px) {\n';
    css += '  :root {\n';
    mediaQueries.md.forEach(({ name, value }) => {
      css += `    --${name}: var(--${name}-md);\n`;
    });
    css += '  }\n';
    css += '}\n\n';
  }

  if (mediaQueries.lg.length > 0) {
    css += '@media (min-width: 1024px) {\n';
    css += '  :root {\n';
    mediaQueries.lg.forEach(({ name, value }) => {
      css += `    --${name}: var(--${name}-lg);\n`;
    });
    css += '  }\n';
    css += '}\n';
  }

  return css;
};
```

---

## File Structure

### New Files

```
packages/design-system/tokens/
├── src/
│   ├── primitives/
│   │   ├── breakpoint/
│   │   │   └── scale.json                  ← NEW (6 tokens)
│   │   ├── height/
│   │   │   └── scale.json                  ← NEW (8 tokens)
│   │   └── spacing/
│   │       └── scale.json                  ← EXISTING
│   ├── core/
│   │   ├── layout/
│   │   │   ├── spacing.json                ← UPDATE (responsive variants)
│   │   │   ├── containers.json             ← NEW (5 tokens)
│   │   │   └── grid.json                   ← NEW (6 tokens)
│   │   └── component/
│   │       └── sizing.json                 ← NEW (height references)
│   └── component/
│       └── button/
│           └── tokens.json                 ← UPDATE (use height tokens)
└── build/
    ├── transforms/
    │   └── responsive.js                   ← NEW
    └── formats/
        └── css-with-media-queries.js       ← NEW
```

### Modified Files

- `packages/design-system/tokens/config.json` - Add responsive transform
- `packages/design-system/main/src/components/Box/box.utilities.config.js` - Fix spacing-none
- `packages/design-system/storybook/.storybook/breakpoints.ts` - Import tokens
- `packages/design-system/tokens/src/core/layout/spacing.json` - Add variants
- `packages/design-system/tokens/src/component/button/tokens.json` - Use height tokens

**Total Files:**

- **New:** 6 files
- **Modified:** 5 files
- **Total Touched:** 11 files

---

## CSS Output

### Generated CSS Structure

**File:** `packages/design-system/tokens/dist/tokens.css`

**Estimated Size:**

- **Current:** ~45 KB
- **After Changes:** ~48-50 KB (+3-5 KB, +7-11%)

**Breakdown:**

```css
:root {
  /* ========================================
     PRIMITIVES - Breakpoints (6 tokens)
     ======================================== */
  --lufa-primitive-breakpoint-xs: 320px;
  --lufa-primitive-breakpoint-sm: 640px;
  --lufa-primitive-breakpoint-md: 768px;
  --lufa-primitive-breakpoint-lg: 1024px;
  --lufa-primitive-breakpoint-xl: 1280px;
  --lufa-primitive-breakpoint-2xl: 1536px;

  /* ========================================
     PRIMITIVES - Heights (8 tokens)
     ======================================== */
  --lufa-primitive-height-24: 24px;
  --lufa-primitive-height-32: 32px;
  --lufa-primitive-height-40: 40px;
  --lufa-primitive-height-48: 48px;
  --lufa-primitive-height-56: 56px;
  --lufa-primitive-height-64: 64px;
  --lufa-primitive-height-80: 80px;
  --lufa-primitive-height-96: 96px;

  /* ========================================
     CORE - Layout (Responsive Tokens)
     ======================================== */
  /* Base values (mobile-first) */
  --lufa-core-layout-page-padding: 16px;
  --lufa-core-layout-page-padding-md: 24px;
  --lufa-core-layout-page-padding-lg: 32px;

  --lufa-core-layout-section-gap: 48px;
  --lufa-core-layout-section-gap-md: 64px;
  --lufa-core-layout-section-gap-lg: 80px;

  --lufa-core-layout-container-gutter: 16px;
  --lufa-core-layout-container-gutter-md: 24px;
  --lufa-core-layout-container-gutter-lg: 32px;

  --lufa-core-layout-grid-gap: 16px;
  --lufa-core-layout-grid-gap-md: 24px;
  --lufa-core-layout-grid-gap-lg: 32px;

  --lufa-core-layout-header-height: 56px;
  --lufa-core-layout-header-height-md: 64px;
  --lufa-core-layout-header-height-lg: 64px;

  --lufa-core-layout-modal-padding: 24px;
  --lufa-core-layout-modal-padding-md: 32px;
  --lufa-core-layout-modal-padding-lg: 40px;

  /* ========================================
     CORE - Layout (Fluid Tokens)
     ======================================== */
  --lufa-core-layout-section-gap-fluid: clamp(48px, 8vw, 96px);
  --lufa-core-layout-hero-padding-fluid: clamp(32px, 6vw, 80px);
  --lufa-core-layout-container-gutter-fluid: clamp(16px, 4vw, 48px);
  --lufa-core-layout-page-margin-fluid: clamp(16px, 3vw, 32px);

  /* ========================================
     CORE - Layout (Containers)
     ======================================== */
  --lufa-core-layout-container-sm: 640px;
  --lufa-core-layout-container-md: 768px;
  --lufa-core-layout-container-lg: 1024px;
  --lufa-core-layout-container-xl: 1280px;
  --lufa-core-layout-container-2xl: 1536px;

  /* ========================================
     CORE - Layout (Grid)
     ======================================== */
  --lufa-core-layout-grid-columns: 12;
  --lufa-core-layout-grid-gap-tight: 8px;
  --lufa-core-layout-grid-gap-default: 16px;
  --lufa-core-layout-grid-gap-comfortable: 24px;
  --lufa-core-layout-grid-gap-spacious: 32px;
  --lufa-core-layout-grid-min-column-width: 280px;

  /* ========================================
     DEPRECATED (Backwards Compatibility)
     ======================================== */
  --lufa-core-layout-page-padding-mobile: 16px; /* Use page-padding (base) */
  --lufa-core-layout-section-gap-mobile: 48px; /* Use section-gap (base) */
  --lufa-core-layout-container-max-width: 1280px; /* Use container-xl */
}

/* ========================================
   RESPONSIVE OVERRIDES
   ======================================== */

/* Tablet and up (768px+) */
@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-core-layout-page-padding-md);
    --lufa-core-layout-section-gap: var(--lufa-core-layout-section-gap-md);
    --lufa-core-layout-container-gutter: var(--lufa-core-layout-container-gutter-md);
    --lufa-core-layout-grid-gap: var(--lufa-core-layout-grid-gap-md);
    --lufa-core-layout-header-height: var(--lufa-core-layout-header-height-md);
    --lufa-core-layout-modal-padding: var(--lufa-core-layout-modal-padding-md);
  }
}

/* Desktop and up (1024px+) */
@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-core-layout-page-padding-lg);
    --lufa-core-layout-section-gap: var(--lufa-core-layout-section-gap-lg);
    --lufa-core-layout-container-gutter: var(--lufa-core-layout-container-gutter-lg);
    --lufa-core-layout-grid-gap: var(--lufa-core-layout-grid-gap-lg);
    --lufa-core-layout-header-height: var(--lufa-core-layout-header-height-lg);
    --lufa-core-layout-modal-padding: var(--lufa-core-layout-modal-padding-lg);
  }
}
```

---

## Performance Impact

### CSS File Size

**Current State:** ~61.84 KB (total CSS bundle including components)  
**Token CSS:** ~45 KB (estimated)

**Additions:**

- 6 breakpoint tokens × 50 bytes = ~300 bytes
- 8 height tokens × 50 bytes = ~400 bytes
- 18 responsive variants × 60 bytes = ~1,080 bytes
- 4 fluid tokens × 80 bytes = ~320 bytes
- 6 grid tokens × 50 bytes = ~300 bytes
- 5 container tokens × 50 bytes = ~250 bytes
- 2 media query blocks × 300 bytes = ~600 bytes
- Deprecated tokens × 60 bytes = ~180 bytes

**Total Addition:** ~3,430 bytes (~3.4 KB)

**New Total:** ~48.4 KB tokens + ~13.84 KB components = **~62.24 KB** (+0.4 KB, +0.65%)

**Assessment:** ✅ **Well within budget** - Current limit is 70 KB, new total is 62.24 KB, leaving ~7.76 KB headroom.

### Build Time Impact

**Current Build Time:** ~2-3 seconds

**Additional Processing:**

- 47 new tokens to process
- Responsive token transformation
- Media query generation

**Estimated New Build Time:** ~3-4 seconds (+0.5-1 sec, +20-33%)

**Assessment:** ✅ **Acceptable** - Build still fast, under 5 seconds.

### Runtime Performance

**No impact:**

- All tokens are CSS variables (no JavaScript runtime cost)
- Media queries are native CSS (highly optimized)
- No algorithmic calculations at runtime
- `clamp()` is native CSS (no polyfill needed)

---

## Migration Strategy

### Phase 1: Primitive Layer (Sprint 1 - Days 1-2)

**Day 1:**

- [ ] Create `primitives/breakpoint/scale.json` (6 tokens)
- [ ] Create `primitives/height/scale.json` (8 tokens)
- [ ] Run `npm run tokens:build`
- [ ] Verify CSS output

**Day 2:**

- [ ] Write unit tests for new primitives
- [ ] Test token resolution
- [ ] Check CSS variable output

### Phase 2: Core Layer (Sprint 1 - Days 3-4)

**Day 3:**

- [ ] Add responsive variants to `core/layout/spacing.json` (18 tokens)
- [ ] Create `core/layout/grid.json` (6 tokens)
- [ ] Create `core/layout/containers.json` (5 tokens)

**Day 4:**

- [ ] Add fluid tokens to `core/layout/spacing.json` (4 tokens)
- [ ] Deprecate old mobile tokens
- [ ] Run build, verify CSS with media queries

### Phase 3: Component Updates (Sprint 2 - Days 5-6)

**Day 5:**

- [ ] Fix Box component spacing-none bug
- [ ] Update Storybook breakpoints
- [ ] Update button height tokens

**Day 6:**

- [ ] Test all component updates
- [ ] Visual regression testing
- [ ] Cross-browser testing

### Phase 4: Build System (Sprint 2 - Day 7)

**Day 7:**

- [ ] Implement responsive token transform
- [ ] Implement CSS media query format
- [ ] Configure Style Dictionary
- [ ] Test build output

### Phase 5: Documentation & Testing (Sprint 3 - Days 8-9)

**Day 8:**

- [ ] Write breakpoint usage guide
- [ ] Write responsive spacing guide
- [ ] Write grid system documentation
- [ ] Write migration guide

**Day 9:**

- [ ] Final QA pass
- [ ] Performance testing
- [ ] Accessibility validation
- [ ] Prepare release notes

**Total:** **9 days** (36-40 hours)

---

## Testing Requirements

### Unit Tests

```typescript
// breakpoint-tokens.test.ts
describe('Breakpoint Tokens', () => {
  it('should have 6 breakpoint tokens', () => {
    expect(tokens.primitive.breakpoint).toHaveProperty('xs');
    expect(tokens.primitive.breakpoint).toHaveProperty('sm');
    expect(tokens.primitive.breakpoint).toHaveProperty('md');
    expect(tokens.primitive.breakpoint).toHaveProperty('lg');
    expect(tokens.primitive.breakpoint).toHaveProperty('xl');
    expect(tokens.primitive.breakpoint).toHaveProperty('2xl');
  });

  it('should have correct pixel values', () => {
    expect(tokens.primitive.breakpoint.xs).toBe('320px');
    expect(tokens.primitive.breakpoint.sm).toBe('640px');
    expect(tokens.primitive.breakpoint.md).toBe('768px');
    expect(tokens.primitive.breakpoint.lg).toBe('1024px');
    expect(tokens.primitive.breakpoint.xl).toBe('1280px');
    expect(tokens.primitive.breakpoint['2xl']).toBe('1536px');
  });
});

// height-tokens.test.ts
describe('Height Tokens', () => {
  it('should have 8 height tokens', () => {
    expect(Object.keys(tokens.primitive.height)).toHaveLength(8);
  });

  it('should have correct pixel values', () => {
    expect(tokens.primitive.height['32']).toBe('32px');
    expect(tokens.primitive.height['40']).toBe('40px');
    expect(tokens.primitive.height['48']).toBe('48px');
  });
});

// responsive-tokens.test.ts
describe('Responsive Tokens', () => {
  it('should generate base + variant tokens', () => {
    expect(tokens.core.layout['page-padding']).toBe('16px');
    expect(tokens.core.layout['page-padding-md']).toBe('24px');
    expect(tokens.core.layout['page-padding-lg']).toBe('32px');
  });

  it('should generate media query overrides', () => {
    const css = getGeneratedCSS();
    expect(css).toContain('@media (min-width: 768px)');
    expect(css).toContain('@media (min-width: 1024px)');
  });
});

// box-component.test.ts
describe('Box Component - Spacing None Fix', () => {
  it('should apply 0px when padding="none"', () => {
    render(<Box padding="none" data-testid="box" />);
    const box = screen.getByTestId('box');
    const styles = getComputedStyle(box);
    expect(styles.padding).toBe('0px');
  });

  it('should apply 4px when padding="tight"', () => {
    render(<Box padding="tight" data-testid="box" />);
    const box = screen.getByTestId('box');
    const styles = getComputedStyle(box);
    expect(styles.padding).toBe('4px');
  });
});
```

### Visual Regression Tests

**Storybook Chromatic:**

- Capture all breakpoint sizes
- Capture Box component spacing variants
- Capture responsive layout examples
- Capture grid system examples

### Integration Tests

- Test Storybook viewport switching
- Test responsive token application in components
- Test grid layouts with new gap tokens
- Test container max-widths at different breakpoints

### Manual Testing Checklist

- [ ] Verify breakpoints in Storybook viewports
- [ ] Test Box component padding/margin="none"
- [ ] Test responsive spacing in layout components
- [ ] Test fluid spacing tokens scale smoothly
- [ ] Test grid gap tokens in grid layouts
- [ ] Verify all breakpoints in Chrome DevTools
- [ ] Test in Safari, Firefox, Edge
- [ ] Test on physical mobile/tablet devices

---

## Rollout Plan

### Version Strategy

**Target Version:** v0.8.0  
**Breaking Changes:** 1 (Box spacing-none fix - bug fix breaking change)  
**Deprecations:** 3 tokens (page-padding-mobile, section-gap-mobile, container-max-width)

### Release Phases

#### Phase 1: Alpha Release (v0.8.0-alpha.1)

- Internal testing
- Design team review
- Storybook preview deployment
- Duration: 3-5 days

#### Phase 2: Beta Release (v0.8.0-beta.1)

- External beta testing
- Collect feedback
- Fix critical bugs
- Duration: 1 week

#### Phase 3: Release Candidate (v0.8.0-rc.1)

- Final testing
- Documentation finalization
- Migration guide complete
- Duration: 2-3 days

#### Phase 4: Stable Release (v0.8.0)

- Public release
- Announcement
- npm publish
- Update documentation site

### Backwards Compatibility

**Guaranteed:**

- All existing spacing tokens work
- All existing layout tokens work
- Deprecated tokens still function (with console warnings)

**Breaking Changes:**

- Box component `padding="none"` / `margin="none"` now 0px (was 4px)
- Storybook "small" breakpoint changes from 576px to 640px

**Migration Path:**

- Upgrade to v0.8.0 immediately (no code changes required for most apps)
- Replace deprecated tokens at your convenience (removal in v1.0.0)
- Audit Box usage with `padding="none"` (see migration guide)

---

## Success Criteria

### Must-Have (Launch Blockers)

- [ ] All 47 new tokens created and tested
- [ ] Box spacing-none bug fixed
- [ ] Storybook breakpoints integrated with tokens
- [ ] Responsive tokens generate correct media queries
- [ ] CSS file size under 70 KB
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Migration guide published

### Nice-to-Have (Post-Launch)

- [ ] Grid system component/utilities
- [ ] Container component
- [ ] Automated responsive spacing utilities
- [ ] More fluid token options

### Metrics for Success

| Metric                 | Baseline | Target | Actual |
| ---------------------- | -------- | ------ | ------ |
| Breakpoint Tokens      | 0        | 6      | TBD    |
| Responsive Variants    | 2        | 18     | TBD    |
| Grid System Tokens     | 0        | 6      | TBD    |
| Height Tokens          | 0        | 8      | TBD    |
| CSS File Size          | 61.84 KB | <65 KB | TBD    |
| Build Time             | 2-3 sec  | <5 sec | TBD    |
| spacing-none Bug Fixed | ❌       | ✅     | TBD    |
| Storybook Integration  | ❌       | ✅     | TBD    |
| Documentation Coverage | ~85%     | 100%   | TBD    |

---

**End of Technical Specification**

**Approved By:** [Pending]  
**Implementation Start:** Sprint 1, Phase 2  
**Estimated Completion:** 9-10 days  
**Review Date:** End of Sprint 3
