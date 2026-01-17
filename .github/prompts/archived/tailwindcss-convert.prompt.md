---
agent: agent
description: 'Convert CSS/inline styles to Tailwind CSS utilities following best practices'
tools:
  [
    'search/changes',
    'search/codebase',
    'edit/editFiles',
    'web/fetch',
    'read/problems',
    'execute/getTerminalOutput',
    'execute/runInTerminal',
    'read/terminalLastCommand',
    'read/terminalSelection',
    'search',
    'search/searchResults',
  ]
model: 'Claude Sonnet 4.5'
archived: true
archived_reason: 'No longer relevant for Lufa Design System after Tailwind CSS removal (January 2026)'
---

# ⚠️ ARCHIVED PROMPT

**This prompt is no longer actively maintained.**

- **Archived Date**: January 2026
- **Reason**: No longer relevant for Lufa Design System after Tailwind CSS removal
- **Replacement**: Use CSS Modules with token-based styling (see `lufa-design-system.instructions.md`)

The content below is preserved for historical reference only.

---

# Convert to Tailwind CSS

Convert custom CSS, inline styles, or other CSS frameworks to Tailwind CSS utilities while maintaining design consistency and improving maintainability.

## Objective

Transform existing styling implementations to use Tailwind CSS utility-first approach, ensuring:

- Design consistency with Tailwind's design system
- Mobile-first responsive implementation
- Proper use of theme values and design tokens
- Accessibility best practices
- Performance optimization

## Process

### 1. Analyze Current Implementation

**Identify Styling Patterns**

- Search for inline styles in components
- Find custom CSS classes and stylesheets
- Identify repeated styling patterns
- Check for CSS-in-JS implementations
- Review responsive breakpoints used

**Assess Complexity**

- Evaluate which styles can be directly converted
- Identify complex patterns needing custom utilities
- Note any framework-specific classes to convert
- Check for animations and transitions
- Review dark mode implementations

### 2. Plan Tailwind Configuration

**Setup Required Configuration**

- Determine custom colors needed for theme
- Define spacing values if non-standard
- Configure typography settings
- Set up custom breakpoints if needed
- Plan dark mode strategy

**Example Configuration Check**

```js
// Check if tailwind.config.js needs updates
// - Custom brand colors
// - Extended spacing scale
// - Custom fonts
// - Plugins needed (@tailwindcss/forms, @tailwindcss/typography)
```

### 3. Convert Styles Systematically

**Component-by-Component Conversion**

- Start with simpler components
- Convert layout utilities first (flex, grid)
- Add spacing utilities (padding, margin)
- Apply typography utilities
- Add visual utilities (colors, borders, shadows)
- Implement state variants (hover, focus, active)
- Add responsive variants

**Conversion Examples**

```jsx
// Before: Inline styles
<div style={{
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
}}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
    Title
  </h2>
  <p style={{ color: '#666666', lineHeight: '1.5' }}>
    Content
  </p>
</div>

// After: Tailwind utilities
<div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-4">
    Title
  </h2>
  <p className="text-gray-600 leading-relaxed">
    Content
  </p>
</div>
```

```css
/* Before: Custom CSS */
.card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px;
  background-color: #f9fafb;
}

.card:hover {
  background-color: #f3f4f6;
}

@media (max-width: 768px) {
  .card {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}
```

```jsx
// After: Tailwind utilities
<div className="
  grid grid-cols-1 md:grid-cols-3 gap-6
  p-4 md:p-8
  bg-gray-50 hover:bg-gray-100
  transition-colors
">
```

### 4. Extract Reusable Patterns

**Create Component Classes**

- Identify utility combinations used 3+ times
- Extract to @layer components
- Document in component library
- Use clsx/classnames for conditional classes

