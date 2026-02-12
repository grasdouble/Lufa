# Token Naming Conventions

**Version**: 1.0  
**Last Updated**: 2026-02-10  
**Status**: Official Standard

---

## Overview

This document defines the standardized naming patterns for design tokens used across all Lufa Design System themes. These conventions ensure consistency, maintainability, and clarity when working with:

- **Alpha tokens**: Transparency and semi-transparent effects
- **Shadow tokens**: Elevation and visual depth
- **Overlay tokens**: Layering and backdrop effects
- **Glow tokens**: Luminescence and neon effects (optional)

---

## 1. Alpha Token Convention

### Pattern

```
--lufa-alpha-{color}-{opacity}
```

### Purpose

Alpha tokens provide standardized transparency values for colors, enabling consistent semi-transparent effects across light, dark, and high-contrast modes.

### Components

- **`{color}`**: The base color name (e.g., `primary`, `neutral`, `surface`, `danger`)
- **`{opacity}`**: The opacity percentage without decimal (e.g., `3`, `5`, `10`, `50`)

### Standardized Opacity Values

| Value | Percentage | Decimal | Use Case                                  |
| ----- | ---------- | ------- | ----------------------------------------- |
| `3`   | 3%         | 0.03    | Extremely subtle overlays, hover states   |
| `5`   | 5%         | 0.05    | Subtle background tints, disabled states  |
| `8`   | 8%         | 0.08    | Light hover effects, dividers             |
| `10`  | 10%        | 0.10    | Standard hover states, focus rings        |
| `15`  | 15%        | 0.15    | Moderate overlays, active states          |
| `20`  | 20%        | 0.20    | Stronger overlays, selected states        |
| `30`  | 30%        | 0.30    | Prominent overlays, disabled backgrounds  |
| `40`  | 40%        | 0.40    | Strong overlays, modal backdrops          |
| `50`  | 50%        | 0.50    | Half-transparent overlays, loading states |

### RGB Variable Prerequisite

⚠️ **Important**: Alpha tokens require RGB color variables to be defined first. Each base color must have a corresponding RGB variable:

```css
/* RGB variables (defined in base theme files - see ETR-002) */
--lufa-primary-rgb: 59, 130, 246; /* Example: Blue */
--lufa-neutral-rgb: 100, 116, 139; /* Example: Slate */
--lufa-danger-rgb: 239, 68, 68; /* Example: Red */
--lufa-success-rgb: 34, 197, 94; /* Example: Green */
--lufa-warning-rgb: 251, 146, 60; /* Example: Orange */
```

These RGB variables will be created as part of the token templates in Story ETR-002.

### Examples

```css
/* Alpha tokens for primary color */
--lufa-alpha-primary-3: rgba(var(--lufa-primary-rgb), 0.03);
--lufa-alpha-primary-5: rgba(var(--lufa-primary-rgb), 0.05);
--lufa-alpha-primary-10: rgba(var(--lufa-primary-rgb), 0.1);
--lufa-alpha-primary-20: rgba(var(--lufa-primary-rgb), 0.2);
--lufa-alpha-primary-50: rgba(var(--lufa-primary-rgb), 0.5);

/* Alpha tokens for neutral colors */
--lufa-alpha-neutral-5: rgba(var(--lufa-neutral-rgb), 0.05);
--lufa-alpha-neutral-10: rgba(var(--lufa-neutral-rgb), 0.1);
--lufa-alpha-neutral-30: rgba(var(--lufa-neutral-rgb), 0.3);

/* Alpha tokens for semantic colors */
--lufa-alpha-danger-10: rgba(var(--lufa-danger-rgb), 0.1);
--lufa-alpha-success-10: rgba(var(--lufa-success-rgb), 0.1);
--lufa-alpha-warning-15: rgba(var(--lufa-warning-rgb), 0.15);
```

### Usage Guidelines

1. **Always use standardized opacity values** - Do not create custom opacity levels
2. **Reference base color RGB values** - Use `rgba(var(--lufa-color-rgb), opacity)` pattern
3. **Mode-aware implementation** - Ensure alpha tokens work in light, dark, and high-contrast modes
4. **Semantic naming** - Use color purpose (primary, danger) rather than color name (blue, red)

### Common Use Cases

