# Spacing & Layout Token Usage Guide

**Design System:** Lufa Design System  
**Version:** v0.8.0+  
**Last Updated:** 2026-01-26

---

## Overview

This guide provides comprehensive instructions for using Lufa Design System spacing and layout tokens, including breakpoints, responsive spacing, grid systems, and fluid layouts.

**What's New in v0.8.0:**

- 6 breakpoint tokens (320px - 1536px)
- 8 height tokens (24px - 96px)
- 18 responsive layout token variants
- 6 grid system tokens
- 5 container tokens
- 4 fluid spacing tokens

---

## Token Architecture

Lufa uses a 4-tier token hierarchy:

```
Primitive → Core → Semantic → Component
```

### Token Hierarchy for Spacing & Layout

```
Primitive Layer (Foundation)
├── breakpoint.xs → breakpoint.2xl (6 tokens)
├── height.24 → height.96 (8 tokens)
└── spacing.0 → spacing.96 (12 tokens)

Core Layer (Brand/System)
├── layout.page-padding (base, md, lg)
├── layout.section-gap (base, md, lg)
├── layout.container.sm → container.2xl (5 tokens)
└── layout.grid.columns, grid.gap-* (6 tokens)

Semantic Layer (UI Context)
└── ui.spacing-tight → spacing-spacious (5 tokens)

Component Layer (Component-Specific)
└── button.height.sm → height.lg (3 tokens)
```

**Key Principle:** Always use the highest appropriate layer. Start with semantic tokens, fall back to core when needed, avoid primitives in components.

---

## Breakpoint Tokens

### Available Breakpoints

Lufa uses a **mobile-first** 6-breakpoint system aligned with modern standards:

| Token            | Value  | CSS Variable                      | Device Target             |
| ---------------- | ------ | --------------------------------- | ------------------------- |
| `breakpoint-xs`  | 320px  | `--lufa-primitive-breakpoint-xs`  | Mobile portrait (minimum) |
| `breakpoint-sm`  | 640px  | `--lufa-primitive-breakpoint-sm`  | Mobile landscape          |
| `breakpoint-md`  | 768px  | `--lufa-primitive-breakpoint-md`  | Tablets portrait          |
| `breakpoint-lg`  | 1024px | `--lufa-primitive-breakpoint-lg`  | Tablets landscape/Desktop |
| `breakpoint-xl`  | 1280px | `--lufa-primitive-breakpoint-xl`  | Standard desktop          |
| `breakpoint-2xl` | 1536px | `--lufa-primitive-breakpoint-2xl` | Large displays/Ultra-wide |

### Using Breakpoints in CSS

**Mobile-First Approach (Recommended):**

```css
/* Base styles (mobile) */
.my-component {
  padding: 16px;
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
  /* Use var() to reference the token */
  /* OR hard-code: @media (min-width: 768px) */
  .my-component {
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .my-component {
    padding: 32px;
    font-size: 18px;
  }
}
```

**Using CSS Variables for Dynamic Breakpoints:**

```css
/* Reference the token (less common, but possible) */
@media (min-width: var(--lufa-primitive-breakpoint-md)) {
  /* Note: Some older browsers may not support variables in media queries */
  .my-component {
    padding: 24px;
  }
}
```

**Best Practice:** Use hard-coded pixel values in media queries for maximum browser compatibility. Tokens are primarily for consistency and documentation, not runtime injection into `@media`.

### Breakpoint Usage Guidelines

**When to use each breakpoint:**

- **xs (320px):** Base styles only - don't use in media queries (this is the default)
- **sm (640px):** Mobile landscape adjustments, large phones
- **md (768px):** Tablet portrait, first major layout shift
- **lg (1024px):** Desktop layouts, multi-column grids
- **xl (1280px):** Large desktop refinements, max-width containers
- **2xl (1536px):** Optional enhancements for ultra-wide displays

**Common Patterns:**

```css
/* Two-breakpoint strategy (most common) */
.card {
  padding: 16px; /* mobile */
}

@media (min-width: 768px) {
  .card {
    padding: 24px; /* tablet+ */
  }
}

@media (min-width: 1024px) {
  .card {
    padding: 32px; /* desktop+ */
  }
}
```