```css
/* tailwind.css - Extract repeated patterns */
@layer components {
  .btn {
    @apply px-4 py-2 font-medium rounded-lg transition-colors;
    @apply focus:outline-none focus-visible:ring-2;
  }

  .btn-primary {
    @apply btn bg-blue-600 text-white;
    @apply hover:bg-blue-700;
    @apply focus-visible:ring-blue-500;
  }

  .card {
    @apply p-6 bg-white rounded-lg shadow-md;
    @apply hover:shadow-lg transition-shadow;
  }
}
```

### 5. Implement Responsive Design

**Mobile-First Approach**

- Start with mobile layout
- Add breakpoint prefixes (sm:, md:, lg:, xl:)
- Test at all breakpoints
- Ensure touch targets are adequate
- Optimize typography scaling

```jsx
<div
  className="
  flex flex-col lg:flex-row
  gap-4 lg:gap-8
  p-4 sm:p-6 lg:p-8
"
>
  <aside className="w-full lg:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

### 6. Add Dark Mode Support

**Implement Dark Variants**

- Configure dark mode in tailwind.config.js
- Add dark: prefixes to components
- Test contrast and readability
- Provide theme toggle if needed

```jsx
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border border-gray-200 dark:border-gray-700
">
```

### 7. Enhance Accessibility

**Add Accessible States**

- Implement focus-visible states
- Ensure color contrast meets WCAG standards
- Add sr-only for screen reader content
- Test keyboard navigation

```jsx
<button
  className="
  px-6 py-3 text-white bg-blue-600 rounded-lg
  hover:bg-blue-700
  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors
  aria-label='Submit form'
"
>
  Submit
</button>
```

### 8. Optimize and Clean Up

**Final Optimization**

- Remove old CSS files if no longer needed
- Update content paths in tailwind.config.js
- Verify no unused classes
- Check bundle size impact
- Test rendering performance

```js
// tailwind.config.js - Ensure proper content configuration
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Custom colors
      },
    },
  },
  plugins: [],
};
```

## Validation Checklist

**Before Completing Conversion**

- [ ] All inline styles converted to utilities
- [ ] Custom CSS classes replaced or extracted appropriately
- [ ] Design tokens used instead of hard-coded values
- [ ] Responsive design implemented mobile-first
- [ ] Dark mode support added where applicable
- [ ] Accessibility requirements met (focus states, contrast)
- [ ] Repeated patterns extracted to component classes
- [ ] Tailwind config updated with necessary customizations
- [ ] Content paths configured correctly for purging
- [ ] Visual regression testing passed (if applicable)
- [ ] Performance impact assessed and optimized
- [ ] Documentation updated with new utility patterns

## Common Conversions

### Colors

```
#ffffff → bg-white
#000000 → bg-black
#3b82f6 → bg-blue-500
#10b981 → bg-green-500
rgb(239, 68, 68) → bg-red-500
```

### Spacing

```
padding: 8px → p-2
padding: 16px → p-4
margin: 24px → m-6
gap: 32px → gap-8
```

### Typography

```
font-size: 14px → text-sm
font-size: 16px → text-base
font-size: 24px → text-2xl
font-weight: 600 → font-semibold
font-weight: 700 → font-bold
```

### Layout

```
display: flex → flex
flex-direction: column → flex-col
justify-content: center → justify-center
align-items: center → items-center
display: grid → grid
grid-template-columns: repeat(3, 1fr) → grid-cols-3
```

### Effects

```
border-radius: 8px → rounded-lg
box-shadow: 0 1px 3px rgba(0,0,0,0.1) → shadow-md
opacity: 0.5 → opacity-50
transition: all 0.3s → transition-all duration-300
```

## Best Practices

- Use semantic utility combinations
- Group related utilities together in className
- Order utilities logically (layout → spacing → typography → visual)
- Extract patterns that repeat 3+ times
- Leverage Tailwind's design system (colors, spacing)
- Always test responsive behavior
- Verify accessibility of converted components
- Document custom utilities and plugins

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Converting to Tailwind CSS Guide](https://tailwindcss.com/docs/reusing-styles)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/utility-first)
- [Tailwind UI Examples](https://tailwindui.com/components)
