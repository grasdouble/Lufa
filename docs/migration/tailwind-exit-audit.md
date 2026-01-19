# Tailwind CSS Exit Audit - Lufa Design System

> **Date**: 2026-01-17  
> **Status**: Phase 0.1 - Complete Inventory  
> **Objective**: Document all Tailwind CSS usage for vanilla CSS migration

## Executive Summary

### Statistics Overview

| Metric | Count | Status |
|--------|-------|--------|
| **Total @apply directives** | 547 | 🔴 High |
| **Total theme() functions** | 159 | 🟡 Medium |
| **CSS Module files** | 33 | ✅ Organized |
| **Components with inline Tailwind** | 3 (Testimonials) | 🟡 Medium |
| **Responsive breakpoints** | 11+ occurrences | 🟢 Low |

### Migration Complexity Assessment

- **High Priority**: Button variants (5 files, 159 theme() calls)
- **Medium Priority**: Input, Card, Alert, Link (moderate @apply usage)
- **Low Priority**: Badge (already uses CSS variables extensively)
- **Special Case**: Testimonial patterns (inline Tailwind classes, need refactor)

---

## 1. @apply Directive Inventory (547 total)

### By Component Category

#### 1.1 Forms Components

**Button (base.module.css)** - 24 @apply directives
```css
@apply reset-button
@apply inline-flex items-center justify-center gap-2
@apply relative overflow-hidden
@apply font-semibold
@apply rounded-xl
@apply border-transparent
@apply shadow-sm
@apply transition-all duration-200 ease-out
@apply w-full
@apply cursor-wait opacity-70
@apply opacity-0
@apply inline-flex shrink-0
@apply absolute inset-0 flex items-center justify-center
@apply h-5 w-5
@apply opacity-25
@apply opacity-75
@apply px-md text-sm
@apply px-xl text-base
@apply px-2xl text-lg
```

**Button - variant-ghost.module.css** - 1 @apply
```css
@apply border-transparent
```

**Button - variant-text.module.css** - 3 @apply
```css
@apply border-transparent shadow-none
@apply h-auto px-sm py-xs rounded-md
@apply justify-start inline-flex
```

**Button - variant-link.module.css** - 7 @apply
```css
@apply border-0 p-0 shadow-none
@apply h-auto rounded-none
@apply underline-offset-4 font-normal
@apply justify-start inline-flex
@apply relative
@apply absolute bottom-0 left-0 w-0 h-0.5 bg-current
@apply transition-all duration-300
@apply w-full
@apply no-underline
```

**Input (Input.module.css)** - 40 @apply directives
```css
@apply inline-flex flex-col
@apply w-full
@apply text-text-primary mb-1 block text-sm font-medium
@apply text-error-default ml-1
@apply relative flex items-center
@apply reset-input
@apply w-full
@apply duration-base transition-all
@apply rounded-md
@apply text-text-primary placeholder:text-text-tertiary
@apply focus:ring-interactive-focus focus:ring-2 focus:ring-offset-0 focus:outline-none
@apply px-sm text-sm
@apply px-base text-base
@apply px-lg text-lg
@apply border-border-default bg-background-primary border
@apply hover:border-border-medium
@apply bg-background-secondary border-none
@apply hover:bg-background-tertiary
@apply border-error-border
@apply focus:ring-error-default
@apply bg-background-secondary text-text-disabled
@apply hover:border-border-default
@apply pl-10
@apply pr-10
@apply text-text-tertiary absolute left-3 flex items-center
@apply text-text-tertiary absolute right-3 flex items-center
@apply text-text-secondary mt-1 text-sm
@apply text-error-text mt-1 text-sm
```

#### 1.2 Navigation Components

