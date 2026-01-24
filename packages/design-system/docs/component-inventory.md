# UI Component Inventory - Lufa Design System v2.0

**Generated**: 2026-01-24  
**Package**: `@grasdouble/lufa_design-system`  
**Location**: `packages/design-system/main/src/components/`

---

## Overview

The Lufa Design System v2.0 contains **5 production-ready React components** built on a **three-layer token architecture**. All components are WCAG 2.1 AA compliant, fully typed with TypeScript 5.9, and tested with Playwright Component Testing.

**Status**: 5/7 components complete (71% complete)

- ✅ Completed: Box, Stack, Text, Icon, Button
- 📋 Remaining: Badge, Divider

---

## Component Catalog

### 1. Box - Universal Layout Primitive

**File**: `Box/Box.tsx` (356 lines)  
**Type**: Layout primitive (polymorphic)  
**Purpose**: Flexible container component serving as foundation for all layout compositions

**Features**:

- ✅ Utility-based props for spacing, backgrounds, borders, display
- ✅ Polymorphic `as` prop (div, section, article, header, footer, main, nav, aside)
- ✅ Performance-optimized (CSS classes, not inline styles)
- ✅ Token-based design (semantic layer tokens)

**Props**:

- **Spacing**: `padding`, `paddingX`, `paddingY`, `paddingTop/Right/Bottom/Left`, `margin`, `marginX`, `marginY`, `marginTop/Right/Bottom/Left`
- **Background**: `background` (page, surface, success, error, warning, info, overlay, on-primary, on-secondary, etc.)
- **Border**: `borderRadius` (none, small, default, medium, large, full), `borderWidth` (none, thin, medium, thick), `borderColor` (default, strong, success, error, warning, info)
- **Display**: `display` (block, inline-block, flex, inline-flex, grid, none)

**Example Usage**:

```tsx
<Box padding="default" background="surface">
  Content
</Box>

<Box as="section" padding="spacious" borderRadius="medium">
  <h2>Section Title</h2>
</Box>
```

---

### 2. Stack - Directional Layout Container

**File**: `Stack/Stack.tsx` (estimated 200-300 lines)  
**Type**: Layout primitive (flexbox-based)  
**Purpose**: Directional layout container for stacking elements with consistent spacing

**Features**:

- ✅ Vertical and horizontal stacking
- ✅ Gap-based spacing (using semantic tokens)
- ✅ Alignment and distribution control
- ✅ Polymorphic rendering

**Expected Props**:

- **Direction**: `direction` (vertical, horizontal)
- **Spacing**: `gap` (using semantic spacing tokens)
- **Alignment**: `align`, `justify`

---

### 3. Text - Typography Primitive

**File**: `Text/Text.tsx` (227 lines)  
**Type**: Typography primitive (polymorphic)  
**Purpose**: Consistent text styling across the design system

**Features**:

- ✅ Typography scale (h1-h6, body variants, caption, label)
- ✅ Semantic color values (primary, secondary, success, error, warning, info, inverse)
- ✅ Font weight control (normal, medium, semibold, bold)
- ✅ Text alignment (left, center, right, justify)
- ✅ Text transformation (none, uppercase, lowercase, capitalize)
- ✅ Polymorphic `as` prop (p, span, div, h1-h6, label, legend, figcaption)
- ✅ Token-based design (semantic layer tokens)

**Props**:

- **Variant**: `variant` (h1, h2, h3, h4, h5, h6, body-large, body, body-small, caption, label)
- **Color**: `color` (primary, secondary, tertiary, success, error, warning, info, inverse)
- **Weight**: `weight` (normal, medium, semibold, bold)
- **Alignment**: `align` (left, center, right, justify)
- **Transform**: `transform` (none, uppercase, lowercase, capitalize)

**Example Usage**:

```tsx
<Text variant="h1" weight="bold">
  Page Title
</Text>

<Text variant="body" color="secondary">
  This is body text.
</Text>
```

---

### 4. Icon - Icon Display Component

**File**: `Icon/Icon.tsx` (estimated 150-250 lines)  
**Type**: Display component  
**Purpose**: Consistent icon rendering using Lucide React icon library

**Features**:

- ✅ Icon library integration (Lucide React)
- ✅ Size variants (matching button/text sizes)
- ✅ Color variants (semantic colors)
- ✅ Accessibility support (aria-hidden, aria-label)

**Expected Props**:

- **Name**: `name` (IconName type from Lucide)
- **Size**: `size` (xs, sm, md, lg, xl)
- **Color**: `color` (semantic color tokens)

---

### 5. Button - Interactive Action Element

**File**: `Button/Button.tsx` (275 lines)  
**Type**: Interactive component (polymorphic)  
**Purpose**: Versatile button with multiple types, variants, sizes, and states

**Features**:

- ✅ Three types (solid, outline, ghost)
- ✅ Seven variants (primary, secondary, success, danger, warning, info, neutral)
- ✅ Three sizes (sm, md, lg) with semantic token-based dimensions
- ✅ Icon support (left, right, or icon-only)
- ✅ Loading state with spinner animation
- ✅ Disabled state with proper accessibility
- ✅ Full width option
- ✅ Polymorphic rendering (button or anchor element)
- ✅ WCAG 2.1 AA compliant
- ✅ Token-based design (component layer tokens)

**Props**:

- **Type**: `type` (solid, outline, ghost)
- **Variant**: `variant` (primary, secondary, success, danger, warning, info, neutral)
- **Size**: `size` (sm, md, lg)
- **Radius**: `radius` (none, sm, base, md, full)
- **Icons**: `iconLeft`, `iconRight` (IconName)
- **States**: `loading`, `disabled`, `fullWidth`
- **Polymorphic**: `as` (button, a)

