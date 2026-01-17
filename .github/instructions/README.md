# Path-Scoped Instructions

This directory contains 13 path-scoped instruction files that GitHub Copilot and other AI agents automatically apply based on file paths and patterns.

---

## 📚 Available Instructions

### Design System & Architecture

#### 🎨 Lufa Design System

**File**: [lufa-design-system.instructions.md](lufa-design-system.instructions.md)
**Applied to**: `packages/design-system/**/*.{ts,tsx,js,jsx,css}`
**Purpose**: Three-layer architecture standards for primitives, tokens, and components

**Key Topics**:

- Three-layer architecture (Primitives → Tokens → Components)
- Critical import rules (components MUST use tokens only)
- Build order requirements
- Token usage patterns
- Component development standards

**When applied**:

- Working in design system packages
- Creating or modifying primitives, tokens, or components
- Building design system infrastructure

---

### Frontend Development

#### ⚛️ React Development

**File**: [reactjs.instructions.md](reactjs.instructions.md)
**Applied to**: `**/*.{jsx,tsx,js,ts,css,scss}`
**Purpose**: React 19+ development standards and best practices

**Key Topics**:

- Functional components with hooks
- TypeScript integration
- State management patterns
- Component composition
- Performance optimization
- Modern React patterns (Server Components, Suspense)

**When applied**:

- Writing React components
- Implementing hooks
- Managing component state
- Creating custom hooks

---

#### 📘 TypeScript Standards

**File**: [typescript-5-es2022.instructions.md](typescript-5-es2022.instructions.md)
**Applied to**: `**/*.ts`
**Purpose**: TypeScript 5.x and ES2022 standards

**Key Topics**:

- Strict mode configuration
- Type safety patterns
- Naming conventions
- Modern TypeScript features
- Type inference best practices

**When applied**:

- Writing TypeScript code
- Defining types and interfaces
- Type-related decisions

---

### Testing & Quality

#### 🎭 Playwright Testing

**File**: [playwright-typescript.instructions.md](playwright-typescript.instructions.md)
**Applied to**: `**`
**Purpose**: E2E and component testing with Playwright

**Key Topics**:

- Component testing patterns
- E2E test strategies
- Locator best practices
- Assertion patterns
- Test organization

**When applied**:

- Writing component tests
- Creating E2E tests
- Debugging test failures
- Test architecture decisions

---

#### 🧪 Node.js & Vitest