```css
/* Three-breakpoint strategy (hero sections, complex layouts) */
.hero {
  padding: 32px; /* mobile */
}

@media (min-width: 768px) {
  .hero {
    padding: 64px; /* tablet */
  }
}

@media (min-width: 1280px) {
  .hero {
    padding: 96px; /* large desktop */
  }
}
```

---

## Height Tokens

### Available Heights

Height tokens provide a semantic scale for component heights, separate from spacing tokens:

| Token       | Value | CSS Variable                 | Use Cases                        |
| ----------- | ----- | ---------------------------- | -------------------------------- |
| `height-24` | 24px  | `--lufa-primitive-height-24` | Small badges, chips, tags        |
| `height-32` | 32px  | `--lufa-primitive-height-32` | Small buttons, compact inputs    |
| `height-40` | 40px  | `--lufa-primitive-height-40` | Default buttons, standard inputs |
| `height-48` | 48px  | `--lufa-primitive-height-48` | Large buttons, touch targets     |
| `height-56` | 56px  | `--lufa-primitive-height-56` | Mobile headers, bottom bars      |
| `height-64` | 64px  | `--lufa-primitive-height-64` | Desktop headers, navigation      |
| `height-80` | 80px  | `--lufa-primitive-height-80` | Hero headers, prominent sections |
| `height-96` | 96px  | `--lufa-primitive-height-96` | Extra large headers, panels      |

### Component Height Guidelines

**Buttons:**

```css
/* Small button (dense UIs, tables) */
.button-small {
  height: var(--lufa-primitive-height-32);
  padding-inline: 12px;
}

/* Default button (most common) */
.button-default {
  height: var(--lufa-primitive-height-40);
  padding-inline: 16px;
}

/* Large button (landing pages, CTAs) */
.button-large {
  height: var(--lufa-primitive-height-48);
  padding-inline: 24px;
}
```

**Input Fields:**

```css
/* Text input */
.input {
  height: var(--lufa-primitive-height-40);
  padding-inline: 12px;
}

/* Select dropdown */
.select {
  height: var(--lufa-primitive-height-40);
  padding-inline: 12px;
}
```

**Headers/Navigation:**

```css
/* Mobile header */
.header {
  height: var(--lufa-primitive-height-56);
}

/* Desktop header (more space for navigation) */
@media (min-width: 768px) {
  .header {
    height: var(--lufa-primitive-height-64);
  }
}
```

### Height vs Spacing

**When to use height tokens:**

- Component min-height or fixed height
- Vertical alignment baselines
- Touch target sizes (buttons, inputs)
- Header/footer heights

**When to use spacing tokens:**

- Padding and margins
- Gaps between elements
- Grid gaps
- Section spacing

```css
/* ✅ Correct: Height for component size, spacing for gaps */
.button {
  height: var(--lufa-primitive-height-40);
  padding-inline: var(--lufa-primitive-spacing-16);
  margin-bottom: var(--lufa-primitive-spacing-8);
}

/* ❌ Incorrect: Don't use spacing tokens for height */
.button {
  height: var(--lufa-primitive-spacing-40); /* Wrong semantic meaning */
}
```

---

## Responsive Layout Tokens

### Overview

Responsive layout tokens automatically adapt to viewport size using CSS media queries. You reference a single variable, and the system handles breakpoint overrides.

### Available Responsive Tokens

**6 token groups, each with 3 variants (base, md, lg) = 18 total variants:**

| Token              | Base (Mobile) | md (Tablet) | lg (Desktop) | Use Case                          |
| ------------------ | ------------- | ----------- | ------------ | --------------------------------- |
| `page-padding`     | 16px          | 24px        | 32px         | Horizontal page margins           |
| `section-gap`      | 48px          | 64px        | 80px         | Vertical spacing between sections |
| `container-gutter` | 16px          | 24px        | 32px         | Container side padding            |
| `grid-gap`         | 16px          | 24px        | 32px         | Grid item spacing                 |
| `header-height`    | 56px          | 64px        | 64px         | Navigation bar height             |
| `modal-padding`    | 24px          | 32px        | 40px         | Modal content padding             |

### How Responsive Variants Work

**Behind the scenes (automatically generated CSS):**

```css
/* Base value (mobile-first) */
:root {
  --lufa-core-layout-page-padding: 16px;
}

/* Tablet override (768px+) */
@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: 24px;
  }
}

/* Desktop override (1024px+) */
@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: 32px;
  }
}
```

