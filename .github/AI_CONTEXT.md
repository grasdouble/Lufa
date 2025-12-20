# AI Context Summary

> ⚡ **Detailed Reference**: Comprehensive project facts and locations for AI agents

**Looking for quick start?** Go back to [copilot-instructions.md](copilot-instructions.md)

## 🎯 Project Identity

**Name**: Lufa  
**Type**: Personal pnpm monorepo  
**Owner**: @grasdouble  
**Purpose**: Consolidated workspace for web projects, experiments, and design system  
**Package Manager**: pnpm@10.8.1  
**License**: Creative Commons Attribution-NonCommercial 4.0 International

## 🏗️ Tech Stack

| Category           | Technologies                                           |
| ------------------ | ------------------------------------------------------ |
| **Frontend**       | React 19, TypeScript                                   |
| **Styling**        | Tailwind CSS v4, CSS Modules, CSS Custom Properties    |
| **Build**          | Vite 7, Rollup                                         |
| **Microfrontends** | Single-SPA, Import Maps, SystemJS                      |
| **Monorepo**       | pnpm workspaces, Changesets                            |
| **CI/CD**          | GitHub Actions, GitHub Packages                        |
| **CDN**            | Custom autobuild server (cdn.sebastien-lemouillour.fr) |
| **Documentation**  | Storybook 8, Docusaurus                                |

## 📦 Package Structure

```
packages/
├── design-system/              # React component library
│   ├── main/                   # @grasdouble/lufa_design-system (v0.3.0)
│   ├── primitives/             # @grasdouble/lufa_design-system-primitives
│   ├── tokens/                 # @grasdouble/lufa_design-system-tokens
│   ├── storybook/              # Component playground
│   └── documentation/          # Docusaurus site
├── apps/microfrontend/         # Single-SPA applications
│   ├── main-container/         # Shell app (sebastien-lemouillour.fr)
│   └── home/                   # Landing page parcel
├── config/                     # Shared configs (ESLint, TypeScript)
├── plugins/vite/               # Custom Vite plugins
├── cdn/autobuild-server/       # Auto-publishes to CDN
└── poc/                        # Proof of concepts
```

## 🔑 Key Concepts

### Design System

- **Main Package**: Exports all components as ES module (`lufa-ui.mjs`)
- **Primitives**: Base CSS custom properties (colors, spacing, typography)
- **Tokens**: Semantic design tokens in TypeScript
- **CSS Strategy**: Custom reset + Tailwind v4 + CSS Modules
- **Bundle Size**: ~145 KB (JS) + ~50 KB (CSS)

### Microfrontends

- **Framework**: Single-SPA for orchestration
- **Module Federation**: Import maps + CDN
- **Container**: Registers parcels, handles routing
- **Parcels**: Independent React apps with lifecycle exports
- **Development**: Local override via import-map-overrides
- **Deployment**: GitHub Packages → CDN → Import map update

### Publishing Flow

1. Create changeset (`pnpm changeset`)
2. Merge PR to main
3. Version bump PR created automatically
4. Merge version PR → publish to GitHub Packages
5. Autobuild server uploads to CDN
6. Import maps updated

## 📋 Common Commands

```bash
# Microfrontend development
pnpm mf:dev                     # Start container + home parcel

# Design system development
pnpm dev:design-system          # Watch mode build
pnpm dev:apps:storybook         # Design system + Storybook

# Build (order: primitives → tokens → main)
pnpm build:lufa:ds:primitives
pnpm build:lufa:ds:tokens
pnpm build:lufa:ds
pnpm build:all                  # Or build everything

# Quality
pnpm lint:all
pnpm prettier:all

# Versioning
pnpm changeset                  # Create changeset
pnpm changeset version          # Bump versions

# Package info
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;
```

## 🌐 Live Deployments

- **Microfrontend**: https://www.sebastien-lemouillour.fr
- **Storybook**: https://lufa-storybook.sebastien-lemouillour.fr
- **CDN**: https://cdn.sebastien-lemouillour.fr

## 📂 File Locations

| Need                     | Path                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| Workspace config         | `/pnpm-workspace.yaml`                                            |
| Root scripts             | `/package.json`                                                   |
| Design system components | `/packages/design-system/main/src/components/`                    |
| Primitives CSS           | `/packages/design-system/primitives/src/primitives.css`           |
| Tokens                   | `/packages/design-system/tokens/src/tokens.ts`                    |
| Main container           | `/packages/apps/microfrontend/main-container/`                    |
| Import maps              | `/packages/apps/microfrontend/main-container/src/importMap*.json` |
| Workflows                | `/.github/workflows/`                                             |
| AI documentation         | `/.github/ai/`                                                    |

## 🎨 Naming Conventions

**Package Names**: `@grasdouble/lufa_[category]_[name]`

Examples:

- `@grasdouble/lufa_design-system`
- `@grasdouble/lufa_microfrontend_home`
- `@grasdouble/lufa_config_eslint`

**Component Files**:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
└── index.ts
```

## 🚀 Quick Start Tasks

| Task                        | Documentation                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------- |
| **Understand architecture** | [ai/architecture/GLOBAL.md](ai/architecture/GLOBAL.md)                              |
| **Add component**           | [ai/rules/design-system/MAIN.md](ai/rules/design-system/MAIN.md)                   |
| **Modify primitives**       | [ai/rules/design-system/PRIMITIVES.md](ai/rules/design-system/PRIMITIVES.md)       |
| **Create parcel**           | [ai/rules/microfrontend/PARCEL.md](ai/rules/microfrontend/PARCEL.md)               |
| **Update docs**             | [ai/meta/HOW_TO_UPDATE.md](ai/meta/HOW_TO_UPDATE.md)                               |

## ⚠️ Important Notes

- **Always create changesets** for version-tracked packages
- **Externalize shared dependencies** in parcels (react, react-dom, design-system)
- **Use workspace protocol** for internal dependencies: `workspace:^`
- **Build primitives & tokens first** before building main design system
- **Test in Storybook** before deploying components
- **Import map overrides** for local microfrontend development

## 🔍 Search Keywords

For semantic search, these terms are relevant:

- Component creation, design system, primitives, tokens
- Single-SPA, microfrontend, parcel, import map
- Vite configuration, build process, external dependencies
- GitHub Packages, CDN, autobuild, deployment
- Changesets, versioning, publishing workflow
- Tailwind v4, CSS custom properties, CSS modules
- React 19, TypeScript, pnpm workspace

---

**Last Updated**: December 13, 2025
