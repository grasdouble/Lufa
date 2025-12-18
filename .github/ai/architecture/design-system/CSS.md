# CSS

Package: `@grasdouble/lufa_design-system`
Location: packages/design-system/main/src/css/
Updated: 2025-12-13
Tailwind: 4.1.17

## Stats

- Component-level reset strategy (no global preflight)
- 5 reset utilities (button, input, heading, list, image)
- ~165 KB uncompressed CSS bundle (~22 KB gzipped)

## Structure

```
packages/design-system/main/src/
├── tailwind.css                Minimal global reset
├── css/
│   └── component-resets.css    Custom reset utilities
└── components/
    └── **/Component.module.css Component styles
```

## Tech Stack

| Layer        | Technology        | Purpose                     |
| ------------ | ----------------- | --------------------------- |
| Framework    | Tailwind CSS 4.1  | Utility-first CSS           |
| Build        | @tailwindcss/vite | Vite plugin for TW v4       |
| Architecture | CSS Modules       | Scoped component styles     |
| Layers       | @layer            | base, components, utilities |

## Key Concepts

**Component-Level Resets**: Each component applies reset locally, no global preflight

```css
.button {
  @apply reset-button; /* Component-specific reset */
  @apply bg-blue-500; /* Component styles */
}
```

**Minimal Global Reset**: Only essentials for Tailwind utilities

```css
@layer base {
  * {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
  }
}
```

**Reset Utilities**: Custom `@utility` for common elements

```css
@utility reset-button {
  font-family: inherit;
  font-size: 100%;
  /* ... browser reset */
}
```

## Config

**tailwind.css**: Imports primitives → tokens → component-resets, minimal base layer

**component-resets.css**: 5 utilities (button, input, heading, list, image)

**Component.module.css**: Uses `@reference '../../../tailwind.css'` and `@layer components`

## Build

**Process**: Vite → @tailwindcss/vite → Bundle CSS → Extract to dist/style.css

**Output**:

- dist/style.css (~165 KB uncompressed, ~22 KB gzipped)
- Contains: Base layer, component styles, utilities, primitives, tokens

## Dependencies

**Build**: `@tailwindcss/vite@4.1.17`, `tailwindcss@4.1.17`, `postcss@8.5`

Purpose:

- @tailwindcss/vite: Tailwind v4 integration
- tailwindcss: Core CSS framework
- postcss: CSS processing

## Integration

**In Component**:

```css
@layer components {
  @reference '../../../tailwind.css';

  .button {
    @apply reset-button; /* Reset first */
    @apply bg-blue-500 text-white;
  }
}
```

Flow: Component imports .module.css → Vite processes → Tailwind applies → Output to dist/

**In Host App**:

```tsx
import { Button } from '@grasdouble/lufa_design-system';

import '@grasdouble/lufa_design-system/style.css'; // No conflicts
```

Flow: Import CSS → No global resets → Host app styles intact → Component styles scoped

## Workflows

**Create Component**:

1. Create `Component.module.css` - Scoped styles
2. Add `@layer components { @reference '../../../tailwind.css'; }` - Setup
3. Apply reset: `.component { @apply reset-{type}; }` - Reset browser styles
4. Add styles: `@apply ...` - Component appearance

**Add Reset Utility**:

1. Edit `src/css/component-resets.css` - Add new `@utility`
2. Define reset properties - Browser defaults to neutralize
3. Apply in components: `@apply reset-{name}` - Use in modules

## Decisions

- **No global preflight**: Component resets only | Why: Avoid host app conflicts (Docusaurus, Next.js) | Trade-off: Must apply reset in every component
- **5 preset resets**: Common elements covered | Why: Consistency, DRY | Trade-off: May need custom resets for new elements
- **CSS Modules**: Scoped component styles | Why: No global namespace pollution | Trade-off: More verbose imports
- **@layer system**: base/components/utilities | Why: Predictable cascade order | Trade-off: Must understand layer precedence

## Debug

| Issue                             | Fix                                                   |
| --------------------------------- | ----------------------------------------------------- |
| Host app styles broken            | Remove global resets from tailwind.css base layer     |
| Component inherits browser styles | Add `@apply reset-{type}` to component module         |
| Tailwind classes not working      | Check `@reference '../../../tailwind.css'` exists     |
| CSS bundle too large              | Verify tree-shaking enabled, check for unused imports |
| Docusaurus integration fails      | Clear cache: `cd documentation && pnpm clear`         |

## Best Practices

**Do**:

- Apply reset utility first in component
- Use component-level resets, not global
- Test in host apps (Docusaurus, Storybook)
- Keep base layer minimal

**Don't**:

- Enable global Tailwind preflight
- Add element resets in base layer
- Rely on cascade without explicit resets
- Import `tailwindcss/preflight` layer

## Links

- [Main Package](./MAIN.md)
- [Design System Overview](./DESIGN_SYSTEM.md)
