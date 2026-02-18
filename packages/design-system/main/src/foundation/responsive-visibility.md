# Responsive Visibility Pattern

**Pattern Type**: Props-based utility pattern  
**Status**: ✅ IMPLEMENTED  
**Priority**: 🟡 MEDIUM  
**Estimated Effort**: 4-6 hours

---

## Overview

The Responsive Visibility pattern enables developers to control element visibility at different viewport breakpoints using simple props. This is **NOT a standalone component**, but a pattern implemented as props on existing foundation components.

### Key Features

- ✅ **Props-based**: Add `show`/`hide` props to any foundation component
- ✅ **CSS-only**: No JavaScript required (SSR-safe, no hydration mismatch)
- ✅ **Mobile-first**: Uses min-width media queries
- ✅ **Performance-optimized**: Pure CSS solution
- ✅ **Type-safe**: Full TypeScript support

---

## Breakpoint System

Lufa uses a mobile-first breakpoint system based on token definitions:

| Breakpoint | Value  | Range         | Use Case                         |
| ---------- | ------ | ------------- | -------------------------------- |
| `xs`       | 320px  | 320px-639px   | Mobile portrait                  |
| `sm`       | 640px  | 640px-767px   | Mobile landscape                 |
| `md`       | 768px  | 768px-1023px  | Tablet portrait                  |
| `lg`       | 1024px | 1024px-1279px | Tablet landscape, small desktops |
| `xl`       | 1280px | 1280px-1535px | Desktop                          |
| `2xl`      | 1536px | 1536px+       | Large desktop, ultra-wide        |

**Token Reference**: `tokens/src/primitives/breakpoint.json`

---

## API Reference

### Props

All foundation components support the following responsive visibility props:

#### `show`

Control element visibility at different breakpoints.

**Type**: `ResponsiveValue<boolean>` (boolean or responsive object)

**Examples**:

```tsx
// Simple boolean
<Box show={true}>Always visible</Box>
<Box show={false}>Always hidden</Box>

// Responsive object: Show on mobile, hide on desktop
<Box show={{ base: true, md: false }}>
  Mobile only
</Box>

// Responsive object: Hide on mobile, show on desktop
<Box show={{ base: false, md: true }}>
  Desktop only
</Box>
```

#### `hide`

Hide element at different breakpoints (opposite of `show`).

**Type**: `ResponsiveValue<boolean>` (boolean or responsive object)

**Examples**:

```tsx
// Simple boolean
<Box hide={true}>Always hidden</Box>
<Box hide={false}>Always visible</Box>

// Responsive object: Hide on mobile
<Box hide={{ base: true, md: false }}>
  Desktop only
</Box>
```

#### `hideFrom`

Hide element from specified breakpoint and up.

**Type**: `Breakpoint` (`'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`)

**Examples**:

```tsx
// Hidden from md (768px) and up
<Box hideFrom="md">
  Mobile/tablet only
</Box>

// Hidden from lg (1024px) and up
<Box hideFrom="lg">
  Mobile/tablet/small desktop only
</Box>
```

#### `showFrom`

Show element from specified breakpoint and up (hidden below).

**Type**: `Breakpoint` (`'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`)

**Examples**:

```tsx
// Visible only from lg (1024px) and up
<Box showFrom="lg">
  Desktop only
</Box>

// Visible only from md (768px) and up
<Box showFrom="md">
  Tablet and desktop only
</Box>
```

---

## Usage Examples

### Example 1: Responsive Navigation

```tsx
import { Box, Button, Flex } from '@grasdouble/lufa_design-system';

function Navigation() {
  return (
    <>
      {/* Desktop navigation (hidden on mobile) */}
      <Flex hideFrom="base" showFrom="md" gap="default">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/products">Products</a>
        <a href="/contact">Contact</a>
      </Flex>

      {/* Mobile menu button (hidden on desktop) */}
      <Button hideFrom="md" aria-label="Open menu">
        Menu
      </Button>
    </>
  );
}
```

### Example 2: Different Layouts for Mobile vs Desktop

```tsx
import { Box, Stack } from '@grasdouble/lufa_design-system';

function ProductCard() {
  return (
    <>
      {/* Mobile layout: Vertical stack */}
      <Stack hideFrom="md" spacing="compact">
        <img src="product.jpg" alt="Product" />
        <h3>Product Name</h3>
        <p>Description</p>
        <button>Add to Cart</button>
      </Stack>

      {/* Desktop layout: Horizontal flex */}
      <Flex showFrom="md" gap="default" align="center">
        <img src="product.jpg" alt="Product" style={{ width: 200 }} />
        <Box>
          <h3>Product Name</h3>
          <p>Description</p>
          <button>Add to Cart</button>
        </Box>
      </Flex>
    </>
  );
}
```

