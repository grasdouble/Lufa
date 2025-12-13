<!--
  AI INSTRUCTIONS FOR USING THIS TEMPLATE:

  1. REPLACE ALL PLACEHOLDERS in [brackets] with actual values
  2. DELETE sections that don't apply to your package type
  3. KEEP the section structure and heading levels intact
  4. USE REAL CODE EXAMPLES from the codebase
  5. INCLUDE ACTUAL COMMANDS that developers will run
  6. REMOVE these AI instructions before saving
  7. UPDATE the "Last Updated" date to current date
  8. CROSS-REFERENCE the architecture documentation

  INVESTIGATION STEPS:
  1. Read the package's actual source code
  2. Check package.json for scripts and dependencies
  3. Look at existing examples in the package
  4. Test commands to verify they work
  5. Review configuration files for accurate examples

  PLACEHOLDERS TO REPLACE:
  - [Package Name] - Human-readable package name
  - [@scope/package-name] - Full npm package name
  - [path/to/package] - Relative path from repo root
  - [Brief description] - One sentence describing what this is
  - [Command] - Actual command to run
  - [Code example] - Real code from the codebase
-->

# [Package Name] - Development Rules

> **Package**: `[@scope/package-name]` _(if applicable)_  
> **Location**: `[path/to/package]`  
> **Last Updated**: [Current Date: YYYY-MM-DD]

## Overview

[1-2 sentences describing what developers will be doing with this package and what these rules cover]

> **Architecture Reference**: See [../../architecture/[category]/[FILE].md](../../architecture/[category]/[FILE].md) for complete package architecture

## 📦 Package Structure

```
[path/to/package]/
├── [directory]/              # [Description]
│   ├── [subdirectory]/      # [Description]
│   └── [file]               # [Description]
├── [config-file]            # [Description]
└── package.json
```

## 🏗️ Creating New [Thing]

_Use this section for creation workflows (new component, new parcel, new token, etc.)_

### 1. [First Step Name]

[Description of what to do in this step]

**[Action]**:

```bash
[Actual command or file operation]
```

**Expected Result**: [What should happen]

### 2. [Second Step Name]

[Description]

**File Structure**:

```
[expected-directory]/
├── [File1.ext]              # [Purpose]
├── [File2.ext]              # [Purpose]
└── index.ts                 # [Purpose]
```

### 3. [Template/Boilerplate]

**[FileName.ext]**:

```[language]
[Real code template from existing examples in the codebase]
```

**Key points**:

- [Important aspect 1]
- [Important aspect 2]
- [Important aspect 3]

### 4. [Configuration Step]

[How to configure the new thing]

```[language]
[Real configuration example]
```

### 5. [Integration Step]

[How to integrate with the rest of the system]

**Example**:

```[language]
[Real integration code]
```

## ✏️ Modifying Existing [Thing]

_Use this section for modification/update workflows_

### Making Changes

1. [Step 1 to locate what to modify]
2. [Step 2 to make the change]
3. [Step 3 to test the change]

**Example**:

```[language]
// Before
[code before change]

// After
[code after change]
```

### Impact of Changes

**What gets affected**:

