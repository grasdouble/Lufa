# Lufa Design System - Documentation Index

**Generated:** 2026-01-24  
**Version:** 0.7.0  
**Workflow:** BMM Document Project - Deep Scan  
**Agent:** Mary (Business Analyst)

---

## 📋 Quick Navigation

| Document                                                               | Purpose                                  | Audience                 | Est. Reading Time |
| ---------------------------------------------------------------------- | ---------------------------------------- | ------------------------ | ----------------- |
| **[Project Overview](./overview.md)**                                  | High-level introduction, getting started | Everyone                 | 15 min            |
| **[Development Policies](./development-policies.md)** ⭐               | Policies for current refactoring phase   | Developers, AI Agents    | 10 min            |
| **[Architecture](./architecture.md)**                                  | System design, decisions, principles     | Architects, Developers   | 45 min            |
| **[Development Guide](./development-guide.md)**                        | Setup, workflows, troubleshooting        | Developers, Contributors | 30 min            |
| **[Token Architecture](../tokens/_docs/token-architecture.md)**        | 4-level token system details             | Designers, Developers    | 20 min            |
| **[Build Configuration](./build-configuration.md)**                    | Vite, Style Dictionary, Playwright       | DevOps, Build Engineers  | 25 min            |
| **[Source Tree Analysis](./source-tree.md)**                           | Directory structure, entry points        | Developers, Onboarding   | 20 min            |
| **[Component Inventory](../main/_docs/component-inventory.md)**        | Component catalog with props             | Developers, Designers    | 15 min            |
| **[Testing Strategy](../playwright/_docs/testing-strategy.md)**        | Playwright CT, 5-part structure          | QA, Developers           | 15 min            |
| **[Documentation Patterns](../storybook/_docs/storybook-patterns.md)** | Storybook CSF3 patterns                  | Docs Writers, Developers | 30 min            |

---

## 🎯 Start Here

### New to Lufa Design System?

**Read these in order:**

1. **[Project Overview](./overview.md)** - Understand what Lufa DS is and why it exists
2. **[Development Policies](./development-policies.md)** ⭐ - Current phase policies (AI agents should read this!)
3. **[Development Guide](./development-guide.md)** - Set up your environment and run your first build
4. **[Component Inventory](../main/_docs/component-inventory.md)** - Explore available components

**Estimated time:** 1 hour 10 min

### Onboarding as a Developer?

**Follow this learning path:**

1. **[Project Overview](./overview.md)** - Get context (15 min)
2. **[Development Policies](./development-policies.md)** ⭐ - Current phase rules (10 min)
3. **[Development Guide](./development-guide.md)** - Setup & workflows (30 min)
4. **[Source Tree Analysis](./source-tree.md)** - Understand folder structure (20 min)
5. **[Token Architecture](../tokens/_docs/token-architecture.md)** - Learn token system (20 min)
6. **[Architecture](./architecture.md)** - Deep dive (45 min)

**Total:** ~2.5 hours

**Hands-on practice:**

```bash
# Follow along while reading Development Guide
pnpm install
pnpm ds:all:build
pnpm ds:storybook:dev  # Visit http://localhost:6006
```

### Onboarding as a Designer?

**Read these:**