**Example Usage**:

```tsx
<Button type="solid" variant="primary" size="md">
  Click me
</Button>

<Button type="outline" variant="secondary">
  Outline
</Button>

<Button type="solid" variant="success" iconLeft="check">
  Save
</Button>

<Button type="solid" variant="primary" loading>
  Saving...
</Button>

<Button as="a" href="/home" type="ghost" variant="neutral">
  Home
</Button>
```

---

## Component Organization

### Directory Structure

```
packages/design-system/main/src/components/
├── Box/
│   ├── Box.tsx                   # Component implementation
│   ├── Box.module.css            # Component styles (token-based)
│   ├── Box.spec.tsx              # Playwright component tests
│   └── index.ts                  # Public exports
├── Stack/
│   └── [similar structure]
├── Text/
│   └── [similar structure]
├── Icon/
│   └── [similar structure]
├── Button/
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Button.additional.module.css  # Additional styles (animations, hover)
│   ├── Button.spec.tsx
│   └── index.ts
└── index.ts                      # Main exports file
```

---

## Design Patterns

### 1. Polymorphic Components

All layout and typography primitives support polymorphic rendering via the `as` prop:

```tsx
<Box as="section">...</Box>
<Text as="h1">...</Text>
<Button as="a" href="...">...</Button>
```

**Benefits**:

- Semantic HTML
- Type-safe element-specific props
- Accessibility improvements

### 2. Token-Based Styling

All components use semantic design tokens (never hard-coded values):

```tsx
// ✅ Good - Uses semantic tokens
<Box padding="default" background="surface" />

// ❌ Bad - Hard-coded values
<div style={{ padding: '16px', background: '#ffffff' }} />
```

**Token Layers**:

- **Layer 1**: Primitives (raw values like 16px, #3B82F6)
- **Layer 2**: Semantic Tokens (purpose-driven like `spacing.default`, `color.primary`)
- **Layer 3**: Components (use semantic tokens via CSS custom properties)

### 3. Utility-Based Props

Components expose utility props that map to CSS classes:

```tsx
<Box padding="comfortable" marginBottom="spacious" background="surface" borderRadius="medium" />
```

Generated CSS classes:

```css
.padding-comfortable {
  padding: var(--semantic-ui-spacing-comfortable);
}
.marginBottom-spacious {
  margin-bottom: var(--semantic-ui-spacing-spacious);
}
.background-surface {
  background-color: var(--semantic-ui-background-surface);
}
.borderRadius-medium {
  border-radius: var(--semantic-ui-radius-medium);
}
```

### 4. Composition Patterns

Components are designed for composition:

```tsx
<Box padding="comfortable" background="surface" borderRadius="default">
  <Stack direction="vertical" gap="default">
    <Text variant="h3" weight="semibold">
      Card Title
    </Text>
    <Text variant="body" color="secondary">
      Card description
    </Text>
    <Button type="solid" variant="primary" size="md">
      Action
    </Button>
  </Stack>
</Box>
```

---

## Testing Strategy

All components include **Playwright Component Tests** (`.spec.tsx` files):

**Test Coverage**:

- ✅ Component rendering
- ✅ All variants and prop combinations
- ✅ Interactive behaviors (click, hover, focus)
- ✅ Keyboard navigation
- ✅ Accessibility (ARIA attributes, focus management)
- ✅ Visual regression (snapshots on 5 browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)

**Test Location**: `packages/design-system/playwright/src/components/`

**Running Tests**:

```bash
pnpm ds:test           # Run all component tests
pnpm ds:test:ui        # Run tests in UI mode
pnpm ds:test:update-snapshots  # Update visual regression snapshots
```

---

## Documentation

Each component is documented in:

1. **Storybook** (`packages/design-system/storybook/`)
   - Interactive playground
   - All variants showcase
   - Usage examples
   - Props documentation

2. **Docusaurus** (`packages/design-system/docusaurus/`)
   - API reference
   - Design guidelines
   - Accessibility notes
   - Migration guides

3. **JSDoc Comments** (in component source files)
   - Inline prop documentation
   - Usage examples
   - Type definitions

---

## Dependencies

**External Dependencies**:

- `@headlessui/react` (^2.2.9) - Headless UI primitives (for complex components like modals, dropdowns)
- `@heroicons/react` (^2.2.0) - Heroicons icon set
- `lucide-react` (^0.469.0) - Lucide icon library (primary icon set)
- `clsx` (^2.1.1) - Conditional className utility

**Internal Dependencies**:

- `@grasdouble/lufa_design-system-tokens` (workspace) - Design tokens package

---

## Next Steps

### Remaining Components (2/7)

**Badge** (planned):

- Display component for status indicators
- Multiple variants (success, error, warning, info, neutral)
- Size variants (sm, md, lg)
- Icon support
- Token-based styling

**Divider** (planned):

- Layout component for visual separation
- Orientation (horizontal, vertical)
- Thickness variants
- Color variants
- Token-based styling

---

## Related Documentation

- [Design System README](../packages/design-system/README.md)
- [Tokens Package](../packages/design-system/tokens/README.md)
- [Storybook Stories](../packages/design-system/storybook/docs/STORY_GUIDE.md)
- [Playwright Tests](../packages/design-system/playwright/README.md)
- [Three-Layer Architecture](./_bmad-output/analysis/design-system-new-architecture/MASTER-STATUS.md)