**What you write (automatic responsiveness):**

```css
/* Just reference the token - it adapts automatically! */
.page-container {
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}
```

### Usage Examples

**Page Layout:**

```css
.page-wrapper {
  /* Horizontal padding that grows with viewport */
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}

.page-section {
  /* Vertical spacing between sections */
  margin-bottom: var(--lufa-core-layout-section-gap);
  /* Mobile: 48px, Tablet: 64px, Desktop: 80px */
}
```

**Grid Layouts:**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--lufa-core-layout-grid-gap);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}
```

**Container with Gutters:**

```css
.container {
  max-width: var(--lufa-core-layout-container-xl);
  margin-inline: auto;
  padding-inline: var(--lufa-core-layout-container-gutter);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}
```

**Modal Dialogs:**

```css
.modal-content {
  padding: var(--lufa-core-layout-modal-padding);
  /* Mobile: 24px, Tablet: 32px, Desktop: 40px */
}
```

**Responsive Header:**

```css
.header {
  height: var(--lufa-core-layout-header-height);
  /* Mobile: 56px, Tablet: 64px, Desktop: 64px */
}
```

### Manual Override (Advanced)

If you need to override the automatic responsive behavior:

```css
/* Access specific breakpoint variants */
.special-container {
  /* Force desktop spacing on all viewports */
  padding-inline: var(--lufa-core-layout-page-padding-lg);
  /* Always 32px, no automatic adaptation */
}

/* Use base variant only */
.mobile-optimized {
  padding-inline: var(--lufa-core-layout-page-padding-base);
  /* Always 16px */
}
```

**Available variant suffixes:**

- `-base` - Mobile value only
- `-md` - Tablet value only
- `-lg` - Desktop value only

---

## Fluid Spacing Tokens

### Overview

Fluid spacing tokens use CSS `clamp()` to scale smoothly based on viewport width, without media query breakpoints. They're ideal for hero sections, large content areas, and typographic spacing.

### Available Fluid Tokens

| Token                    | Formula                  | Range   | Use Case                    |
| ------------------------ | ------------------------ | ------- | --------------------------- |
| `section-gap-fluid`      | `clamp(48px, 8vw, 96px)` | 48-96px | Hero sections, major blocks |
| `hero-padding-fluid`     | `clamp(32px, 6vw, 80px)` | 32-80px | Hero internal padding       |
| `container-gutter-fluid` | `clamp(16px, 4vw, 48px)` | 16-48px | Container internal spacing  |
| `page-margin-fluid`      | `clamp(16px, 3vw, 32px)` | 16-32px | Page-level margins          |

### How `clamp()` Works

```
clamp(MIN, PREFERRED, MAX)
```

- **MIN:** Minimum value (small viewports)
- **PREFERRED:** Viewport-relative value (scales smoothly)
- **MAX:** Maximum value (large viewports)

**Example:**

```css
/* clamp(48px, 8vw, 96px) */
/* 
  Viewport 600px: 48px (minimum)
  Viewport 800px: 64px (8% of 800px)
  Viewport 1200px: 96px (maximum, 8% would be 96px)
  Viewport 2000px: 96px (capped at maximum)
*/
```

### Usage Examples

**Hero Section:**

```css
.hero {
  /* Smooth padding that grows with viewport */
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
  /* Scales from 32px to 80px based on viewport width */
}

.hero-content {
  /* Smooth gap between hero elements */
  margin-bottom: var(--lufa-core-layout-section-gap-fluid);
  /* Scales from 48px to 96px */
}
```

**Large Content Container:**

```css
.content-wrapper {
  /* Fluid side margins */
  margin-inline: var(--lufa-core-layout-page-margin-fluid);
  /* Scales from 16px to 32px */
}
```

**Feature Section:**

```css
.feature-grid {
  /* Fluid internal spacing */
  padding: var(--lufa-core-layout-container-gutter-fluid);
  /* Scales from 16px to 48px */
}
```

### Fluid vs Responsive: When to Use Each

**Use Fluid Tokens When:**

- Hero sections, landing pages
- Large content areas
- Typographic spacing that should feel proportional
- You want smooth scaling without breakpoint jumps

**Use Responsive Tokens When:**

- Page structure (headers, footers, navigation)
- Component spacing (cards, buttons)
- Layout that needs precise control at breakpoints
- Grid systems

```css
/* ✅ Good: Fluid for hero, responsive for layout */
.hero {
  padding-block: var(--lufa-core-layout-hero-padding-fluid); /* Smooth */
}

