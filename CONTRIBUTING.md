# Contributing to Lufa

Thank you for your interest in contributing to Lufa! This document provides guidelines and instructions for contributing to this monorepo.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)
- [Additional Resources](#additional-resources)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or deliberately derailing discussions
- Sharing private information without permission
- Unprofessional conduct

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18 or higher
- **pnpm**: v10.8.1 or higher
- **Git**: Latest version

### Initial Setup

1. **Fork the repository** (if external contributor)

2. **Clone the repository**:

```bash
git clone https://github.com/grasdouble/Lufa.git
cd Lufa
```

3. **Install dependencies**:

```bash
pnpm install
```

4. **Build all packages**:

```bash
pnpm run build:all
```

5. **Verify setup** by running lints:

```bash
pnpm run lint:all
```

### Workspace Structure

Familiarize yourself with the monorepo structure:

- `packages/apps/` - Deployable applications
- `packages/design-system/` - Design system packages
- `packages/config/` - Shared configurations
- `packages/plugins/` - Build tools and plugins
- `packages/cdn/` - CDN infrastructure
- `packages/poc/` - Proof of concepts

## Development Workflow

### 1. Create a Branch

Create a feature branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature-name
```

**Branch naming conventions:**

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/modifications
- `chore/` - Maintenance tasks

### 2. Make Your Changes

Follow the [Development Guidelines](.github/ai/DEVELOPMENT_GUIDELINES.md) for:

- Code standards
- File naming conventions
- TypeScript usage
- React patterns
- Testing requirements

### 3. Test Your Changes

Run relevant tests and checks:

```bash
# Lint your code
pnpm run lint:all

# Build packages to check for errors
pnpm run build:all

# Run tests (if applicable)
pnpm test

# Test specific package
pnpm --filter @grasdouble/[package-name] run build
```

### 4. Create a Changeset

If your changes affect any packages, create a changeset:

```bash
pnpm changeset
```

**Follow the interactive prompts:**

1. Select packages that changed (use space to select, enter to confirm)
2. Choose version bump type:
   - **major**: Breaking changes
   - **minor**: New features (backwards compatible)
   - **patch**: Bug fixes
3. Write a summary of changes

**Example changeset summary:**

```
Add dark mode support to Button component

- Add dark mode variants
- Update Storybook stories
- Add accessibility improvements
```

**Note:** Documentation-only changes or changes to non-published packages may not need a changeset.

### 5. Commit Your Changes

Write clear, descriptive commit messages following conventional commits:

```bash
git add .
git commit -m "feat(design-system): add dark mode to Button component"
```

**Commit message format:**

```
<type>(<scope>): <subject>

<body (optional)>

<footer (optional)>
```

See [Development Guidelines - Commit Messages](.github/ai/DEVELOPMENT_GUIDELINES.md#commit-messages) for details.

### 6. Push Your Branch

```bash
git push origin feat/your-feature-name
```

## Submitting Changes

### Creating a Pull Request

1. **Open a Pull Request** on GitHub
2. **Fill out the PR template** with:

   - Description of changes
   - Related issue numbers (if applicable)
   - Screenshots (for UI changes)
   - Testing performed

3. **Ensure CI passes**:
   - Linting checks
   - Changeset validation
   - Build verification

### Pull Request Checklist

Before submitting, verify:

- [ ] Code follows [Development Guidelines](.github/ai/DEVELOPMENT_GUIDELINES.md)
- [ ] Tests pass (if applicable)
- [ ] Documentation is updated (README, comments, etc.)
- [ ] Changeset is created (if packages changed)
- [ ] Commit messages follow conventions
- [ ] No merge conflicts with `main`
- [ ] CI checks pass
- [ ] Screenshots included (for UI changes)

### PR Title Format

Use the same format as commit messages:

```
feat(design-system): add dark mode to Button component
```

## Review Process

### What to Expect

1. **Automated checks** run on your PR (linting, changesets, builds)
2. **Code review** from maintainers (if applicable)
3. **Requested changes** or approval
4. **Merge** after approval and passing checks

### Responding to Feedback

- Address all comments or questions
- Make requested changes in new commits
- Push updates to the same branch
- Respond to reviewers when changes are made
- Ask questions if feedback is unclear

### After Merge

- Your changes will be included in the next release
- Changesets will be processed automatically
- Version bump PR will be created
- Packages will be published when version PR is merged

## Coding Standards

### General Principles

- **Write clear, readable code** - Code is read more than written
- **Follow TypeScript best practices** - Use types effectively
- **Test your changes** - Ensure code works as expected
- **Document public APIs** - Help others understand your code
- **Keep it simple** - Avoid over-engineering

### Detailed Guidelines

See [DEVELOPMENT_GUIDELINES.md](.github/ai/DEVELOPMENT_GUIDELINES.md) for comprehensive coding standards including:

- TypeScript conventions
- React patterns
- CSS/Styling approach
- File naming
- Testing guidelines
- Accessibility requirements
- Performance considerations

## Package-Specific Contributions

### Design System

Contributing to design system components:

1. **Follow design token** conventions
2. **Add Storybook stories** for all components
3. **Ensure accessibility** (keyboard navigation, ARIA labels, etc.)
4. **Support dark mode** using Tailwind's dark variant
5. **Document props** with TypeScript interfaces and JSDoc

**Example:**

```typescript
/**
 * A button component with multiple variants
 */
export interface ButtonProps {
  /** Button label text */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Visual variant */
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  // Implementation
};
```

### Microfrontends

Contributing to microfrontend applications:

1. **Follow Single-SPA conventions**
2. **Test with import-map overrides** during development
3. **Ensure proper routing** configuration
4. **Document environment variables** required
5. **Test in isolation and integrated**

### Workflows & Actions

Contributing to CI/CD:

1. **Document workflow** using `.github/ai/templates/GITHUB_WORKFLOW_DOC.template.md`
2. **Document action** using `.github/ai/templates/GITHUB_ACTION_DOC.template.md`
3. **Test thoroughly** before merging
4. **Update architecture docs** if needed

## Common Contribution Types

### Bug Fixes

1. Identify the bug and create an issue (if one doesn't exist)
2. Write a failing test that reproduces the bug (if applicable)
3. Fix the bug
4. Ensure test passes
5. Create changeset with type `patch`
6. Submit PR referencing the issue

### New Features

1. Discuss feature in an issue first (for major features)
2. Implement feature following coding standards
3. Add tests for new functionality
4. Update documentation
5. Add Storybook story (for UI components)
6. Create changeset with type `minor`
7. Submit PR with screenshots/demo

### Documentation

1. Identify missing or outdated documentation
2. Update or create documentation
3. Ensure markdown formatting is correct
4. Test any code examples
5. Submit PR (changeset may not be needed)

### Refactoring

1. Ensure tests exist before refactoring
2. Make incremental changes
3. Keep tests passing throughout
4. Update documentation if APIs change
5. Create changeset (type depends on API changes)
6. Submit PR explaining the rationale

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @grasdouble/[package-name] test

# Run tests in watch mode
pnpm test --watch
```

### Writing Tests

- **Unit tests**: Test individual functions and components
- **Integration tests**: Test component interactions
- **Coverage**: Aim for meaningful coverage, not just high percentages

**Example:**

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with correct label", () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Troubleshooting Contributions

### Build Errors

**Issue: Build fails after dependency changes**

```bash
# Clear cache and reinstall
rm -rf node_modules
pnpm store prune
pnpm install
```

**Issue: TypeScript errors in a specific package**

```bash
# Check tsconfig extends the right base config
# Rebuild dependencies that are consumed
pnpm run build:all
```

### Changeset Issues

**Issue: Changeset check fails**

```bash
# Ensure you created a changeset
pnpm changeset

# Or create empty changeset if no packages changed
pnpm changeset --empty
```

**Issue: Wrong packages selected in changeset**

```bash
# Delete the changeset file in .changeset/
# Create a new one with correct selections
pnpm changeset
```

### Git Issues

**Issue: Merge conflicts**

```bash
# Update your branch with latest main
git checkout main
git pull origin main
git checkout your-branch
git merge main
# Resolve conflicts
git add .
git commit
```

**Issue: Need to update commit message**

```bash
# Amend last commit
git commit --amend -m "new message"
git push --force-with-lease
```

## Getting Help

### Resources

- [Architecture Documentation](.github/ai/ARCHITECTURE.md)
- [Development Guidelines](.github/ai/DEVELOPMENT_GUIDELINES.md)
- [Lufa Story Timeline](docs/LufaStory.md)
- [How-to Guides](docs/howto/)

### Questions?

- Open a discussion on GitHub
- Create an issue for bugs or feature requests
- Check existing issues and PRs for similar topics

## Recognition

Contributors will be recognized in:

- Changelog entries (via changesets)
- Release notes
- GitHub contribution graph

Thank you for contributing to Lufa! 🎉

---

**Note**: This is a personal project, so response times may vary. Please be patient, and feel free to ping if you haven't heard back in a reasonable time.
