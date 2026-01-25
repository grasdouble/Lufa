---
sidebar_position: 10
---

# Accessibility

The Lufa Design System is built with accessibility as a core principle. All components meet or exceed WCAG 2.1 AA standards and follow best practices for inclusive design.

## Accessibility Standards

The design system adheres to:

- **WCAG 2.1 Level AA** - All components meet this standard by default
- **Section 508** - U.S. federal accessibility requirements
- **ARIA Authoring Practices** - Proper ARIA patterns and roles

## Core Principles

### 1. Semantic HTML

All components use proper semantic HTML elements:

```tsx
// ✅ Good - semantic elements
<Box as="section">
  <Stack as="nav">
    <Text as="h1">Page Title</Text>
  </Stack>
</Box>

// ❌ Bad - generic divs everywhere
<div>
  <div>
    <div>Page Title</div>
  </div>
</div>
```

### 2. Keyboard Navigation

All interactive components are keyboard accessible:

- **Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within composite widgets
- **Esc**: Close modals and overlays

### 3. Color Contrast

All color combinations meet WCAG 2.1 AA requirements:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio (18pt+ or 14pt+ bold)
- **UI components**: Minimum 3:1 contrast ratio for borders and icons

### 4. Screen Reader Support

Components provide clear context for screen readers:

- Descriptive labels and titles
- ARIA attributes where appropriate
- Visible and accessible focus indicators
- Proper heading hierarchy

## Component Accessibility Features

### Box Component

- Polymorphic `as` prop for semantic HTML
- Supports all ARIA attributes
- Maintains accessibility when used as button/link

```tsx
<Box as="article" aria-labelledby="title">
  <Text as="h2" id="title">
    Article Title
  </Text>
</Box>
```

### Stack Component

- Semantic element options (nav, section, ul)
- Proper list semantics when used as list container
- Keyboard navigation support

```tsx
<Stack as="nav" aria-label="Main navigation">
  <a href="/home">Home</a>
  <a href="/about">About</a>
</Stack>
```

### Text Component

- Semantic heading levels (h1-h6)
- Visual variant independent of semantic level
- Proper reading order

```tsx
<Text as="h1" variant="heading-4xl">Hero Title</Text>
<Text as="h2" variant="heading-xl">Section Title</Text>
<Text as="p" variant="body">Body text</Text>
```

### Icon Component

- Automatic ARIA handling
- Decorative icons: `aria-hidden="true"`
- Accessible icons: `role="img"` + `aria-label`

```tsx
// Decorative icon (default)
<Icon name="chevron-right" />

// Accessible icon with title
<Icon name="alert-circle" title="Error notification" />
```

## Testing for Accessibility

### Automated Testing

The design system includes automated accessibility tests:

```tsx
// Playwright component tests include a11y checks
test('should have accessible structure', async ({ mount }) => {
  const component = await mount(<Button>Click me</Button>);

  // Check ARIA attributes
  await expect(component).toHaveAttribute('role', 'button');
  await expect(component).toBeEnabled();

  // Check keyboard accessibility
  await component.focus();
  await expect(component).toBeFocused();
});
```

### Manual Testing Checklist

When using Lufa components:

- [ ] Test keyboard navigation (Tab, Enter, Escape, Arrows)
- [ ] Verify focus indicators are visible
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)
- [ ] Check color contrast with browser tools
- [ ] Verify text can be resized to 200%
- [ ] Test without mouse/trackpad
- [ ] Verify proper heading hierarchy

## Common Accessibility Patterns

### Forms

```tsx
<Stack spacing="compact" as="form">
  <Text as="label" htmlFor="email" variant="label">
    Email Address
  </Text>
  <Input id="email" type="email" aria-describedby="email-hint" required />
  <Text id="email-hint" variant="caption" color="muted">
    We'll never share your email.
  </Text>
</Stack>
```

### Navigation

```tsx
<Stack as="nav" aria-label="Main navigation" direction="horizontal">
  <a href="/" aria-current="page">
    Home
  </a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</Stack>
```

### Landmarks

```tsx
<Box as="header" role="banner">
  <Text as="h1">Site Title</Text>
</Box>

<Box as="main" role="main">
  <Text as="h2">Page Content</Text>
</Box>

<Box as="footer" role="contentinfo">
  <Text>Footer content</Text>
</Box>
```

### Skip Links

```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

<Box as="main" id="main-content" tabIndex={-1}>
  {/* Page content */}
</Box>
```

## ARIA Best Practices

### Use Semantic HTML First

```tsx
// ✅ Prefer semantic HTML
<button onClick={handleClick}>Click me</button>

// ❌ Avoid unnecessary ARIA
<div role="button" onClick={handleClick}>Click me</div>
```

### Label Interactive Elements

```tsx
// ✅ Visible label
<button>Submit Form</button>

// ✅ aria-label when no visible text
<button aria-label="Close dialog">
  <Icon name="x" />
</button>

// ❌ Icon without label
<button><Icon name="x" /></button>
```

### Provide Status Updates

```tsx
// Live region for dynamic content
<div role="status" aria-live="polite">
  {successMessage}
</div>

// Alert for errors
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

## Focus Management

### Visible Focus Indicators

All Lufa components have clear focus indicators:

```css
.button:focus-visible {
  outline: 2px solid var(--lufa-token-color-border-focus);
  outline-offset: 2px;
}
```

### Focus Trap

For modals and overlays:

```tsx
<Modal open={isOpen} onClose={handleClose}>
  {/* Focus is trapped within modal */}
  <button>First focusable</button>
  <button>Last focusable</button>
</Modal>
```

## Reduced Motion

Respect user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Resources

### Tools

- **[axe DevTools](https://www.deque.com/axe/devtools/)** - Automated accessibility testing
- **[WAVE](https://wave.webaim.org/)** - Web accessibility evaluation
- **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** - Built into Chrome DevTools
- **[Screen Readers](https://www.nvaccess.org/)** - NVDA (Windows), VoiceOver (Mac), JAWS

### Guidelines

- **[WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)** - Web Content Accessibility Guidelines
- **[ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)** - WAI-ARIA patterns
- **[MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)** - Comprehensive guide

### Learning

- **[WebAIM](https://webaim.org/)** - Web accessibility resources
- **[A11y Project](https://www.a11yproject.com/)** - Community-driven accessibility guide
- **[Inclusive Components](https://inclusive-components.design/)** - Accessible component patterns

## Next Steps

- [Component Overview](/docs/components/overview) - Explore accessible components
- [ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/) - Learn ARIA best practices
- [Testing Guide](/docs/guides/testing) - Test your implementations

:::tip Get Help
If you encounter accessibility issues or have questions, please [open an issue](https://github.com/grasdouble/Lufa/issues) on GitHub.
:::