### Example 3: Progressive Enhancement

```tsx
import { Box, Text } from '@grasdouble/lufa_design-system';

function FeatureList() {
  return (
    <Box>
      {/* Base features (always visible) */}
      <Text>Essential feature 1</Text>
      <Text>Essential feature 2</Text>

      {/* Additional features for tablet+ */}
      <Text showFrom="md">Advanced feature 1</Text>
      <Text showFrom="md">Advanced feature 2</Text>

      {/* Premium features for desktop only */}
      <Text showFrom="lg">Premium feature 1</Text>
      <Text showFrom="lg">Premium feature 2</Text>
    </Box>
  );
}
```

### Example 4: Complex Responsive Visibility

```tsx
import { Box } from '@grasdouble/lufa_design-system';

function Dashboard() {
  return (
    <>
      {/* Visible on mobile and large desktop, hidden on tablet */}
      <Box show={{ base: true, md: false, lg: true }}>Sidebar</Box>

      {/* Visible only on tablet */}
      <Box show={{ base: false, md: true, lg: false }}>Compact view</Box>
    </>
  );
}
```

---

## Best Practices

### ✅ DO

1. **Use `hideFrom`/`showFrom` for simple cases**:

   ```tsx
   // Simple and readable
   <Box hideFrom="md">Mobile only</Box>
   ```

2. **Use CSS-based visibility for performance**:
   - This pattern uses pure CSS (no JavaScript)
   - SSR-safe, no hydration mismatch
   - Better performance than conditional rendering

3. **Use semantic components with visibility props**:

   ```tsx
   <nav hideFrom="md">
     <MobileMenu />
   </nav>
   ```

4. **Combine with responsive spacing**:
   ```tsx
   <Box hideFrom="md" padding={{ base: 'compact', sm: 'default' }}>
     Responsive content
   </Box>
   ```

### ❌ DON'T

1. **Don't mix `show` and `hide` props on same element**:

   ```tsx
   // ❌ Confusing, don't do this
   <Box show={{ base: true }} hide={{ md: true }}>
     Content
   </Box>

   // ✅ Pick one pattern
   <Box show={{ base: true, md: false }}>
     Content
   </Box>
   ```

2. **Don't use for conditional logic** (use conditional rendering instead):

   ```tsx
   // ❌ Wrong tool for the job
   <Box hide={!isLoggedIn}>User profile</Box>;

   // ✅ Use conditional rendering
   {
     isLoggedIn && <UserProfile />;
   }
   ```

3. **Don't overuse responsive visibility**:
   - Prefer single responsive layout over multiple hidden versions
   - Consider using CSS Grid/Flexbox with responsive props instead

4. **Don't hide critical content** (accessibility concern):
   - Screen readers may still announce hidden content
   - Consider semantic HTML and proper ARIA attributes

---

## Migration from Other Systems

### From Chakra UI

Chakra UI uses `<Show>` and `<Hide>` components with `above`/`below` props.

**Chakra UI**:

```tsx
import { Show, Hide } from '@chakra-ui/react';

<Show above="md">
  <DesktopNav />
</Show>

<Hide below="md">
  <MobileMenu />
</Hide>
```

**Lufa Equivalent**:

```tsx
import { Box } from '@grasdouble/lufa_design-system';

<Box showFrom="md">
  <DesktopNav />
</Box>

<Box hideFrom="md">
  <MobileMenu />
</Box>
```

**Key Differences**:

- Lufa uses **props pattern** (not standalone component)
- `showFrom="md"` = Chakra's `above="md"`
- `hideFrom="md"` = Chakra's `below="md"` (Note: inverted logic)

### From Mantine

Mantine uses `hiddenFrom`/`visibleFrom` props directly on components.

**Mantine**:

```tsx
<Box hiddenFrom="md">
  Mobile only
</Box>

<Box visibleFrom="lg">
  Desktop only
</Box>
```

**Lufa Equivalent**:

```tsx
<Box hideFrom="md">
  Mobile only
</Box>

<Box showFrom="lg">
  Desktop only
</Box>
```

**Key Differences**:

- Very similar API!
- Lufa: `hideFrom`/`showFrom`
- Mantine: `hiddenFrom`/`visibleFrom`

---

## Implementation Details

### CSS Architecture

The pattern uses pure CSS utility classes:

```css
/* Simple hide */
.lufa-hide {
  display: none !important;
}

/* Hide from md and up */
@media (min-width: 768px) {
  .lufa-hide-from-md {
    display: none !important;
  }
}

/* Show from md and up */
.lufa-show-from-md {
  display: none !important;
}

@media (min-width: 768px) {
  .lufa-show-from-md {
    display: block !important;
  }
}
```

