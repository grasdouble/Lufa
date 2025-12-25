# AGENTS.md

## Project Overview

Lufa is a personal learning monorepo for exploring modern web application development with microfrontend architecture, design systems, and advanced build tooling. The project uses pnpm workspaces, Vite for building, Single-SPA for microfrontend orchestration, and follows strict TypeScript and code quality standards.

**Key Technologies:**

- **Package Manager:** pnpm (10.26.x+) with workspace support
- **Node.js:** 24.9.0 (check `.tool-versions`)
- **Build Tool:** Vite 5.x with custom plugins
- **Microfrontend Framework:** Single-SPA
- **UI Framework:** React 18+ with TypeScript 5.x
- **Styling:** Tailwind CSS with design tokens
- **Testing:** Vitest (unit), Playwright (E2E)
- **Version Management:** Changesets for semantic versioning
- **Documentation:** Storybook 8, Docusaurus 3

## Monorepo Architecture

The repository is organized into focused packages:

- **packages/apps/microfrontend/** - Single-SPA applications (main-container, home)
- **packages/design-system/** - Component library (primitives, tokens, main, themes, storybook, documentation)
- **packages/cdn/** - CDN infrastructure (autobuild-server)
- **packages/plugins/vite/** - Custom Vite plugins (import-map-injector, react-preamble)
- **packages/config/** - Shared configurations (eslint, prettier, tsconfig)
- **packages/poc/** - Proof of concepts and experiments

All published packages use the `@grasdouble/` scope with descriptive names like `@grasdouble/lufa_design-system` or `@grasdouble/lufa_microfrontend_home`.

## Setup Commands

```bash
# Install dependencies
pnpm install

# Build all packages (required before development)
pnpm all:build

# Verify installation
pnpm all:lint
```

## Development Workflow

### Starting Development Servers

```bash
# All microfrontends (main-container + home)
pnpm app:mf:dev
# Access at http://localhost:3000

# Design system with Storybook
pnpm ds:all:dev
# Storybook at http://localhost:6006
# Docusaurus at http://localhost:3001

# Individual design system components in watch mode
pnpm ds:main:dev

# CDN autobuild server
pnpm cdn:autobuild-server:dev

# Run specific package in dev mode
pnpm --filter @grasdouble/lufa_design-system dev
```

### Package Filtering

Use pnpm's `--filter` flag to work with specific packages:

```bash
# Build specific package
pnpm --filter @grasdouble/lufa_design-system build

# Run dev for package
pnpm --filter @grasdouble/lufa_microfrontend_home dev

# Install dependency to specific package
pnpm --filter @grasdouble/lufa_design-system add react-icons

# Run script across multiple packages with pattern
pnpm --filter @grasdouble/lufa_design-system-* build
```

### Navigation Tips

```bash
# Find package location
pnpm list --filter @grasdouble/lufa_design-system --depth 0

# List all workspace packages
pnpm list --recursive --depth 0

# Check package.json name field to confirm package names
cat packages/design-system/main/package.json | grep '"name"'
```

## Code Style and Standards

### TypeScript

- **Strict mode enabled** - All packages use `"strict": true` in tsconfig
- **Target:** ES2022
- **Module:** ESNext with ESM
- **Avoid `any`** - Use `unknown` or proper types
- **Export types** - All public types/interfaces must be exported

### React Components

- **Functional components only** - Use hooks, avoid class components
- **TypeScript interfaces** - Define props with JSDoc documentation
- **Accessibility first** - Follow WCAG 2.1 AA standards (see `.github/instructions/a11y.instructions.md`)
- **Testing required** - Components need unit tests (Vitest)

### Design System

- **Three-layer architecture:**
  1. **Primitives** - Raw, value-based keys (e.g., `spacing[16]`, `timing[300]`)
  2. **Tokens** - Semantic names mapping to primitives (e.g., `spacingTokens.default`)
  3. **Components** - React components using tokens (never hard-code values)
- **Follow instructions:** See `.github/instructions/lufa-design-system.instructions.md`
- **Tailwind CSS** - Use utility classes with token-based customization

### File Naming

- **Components:** PascalCase (e.g., `Button.tsx`, `TextField.tsx`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Tests:** Match source file with `.test.ts` or `.spec.ts`
- **Configuration:** Standard names (e.g., `vite.config.ts`, `tsconfig.json`)

### Import Organization

1. External dependencies (React, third-party)
2. Internal packages (workspace dependencies)
3. Relative imports (parent directories)
4. Relative imports (same directory)
5. Type imports (grouped separately)
6. Style imports (CSS files last)

### Linting and Formatting

```bash
# Lint all packages
pnpm all:lint

# Format all packages
pnpm all:prettier

# Lint specific package
pnpm --filter @grasdouble/lufa_design-system lint

# Format specific package
pnpm --filter @grasdouble/lufa_design-system prettier
```

Configuration files:

- **ESLint:** `@grasdouble/lufa_config_eslint` packages (basic, node, react)
- **Prettier:** `@grasdouble/lufa_config_prettier` package
- **TypeScript:** `@grasdouble/lufa_config_tsconfig` package (base, node, react-app, react-library)

## Testing Instructions

### Unit Tests (Vitest)

```bash
# Run tests for specific package
pnpm --filter @grasdouble/lufa_design-system test

# Run tests in watch mode
pnpm --filter @grasdouble/lufa_design-system test:watch

# Run tests with coverage
pnpm --filter @grasdouble/lufa_design-system test:coverage
```

**Test Patterns:**

- Test component behavior, not implementation details
- Use React Testing Library for component tests
- Mock external dependencies appropriately
- Test accessibility features (keyboard navigation, ARIA)
- Follow patterns in `.github/instructions/nodejs-javascript-vitest.instructions.md`

### E2E Tests (Playwright)

```bash
# Run E2E tests
pnpm --filter @grasdouble/lufa_microfrontend_main-container test:e2e

# Run in UI mode
pnpm --filter @grasdouble/lufa_microfrontend_main-container test:e2e:ui

# Run specific test file
pnpm --filter @grasdouble/lufa_microfrontend_main-container test:e2e -- login.spec.ts
```

**Playwright Guidelines:**

- Prioritize user-facing locators (`getByRole`, `getByLabel`)
- Use `test.step()` for grouping interactions
- Auto-retrying assertions with `await expect()`
- Follow `.github/instructions/playwright-typescript.instructions.md`

### Test Coverage Requirements

- All new features must include tests
- Maintain or improve existing coverage
- Test accessibility features
- Cover edge cases and error handling

## Build and Deployment

### Building Packages

```bash
# Build all packages (respects dependency order)
pnpm all:build

# Build design system packages
pnpm ds:all:build

# Build microfrontends
pnpm app:mf:build

# Build specific package
pnpm --filter @grasdouble/lufa_design-system build
```

**Build Order:** Design system primitives → tokens → main → storybook → documentation

### Preview Built Packages

```bash
# Preview microfrontends
pnpm app:mf:preview

# Preview CDN server
pnpm cdn:autobuild-server:preview
```

### Output Locations

- **Design system components:** `packages/design-system/main/dist/`
- **Microfrontends:** `packages/apps/microfrontend/*/dist/`
- **Storybook:** `packages/design-system/storybook/storybook-static/`
- **Docusaurus:** `packages/design-system/documentation/build/`

## Version Management and Releases

### Using Changesets

Lufa uses [Changesets](https://github.com/changesets/changesets) for semantic versioning. See `docs/howto/How-to-use-changeset-in-Lufa.md` for details.

```bash
# Create a changeset after making changes
pnpm changeset