.page-content {
  padding-inline: var(--lufa-core-layout-page-padding); /* Breakpoint-based */
}

/* ❌ Avoid: Mixing both for same property */
.section {
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Can work, but consider consistency */
}
```

### Performance Considerations

Fluid tokens are highly performant:

- Native CSS `clamp()` (no JavaScript)
- 97%+ browser support (IE11 excluded)
- GPU-accelerated calculations
- No media query overhead

---

## Grid System Tokens

### Overview

Grid system tokens provide standardized values for CSS Grid layouts, including column counts, gap sizes, and minimum column widths.

### Available Grid Tokens

| Token                   | Value | CSS Variable                               | Use Case                     |
| ----------------------- | ----- | ------------------------------------------ | ---------------------------- |
| `grid-columns`          | 12    | `--lufa-core-layout-grid-columns`          | Standard 12-column grid      |
| `grid-gap-tight`        | 8px   | `--lufa-core-layout-grid-gap-tight`        | Dense grids, compact layouts |
| `grid-gap-default`      | 16px  | `--lufa-core-layout-grid-gap-default`      | Standard grid spacing        |
| `grid-gap-comfortable`  | 24px  | `--lufa-core-layout-grid-gap-comfortable`  | Spacious grids               |
| `grid-gap-spacious`     | 32px  | `--lufa-core-layout-grid-gap-spacious`     | Extra generous spacing       |
| `grid-min-column-width` | 280px | `--lufa-core-layout-grid-min-column-width` | Auto-fit/auto-fill minimum   |

### Usage Examples

**12-Column Grid:**

```css
.twelve-column-grid {
  display: grid;
  grid-template-columns: repeat(var(--lufa-core-layout-grid-columns), 1fr);
  gap: var(--lufa-core-layout-grid-gap-default);
}
```

**Responsive Auto-Fit Grid:**

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--lufa-core-layout-grid-min-column-width), 1fr));
  gap: var(--lufa-core-layout-grid-gap-default);
  /* Automatically fits columns based on available space */
}
```

**Card Grid with Different Gap Sizes:**

```css
/* Dense product grid */
.product-grid-dense {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--lufa-core-layout-grid-gap-tight); /* 8px */
}

/* Standard card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--lufa-core-layout-grid-gap-default); /* 16px */
}

/* Spacious feature grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--lufa-core-layout-grid-gap-spacious); /* 32px */
}
```

**Responsive Grid with Breakpoints:**

```css
.adaptive-grid {
  display: grid;
  gap: var(--lufa-core-layout-grid-gap-default);

  /* Mobile: 1 column */
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .adaptive-grid {
    /* Tablet: 2 columns */
    grid-template-columns: repeat(2, 1fr);
    gap: var(--lufa-core-layout-grid-gap-comfortable); /* More space on tablet */
  }
}

@media (min-width: 1024px) {
  .adaptive-grid {
    /* Desktop: 3 columns */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--lufa-core-layout-grid-gap-spacious); /* Even more space on desktop */
  }
}
```

### Gap Variant Guidelines

**When to use each gap:**

- **Tight (8px):** Data tables, compact dashboards, dense product grids
- **Default (16px):** Most card grids, standard layouts (recommended default)
- **Comfortable (24px):** Marketing pages, feature sections, portfolio grids
- **Spacious (32px):** Hero sections, large showcases, whitespace-focused designs

---

## Container Tokens

### Overview

Container tokens define max-width constraints for centered content areas, aligned with the breakpoint system.

### Available Container Tokens

| Token           | Value  | CSS Variable                       | Use Case                  |
| --------------- | ------ | ---------------------------------- | ------------------------- |
| `container-sm`  | 640px  | `--lufa-core-layout-container-sm`  | Narrow content, forms     |
| `container-md`  | 768px  | `--lufa-core-layout-container-md`  | Medium content, articles  |
| `container-lg`  | 1024px | `--lufa-core-layout-container-lg`  | Standard page containers  |
| `container-xl`  | 1280px | `--lufa-core-layout-container-xl`  | Wide containers (default) |
| `container-2xl` | 1536px | `--lufa-core-layout-container-2xl` | Ultra-wide layouts        |