- [System/Package 1] - [How it's affected]
- [System/Package 2] - [How it's affected]
- [System/Package 3] - [How it's affected]

## 📐 Naming Conventions

### [Convention Type 1]

**Format**: `[naming-pattern-here]`

**Rules**:

- [Rule 1]
- [Rule 2]
- [Rule 3]

**Examples**:

- ✅ `[good-example-1]` - [Why it's good]
- ✅ `[good-example-2]` - [Why it's good]
- ❌ `[bad-example-1]` - [Why it's bad]
- ❌ `[bad-example-2]` - [Why it's bad]

### [Convention Type 2]

[Another naming convention if applicable]

## 🎨 Styling Guidelines

_For UI components/visual packages_

### [Styling Approach]

[Description of how to style things in this package]

**Required patterns**:

```[language]
[Real styling code example]
```

### [Specific Styling Rule]

[Explanation]

**Example**:

```css
/* ✅ DO: */
[good css example]

/* ❌ DON'T: */
[bad css example]
```

## 🔧 Build & Development

### Development Mode

```bash
[command to start development]
```

**What happens**:

- [Effect 1]
- [Effect 2]
- [Effect 3]

**Hot reload**: [Yes/No and details]

### Production Build

```bash
[command to build]
```

**Output**:

```
[output-directory]/
├── [file1]          # [Description]
├── [file2]          # [Description]
└── [file3]          # [Description]
```

**Verify build**:

```bash
[command to verify build output]
```

### Testing Changes

**In isolation**:

```bash
[command to test in isolation]
```

**In integration**:

```bash
[command to test with other packages]
```

**Expected behavior**: [What to verify]

## 📋 Code Templates

### [Template Name 1]

```[language]
[Complete, copy-paste-ready code template]
```

**Usage**: [When to use this template]

### [Template Name 2]

```[language]
[Another complete template]
```

## 🔗 Dependencies

### Adding Dependencies

**Shared dependencies** (externalized):

- [dependency-name] - [When to use and why it's shared]

**Bundled dependencies** (included):

- [dependency-name] - [When to bundle instead of externalize]

**Installation**:

```bash
pnpm add [package-name]
```

**Configuration** _(if dependency needs to be externalized)_:

```[language]
[Configuration to externalize the dependency]
```

### Importing Dependencies

```[language]
// External (from import map/CDN)
import { Thing } from '@scope/external-package';

// Bundled
import { utility } from 'small-utility-package';
```

## 🚀 Deployment & Publishing

### Versioning

**Create changeset**:

```bash
pnpm changeset
```

**Select**:

- Package: `[@scope/package-name]`
- Change type: [patch | minor | major]
- Summary: [What changed]

### Build for Deployment

```bash
[commands to prepare for deployment]
```

### Deployment Process

1. [Step 1]
2. [Step 2]
3. [Step 3]

**Deployed to**: [Where it gets deployed]

### Verification

**Check deployment**:

```bash
[command or URL to verify]
```

## ⚠️ Important Rules

### DO ✅

- [Critical best practice 1]
- [Critical best practice 2]
- [Critical best practice 3]
- [Critical best practice 4]
- [Critical best practice 5]

### DON'T ❌

- [Critical anti-pattern 1 - explain why]
- [Critical anti-pattern 2 - explain why]
- [Critical anti-pattern 3 - explain why]
- [Critical anti-pattern 4 - explain why]
- [Critical anti-pattern 5 - explain why]

## 🎯 Common Tasks

### [Task 1: Common Operation]

**Goal**: [What you're trying to accomplish]

**Steps**:

```bash
# Step 1
[actual command]

# Step 2
[actual command]

# Step 3
[actual command]
```

**Verification**: [How to confirm it worked]

### [Task 2: Another Common Operation]

**Goal**: [What you're trying to accomplish]

**Quick command**:

```bash
[command]
```

### [Task 3: Troubleshooting]

**Problem**: [Common issue]

**Solution**:

```bash
[commands to fix]
```

## 🧪 Testing

### Test Strategy

[How to test things in this package]

**Unit tests** _(if applicable)_:

```bash
[command to run unit tests]
```

**Integration tests**:

```bash
[command to run integration tests]
```

**Manual testing**:

1. [Step 1 for manual test]
2. [Step 2]
3. [Expected result]

### Test Examples

```[language]
[Real test code example if tests exist]
```

## 🔍 Debugging

### Common Issues

**Issue**: [Description of common problem]

**Symptoms**:

- [Symptom 1]
- [Symptom 2]

**Solution**:

```bash
[command or fix]
```

**Why this happens**: [Explanation]

---

**Issue**: [Another common problem]

**Quick fix**:

```bash
[command]
```

### Development Tools

**[Tool name]**: [How to use it for debugging]

```bash
[command to use tool]
```

**[Another tool]**: [Purpose and usage]

## 📊 Performance Considerations

_If applicable for this package type_

### [Performance Aspect 1]

[Guidelines for performance]

**Example**:

```[language]
// ✅ Optimized approach
[good code]

// ❌ Slow approach
[bad code]
```

### [Performance Aspect 2]

[More performance guidelines]

## 🔄 Workflows

### Typical Development Workflow

```bash
# 1. Make changes
[edit files command or description]

# 2. Test locally
[test command]

# 3. Build
[build command]

# 4. Create changeset
pnpm changeset

# 5. Commit
git add .
git commit -m "[meaningful message]"

# 6. Push and create PR
git push
```

### Update Workflow

_For updating dependencies, configurations, etc._

1. [Step 1]
2. [Step 2]
3. [Step 3]

## 📚 Examples

### [Example 1: Simple Case]

```[language]
[Complete working example]
```

**Result**: [What this produces]

### [Example 2: Advanced Case]

```[language]
[More complex example]
```

**Use case**: [When you'd use this pattern]

### [Example 3: Integration]

```[language]
[Example showing integration with other packages]
```

## 🔗 Related Documentation

- **Architecture**: [../../architecture/[category]/[FILE].md](../../architecture/[category]/[FILE].md) - [Description]
- **Related Package 1**: [[FILE].md]([FILE].md) - [Description]
- **Related Package 2**: [[FILE].md]([FILE].md) - [Description]

## 📖 Additional Resources

_External links, blog posts, or references if applicable_

- [Resource name](URL) - [Brief description]
- [Resource name](URL) - [Brief description]

---

## Template Usage Notes

**When to use this template**:

- Creating development rules for a new package
- Updating existing development guidelines
- Documenting workflow changes

**Sections to customize by type**:

**For UI Component Libraries**:

- Emphasize: Component creation, styling, props, Storybook
- Include: Visual examples, accessibility guidelines
- De-emphasize: Deployment (unless it's the main package)

**For Build Tools/Plugins**:

- Emphasize: Configuration, API usage, integration
- Include: Before/after examples, plugin options
- De-emphasize: UI/visual aspects

**For Microfrontend Parcels**:

- Emphasize: Single-SPA lifecycle, routing, dependencies
- Include: Import map configuration, development ports
- Focus on: Integration with main container

**For Configuration Packages**:

- Emphasize: How to use the config, extending it
- Include: Real configuration examples
- Focus on: Import/usage patterns

**For API/Backend Services**:

- Emphasize: Endpoints, data models, authentication
- Include: API examples, request/response formats
- Focus on: Error handling, testing

**For CLI Tools**:

- Emphasize: Command usage, options, workflows
- Include: Command examples with output
- Focus on: Common use cases, troubleshooting

**Key principles**:

1. **Actionable**: Every section should have clear "what to do" instructions
2. **Examples**: Use real code from the codebase, not placeholders
3. **Commands**: Include actual, runnable commands
4. **Context**: Explain WHY, not just WHAT
5. **Cross-reference**: Link to architecture docs for "how it works"
