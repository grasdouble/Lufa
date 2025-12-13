<!--
  AI INSTRUCTIONS FOR USING THIS TEMPLATE:

  1. REPLACE ALL PLACEHOLDERS in [brackets] with actual values
  2. DELETE sections that don't apply to your architecture type
  3. KEEP the section structure and ordering intact
  4. USE REAL DATA from the codebase - never use placeholder values in final output
  5. ADD code examples from actual source files when available
  6. REMOVE these AI instructions before saving
  7. UPDATE the "Last Updated" date to current date
  8. CROSS-REFERENCE related documentation files

  INVESTIGATION STEPS:
  1. Read package.json for package name, version, dependencies
  2. Examine directory structure with ls/list_dir
  3. Read key configuration files (vite.config, tsconfig, etc.)
  4. Look at actual source code for examples
  5. Check for deployed URLs or live environments

  PLACEHOLDERS TO REPLACE:
  - [Package/Component Name] - Full name from package.json or component
  - [package-name] - npm package name without @scope
  - [@scope/package-name] - Full scoped package name
  - [path/to/package] - Relative path from repo root
  - [Brief description] - One-line summary
  - [Technology] - Main tech (React, Node, etc.)
  - [Version] - Current version number
  - [URL] - Deployment URL if exists
-->

# [Package/Component Name] Architecture

> **Last Updated**: [Current Date: YYYY-MM-DD]  
> **Package**: `[@scope/package-name]` _(if applicable)_  
> **Location**: `[path/to/package]`  
> **Version**: [Version Number] _(if applicable)_

## Overview

[2-3 sentences explaining what this package/component is and its primary purpose in the Lufa ecosystem]

**Live Deployment**: [URL] _(if deployed)_

> **Development Guide**: See [../../rules/[category]/[FILE].md](../../rules/[category]/[FILE].md) for development guidelines _(if applicable)_

## Purpose

[Detailed explanation of why this exists and what problems it solves. Include:]

- **Primary purpose** - What does it do?
- **Key responsibilities** - What is it responsible for?
- **Integration points** - How does it fit with other packages?
- **Target audience** - Who uses this? (developers, end-users, build system, etc.)

## Architecture

### Package Structure

```
[path/to/package]/
├── src/                        # [Description]
│   ├── [subdirectory]/        # [Description]
│   │   ├── [file].ts          # [Description]
│   │   └── [file].tsx         # [Description]
│   ├── [other-dir]/           # [Description]
│   └── index.ts               # [Description]
│
├── dist/                       # [Description - if build output]
│   ├── [output-file].mjs      # [Description]
│   └── [output-file].css      # [Description]
│
├── [config-dir]/               # [Description - if applicable]
│   ├── [config-file]          # [Description]
│   └── [config-file]          # [Description]
│
├── [package-manager-file]      # Package configuration
├── [build-config]              # Build configuration
├── [ts-config]                 # TypeScript configuration
└── README.md                   # Package documentation
```

**Key Directories**:

- **[directory-name]**: [Description and purpose]
- **[directory-name]**: [Description and purpose]

### Technology Stack

- **[Category]**: [Technology] - [Brief description/purpose]
- **[Category]**: [Technology] - [Brief description/purpose]
- **[Category]**: [Technology] - [Brief description/purpose]
- **Build Tool**: [Tool] _(if applicable)_
- **Framework**: [Framework] _(if applicable)_

**Dependencies** _(highlight key ones)_:

- `[package-name]` - [Purpose in this context]
- `[package-name]` - [Purpose in this context]

## Core Concepts

### [Concept 1]

[Explain a core concept, pattern, or architectural decision]

**Example**:

```[language]
[Real code example from the codebase]
```

**Why this approach**:

- [Reason 1]
- [Reason 2]

### [Concept 2]

[Another important concept or pattern]

## Configuration

### [Config File Name]

[Purpose of this configuration file]

```[language]
[Real configuration example from the codebase]
```

**Key Settings**:

