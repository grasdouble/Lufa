# Responsive Design Guide

**Design System:** Lufa Design System  
**Version:** v0.8.0+  
**Last Updated:** 2026-01-26

---

## Overview

This guide explains Lufa Design System's mobile-first responsive strategy, breakpoint usage patterns, and best practices for building responsive layouts with design tokens.

**Key Concepts:**

- Mobile-first CSS approach
- 6-breakpoint system (320px → 1536px)
- Responsive token variants (automatic media queries)
- Fluid spacing tokens (smooth viewport scaling)
- Testing strategies for responsive layouts

---

## Mobile-First Approach

### What is Mobile-First?

Mobile-first means writing **base styles for mobile devices first**, then using media queries to progressively enhance for larger viewports.

**Traditional Desktop-First (Old Way):**

```css
/* ❌ Desktop-first: Start with desktop, override for mobile */
.component {
  padding: 32px; /* Desktop */
  font-size: 18px;
}

@media (max-width: 768px) {
  .component {
    padding: 16px; /* Mobile override */
    font-size: 14px;
  }
}
```

**Mobile-First (Lufa Way):**

```css
/* ✅ Mobile-first: Start with mobile, enhance for desktop */
.component {
  padding: 16px; /* Mobile base */
  font-size: 14px;
}

@media (min-width: 768px) {
  .component {
    padding: 24px; /* Tablet enhancement */
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .component {
    padding: 32px; /* Desktop enhancement */
    font-size: 18px;
  }
}
```

### Why Mobile-First?

**1. Performance:** Mobile devices load only the base styles, not extra overrides

```css
/* Mobile device loads: */
.component { padding: 16px; } /* ✅ Applied */

/* Desktop media queries ignored on mobile (not parsed) */
@media (min-width: 768px) { ... } /* ⏭️ Skipped */
```

**2. Progressive Enhancement:** Features get added as screens get larger

```css
/* Mobile: Simple layout */
.grid {
  display: block;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**3. Simpler CSS:** Adding features is clearer than removing them

**4. Mobile Usage:** 60%+ of web traffic is mobile - optimize for the majority

---

## Breakpoint Strategy

### Lufa Breakpoint System

Lufa uses 6 breakpoints based on device classes, not specific brands:

| Name  | Value  | Token                             | Device Class                | Usage        |
| ----- | ------ | --------------------------------- | --------------------------- | ------------ |
| `xs`  | 320px  | `--lufa-primitive-breakpoint-xs`  | Mobile portrait (minimum)   | Base styles  |
| `sm`  | 640px  | `--lufa-primitive-breakpoint-sm`  | Mobile landscape            | 10-15% usage |
| `md`  | 768px  | `--lufa-primitive-breakpoint-md`  | Tablets portrait            | 30-40% usage |
| `lg`  | 1024px | `--lufa-primitive-breakpoint-lg`  | Desktop / Tablets landscape | 60-70% usage |
| `xl`  | 1280px | `--lufa-primitive-breakpoint-xl`  | Large desktop               | 20-30% usage |
| `2xl` | 1536px | `--lufa-primitive-breakpoint-2xl` | Ultra-wide displays         | 5-10% usage  |

### Device Targeting

**Mobile Portrait (320px - 639px):**

- **Devices:** iPhone SE, small Android phones
- **Strategy:** Single column, stacked layouts, large touch targets (48px+)
- **Font Size:** 14-16px body text

```css
/* Base mobile styles (no media query needed) */
.component {
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column; /* Stack vertically */
  gap: 16px;
}
```

**Mobile Landscape (640px - 767px):**

- **Devices:** Phones in landscape, small tablets
- **Strategy:** Optional 2-column layouts, slightly larger spacing
- **Font Size:** 15px body text

```css
@media (min-width: 640px) {
  .component {
    font-size: 15px;
    padding: 20px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns possible */
  }
}
```

**Tablet Portrait (768px - 1023px):**

- **Devices:** iPads, Android tablets (portrait)
- **Strategy:** 2-3 column layouts, sidebars appear, richer UI
- **Font Size:** 16px body text

```css
@media (min-width: 768px) {
  .component {
    font-size: 16px;
    padding: 24px;
  }

  .layout {
    display: grid;
    grid-template-columns: 250px 1fr; /* Sidebar + main */
  }
}
```

**Desktop / Tablet Landscape (1024px - 1279px):**

- **Devices:** Laptops, desktops, tablets (landscape)
- **Strategy:** Multi-column layouts, hover states, keyboard shortcuts
- **Font Size:** 16-18px body text

```css
@media (min-width: 1024px) {
  .component {
    font-size: 16px;
    padding: 32px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
  }

  .button:hover {
    background: var(--hover-color); /* Hover states */
  }
}
```

**Large Desktop (1280px - 1535px):**

- **Devices:** Standard monitors, HD displays
- **Strategy:** Max-width containers, generous spacing, enhanced visuals
- **Font Size:** 16-18px body text

```css
@media (min-width: 1280px) {
  .container {
    max-width: var(--lufa-core-layout-container-xl);
    margin-inline: auto;
  }

  .grid {
    gap: var(--lufa-core-layout-grid-gap-spacious); /* More space */
  }
}
```

**Ultra-Wide (1536px+):**

- **Devices:** 4K monitors, ultra-wide displays
- **Strategy:** Optional enhancements, prevent excessive line lengths
- **Font Size:** 16-20px body text

```css
@media (min-width: 1536px) {
  .container {
    max-width: var(--lufa-core-layout-container-2xl);
  }

  .grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columns possible */
  }
}
```

---

## Breakpoint Usage Patterns

### Pattern 1: Two-Breakpoint Strategy (Common)

Most layouts only need 2 breakpoints: **mobile** and **desktop**.

```css
/* Mobile (default) */
.card {
  padding: 16px;
  font-size: 14px;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column */
  gap: 16px;
}