```css
/* Hover state on button */
.button:hover {
  background-color: var(--lufa-alpha-primary-10);
}

/* Disabled input field */
.input:disabled {
  background-color: var(--lufa-alpha-neutral-5);
  color: var(--lufa-alpha-neutral-40);
}

/* Selected item in list */
.list-item[aria-selected='true'] {
  background-color: var(--lufa-alpha-primary-20);
}

/* Focus ring */
.input:focus {
  box-shadow: 0 0 0 3px var(--lufa-alpha-primary-30);
}
```

---

## 2. Shadow Token Convention

### Pattern

```
--lufa-shadow-{size}
```

### Purpose

Shadow tokens provide standardized elevation effects through consistent shadow definitions, creating visual depth hierarchy in the UI.

### Components

- **`{size}`**: The shadow size/elevation level (e.g., `xs`, `sm`, `md`, `lg`, `xl`)

### Standardized Shadow Sizes

| Size | Elevation Level | Typical Use Case                          |
| ---- | --------------- | ----------------------------------------- |
| `xs` | Extra Small     | Subtle borders, slight depth on cards     |
| `sm` | Small           | Buttons, input fields, small cards        |
| `md` | Medium          | Cards, panels, dropdowns                  |
| `lg` | Large           | Modals, drawers, overlays                 |
| `xl` | Extra Large     | Major overlays, dialogs, prominent panels |

### Shadow Value Definitions

```css
/* Shadow color variable (mode-aware) */
--lufa-shadow-color: rgba(0, 0, 0, 0.1);

/* Shadow tokens */
--lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
--lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
--lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
--lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
--lufa-shadow-xl: 0 12px 24px var(--lufa-shadow-color);
```

### Mode-Aware Shadow Colors

Shadow colors should adapt based on the color mode for optimal visibility:

```css
/* Light mode - subtle shadows */
[data-mode='light'] {
  --lufa-shadow-color: rgba(0, 0, 0, 0.1);
}

/* Dark mode - stronger shadows for depth */
[data-mode='dark'] {
  --lufa-shadow-color: rgba(0, 0, 0, 0.5);
}

/* High contrast mode - maximum shadow visibility */
[data-mode='high-contrast'] {
  --lufa-shadow-color: rgba(0, 0, 0, 0.8);
}
```

### Examples

```css
/* Card with medium shadow */
.card {
  box-shadow: var(--lufa-shadow-md);
}

/* Button with small shadow */
.button {
  box-shadow: var(--lufa-shadow-sm);
}

/* Modal with large shadow */
.modal {
  box-shadow: var(--lufa-shadow-lg);
}

/* Dropdown menu with medium shadow */
.dropdown {
  box-shadow: var(--lufa-shadow-md);
}
```

### Usage Guidelines

1. **Use shadows for elevation hierarchy** - Larger shadows = higher elevation
2. **Always use shadow tokens** - Never hardcode shadow values
3. **Consider mode** - Shadow visibility changes between light/dark modes
4. **Avoid excessive shadows** - Use sparingly for maximum effect
5. **Combine with borders when needed** - In high-contrast mode, consider adding borders

### Elevation Scale

```
xs: 0-2px   → Surface level (cards, inputs)
sm: 2-4px   → Raised elements (buttons)
md: 4-8px   → Floating elements (dropdowns, tooltips)
lg: 8-16px  → Overlays (modals, drawers)
xl: 12-24px → Major overlays (dialogs)
```

---

## 3. Overlay Token Convention

### Pattern

```
--lufa-overlay-{tone}-{intensity}
```

### Purpose

Overlay tokens provide standardized semi-transparent layers for creating backdrops, scrim effects, and visual emphasis on content layers.

### Components

- **`{tone}`**: The overlay color tone (`light`, `dark`)
- **`{intensity}`**: Optional intensity level (`subtle`, `default`, `strong`)

### Standardized Overlay Definitions

```css
/* Light overlays (for dark backgrounds) */
--lufa-overlay-light: rgba(255, 255, 255, 0.1);
--lufa-overlay-light-subtle: rgba(255, 255, 255, 0.05);
--lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);

/* Dark overlays (for light backgrounds) */
--lufa-overlay-dark: rgba(0, 0, 0, 0.1);
--lufa-overlay-dark-subtle: rgba(0, 0, 0, 0.05);
--lufa-overlay-dark-strong: rgba(0, 0, 0, 0.3);

/* Modal backdrop overlay */
--lufa-overlay-backdrop: rgba(0, 0, 0, 0.5);
--lufa-overlay-backdrop-light: rgba(0, 0, 0, 0.3);
--lufa-overlay-backdrop-strong: rgba(0, 0, 0, 0.7);
```