- **[setting-name]**: [What it does and why it's set this way]
- **[setting-name]**: [What it does and why it's set this way]

### [Another Config File]

[Purpose and explanation]

## Build Process

### Development Build

```bash
[command to run dev build]
```

**What happens**:

1. [Step 1]
2. [Step 2]
3. [Step 3]

**Output**: [Description of output and location]

### Production Build

```bash
[command to build for production]
```

**Output**:

```
[output-directory]/
├── [file1]          # [Description, size if known]
├── [file2]          # [Description, size if known]
└── [file3]          # [Description, size if known]
```

**Build characteristics**:

- **Bundle size**: [Size information]
- **Format**: [ES modules, CommonJS, etc.]
- **Minification**: [Yes/No and approach]
- **Source maps**: [Yes/No]

## Dependencies

### Runtime Dependencies

```json
{
  "[dependency-name]": "[version]",
  "[dependency-name]": "[version]"
}
```

**Purpose of each**:

- **[dependency-name]**: [Why it's needed and how it's used]
- **[dependency-name]**: [Why it's needed and how it's used]

### Peer Dependencies

```json
{
  "[peer-dep-name]": "[version-range]"
}
```

**Externalized dependencies** _(what's NOT bundled)_:

- [Dependency name] - [Reason for externalization]

### Development Dependencies

_Highlight only key/unusual dev dependencies_

## Integration Points

### [Integration Point 1]

[How this package/component integrates with other parts of the system]

**Import/Usage Pattern**:

```[language]
[Real code example of how it's imported/used]
```

**Data Flow**:

1. [Step 1 of how data/control flows]
2. [Step 2]
3. [Step 3]

### [Integration Point 2]

[Another integration or interface]

## Workflows & Processes

### [Workflow Name]

[Description of a common workflow or process]

**Steps**:

1. [Step 1 with actual command or action]
2. [Step 2]
3. [Step 3]

**Example**:

```bash
# [Description of what this does]
[actual command]
```

## Architecture Decisions

### [Decision 1]

**Context**: [What problem needed solving]

**Decision**: [What was decided]

**Rationale**:

- [Reason 1]
- [Reason 2]
- [Reason 3]

**Trade-offs**:

- ✅ **Pros**: [Benefits of this approach]
- ❌ **Cons**: [Limitations or downsides]

### [Decision 2]

[Another key architectural decision]

## Deployment

### Deployment Target

**Where**: [Hosting platform/environment]  
**URL**: [Production URL]  
**Method**: [Deployment method - static, container, serverless, etc.]

### Deployment Process

1. [Step 1 of deployment]
2. [Step 2]
3. [Step 3]

**Automation**: [CI/CD information]

## Performance Considerations

- **[Metric]**: [Performance characteristic and target]
- **[Optimization]**: [Specific optimization and why]
- **[Caching]**: [Caching strategy if applicable]

## Best Practices

### Development

✅ **Do**:

- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

❌ **Don't**:

- [Anti-pattern 1]
- [Anti-pattern 2]
- [Anti-pattern 3]

### [Specific Area]

[More specific best practices for a particular aspect]

## Troubleshooting

### Common Issues

**Issue**: [Description of common problem]

- **Symptom**: [How it manifests]
- **Cause**: [Why it happens]
- **Solution**: [How to fix it]
  ```bash
  [Actual command or code to resolve]
  ```

**Issue**: [Another common problem]

- **Solution**: [How to fix]

## Testing

### Test Strategy

[How this package/component is tested]

**Test Types**:

- **[Type]**: [What's tested and how]
- **[Type]**: [What's tested and how]

**Running Tests**:

```bash
[command to run tests]
```

## Monitoring & Observability

_If applicable for deployed services_

- **Metrics**: [What's tracked]
- **Logging**: [Logging approach]
- **Alerts**: [What triggers alerts]

## Future Enhancements

_Planned improvements or known limitations_

- [Enhancement 1] - [Brief description]
- [Enhancement 2] - [Brief description]
- [Enhancement 3] - [Brief description]

## Related Documentation

- **[Related Doc 1]**: [../../path/to/doc.md](../../path/to/doc.md) - [Brief description]
- **[Related Doc 2]**: [../../path/to/doc.md](../../path/to/doc.md) - [Brief description]
- **[Parent Architecture]**: [../../architecture/PARENT.md](../../architecture/PARENT.md) - [Brief description]

---

## Template Usage Notes

**When to use this template**:

- Creating architecture documentation for a new package
- Updating existing architecture documentation
- Documenting a major architectural change

**Sections to customize by type**:

**For UI Components/Libraries**:

- Focus on: Component Structure, Styling Approach, Export Pattern
- Include: Visual Examples, Theme/Styling Configuration
- De-emphasize: Deployment (unless deployed as docs/storybook)

**For Services/APIs**:

- Focus on: Endpoints, Data Models, Authentication
- Include: API Examples, Request/Response Formats
- Emphasize: Deployment, Monitoring, Security

**For Build Tools/Plugins**:

- Focus on: Configuration, Plugin API, Transform Pipeline
- Include: Usage Examples, Integration Steps
- De-emphasize: UI/Visual Aspects

**For Applications**:

- Focus on: User Flows, Routing, State Management
- Include: Screenshots/Diagrams, Feature List
- Emphasize: Deployment, Performance, User Experience

**For CLI Tools**:

- Focus on: Commands, Options, Workflows
- Include: Command Examples, Output Examples
- Emphasize: Installation, Usage Patterns