# Select affected packages
# Choose version bump type (major/minor/patch)
# Write clear description
```

**Version Bump Guidelines:**

- **Major:** Breaking changes
- **Minor:** New features (backward compatible)
- **Patch:** Bug fixes

**Automated Release Process:**

- Changesets are tracked in `.changeset/` directory
- GitHub Actions workflow handles versioning and publishing
- Workflow runs on manual trigger from `main` branch
- Publishes to GitHub Package Registry

### Commit Changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for [description]"
```

## Pull Request Guidelines

### Before Submitting

```bash
# Ensure all checks pass
pnpm all:build
pnpm all:lint
pnpm all:prettier

# Run tests for affected packages
pnpm --filter @grasdouble/your-package test

# Create changeset if needed
pnpm changeset
```

### PR Requirements

- **Title format:** Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat(design-system): add Button variants`
  - `fix(microfrontend): resolve routing issue`
  - `docs: update AGENTS.md`
- **All tests passing**
- **Lint and format checks passing**
- **Documentation updated** (if applicable)
- **Changeset created** (for version changes)
- **Reference issues** when applicable

### Review Process

- PRs are typically squashed and merged
- Maintain focused scope
- Address review comments promptly
- Keep commits clean and atomic

## Common Development Tasks

### Adding a New Package

1. Create directory in appropriate location
2. Add `package.json` with `@grasdouble/` scope name
3. Configure build tooling (Vite, TypeScript)
4. Update workspace patterns in `pnpm-workspace.yaml` if needed
5. Add scripts to root `package.json` if needed
6. Update documentation

### Adding Dependencies

```bash
# Add to specific package
pnpm --filter @grasdouble/lufa_design-system add react-icons

# Add dev dependency
pnpm --filter @grasdouble/lufa_design-system add -D @types/node

# Add dependency to root
pnpm add -w concurrently
```

### Working with Design System

```bash
# Develop component in watch mode
pnpm ds:main:dev

