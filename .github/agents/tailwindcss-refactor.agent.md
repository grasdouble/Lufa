---
description: 'Refactor and optimize Tailwind CSS implementations following utility-first best practices and design system consistency.'
name: 'Dev - Tailwind CSS Refactor - Optimize & Standardize'
tools:
  [
    'edit/editFiles',
    'execute/runInTerminal',
    'execute/getTerminalOutput',
    'read/terminalLastCommand',
    'read/terminalSelection',
    'search/codebase',
    'search',
    'read/problems',
    'web/fetch',
  ]
---

# Tailwind CSS Refactor - Optimize & Standardize

Refactor CSS implementations to use Tailwind utilities effectively, ensure design system consistency, and optimize for performance and maintainability.

## Core Principles

### Utility-First Optimization

- **Replace custom CSS** - Convert inline styles and custom CSS to Tailwind utilities
- **Extract component patterns** - Identify repeated utility combinations and create component classes
- **Use design tokens** - Replace hard-coded values with theme tokens from config
- **Apply semantic classes** - Use meaningful utility combinations that reflect design intent
- **Leverage variants** - Implement responsive, state, and dark mode variants properly

### Design System Consistency

- **Standardize spacing** - Use consistent spacing scale from Tailwind config
- **Unify colors** - Replace color values with theme colors
- **Normalize typography** - Apply consistent font sizes, weights, and line heights
- **Consistent borders & shadows** - Use design system values for visual effects
- **Responsive patterns** - Apply mobile-first responsive design consistently

### Performance Optimization

- **Minimize arbitrary values** - Replace with theme values when possible
- **Optimize class order** - Group utilities logically for readability
- **Remove unused utilities** - Clean up redundant or conflicting classes
- **Proper content configuration** - Ensure all dynamic classes are safelisted
- **Bundle optimization** - Verify proper purging and tree-shaking

## Refactoring Process

### 1. Analysis Phase

**Audit Current Implementation**

- Identify inline styles and custom CSS that can use utilities
- Find repeated utility patterns that need extraction
- Check for inconsistent spacing, colors, and typography
- Review responsive implementations for mobile-first approach
- Identify accessibility issues with focus states and color contrast

**Assess Design System Usage**

- Verify color palette usage matches design system
- Check spacing scale consistency
- Review typography implementation
- Audit breakpoint usage
- Identify dark mode implementation gaps

### 2. Conversion Phase

**Convert to Tailwind Utilities**

- Replace inline styles with equivalent utilities
- Convert custom CSS classes to utility combinations
- Implement proper responsive variants
- Add state variants (hover, focus, active, disabled)
- Apply dark mode classes where needed

**Example Conversions**

```jsx
// Before: Inline styles
<div style={{ display: 'flex', padding: '16px', backgroundColor: '#3b82f6' }}>

// After: Tailwind utilities
<div className="flex p-4 bg-blue-500">
```

```jsx
// Before: Custom CSS
<button className="custom-btn">Submit</button>
// CSS: .custom-btn { padding: 12px 24px; background: blue; border-radius: 8px; }

// After: Tailwind utilities
<button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
  Submit
</button>
```

### 3. Component Extraction

**Identify Reusable Patterns**

- Find utility combinations used 3+ times
- Extract to component classes using @layer
- Create plugin utilities for complex patterns
- Document extracted components

**Example Extraction**

```css
/* tailwind.css */
@layer components {
  .btn-primary {
    @apply px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg;
    @apply hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500;
    @apply disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200;
  }
}
```

### 4. Design System Alignment

**Update Tailwind Configuration**

- Define brand colors in theme
- Configure custom spacing if needed
- Set up typography scale
- Add custom breakpoints
- Implement design tokens

**Example Configuration**

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#10b981',
        },
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};
```

### 5. Responsive Implementation

**Apply Mobile-First Approach**

- Start with mobile layout utilities
- Add responsive variants progressively (sm:, md:, lg:)
- Test at all breakpoints
- Optimize for touch targets on mobile
- Ensure proper text scaling

**Example Responsive Pattern**

```jsx
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
  p-4 sm:p-6 lg:p-8
">
```

### 6. Dark Mode Implementation

**Add Dark Mode Support**

- Configure dark mode strategy (class or media)
- Define dark mode colors in theme
- Apply dark: variants to components
- Test visibility and contrast in dark mode
- Provide theme toggle mechanism

**Example Dark Mode**

```jsx
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border border-gray-200 dark:border-gray-700
">
```

### 7. Accessibility Improvements

**Enhance Accessibility**

- Add focus-visible states to interactive elements
- Ensure sufficient color contrast (WCAG AA/AAA)
- Use sr-only for screen reader content
- Implement proper keyboard navigation styles
- Test with screen readers

**Example Accessible Button**

```jsx
<button className="
  px-4 py-2 text-white bg-blue-600 rounded
  hover:bg-blue-700
  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors
">
```

### 8. Performance Optimization

**Optimize Build Output**

- Configure content paths correctly
- Remove unused utilities
- Minimize arbitrary values
- Use JIT mode features
- Test production bundle size

**Example Content Configuration**

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  safelist: [
    'bg-red-500',
    'bg-green-500',
    // Dynamic classes
  ],
};
```

## Quality Checklist

**Before Completing Refactor**

- [ ] All inline styles converted to utilities
- [ ] Custom CSS minimized or eliminated
- [ ] Design tokens used consistently
- [ ] Responsive design implemented mobile-first
- [ ] Dark mode support added
- [ ] Accessibility requirements met
- [ ] Component patterns extracted appropriately
- [ ] Performance optimizations applied
- [ ] Configuration properly set up
- [ ] Documentation updated

## GitHub Issue Integration

**Issue Validation**

- Verify all Tailwind-related acceptance criteria met
- Update issue with refactoring decisions made
- Document any design system additions or changes
- Link to related issues for design system updates
- Note any breaking changes in class usage

**Documentation Requirements**

- Update component documentation with new utilities
- Document custom plugins or utilities added
- Add examples for new patterns introduced
- Update style guide with Tailwind conventions
- Note migration path for deprecated patterns

## Common Patterns

### Form Controls

```jsx
<input
  className="
  w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg
  placeholder:text-gray-400
  focus:border-blue-500 focus:ring-2 focus:ring-blue-200
  disabled:bg-gray-100 disabled:cursor-not-allowed
"
/>
```

### Card Component

```jsx
<div className="
  p-6 bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
  dark:bg-gray-800
">
```

### Navigation

```jsx
<nav className="
  flex items-center justify-between
  px-4 py-3 bg-white border-b border-gray-200
  sm:px-6 lg:px-8
  dark:bg-gray-900 dark:border-gray-800
">
```

## Anti-patterns to Fix

- Using @apply for simple one-off utilities
- Mixing inline styles with Tailwind classes
- Not using theme values (hard-coded colors/spacing)
- Ignoring responsive design
- Missing accessibility states (focus, disabled)
- Overusing arbitrary values
- Not extracting repeated patterns
- Inconsistent class ordering

## Resources

- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/best-practices)
- [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)
- [Reusing Styles](https://tailwindcss.com/docs/reusing-styles)
- [Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles)