### Examples

```css
/* Modal backdrop */
.modal-backdrop {
  background-color: var(--lufa-overlay-backdrop);
}

/* Loading overlay on content */
.loading-overlay {
  background-color: var(--lufa-overlay-light-subtle);
}

/* Hover overlay on image */
.image-card:hover::after {
  content: '';
  background-color: var(--lufa-overlay-dark);
}

/* Disabled state overlay */
.disabled-content::after {
  content: '';
  background-color: var(--lufa-overlay-light-strong);
}
```

### Usage Guidelines

1. **Choose tone based on background** - Light overlays on dark backgrounds, dark overlays on light backgrounds
2. **Use subtle for hover states** - Reserve strong intensities for disabled/loading states
3. **Backdrop overlays for modals** - Use `overlay-backdrop` for modal backgrounds
4. **Mode-aware adjustment** - Consider inverting overlays in dark mode
5. **Accessibility** - Ensure sufficient contrast with content underneath

### Intensity Level Decision Guide

| Intensity               | Opacity | When to Use                                     | Example Use Cases                                            |
| ----------------------- | ------- | ----------------------------------------------- | ------------------------------------------------------------ |
| **subtle**              | 5%      | Extremely light feedback, barely visible        | Hover state on already-colored surface, subtle disabled hint |
| **default** (no suffix) | 10%     | Standard interactions, visible but not dominant | Image hover effect, selected item tint, light scrim          |
| **strong**              | 20-30%  | Prominent states, clear visual blocking         | Disabled content overlay, loading state, strong emphasis     |
| **backdrop**            | 50%+    | Modal backgrounds, focus isolation              | Modal backdrop, drawer overlay, dialog scrim                 |

**Decision Flow**:

1. **Need to block interaction?** → Use `backdrop` or `strong`
2. **Need subtle visual feedback?** → Use `subtle` or default
3. **Need to show state change?** → Use default or `strong`
4. **Background is dark?** → Use `light` variants
5. **Background is light?** → Use `dark` variants

### Common Use Cases

| Use Case           | Token                    | Rationale                               |
| ------------------ | ------------------------ | --------------------------------------- |
| Modal backdrop     | `overlay-backdrop`       | Standard 50% opacity for focus          |
| Image hover effect | `overlay-dark`           | 10% dark tint for interaction           |
| Loading state      | `overlay-light-subtle`   | 5% light overlay to indicate processing |
| Disabled content   | `overlay-light-strong`   | 20% overlay to show unavailability      |
| Dropdown scrim     | `overlay-backdrop-light` | 30% overlay for lighter emphasis        |

---

## 4. Glow Token Convention

### Pattern

```
--lufa-glow-{type}-{intensity}
--lufa-glow-color
--lufa-glow-color-secondary
```

### Purpose

Glow tokens provide standardized luminescence effects for themes requiring neon, cyber, or other glowing aesthetics. Unlike shadows which create depth perception through darkness, glows create luminescence through colored light emission.

**IMPORTANT**: Glow tokens are **OPTIONAL** and should only be used in themes that specifically require luminescent effects (e.g., Cyberpunk, Matrix, neon-style themes). Traditional themes (e.g., Steampunk, Forest, Ocean) do not need glow tokens.

### Components

- **`{type}`**: The glow application type (e.g., `box`, `text`, `inset`)
- **`{intensity}`**: The glow strength level (e.g., `subtle`, default, `strong`, `intense`)

### When to Use Glow Tokens

Ask yourself: **"Does my theme need luminescence effects?"**

✅ **USE glow tokens when:**

- Theme has neon/cyber aesthetic (Cyberpunk, Matrix)
- UI elements should appear to emit light
- Multiple colored glow layers are needed
- Theme requires futuristic/digital atmosphere

❌ **SKIP glow tokens when:**

- Theme uses natural/traditional aesthetics
- Only depth/elevation is needed (use shadow tokens instead)
- Theme doesn't feature glowing elements

### Glow vs Shadow: Key Differences

| Aspect            | Shadow Tokens                       | Glow Tokens                                    |
| ----------------- | ----------------------------------- | ---------------------------------------------- |
| **Purpose**       | Create depth and elevation          | Create luminescence and light emission         |
| **Visual Effect** | Dark overlay below elements         | Colored light emanating from elements          |
| **Color**         | Usually black/gray with opacity     | Theme-specific colors (magenta, cyan, green)   |
| **Direction**     | Offset below element (y-axis)       | Radiates equally in all directions (no offset) |
| **Usage**         | Universal - all themes need shadows | Optional - only cyber/neon themes              |
| **Example**       | `0 4px 8px rgba(0,0,0,0.1)`         | `0 0 20px rgba(255,0,255,0.3)`                 |

