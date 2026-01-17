---
description: 'Tailwind CSS development standards and best practices'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts, **/*.html, **/*.css, tailwind.config.*'
archived: true
archived_reason: 'Lufa Design System migrated from Tailwind CSS to vanilla CSS with CSS Modules (January 2026)'
---

# ⚠️ ARCHIVED DOCUMENTATION

**This file is no longer actively maintained.**

- **Archived Date**: January 2026
- **Reason**: Lufa Design System migrated from Tailwind CSS to vanilla CSS with CSS Modules
- **Replacement**: Use CSS Modules with token-based styling (see `lufa-design-system.instructions.md`)

The content below is preserved for historical reference only.

---

# Tailwind CSS Development Instructions

Instructions for implementing utility-first CSS with Tailwind CSS following modern best practices and the official documentation at https://tailwindcss.com.

## Project Context

- Latest Tailwind CSS version (v3+)
- Utility-first approach with component-based patterns
- JIT (Just-in-Time) mode for optimal performance
- Proper configuration for design tokens and theme customization
- PostCSS integration for processing
- Responsive and mobile-first design principles

## Development Standards

### Architecture

- Use utility classes as the primary styling method
- Extract component patterns when styles are repeated extensively
- Organize custom utilities in the Tailwind configuration
- Implement proper layer organization (@layer base, components, utilities)
- Use @apply sparingly and only for component extraction
- Leverage Tailwind plugins for extended functionality

### Configuration

- Define design tokens in `tailwind.config.js/ts` (colors, spacing, fonts)
- Configure content paths correctly to enable proper purging
- Set up custom breakpoints matching design system requirements
- Implement theme extensions for brand-specific values
- Use safelist for dynamically generated classes
- Configure proper dark mode strategy (class or media)

### Component Design

- Apply mobile-first responsive design with breakpoint prefixes (sm:, md:, lg:)
- Use semantic color names from the design system
- Implement consistent spacing using Tailwind's scale
- Leverage state variants (hover:, focus:, active:, disabled:)
- Use group and peer utilities for parent/sibling state styling
- Apply arbitrary values with square brackets sparingly

### Utility Usage

- Compose utilities for layout (flex, grid, container)
- Use spacing utilities consistently (p-, m-, gap-, space-)
- Apply typography utilities (text-, font-, leading-, tracking-)
- Implement borders and shadows using design tokens
- Use transforms and transitions for animations
- Apply filters and backdrop filters when needed

### Best Practices

- Keep HTML semantic and clean with logical utility groupings
- Order utilities consistently (layout → spacing → typography → visual)
- Use @layer directive for custom CSS organization
- Avoid deep CSS specificity conflicts
- Implement reusable component classes for complex patterns
- Use Tailwind's built-in screen reader utilities for accessibility

### Dark Mode

- Implement dark mode using the `dark:` variant
- Define dark mode colors in the theme configuration
- Use CSS variables for colors that change between themes
- Test all components in both light and dark modes
- Provide user preference detection and manual toggle support

### Performance

- Enable JIT mode for optimal build performance
- Configure content paths to minimize CSS output
- Use purge/content configuration properly in production
- Avoid unnecessary arbitrary values that inflate bundle size
- Implement proper caching strategies
- Use CDN only for prototyping, not production

### Responsive Design

- Start with mobile layout and enhance for larger screens
- Use responsive variants consistently (sm:, md:, lg:, xl:, 2xl:)
- Implement container queries with @tailwindcss/container-queries plugin
- Test layouts across all defined breakpoints
- Use aspect-ratio utilities for responsive media
- Implement responsive typography with fluid scaling

### Custom Patterns

- Create plugin functions for complex reusable utilities
- Use CSS variables with Tailwind for dynamic theming
- Implement custom variants for specific use cases
- Extend color palette with semantic naming
- Define custom spacing scales when needed
- Create component variants using Tailwind config

### Integration with Frameworks

- Use dedicated Tailwind plugins for frameworks (e.g., @tailwindcss/forms)
- Integrate with CSS-in-JS solutions carefully
- Configure PostCSS properly in build pipeline
- Handle SSR/SSG scenarios with proper class generation
- Use framework-specific Tailwind integrations when available
- Test hot module replacement works correctly

### Accessibility

- Use sr-only for screen reader-only content
- Implement focus-visible states consistently
- Ensure color contrast meets WCAG standards
- Use accessible color combinations from theme
- Add focus rings with focus-visible: utilities
- Test keyboard navigation with Tailwind utilities

### Code Organization

- Group related utilities together in JSX/HTML
- Use clsx or similar for conditional class application
- Extract complex utility combinations to component classes
- Document custom utilities and plugins
- Maintain consistent formatting of class strings
- Use IDE plugins for IntelliSense and linting

### Testing

- Test component rendering with all utility combinations
- Verify responsive behavior at all breakpoints
- Check dark mode implementation
- Validate purged CSS includes all used classes
- Test custom plugins and utilities
- Ensure performance meets requirements

## Anti-patterns to Avoid

- Don't use inline styles when Tailwind utilities exist
- Avoid @apply for simple one-off utilities
- Don't create utility classes that duplicate Tailwind's
- Avoid !important unless absolutely necessary
- Don't ignore the design system by using arbitrary values excessively
- Avoid mixing Tailwind with large amounts of custom CSS
- Don't forget to configure content paths for dynamic classes
- Avoid using deprecated class names from older versions

## Example Patterns

### Component with Utilities

```jsx
// Good: Semantic grouping and mobile-first
<button
  className="
  flex items-center justify-center gap-2
  px-4 py-2 rounded-lg
  text-sm font-medium text-white
  bg-blue-600 hover:bg-blue-700
  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors duration-200
"
>
  Submit
</button>
```

### Responsive Layout

```jsx
// Good: Mobile-first responsive grid
<div
  className="
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
  p-4 sm:p-6 lg:p-8
"
>
  {/* Grid items */}
</div>
```

### Custom Plugin

```js
// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      });
    }),
  ],
};
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Headless UI for Tailwind](https://headlessui.com/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## Related Documentation

For comprehensive project documentation, see:

- **[AGENTS.md](../../../AGENTS.md)** - Complete development guide
  - Project overview and architecture
  - Setup and development workflow
  - Code patterns and examples
  - Troubleshooting guides

- **[CLAUDE.md](../../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/copilot-instructions.md](../../copilot-instructions.md)** - GitHub Copilot instructions
- **[CONTRIBUTING.md](../../../CONTRIBUTING.md)** - Contribution workflow

**This file is automatically applied by GitHub Copilot when working in matching file paths.**