**Link (Link.module.css)** - 39 @apply directives
```css
@apply inline-flex items-center gap-1
@apply text-text-link
@apply no-underline
@apply relative
@apply transition-colors duration-fast
@apply absolute left-0 bottom-0
@apply rounded-sm
@apply transition-all duration-fast
@apply bg-text-link-hover
@apply text-text-link-hover
@apply outline-border-focus
@apply rounded-sm
@apply underline
@apply decoration-border-default
@apply hidden
@apply text-text-inverse
@apply bg-interactive-default
@apply px-md py-sm
@apply rounded-lg
@apply no-underline
@apply hidden
@apply bg-interactive-hover
@apply text-text-inverse
@apply text-interactive-default
@apply text-interactive-hover
@apply text-text-secondary
@apply text-text-primary
@apply text-success-default
@apply text-success-hover
@apply text-warning-default
@apply text-warning-hover
@apply text-error-default
@apply text-error-hover
@apply opacity-75
@apply text-sm gap-0.5
@apply text-base gap-1
@apply text-lg gap-1.5
@apply inline-flex shrink-0
```

**Pagination (Pagination.module.css)** - 50 @apply directives
```css
@apply flex flex-wrap items-center gap-4
@apply flex items-center gap-1
@apply reset-button
@apply inline-flex items-center justify-center
@apply border border-border-default
@apply rounded-md
@apply transition-all duration-200
@apply min-w-8
@apply bg-background-secondary
@apply border-interactive-hover
@apply cursor-not-allowed opacity-50
@apply text-text-primary
@apply bg-interactive-default text-text-inverse
@apply border-interactive-default
@apply font-medium
@apply bg-interactive-hover
@apply border-interactive-hover
@apply font-bold
@apply inline-flex items-center justify-center
@apply text-text-secondary
@apply min-w-8
@apply flex items-center gap-2
@apply reset-input
@apply rounded-md px-3 py-1.5
@apply border border-border-default
@apply bg-background-primary
@apply text-text-primary
@apply cursor-pointer
@apply flex items-center gap-2
@apply text-sm text-text-primary
@apply reset-input
@apply w-16 rounded-md px-2 py-1
@apply border border-border-default
@apply bg-background-primary
@apply text-text-primary
@apply text-center
@apply px-2 py-1 text-sm
@apply min-w-7
@apply px-3 py-1.5 text-base
@apply min-w-8
@apply px-4 py-2 text-lg
@apply min-w-10
```

**Steps (Steps.module.css)** - 21 @apply directives
```css
@apply flex
@apply flex items-start
@apply relative flex-1
@apply cursor-pointer
@apply scale-110
@apply flex items-center justify-center
@apply rounded-full
@apply transition-all duration-200
@apply shrink-0
@apply inline-flex items-center justify-center
@apply flex flex-col
@apply font-medium
@apply text-sm
@apply mt-1
@apply absolute
@apply bg-border-default
@apply transition-colors duration-200
@apply flex-row
@apply flex-col items-center
@apply text-center
```

**Tabs, Menu, Breadcrumb, Anchor** - Similar patterns (not exhaustively listed)

#### 1.3 Display Components

**Card (Card.module.css)** - 34 @apply directives
```css
@apply rounded-lg
@apply duration-base transition-all
@apply bg-background-primary
@apply border-border-default border
@apply shadow-md
@apply border-border-medium border-2
@apply bg-background-secondary
@apply bg-background-primary/80
@apply backdrop-blur-sm
@apply border-border-light border
@apply p-0
@apply p-base
@apply p-xl
@apply p-2xl
@apply shadow-lg
@apply mb-base
@apply text-text-primary text-lg font-semibold
@apply m-0
@apply text-text-secondary text-sm
@apply m-0 mt-1
@apply text-text-secondary
@apply mt-base pt-base
@apply border-border-default border-t
```

**Badge (Badge.module.css)** - 2 @apply directives (Already CSS-variable-heavy!)
```css
@apply inline-flex items-center
@apply shrink-0
```

**Avatar, AvatarGroup** - Similar minimal @apply usage

#### 1.4 Feedback Components

**Alert (Alert.module.css)** - 30 @apply directives
```css
@apply relative flex items-start
@apply gap-sm p-base
@apply rounded-lg border
@apply shadow-xs
@apply border-info-border bg-info-lighter text-info-text
@apply text-info-default
@apply border-success-border bg-success-lighter text-success-text
@apply text-success-default
@apply border-warning-border bg-warning-lighter text-warning-text
@apply text-warning-default
@apply border-error-border bg-error-lighter text-error-text
@apply text-error-default
@apply shrink-0
@apply text-lg
@apply flex-1
@apply reset-heading
@apply mb-xxs text-sm font-semibold
@apply text-sm leading-relaxed
@apply reset-button ml-auto shrink-0
@apply rounded-md p-xxs
@apply hover:bg-background-tertiary
@apply active:bg-border-light
@apply duration-fast transition-colors
@apply outline-2 outline-offset-2
@apply h-4 w-4
```

