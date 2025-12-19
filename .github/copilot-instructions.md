# GitHub Copilot Instructions for Lufa

## Project Overview

Lufa is a personal pnpm monorepo containing a design system, microfrontend applications, and various web projects.

**Tech Stack**: React 19, TypeScript, Tailwind CSS v4, Vite 7, Single-SPA, pnpm workspaces

## 📚 Essential Documentation

Before making changes, consult these AI documentation files:

- **[.github/AI_README.md](.github/AI_README.md)** - Main entry point with full navigation
- **[.github/AI_CONTEXT.md](.github/AI_CONTEXT.md)** - Essential facts and quick reference
- **[.github/ai/QUICK_REFERENCE.md](.github/ai/QUICK_REFERENCE.md)** - Fast task-oriented lookup

## 🏗️ Repository Structure

```
packages/
├── design-system/              # React component library
│   ├── main/                   # @grasdouble/lufa_design-system
│   ├── primitives/             # CSS custom properties
│   ├── tokens/                 # Semantic design tokens
│   ├── storybook/              # Component playground
│   └── documentation/          # Docusaurus site
├── apps/microfrontend/         # Single-SPA applications
│   ├── main-container/         # Shell app
│   └── home/                   # Landing page parcel
├── config/                     # Shared configs (ESLint, TypeScript)
├── plugins/vite/               # Custom Vite plugins
└── poc/                        # Proof of concepts
```

## 🛠️ Common Commands

### Development
```bash
# Microfrontend development (container + home parcel)
pnpm mf:dev

# Design system + Storybook
pnpm dev:apps:storybook

# Design system watch mode
pnpm dev:design-system
```

### Build
```bash
# Build all packages
pnpm build:all

# Build design system
pnpm build:lufa:ds

# Build primitives first, then tokens, then main
pnpm build:lufa:ds:primitives
pnpm build:lufa:ds:tokens
pnpm build:lufa:ds
```

### Quality
```bash
# Lint all packages
pnpm lint:all

# Format all packages
pnpm prettier:all
```

### Versioning
```bash
# Create changeset for version bump
pnpm changeset

# Apply version bumps
pnpm changeset version
```

## 📋 Key Conventions

### Package Names
Use format: `@grasdouble/lufa_[category]_[name]`

Examples:
- `@grasdouble/lufa_design-system`
- `@grasdouble/lufa_microfrontend_home`
- `@grasdouble/lufa_config_eslint`

### Component Structure
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
└── index.ts
```

### Internal Dependencies
Always use workspace protocol: `workspace:^`

### Changesets
**Always create changesets** for version-tracked packages before merging changes.

## 🎯 Task-Specific Guidelines

### Adding a Component
1. Read [.github/ai/rules/design-system/MAIN.md](.github/ai/rules/design-system/MAIN.md)
2. Create component in `packages/design-system/main/src/components/`
3. Export in `packages/design-system/main/src/index.ts`
4. Add Storybook story
5. Build and test: `pnpm build:lufa:ds`

### Modifying CSS Primitives
1. Read [.github/ai/rules/design-system/PRIMITIVES.md](.github/ai/rules/design-system/PRIMITIVES.md)
2. Edit `packages/design-system/primitives/src/primitives.css`
3. Build: `pnpm build:lufa:ds:primitives`
4. Rebuild main: `pnpm build:lufa:ds`

### Working with Microfrontends
1. Read [.github/ai/architecture/microfrontend/MICROFRONTEND.md](.github/ai/architecture/microfrontend/MICROFRONTEND.md)
2. For container changes: [.github/ai/rules/microfrontend/CONTAINER.md](.github/ai/rules/microfrontend/CONTAINER.md)
3. For parcel creation: [.github/ai/rules/microfrontend/PARCEL.md](.github/ai/rules/microfrontend/PARCEL.md)

## ⚙️ Build Order Dependencies

**Important**: Build in this order to avoid errors:

1. Primitives (`build:lufa:ds:primitives`)
2. Tokens (`build:lufa:ds:tokens`)
3. Main design system (`build:lufa:ds`)
4. Storybook/Documentation (if needed)

## 🚀 Deployment Flow

1. Create changeset: `pnpm changeset`
2. Merge PR to main
3. Version bump PR created automatically
4. Merge version PR → publish to GitHub Packages
5. Autobuild server uploads to CDN
6. Import maps updated

## 🔍 Finding Information

**Need to understand architecture?** → [.github/ai/architecture/GLOBAL.md](.github/ai/architecture/GLOBAL.md)

**Need to work on design system?** → [.github/ai/architecture/design-system/DESIGN_SYSTEM.md](.github/ai/architecture/design-system/DESIGN_SYSTEM.md)

**Need to work on microfrontend?** → [.github/ai/architecture/microfrontend/MICROFRONTEND.md](.github/ai/architecture/microfrontend/MICROFRONTEND.md)

**Need to update documentation?** → [.github/ai/meta/HOW_TO_UPDATE.md](.github/ai/meta/HOW_TO_UPDATE.md)

## ⚠️ Important Notes

- ✅ Externalize shared dependencies in parcels (react, react-dom, design-system)
- ✅ Test in Storybook before deploying components
- ✅ Use import map overrides for local microfrontend development
- ❌ Never skip changeset creation for versioned packages
- ❌ Don't build main design system before primitives and tokens
