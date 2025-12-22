# Contributing to Lufa

Thank you for your interest in contributing to Lufa! This document provides guidelines and instructions for contributing to this monorepo project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Release Process](#release-process)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- **Node.js**: 24.9.0 (see `.tool-versions`)
- **pnpm**: 10.26.x or later
- **Git**: Latest stable version

### Initial Setup

1. **Fork the repository** (for external contributors)

2. **Clone your fork**:

   ```sh
   git clone https://github.com/your-username/Lufa.git
   cd Lufa
   ```

3. **Install dependencies**:

   ```sh
   pnpm install
   ```

4. **Verify setup**:
   ```sh
   pnpm all:build
   pnpm all:lint
   ```

## Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `feat/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates
- `chore/*`: Maintenance tasks

### Creating a Branch

```sh
git checkout -b feat/your-feature-name
```

## Project Structure

The monorepo is organized as follows:

```
packages/
├── apps/microfrontend/    # Main container and Home microfrontends
├── design-system/         # Core design system packages
├── plugins/vite/          # Internal Vite plugins
├── config/                # Shared configuration presets
├── cdn/                   # CDN-related tooling
└── poc/                   # Proof of concepts

docs/                      # Project documentation
```

### Package Naming Convention

All packages use the `@grasdouble/` scope with descriptive names:

- `@grasdouble/lufa_design-system`
- `@grasdouble/lufa_microfrontend_*`
- `@grasdouble/cdn_autobuild-server`

## Making Changes

### Working on a Package

To work on a specific package, you can use filtered commands:

```sh
# Run dev for a specific package
pnpm --filter @grasdouble/package-name run dev

# Build a specific package
pnpm --filter @grasdouble/package-name run build

# Lint a specific package
pnpm --filter @grasdouble/package-name run lint
```

### Common Development Tasks

**Design System Development**:

```sh
pnpm ds:all:dev          # Start all design system packages in dev mode
pnpm ds:main:build       # Build main design system package
pnpm ds:storybook:dev    # Run Storybook
```

**Microfrontend Development**:

```sh
pnpm app:mf:dev          # Start all microfrontends in dev mode
pnpm app:mf:build        # Build all microfrontends
```

**CDN Development**:

```sh
pnpm cdn:autobuild-server:dev    # Start autobuild server
```

### Adding New Packages

1. Create package directory in the appropriate location
2. Add `package.json` with proper naming convention
3. Configure build tooling (Vite, TypeScript, etc.)
4. Add scripts to root `package.json` if needed
5. Update documentation

## Testing

Before submitting changes:

1. **Build all packages**:

   ```sh
   pnpm all:build
   ```

2. **Run linting**:

   ```sh
   pnpm all:lint
   ```

3. **Format code**:

   ```sh
   pnpm all:prettier
   ```

4. **Test locally**:
   - For design system changes: Review in Storybook
   - For microfrontends: Test in dev mode
   - For CDN changes: Test autobuild functionality

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured commit messages.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `build`: Build system or dependency changes
- `ci`: CI/CD changes

### Scope Examples

- `design-system`: Changes to design system
- `microfrontend`: Changes to microfrontends
- `cdn`: CDN-related changes
- `config`: Configuration changes
- `docs`: Documentation updates

### Examples

```
feat(design-system): add new Button component variants

- Add outline and ghost variants
- Update Storybook stories
- Add accessibility improvements
```

```
fix(microfrontend): resolve routing issue in main-container

The routing was not properly handling nested routes.
This commit fixes the route resolution logic.

Closes #123
```

## Pull Request Process

1. **Update your branch**:

   ```sh
   git fetch origin
   git rebase origin/main
   ```

2. **Ensure all checks pass**:
   - Build succeeds
   - Linting passes
   - Code is formatted
   - Documentation is updated

3. **Create Pull Request**:
   - Use a descriptive title following commit conventions
   - Fill out the PR template completely
   - Reference related issues
   - Add screenshots/videos for UI changes
   - Request review from maintainers

4. **Review Process**:
   - Address review comments
   - Keep PR scope focused
   - Maintain clean commit history

5. **Merge**:
   - PRs are typically squashed and merged
   - Maintainers will handle the merge

## Code Style

### General Guidelines

- Follow existing code patterns
- Write clear, self-documenting code
- Add comments for complex logic
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations

### TypeScript

- Use explicit types where helpful
- Avoid `any` type
- Leverage type inference when clear
- Export types from packages

### React/Vue Components

- Use functional components
- Implement proper prop types
- Follow component naming conventions
- Keep components focused and reusable

### File Naming

- Use kebab-case for files: `my-component.tsx`
- Use PascalCase for components: `MyComponent.tsx`
- Use camelCase for utilities: `myUtility.ts`

## Release Process

Lufa uses [Changesets](https://github.com/changesets/changesets) for version management and releases.

### Creating a Changeset

When making changes that should trigger a release:

```sh
pnpm changeset
```

Follow the prompts to:

1. Select affected packages
2. Choose version bump type (major/minor/patch)
3. Write a clear description of changes

For more details, see [How to use changeset in Lufa](./docs/howto/How-to-use-changeset-in-Lufa.md).

### Version Bumps

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

## Getting Help

- Check existing [documentation](./docs/)
- Review [POCs](./docs/POCs.md)
- Open an issue for bugs or feature requests
- Ask questions in discussions

## Resources

- [Project README](./README.md)
- [Changeset Guide](./docs/howto/How-to-use-changeset-in-Lufa.md)
- [POCs and Explorations](./docs/POCs.md)

---

Thank you for contributing to Lufa! Your efforts help make this project better for everyone.
