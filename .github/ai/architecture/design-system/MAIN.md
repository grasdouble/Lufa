# Main

Package: `@grasdouble/lufa_design-system`
Location: packages/design-system/main/
Updated: 2025-12-13
Version: 0.3.0

## Stats

- ~145 KB JS (unminified ESM)
- ~50 KB CSS (primitives + tokens + components)
- 7 component categories
- Dependencies: 2 runtime (primitives, tokens), 4 external (React peer, Headless UI, Heroicons, clsx)

## Structure

```
packages/design-system/main/
├── src/
│   ├── components/
│   │   ├── Typography/     Heading, Text, Code
│   │   ├── display/        Card, Avatar, Badge
│   │   ├── feedback/       Alert, Modal, Spinner
│   │   ├── forms/          Input, Button, Checkbox
│   │   ├── layout/         Container, Grid, Stack
│   │   ├── overlay/        Dialog, Popover, Tooltip
│   │   └── patterns/       LoginForm, DataTable
│   ├── css/
│   │   └── component-resets.css    Custom reset utilities
│   ├── utils/              accessibility.ts, index.ts
│   ├── index.ts            Main export
│   └── tailwind.css        CSS orchestration
├── dist/
│   ├── lufa-ui.mjs         ES module
│   ├── style.css           Bundled CSS
│   └── index.d.ts          Types
└── vite.config.ts
```

## Tech Stack

| Layer      | Technology       | Purpose                    |
| ---------- | ---------------- | -------------------------- |
| Framework  | React 19         | UI components              |
| Language   | TypeScript 5.9   | Type safety                |
| Styling    | Tailwind CSS 4.1 | Utility-first CSS          |
| Build      | Vite 7.2         | Library mode bundling      |
| UI Helpers | Headless UI      | Accessible base components |

## Key Concepts

**Library Mode**: Vite builds single ES module for distribution

```js
build: { lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'lufa-ui.mjs' } }
```

**Component-Level Resets**: No global preflight, each component applies reset locally

```css
.button {
  @utility preflight; /* ... */
}
```

**Dual Export**: Components + CSS separately

```json
"exports": {
  ".": "./dist/lufa-ui.mjs",
  "./style.css": "./dist/style.css"
}
```

## Config

**vite.config.ts**: Library mode, React externalized, CSS bundled, types generated

**package.json**:

```json
{
  "type": "module",
  "main": "./dist/lufa-ui.mjs",
  "exports": { ".": "./dist/lufa-ui.mjs", "./style.css": "./dist/style.css" },
  "peerDependencies": { "react": "^19.1.0" }
}
```

## Build

**Dev**:

```bash
pnpm dev
```

Steps: Watch src → Rebuild on change → Output to dist/
Output: lufa-ui.mjs, style.css (continuous)

**Prod**:

```bash
pnpm build
```

Steps: Clean → tsc (types) → Vite (bundle) → Extract CSS
Output: dist/lufa-ui.mjs (145KB), dist/style.css (50KB), dist/index.d.ts
Format: ESM, Unminified (consumers minify), Source maps included

## Dependencies

**Runtime**: `@grasdouble/lufa_design-system-primitives`, `@grasdouble/lufa_design-system-tokens`, `@headlessui/react`, `@heroicons/react`, `clsx`
**Peer**: `react@^19.1.0`
**Dev**: `@tailwindcss/vite`, `vite`, `@vitejs/plugin-react`, `vite-plugin-dts`, `typescript`

Purpose:

- primitives: CSS variables foundation
- tokens: Semantic design values
- Headless UI: Accessible unstyled components (Dialog, Menu, etc.)
- Heroicons: Icon library
- clsx: Conditional className utility

## Integration

**In React App**:

```tsx
import { Button, Card } from "@grasdouble/lufa_design-system";
import "@grasdouble/lufa_design-system/style.css";

<Card>
  <Button>Click</Button>
</Card>;
```

Flow: Import component → Import CSS → Use component

**In Storybook**:

```tsx
import { Button } from "@grasdouble/lufa_design-system";
export default { component: Button };
```

Flow: Import → Document → Preview → Deploy to lufa-storybook.sebastien-lemouillour.fr

**In Microfrontend** (via CDN):

```js
// import map
{ "imports": { "@grasdouble/lufa_design-system": "https://cdn.../lufa-ui.mjs" } }
```

Flow: Publish to GitHub Packages → Autobuild downloads → Upload to CDN → Import map updated

## Workflows

**Add Component**:

1. Create `src/components/{category}/{Name}/{Name}.tsx` - Component file
2. Create `{Name}.module.css` - Scoped styles with `@utility preflight`
3. Export from `src/components/{category}/index.ts` - Add to category
4. Run `pnpm build` - Generate dist files

**Modify Styling**:

1. Edit component `.module.css` - Change Tailwind utilities
2. Build - Regenerate CSS bundle
3. Test in Storybook - Verify visual changes

## Decisions

- **Unminified output**: Readable for debugging | Why: Consumers minify in their build | Trade-off: Larger GitHub Package size
- **Component-level resets**: Each component applies reset | Why: No conflicts with host apps (Docusaurus, Next.js) | Trade-off: `@utility preflight` in every component CSS
- **Single ESM format**: ES modules only | Why: Modern standard, tree-shakeable | Trade-off: No CJS support for legacy tools
- **React 19 peer**: Latest React version | Why: Modern features, performance | Trade-off: Not compatible with React 18 apps

## Deployment

Target: GitHub Packages + CDN
URL (Storybook): https://lufa-storybook.sebastien-lemouillour.fr
Method: `pnpm publish` → Autobuild server → CDN upload
CI/CD: Manual publish, autobuild watches GitHub Packages

## Debug

| Issue                        | Fix                                                          |
| ---------------------------- | ------------------------------------------------------------ |
| Types not found              | Run `pnpm build`, check dist/index.d.ts exists               |
| CSS not applying             | Import `@.../lufa_design-system/style.css` before use        |
| Component styles broken      | Verify `@utility preflight` in .module.css                   |
| Build fails                  | Check primitives/tokens built first, clear dist folder       |
| Tailwind classes not working | Ensure tailwind.css imported, check @tailwindcss/vite plugin |

## Links

- [Development Rules](../../rules/design-system/MAIN.md)
- [CSS Architecture](./CSS.md)
- [Primitives](./PRIMITIVES.md)
- [Tokens](./TOKENS.md)
- [Design System Overview](./DESIGN_SYSTEM.md)
