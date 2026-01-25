# Design System Project Context

> **Note**: For comprehensive documentation, see [docs/index.md](./docs/index.md)

## Quick Reference for AI Agents

This file provides essential context for AI agents working on the design system. For detailed documentation, humans should refer to the docs/ folder.

---

### Development Phase

**Current Status:** Major refactoring phase with **zero production users**

**Version:** Pre-v1.0.0 (all packages under active development)

**Focus:** Building the right API and architecture before public release

---

### Key Policy: No Backward Compatibility Required

⚠️ **CRITICAL:** See [docs/development-policies.md](./docs/development-policies.md) for full details.

**Summary:**

- ❌ NO CHANGELOG.md, migration guides, or deprecation warnings needed
- ❌ NO backward compatibility layers or deprecated API support
- ✅ Clean breaks are acceptable and encouraged
- ✅ Focus on building the best API, not maintaining old ones

**Why:** With zero production users, we can iterate freely without the overhead of maintaining compatibility or documenting migrations.

---

### When Making Breaking Changes

**Just do it.** No ceremony needed until v1.0.0 is published.

**Process:**

1. Remove old API completely
2. Implement new API
3. Update all tests to use new API
4. Update Storybook stories
5. Update Docusaurus examples (if they exist)
6. Document new API clearly in JSDoc and Storybook

**Don't:**

- ❌ Add deprecation warnings
- ❌ Keep old props alongside new ones
- ❌ Write migration guides
- ❌ Create CHANGELOG entries

---

### Architecture Fundamentals

**Three-Layer Token System** (CRITICAL - Read [CLAUDE.md](../../CLAUDE.md)):

```
Layer 3: Components (@grasdouble/lufa_design-system)
         ↓ Uses tokens only
Layer 2: Tokens (@grasdouble/lufa_design-system-tokens)
         ↓ References primitives
Layer 1: Primitives (@grasdouble/lufa_design-system-primitives)
         Raw values
```

**Rules:**

- ✅ Components MUST use tokens (never primitives or hard-coded values)
- ✅ Tokens reference primitives
- ✅ Build order matters: tokens → primitives → main → storybook

---

### Testing Requirements

**Every component MUST have:**

- ✅ Comprehensive Playwright component tests
- ✅ Visual regression snapshots
- ✅ Accessibility tests (keyboard, ARIA, focus)
- ✅ All props and variants tested

**Location:** `packages/design-system/playwright/src/components/`

**Why:** Tests are our safety net during rapid iteration without backward compatibility.

---

### Code Quality Standards

**Required:**

- ✅ TypeScript strict mode
- ✅ ESLint and Prettier compliance
- ✅ WCAG 2.1 AA accessibility
- ✅ Component displayName set
- ✅ JSDoc documentation for all public APIs

**Build before commit:**

```bash
pnpm ds:tokens:build && pnpm ds:main:build
pnpm ds:test
pnpm all:lint && pnpm all:prettier
```

---

### BMM Workflow Integration

When using BMM dev-story workflow, update these story file sections:

- Task/subtask checkboxes
- Dev Agent Record (decisions, learnings)
- File List (all modified files)
- Change Log (internal dev log, NOT public changelog)
- Status field

See [docs/development-policies.md](./docs/development-policies.md#4-bmm-workflow-compliance) for details.

---

### Quick Commands

```bash
# Development
pnpm ds:storybook:dev          # Storybook on :6006
pnpm ds:main:dev               # Watch mode for components

# Build (order matters!)
pnpm ds:tokens:build           # 1. Tokens first
pnpm ds:main:build             # 2. Then components
pnpm ds:all:build              # Or use this (correct order)

# Testing
pnpm ds:test                   # Run all component tests
pnpm ds:test:ui                # Interactive test UI

# Quality
pnpm all:lint                  # Lint all packages
pnpm all:prettier              # Format all code
```

---

### Documentation Structure

| File                                                           | Purpose                         |
| -------------------------------------------------------------- | ------------------------------- |
| [docs/index.md](./docs/index.md)                               | Master documentation index      |
| [docs/development-policies.md](./docs/development-policies.md) | **Policies for this phase** ⭐  |
| [docs/development-guide.md](./docs/development-guide.md)       | Setup and workflows             |
| [docs/architecture.md](./docs/architecture.md)                 | System architecture             |
| [docs/token-architecture.md](./docs/token-architecture.md)     | Token system details            |
| [docs/testing-strategy.md](./docs/testing-strategy.md)         | Testing approach                |
| [CLAUDE.md](../../CLAUDE.md)                                   | Quick reference for Claude Code |
| [AGENTS.md](../../AGENTS.md)                                   | Comprehensive AI agent guide    |

---

### When This Context Changes

This `project-context.md` file should be updated when:

1. **Development phase changes** (e.g., moving to public beta)
2. **Policies change** (e.g., introducing backward compatibility)
3. **Architecture evolves** (e.g., new token layers)
4. **Critical commands change** (e.g., build process updates)

For detailed policy changes, update [docs/development-policies.md](./docs/development-policies.md) - this file is just a quick reference.

---

### Questions?

- **Humans:** Start with [docs/index.md](./docs/index.md)
- **AI Agents:** You've got what you need above ⬆️
- **Unclear policy?** Check [docs/development-policies.md](./docs/development-policies.md)