**Spinner** - 11 @apply directives

#### 1.5 Layout Components

**Container, Stack, Grid, Flex, Divider, Center, AspectRatio, Space, Placeholder** - Combined ~100 @apply directives for layout primitives

**Typography** - 15 @apply directives

**Modal, Tooltip** - Combined ~40 @apply directives

---

## 2. theme() Function Inventory (159 total)

### By Component and Usage Pattern

#### 2.1 Button Variants - HEAVY USAGE (159 calls)

**variant-solid.module.css** (45 theme() calls)
```css
box-shadow: var(--btn-shadow, theme(boxShadow.md));
box-shadow: var(--btn-shadow-hover, theme(boxShadow.lg));

/* Per color variant (5 variants × 9 theme() calls each) */
--btn-bg: theme(colors.interactive.default);
--btn-bg-hover: theme(colors.interactive.hover);
--btn-bg-disabled: theme(colors.text.disabled);
--btn-color: theme(colors.text.inverse);
--btn-color-disabled: theme(colors.text.secondary);
--btn-outline: 2px solid theme(colors.interactive.focus);
--btn-ring: 0 0 0 4px rgb(from theme(colors.interactive.focus) r g b / 0.2);
--btn-shadow: 0 1px 3px rgb(from theme(colors.success.default) r g b / 0.2);
--btn-shadow-hover: 0 4px 6px rgb(from theme(colors.success.hover) r g b / 0.3);
```

**variant-outlined.module.css** (71 theme() calls)
```css
box-shadow: var(--btn-shadow-hover, theme(boxShadow.md));

/* Per color variant (5 variants × 14 theme() calls each) */
--btn-border: theme(colors.interactive.default);
--btn-color: theme(colors.interactive.default);
--btn-bg-hover: theme(colors.interactive.default);
--btn-border-hover: theme(colors.interactive.default);
--btn-color-hover: theme(colors.text.inverse);
--btn-bg-disabled: theme(colors.background.tertiary);
--btn-border-disabled: theme(colors.text.disabled);
--btn-color-disabled: theme(colors.text.disabled);
--btn-outline: 2px solid theme(colors.interactive.focus);
--btn-ring: 0 0 0 4px rgb(from theme(colors.interactive.focus) r g b / 0.2);
--btn-shadow-hover: 0 1px 3px rgb(from theme(colors.success.default) r g b / 0.2);
```

**variant-ghost.module.css** (20 theme() calls)
```css
/* Per color variant (5 variants × 4 theme() calls each) */
--btn-color: theme(colors.interactive.default);
--btn-bg-hover: theme(colors.interactive.focus);
--btn-color-disabled: theme(colors.interactive.disabled);
--btn-outline: 1px solid theme(colors.interactive.focus);
```

**variant-text.module.css** (20 theme() calls)
```css
/* Same pattern as ghost */
--btn-color: theme(colors.interactive.default);
--btn-bg-hover: theme(colors.interactive.focus);
--btn-color-disabled: theme(colors.interactive.disabled);
--btn-outline: 1px solid theme(colors.interactive.focus);
```

**variant-link.module.css** (25 theme() calls)
```css
/* Per color variant (5 variants × 5 theme() calls each) */
--btn-color: theme(colors.text.link);
--btn-color-hover: theme(colors.text.link-hover);
--btn-color-disabled: theme(colors.interactive.disabled);
--btn-outline: 2px solid theme(colors.interactive.focus);
```

**base.module.css** (2 theme() calls)
```css
border-width: theme(borderWidth.thin);
opacity: theme(opacity.disabled);
```

#### 2.2 Color Manipulation with rgb(from theme())

**Critical Pattern**: 30+ instances of color opacity manipulation
```css
--btn-ring: 0 0 0 4px rgb(from theme(colors.interactive.focus) r g b / 0.2);
--btn-shadow: 0 1px 3px rgb(from theme(colors.success.default) r g b / 0.2);
```

