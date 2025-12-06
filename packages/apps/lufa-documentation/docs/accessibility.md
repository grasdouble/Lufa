# Accessibility

Lufa Design System is built with accessibility as a core principle. All components follow WAI-ARIA guidelines and are tested to ensure they work well with assistive technologies.

## Core Principles

### Semantic HTML

All components use semantic HTML elements to provide meaningful structure for screen readers and other assistive technologies.

### Keyboard Navigation

Every interactive component is fully keyboard accessible:

- **Tab** - Navigate between focusable elements
- **Enter/Space** - Activate buttons and interactive elements
- **Escape** - Close modals, dropdowns, and overlays
- **Arrow keys** - Navigate within component groups

### Focus Management

- Clear, visible focus indicators on all interactive elements
- Focus is automatically managed in modals and dialogs
- Focus traps prevent keyboard users from leaving modal contexts

### Color Contrast

All color combinations in the design system meet WCAG 2.1 AA standards:

- Normal text: minimum 4.5:1 contrast ratio
- Large text (18pt+): minimum 3:1 contrast ratio
- Interactive elements: minimum 3:1 contrast ratio

## Component-Specific Features

### Button

- Proper semantic `<button>` elements
- Clear focus states with `focus-visible` styling
- Loading states announced to screen readers
- Icon buttons include `aria-label` for context

### Typography

- Heading hierarchy (h1-h6) for proper document structure
- Responsive font sizes maintain readability
- Line height optimized for readability (1.5 for body text)

### Modal

- Focus trap keeps keyboard users within the modal
- `aria-modal` and `role="dialog"` for proper announcement
- Escape key closes the modal
- Focus returns to trigger element on close
- Body scroll locked when modal is open

### Form Components

- Proper label associations with form controls
- Error messages linked with `aria-describedby`
- Required fields indicated with `aria-required`
- Invalid states announced with `aria-invalid`

### Card

- Semantic article/section elements where appropriate
- Clickable cards have proper link/button semantics
- Images include alt text requirements

### Alert

- Uses `role="alert"` or `role="status"` for announcements
- Different severity levels conveyed through icons and text, not just color
- Dismissible alerts are keyboard accessible

### Badge

- Decorative badges use `aria-hidden` when content is redundant
- Status badges include `aria-label` when needed for context

## Dark Mode Accessibility

Our dark mode implementation maintains accessibility:

- Contrast ratios are validated in both light and dark themes
- Color tokens automatically adjust to maintain WCAG compliance
- Users can override system preferences

## Testing for Accessibility

### Screen Reader Testing

Components have been tested with:

- **macOS**: VoiceOver
- **Windows**: NVDA, JAWS
- **Mobile**: TalkBack (Android), VoiceOver (iOS)

### Keyboard Testing

All components pass keyboard-only navigation tests:

- All interactive elements are reachable via keyboard
- Focus order follows logical visual order
- No keyboard traps (except intentional focus traps in modals)

### Automated Testing

We use automated tools as a first line of defense:

- ESLint plugin for JSX accessibility (`eslint-plugin-jsx-a11y`)
- Axe DevTools for runtime accessibility checking
- Lighthouse accessibility audits

## Best Practices

### When Using Lufa Components

1. **Provide meaningful labels**

   ```tsx
   <Button aria-label="Close notification">
     <Icon name="close" />
   </Button>
   ```

2. **Use semantic HTML structure**

   ```tsx
   <main>
     <Typography variant="h1">Page Title</Typography>
     <section>
       <Typography variant="h2">Section Title</Typography>
       {/* content */}
     </section>
   </main>
   ```

3. **Include alt text for images**

   ```tsx
   <img src="logo.png" alt="Lufa Design System" />
   ```

4. **Handle loading and error states**

   ```tsx
   <Button loading loadingText="Saving...">
     Save Changes
   </Button>
   ```

5. **Provide context for icon-only buttons**
   ```tsx
   <Button variant="ghost" aria-label="Edit profile">
     <Icon name="edit" />
   </Button>
   ```

## CSS Variable Theming

All design tokens use CSS variables with the `--lufa-` prefix, making it easy to override values while maintaining accessibility:

```css
:root {
  /* Ensure sufficient contrast when overriding colors */
  --lufa-color-text-primary: #1a1a1a;
  --lufa-color-background-primary: #ffffff;
}
```

## Resources

- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Inclusive Components](https://inclusive-components.design/)

## Reporting Accessibility Issues

If you discover an accessibility issue with any Lufa component, please [open an issue on GitHub](https://github.com/grasdouble/Lufa/issues) with:

- Component name and props used
- Description of the accessibility barrier
- Assistive technology and browser version (if applicable)
- Steps to reproduce

We treat accessibility issues as high priority and aim to address them quickly.
