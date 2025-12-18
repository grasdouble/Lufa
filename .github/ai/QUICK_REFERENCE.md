# Quick Reference for AI Agents

> 🚀 **Fast lookup guide** - Find what you need in seconds

## 💡 Common Tasks

### I want to understand...

| What                            | Where                                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| 🏗️ Global monorepo architecture | [`architecture/GLOBAL.md`](architecture/GLOBAL.md)                                           |
| 🎨 Design system structure      | [`architecture/design-system/DESIGN_SYSTEM.md`](architecture/design-system/DESIGN_SYSTEM.md) |
| 🎨 CSS architecture & resets    | [`architecture/design-system/CSS.md`](architecture/design-system/CSS.md)                     |
| 🎨 CSS primitives               | [`architecture/design-system/PRIMITIVES.md`](architecture/design-system/PRIMITIVES.md)       |
| 🏷️ Design tokens                | [`architecture/design-system/TOKENS.md`](architecture/design-system/TOKENS.md)               |
| � Storybook architecture        | [`architecture/design-system/STORYBOOK.md`](architecture/design-system/STORYBOOK.md)         |
| �🔷 Microfrontend architecture  | [`architecture/microfrontend/MICROFRONTEND.md`](architecture/microfrontend/MICROFRONTEND.md) |
| 📦 Main container               | [`architecture/microfrontend/CONTAINER.md`](architecture/microfrontend/CONTAINER.md)         |
| 🧩 Parcels                      | [`architecture/microfrontend/PARCELS.md`](architecture/microfrontend/PARCELS.md)             |

### I want to know how to...

| Task                      | Documentation                                                                  |
| ------------------------- | ------------------------------------------------------------------------------ |
| ➕ Create a new component | [`rules/design-system/MAIN.md`](rules/design-system/MAIN.md)                   |
| 🎨 Work with primitives   | [`rules/design-system/PRIMITIVES.md`](rules/design-system/PRIMITIVES.md)       |
| 🏷️ Manage design tokens   | [`rules/design-system/TOKENS.md`](rules/design-system/TOKENS.md)               |
| 📖 Use Storybook          | [`rules/design-system/STORYBOOK.md`](rules/design-system/STORYBOOK.md)         |
| 📚 Work with Docusaurus   | [`rules/design-system/DOCUMENTATION.md`](rules/design-system/DOCUMENTATION.md) |
| 📦 Modify main container  | [`rules/microfrontend/CONTAINER.md`](rules/microfrontend/CONTAINER.md)         |
| 🧩 Create/modify parcels  | [`rules/microfrontend/PARCEL.md`](rules/microfrontend/PARCEL.md)               |

### I want to update documentation...

| Type                      | Guide                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 🏗️ Architecture docs      | [`meta/prompts/ARCHITECTURE_UPDATE_PROMPTS.md`](meta/prompts/ARCHITECTURE_UPDATE_PROMPTS.md)                     |
| 📋 Development guidelines | [`meta/prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md`](meta/prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md) |

### I want to create new documentation...

| Type                 | Template                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| 🏭️ Architecture      | [`meta/templates/ARCHITECTURE.template.md`](meta/templates/ARCHITECTURE.template.md)               |
| 📋 Development rules | [`meta/templates/RULES.template.md`](meta/templates/RULES.template.md)                             |
| ⚙️ GitHub Action     | [`meta/templates/GITHUB_ACTION_DOC.template.md`](meta/templates/GITHUB_ACTION_DOC.template.md)     |
| 🔄 GitHub Workflow   | [`meta/templates/GITHUB_WORKFLOW_DOC.template.md`](meta/templates/GITHUB_WORKFLOW_DOC.template.md) |

## 🗂️ File Organization