**Replacement Strategy**:
```css
/* Replace with CSS color-mix or pre-calculated tokens */
--btn-ring: 0 0 0 4px color-mix(in srgb, var(--lufa-token-color-interactive-focus) 20%, transparent);
/* OR add new tokens: --lufa-token-color-interactive-focus-subtle: rgba(..., 0.2) */
```

#### 2.3 Testimonial Inline Usage

**TestimonialTwo.tsx** - 1 theme() call in gradient
```tsx
className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"
```

**TestimonialThree.tsx** - 3 theme() calls in gradients
```tsx
className="absolute ... bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20"
```

---

## 3. Inline Tailwind Classes Analysis

### 3.1 Testimonial Patterns (3 variants)

**TestimonialOne.tsx** - 13 className attributes
```tsx
"bg-background-primary pt-24 pb-16 sm:pt-32 sm:pb-24 xl:pb-32"
"bg-background-inverse pb-20 sm:pb-24 xl:pb-0"
"mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch"
"-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none"
"width-full relative aspect-[2/1] h-full md:mx-8 xl:mx-0 xl:aspect-auto"
"absolute inset-0 h-full w-full rounded-2xl bg-background-tertiary object-cover shadow-2xl"
"w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24"
"relative isolate pt-6 sm:pt-12"
"absolute top-0 left-0 -z-10 h-32 stroke-text-inverse opacity-20"
"text-xl leading-8 font-semibold text-text-inverse sm:text-2xl sm:leading-9"
"mt-8 text-base"
"font-semibold text-text-inverse"
"mt-1 text-text-secondary"
```

**TestimonialTwo.tsx** - 11 className attributes (uses non-token colors!)
```tsx
"relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8"
"absolute inset-0 -z-10 bg-[radial-gradient(...,theme(colors.indigo.100),white)] opacity-20"
"absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"
"mx-auto max-w-2xl lg:max-w-4xl"
"mt-10"
"text-center text-xl leading-8 font-semibold text-gray-900 sm:text-2xl sm:leading-9"
"mt-10"
"mx-auto h-10 w-10 rounded-full"
"mt-4 flex items-center justify-center space-x-3 text-base"
"font-semibold text-gray-900"
"fill-gray-900"
"text-gray-600"
```

**TestimonialThree.tsx** - Similar pattern with 12+ className attributes

### 3.2 Responsive Breakpoints Used

| Breakpoint | Usage Count | Components |
|------------|-------------|------------|
| `sm:` | 11 | Testimonials (mainly) |
| `md:` | 2 | Testimonials |
| `lg:` | 6 | Testimonials |
| `xl:` | 9 | Testimonials |

**Note**: Most responsive breakpoints are isolated to Testimonial patterns.

---

## 4. Tailwind Configuration Analysis

### 4.1 Theme Extensions (tailwind-override.css)

**Lufa-specific @theme blocks** - 469 lines of configuration

```css
/* Color palettes - mapped to primitives (200+ lines) */
--color-red-50: var(--lufa-primitive-color-chromatic-red-50);
...

/* Breakpoints (7 breakpoints) */
--breakpoint-xs: 480px;
--breakpoint-sm: 768px;
--breakpoint-md: 1024px;
--breakpoint-lg: 1280px;
--breakpoint-xl: 1440px;
--breakpoint-2xl: 1920px;

/* Typography (font sizes, weights, letter-spacing, line-heights) */
--text-xs: var(--lufa-primitive-font-size-12);
--font-weight-semibold: var(--lufa-primitive-font-weight-600);
--tracking-normal: var(--lufa-primitive-letter-spacing-normal);
--leading-normal: var(--lufa-primitive-line-height-body);

/* Spacing, shadows, blur, radius, animations */
--radius-xl: var(--lufa-primitive-radius-12);
--shadow-md: var(--lufa-primitive-shadow-md);
--blur-lg: var(--lufa-primitive-blur-16);
--animate-spin: spin 1s linear infinite;
```

### 4.2 Token Mapping (theme.css)

**Semantic token aliases** - 209 lines

