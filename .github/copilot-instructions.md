# GitHub Copilot Instructions for Lufa Project

This file contains general instructions and guidelines for GitHub Copilot when working with the Lufa monorepo.

## Project Overview

Lufa is a monorepo containing:

- **Design System**: Component library with primitives, tokens, themes, and documentation
- **Microfrontends**: Single-SPA based microfrontend applications
- **CDN Infrastructure**: Auto-build server for static asset delivery
- **Shared Configuration**: ESLint, Prettier, and TypeScript configurations
- **Build Tools**: Vite plugins and build utilities

## Technology Stack

### Core Technologies

- **Package Manager**: pnpm with workspace support
- **Build Tool**: Vite
- **Testing**: Vitest for unit tests, Playwright for E2E tests
- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Microfrontend Framework**: Single-SPA
- **Documentation**: Docusaurus (for design system docs)
- **Version Management**: Changesets for versioning and publishing

### Code Quality Tools

- **Linting**: ESLint with custom configurations
- **Formatting**: Prettier
- **Type Checking**: TypeScript with strict mode
- **Pre-commit Hooks**: Husky and lint-staged

## General Guidelines

### Code Organization

- Follow the existing monorepo structure
- Keep related code in appropriate packages
- Maintain clear separation between apps, packages, and configurations
- Use workspace protocol (`workspace:*`) for internal dependencies

### Code Style

- Use TypeScript for all new code
- Follow existing ESLint and Prettier configurations
- Use functional components and React hooks
- Prefer named exports over default exports
- Use const assertions for constant values

### Testing Strategy

- Write tests alongside implementation
- Use Vitest for unit and integration tests
- Use Playwright for E2E tests
- Follow TDD principles when appropriate
- Ensure all tests pass before committing

### Version Management

- Use changesets for tracking changes
- Follow semantic versioning (semver)
- Write clear, descriptive changelogs
- See [How-to-use-changeset-in-Lufa.md](../docs/howto/How-to-use-changeset-in-Lufa.md)

### Git Workflow

- Work on feature branches
- Write clear, descriptive commit messages
- Reference issue numbers in commits when applicable
- Keep commits atomic and focused

## Context-Specific Instructions

### When Working with Design System

- Follow [lufa-design-system.instructions.md](instructions/lufa-design-system.instructions.md)
- Ensure component accessibility
- Maintain design token consistency
- Update Storybook stories for new components
- Document components in Docusaurus

### When Writing React Code

- Follow [reactjs.instructions.md](instructions/reactjs.instructions.md)
- Use TypeScript with proper type definitions
- Implement proper error boundaries
- Optimize for performance (memoization, lazy loading)
- Follow React best practices and hooks rules

### When Using Tailwind CSS

- Follow [tailwindcss.instructions.md](instructions/tailwindcss.instructions.md)
- Use design system tokens when available
- Maintain consistent spacing and sizing
- Avoid inline styles; use Tailwind utilities
- Create custom utilities only when necessary

### When Writing Tests

- For Playwright tests: Follow [playwright-typescript.instructions.md](instructions/playwright-typescript.instructions.md)
- For JavaScript/Node.js tests: Follow [nodejs-javascript-vitest.instructions.md](instructions/nodejs-javascript-vitest.instructions.md)
- Write tests that are clear, maintainable, and reliable
- Use descriptive test names
- Mock external dependencies appropriately

### When Working with Microfrontends

- Understand Single-SPA architecture
- Maintain proper routing configuration
- Ensure proper loading and error handling
- Keep microfrontends independent
- Document integration points

### When Modifying Build Configuration

- Test changes locally before committing
- Update documentation if configuration changes affect usage
- Ensure backwards compatibility when possible
- Consider impact on all packages in monorepo

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `TextField.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Tests**: Match source file with `.test.ts` or `.spec.ts` suffix
- **Styles**: Match component name or use `index.css`
- **Configuration**: Use standard names (e.g., `vite.config.ts`, `tsconfig.json`)

## Import Organization

Order imports as follows:

1. External dependencies (React, third-party libraries)
2. Internal packages (workspace dependencies)
3. Relative imports from parent directories
4. Relative imports from same directory
5. Type imports (grouped separately with `import type`)
6. Style imports (CSS/SCSS files last)

## Documentation

- Update README files when adding new features or packages
- Document complex logic with inline comments
- Maintain changelog using changesets
- Update Docusaurus docs for design system changes
- Keep documentation in sync with code

## Security Considerations

- Never commit sensitive data (API keys, secrets, credentials)
- Validate and sanitize user inputs
- Follow OWASP security best practices
- Keep dependencies updated and audit regularly
- Use environment variables for configuration

## Performance Guidelines

- Optimize bundle sizes
- Implement code splitting and lazy loading
- Use proper caching strategies
- Minimize re-renders in React components
- Optimize images and assets

## Accessibility

- Follow WCAG 2.1 AA standards
- Use semantic HTML
- Ensure keyboard navigation
- Provide proper ARIA labels
- Test with screen readers

## Common Commands

### Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

### Changesets

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish packages
pnpm changeset publish
```

## Agents and Specialized Instructions

For specialized tasks, refer to agent-specific instructions:

- **TDD Refactoring**: [tdd-refactor.agent.md](agents/tdd-refactor.agent.md)

## Additional Resources

- **Contributing Guide**: [CONTRIBUTING.md](../CONTRIBUTING.md)
- **License**: [LICENSE.md](../LICENSE.md)
- **Project Documentation**: [docs/](../docs/)
- **TODOs and Planning**: [docs/todos/](../docs/todos/)

## Notes for GitHub Copilot

- Always check for existing patterns before creating new ones
- Respect the monorepo structure and dependencies
- Follow the principle of least surprise
- Write self-documenting code
- When in doubt, favor clarity over cleverness
- Consider the impact on other packages in the workspace
