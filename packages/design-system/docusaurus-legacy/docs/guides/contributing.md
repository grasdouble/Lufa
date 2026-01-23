---
sidebar_position: 1
---

# Contributing to Lufa

Thank you for your interest in contributing to Lufa Design System! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm 8+
- Git
- A GitHub account

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/Lufa.git
   cd Lufa
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Project Structure

```
Lufa/
├── packages/
│   ├── design-system/          # Main design system package
│   ├── design-system-tokens/   # Design tokens
│   ├── design-system-primitives/ # Base primitives
│   ├── design-system-themes/   # Theme configurations
│   └── apps/
│       ├── lufa-storybook/     # Component documentation
│       └── lufa-documentation/ # Design system docs
```

## Development Workflow

### Running Storybook

```bash
pnpm ds:storybook:dev
```

Storybook will be available at http://localhost:6006 to view component examples.

### Running Documentation

```bash
cd packages/apps/lufa-documentation
pnpm start
```

Visit `http://localhost:3000` to see the documentation site.

### Building Packages

```bash
# Build all packages
pnpm -r build

# Build specific package
cd packages/design-system
pnpm build
```

## Making Changes

### Adding a New Component

1. **Create component file**:

   ```bash
   cd packages/design-system/src/components
   mkdir NewComponent
   touch NewComponent/NewComponent.tsx
   touch NewComponent/NewComponent.module.css
   touch NewComponent/index.ts
   ```

2. **Implement the component**:

   ```tsx
   // NewComponent.tsx
   import styles from './NewComponent.module.css';

   export interface NewComponentProps {
     variant?: 'default' | 'primary';
     children: React.ReactNode;
   }

   export function NewComponent({ variant = 'default', children }: NewComponentProps) {
     return <div className={styles[variant]}>{children}</div>;
   }
   ```

3. **Add styles** using CSS variables:

   ```css
   /* NewComponent.module.css */
   .default {
     color: var(--lufa-token-color-text-primary);
     padding: var(--lufa-token-spacing-md);
   }

   .primary {
     color: var(--lufa-token-color-brand-primary);
     padding: var(--lufa-token-spacing-md);
   }
   ```

4. **Export the component**:

   ```tsx
   // index.ts
   export { NewComponent } from './NewComponent';
   export type { NewComponentProps } from './NewComponent';
   ```

5. **Add to main export**:

   ```tsx
   // packages/design-system/src/index.ts
   export { NewComponent } from './components/NewComponent';
   export type { NewComponentProps } from './components/NewComponent';
   ```

6. **Create Storybook story**:

   ```tsx
   // packages/apps/lufa-storybook/src/stories/NewComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';

   import { NewComponent } from '@grasdouble/lufa_design-system';

   const meta: Meta<typeof NewComponent> = {
     title: 'Components/NewComponent',
     component: NewComponent,
     tags: [],
   };

   export default meta;
   type Story = StoryObj<typeof NewComponent>;

   export const Default: Story = {
     args: {
       children: 'New Component',
     },
   };
   ```

### Modifying Design Tokens

1. **Edit token files**:

   ```bash
   cd packages/design-system-tokens/src
   ```

2. **Update TypeScript definitions** for colors, spacing, etc.

3. **Rebuild tokens**:

   ```bash
   pnpm build
   ```

4. **Test changes** in Storybook and documentation

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for component props
- Export types alongside components
- Use strict type checking

### CSS

- Use CSS modules for component styles
- Use CSS variables (design tokens) for all styling
- Follow BEM-like naming for class names
- No inline styles unless dynamic

### React

- Use functional components with hooks
- Follow React best practices
- Keep components focused and composable
- Add prop validation

### Accessibility

- Use semantic HTML
- Include proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react';

import { NewComponent } from './NewComponent';

describe('NewComponent', () => {
  it('renders children', () => {
    render(<NewComponent>Test</NewComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<NewComponent variant="primary">Test</NewComponent>);
    expect(container.firstChild).toHaveClass('primary');
  });
});
```

## Documentation

### Component Documentation

Add documentation for your component:

```bash
cd packages/apps/lufa-documentation/docs/components
touch new-component.md
```

Include:

- Overview and purpose
- Props table
- Usage examples
- Accessibility notes
- Best practices

## Submitting Changes

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add NewComponent
fix: resolve Button hover state bug
docs: update installation guide
style: format NewComponent code
refactor: simplify Card component logic
test: add tests for Typography
chore: update dependencies
```

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Run linting** and fix issues:

   ```bash
   pnpm lint
   pnpm format
   ```

4. **Push your branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request** on GitHub
6. **Fill out the PR template** completely
7. **Wait for review** and address feedback

### PR Checklist

- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Storybook stories added/updated
- [ ] Accessibility considerations addressed
- [ ] No breaking changes (or clearly documented)

## Release Process

Releases are managed by maintainers using [Changesets](https://github.com/changesets/changesets).

### Creating a Changeset

After making changes to any package, create a changeset to document your changes:

```bash
pnpm changeset
```

Follow the prompts:

1. **Select affected packages** - Choose which packages your changes affect (use Space to select, Enter to confirm)
2. **Choose version bump type**:
   - **Major** (1.0.0): Breaking changes that require migration
   - **Minor** (0.1.0): New features, backward-compatible
   - **Patch** (0.0.1): Bug fixes and minor improvements
3. **Write a summary** - Describe your changes clearly (this appears in CHANGELOG.md)

**Example changeset workflow:**

```bash
# Make your changes
git add .

# Create a changeset
pnpm changeset
# Select: @grasdouble/lufa_design-system
# Type: minor
# Summary: "Add Tooltip component with full accessibility support"

# Commit both your changes and the changeset file
git commit -m "feat: add Tooltip component"
git push origin feature/add-tooltip
```

### Versioning Strategy

Lufa Design System follows [Semantic Versioning 2.0.0](https://semver.org/):

- **Current status**: Beta (0.x.x) - APIs may change between minor versions
- **Goal**: Stable 1.0.0 release with locked APIs
- **Breaking changes**: Always documented with migration guides

For more details, see the [Changelog](/docs/changelog).

### For Maintainers

To publish a release:

```bash
# Generate versions and update CHANGELOGs
pnpm changeset version

# Build all packages
pnpm all:build

# Publish to npm (maintainers only)
pnpm changeset publish

# Push tags to GitHub
git push --follow-tags
```

## Getting Help

- **Documentation**: Read the docs at `/docs`
- **Issues**: Check existing [GitHub Issues](https://github.com/grasdouble/Lufa/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/grasdouble/Lufa/discussions)

## Code of Conduct

Be respectful, inclusive, and professional. We're all here to build something great together.

## License

By contributing to Lufa, you agree that your contributions will be licensed under the project's license.

Thank you for contributing! 🎉