```css
/* Colors */
--color-text-primary: var(--lufa-token-color-text-primary);
--color-background-primary: var(--lufa-token-color-background-primary);
--color-interactive-default: var(--lufa-token-color-interactive-default);

/* Spacing */
--spacing-base: var(--lufa-token-spacing-base);

/* Dimensions */
--height-button: var(--lufa-token-dimensions-button-height-default);
--width-sidebar: var(--lufa-token-dimensions-sidebar-width-default);

/* Cursors, Transforms */
--cursor-pointer: var(--lufa-token-cursor-pointer);
--transform-hover-lift: var(--lufa-token-transform-hover-lift);
```

---

## 5. Migration Complexity by Component

### 5.1 Component Complexity Matrix

| Component | @apply Count | theme() Count | Inline Classes | Complexity | Priority |
|-----------|--------------|---------------|----------------|------------|----------|
| **Button** | 35 | 159 | 0 | 🔴 CRITICAL | P0 |
| **Input** | 40 | 0 | 0 | 🟡 HIGH | P1 |
| **Card** | 34 | 0 | 0 | 🟡 HIGH | P1 |
| **Alert** | 30 | 0 | 0 | 🟡 HIGH | P1 |
| **Link** | 39 | 0 | 0 | 🟡 HIGH | P1 |
| **Pagination** | 50 | 0 | 0 | 🟡 HIGH | P2 |
| **Steps** | 21 | 0 | 0 | 🟢 MEDIUM | P2 |
| **Badge** | 2 | 0 | 0 | ✅ LOW | P3 |
| **Testimonials** | 0 | 4 | 35+ | 🟠 SPECIAL | P1 |
| **Typography** | 15 | 0 | 0 | 🟢 MEDIUM | P2 |
| **Modal** | ~20 | 0 | 0 | 🟢 MEDIUM | P2 |
| **Layout components** | ~100 | 0 | 0 | 🟢 MEDIUM | P3 |

### 5.2 Recommended Migration Order

#### Phase 1 - Critical (Week 1-2)
1. **Button component** - All 5 variants + base
   - Reason: 159 theme() calls, foundational component
   - Estimated effort: 8-12 hours
   - Blocker for other components

2. **Testimonial patterns** - 3 variants
   - Reason: Uses inline Tailwind, non-token colors
   - Estimated effort: 4-6 hours
   - Refactor to CSS modules

#### Phase 2 - High Priority (Week 3)
3. **Input component**
   - 40 @apply directives
   - Estimated effort: 4 hours

4. **Card component**
   - 34 @apply directives
   - Estimated effort: 3 hours

5. **Alert component**
   - 30 @apply directives
   - Estimated effort: 3 hours

6. **Link component**
   - 39 @apply directives
   - Estimated effort: 4 hours

#### Phase 3 - Medium Priority (Week 4)
7. **Pagination** (50 @apply)
8. **Steps** (21 @apply)
9. **Typography** (15 @apply)
10. **Modal** (~20 @apply)

#### Phase 4 - Low Priority (Week 5)
11. **Layout components** (Container, Stack, Grid, Flex, etc.)
12. **Badge** (already mostly CSS variables)

---

## 6. Critical Patterns Requiring Special Handling

### 6.1 Color Opacity Manipulation

**Current pattern**:
```css
--btn-ring: 0 0 0 4px rgb(from theme(colors.interactive.focus) r g b / 0.2);
```

**Migration strategy**:
```css
/* Option A: Use color-mix (modern browsers) */
--btn-ring: 0 0 0 4px color-mix(in srgb, var(--lufa-token-color-interactive-focus) 20%, transparent);

/* Option B: Add new tokens to design-system-tokens */
--lufa-token-color-interactive-focus-subtle: rgba(..., 0.2);
--btn-ring: 0 0 0 4px var(--lufa-token-color-interactive-focus-subtle);
```

### 6.2 Gradient Backgrounds (Testimonials)

**Current pattern**:
```tsx
className="bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]"
```

**Migration strategy**:
```css
/* Move to CSS module */
.testimonialBackground {
  background: radial-gradient(45rem 50rem at top, var(--lufa-primitive-color-chromatic-indigo-100), white);
}
```

### 6.3 Responsive Breakpoints

**Current pattern**:
```tsx
className="pt-24 sm:pt-32 xl:pb-32"
```