### Standardized Glow Types

#### Box Glow Tokens

For borders, cards, containers, interactive elements:

```css
--lufa-glow-box-subtle: 0 0 10px var(--lufa-glow-color), 0 0 20px var(--lufa-glow-color-secondary);
--lufa-glow-box: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
--lufa-glow-box-strong: 0 0 30px var(--lufa-glow-color), 0 0 50px var(--lufa-glow-color-secondary);
--lufa-glow-box-intense: 0 0 40px var(--lufa-glow-color), 0 0 60px var(--lufa-glow-color-secondary);
```

#### Text Glow Tokens

For headings, links, special text elements:

```css
--lufa-glow-text-subtle: 0 0 5px var(--lufa-glow-color);
--lufa-glow-text: 0 0 10px var(--lufa-glow-color);
--lufa-glow-text-strong: 0 0 15px var(--lufa-glow-color), 0 0 25px var(--lufa-glow-color-secondary);
--lufa-glow-text-intense: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
```

#### Inset Glow Tokens

For inner glows on containers and panels:

```css
--lufa-glow-inset-subtle: inset 0 0 10px var(--lufa-glow-color);
--lufa-glow-inset: inset 0 0 20px var(--lufa-glow-color);
--lufa-glow-inset-strong: inset 0 0 30px var(--lufa-glow-color);
```

### Glow Color Variables

Glow tokens reference theme-specific color variables that define the luminescence colors:

```css
/* Primary glow color - main luminescence */
--lufa-glow-color: rgba(255, 0, 255, 0.3);

/* Secondary glow color - accent luminescence for dual-layer effects */
--lufa-glow-color-secondary: rgba(0, 255, 255, 0.2);
```

**Rationale for Dual Colors**: Many cyber/neon aesthetics use complementary glow colors for visual depth. For example:

- **Cyberpunk**: Magenta (primary) + Cyan (secondary) for classic neon city aesthetic
- **Matrix**: Neon green (primary) + Darker green (secondary) for digital cascade effect
- **Single-color themes**: Can use same color for both variables with different opacities

### Intensity Level Guide

| Intensity               | Blur Radius | When to Use                            | Example Use Cases                                          |
| ----------------------- | ----------- | -------------------------------------- | ---------------------------------------------------------- |
| **subtle**              | 5-20px      | Minimal glow, hint of luminescence     | Disabled states, subtle hover effects, background elements |
| **default** (no suffix) | 10-40px     | Standard glow for UI elements          | Cards, buttons, borders, navigation items                  |
| **strong**              | 15-50px     | Prominent glow for emphasis            | Active states, focus rings, important elements             |
| **intense**             | 20-60px     | Maximum luminescence for hero elements | Headers, hero sections, CTAs, special features             |

### RGB Variable Prerequisite

⚠️ **Important**: Glow color tokens should be defined as `rgba()` values with opacity to allow fine-tuning of luminescence intensity:

```css
/* Define glow colors with RGB + alpha for intensity control */
--lufa-glow-color: rgba(255, 0, 255, 0.3); /* 30% magenta */
--lufa-glow-color-secondary: rgba(0, 255, 255, 0.2); /* 20% cyan */
```

**Note**: Unlike alpha tokens which reference RGB variables, glow colors are typically defined directly as `rgba()` values since they represent light emission rather than transparency layers.

### Examples

#### Cyberpunk Theme Implementation

```css
[data-theme='cyberpunk'] {
  /* Glow color variables - magenta + cyan neon */
  --lufa-glow-color: rgba(255, 0, 255, 0.3); /* Magenta primary */
  --lufa-glow-color-secondary: rgba(0, 255, 255, 0.2); /* Cyan accent */

  /* Box glows for cards and containers */
  --lufa-glow-box-subtle: 0 0 10px var(--lufa-glow-color), 0 0 20px var(--lufa-glow-color-secondary);
  --lufa-glow-box: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
  --lufa-glow-box-strong: 0 0 30px var(--lufa-glow-color), 0 0 50px var(--lufa-glow-color-secondary);
  --lufa-glow-box-intense: 0 0 40px var(--lufa-glow-color), 0 0 60px var(--lufa-glow-color-secondary);

  /* Text glows for headings and links */
  --lufa-glow-text-subtle: 0 0 5px var(--lufa-glow-color);
  --lufa-glow-text: 0 0 10px var(--lufa-glow-color);
  --lufa-glow-text-strong: 0 0 15px var(--lufa-glow-color), 0 0 25px var(--lufa-glow-color-secondary);
  --lufa-glow-text-intense: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);

  /* Inset glows for containers */
  --lufa-glow-inset-subtle: inset 0 0 10px var(--lufa-glow-color);
  --lufa-glow-inset: inset 0 0 20px var(--lufa-glow-color);
  --lufa-glow-inset-strong: inset 0 0 30px var(--lufa-glow-color);
}
```