/* Desktop (768px+) */
@media (min-width: 768px) {
  .card {
    padding: 24px;
    font-size: 16px;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* Two columns */
    gap: 24px;
  }
}
```

**When to use:**

- Simple layouts
- Marketing pages
- Blog posts
- Small applications

---

### Pattern 2: Three-Breakpoint Strategy (Recommended)

For richer experiences, add tablet-specific styles:

```css
/* Mobile (default) */
.navigation {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .navigation {
    flex-direction: row;
    justify-content: space-between;
    padding: 24px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .navigation {
    padding: 32px;
    max-width: var(--lufa-core-layout-container-xl);
    margin-inline: auto;
  }
}
```

**When to use:**

- Complex applications
- Dashboards
- E-commerce sites
- Content-heavy sites

---

### Pattern 3: Four+ Breakpoint Strategy (Advanced)

For design-focused or complex layouts:

```css
/* Mobile Portrait */
.hero {
  padding: 32px 16px;
  font-size: 24px;
}

/* Mobile Landscape (640px+) */
@media (min-width: 640px) {
  .hero {
    padding: 40px 20px;
    font-size: 28px;
  }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .hero {
    padding: 64px 32px;
    font-size: 36px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .hero {
    padding: 80px 48px;
    font-size: 48px;
  }
}

/* Large Desktop (1280px+) */
@media (min-width: 1280px) {
  .hero {
    padding: 96px 64px;
    font-size: 56px;
    max-width: var(--lufa-core-layout-container-xl);
    margin-inline: auto;
  }
}
```

**When to use:**

- Hero sections
- Landing pages
- Brand websites
- Design showcases

---

## Responsive Token Patterns

### Automatic Responsiveness (Easiest)

Use responsive tokens for automatic breakpoint adaptation:

```css
/* Single token, automatic media queries */
.page {
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet (768px): 24px, Desktop (1024px): 32px */
}

.section {
  margin-bottom: var(--lufa-core-layout-section-gap);
  /* Mobile: 48px, Tablet: 64px, Desktop: 80px */
}
```

**Behind the scenes (automatically generated):**

```css
:root {
  --lufa-core-layout-page-padding: 16px;
}

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

**Available responsive tokens:**

- `page-padding` (16px → 24px → 32px)
- `section-gap` (48px → 64px → 80px)
- `container-gutter` (16px → 24px → 32px)
- `grid-gap` (16px → 24px → 32px)
- `header-height` (56px → 64px → 64px)
- `modal-padding` (24px → 32px → 40px)

---

### Manual Responsiveness (Full Control)

Write your own media queries when you need custom breakpoints:

```css
.custom-component {
  /* Mobile */
  padding: 12px;
  font-size: 14px;
}

@media (min-width: 768px) {
  .custom-component {
    /* Tablet: custom values */
    padding: 20px;
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .custom-component {
    /* Desktop: custom values */
    padding: 28px;
    font-size: 18px;
  }
}
```

**When to use manual:**

- Custom breakpoint logic
- Non-standard responsive behavior
- One-off components
- Design edge cases

---

### Fluid Responsiveness (Smooth Scaling)

Use fluid tokens for smooth viewport-based scaling without breakpoints:

```css
.hero {
  /* Smoothly scales from 32px to 80px based on viewport */
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
  /* clamp(32px, 6vw, 80px) */
}

.hero-content {
  /* Smooth gap scaling */
  margin-bottom: var(--lufa-core-layout-section-gap-fluid);
  /* clamp(48px, 8vw, 96px) */
}
```

**When to use fluid:**

- Hero sections
- Landing pages
- Large content areas
- Typography spacing

**Advantages:**

- No breakpoint jumps
- Smooth resizing experience
- Less CSS (no media queries)

**Disadvantages:**

- Less control at specific breakpoints
- Can feel "floaty" if overused
- Harder to debug spacing issues

---

## Common Responsive Patterns

### Pattern: Responsive Grid

```css
/* Mobile: Single column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--lufa-core-layout-grid-gap-default);
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large Desktop: 4 columns (optional) */
@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Pattern: Responsive Sidebar

```css
/* Mobile: Stacked layout */
.layout {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-core-layout-section-gap);
}

/* Desktop: Sidebar + main */
@media (min-width: 1024px) {
  .layout {
    flex-direction: row;
    gap: var(--lufa-core-layout-grid-gap-default);
  }

  .sidebar {
    width: 280px;
    flex-shrink: 0;
  }

  .main {
    flex: 1;
  }
}
```

### Pattern: Responsive Typography

```css
/* Mobile */
.heading-large {
  font-size: 28px;
  line-height: 1.2;
  margin-bottom: var(--lufa-primitive-spacing-16);
}

/* Tablet */
@media (min-width: 768px) {
  .heading-large {
    font-size: 36px;
    line-height: 1.15;
    margin-bottom: var(--lufa-primitive-spacing-24);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .heading-large {
    font-size: 48px;
    line-height: 1.1;
    margin-bottom: var(--lufa-primitive-spacing-32);
  }
}
```

### Pattern: Responsive Navigation

```css
/* Mobile: Hamburger menu */
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--lufa-core-layout-header-height);
  padding-inline: var(--lufa-core-layout-page-padding);
}

