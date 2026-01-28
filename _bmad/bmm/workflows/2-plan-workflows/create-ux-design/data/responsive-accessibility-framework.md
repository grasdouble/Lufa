# Responsive Design & Accessibility Framework

## Purpose

This document provides a comprehensive framework for defining responsive design strategy and accessibility requirements for digital products. It covers responsive strategies for different devices, breakpoint planning, WCAG compliance levels, testing strategies, and implementation guidelines.

---

## 1. Responsive Strategy

### Desktop Strategy

Define how to use extra screen real estate effectively:

**Key Questions:**

- How should we use extra screen real estate?
- Multi-column layouts, side navigation, or content density?
- What desktop-specific features can we include?

**Common Approaches:**

- **Multi-column layouts:** Content spreads across multiple columns
- **Side navigation:** Persistent sidebar for easy navigation
- **Increased content density:** Show more information per screen
- **Desktop-specific features:** Advanced filtering, batch operations, keyboard shortcuts

### Tablet Strategy

Define how to optimize for tablets (touch + larger screens):

**Key Questions:**

- Should we use simplified layouts or touch-optimized interfaces?
- How do gestures and touch interactions work on tablets?
- What's the optimal information density for tablet screens?

**Common Approaches:**

- **Simplified layouts:** Fewer columns than desktop, more than mobile
- **Touch-optimized UI:** Larger touch targets, swipe gestures
- **Adaptive navigation:** Collapsible sidebars or bottom sheets
- **Moderate density:** Balance between mobile and desktop

### Mobile Strategy

Define mobile-first approach and priorities:

**Key Questions:**

- Bottom navigation or hamburger menu?
- How do layouts collapse on small screens?
- What's the most critical information to show mobile-first?

**Common Approaches:**

- **Bottom navigation:** Easy thumb access on large phones
- **Hamburger menu:** Saves screen space, common pattern
- **Single-column layouts:** Stack all content vertically
- **Priority content first:** Most important info at top
- **Thumb-friendly interactions:** Bottom sheet menus, FABs

---

## 2. Breakpoint Strategy

### Common Breakpoints

**Standard breakpoint ranges:**

- **Mobile:** 320px - 767px (phones)
- **Tablet:** 768px - 1023px (tablets, small laptops)
- **Desktop:** 1024px+ (laptops, desktops, large screens)

### Mobile-First vs Desktop-First

**Mobile-First Approach:**

```css
/* Base styles for mobile */
.component { ... }

/* Tablet and up */
@media (min-width: 768px) { ... }

/* Desktop and up */
@media (min-width: 1024px) { ... }
```

**Desktop-First Approach:**

```css
/* Base styles for desktop */
.component { ... }

/* Tablet and down */
@media (max-width: 1023px) { ... }

/* Mobile and down */
@media (max-width: 767px) { ... }
```

**Recommendation:** Mobile-first is preferred for modern web development.

### Custom Breakpoints

Consider custom breakpoints for:

- **Specific device targets:** iPad Pro, large phones
- **Content-based breakpoints:** Where content naturally breaks
- **Feature-specific breakpoints:** Complex tables, dashboards

---

## 3. Accessibility Strategy

### WCAG Compliance Levels

**Level A (Basic):**

- Essential accessibility for legal compliance
- Basic keyboard navigation
- Text alternatives for non-text content
- Minimum color contrast (3:1 for large text)

**Level AA (Recommended - Industry Standard):**

- Good user experience for people with disabilities
- Enhanced keyboard navigation
- Color contrast ratio 4.5:1 for normal text, 3:1 for large text
- Captions for pre-recorded audio/video
- Resize text up to 200% without loss of functionality

**Level AAA (Highest):**

- Exceptional accessibility (rarely needed for most products)
- Color contrast ratio 7:1 for normal text, 4.5:1 for large text
- Sign language interpretation for pre-recorded audio
- Extended audio descriptions for video

**Recommendation:** Target Level AA for most products.

### Key Accessibility Considerations

**Color Contrast:**

- **Normal text:** 4.5:1 contrast ratio minimum (AA)
- **Large text (18pt+ or 14pt+ bold):** 3:1 contrast ratio minimum (AA)
- **Interactive elements:** 3:1 contrast ratio for focus indicators

**Keyboard Navigation:**

- All interactive elements keyboard-accessible
- Logical tab order (follows visual layout)
- Visible focus indicators on all focusable elements
- Keyboard shortcuts for common actions
- Skip links to bypass repetitive content

**Screen Reader Compatibility:**

- Semantic HTML structure (headings, landmarks, lists)
- ARIA labels and roles where semantic HTML insufficient
- Alternative text for images
- Form labels properly associated with inputs
- Error messages announced to screen readers

**Touch Target Sizes:**

- **Minimum size:** 44x44px (WCAG AA)
- **Recommended size:** 48x48px or larger
- **Spacing:** Adequate spacing between touch targets

**Focus Indicators:**

- Visible on all interactive elements
- High contrast with background
- Cannot be removed without replacement
- Persistent during interaction

---

## 4. Testing Strategy

### Responsive Testing

**Device Testing:**

- Test on actual phones (iPhone, Android)
- Test on actual tablets (iPad, Android tablets)
- Test on different screen sizes (small phones, phablets, large tablets)
- Test on different operating systems (iOS, Android, Windows, macOS)

