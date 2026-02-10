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

## 4. Implementation Guidelines

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
```

### Theme-Specific Considerations

Some themes require special shadow treatments to match their visual identity. Here are examples:

#### Matrix Theme (Neon Green)

Matrix uses neon green glow effects instead of traditional shadows:

```css
/* Matrix theme overrides (in matrix theme CSS file) */
[data-color-theme='matrix'] {
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
[data-color-theme='cyberpunk'] {
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

## 5. Migration from Hardcoded Values

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
```

### Benefits

- ✅ **Consistency**: All transparency values follow standard scale
- ✅ **Maintainability**: Change base colors without touching every file
- ✅ **Theme Support**: Automatically adapts to different themes
- ✅ **Mode Awareness**: Shadows and overlays adjust for light/dark modes
- ✅ **Readability**: Semantic names make code self-documenting

---

## 6. Validation and Testing

### Checklist for New Themes

When creating or refactoring a theme, ensure:

- [ ] All alpha opacity levels (3, 5, 8, 10, 15, 20, 30, 40, 50) are defined
- [ ] All shadow sizes (xs, sm, md, lg, xl) are defined
- [ ] Shadow color is mode-aware (different values for light/dark/high-contrast)
- [ ] Overlay tokens are defined (light, dark, backdrop variants)
- [ ] RGB color values are available for alpha token calculations
- [ ] All tokens follow naming conventions exactly
- [ ] Tokens work correctly in all 3 modes (light, dark, high-contrast)

### Testing Approach

1. **Visual Regression**: Compare before/after screenshots for each theme and mode
2. **Token Usage**: Search codebase for hardcoded rgba/shadow values
3. **Mode Switching**: Test all 3 modes to verify token adaptations
4. **Theme Switching**: Verify tokens work across all 10 themes
5. **Accessibility**: Ensure contrast ratios remain compliant

---

## 7. Reference Examples

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

---

## 8. Next Steps

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
