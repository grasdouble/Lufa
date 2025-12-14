# Storybook

Package: `@grasdouble/lufa_design-system-storybook`
Location: packages/design-system/storybook/
Updated: 2025-12-13
Version: 0.4.0 (Storybook 10.1.4)
URL: https://lufa-storybook.sebastien-lemouillour.fr

## Stats

- 9 story categories (Tokens, Layout, Forms, Display, Feedback, Overlay, Patterns, Primitives, Utilities)
- Dual theme support (light/dark)
- Dependencies: 3 runtime (design-system, tokens, primitives), React 19

## Structure

```
packages/design-system/storybook/
├── .storybook/
│ ├── main.ts Storybook config
│ ├── preview.tsx Decorators, theme, viewports
│ └── breakpoints.ts Custom viewports
├── src/
│ ├── stories/
│ │ ├── components/ Component stories by category
│ │ ├── primitives/ Primitive docs
│ │ └── tokens/ Token visualization
│ └── style.css Storybook styles
└── storybook-static/ Build output
```

## Tech Stack

| Layer     | Technology                | Purpose                      |
| --------- | ------------------------- | ---------------------------- |
| Framework | Storybook 10.1            | Component playground         |
| Builder   | @storybook/react-vite 7.2 | Vite-based build             |
| Addons    | addon-themes              | Light/dark theme switching   |
| Addons    | addon-docs                | Auto-generated documentation |
| Language  | TypeScript 5.9            | Type-safe stories            |

## Key Concepts

**Story Organization**: Numeric prefixes control display order

```ts
"1. Tokens/Colors"
"2. Layout/Container"
"3. Forms/Button"
```

**Playground Pattern**: First story is always interactive playground

```ts
export const Playground: Story = { args: { /_ editable _/ } };
export const Primary: Story = { /_ fixed example _/ };
```

**Dual Theme**: Data attribute + class name strategy

```ts

<div data-theme="dark" class="theme-dark">...</div>
```

## Config

**.storybook/main.ts**: Auto-discovery, React-docgen, Vite builder

**.storybook/preview.tsx**:
```ts
{
decorators: [withThemeByDataAttribute, withThemeByClassName],
viewports: { mobile: 375px, tablet: 768px, desktop: 1024px, wide: 1280px },
storySort: (a, b) => /_ Playground first, then alphabetical _/
}
```

## Build

**Dev**:
```bash
pnpm dev
```
Steps: Start Vite → Watch stories → Serve on :6006
Output: Hot-reload server (no build output)

**Prod**:
```bash
pnpm build
```
Steps: Bundle stories → Optimize assets → Generate HTML
Output: storybook-static/ (static HTML/CSS/JS)
Deploy: Upload to https://lufa-storybook.sebastien-lemouillour.fr

## Dependencies

**Runtime**: `@grasdouble/lufa_design-system`, `@grasdouble/lufa_design-system-tokens`, `@grasdouble/lufa_design-system-primitives`, `react@19.2`, `react-dom@19.2`
**Dev**: `storybook@10.1.4`, `@storybook/react-vite`, `@storybook/addon-docs`, `@storybook/addon-themes`, `vite@7.2`

Purpose:

- design-system: Components to document
- tokens/primitives: Design values visualization
- React 19: Component runtime
- Storybook addons: Theme switching, docs generation

## Integration

**Import Components**:
```tsx
import { Button } from '@grasdouble/lufa_design-system';
import '@grasdouble/lufa_design-system/style.css';

export const Playground: Story = { render: () => <Button>Click</Button> };
```

Flow: Import from workspace → Hot-reload on changes → Preview in Storybook

**Theme Switching**:
```tsx
// Toolbar theme switcher sets both

<div data-theme="dark" class="theme-dark">
  <Button>Themed</Button>
</div>
```

Flow: Click theme in toolbar → Decorator applies attributes → CSS variables switch

**Story Sorting**:
```ts
storySort: (a, b) => {
if (a.name === "Playground") return -1; // Playground first
return a.id.localeCompare(b.id);
}
```

Flow: Story file exports → Storybook loads → Sort applied → Sidebar updated

## Workflows

**Add Story**:

1. Create `src/stories/components/{category}/{Name}.stories.tsx` - Story file
2. Export meta with title `"{number}. {Category}/{Name}"` - Metadata
3. Export `Playground` story with args - Interactive example
4. Run `pnpm dev` - Preview in browser

**Test Themes**:

1. Open story in Storybook - Navigate to component
2. Click theme switcher in toolbar - Toggle light/dark
3. Verify component appearance - Visual check

## Decisions

- **Numeric prefixes**: Control sidebar order | Why: Consistent navigation | Trade-off: Harder to rename categories
- **Dual theme strategy**: data-attribute + className | Why: Support both CSS approaches | Trade-off: Redundant attributes
- **Workspace dependencies**: Import from monorepo | Why: Live hot-reload during dev | Trade-off: Requires design-system built first
- **Playground pattern**: First story editable | Why: Clear interactive example | Trade-off: Naming convention must be followed

## Deployment

Target: Static hosting
URL: https://lufa-storybook.sebastien-lemouillour.fr
Method: `pnpm build` → Upload storybook-static/
CI/CD: Manual build and deploy

## Debug

| Issue                  | Fix                                                |
| ---------------------- | -------------------------------------------------- |
| Story not appearing    | Check filename ends in `.stories.tsx`              |
| Dark mode broken       | Verify component uses CSS custom properties        |
| Slow build             | Clear cache: `rm -rf node_modules/.cache`          |
| TypeScript errors      | Check `Meta<typeof Component>` type matches export |
| Hot-reload not working | Rebuild design-system package in watch mode        |

## Links

- [Development Rules](../../rules/design-system/STORYBOOK.md)
- [Design System Overview](./DESIGN_SYSTEM.md)
- [Main Package](./MAIN.md)
