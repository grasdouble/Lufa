# AI Assistant Entry Point

> 🤖 **For AI Agents**: This is your starting point for understanding and contributing to the Lufa monorepo.

## 🎯 Quick Navigation

**New to this project?** Start here:

- 🤖 [`copilot-instructions.md`](copilot-instructions.md) - GitHub Copilot instructions
- 📋 [`ai/QUICK_REFERENCE.md`](ai/QUICK_REFERENCE.md) - Fast task-oriented lookup
- ⚡ [`AI_CONTEXT.md`](AI_CONTEXT.md) - Essential facts in one place

## 📐 Architecture Documentation

Understand how the project is structured:

- 🏗️ **Global Architecture**: [`ai/architecture/GLOBAL.md`](ai/architecture/GLOBAL.md)  
  _Monorepo structure, philosophy, package organization, pnpm workspace, and CDN deployment_

### Design System Architecture

- 📦 **Overview**: [`ai/architecture/design-system/DESIGN_SYSTEM.md`](ai/architecture/design-system/DESIGN_SYSTEM.md)  
  _React 19 + TypeScript + Tailwind v4, package structure, build process, exports_
- 📦 **Main Package**: [`ai/architecture/design-system/MAIN.md`](ai/architecture/design-system/MAIN.md)  
  _Component organization, CSS architecture, bundle strategy, dependencies_
- 🎨 **CSS Architecture**: [`ai/architecture/design-system/CSS.md`](ai/architecture/design-system/CSS.md)  
  _Custom reset system, preflight management, CSS variable integration_
- 🎨 **Primitives**: [`ai/architecture/design-system/PRIMITIVES.md`](ai/architecture/design-system/PRIMITIVES.md)  
  _Base CSS custom properties, color system, spacing scale, typography_
- 🏷️ **Tokens**: [`ai/architecture/design-system/TOKENS.md`](ai/architecture/design-system/TOKENS.md)  
  _TypeScript semantic tokens, dark mode, component-specific values_
- 📖 **Storybook**: [`ai/architecture/design-system/STORYBOOK.md`](ai/architecture/design-system/STORYBOOK.md)  
  _Interactive component playground, story organization, theme system, deployment_

### Microfrontend Architecture

- 🔷 **Overview**: [`ai/architecture/microfrontend/MICROFRONTEND.md`](ai/architecture/microfrontend/MICROFRONTEND.md)  
  _Single-SPA framework, import maps, CDN-based module federation, deployment flow_
- 📦 **Main Container**: [`ai/architecture/microfrontend/CONTAINER.md`](ai/architecture/microfrontend/CONTAINER.md)  
  _Shell application, routing, parcel registration, import-map-overrides_
- 🧩 **Parcels**: [`ai/architecture/microfrontend/PARCELS.md`](ai/architecture/microfrontend/PARCELS.md)  
  _Independent React apps, lifecycle, mounting, communication patterns_

## 📋 Development Rules

Guidelines for working on specific packages:

### Design System

- **Main Package**: [`ai/rules/design-system/MAIN.md`](ai/rules/design-system/MAIN.md)  
  _Component creation, naming conventions, styling rules, exports, testing_
- **Primitives**: [`ai/rules/design-system/PRIMITIVES.md`](ai/rules/design-system/PRIMITIVES.md)  
  _CSS variable naming, color palette, spacing system, modification workflow_
- **Tokens**: [`ai/rules/design-system/TOKENS.md`](ai/rules/design-system/TOKENS.md)  
  _Token structure, TypeScript types, dark mode values, update process_
- **Storybook**: [`ai/rules/design-system/STORYBOOK.md`](ai/rules/design-system/STORYBOOK.md)  
  _Story writing, documentation, controls, configuration, deployment_
- **Docusaurus**: [`ai/rules/design-system/DOCUMENTATION.md`](ai/rules/design-system/DOCUMENTATION.md)  
  _Documentation site, MDX format, component pages, versioning_

### Microfrontend

- **Main Container**: [`ai/rules/microfrontend/CONTAINER.md`](ai/rules/microfrontend/CONTAINER.md)  
  _Routing config, parcel registration, development mode, deployment_
- **Parcels**: [`ai/rules/microfrontend/PARCEL.md`](ai/rules/microfrontend/PARCEL.md)  
  _Parcel creation, Single-SPA integration, lifecycle hooks, testing_

## 🛠️ Meta Documentation

How to maintain and update this documentation:

- 📖 **Documentation Guide**: [`ai/meta/README.md`](ai/meta/README.md)  
  _AI agent workflows, documentation structure, decision trees, search strategies_
- 🔄 **How to Update**: [`ai/meta/HOW_TO_UPDATE.md`](ai/meta/HOW_TO_UPDATE.md)  
  _Step-by-step workflows for updating workflows, actions, architecture, and rules docs_
- 📋 **Templates**: [`ai/meta/templates/`](ai/meta/templates/)  
  _Templates: ARCHITECTURE, RULES, GITHUB_ACTION_DOC, GITHUB_WORKFLOW_DOC_
- 💬 **Prompts**: [`ai/meta/prompts/`](ai/meta/prompts/)  
  _Guided prompts for regenerating architecture and development guidelines_

---

**Last Updated**: December 13, 2025