1. **[Project Overview](./overview.md)** - Understand the system
2. **[Token Architecture](../tokens/_docs/token-architecture.md)** - Learn the token system
3. **[Component Inventory](../main/_docs/component-inventory.md)** - Browse components
4. **Interactive Storybook** - Explore components live (http://localhost:6006)

**Total:** ~50 minutes

### Need to Build/Deploy?

**Quick reference:**

1. **[Build Configuration](./build-configuration.md)** - Build pipeline, scripts
2. **[Development Guide > Troubleshooting](./development-guide.md#troubleshooting)** - Common issues

---

## 📚 Documentation by Topic

### System Understanding

<details>
<summary><strong>Architecture & Design</strong></summary>

- **[Architecture](./architecture.md)** - Comprehensive system architecture
  - Three-layer component hierarchy
  - Four-level token system
  - Architectural principles
  - Design decisions & trade-offs
  - Extension points

- **[Token Architecture](../tokens/_docs/token-architecture.md)** - Token system deep dive
  - DTCG format compliance
  - 4-level cascade (primitives → core → semantic → component)
  - Performance (8ms CSS cascade)
  - Naming conventions

- **[Source Tree Analysis](./source-tree.md)** - Codebase structure
  - 7-package breakdown
  - Entry points & critical paths
  - Dependency graph
  - Configuration files

</details>

<details>
<summary><strong>Components & API</strong></summary>

- **[Component Inventory](../main/_docs/component-inventory.md)** - Component catalog
  - 7 components (Box, Stack, Text, Icon, Button, Badge, Divider)
  - Props reference
  - Usage examples
  - Composition patterns

- **[Documentation Patterns](../storybook/_docs/storybook-patterns.md)** - Storybook guide
  - CSF3 format
  - 46+ story examples
  - Helper components (PropCard, CodeBlock)
  - Data-driven rendering patterns

</details>

<details>
<summary><strong>Development & Operations</strong></summary>

- **[Development Guide](./development-guide.md)** - Complete dev workflow
  - Prerequisites & setup
  - Common workflows
  - Testing (Playwright CT)
  - Git workflow & commit conventions
  - Release process (Changesets)
  - Troubleshooting

- **[Build Configuration](./build-configuration.md)** - Build system
  - Vite library mode
  - Style Dictionary pipeline
  - Storybook builder
  - Playwright CT server
  - Optimization strategies

</details>

<details>
<summary><strong>Testing & Quality</strong></summary>

- **[Testing Strategy](../playwright/_docs/testing-strategy.md)** - Test design
  - Playwright Component Testing
  - 5-part test structure
  - 554 test cases
  - Visual regression (5 browsers)
  - Snapshot management

- **[Development Guide > Code Quality](./development-guide.md#code-quality)** - Linting, formatting, pre-commit hooks

</details>

---

## 🔍 Documentation by Use Case

### Use Case 1: "I want to add a new component"

**Read these sections:**

1. **[Development Guide > Common Workflows](./development-guide.md#common-workflows)** - Development servers
2. **[Architecture > Extension Points > Adding New Components](./architecture.md#adding-new-components)** - Step-by-step process
3. **[Documentation Patterns](../storybook/_docs/storybook-patterns.md)** - Storybook story patterns
4. **[Testing Strategy](../playwright/_docs/testing-strategy.md)** - Test structure

**Workflow summary:**

1. Create component directory
2. Implement component with TypeScript
3. Create utility config (if needed)
4. Add Storybook story
5. Write Playwright tests
6. Export from main index
7. Create changeset

**Example:** See **[Component Inventory > Button](../main/_docs/component-inventory.md#button-interactive-component)** for reference implementation.

### Use Case 2: "I need to modify token values"

**Read these sections:**

1. **[Token Architecture](../tokens/_docs/token-architecture.md)** - Token system overview
2. **[Token Architecture > Token Modification Workflow](../tokens/_docs/token-architecture.md#token-modification-workflow)** - Step-by-step
3. **[Build Configuration > Tokens Package](./build-configuration.md#tokens-package)** - Build process

**Workflow summary:**

1. Locate token file (`packages/design-system/tokens/src/...`)
2. Edit JSON value
3. Run `pnpm ds:tokens:build`
4. Run `pnpm ds:main:build` (components depend on tokens)
5. Verify in Storybook

**Important:** Token changes cascade to all components automatically.

### Use Case 3: "The build is failing"

**Read these sections:**

1. **[Development Guide > Troubleshooting](./development-guide.md#troubleshooting)** - Common issues
2. **[Build Configuration > Troubleshooting](./build-configuration.md#troubleshooting)** - Build-specific issues

**Most common issues:**

| Error                                                      | Cause                   | Solution                          |
| ---------------------------------------------------------- | ----------------------- | --------------------------------- |
| "Cannot find module @grasdouble/lufa_design-system-tokens" | Tokens not built        | `pnpm ds:tokens:build`            |
| "CSS custom property '--lufa-\*' not found"                | Tokens CSS not imported | Import tokens.css in consumer     |
| "Component not found"                                      | Not exported from main  | Add export to `main/src/index.ts` |

### Use Case 4: "I want to update visual regression snapshots"

**Read these sections:**

1. **[Testing Strategy > Visual Regression](../playwright/_docs/testing-strategy.md#visual-regression-strategy)** - Snapshot management
2. **[Development Guide > Testing > Updating Visual Snapshots](./development-guide.md#updating-visual-snapshots)** - Commands

**Commands:**

```bash
# Update all snapshots
pnpm ds:test:update-snapshots

# Generate Linux snapshots (CI-compatible)
pnpm ds:test:docker:update-snapshots-linux

# Compress snapshots (reduce repo size)
pnpm ds:test:compress-snapshots
```

### Use Case 5: "I need to create a release"

**Read these sections:**

1. **[Development Guide > Release Process](./development-guide.md#release-process)** - Using Changesets
2. **[Development Guide > Git Workflow](./development-guide.md#git-workflow)** - Commit conventions

**Workflow:**

1. Make changes
2. Create changeset: `pnpm changeset`
3. Commit changeset file
4. Push to main branch
5. GitHub Actions handles versioning & publishing

---

## 📊 Documentation Statistics

### Coverage

| Topic            | Documents | Total Words | Completeness |
| ---------------- | --------- | ----------- | ------------ |
| **Architecture** | 1         | 15,000+     | ✅ Complete  |
| **Development**  | 1         | 10,000+     | ✅ Complete  |
| **Components**   | 2         | 15,000+     | ✅ Complete  |
| **Tokens**       | 1         | 5,000+      | ✅ Complete  |
| **Build**        | 1         | 8,000+      | ✅ Complete  |
| **Testing**      | 1         | 4,000+      | ✅ Complete  |
| **Source Tree**  | 1         | 7,000+      | ✅ Complete  |

**Total:** 10 documents, ~61,000+ words, 100% coverage

### Generated Files

All files generated on **2026-01-24** by BMM Document Project Workflow (Deep Scan):

1. ✅ `overview.md` (7,000+ words)
2. ✅ `architecture.md` (15,000+ words)
3. ✅ `development-guide.md` (10,000+ words)
4. ✅ `tokens/_docs/token-architecture.md` (5,000+ words)
5. ✅ `build-configuration.md` (8,000+ words)
6. ✅ `source-tree.md` (7,000+ words)
7. ✅ `main/_docs/component-inventory.md` (4,000+ words)
8. ✅ `playwright/_docs/testing-strategy.md` (4,000+ words)
9. ✅ `storybook/_docs/storybook-patterns.md` (10,000+ words)
10. ✅ `index.md` (this file)

### Maintenance

**Keeping docs up-to-date:**

- Re-run BMM Document Project workflow after major changes
- Update relevant sections manually for minor changes
- Review documentation quarterly for accuracy

**Last full scan:** 2026-01-24  
**Next recommended scan:** After v0.7.0 release (Badge + Divider components complete)

---

## 🚀 Quick Commands Reference

### Development

```bash
# Start all dev servers
pnpm ds:all:dev

# Start Storybook only
pnpm ds:storybook:dev

# Build all packages
pnpm ds:all:build
```

### Testing

```bash
# Run tests
pnpm ds:test

# Interactive test UI
pnpm ds:test:ui

# Update snapshots
pnpm ds:test:update-snapshots
```

### Code Quality

```bash
# Lint
pnpm ds:all:lint

# Format
pnpm ds:all:prettier

# Pre-commit checks (automatic)
git commit -m "feat: message"
```

### Release

```bash
# Create changeset
pnpm changeset

# Commit changeset
git add .changeset/
git commit -m "chore: add changeset"
```

---

## 🎓 Learning Paths

### Path 1: Component Developer (Junior)

**Goal:** Understand basics, build simple components

1. Read: [Project Overview](./overview.md) (15 min)
2. Read: [Development Guide > Setup](./development-guide.md#initial-setup) (15 min)
3. Read: [Component Inventory > Box](../main/_docs/component-inventory.md#box-layout-primitive) (10 min)
4. Practice: Build a simple component using Box + Text
5. Read: [Testing Strategy](../playwright/_docs/testing-strategy.md) (15 min)
6. Practice: Write tests for your component

**Time:** 2-3 hours (including practice)

### Path 2: Component Developer (Intermediate)

**Goal:** Master component patterns, token system

1. Complete Path 1
2. Read: [Token Architecture](../tokens/_docs/token-architecture.md) (20 min)
3. Read: [Architecture > Component Architecture](./architecture.md#component-architecture) (20 min)
4. Read: [Documentation Patterns](../storybook/_docs/storybook-patterns.md) (30 min)
5. Practice: Build Button-like component with variants
6. Practice: Write comprehensive Storybook story

**Time:** 4-5 hours (including practice)

### Path 3: Architecture & Design Decisions

**Goal:** Understand why things are the way they are

1. Read: [Architecture](./architecture.md) (45 min)
2. Read: [Architecture > Design Decisions](./architecture.md#design-decisions) (20 min)
3. Read: [Build Configuration](./build-configuration.md) (25 min)
4. Read: [Token Architecture > Performance](../tokens/_docs/token-architecture.md#performance) (10 min)
5. Reflect: Why these choices? What trade-offs?

**Time:** 2 hours

### Path 4: Build & DevOps

**Goal:** Understand build pipeline, CI/CD

1. Read: [Build Configuration](./build-configuration.md) (25 min)
2. Read: [Development Guide > Build Scripts](./development-guide.md#build-scripts-reference) (10 min)
3. Read: [Source Tree Analysis](./source-tree.md) (20 min)
4. Practice: Run full build pipeline locally
5. Practice: Fix a build failure

**Time:** 2-3 hours (including practice)

---

## 📞 Getting Help

### For Code Issues

1. Check **[Troubleshooting](./development-guide.md#troubleshooting)** section
2. Search existing [GitHub Issues](https://github.com/grasdouble/Lufa/issues)
3. Create new issue with reproduction steps

### For Documentation Issues

1. Check this index for relevant document
2. Use browser search (Cmd+F / Ctrl+F) within documents
3. Create GitHub issue tagged "documentation"

### For Architectural Questions

1. Read **[Architecture](./architecture.md)** document
2. Check **[Design Decisions](./architecture.md#design-decisions)** section
3. Open GitHub Discussion for clarification

---

## 🔗 External Resources

### Official Links

- **Repository:** [github.com/grasdouble/Lufa](https://github.com/grasdouble/Lufa)
- **Storybook:** http://localhost:6006 (dev mode)
- **Docusaurus:** http://localhost:3001 (dev mode)
- **Package Registry:** [GitHub Packages](https://github.com/grasdouble?tab=packages&repo_name=Lufa)

### Technology Documentation

- **React:** [react.dev](https://react.dev)
- **TypeScript:** [typescriptlang.org](https://www.typescriptlang.org/docs/)
- **Vite:** [vitejs.dev](https://vitejs.dev)
- **Style Dictionary:** [styledictionary.com](https://styledictionary.com)
- **Playwright:** [playwright.dev](https://playwright.dev/docs/test-components)
- **Storybook:** [storybook.js.org](https://storybook.js.org/docs)

### Inspiration & References

- **Radix UI:** [radix-ui.com](https://www.radix-ui.com) - Accessible primitives
- **Chakra UI:** [chakra-ui.com](https://chakra-ui.com) - Component composition
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com) - Utility-first approach

---

## 📝 Document Metadata

| Attribute           | Value                            |
| ------------------- | -------------------------------- |
| **Generated**       | 2026-01-24                       |
| **Workflow**        | BMM Document Project - Deep Scan |
| **Agent**           | Mary (Business Analyst)          |
| **Scan Level**      | Deep (10-30 min duration)        |
| **Coverage**        | Design System packages only      |
| **Total Documents** | 10 files                         |
| **Total Words**     | ~60,000+                         |
| **Completeness**    | 100%                             |

---

## ✨ Next Steps

**After reading this index:**

1. **Start with** [Project Overview](./overview.md) for high-level context
2. **Follow a learning path** based on your role (see [Learning Paths](#-learning-paths))
3. **Bookmark key documents** for quick reference
4. **Set up your dev environment** using [Development Guide](./development-guide.md)
5. **Explore Storybook** at http://localhost:6006 for interactive learning

**Happy coding! 🚀**

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-24  
**Maintained By:** BMM Document Project Workflow
