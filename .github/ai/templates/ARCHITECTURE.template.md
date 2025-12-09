<!--
AI INSTRUCTIONS:

1. PRESERVE ALL SECTIONS IN THIS ORDER - do not remove or reorder
2. Scan: pnpm-workspace.yaml, package.json, .github/workflows/, .github/actions/
3. Replace all [placeholders] with actual content from repository
4. List all packages with descriptions from workspace
5. Document all workflows and actions with purposes
6. Update "Last Updated" date
7. Delete this instruction comment when done

FORMATTING:
- Keep monorepo structure tree accurate and up-to-date
- Use `` for inline code, package names, file paths
- Use **bold** for section emphasis
- Include real URLs for deployed applications
- Use actual version numbers from package.json

Update guide: .github/ai/prompts/ARCHITECTURE_UPDATE_PROMPTS.md
-->

# [Project Name] Monorepo Architecture

> **Last Updated:** [Current Date]  
> **Monorepo Structure:** [pnpm/yarn/npm] workspace-based monorepo

## Overview

[Brief description of the monorepo's purpose and what it contains]

### Philosophy

- **[Key Principle 1]**: [Explanation]
- **[Key Principle 2]**: [Explanation]
- **[Key Principle 3]**: [Explanation]
- **[Key Principle 4]**: [Explanation]

## Monorepo Structure

```
[ProjectName]/
├── .github/                    # [Description]
│   ├── actions/               # [Description]
│   ├── ai/                    # [Description]
│   └── workflows/             # [Description]
├── docs/                       # [Description]
├── packages/                   # [Description]
│   ├── [category1]/           # [Description]
│   ├── [category2]/           # [Description]
│   └── [category3]/           # [Description]
└── [other-folders]/            # [Description]
```

## Core Components

### 1. [Component/Category Name] (`packages/[path]/`)

[Description of this component/category and its role]

**Packages:**

- **`[package-name]/`**: [Description]
- **`[package-name]/`**: [Description]
- **`[package-name]/`**: [Description]

**Key Features:**

- [Feature 1]
- [Feature 2]
- [Feature 3]

<!-- Add deployment info if applicable -->

**Deployed at:** [URL or N/A]

<!-- Add architecture notes if applicable -->

**Architecture:**

- [Architecture detail 1]
- [Architecture detail 2]

### 2. [Component/Category Name] (`packages/[path]/`)

[Repeat structure for each major component or category]

### 3. [Component/Category Name] (`packages/[path]/`)

[Continue for all major components]

## Technology Stack

### Core Technologies

- **Package Manager**: [pnpm/yarn/npm] ([version])
- **Frontend Framework**: [React/Vue/Angular/etc.] with [TypeScript/JavaScript]
- **Styling**: [CSS framework or approach]
- **Build Tool**: [Vite/Webpack/Rollup/etc.]
- **[Other Core Tech]**: [Description and version]

### Development Tools

- **Linting**: [ESLint, with configuration approach]
- **Formatting**: [Prettier, etc.]
- **Type Checking**: [TypeScript, etc.]
- **Git Hooks**: [Husky, lint-staged, etc. or "To be defined"]
- **CI/CD**: [GitHub Actions, CircleCI, etc.]

### Deployment

- **Hosting**: [Platform]
- **[App Name]**: [URL]
- **[App Name]**: [URL]

## Package Management

### Workspace Configuration

The monorepo uses [package manager] workspaces defined in `[workspace-file]`:

```yaml
packages:
  - [pattern1]
  - [pattern2]
  - [pattern3]
```

### Package Naming Convention

All published packages follow the naming pattern:

```
@[scope]/[project]_[category]_[name]
```

Examples:

- `@[scope]/[project]_[category]_[name]`
- `@[scope]/[project]_[category]_[name]`

### Version Management

- **[Tool]**: [Purpose, e.g., "Used for versioning and changelog generation"]
- **Workflow**: [Description of versioning workflow]
- **Release Process**: [Description of release process]

## CI/CD Workflows

### Automation Workflows

<!-- List all workflows with brief descriptions -->

1. **`[workflow-name].yml`**: [Description]
2. **`[workflow-name].yml`**: [Description]
3. **`[workflow-name].yml`**: [Description]
4. **`[workflow-name].yml`**: [Description]

<!-- Add more detail for critical workflows -->

### GitHub Actions

<!-- List custom actions -->

- **`[action-name]/`**: [Description]
- **`[action-name]/`**: [Description]

## Development Scripts

### Global Commands

```bash
# [Description]
[pnpm/yarn/npm] run [script-name]

# [Description]
[pnpm/yarn/npm] run [script-name]

# [Description]
[pnpm/yarn/npm] run [script-name]
```

### [Category] Development

```bash
# [Description]
[pnpm/yarn/npm] run [script-name]

# [Description]
[pnpm/yarn/npm] run [script-name]
```

### [Category] Development

<!-- Repeat for different categories of scripts -->

```bash
# [Description]
[pnpm/yarn/npm] run [script-name]

# [Description]
[pnpm/yarn/npm] run [script-name]
```

## Documentation

### AI-Assisted Documentation

The `.github/ai/` folder contains resources for AI assistants to maintain consistent documentation:

- **Templates**: Standardized templates for workflows, actions, and architecture
- **Prompts**: Guidance for generating and updating documentation
- **README**: Central hub for AI documentation resources

### Project Documentation

- **`docs/[file].md`**: [Description]
- **`docs/[folder]/`**: [Description]
- **`docs/[folder]/`**: [Description]

## Best Practices

### Adding New Packages

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step 4]
5. [Step 5]

### Making Changes

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step 4]
5. [Step 5]

### Publishing

<!-- If applicable -->

1. [Step 1]
2. [Step 2]
3. [Step 3]

<!-- If not applicable, state "Packages are not published externally" -->

## Security

### [Security Aspect 1]

- [Security measure 1]
- [Security measure 2]
- [Security measure 3]

### [Security Aspect 2]

- [Security measure 1]
- [Security measure 2]
- [Security measure 3]

## Testing

<!-- Add if testing infrastructure exists -->

### Test Strategy

- **Unit Tests**: [Description of approach]
- **Integration Tests**: [Description of approach]
- **E2E Tests**: [Description of approach]

### Running Tests

```bash
# [Description]
[command]

# [Description]
[command]
```

<!-- If no testing yet, replace with: -->
<!-- **Testing infrastructure**: To be implemented -->

## Future Considerations

### Planned Improvements

- [Planned improvement 1]
- [Planned improvement 2]
- [Planned improvement 3]
- [Planned improvement 4]

### Areas for Growth

- [Area 1]
- [Area 2]
- [Area 3]
- [Area 4]

## Contributing

<!-- Link to contributing guide if it exists -->

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed contribution guidelines.

<!-- If no contributing guide, provide basic info: -->
<!-- 1. Fork the repository -->
<!-- 2. Create a feature branch -->
<!-- 3. Make your changes -->
<!-- 4. Submit a pull request -->

## License

This project is under [License Name]([path-to-license]).

---

**Note**: [Any additional context or disclaimers about the project]