#### Matrix Theme Implementation

```css
[data-theme='matrix'] {
  /* Glow color variables - neon green monochrome */
  --lufa-glow-color: rgba(0, 255, 65, 0.4); /* Bright neon green */
  --lufa-glow-color-secondary: rgba(0, 255, 65, 0.2); /* Same green, lower opacity */

  /* Box glows - single color with intensity variation */
  --lufa-glow-box-subtle: 0 0 10px var(--lufa-glow-color), 0 0 20px var(--lufa-glow-color-secondary);
  --lufa-glow-box: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
  --lufa-glow-box-strong: 0 0 30px var(--lufa-glow-color), 0 0 50px var(--lufa-glow-color-secondary);
  --lufa-glow-box-intense: 0 0 40px var(--lufa-glow-color), 0 0 60px var(--lufa-glow-color-secondary);

  /* Text glows - minimal for readability */
  --lufa-glow-text-subtle: 0 0 5px var(--lufa-glow-color);
  --lufa-glow-text: 0 0 10px var(--lufa-glow-color);
  --lufa-glow-text-strong: 0 0 15px var(--lufa-glow-color), 0 0 25px var(--lufa-glow-color-secondary);
  --lufa-glow-text-intense: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);

  /* Inset glows */
  --lufa-glow-inset-subtle: inset 0 0 10px var(--lufa-glow-color);
  --lufa-glow-inset: inset 0 0 20px var(--lufa-glow-color);
  --lufa-glow-inset-strong: inset 0 0 30px var(--lufa-glow-color);
}
```

### Usage Guidelines

1. **Only use in appropriate themes** - Glow tokens are OPTIONAL, not required
2. **Define glow colors first** - Always set `--lufa-glow-color` and `--lufa-glow-color-secondary` before using glow tokens
3. **Use dual-layer for depth** - Most glows use two layers (primary + secondary) for visual richness
4. **Consider performance** - Blur effects can be expensive; use sparingly on many elements
5. **Mode-aware adjustments** - Glow intensity may need adjustment in light vs dark modes
6. **Accessibility** - Ensure glowing text remains readable; avoid excessive blur on text
7. **Combine with shadows** - Glows can coexist with shadow tokens for depth + luminescence

### Common Use Cases

```css
/* Glowing button with neon effect */
.button-primary {
  box-shadow: var(--lufa-glow-box);
  border: 1px solid var(--lufa-glow-color);
}

.button-primary:hover {
  box-shadow: var(--lufa-glow-box-strong);
}

/* Glowing heading text */
.hero-title {
  text-shadow: var(--lufa-glow-text-strong);
  color: #fff;
}

/* Card with inset glow */
.cyber-card {
  box-shadow: var(--lufa-glow-inset-subtle), var(--lufa-glow-box-subtle);
  /* Combines inner and outer glow */
}

/* Navigation link with glow on active */
.nav-link[aria-current='page'] {
  text-shadow: var(--lufa-glow-text);
  border-bottom: 2px solid var(--lufa-glow-color);
}

/* Focus state with intense glow */
.input:focus {
  box-shadow: var(--lufa-glow-box-intense);
  border-color: var(--lufa-glow-color);
}
```

### Combining Glows with Shadows

For themes like Cyberpunk that need BOTH depth and luminescence:

```css
.elevated-glowing-card {
  /* Shadow for depth + elevation */
  box-shadow:
    var(--lufa-shadow-md),
    /* Depth: 0 4px 8px rgba(0,0,0,0.1) */ var(--lufa-glow-box); /* Glow: 0 0 20px magenta + cyan */
}
```

**Rationale**: Shadows create 3D depth perception (element floating above surface), while glows create luminescence (element emitting light). Combining both produces realistic neon objects in physical space.

