# GitHub Copilot Instructions

> 📘 **Primary Documentation**: See [AGENTS.md](../AGENTS.md) for comprehensive development guide.

This file contains GitHub Copilot-specific instructions and references to path-scoped rules. For detailed documentation, always refer to [AGENTS.md](../AGENTS.md).

> ℹ️ **Note on AI Models**: GitHub Copilot uses GPT-4/Codex models. This repository also supports **Claude Code** (via [CLAUDE.md](../CLAUDE.md)) and **OpenAI Codex Extension** (via [config.toml](../config.toml)). See [AGENTS.md - AI Agent Compatibility](../AGENTS.md#-ai-agent-compatibility) for details.

---

## Project Overview

Lufa is a monorepo with:
- **Design System** with strict three-layer architecture (primitives → tokens → components)
- **Microfrontends** using Single-SPA
- **pnpm workspaces** for package management
- **Playwright** for component testing
- **Strict TypeScript** and code quality standards

**Critical Concept**: Design system components MUST use tokens only and MUST NOT import primitives or hard-code values.

---

## Path-Scoped Instructions

GitHub Copilot automatically applies these instructions based on file paths:

### Design System
- **[lufa-design-system.instructions.md](instructions/lufa-design-system.instructions.md)**
  - Applied to: `packages/design-system/**/*.{ts,tsx,css}`
  - Covers: Three-layer architecture, component patterns, token usage

### React Components
- **[reactjs.instructions.md](instructions/reactjs.instructions.md)**
  - Applied to: `**/*.{jsx,tsx,js,ts,css,scss}`
  - Covers: React 19+, hooks, functional components, best practices

### Accessibility
- **[a11y.instructions.md](instructions/a11y.instructions.md)**
  - Applied to: `**`
  - Covers: WCAG 2.2 Level AA, keyboard nav, screen readers, ARIA

### TypeScript
- **[typescript-5-es2022.instructions.md](instructions/typescript-5-es2022.instructions.md)**
  - Applied to: `**/*.ts`
  - Covers: TypeScript 5.x, ES2022, strict mode, naming conventions

### Playwright Tests
- **[playwright-typescript.instructions.md](instructions/playwright-typescript.instructions.md)**
  - Applied to: `**`
  - Covers: E2E and component testing, locators, assertions

### Tailwind CSS
- **[tailwindcss.instructions.md](instructions/tailwindcss.instructions.md)**
  - Applied to: `**/*.{jsx,tsx,js,ts,html,css}`
  - Covers: Utility-first CSS, responsive design, design tokens

### Additional Instructions
- **[performance-optimization.instructions.md](instructions/performance-optimization.instructions.md)**
- **[markdown.instructions.md](instructions/markdown.instructions.md)**
- **[nodejs-javascript-vitest.instructions.md](instructions/nodejs-javascript-vitest.instructions.md)**
- **[github-actions-ci-cd-best-practices.instructions.md](instructions/github-actions-ci-cd-best-practices.instructions.md)**
- **[ai-prompt-engineering-safety-best-practices.instructions.md](instructions/ai-prompt-engineering-safety-best-practices.instructions.md)**
- **[update-docs-on-code-change.instructions.md](instructions/update-docs-on-code-change.instructions.md)**
- **[multi-agent-documentation-maintenance.instructions.md](instructions/multi-agent-documentation-maintenance.instructions.md)**

---

## Project-Specific Conventions

### Critical Design System Rules

1. **Three-Layer Architecture** (see [AGENTS.md - Design System Architecture](../AGENTS.md#design-system-three-layer-architecture))
   - **Layer 1: Primitives** - Raw values (`spacing[16]`, `blue[600]`)
   - **Layer 2: Tokens** - Semantic names (`primary`, `compact`)
   - **Layer 3: Components** - React components using TOKENS only

2. **Import Rules**
   ```typescript
   // ✅ CORRECT - Components import tokens
   import { color, spacing } from '@grasdouble/lufa_design-system-tokens';

   // ❌ WRONG - Components MUST NOT import primitives
   import { spacing } from '@grasdouble/lufa_design-system-primitives';

   // ❌ WRONG - Never hard-code values
   const styles = { padding: '16px' };
   ```

3. **Build Order Matters**
   ```bash
   pnpm ds:tokens:build       # 1. First!
   pnpm ds:primitives:build   # 2. Then primitives
   pnpm ds:main:build         # 3. Then components
   pnpm ds:storybook:build    # 4. Finally Storybook
   ```

### Monorepo Conventions

- Use `pnpm` for all package management
- Use `--filter` flag for package-specific commands
- Internal dependencies use `workspace:^` protocol
- All published packages use `@grasdouble/` scope

### Component Standards

- Functional components with hooks only
- TypeScript interfaces with JSDoc documentation
- Set `displayName` on all components
- Use `ComponentPropsWithoutRef<'element'>` for HTML props
- WCAG 2.1 AA accessibility required
- Playwright component tests required

### Testing Strategy

- **Playwright Component Tests** for design system components
  - File location: Co-located with components as `*.spec.tsx`
  - Import: `@playwright/experimental-ct-react`
  - Run: `pnpm --filter @grasdouble/lufa_design-system test-ct`

### Commit Conventions

- Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat(design-system): add Button variants`
  - `fix(microfrontend): resolve routing issue`
  - `docs: update AGENTS.md`
  - `chore: add changeset`
- Create changesets for all user-facing changes: `pnpm changeset`

---

## Quick Commands

```bash
# Setup
pnpm install              # Install all dependencies
pnpm all:build            # Build all packages (required first time)

# Development
pnpm ds:storybook:dev     # Design system with Storybook (:6006)
pnpm app:mf:dev           # Microfrontends (:3000 + :3001)
pnpm ds:main:dev          # Design system watch mode

# Build (CRITICAL: order matters for design system!)
pnpm ds:all:build         # Design system (correct order)
pnpm all:build            # Everything

# Quality Checks
pnpm all:lint             # Lint all packages
pnpm all:prettier         # Format all packages

# Testing
pnpm --filter @grasdouble/lufa_design-system test-ct

# Version Management
pnpm changeset            # Create changeset for releases
```

### Working with Specific Packages

```bash
# Find packages
pnpm list --recursive --depth 0

# Filter commands
pnpm --filter @grasdouble/lufa_design-system [command]
pnpm --filter @grasdouble/lufa_design-system add clsx
pnpm --filter @grasdouble/lufa_design-system build

# Pattern matching (all design system packages)
pnpm --filter @grasdouble/lufa_design-system-* build
```

---

## Common Patterns

### Creating a Design System Component

```typescript
// 1. Import tokens (never primitives!)
import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { color, spacing } from '@grasdouble/lufa_design-system-tokens';

// 2. Define props interface
export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

// 3. Implement component
export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => (
  <button className={clsx('btn', `btn-${variant}`)} {...props}>
    {children}
  </button>
);

// 4. Set displayName
Button.displayName = 'Button';
```

### Writing Playwright Component Tests

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test('button renders correctly', async ({ mount }) => {
  const component = await mount(<Button>Click me</Button>);
  await expect(component).toContainText('Click me');
});
```

---

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Build fails | `pnpm ds:all:build` (order matters!) |
| Cannot find module @grasdouble/lufa_design-system-tokens | `pnpm ds:tokens:build` |
| TypeScript errors in components | `pnpm ds:all:build` (wrong build order) |
| Component not in Storybook | Export from `packages/design-system/main/src/index.ts` |

---

## Additional Resources

For comprehensive documentation, see:

- **[AGENTS.md](../AGENTS.md)** - Complete development guide
  - Project overview and architecture
  - Detailed workflows and patterns
  - Code examples and common mistakes
  - Troubleshooting guides

- **[CLAUDE.md](../CLAUDE.md)** - Quick reference

- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Contribution workflow

- **[.github/instructions/](instructions/)** - Technology-specific instructions (auto-applied)

- **[.github/prompts/](prompts/)** - Reusable AI prompts

- **[docs/howto/](../docs/howto/)** - How-to guides

---

## Key Takeaways

1. **Three-layer architecture is critical** - Components use tokens only
2. **Build order matters** - tokens → primitives → main → storybook
3. **Testing is required** - All components need Playwright tests
4. **Use path-scoped instructions** - Check `.github/instructions/` for specific guidance
5. **Refer to AGENTS.md** - Comprehensive documentation lives there

---

**For complete documentation, always refer to [AGENTS.md](../AGENTS.md)**.