**File**: [nodejs-javascript-vitest.instructions.md](nodejs-javascript-vitest.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: Node.js development and unit testing with Vitest

**Key Topics**:

- Modern Node.js patterns
- Vitest configuration
- Unit testing best practices
- Mocking strategies

**When applied**:

- Writing unit tests
- Node.js development
- Test configuration

---

### Accessibility & Performance

#### ♿ Accessibility (a11y)

**File**: [a11y.instructions.md](a11y.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: WCAG 2.2 Level AA compliance

**Key Topics**:

- WCAG 2.2 Level AA standards
- ARIA patterns and best practices
- Keyboard navigation
- Screen reader optimization
- Color contrast requirements
- Focus management

**When applied**:

- All code development (project-wide)
- Component creation
- Accessibility audits
- Form development

---

#### ⚡ Performance Optimization

**File**: [performance-optimization.instructions.md](performance-optimization.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: Web performance best practices

**Key Topics**:

- React performance optimization
- Bundle size optimization
- Loading performance
- Runtime performance
- Monitoring and metrics

**When applied**:

- Performance optimization tasks
- Bundle analysis
- Component optimization
- Build configuration

---

### DevOps & Automation

#### 🔄 GitHub Actions CI/CD

**File**: [github-actions-ci-cd-best-practices.instructions.md](github-actions-ci-cd-best-practices.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: CI/CD pipeline best practices

**Key Topics**:

- Workflow configuration
- Security best practices
- Caching strategies
- Matrix builds
- Deployment automation

**When applied**:

- Creating/modifying GitHub Actions workflows
- CI/CD configuration
- Deployment setup

---

### Documentation & AI Safety

#### 📝 Markdown Standards

**File**: [markdown.instructions.md](markdown.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: Consistent markdown formatting

**Key Topics**:

- Markdown syntax standards
- Documentation structure
- Formatting conventions

**When applied**:

- Writing documentation
- Creating README files
- Markdown file editing

---

#### 🔒 AI Prompt Engineering Safety

**File**: [ai-prompt-engineering-safety-best-practices.instructions.md](ai-prompt-engineering-safety-best-practices.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: Security and safety for AI-generated code

**Key Topics**:

- Prompt injection prevention
- Input validation
- Security best practices
- Safe AI code generation

**When applied**:

- Working with AI-generated code
- Security reviews
- Implementing user input handling

---

#### 📚 Documentation Maintenance

**File**: [update-docs-on-code-change.instructions.md](update-docs-on-code-change.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: Keep documentation synchronized with code changes

**Key Topics**:

- Documentation update triggers
- Documentation types to maintain
- Synchronization strategies

**When applied**:

- Making code changes that affect APIs
- Updating component interfaces
- Changing public APIs

---

#### 🤖 Multi-Agent Documentation

**File**: [multi-agent-documentation-maintenance.instructions.md](multi-agent-documentation-maintenance.instructions.md)
**Applied to**: `**` (project-wide)
**Purpose**: Maintain consistency across multi-agent documentation

**Key Topics**:

- Cross-file consistency
- Agent compatibility
- Documentation synchronization
- Validation requirements

**When applied**:

- Updating AGENTS.md, CLAUDE.md, or copilot-instructions.md
- Modifying agent definitions
- Documentation maintenance

---

## 🎯 How Path-Scoped Instructions Work

### With GitHub Copilot

GitHub Copilot automatically applies instructions based on the `applyTo` field in the YAML frontmatter:

```yaml
---
description: 'Brief description'
applyTo: 'pattern/to/match/**/*.{ext}'
---
```

When you edit a file matching the pattern, Copilot includes these instructions in its context.

### With Claude Code

Reference instruction files explicitly when needed:

```bash
# In conversation
"Follow the design system instructions when creating this component"

# Or reference specific file
"Apply the guidelines from .github/instructions/a11y.instructions.md"
```

### With Other AI Agents

Most AI agents can read and apply these instructions when working in matching file paths.

---

## 📊 Instruction Categories

| Category          | Instructions | Scope                          |
| ----------------- | ------------ | ------------------------------ |
| **Design System** | 1            | Design system packages         |
| **Frontend**      | 2            | React, TypeScript, CSS Modules |
| **Testing**       | 2            | Playwright, Vitest             |
| **Accessibility** | 1            | Project-wide                   |
| **Performance**   | 1            | Project-wide                   |
| **DevOps**        | 1            | Project-wide                   |
| **Documentation** | 3            | Project-wide                   |
| **Security**      | 1            | Project-wide                   |
| **Total**         | **12**       | -                              |

---

## 🎓 Understanding ApplyTo Patterns

Instructions use glob patterns to match files:

| Pattern                                | Matches                         |
| -------------------------------------- | ------------------------------- |
| `**`                                   | All files in project            |
| `**/*.ts`                              | All TypeScript files            |
| `packages/design-system/**/*.{ts,tsx}` | TypeScript/TSX in design system |
| `**/*.{jsx,tsx,js,ts,css,scss}`        | All React and style files       |

---

## 💡 Best Practices

### For Developers

1. **Check applied instructions**: When working on a file, review which instructions apply
2. **Follow the patterns**: Instructions reflect project standards
3. **Reference explicitly**: Mention instruction files in PR descriptions
4. **Validate compliance**: Use linters and validation scripts

### For AI Agents

1. **Auto-application**: Most agents automatically apply matching instructions
2. **Explicit reference**: You can explicitly reference instruction files for clarity
3. **Combine instructions**: Multiple instructions may apply to the same file
4. **Priority order**: More specific patterns take precedence

---

## 🔗 Related Documentation

- **[AGENTS.md](../../AGENTS.md)** - Complete development guide
- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/copilot-instructions.md](../copilot-instructions.md)** - GitHub Copilot instructions
- **[.github/agents/README.md](../agents/README.md)** - Custom AI agents
- **[.github/prompts/README.md](../prompts/README.md)** - Reusable prompts

---

## 📝 Creating New Instructions

To create new path-scoped instructions:

1. **Follow the file naming convention**: `<topic>.instructions.md`
2. **Include YAML frontmatter**:

```yaml
---
description: 'Brief description of what this provides'
applyTo: 'glob/pattern/**/*.{ext}'
---
```

3. **Structure the content**:
   - Clear section headings
   - Actionable guidelines
   - Code examples
   - Do's and Don'ts
4. **Add to this README**: Update the appropriate section
5. **Validate**: Run `pnpm validate:docs`
6. **Reference in copilot-instructions.md**: Add to the path-scoped section

---

## 🔍 Quick Reference by Use Case

### Creating a Component

**Apply**:

- [lufa-design-system.instructions.md](lufa-design-system.instructions.md)
- [reactjs.instructions.md](reactjs.instructions.md)
- [a11y.instructions.md](a11y.instructions.md)

### Writing Tests

**Apply**:

- [playwright-typescript.instructions.md](playwright-typescript.instructions.md)
- [nodejs-javascript-vitest.instructions.md](nodejs-javascript-vitest.instructions.md)

### Performance Work

**Apply**:

- [performance-optimization.instructions.md](performance-optimization.instructions.md)
- [reactjs.instructions.md](reactjs.instructions.md)

### Documentation Updates

**Apply**:

- [markdown.instructions.md](markdown.instructions.md)
- [update-docs-on-code-change.instructions.md](update-docs-on-code-change.instructions.md)
- [multi-agent-documentation-maintenance.instructions.md](multi-agent-documentation-maintenance.instructions.md)

### CI/CD Configuration

**Apply**:

- [github-actions-ci-cd-best-practices.instructions.md](github-actions-ci-cd-best-practices.instructions.md)

---

## 📜 Archived Instructions

Instructions removed from active use but kept for reference. Available in Git history if needed.

| Instruction                                                         | Category | Archived     | Reason                            |
| ------------------------------------------------------------------- | -------- | ------------ | --------------------------------- |
| [tailwindcss.instructions.md](archived/tailwindcss.instructions.md) | Styling  | January 2026 | Tailwind CSS removed from project |

**Restoration**: Recover from Git with:

```bash
git log --all --full-history -- ".github/instructions/<filename>"
git checkout <commit-hash> -- ".github/instructions/<filename>"
```

---

**Need help?** See [AGENTS.md](../../AGENTS.md) for complete project documentation.