### Backward Compatibility

Glow tokens are completely opt-in and do not affect existing themes:

- ✅ **Non-glow themes work unchanged** - They simply don't define glow tokens
- ✅ **Component code remains clean** - Only cyber/neon components reference glow tokens
- ✅ **No breaking changes** - Glow tokens are additive to the token system
- ✅ **Graceful degradation** - If glow tokens are undefined, CSS ignores them

### Decision Guide: Shadow vs Glow vs Both

```
Need depth/elevation?
├─ YES + natural theme → Use shadow tokens only
│
├─ YES + cyber theme → Use shadow + glow tokens together
│
└─ NO + cyber theme → Use glow tokens only

Is element emitting light?
├─ YES + needs elevation → Use shadow + glow together
│
├─ YES + flat element → Use glow tokens only
│
└─ NO → Use shadow tokens only (or neither)
```

### Mode-Aware Glow Adjustments

Glow intensity may need adjustment based on color mode:

```css
/* Light mode - reduce glow intensity for visibility */
[data-theme='cyberpunk'][data-mode='light'] {
  --lufa-glow-color: rgba(255, 0, 255, 0.2); /* Reduced from 0.3 */
  --lufa-glow-color-secondary: rgba(0, 255, 255, 0.15); /* Reduced from 0.2 */
}

/* Dark mode - full glow intensity */
[data-theme='cyberpunk'][data-mode='dark'] {
  --lufa-glow-color: rgba(255, 0, 255, 0.4); /* Increased from 0.3 */
  --lufa-glow-color-secondary: rgba(0, 255, 255, 0.3); /* Increased from 0.2 */
}

/* High contrast - minimal glow for accessibility */
[data-theme='cyberpunk'][data-mode='high-contrast'] {
  --lufa-glow-color: rgba(255, 0, 255, 0.5); /* Strong but focused */
  --lufa-glow-color-secondary: rgba(0, 255, 255, 0.4); /* Clear secondary */
}
```

**Rationale**: Glows may be too subtle in light mode or overwhelming in dark mode. Mode-aware adjustments ensure optimal visibility and aesthetic balance across all viewing conditions.

---

## 5. Implementation Guidelines

### Token Structure in Theme Files

All themes should define these token categories in their base CSS files:

```css
/* Example: steampunk-base.css */

/* 1. Alpha Tokens */
--lufa-alpha-primary-5: rgba(var(--lufa-primary-rgb), 0.05);
--lufa-alpha-primary-10: rgba(var(--lufa-primary-rgb), 0.1);
/* ... all opacity levels ... */

/* 2. Shadow Tokens */
--lufa-shadow-color: rgba(0, 0, 0, 0.1);
--lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
--lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
/* ... all shadow sizes ... */

/* 3. Overlay Tokens */
--lufa-overlay-light: rgba(255, 255, 255, 0.1);
--lufa-overlay-dark: rgba(0, 0, 0, 0.1);
--lufa-overlay-backdrop: rgba(0, 0, 0, 0.5);
/* ... all overlay variants ... */

/* 4. Glow Tokens (OPTIONAL - only for cyber/neon themes) */
--lufa-glow-color: rgba(255, 0, 255, 0.3);
--lufa-glow-color-secondary: rgba(0, 255, 255, 0.2);
--lufa-glow-box: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
--lufa-glow-text: 0 0 10px var(--lufa-glow-color);
/* ... all glow variants ... */
```

### Theme-Specific Considerations

Some themes require special shadow treatments to match their visual identity. Here are examples:

#### Matrix Theme (Neon Green)

Matrix uses neon green glow effects instead of traditional shadows:

```css
/* Matrix theme overrides (in matrix theme CSS file) */
[data-theme='matrix'] {
  --lufa-shadow-color: rgba(0, 255, 65, 0.2); /* Neon green glow */
}

/* Example usage: Matrix button with neon glow */
.button {
  box-shadow: var(--lufa-shadow-md); /* Becomes green glow in Matrix theme */
  /* Output: 0 4px 8px rgba(0, 255, 65, 0.2) */
}
```

**Rationale**: Matrix's digital cinematic aesthetic uses glowing neon green effects rather than natural shadows, inspired by the film's iconic visual style. By overriding only the `--lufa-shadow-color` token, all shadow tokens automatically adapt to produce neon green glows while maintaining the same elevation hierarchy.

#### Cyberpunk Theme (Neon Effects)