**CSS File**: `packages/design-system/main/src/css/responsive-visibility.css`

### TypeScript Types

```typescript
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveValue<T> =
  | T
  | {
      base?: T;
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      '2xl'?: T;
    };

export interface ResponsiveVisibilityProps {
  show?: ResponsiveValue<boolean>;
  hide?: ResponsiveValue<boolean>;
  hideFrom?: Breakpoint;
  showFrom?: Breakpoint;
}
```

**Types File**: `packages/design-system/main/src/utils/responsive-visibility.ts`

---

## Component Support

### Currently Implemented

- ✅ **Box** (pilot implementation)

### Planned Rollout

The following components will receive responsive visibility props:

| Component | Priority | Status  |
| --------- | -------- | ------- |
| Stack     | HIGH     | Planned |
| Flex      | HIGH     | Planned |
| Grid      | HIGH     | Planned |
| Container | MEDIUM   | Planned |
| Center    | MEDIUM   | Planned |
| Divider   | LOW      | Planned |
| Text      | MEDIUM   | Planned |
| Heading   | MEDIUM   | Planned |

**Note**: All foundation layout components will eventually support this pattern.

---

## Performance Considerations

### Why CSS-Only?

1. **SSR-Safe**: No hydration mismatch issues
2. **Zero JavaScript**: No runtime performance cost
3. **Smooth Transitions**: CSS handles media query changes efficiently
4. **Browser-Optimized**: Leverages native CSS media queries

### Bundle Size Impact

- **CSS**: ~2KB (minified, uncompressed)
- **TypeScript Utilities**: ~1KB (tree-shakeable)
- **Total**: ~3KB for entire pattern

---

## Accessibility

### Display None vs Visibility Hidden

This pattern uses `display: none` which:

- ✅ Removes element from accessibility tree (screen readers ignore it)
- ✅ Removes element from layout (no space taken)
- ✅ Proper for responsive visibility use cases

**Important**: Don't use for:

- Skip links (use `visually-hidden` utility instead)
- Focus management (element becomes unfocusable)
- Content that should be announced by screen readers

---

## Testing

### Playwright Tests

**Test File**: `packages/design-system/playwright/src/foundation/ResponsiveVisibility.spec.tsx`

Test coverage:

- ✅ Box with `hideFrom` prop at different breakpoints
- ✅ Box with `showFrom` prop at different breakpoints
- ✅ Viewport resize behavior
- ✅ Responsive object syntax (`show={{ base: true, md: false }}`)
- ✅ Accessibility (aria-hidden attribute)

---

## Storybook Examples

**Story File**: `packages/design-system/storybook/src/stories/foundation/Box.stories.tsx`

Stories include:

- Basic show/hide examples
- `hideFrom`/`showFrom` examples
- Responsive object syntax examples
- Real-world use cases (navigation, layouts)
- Viewport resize demonstrations

---

## Related Documentation

- [Box Component](../foundation/Box.md)
- [Breakpoint Tokens](../../tokens/breakpoints.md)
- [ADR-012: Foundation Component Naming & Scope](./_docs/adrs/ADR-012-ACCEPTED-foundation-component-naming-and-scope.md)
- [Foundation Components Research & Roadmap](./_docs/FOUNDATION-COMPONENTS-RESEARCH-AND-ROADMAP.md)

---

## Questions & Answers

### Q: Should I use `show` or `hide`?

**A**: Use whichever is more readable for your use case:

```tsx
// Both are equivalent, choose based on readability
<Box show={{ base: true, md: false }}>Mobile only</Box>
<Box hide={{ base: false, md: true }}>Mobile only</Box>

// hideFrom/showFrom is simpler for single breakpoint
<Box hideFrom="md">Mobile only</Box>
```

### Q: Can I combine `hideFrom` and `showFrom`?

**A**: No, they're mutually exclusive. Pick one:

```tsx
// ❌ Don't do this
<Box hideFrom="sm" showFrom="lg">Confusing</Box>

// ✅ Use responsive object instead
<Box show={{ base: true, sm: false, lg: true }}>Clear</Box>
```

### Q: Does this work with SSR?

**A**: Yes! Pure CSS solution means:

- No hydration mismatch
- Works with Next.js, Remix, Gatsby, etc.
- No JavaScript required

### Q: What about Internet Explorer?

**A**: Not supported. Requires modern CSS:

- Media queries (IE9+)
- CSS custom properties (IE not supported)

---

**Last Updated**: 2026-02-07  
**Implementation Status**: ✅ Pilot complete (Box component)  
**Next Steps**: Rollout to other foundation components
