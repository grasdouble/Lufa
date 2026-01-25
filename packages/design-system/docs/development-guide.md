# Lufa Design System - Development Guide

**Generated:** 2026-01-24  
**Version:** 0.6.0  
**Workflow:** BMM Document Project - Deep Scan  
**Agent:** Mary (Business Analyst)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Development Environment](#development-environment)
4. [Common Workflows](#common-workflows)
5. [Package Management](#package-management)
6. [Testing](#testing)
7. [Code Quality](#code-quality)
8. [Git Workflow](#git-workflow)
9. [Release Process](#release-process)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools

| Tool        | Version       | Purpose            | Installation                       |
| ----------- | ------------- | ------------------ | ---------------------------------- |
| **Node.js** | 24.9.0        | JavaScript runtime | [nodejs.org](https://nodejs.org)   |
| **pnpm**    | 10.26.x+      | Package manager    | `npm install -g pnpm@10.26`        |
| **Git**     | Latest stable | Version control    | [git-scm.com](https://git-scm.com) |

### Version Management

**Using `.tool-versions`:**

The project uses `.tool-versions` file (asdf format) to lock Node.js version:

```
# .tool-versions
nodejs 24.9.0
```

**Recommended:** Use [asdf](https://asdf-vm.com) or [fnm](https://github.com/Schniz/fnm) to automatically switch Node versions.

---

## Initial Setup

### 1. Clone Repository

```bash
# HTTPS
git clone https://github.com/grasdouble/Lufa.git
cd Lufa

# SSH (recommended for contributors)
git clone git@github.com:grasdouble/Lufa.git
cd Lufa
```

### 2. Install Dependencies

```bash
# Install all packages (monorepo-wide)
pnpm install
```

**What this does:**

- Installs dependencies for all 7 design system packages
- Sets up workspace symlinks (`workspace:^` protocol)
- Installs Git hooks (Husky)
- Configures lint-staged for pre-commit checks

**Expected duration:** 2-3 minutes (first time)

### 3. Build All Packages

```bash
# Build in correct order (tokens → main → storybook → docusaurus)
pnpm ds:all:build
```

**Why this is required:**

- Tokens package generates CSS and TypeScript files used by main
- Main package must be built before Storybook can import components
- Storybook build depends on compiled component bundles

**Expected duration:** 60-90 seconds (full build)

### 4. Verify Setup

```bash
# Check linting
pnpm ds:all:lint

# Check formatting
pnpm ds:all:prettier

# Run tests (optional - requires snapshots)
pnpm ds:test
```

**Success criteria:**

- ✅ No linting errors
- ✅ No formatting issues
- ✅ All packages build successfully

---

## Development Environment

### IDE Setup

**Recommended:** Visual Studio Code with extensions:

- **ESLint** - Real-time linting
- **Prettier** - Code formatting
- **TypeScript** - Language support
- **Playwright Test for VSCode** - Test debugging
- **GitHub Copilot** (optional) - AI assistance

**VSCode Settings (`.vscode/settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.associations": {
    "*.css": "css"
  }
}
```

### Editor Configuration

**EditorConfig** (`.editorconfig` in root):

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

### Browser DevTools

**For Storybook development:**

- Chrome DevTools (React DevTools extension recommended)
- Firefox Developer Edition (good color picker)
- Safari Web Inspector (for testing WebKit-specific issues)

---

## Common Workflows

### Starting Development Servers

#### Design System (Storybook + Watch Mode)

```bash
# Start all design system dev servers concurrently
pnpm ds:all:dev
```

**What this runs:**

- `pnpm ds:main:dev` → Vite watch mode (rebuilds components on change)
- `pnpm ds:storybook:dev` → Storybook server on http://localhost:6006
- `pnpm ds:docusaurus:dev` → Docusaurus on http://localhost:3001

**Use case:** Component development with live preview

#### Storybook Only (Fast Feedback)

```bash
# Just Storybook (fastest startup)
pnpm ds:storybook:dev
```

**When to use:**

- Prototyping component stories
- Visual regression review
- Theme testing

**Startup time:** ~10 seconds (cold), <2 seconds (hot reload)

#### Component Testing UI

```bash
# Interactive Playwright CT UI
pnpm ds:test:ui
```

**Features:**

- Time-travel debugging
- Visual snapshot comparison
- Watch mode (re-run on save)
- Browser selection

**Port:** http://localhost:3100 (test server)

### Building Packages

#### Full Build (Production)

```bash
# Build all design system packages
pnpm ds:all:build
```

**Order:** Tokens → Primitives → Themes → Main → Storybook → Docusaurus

**Duration:** 60-90 seconds

#### Incremental Builds

```bash
# Build only tokens
pnpm ds:tokens:build

# Build only main (requires tokens built first)
pnpm ds:main:build

# Build only Storybook (requires tokens + main)
pnpm ds:storybook:build
```

**Use case:** When you only changed files in one package

#### Watch Mode (Fastest Iteration)

```bash
# Watch main package (auto-rebuild on file change)
pnpm ds:main:dev
```

**How it works:**

- Vite detects file changes
- Rebuilds affected modules (~2 seconds)
- Updates `dist/` folder
- Storybook hot-reloads if running concurrently

---

## Package Management

### Working with Specific Packages

**Using pnpm filter:**

```bash
# General syntax
pnpm --filter <package-name> <command>

# Examples
pnpm --filter @grasdouble/lufa_design-system dev
pnpm --filter @grasdouble/lufa_design-system-tokens build
pnpm --filter @grasdouble/lufa_design-system-storybook lint
```

### Adding Dependencies

#### To a Specific Package

```bash
# Add runtime dependency
pnpm --filter @grasdouble/lufa_design-system add clsx

# Add dev dependency
pnpm --filter @grasdouble/lufa_design-system add -D @types/react

# Add peer dependency (manual edit to package.json)
```

#### Workspace Dependencies

**Always use `workspace:^` protocol:**

```json
// packages/design-system/main/package.json
{
  "dependencies": {
    "@grasdouble/lufa_design-system-tokens": "workspace:^"
  }
}
```

**Why?** Ensures packages use local versions during development, published versions in production.

### Listing Packages

```bash
# List all workspace packages
pnpm list --recursive --depth 0

# List design system packages only
pnpm list --recursive --depth 0 --filter "@grasdouble/lufa_design-system-*"
```

### Updating Dependencies

```bash
# Check outdated dependencies
pnpm outdated

# Update specific dependency
pnpm --filter @grasdouble/lufa_design-system update react@latest

# Generate outdated report (custom script)
pnpm tools:generate-outdated-report
```

**Automated updates:** Dependabot configured in `.github/dependabot.yml`

---

## Testing

### Component Tests (Playwright CT)

#### Running Tests

```bash
# Run all component tests (Chromium only)
pnpm ds:test

# Run tests in interactive UI
pnpm ds:test:ui

# Run tests for specific component
pnpm ds:test -- Box.spec.tsx

# Run tests with specific browser (when enabled)
pnpm ds:test --project=firefox
```

#### Updating Visual Snapshots

**When to update:**

- Intentional design changes
- Token value adjustments
- Component layout modifications

**How to update:**

```bash
# Update all snapshots
pnpm ds:test:update-snapshots

# Update specific component snapshots
pnpm ds:test:update-snapshots -- Box.spec.tsx
```

**⚠️ Important:** Visual snapshots are platform-specific. Use Docker for Linux snapshots:

```bash
# Generate pixel-perfect Linux snapshots (for CI compatibility)
pnpm ds:test:docker:update-snapshots-linux
```

#### Snapshot Management

**Compression (reduces repo size):**

```bash
# Manual compression
pnpm ds:test:compress-snapshots

# Automatic compression (pre-commit hook)
# Runs via lint-staged on `git commit`
```

**Validation:**

```bash
# Validate snapshot system integrity
pnpm ds:test:validate-system
```

### Test Writing Guidelines

**Test Structure (5-part pattern):**

```typescript
// src/components/primitives/NewComponent.spec.tsx
import { test, expect } from '@playwright/experimental-ct-react';
import { NewComponent } from '@grasdouble/lufa_design-system';

test.describe('NewComponent', () => {

  // 1. Basic Rendering
  test('renders with default props', async ({ mount }) => {
    const component = await mount(<NewComponent />);
    await expect(component).toBeVisible();
  });

  // 2. Prop Variants
  test('applies size variant', async ({ mount }) => {
    const component = await mount(<NewComponent size="lg" />);
    await expect(component).toHaveClass(/size-lg/);
  });

  // 3. User Interactions
  test('handles click events', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <NewComponent onClick={() => { clicked = true; }} />
    );
    await component.click();
    expect(clicked).toBe(true);
  });

  // 4. Accessibility
  test('is keyboard accessible', async ({ mount }) => {
    const component = await mount(<NewComponent />);
    await component.focus();
    await expect(component).toBeFocused();
  });

  // 5. Visual Regression
  test('matches snapshot - light mode', async ({ mount }) => {
    const component = await mount(<NewComponent />);
    await expect(component).toHaveScreenshot();
  });

  test('matches snapshot - dark mode', async ({ mount }) => {
    document.documentElement.setAttribute('data-mode', 'dark');
    const component = await mount(<NewComponent />);
    await expect(component).toHaveScreenshot();
  });
});
```

**Best practices:**

- Test user-facing behavior, not implementation
- Use accessible locators (`getByRole`, `getByLabel`)
- Cover all component variants
- Include keyboard navigation tests
- Capture visual regressions in light + dark mode

---

## Code Quality

### Linting

```bash
# Lint all design system packages
pnpm ds:all:lint

# Lint specific package
pnpm ds:main:lint

# Lint with auto-fix
pnpm --filter @grasdouble/lufa_design-system lint --fix
```

**Configuration:** Extends `@grasdouble/lufa_config_eslint` (shared config)

**Rules:**

- TypeScript strict mode
- React best practices
- Accessibility checks (eslint-plugin-jsx-a11y)
- Import order enforcement

### Formatting

```bash
# Format all design system packages
pnpm ds:all:prettier

# Format specific package
pnpm ds:main:prettier

# Check formatting (CI mode)
pnpm --filter @grasdouble/lufa_design-system prettier --check
```

**Configuration:** Uses `@grasdouble/lufa_config_prettier` (shared config)

**Plugins:**

- `prettier-plugin-packagejson` - Sorts package.json fields
- `@ianvs/prettier-plugin-sort-imports` - Sorts imports

### Pre-commit Hooks

**Husky + lint-staged:**

Automatically runs on `git commit`:

1. **lint-staged** - Runs linting/formatting on staged files only
2. **Snapshot compression** - Compresses PNG snapshots (if changed)

**Configuration (`.lintstagedrc.json`):**

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md}": ["prettier --write"],
  "**/__snapshots__/**/*.png": ["bash packages/design-system/playwright/scripts/compress-snapshots-precommit.sh"]
}
```

**Bypass (not recommended):**

```bash
git commit --no-verify -m "WIP: skip hooks"
```

### Validation Scripts

```bash
# Validate token metadata (DTCG format compliance)
pnpm validate:tokens

# Validate AI documentation consistency
pnpm validate:docs
```

---

## Git Workflow

### Branch Strategy

| Branch Pattern | Purpose               | Example                         |
| -------------- | --------------------- | ------------------------------- |
| `main`         | Production-ready code | -                               |
| `feat/*`       | New features          | `feat/add-badge-component`      |
| `fix/*`        | Bug fixes             | `fix/button-hover-state`        |
| `docs/*`       | Documentation updates | `docs/update-storybook-guide`   |
| `chore/*`      | Maintenance tasks     | `chore/upgrade-typescript`      |
| `refactor/*`   | Code refactoring      | `refactor/extract-button-logic` |

### Creating a Feature Branch

```bash
# Start from latest main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feat/your-feature-name
```

### Commit Message Format

**Follow [Conventional Commits](https://www.conventionalcommits.org/):**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting (no code change)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Adding/updating tests
- `chore` - Maintenance tasks
- `build` - Build system changes
- `ci` - CI/CD changes

**Scopes (Design System):**

- `tokens` - Token changes
- `primitives` - Primitive components (Box, Stack, Text, Icon)
- `components` - Interactive components (Button, Badge)
- `storybook` - Storybook stories
- `playwright` - Component tests
- `docusaurus` - Documentation site
- `themes` - Theme variants

**Examples:**

```bash
# Good commit messages
git commit -m "feat(primitives): add Stack gap prop for flexible spacing"
git commit -m "fix(components): resolve Button disabled state hover issue"
git commit -m "docs(storybook): add interactive examples for Box alignment"
git commit -m "test(playwright): add visual regression tests for dark mode"
git commit -m "chore(tokens): update color palette based on design review"

# Bad commit messages (avoid these)
git commit -m "fix stuff"
git commit -m "WIP"
git commit -m "update"
```

### Pull Request Process

1. **Push your branch:**

   ```bash
   git push origin feat/your-feature-name
   ```

2. **Create Pull Request:**
   - Go to GitHub repository
   - Click "Compare & pull request"
   - Fill out PR template:
     - **Title:** Use conventional commit format
     - **Description:** Explain what and why
     - **Screenshots:** For UI changes
     - **Related issues:** Reference issue numbers (`Closes #123`)
     - **Changeset:** Include changeset if user-facing change

3. **Review checklist:**
   - ✅ All CI checks pass (build, lint, test)
   - ✅ Changeset created (if applicable)
   - ✅ Documentation updated
   - ✅ Tests added/updated
   - ✅ Visual regression snapshots reviewed

4. **Address review comments:**

   ```bash
   # Make changes
   git add .
   git commit -m "refactor: address review comments"
   git push origin feat/your-feature-name
   ```

5. **Merge:**
   - Maintainer will squash and merge
   - Delete feature branch after merge

---

## Release Process

### Using Changesets

**What are Changesets?**

Changesets are Markdown files that describe changes and trigger semantic versioning.

**When to create a Changeset:**

- ✅ New component added
- ✅ Component props added/changed
- ✅ Token values changed
- ✅ Bug fixes
- ❌ Internal refactors (no user-facing change)
- ❌ Documentation updates
- ❌ Test additions

### Creating a Changeset

```bash
# Interactive prompt
pnpm changeset
```

**Steps:**

1. **Select affected packages** (use space to select, enter to confirm)

   ```
   ◯ @grasdouble/lufa_design-system-tokens
   ◉ @grasdouble/lufa_design-system
   ◯ @grasdouble/lufa_design-system-themes
   ◉ @grasdouble/lufa_design-system-storybook
   ```

2. **Choose version bump type:**
   - **Major** (1.0.0 → 2.0.0) - Breaking changes
     - Removed props
     - Renamed components
     - Changed default behavior
   - **Minor** (0.5.0 → 0.6.0) - New features (backward compatible)
     - New components
     - New props (optional)
     - New token values
   - **Patch** (0.5.0 → 0.5.1) - Bug fixes
     - Fixes regressions
     - Corrects incorrect behavior
     - No API changes

3. **Write clear description:**

   ```markdown
   # packages/design-system/.changeset/funny-panda-jump.md

   ---

   "@grasdouble/lufa_design-system": minor
   "@grasdouble/lufa_design-system-storybook": patch

   ---

   Add `gap` prop to Stack component for flexible spacing control.

   - Stack now accepts `gap` prop with values: xs, sm, md, lg, xl
   - Defaults to `md` (previous hardcoded value)
   - Updated Storybook stories with gap examples
   ```

4. **Commit changeset:**

   ```bash
   git add .changeset/
   git commit -m "chore: add changeset for Stack gap prop"
   ```

### Version Bumping (Maintainers Only)

```bash
# Apply changesets → bump package.json versions → update CHANGELOGs
pnpm changeset version
```

**What this does:**

- Reads all changesets in `.changeset/` directory
- Bumps package versions in `package.json`
- Updates `CHANGELOG.md` files
- Deletes consumed changeset files

### Publishing (Automated via CI)

**GitHub Actions workflow** (`.github/workflows/changeset-release.yml`):

1. Triggered manually from `main` branch
2. Runs `pnpm changeset version` (if unpublished changesets exist)
3. Runs `pnpm changeset publish`
4. Publishes to GitHub Package Registry (`@grasdouble/*` scope)

**Manual publish (emergency only):**

```bash
# Build all packages
pnpm ds:all:build

# Publish (requires authentication)
pnpm changeset publish
```

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find module '@grasdouble/lufa_design-system-tokens'"

**Cause:** Tokens not built before main package

**Solution:**

```bash
cd packages/design-system/tokens
pnpm build
cd ../main
pnpm build
```

#### 2. "Vite build fails with peer dependency warnings"

**Cause:** React externalized but not installed in consumer

**Solution:** Ensure React is installed as peer dependency:

```bash
pnpm --filter @grasdouble/lufa_design-system add -D react react-dom
```

#### 3. "Storybook shows blank page"

**Cause:** Missing CSS imports or components not built

**Solution:**

```bash
# Rebuild main package
pnpm ds:main:build

# Check Storybook preview.tsx imports
cat packages/design-system/storybook/.storybook/preview.tsx
```

#### 4. "Playwright tests fail with 'Component not found'"

**Cause:** Component not exported from `main/src/index.ts`

**Solution:**

```typescript
// packages/design-system/main/src/index.ts
export { NewComponent, type NewComponentProps } from './components/NewComponent';
```

#### 5. "pnpm install fails with ENOENT"

**Cause:** Corrupted pnpm cache

**Solution:**

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 6. "Visual regression tests fail on different OS"

**Cause:** Pixel differences between macOS/Linux/Windows

**Solution:**

```bash
# Use Docker to generate Linux snapshots (CI-compatible)
pnpm ds:test:docker:update-snapshots-linux
```

#### 7. "Utility classes not generated"

**Cause:** `generate-utilities` script not run before build

**Solution:**

```bash
# Main package build script runs this automatically:
pnpm --filter @grasdouble/lufa_design-system generate:utilities --all

# Or run manually:
cd packages/design-system/main
node scripts/generate-utilities.cjs --all
```

### Debug Commands

```bash
# Check package dependency graph
pnpm list --depth 1

# Check which packages are out of date
pnpm outdated --recursive

# Check workspace protocol resolution
pnpm why @grasdouble/lufa_design-system-tokens

# Verify Node.js version
node -v  # Should be 24.9.0

# Verify pnpm version
pnpm -v  # Should be 10.26.x or later
```

### Getting Help

**Resources:**

- [Project README](../../README.md)
- [CONTRIBUTING Guide](../../CONTRIBUTING.md)
- [Storybook Stories](http://localhost:6006) (when running)
- [Docusaurus Docs](http://localhost:3001) (when running)

**Community:**

- Open an issue on GitHub
- Check existing issues for similar problems
- Review POCs in `docs/POCs.md`

---

## Quick Reference Card

### Daily Development

```bash
# Start development
pnpm ds:all:dev                 # Storybook + watch mode + docs

# Run tests
pnpm ds:test:ui                 # Interactive test UI

# Code quality
pnpm ds:all:lint                # Check linting
pnpm ds:all:prettier            # Format code
```

### Building

```bash
pnpm ds:all:build               # Full build (tokens → main → storybook → docs)
pnpm ds:tokens:build            # Just tokens
pnpm ds:main:build              # Just main (requires tokens)
```

### Testing

```bash
pnpm ds:test                    # Run tests
pnpm ds:test:ui                 # Interactive UI
pnpm ds:test:update-snapshots   # Update visual snapshots
```

### Git Workflow

```bash
git checkout -b feat/my-feature # Create feature branch
git commit -m "feat(scope): description" # Commit with conventional format
pnpm changeset                  # Create changeset (if user-facing change)
git push origin feat/my-feature # Push branch
# Create PR on GitHub
```

### Package Management

```bash
pnpm --filter <pkg> <cmd>       # Run command in specific package
pnpm --filter <pkg> add <dep>   # Add dependency to package
pnpm list --recursive --depth 0 # List all workspace packages
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-24  
**Maintained By:** BMM Document Project Workflow