Cyberpunk enhances shadows with additional neon glow layers:

```css
/* Cyberpunk theme overrides (in cyberpunk theme CSS file) */
[data-theme='cyberpunk'] {
  /* Standard shadow with added glow effect */
  --lufa-shadow-md: 0 4px 12px var(--lufa-shadow-color), 0 0 8px var(--lufa-shadow-color);
  --lufa-shadow-lg: 0 8px 20px var(--lufa-shadow-color), 0 0 16px var(--lufa-shadow-color);
}

/* Example: Cyberpunk card with dual-layer shadow + glow */
.card {
  box-shadow: var(--lufa-shadow-md);
  /* Output: 0 4px 12px rgba(...), 0 0 8px rgba(...) */
  /* Creates both depth AND neon glow */
}
```

**Rationale**: Cyberpunk requires both depth (traditional shadow) AND luminescence (glow). The dual-layer approach combines `offset + blur` for elevation with `no-offset + blur` for glow, creating the signature neon city aesthetic.

### Mode-Specific Adjustments

```css
/* Light Mode */
[data-mode='light'] {
  --lufa-shadow-color: rgba(0, 0, 0, 0.1);
  --lufa-overlay-backdrop: rgba(0, 0, 0, 0.5);
}

/* Dark Mode */
[data-mode='dark'] {
  --lufa-shadow-color: rgba(0, 0, 0, 0.5);
  --lufa-overlay-backdrop: rgba(0, 0, 0, 0.7);
}

/* High Contrast Mode */
[data-mode='high-contrast'] {
  --lufa-shadow-color: rgba(0, 0, 0, 0.8);
  --lufa-overlay-backdrop: rgba(0, 0, 0, 0.9);
}
```

---

## 6. Migration from Hardcoded Values

### Before (Hardcoded)

```css
.button:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.neon-card {
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.3),
    0 0 40px rgba(0, 255, 255, 0.2);
}
```

### After (Token-Based)

```css
.button:hover {
  background-color: var(--lufa-alpha-primary-10);
}

.card {
  box-shadow: var(--lufa-shadow-md);
}

.modal-backdrop {
  background-color: var(--lufa-overlay-backdrop);
}

.neon-card {
  box-shadow: var(--lufa-glow-box);
}
```

### Benefits

- ✅ **Consistency**: All transparency values follow standard scale
- ✅ **Maintainability**: Change base colors without touching every file
- ✅ **Theme Support**: Automatically adapts to different themes
- ✅ **Mode Awareness**: Shadows and overlays adjust for light/dark modes
- ✅ **Readability**: Semantic names make code self-documenting

---

## 7. Validation and Testing

### Checklist for New Themes

When creating or refactoring a theme, ensure:

- [ ] All alpha opacity levels (3, 5, 8, 10, 15, 20, 30, 40, 50) are defined
- [ ] All shadow sizes (xs, sm, md, lg, xl) are defined
- [ ] Shadow color is mode-aware (different values for light/dark/high-contrast)
- [ ] Overlay tokens are defined (light, dark, backdrop variants)
- [ ] RGB color values are available for alpha token calculations
- [ ] Glow tokens are defined IF theme requires luminescence effects (optional)
- [ ] Glow color variables set IF using glow tokens
- [ ] All tokens follow naming conventions exactly
- [ ] Tokens work correctly in all 3 modes (light, dark, high-contrast)

### Testing Approach

1. **Visual Regression**: Compare before/after screenshots for each theme and mode
2. **Token Usage**: Search codebase for hardcoded rgba/shadow values
3. **Mode Switching**: Test all 3 modes to verify token adaptations
4. **Theme Switching**: Verify tokens work across all 10 themes
5. **Accessibility**: Ensure contrast ratios remain compliant

---

## 8. Reference Examples

### Complete Alpha Token Set

```css
/* Primary color alphas */
--lufa-alpha-primary-3: rgba(var(--lufa-primary-rgb), 0.03);
--lufa-alpha-primary-5: rgba(var(--lufa-primary-rgb), 0.05);
--lufa-alpha-primary-8: rgba(var(--lufa-primary-rgb), 0.08);
--lufa-alpha-primary-10: rgba(var(--lufa-primary-rgb), 0.1);
--lufa-alpha-primary-15: rgba(var(--lufa-primary-rgb), 0.15);
--lufa-alpha-primary-20: rgba(var(--lufa-primary-rgb), 0.2);
--lufa-alpha-primary-30: rgba(var(--lufa-primary-rgb), 0.3);
--lufa-alpha-primary-40: rgba(var(--lufa-primary-rgb), 0.4);
--lufa-alpha-primary-50: rgba(var(--lufa-primary-rgb), 0.5);
```