### Usage Examples

**Standard Page Container:**

```css
.page-container {
  max-width: var(--lufa-core-layout-container-xl);
  margin-inline: auto;
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Centers content, adds responsive side padding */
}
```

**Narrow Content (Articles, Forms):**

```css
.article-content {
  max-width: var(--lufa-core-layout-container-md);
  margin-inline: auto;
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Narrower for better readability */
}
```

**Wide Dashboard Layout:**

```css
.dashboard {
  max-width: var(--lufa-core-layout-container-2xl);
  margin-inline: auto;
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Ultra-wide for data-dense interfaces */
}
```

**Responsive Container (Adapts Max-Width):**

```css
.adaptive-container {
  margin-inline: auto;
  padding-inline: var(--lufa-core-layout-page-padding);

  /* Mobile: full width */
  max-width: 100%;
}

@media (min-width: 768px) {
  .adaptive-container {
    /* Tablet: medium container */
    max-width: var(--lufa-core-layout-container-md);
  }
}

@media (min-width: 1024px) {
  .adaptive-container {
    /* Desktop: large container */
    max-width: var(--lufa-core-layout-container-xl);
  }
}
```

### Container Selection Guidelines

**When to use each container:**

- **sm (640px):** Login forms, narrow modals, simple wizards
- **md (768px):** Blog posts, documentation, single-column content
- **lg (1024px):** Standard marketing pages, product pages
- **xl (1280px):** Default for most pages, app layouts (recommended)
- **2xl (1536px):** Dashboards, data tables, ultra-wide content

---

## Best Practices

### ✅ DO

1. **Use responsive tokens for automatic adaptation**

   ```css
   /* ✅ Single variable, automatic responsiveness */
   padding-inline: var(--lufa-core-layout-page-padding);
   ```

2. **Use fluid tokens for smooth hero sections**

   ```css
   /* ✅ Smooth scaling without breakpoints */
   padding-block: var(--lufa-core-layout-hero-padding-fluid);
   ```

3. **Use height tokens for component sizing**

   ```css
   /* ✅ Semantic height scale */
   .button {
     height: var(--lufa-primitive-height-40);
   }
   ```

4. **Combine container + gutter for centered layouts**

   ```css
   /* ✅ Max-width + padding */
   .container {
     max-width: var(--lufa-core-layout-container-xl);
     padding-inline: var(--lufa-core-layout-container-gutter);
     margin-inline: auto;
   }
   ```

5. **Use grid tokens for consistent spacing**
   ```css
   /* ✅ Standardized gap sizes */
   gap: var(--lufa-core-layout-grid-gap-default);
   ```

### ❌ DON'T

1. **Don't hard-code breakpoint values**

   ```css
   /* ❌ Hard-coded magic number */
   @media (min-width: 900px) {
   }

   /* ✅ Use standard breakpoint */
   @media (min-width: 1024px) {
   }
   ```

2. **Don't use spacing tokens for heights**

   ```css
   /* ❌ Wrong semantic meaning */
   .button {
     height: var(--lufa-primitive-spacing-40);
   }

   /* ✅ Use height tokens */
   .button {
     height: var(--lufa-primitive-height-40);
   }
   ```

3. **Don't mix fluid and responsive for same property**

   ```css
   /* ❌ Inconsistent approach */
   .hero {
     padding-block: var(--lufa-core-layout-hero-padding-fluid);
     padding-inline: var(--lufa-core-layout-page-padding);
   }

   /* ✅ Be consistent */
   .hero {
     padding: var(--lufa-core-layout-hero-padding-fluid);
   }
   ```

4. **Don't override responsive tokens unnecessarily**

   ```css
   /* ❌ Fighting the system */
   .container {
     padding-inline: 20px; /* Hard-coded */
   }

   /* ✅ Use the token */
   .container {
     padding-inline: var(--lufa-core-layout-page-padding);
   }
   ```

5. **Don't skip container tokens for max-width**

   ```css
   /* ❌ Hard-coded max-width */
   .container {
     max-width: 1200px;
   }

   /* ✅ Use container token */
   .container {
     max-width: var(--lufa-core-layout-container-lg);
   }
   ```

---

## Common Patterns

### Pattern 1: Responsive Page Layout

