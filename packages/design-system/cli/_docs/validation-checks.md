# Validation Checks

The CLI performs three validation checks.

## 1. Completeness Check

Ensures all required tokens are defined. The Lufa Design System has **31 theme-aware tokens** that must be defined for each theme mode (light, dark, high-contrast).

**Checks:**

- All 184+ primitive tokens are defined
- All 31 core theme-aware tokens have values for light, dark, and high-contrast modes
- All semantic and component tokens are present

**Example Output:**

```
✓ All 453 required tokens are defined
```

## 2. Contrast Check (WCAG AA)

Validates color contrast ratios to ensure accessibility compliance.

**Standards:**

- **Normal text** (< 18px): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18px or bold ≥ 14px): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

**Checks:**

- Text colors against background colors
- Interactive element colors (buttons, links)
- Border colors against adjacent surfaces
- High-contrast mode has AAA compliance (7:1+)

**Example Output:**

```
✓ All 47 color pairs meet WCAG AA standards
```

## 3. Format Check

Validates CSS syntax and value formats.

**Checks:**

- Valid CSS custom property names (`--lufa-*`)
- Color values: hex (#RGB, #RRGGBB), rgb(), rgba(), hsl(), hsla()
- Dimensions: px, rem, em, %, vh, vw
- Durations: ms, s
- Numbers: unitless values where appropriate
- References: valid var() syntax

**Example Output:**

```
✓ All 453 token values have valid formats
```