### Complete Shadow Token Set

```css
--lufa-shadow-xs: 0 1px 2px var(--lufa-shadow-color);
--lufa-shadow-sm: 0 2px 4px var(--lufa-shadow-color);
--lufa-shadow-md: 0 4px 8px var(--lufa-shadow-color);
--lufa-shadow-lg: 0 8px 16px var(--lufa-shadow-color);
--lufa-shadow-xl: 0 12px 24px var(--lufa-shadow-color);
```

### Complete Overlay Token Set

```css
--lufa-overlay-light-subtle: rgba(255, 255, 255, 0.05);
--lufa-overlay-light: rgba(255, 255, 255, 0.1);
--lufa-overlay-light-strong: rgba(255, 255, 255, 0.2);

--lufa-overlay-dark-subtle: rgba(0, 0, 0, 0.05);
--lufa-overlay-dark: rgba(0, 0, 0, 0.1);
--lufa-overlay-dark-strong: rgba(0, 0, 0, 0.3);

--lufa-overlay-backdrop-light: rgba(0, 0, 0, 0.3);
--lufa-overlay-backdrop: rgba(0, 0, 0, 0.5);
--lufa-overlay-backdrop-strong: rgba(0, 0, 0, 0.7);
```

### Complete Glow Token Set (Optional - Cyber/Neon Themes Only)

```css
/* Glow color variables */
--lufa-glow-color: rgba(255, 0, 255, 0.3);
--lufa-glow-color-secondary: rgba(0, 255, 255, 0.2);

/* Box glows */
--lufa-glow-box-subtle: 0 0 10px var(--lufa-glow-color), 0 0 20px var(--lufa-glow-color-secondary);
--lufa-glow-box: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
--lufa-glow-box-strong: 0 0 30px var(--lufa-glow-color), 0 0 50px var(--lufa-glow-color-secondary);
--lufa-glow-box-intense: 0 0 40px var(--lufa-glow-color), 0 0 60px var(--lufa-glow-color-secondary);

/* Text glows */
--lufa-glow-text-subtle: 0 0 5px var(--lufa-glow-color);
--lufa-glow-text: 0 0 10px var(--lufa-glow-color);
--lufa-glow-text-strong: 0 0 15px var(--lufa-glow-color), 0 0 25px var(--lufa-glow-color-secondary);
--lufa-glow-text-intense: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);

/* Inset glows */
--lufa-glow-inset-subtle: inset 0 0 10px var(--lufa-glow-color);
--lufa-glow-inset: inset 0 0 20px var(--lufa-glow-color);
--lufa-glow-inset-strong: inset 0 0 30px var(--lufa-glow-color);
```

---

## 9. Next Steps

After establishing these conventions:

1. **Create Token Templates** (Story ETR-002)
2. **Pilot Implementation** with Steampunk theme (Stories ETR-003, ETR-004)
3. **Refactor All Themes** using established patterns (Stories ETR-006 through ETR-017)
4. **Create Validation Script** to ensure compliance (Story ETR-005)

---

## Rationale

### Why These Opacity Values?

The 9-level opacity scale (3, 5, 8, 10, 15, 20, 30, 40, 50) provides:

- **Fine control** at low opacities (3-10) for subtle effects
- **Practical spacing** at mid-range (15-30) for common use cases
- **Strong effects** at high range (40-50) for emphasis
- **Avoids excess** - More levels would create decision paralysis

### Why These Shadow Sizes?

The 5-level shadow scale matches common UI elevation needs:

- **xs/sm**: Surface-level elements (cards, buttons)
- **md**: Floating elements (dropdowns, tooltips)
- **lg/xl**: Overlay elements (modals, drawers)

This provides sufficient granularity without overwhelming developers with choices.

### Why Tone + Intensity for Overlays?

Separating tone (light/dark) from intensity (subtle/default/strong) allows:

- **Clear intent**: Tone indicates which background it's for
- **Flexible application**: Same overlay can be used at different intensities
- **Better naming**: More descriptive than numeric opacity values

---

**Document Status**: ✅ Official  
**Applies To**: All 10 Lufa Design System themes  
**Approved By**: ETR-001 Story Implementation  
**Effective Date**: 2026-02-10