```
.github/
├── AI_README.md              # Main entry point
├── AI_CONTEXT.md             # Essential facts in one place
└── ai/
    ├── QUICK_REFERENCE.md    # This file - fast lookup
    │
    ├── architecture/         # System descriptions
    │   ├── GLOBAL.md        # Monorepo structure
    │   │
    │   ├── design-system/   # Design system architecture
    │   │   ├── DESIGN_SYSTEM.md  # Overview
    │   │   ├── MAIN.md           # Main package
    │   │   ├── CSS.md            # CSS architecture
    │   │   ├── PRIMITIVES.md     # CSS variables
    │   │   └── TOKENS.md         # Semantic tokens
    │   │
    │   └── microfrontend/   # Microfrontend architecture
    │       ├── MICROFRONTEND.md  # Single-SPA overview
    │       ├── CONTAINER.md      # Main container
    │       └── PARCELS.md        # Parcel apps
    │
    ├── rules/                # Development guidelines
    │   ├── design-system/   # Design system rules
    │   │   ├── MAIN.md
    │   │   ├── PRIMITIVES.md
    │   │   ├── TOKENS.md
    │   │   ├── STORYBOOK.md
    │   │   └── DOCUMENTATION.md
    │   │
    │   └── microfrontend/   # Microfrontend rules
    │       ├── CONTAINER.md
    │       └── PARCEL.md
    │
    └── meta/                 # Documentation about documentation
        ├── README.md         # Guide for AI agents
        ├── HOW_TO_UPDATE.md  # Update workflows
        ├── templates/        # Creation templates
        └── prompts/          # Update prompts
```

## 🎯 Decision Tree

```
┌─ Need to understand the project?
│  └─→ Start with architecture/GLOBAL.md
│
┌─ Need to work on design system?
│  ├─→ Understanding structure? → architecture/design-system/DESIGN_SYSTEM.md
│  ├─→ Main package architecture? → architecture/design-system/MAIN.md
│  ├─→ Adding component? → rules/design-system/MAIN.md
│  ├─→ CSS issues? → architecture/design-system/CSS.md
│  ├─→ Primitive/Token issues? → architecture/design-system/PRIMITIVES.md or TOKENS.md
│  └─→ Documentation? → rules/design-system/DOCUMENTATION.md
│
┌─ Need to work on microfrontend?
│  ├─→ Understanding architecture? → architecture/microfrontend/MICROFRONTEND.md
│  ├─→ Modifying main-container? → rules/microfrontend/CONTAINER.md
│  ├─→ Creating/modifying parcel? → rules/microfrontend/PARCEL.md
│  └─→ Container vs Parcel? → architecture/microfrontend/CONTAINER.md or PARCELS.md
│
┌─ Need to update documentation?
│  ├─→ Architecture change? → meta/prompts/ARCHITECTURE_UPDATE_PROMPTS.md
│  └─→ Rules change? → meta/prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md
│
└─ Need to create new documentation?
   └─→ Check meta/templates/ for the right template
```

## 🔍 Search Strategy

**If you're looking for specific information:**

1. **Check this file first** for quick links
2. **Read the relevant architecture doc** for context
3. **Consult the specific rules doc** for detailed guidelines
4. **Use grep/search** in the repository if needed

## ⚡ Quick Commands

```bash
# List all packages
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;

# View workspace structure
cat pnpm-workspace.yaml

# List workflows
ls -la .github/workflows/

# List actions
ls -la .github/actions/

# Search in AI docs
grep -r "keyword" .github/ai/
```

## 📝 Important Notes

- ✅ Always use **real data** from the repository
- ✅ Verify information before writing documentation
- ✅ Remove template instructions from final docs
- ❌ Never leave `[placeholders]` or `[TODO]` in final docs
- ❌ Don't guess package names, file paths, or commands

## 🆘 Need Help?

If you can't find what you're looking for:

1. Check [`meta/README.md`](meta/README.md) for meta-documentation
2. Read the full entry point: [`../AI_README.md`](../AI_README.md)
3. Search repository documentation in `/docs/`

---

**Last Updated**: December 13, 2025