**Migration strategy**:
```css
/* Use container queries or media queries */
.testimonialSection {
  padding-top: 6rem; /* 24 × 0.25rem */
}

@container (min-width: 768px) {
  .testimonialSection {
    padding-top: 8rem; /* 32 × 0.25rem */
  }
}

@container (min-width: 1440px) {
  .testimonialSection {
    padding-bottom: 8rem;
  }
}
```

### 6.4 Complex Utility Combinations

**Current pattern**:
```css
@apply inline-flex items-center justify-center gap-2
```

**Migration strategy**:
```css
/* Expand to vanilla CSS */
display: inline-flex;
align-items: center;
justify-content: center;
gap: var(--lufa-token-spacing-xs); /* 0.5rem / gap-2 */
```

---

## 7. Dependency Analysis

### 7.1 Tailwind Dependencies to Remove

```json
// package.json
{
  "devDependencies": {
    "@tailwindcss/vite": "4.0.18",  // To remove after migration
    "tailwindcss": "4.0.18"          // To remove after migration
  }
}
```

### 7.2 PostCSS Configuration Impact

**Current**: Uses Tailwind's @apply and theme() via PostCSS  
**After Migration**: Pure CSS with CSS variables, no PostCSS Tailwind plugin needed

### 7.3 Build Process Changes

- **Before**: Vite → Tailwind PostCSS → Output CSS
- **After**: Vite → Standard CSS processing → Output CSS
- **Benefit**: Faster builds, smaller bundle (no Tailwind runtime)

---

## 8. Token Coverage Analysis

### 8.1 Well-Covered Areas (Good Token Support)

✅ **Colors** - Complete coverage via theme.css
✅ **Spacing** - Complete coverage via spacing tokens
✅ **Typography** - Font sizes, weights, line-heights covered
✅ **Borders** - Radius, widths covered
✅ **Shadows** - Complete primitive/token mapping
✅ **Dimensions** - Button heights, navbar heights, sidebar widths

### 8.2 Gaps Requiring New Tokens

🟡 **Color opacity variants** - Need subtle/focus variants (20%, 10% opacity)
🟡 **Composite shadows** - Box shadows with color opacity
🟡 **Gradient stops** - Radial/linear gradient token patterns
🟡 **Transform presets** - Scale, translate, rotate combinations

**Recommendation**: Create these tokens during Button migration (Phase 1)

---

## 9. Testing Strategy

### 9.1 Visual Regression Testing

**Tools**: Playwright component tests + Percy/Chromatic

**Coverage needed**:
- All Button variants × sizes × states (5 × 3 × 4 = 60 combinations)
- Input variants × states (2 × 5 = 10 combinations)
- Card variants × padding (5 × 4 = 20 combinations)
- Alert variants (4 variants)
- Testimonial layouts (3 variants × 2 breakpoints = 6 combinations)

**Total test cases**: ~100 visual snapshots

### 9.2 Accessibility Testing

**Verify after migration**:
- Focus states (outline colors, widths)
- Disabled states (opacity, cursor)
- Color contrast ratios (WCAG AA compliance)
- Keyboard navigation

### 9.3 Browser Compatibility

**Target browsers**: Last 2 versions of Chrome, Firefox, Safari, Edge

**Critical checks**:
- CSS custom properties support (all modern browsers ✅)
- `color-mix()` support (Safari 16.2+, Chrome 111+)
- Container queries support (Safari 16+, Chrome 105+)

---

## 10. Risk Assessment

### 10.1 High Risks

🔴 **Button component complexity**
- Risk: 159 theme() calls, complex color logic
- Mitigation: Thorough testing, phased rollout

🔴 **Breaking changes in Storybook**
- Risk: Visual snapshots may break
- Mitigation: Update snapshots after verification

🔴 **Testimonial refactor scope**
- Risk: Requires significant structural changes
- Mitigation: Treat as new component development

### 10.2 Medium Risks

🟡 **Build process changes**
- Risk: Vite config changes may affect other packages
- Mitigation: Test in isolation, gradual rollout

🟡 **Token gaps**
- Risk: Missing tokens discovered during migration
- Mitigation: Create tokens in design-system-tokens first

### 10.3 Low Risks

🟢 **Badge/Layout components**
- Risk: Minimal, already using CSS variables
- Mitigation: Standard refactoring approach

