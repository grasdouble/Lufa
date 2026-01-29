---
"@grasdouble/lufa_design-system-tokens": minor
"@grasdouble/lufa_design-system": patch
"@grasdouble/lufa_design-system-storybook": patch
---

# Icon Size Token Alignment & Story Token Compliance

## Design System Tokens (@grasdouble/lufa_design-system-tokens)

**Icon Size Token Alignment**: Updated `component.shared.icon.size-*` tokens to align with Icon component implementation and added missing `xl` size.

### What Changed

| Token | Previous Value | New Value |
|-------|---------------|-----------|
| `component.shared.icon.size-xs` | 12px | 16px |
| `component.shared.icon.size-sm` | 16px | 20px |
| `component.shared.icon.size-md` | 20px | 24px |
| `component.shared.icon.size-lg` | 24px | 32px |
| `component.shared.icon.size-xl` | _(none)_ | 40px ✨ NEW |

### Impact

No breaking changes to component APIs. The Icon component was already using these values (16/20/24/32/40px), so this update aligns the tokens with actual implementation. Visual appearance remains unchanged.

### CSS Variables Updated

```css
--lufa-component-shared-icon-size-xs: 16px; /* was 12px */
--lufa-component-shared-icon-size-sm: 20px; /* was 16px */
--lufa-component-shared-icon-size-md: 24px; /* was 20px */
--lufa-component-shared-icon-size-lg: 32px; /* was 24px */
--lufa-component-shared-icon-size-xl: 40px; /* NEW */
```

## Design System Main (@grasdouble/lufa_design-system)

**Icon Component Token Integration**: Icon component now uses design token CSS variables instead of hardcoded pixel values.

### What Changed

- Updated `icon.utilities.config.cjs` to reference `--lufa-component-shared-icon-size-*` tokens
- Regenerated `Icon.module.css` with token-based classes
- No visual changes - maintains existing size values (16/20/24/32/40px)

### Benefits

- Icon sizes now centrally managed through design tokens
- Easier to maintain and scale
- Consistent with other component configurations

### Affected Components

- Icon component configuration now uses CSS variable references
- Generated `Icon.module.css` uses token-based classes

## Storybook (@grasdouble/lufa_design-system-storybook)

**Story Token Compliance**: All Storybook stories now use design tokens exclusively.

### What Changed

- Replaced 130+ hardcoded color values with `STORY_COLORS` constants across all stories
- Updated stories: Typography, Colors, TokenUsage, Box, Text, Stack, Divider, Icon, Badge, Button
- All colors now properly adapt to theme changes (light/dark/high-contrast)

### Impact

- Stories now demonstrate proper token usage patterns
- Improved theme switching experience
- Better consistency across documentation
