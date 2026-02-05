# Design System Development Policies

## Overview

This document defines development policies specific to the Lufa Design System during its current refactoring phase. These policies help guide both human developers and AI agents in making appropriate decisions about code changes, documentation, and API evolution.

---

## 1. No Public Documentation During Refactoring Phase

### Context

The design system is currently in a **major refactoring phase** with **zero production users**. All packages are pre-v1.0.0 and undergoing significant architectural improvements, including:

- Token system restructuring
- Component API refinements
- Build system optimization
- Testing infrastructure enhancement

### Policy

During this refactoring phase, the following documentation is **NOT required**:

- ❌ **NO CHANGELOG.md files** - No public changelog documenting breaking changes
- ❌ **NO migration guides** - No guides for upgrading between versions
- ❌ **NO deprecation warnings** - No console warnings or JSDoc `@deprecated` tags
- ❌ **NO backward compatibility layers** - No code to support old APIs alongside new ones
- ❌ **NO version comparison documentation** - No "v1 vs v2" documentation

Instead, focus on:

- ✅ **Clean breaks are acceptable** - Remove old APIs completely when introducing better ones
- ✅ **Focus on building the right API first** - Iterate freely without compatibility overhead
- ✅ **Internal documentation only** - Story files, dev notes, and architecture docs are sufficient
- ✅ **Clear component documentation** - Focus on documenting the current API well (Storybook, Docusaurus)

### Rationale

**Why this policy exists:**

1. **No users to migrate** - Without production users, there's no one to break
2. **Faster iteration** - Removing compatibility overhead allows for quicker improvements
3. **Better final API** - Freedom to experiment leads to better design decisions
4. **Reduced maintenance burden** - No need to maintain multiple API versions simultaneously
5. **Cleaner codebase** - No deprecated code paths cluttering the implementation

**Example scenario:**

If you're changing the Divider component from using `variant`, `thickness`, and `spacing` props to using `emphasis` and `size` props:

- ❌ **Don't do this**: Keep old props, add deprecation warnings, maintain backward compatibility
- ✅ **Do this instead**: Remove old props entirely, update all examples, rewrite tests for new API

### Applies to

This policy applies to:

- **All design system packages** under `@grasdouble/lufa_design-system*` scope
- Component API changes (props, behavior, styling)
- Token structure changes (renaming, reorganizing, removing tokens)
- Breaking changes in general (build output, exports, dependencies)
- Package structure changes (moving files, renaming packages)

### Does NOT apply to

This policy does **NOT** exempt you from:

- ✅ **Writing good component documentation** (Storybook stories, JSDoc)
- ✅ **Writing tests** (Playwright component tests are mandatory)
- ✅ **Following code quality standards** (linting, formatting, TypeScript)
- ✅ **Documenting architecture decisions** (in design system docs)
- ✅ **Internal change tracking** (story file Change Logs for BMM workflows)

### When This Policy Changes

This policy will be **retired** when:

1. The design system reaches **v1.0.0** (first stable release)
2. The design system has **production users** (deployed in live applications)
3. The design system is **published publicly** and others depend on it

At that point, we will introduce:

- ✅ **Semantic versioning** with proper CHANGELOG.md
- ✅ **Migration guides** for breaking changes (major versions)
- ✅ **Deprecation warnings** before removing APIs (with grace period)
- ✅ **Backward compatibility** where feasible (within major versions)
- ✅ **Version comparison docs** to help users understand changes

---

## 2. Component Testing Requirements

### Policy

Every component **MUST** have comprehensive Playwright component tests before being considered complete.

**Required coverage:**

- ✅ All props and their variants
- ✅ Interactive behaviors (clicks, keyboard navigation)
- ✅ Accessibility features (ARIA, roles, focus management)
- ✅ Edge cases and error states
- ✅ Visual regression snapshots

**Test location:** Co-located with component source or in `packages/design-system/playwright/src/{foundation,content,interaction,composition,utility}/`

**Rationale:** Since we're iterating freely without backward compatibility, comprehensive tests are our safety net to ensure refactoring doesn't break functionality.

---

## 3. Token-First Architecture

### Policy

Components **MUST** use design tokens for all design values. Direct use of primitives or hard-coded values is **NOT allowed**.

**Required:**

- ✅ Import tokens from `@grasdouble/lufa_design-system-tokens`
- ✅ Use CSS custom properties in `.module.css` files (`var(--lufa-token-*)`)
- ✅ Use TypeScript tokens in Storybook/inline styles (`tokens.color.text.primary`)

**Forbidden:**

- ❌ Importing primitives in components
- ❌ Hard-coded values (`padding: '16px'`, `color: '#FF0000'`)
- ❌ Magic numbers without token references

**Rationale:** Token-based design ensures consistency, enables theming, and makes it easy to update design decisions globally.

See [token-architecture.md](../tokens/_docs/token-architecture.md) for detailed guidance.

---

## 4. BMM Workflow Compliance

### Policy

When using BMM workflows (dev-story, create-story), follow the story file structure and update required sections.

**Required updates in story files:**

- ✅ Task/subtask checkboxes (`[x]` when complete)
- ✅ Dev Agent Record (implementation notes, decisions made)
- ✅ File List (all files modified)
- ✅ Change Log (internal log of what changed during development)
- ✅ Status (ready-for-dev → in-progress → ready-for-review → done)

**Do NOT modify:**

- ❌ Story description
- ❌ Acceptance criteria
- ❌ Task/subtask descriptions (only check/uncheck)

**Rationale:** Structured story files enable workflow automation and maintain clear audit trails of development decisions.

---

## Summary for AI Agents

**TL;DR - What you need to know:**

1. **Breaking changes are OK** - No backward compatibility needed during refactoring phase
2. **No migration docs needed** - Skip CHANGELOG.md, deprecation warnings, migration guides
3. **Focus on quality** - Write tests, use tokens, document the current API well
4. **Clean implementations** - Remove old code completely when introducing new APIs
5. **Internal tracking only** - Story file Change Logs are sufficient for now

**When in doubt:** Build the best API possible without worrying about breaking changes. We'll add versioning discipline when we have users to protect.

---

## Document History

- **2026-01-25**: Initial version - No public documentation during refactoring phase policy