.nav-menu {
  display: none; /* Hidden on mobile */
}

.nav-toggle {
  display: block; /* Hamburger icon */
}

/* Desktop: Full navigation */
@media (min-width: 1024px) {
  .nav-menu {
    display: flex;
    gap: var(--lufa-primitive-spacing-24);
  }

  .nav-toggle {
    display: none; /* Hide hamburger */
  }
}
```

### Pattern: Responsive Container

```css
.container {
  /* Center with max-width */
  margin-inline: auto;
  padding-inline: var(--lufa-core-layout-container-gutter);
  width: 100%;
}

/* Tablet: Set max-width */
@media (min-width: 768px) {
  .container {
    max-width: var(--lufa-core-layout-container-md);
  }
}

/* Desktop: Wider max-width */
@media (min-width: 1024px) {
  .container {
    max-width: var(--lufa-core-layout-container-xl);
  }
}
```

---

## Testing Responsive Layouts

### Browser DevTools Testing

**Chrome DevTools:**

1. Open DevTools (F12)
2. Click Device Toolbar icon (Ctrl+Shift+M / Cmd+Shift+M)
3. Select device or responsive mode
4. Test Lufa breakpoints:
   - 320px (mobile portrait)
   - 640px (mobile landscape)
   - 768px (tablet)
   - 1024px (desktop)
   - 1280px (large desktop)

**Firefox Responsive Design Mode:**

1. Open DevTools (F12)
2. Click Responsive Design Mode icon (Ctrl+Shift+M / Cmd+Shift+M)
3. Test breakpoints

**Safari Responsive Design Mode:**

1. Open Web Inspector (Cmd+Opt+I)
2. Click Responsive Design Mode icon
3. Test breakpoints

---

### Testing Checklist

**Visual Inspection:**

- [ ] Layout doesn't break at any viewport width
- [ ] Text remains readable (no overflow)
- [ ] Images scale appropriately
- [ ] Touch targets are 48px+ on mobile
- [ ] No horizontal scrollbars (except intentional)

**Breakpoint Testing:**

- [ ] **320px:** Mobile portrait baseline works
- [ ] **640px:** Mobile landscape adjustments apply
- [ ] **768px:** Tablet styles apply correctly
- [ ] **1024px:** Desktop layout appears
- [ ] **1280px:** Large desktop enhancements work
- [ ] **Between breakpoints:** No layout breaks (test 800px, 900px, etc.)

**Content Testing:**

- [ ] Long text wraps correctly
- [ ] Short text doesn't look lost in space
- [ ] Lists display properly
- [ ] Forms are usable
- [ ] Modals fit within viewport

**Interactive Testing:**

- [ ] Buttons are tappable on mobile (48px+ targets)
- [ ] Navigation works on all viewports
- [ ] Hover states work on desktop (but not required on mobile)
- [ ] Focus indicators visible on all devices
- [ ] Keyboard navigation works

**Performance Testing:**

- [ ] Page loads quickly on mobile (3G simulation)
- [ ] No layout shift (CLS) during resize
- [ ] Smooth transitions between breakpoints

---

### Common Responsive Issues

**Issue 1: Horizontal Scrollbar**

```css
/* ❌ Causes horizontal scroll */
.container {
  width: 1200px; /* Fixed width too large for mobile */
}