# View in Storybook
pnpm ds:storybook:dev

# Build all design system packages
pnpm ds:all:build

# Lint design system
pnpm ds:all:lint
```

### Working with Microfrontends

```bash
# Run main-container and home together
pnpm app:mf:dev

# Run individual microfrontend
pnpm --filter @grasdouble/lufa_microfrontend_home dev

# Build for production
pnpm app:mf:build
```

## Security and Performance

### Security Best Practices

- **Never commit secrets** - Use environment variables
- **Validate inputs** - Sanitize user inputs
- **Follow OWASP guidelines** - See `.github/instructions/ai-prompt-engineering-safety-best-practices.instructions.md`
- **Audit dependencies** - Run `pnpm audit` regularly
- **Use secure protocols** - HTTPS for external APIs

### Performance Optimization

- **Code splitting** - Use dynamic imports for large components
- **Lazy loading** - Implement `React.lazy` and `Suspense`
- **Memoization** - Use `React.memo`, `useMemo`, `useCallback` judiciously
- **Bundle analysis** - Check bundle sizes in production builds
- **Follow guidelines** - See `.github/instructions/performance-optimization.instructions.md`

## Documentation

### Available Documentation

- **Main README:** Project overview and quick start
- **CONTRIBUTING.md:** Contribution guidelines
- **AGENTS.md:** This file - agent instructions
- **docs/howto/:** How-to guides (changesets, etc.)
- **docs/POCs.md:** Proof of concept documentation
- **Design system docs:** Docusaurus at `packages/design-system/documentation/`
- **Component explorer:** Storybook at `packages/design-system/storybook/`

### Instruction Files

Located in `.github/instructions/`:

- `a11y.instructions.md` - Accessibility guidelines
- `lufa-design-system.instructions.md` - Design system standards
- `reactjs.instructions.md` - React best practices
- `tailwindcss.instructions.md` - Tailwind CSS patterns
- `typescript-5-es2022.instructions.md` - TypeScript guidelines
- `nodejs-javascript-vitest.instructions.md` - Testing with Vitest
- `playwright-typescript.instructions.md` - Playwright E2E testing
- `performance-optimization.instructions.md` - Performance patterns
- `update-docs-on-code-change.instructions.md` - Documentation sync

### Generating Documentation

```bash
# Build Storybook static site
pnpm ds:storybook:build

# Build Docusaurus site
pnpm ds:documentation:build

# Generate dependency report
pnpm tools:generate-outdated-report
```

## Troubleshooting

### Common Issues

**Build Failures:**

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Rebuild all packages
pnpm all:build
```

**Import Resolution Issues:**

- Check package names in `package.json`
- Ensure dependencies use `workspace:*` protocol for internal packages
- Verify package is built: `pnpm --filter @grasdouble/package-name build`

**TypeScript Errors:**

- Ensure all dependencies are built
- Check `tsconfig.json` extends correct base config
- Verify types are exported properly

**Lint/Format Issues:**

```bash
# Fix automatically
pnpm all:prettier

# Check specific issues
pnpm all:lint
```

### Debug Mode

```bash
# Enable pnpm debug logging
pnpm --loglevel debug [command]

# Verbose output
pnpm -r --stream [command]
```

## Additional Notes

### Workspace Protocol

Internal dependencies should use `workspace:*` or `workspace:^` protocol:

```json
{
  "dependencies": {
    "@grasdouble/lufa_design-system-tokens": "workspace:^"
  }
}
```

### Environment Setup

- Check Node.js version: `node -v` (should be 24.9.0)
- Check pnpm version: `pnpm -v` (should be 10.8.1+)
- Use `.tool-versions` for asdf version management

### CI/CD

GitHub Actions workflows are in `.github/workflows/`:

- `changeset-release.yml` - Release automation
- Various PR checks for linting, building, testing

### Getting Help

- Check documentation in `docs/` directory
- Review instruction files in `.github/instructions/`
- See `CONTRIBUTING.md` for contribution process
- Open issues for bugs or feature requests

## Quick Reference

### Most Common Commands

```bash
pnpm install              # Install dependencies
pnpm all:build            # Build everything
pnpm app:mf:dev           # Run microfrontends
pnpm ds:storybook:dev     # Run Storybook
pnpm all:lint             # Lint all
pnpm all:prettier         # Format all
pnpm changeset            # Create changeset
```

### Package Filters

```bash
pnpm --filter @grasdouble/lufa_design-system [command]
pnpm --filter @grasdouble/lufa_microfrontend_home [command]
pnpm --filter @grasdouble/lufa_design-system-* [command]
```

### Navigation

```bash
cd packages/design-system/main          # Main design system
cd packages/apps/microfrontend/home     # Home microfrontend
cd packages/cdn/autobuild-server        # CDN server
```
