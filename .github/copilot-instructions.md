# Instructions for AI Assistants

> 🤖 **Single Entry Point**: This is the main guide for all AI assistants working on the Lufa monorepo.

## Project Overview

Lufa is a personal pnpm monorepo containing a design system, microfrontend applications, and various web projects.

**Tech Stack**: React 19, TypeScript, Tailwind CSS v4, Vite 7, Single-SPA, pnpm workspaces

## 📚 Navigation Guide

**Choose your path based on what you need:**

- 📋 **Quick task lookup** → [ai/QUICK_REFERENCE.md](ai/QUICK_REFERENCE.md) - Fast shortcuts by task type
- 🏗️ **Understand architecture** → [AI_README.md](AI_README.md) - Complete navigation to architecture & rules docs
- ⚡ **Get context fast** → [AI_CONTEXT.md](AI_CONTEXT.md) - Key facts, tech stack, file locations

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

## 🛠️ Essential Commands

**Development:**
```bash
pnpm mf:dev                 # Microfrontend (container + home)
pnpm dev:apps:storybook     # Design system + Storybook
pnpm dev:design-system      # Design system watch mode
```

**Build (order matters):**
```bash
pnpm build:lufa:ds:primitives  # 1. CSS primitives first
pnpm build:lufa:ds:tokens      # 2. Then tokens
pnpm build:lufa:ds             # 3. Then main design system
pnpm build:all                 # Or build everything
```

**Quality & Versioning:**
```bash
pnpm lint:all              # Lint all packages
pnpm prettier:all          # Format all packages
pnpm changeset             # Create changeset (required before merge!)
```

## 📋 Key Conventions

- **Package naming**: `@grasdouble/lufa_[category]_[name]`
- **Internal deps**: Always use `workspace:^`
- **Changesets**: Required for version-tracked packages before merging
- **Component structure**: `ComponentName/ComponentName.tsx` + `.module.css` + `index.ts`

## 🎯 Common Tasks

**Working on design system?**
1. Adding component → [ai/rules/design-system/MAIN.md](ai/rules/design-system/MAIN.md)
2. Modifying CSS primitives → [ai/rules/design-system/PRIMITIVES.md](ai/rules/design-system/PRIMITIVES.md)
3. Understanding architecture → [ai/architecture/design-system/DESIGN_SYSTEM.md](ai/architecture/design-system/DESIGN_SYSTEM.md)

**Working on microfrontends?**
1. Understanding architecture → [ai/architecture/microfrontend/MICROFRONTEND.md](ai/architecture/microfrontend/MICROFRONTEND.md)
2. Modifying container → [ai/rules/microfrontend/CONTAINER.md](ai/rules/microfrontend/CONTAINER.md)
3. Creating parcel → [ai/rules/microfrontend/PARCEL.md](ai/rules/microfrontend/PARCEL.md)

## ⚠️ Critical Rules

- ❌ **Never** skip changeset creation for versioned packages
- ❌ **Never** build main design system before primitives and tokens
- ✅ **Always** externalize shared deps in parcels (react, react-dom, design-system)
- ✅ **Always** test in Storybook before deploying components
- ✅ Use import map overrides for local microfrontend development