/* ✅ Responsive width */
.container {
  max-width: var(--lufa-core-layout-container-xl);
  width: 100%;
  padding-inline: var(--lufa-core-layout-page-padding);
}
```

**Issue 2: Text Overflow**

```css
/* ❌ Text overflows on small screens */
.heading {
  font-size: 48px;
  white-space: nowrap;
}

/* ✅ Responsive text that wraps */
.heading {
  font-size: clamp(24px, 5vw, 48px); /* Fluid */
  word-wrap: break-word;
}
```

**Issue 3: Tiny Touch Targets**

```css
/* ❌ Too small for mobile (< 48px) */
.button {
  height: 32px;
  padding-inline: 8px;
}

/* ✅ Touch-friendly on mobile */
.button {
  height: var(--lufa-primitive-height-48); /* 48px on mobile */
  padding-inline: var(--lufa-primitive-spacing-16);
}

@media (min-width: 1024px) {
  .button {
    height: var(--lufa-primitive-height-40); /* Can be smaller on desktop */
  }
}
```

**Issue 4: Missing Breakpoint**

```css
/* ❌ Missing tablet breakpoint creates jarring jump */
.grid {
  grid-template-columns: 1fr; /* Mobile */
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr); /* Desktop - too many columns! */
  }
}

/* ✅ Add tablet breakpoint for smooth progression */
.grid {
  grid-template-columns: 1fr; /* Mobile: 1 column */
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr); /* Desktop: 4 columns */
  }
}
```

---

## Best Practices

### ✅ DO

1. **Write mobile styles first (no media query)**

   ```css
   .component { padding: 16px; } /* Mobile base */
   @media (min-width: 768px) { ... } /* Then enhance */
   ```

2. **Use `min-width` media queries (mobile-first)**

   ```css
   @media (min-width: 768px) { ... } /* ✅ Mobile-first */
   ```

3. **Test at every breakpoint and in-between**
   - Test at 320px, 640px, 768px, 1024px, 1280px
   - Also test at 500px, 800px, 1100px (between breakpoints)

4. **Use responsive tokens for common patterns**

   ```css
   padding-inline: var(--lufa-core-layout-page-padding);
   ```

5. **Make touch targets 48px+ on mobile**
   ```css
   .button {
     min-height: 48px;
     min-width: 48px;
   }
   ```

### ❌ DON'T

1. **Don't use `max-width` media queries (desktop-first)**

   ```css
   @media (max-width: 768px) { ... } /* ❌ Desktop-first */
   ```

2. **Don't use pixel-perfect breakpoints for specific devices**

   ```css
   @media (width: 375px) { ... } /* ❌ iPhone-only */
   ```

3. **Don't forget to test between breakpoints**
   - Layouts should work at 800px, not just 768px and 1024px

4. **Don't hard-code viewport-specific values**

   ```css
   .mobile-only {
     padding: 16px;
   } /* ❌ Name assumes device */
   .tablet-padding {
     padding: 24px;
   } /* ❌ Device-specific */
   ```

5. **Don't rely on hover states for critical interactions on mobile**

   ```css
   /* ❌ Hover-only interaction (won't work on touch) */
   .dropdown:hover .menu {
     display: block;
   }

   /* ✅ Click/tap interaction */
   .dropdown[aria-expanded='true'] .menu {
     display: block;
   }
   ```

---

## Advanced Techniques

### Container Queries (Future)

Container queries allow components to respond to their container size instead of viewport size. This is planned for Phase 3 (2027+).

**Future syntax:**

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Current workaround:** Use responsive tokens and grid auto-fit:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--lufa-core-layout-grid-min-column-width), 1fr));
  gap: var(--lufa-core-layout-grid-gap-default);
}
```

---

### Combining Responsive + Fluid

Mix responsive tokens (breakpoint-based) with fluid tokens (viewport-based):

```css
.hero {
  /* Fluid vertical padding (smooth) */
  padding-block: var(--lufa-core-layout-hero-padding-fluid);

  /* Responsive horizontal padding (breakpoint-based) */
  padding-inline: var(--lufa-core-layout-page-padding);

  /* Fluid gap */
  gap: var(--lufa-core-layout-section-gap-fluid);
}
```

---

## Resources

- [Token Usage Guide](./token-usage-guide.md) - Comprehensive token documentation
- [Migration Guide](./migration-guide.md) - Upgrading to v0.8.0
- [Technical Specification](../planning/technical-spec-spacing-layout.md) - Architecture details
- [ADR-005: Breakpoint Token Strategy](../../adrs/ADR-005-IMPLEMENTED-breakpoint-token-strategy.md)
- [ADR-006: Responsive Spacing Architecture](../../adrs/ADR-006-IMPLEMENTED-responsive-spacing-architecture.md)
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev: Responsive Design](https://web.dev/responsive-web-design-basics/)

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-26  
**Maintained By:** Design System Team