**Browser Testing:**

- **Desktop:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile:** iOS Safari, Chrome Mobile, Firefox Mobile
- **Testing tools:** BrowserStack, Sauce Labs, LambdaTest

**Network Performance Testing:**

- Test on slow 3G/4G connections
- Test with throttled network in DevTools
- Measure Time to Interactive (TTI), First Contentful Paint (FCP)
- Optimize for real-world mobile network conditions

### Accessibility Testing

**Automated Testing:**

- **Tools:** axe DevTools, WAVE, Lighthouse, Pa11y
- Run automated scans on every page/view
- Integrate into CI/CD pipeline
- Fix all critical and serious issues

**Screen Reader Testing:**

- **macOS:** VoiceOver (built-in)
- **Windows:** NVDA (free), JAWS (paid)
- **Mobile:** iOS VoiceOver, Android TalkBack
- Test navigation, form submission, content reading

**Keyboard-Only Navigation Testing:**

- Unplug mouse, use keyboard only
- Tab through all interactive elements
- Verify focus indicators visible
- Test keyboard shortcuts
- Ensure no keyboard traps

**Color Blindness Simulation:**

- **Tools:** Color Oracle, Sim Daltonism, Chrome DevTools
- Test for protanopia (red-blind)
- Test for deuteranopia (green-blind)
- Test for tritanopia (blue-blind)
- Test for achromatopsia (total color blindness)

### User Testing

**Include Users with Disabilities:**

- Recruit participants with various disabilities
- Test with users who rely on assistive technologies
- Observe real-world usage patterns
- Gather feedback on pain points

**Diverse Assistive Technologies:**

- Screen readers (various brands/versions)
- Screen magnifiers
- Switch access devices
- Voice control
- Alternative input devices

**Target Device Testing:**

- Test on actual devices users will use
- Consider older devices (not just latest models)
- Test in various lighting conditions
- Test with gloves (outdoor/industrial use cases)

---

## 5. Implementation Guidelines

### Responsive Development

**Use Relative Units:**

```css
/* ✅ GOOD - Relative units */
font-size: 1rem;
padding: 2%;
width: 100%;
max-width: 60ch;

/* ❌ BAD - Fixed pixels */
font-size: 16px;
padding: 20px;
width: 800px;
```

**Mobile-First Media Queries:**

```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

**Touch Targets and Gesture Areas:**

```css
/* Ensure minimum touch target size */
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 16px;
}

/* Add padding around interactive elements */
.nav-item {
  padding: 8px; /* Space between touch targets */
}
```

**Optimize Images and Assets:**

- Use responsive images with `<picture>` and `srcset`
- Serve appropriately sized images for device
- Use WebP format with fallbacks
- Lazy load images below the fold
- Consider art direction for different screen sizes

### Accessibility Development

**Semantic HTML Structure:**

```html
<!-- ✅ GOOD - Semantic HTML -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Page Title</h1>
    <p>Content...</p>
  </article>
</main>
<footer>...</footer>

<!-- ❌ BAD - Div soup -->
<div class="header">
  <div class="nav">
    <div><a href="/">Home</a></div>
  </div>
</div>
```

**ARIA Labels and Roles:**

```html
<!-- When semantic HTML is insufficient -->
<button aria-label="Close dialog" aria-pressed="false">
  <span aria-hidden="true">×</span>
</button>

<!-- Landmarks for screen readers -->
<div role="search">
  <input type="search" aria-label="Search products" />
</div>
```

**Keyboard Navigation Implementation:**

```javascript
// Ensure keyboard events are handled
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
});

// Manage focus for dynamic content
dialog.addEventListener('open', () => {
  const firstFocusable = dialog.querySelector('button');
  firstFocusable.focus();
});
```

**Focus Management and Skip Links:**

```html
<!-- Skip to main content link -->
<a href="#main-content" class="skip-link"> Skip to main content </a>

<!-- Focus management for dialogs -->
<dialog id="modal" role="dialog" aria-modal="true">
  <h2 id="modal-title">Confirm Action</h2>
  <button>Cancel</button>
  <button>Confirm</button>
</dialog>
```

**High Contrast Mode Support:**

```css
/* Support Windows High Contrast Mode */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}

/* Support forced colors */
@media (forced-colors: active) {
  .custom-checkbox {
    forced-color-adjust: none;
    border: 1px solid CanvasText;
  }
}
```

---

## Summary Checklist

Before finalizing responsive and accessibility strategy, verify:

- [ ] Responsive strategy defined for Desktop, Tablet, Mobile
- [ ] Breakpoint strategy established (mobile-first recommended)
- [ ] WCAG compliance level determined (AA recommended)
- [ ] Touch target sizes meet minimum requirements (44x44px)
- [ ] Color contrast ratios meet WCAG standards
- [ ] Keyboard navigation fully supported
- [ ] Screen reader compatibility ensured
- [ ] Testing strategy covers responsive, accessibility, and user testing
- [ ] Implementation guidelines provided to development team
- [ ] All guidelines actionable and specific

---

**Last Updated:** 2026-01-25  
**Version:** 1.0  
**Used By:** create-ux-design workflow, step-13-responsive-accessibility.md
