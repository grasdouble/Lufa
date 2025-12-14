# Design System

Location: packages/design-system/
Updated: 2025-12-13

## Stats

- 5 packages (main, primitives, tokens, storybook, documentation)
- React 19 + TypeScript + Tailwind CSS 4
- 2 deployment URLs (Storybook, Docusaurus)

## Structure

```
packages/design-system/
├── main/                   Core components (Button, Card, etc.)
│   └── @grasdouble/lufa_design-system
├── primitives/            CSS variables (colors, spacing, typography)
│   └── @grasdouble/lufa_design-system-primitives
├── tokens/                Semantic tokens (primary, success, etc.)
│   └── @grasdouble/lufa_design-system-tokens
├── storybook/             Component playground
│   └── @grasdouble/lufa_design-system-storybook
└── documentation/         Docusaurus docs site
    └── @grasdouble/lufa_design-system-documentation
```

## Tech Stack

| Package       | Tech                   | Purpose                 |
| ------------- | ---------------------- | ----------------------- |
| main          | React 19, Vite, TW 4   | Components + CSS bundle |
| primitives    | CSS, TypeScript        | Raw design values       |
| tokens        | TypeScript, Node       | Semantic abstraction    |
| storybook     | Storybook 10.1, Vite   | Interactive docs        |
| documentation | Docusaurus 3.9, Rspack | Static documentation    |

## Key Concepts

**Layer Architecture**: Primitives → Tokens → Components

```
primitives: color.chromatic.blue[500] = "oklch(0.6 0.24 258)"
tokens: color.interactive.primary = primitives.color.chromatic.blue[500]
components: Button uses tokens.color.interactive.primary
```

**Component-Level Resets**: No global preflight, each component applies reset

```css
.button {
  @apply reset-button; /* then styles */
}
```

**Dual Export**: Components in JS, styles in CSS

```ts
import { Button } from "@grasdouble/lufa_design-system";
import "@grasdouble/lufa_design-system/style.css";
```

## Config

**main/vite.config.ts**: Library mode, React externalized, CSS bundled

**Dependency Chain**:

```
main → primitives (CSS import)
main → tokens (TS import)
storybook → main
documentation → main
```

## Build

**main**: `pnpm build` → dist/lufa-ui.mjs (145KB) + dist/style.css (165KB)

**storybook**: `pnpm build` → storybook-static/ → lufa-storybook.sebastien-lemouillour.fr

**documentation**: `pnpm build` → build/ → lufa-design.sebastien-lemouillour.fr

## Dependencies

**main Runtime**: primitives, tokens, @headlessui/react, @heroicons/react, clsx
**main Peer**: react@^19.1.0
**main Dev**: Vite, @tailwindcss/vite, @vitejs/plugin-react

## Integration

**In App**:

```tsx
import { Button, Card } from "@grasdouble/lufa_design-system";
import "@grasdouble/lufa_design-system/style.css";

<Card>
  <Button>Click</Button>
</Card>;
```

**In Microfrontend** (CDN):

```json
{
  "imports": { "@grasdouble/lufa_design-system": "https://cdn.../lufa-ui.mjs" }
}
```

Flow: Publish to GitHub Packages → Autobuild → CDN → Import map

**In Storybook**:

```ts
import { Button } from "@grasdouble/lufa_design-system";
export const Playground: Story = { render: () => <Button>Test</Button> };
```

## Workflows

**Add Component**:

1. Create in `main/src/components/{category}/{Name}/` - Component files
2. Apply reset in `.module.css` - Component styles
3. Export from category index - Public API
4. Document in Storybook - Create .stories.tsx
5. Build main package - Generate dist files

**Update Tokens**:

1. Edit `tokens/src/tokens/{category}/` - Token definitions
2. Build tokens - Regenerate JS + CSS
3. Build main - Bundle updated tokens
4. Verify in Storybook - Visual check

## Decisions

- **Monorepo**: All packages in one workspace | Why: Shared dependencies, atomic updates | Trade-off: Larger repo, complex builds
- **Component resets**: Local not global | Why: Host app compatibility | Trade-off: Reset in every component
- **TypeScript tokens**: TS-first approach | Why: Type safety, IDE support | Trade-off: Build step required
- **React 19**: Latest version | Why: Modern features, performance | Trade-off: Not compatible with React 18

## Deployment

**Storybook**: https://lufa-storybook.sebastien-lemouillour.fr
**Docs**: https://lufa-design.sebastien-lemouillour.fr
**Package**: GitHub Packages (@grasdouble/lufa_design-system)
**CDN**: cdn.sebastien-lemouillour.fr/@grasdouble/...

## Debug

| Issue                     | Fix                                                 |
| ------------------------- | --------------------------------------------------- |
| Styles conflict with host | Verify component-level resets, check for global CSS |
| Types not found           | Build primitives/tokens first, then main            |
| Storybook not updating    | Rebuild main package in watch mode                  |
| Docusaurus CSS broken     | Clear cache: `cd documentation && pnpm clear`       |

## Links

- [Main Package](./MAIN.md)
- [Primitives](./PRIMITIVES.md)
- [Tokens](./TOKENS.md)
- [Storybook](./STORYBOOK.md)
- [CSS Architecture](./CSS.md)