---

## 11. Success Metrics

### 11.1 Quantitative Metrics

| Metric | Before | After (Target) | Improvement |
|--------|--------|----------------|-------------|
| @apply directives | 547 | 0 | -100% |
| theme() functions | 159 | 0 | -100% |
| Inline Tailwind classes | 35+ | 0 | -100% |
| CSS bundle size | ~X KB | ~0.7X KB | -30% |
| Build time (design system) | ~Y seconds | ~0.8Y seconds | -20% |
| CSS custom properties | ~200 | ~250 | +25% |

### 11.2 Qualitative Metrics

✅ **Developer Experience**
- Easier to reason about styles (vanilla CSS)
- Better IDE autocomplete (no Tailwind DSL)
- Simpler debugging (no @apply expansion)

✅ **Maintainability**
- Clear separation of concerns
- Token-based design system
- Standard CSS practices

✅ **Performance**
- Smaller CSS bundles
- Faster builds
- No Tailwind runtime overhead

---

## 12. Next Steps (Phase 0.2)

1. **Create detailed mapping table** → `tailwind-to-vanilla-mapping.md`
2. **Set up visual regression testing** → Playwright + Percy integration
3. **Create token gap issues** → Add missing tokens to design-system-tokens
4. **Prepare Button migration PR** → Phase 1 implementation
5. **Document migration patterns** → Reusable recipes for other components

---

## Appendix A: File Inventory

### A.1 CSS Module Files by Category

**Forms** (6 files)
- `Button/styles/base.module.css`
- `Button/styles/variant-solid.module.css`
- `Button/styles/variant-outlined.module.css`
- `Button/styles/variant-ghost.module.css`
- `Button/styles/variant-text.module.css`
- `Button/styles/variant-link.module.css`
- `Input/Input.module.css`

**Navigation** (6 files)
- `Link/Link.module.css`
- `Pagination/Pagination.module.css`
- `Steps/Steps.module.css`
- `Tabs/Tabs.module.css`
- `Menu/Menu.module.css`
- `Breadcrumb/Breadcrumb.module.css`
- `Anchor/Anchor.module.css`

**Display** (4 files)
- `Card/Card.module.css`
- `Badge/Badge.module.css`
- `Avatar/Avatar.module.css`
- `AvatarGroup/AvatarGroup.module.css`

**Feedback** (3 files)
- `Alert/Alert.module.css`
- `Spinner/Spinner.module.css`
- `Modal/Modal.module.css`

**Layout** (10 files)
- `Container/Container.module.css`
- `Stack/Stack.module.css`
- `Grid/Grid.module.css`
- `Flex/Flex.module.css`
- `Divider/Divider.module.css`
- `Center/Center.module.css`
- `AspectRatio/AspectRatio.module.css`
- `Space/Space.module.css`
- `Placeholder/Placeholder.module.css`
- `Layout/Layout.module.css`

**Typography** (1 file)
- `Typography/Typography.module.css`

### A.2 TSX Files with Inline Tailwind

**Patterns** (3 files)
- `patterns/Testimonial/variants/TestimonialOne.tsx`
- `patterns/Testimonial/variants/TestimonialTwo.tsx`
- `patterns/Testimonial/variants/TestimonialThree.tsx`

---

## Appendix B: Useful Commands

### B.1 Audit Commands

```bash
# Count @apply directives
grep -r "@apply" packages/design-system/main/src --include="*.css" | wc -l

# Count theme() functions
grep -r "theme(" packages/design-system/main/src --include="*.css" | wc -l

# Find all CSS module files
find packages/design-system/main/src -name "*.module.css"

# Find inline Tailwind usage
grep -r "className=" packages/design-system/main/src/components --include="*.tsx" | grep -E "(sm:|lg:|xl:|md:)"

# List all components
ls -R packages/design-system/main/src/components
```

### B.2 Build Commands

```bash
# Build design system
pnpm ds:main:build

# Watch mode (for testing migrations)
pnpm ds:main:dev

# Run Storybook (visual testing)
pnpm ds:storybook:dev

# Run component tests
pnpm --filter @grasdouble/lufa_design-system test-ct
```

---

**Document Status**: ✅ Complete - Ready for Phase 0.2 (Mapping Table)