```css
.page {
  /* Automatic responsive padding */
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}

.page-header {
  /* Responsive header height */
  height: var(--lufa-core-layout-header-height);
  /* Mobile: 56px, Tablet: 64px, Desktop: 64px */
}

.page-section {
  /* Vertical section spacing */
  margin-bottom: var(--lufa-core-layout-section-gap);
  /* Mobile: 48px, Tablet: 64px, Desktop: 80px */
}
```

### Pattern 2: Centered Container with Gutters

```css
.container {
  /* Center with max-width */
  max-width: var(--lufa-core-layout-container-xl);
  margin-inline: auto;

  /* Responsive side padding */
  padding-inline: var(--lufa-core-layout-container-gutter);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}
```

### Pattern 3: Responsive Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--lufa-core-layout-grid-min-column-width), 1fr));
  gap: var(--lufa-core-layout-grid-gap-default);

  /* Add responsive padding */
  padding: var(--lufa-core-layout-page-padding);
}
```

### Pattern 4: Hero Section with Fluid Spacing

```css
.hero {
  /* Smooth fluid padding */
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
  padding-inline: var(--lufa-core-layout-container-gutter-fluid);

  /* Fluid gap between hero elements */
  display: flex;
  flex-direction: column;
  gap: var(--lufa-core-layout-section-gap-fluid);
}
```

### Pattern 5: Modal Dialog

```css
.modal-backdrop {
  /* Full viewport */
  position: fixed;
  inset: 0;
}

.modal-content {
  /* Responsive padding */
  padding: var(--lufa-core-layout-modal-padding);
  /* Mobile: 24px, Tablet: 32px, Desktop: 40px */

  /* Constrain width */
  max-width: var(--lufa-core-layout-container-md);
  margin-inline: auto;
}
```

---

## Troubleshooting

### Responsive token not changing at breakpoints

**Problem:** Token value doesn't update when resizing viewport

**Solution:** Ensure you're referencing the base token (without suffix):

```css
/* ❌ This won't respond to breakpoints */
padding: var(--lufa-core-layout-page-padding-base);

/* ✅ This will automatically adapt */
padding: var(--lufa-core-layout-page-padding);
```

### Fluid token not scaling smoothly

**Problem:** Fluid token jumps instead of scaling smoothly

**Solution:** Check viewport size - fluid tokens hit min/max bounds:

```css
/* If viewport is < 600px, you'll see the minimum (48px) */
padding: var(--lufa-core-layout-section-gap-fluid);
/* clamp(48px, 8vw, 96px) */

/* Solution: Use responsive tokens for small viewports */
@media (max-width: 767px) {
  .hero {
    padding: var(--lufa-core-layout-section-gap); /* Breakpoint-based */
  }
}
```

### Container not centering

**Problem:** Container doesn't center on page

**Solution:** Add `margin-inline: auto`:

```css
/* ❌ Max-width alone doesn't center */
.container {
  max-width: var(--lufa-core-layout-container-xl);
}

/* ✅ Add auto margins */
.container {
  max-width: var(--lufa-core-layout-container-xl);
  margin-inline: auto;
}
```

### Grid gap not working

**Problem:** Grid gap token has no effect

**Solution:** Ensure you're using CSS Grid, not Flexbox:

```css
/* ❌ Grid tokens don't work with Flexbox */
.flex-container {
  display: flex;
  gap: var(--lufa-core-layout-grid-gap-default); /* Won't work in older browsers */
}

/* ✅ Use with CSS Grid */
.grid-container {
  display: grid;
  gap: var(--lufa-core-layout-grid-gap-default); /* Works perfectly */
}
```

---

## Resources

- [Migration Guide](./migration-guide.md) - v0.7.1 → v0.8.0 upgrade instructions
- [Responsive Design Guide](./responsive-design-guide.md) - Mobile-first strategies
- [Technical Specification](../planning/technical-spec-spacing-layout.md) - Token architecture details
- [ADR-005: Breakpoint Token Strategy](../../adrs/ADR-005-breakpoint-token-strategy.md)
- [ADR-006: Responsive Spacing Architecture](../../adrs/ADR-006-responsive-spacing-architecture.md)
- [ADR-007: Zero-Value Token Handling](../../adrs/ADR-007-zero-value-token-handling.md)

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-26  
**Maintained By:** Design System Team
