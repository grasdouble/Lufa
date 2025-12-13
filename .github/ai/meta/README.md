# AI Documentation Guide

> 🤖 **For AI Agents**: This is your guide to understanding and maintaining the Lufa AI documentation system.

## 📋 Quick Reference

| User Request          | What to Do                                                                                                    | Output Location                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Document workflow     | Use [`templates/GITHUB_WORKFLOW_DOC.template.md`](templates/GITHUB_WORKFLOW_DOC.template.md)                  | `.github/workflows/{name}.md`      |
| Document action       | Use [`templates/GITHUB_ACTION_DOC.template.md`](templates/GITHUB_ACTION_DOC.template.md)                      | `.github/actions/{name}/README.md` |
| Document architecture | Use [`templates/ARCHITECTURE.template.md`](templates/ARCHITECTURE.template.md)                                | `architecture/{TOPIC}.md`          |
| Document rules        | Use [`templates/RULES.template.md`](templates/RULES.template.md)                                              | `rules/{TOPIC}.md`                 |
| Update architecture   | Follow [`prompts/ARCHITECTURE_UPDATE_PROMPTS.md`](prompts/ARCHITECTURE_UPDATE_PROMPTS.md)                     | `architecture/{TOPIC}.md`          |
| Update rules          | Follow [`prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md`](prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md) | `rules/{TOPIC}.md`                 |
| Understand project    | Read `architecture/GLOBAL.md`                                                                                 | (explain to user)                  |
| Learn standards       | Read `rules/design-system/{PACKAGE}.md`                                                                       | (explain to user)                  |

## 🗂️ Documentation Structure

```
.github/ai/
├── QUICK_REFERENCE.md          # Fast lookup guide
│
├── architecture/                # System descriptions
│   ├── GLOBAL.md               # Monorepo architecture
│   ├── DESIGN_SYSTEM.md        # Design system overview
│   ├── DESIGN_SYSTEM_CSS.md    # CSS architecture
│   └── MICROFRONTEND.md        # Microfrontend architecture
│
├── rules/                       # Development guidelines
│   └── design-system/          # Package-specific rules
│       ├── MAIN.md
│       ├── PRIMITIVES.md
│       ├── TOKENS.md
│       ├── STORYBOOK.md
│       └── DOCUMENTATION.md
│
└── meta/                        # Documentation about docs
    ├── README.md               # This file
    ├── HOW_TO_UPDATE.md        # Update workflows
    ├── templates/              # Creation templates
    │   ├── ARCHITECTURE.template.md
    │   ├── RULES.template.md
    │   ├── GITHUB_ACTION_DOC.template.md
    │   └── GITHUB_WORKFLOW_DOC.template.md
    └── prompts/                 # Update guides
        ├── ARCHITECTURE_UPDATE_PROMPTS.md
        └── DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md
```

## 🎯 How to Use This System

### Creating New Documentation

1. **Choose the right template** from `templates/`
2. **Read the AI instructions** at the top of the template
3. **Gather real data** from the repository (package.json, code, configs)
4. **Fill the template** with actual information (no placeholders!)
5. **Remove template instructions** before saving
6. **Save to correct location** as specified in the template

**Example:**

```
User: "Document the release workflow"

Steps:
1. Open templates/GITHUB_WORKFLOW_DOC.template.md
2. Read .github/workflows/release.yml
3. Fill template with real workflow data
4. Remove <!-- AI INSTRUCTIONS -->
5. Save as .github/workflows/release.md
```

### Updating Existing Documentation

1. **Find the update prompt** in `prompts/` for the doc type
2. **Follow investigation commands** to gather current state
3. **Make targeted updates** to existing docs
4. **Update "Last Updated" date**
5. **Verify accuracy** of all information

**Example:**

```
User: "Update architecture with new package"

Steps:
1. Read prompts/ARCHITECTURE_UPDATE_PROMPTS.md
2. Run: ls packages/
3. Read new package's package.json
4. Update architecture/GLOBAL.md
5. Update date
```

## ✅ Documentation Standards

### Content Rules

- ✅ **Always use real data** from the repository
- ✅ **Verify all information** before writing
- ✅ **Include actual examples** from the codebase
- ✅ **Use correct package names** from package.json
- ✅ **Use real file paths** that exist in the repo
- ✅ **Include working commands** that can be executed

### Formatting Rules

- ✅ Use **markdown** for all docs
- ✅ Use `` for inline code, package names, file paths
- ✅ Use **bold** for emphasis
- ✅ Use headers in order (# → ## → ### → ####)
- ✅ Include "Last Updated" date at the top
- ✅ Add links to related documentation

### What to Avoid

- ❌ Never leave `[placeholders]` in final docs
- ❌ Never leave `[TODO]` items
- ❌ Never guess package names or versions
- ❌ Never include broken links
- ❌ Never leave template instructions visible
- ❌ Never duplicate information (link instead)

## 🔍 Investigation Commands

Use these to gather accurate information:

```bash
# Workspace structure
cat pnpm-workspace.yaml
ls -R packages/

# Package information
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;
cat packages/PATH/package.json | jq '.version, .scripts'

# Workflows and actions
ls .github/workflows/
ls .github/actions/

# Dependencies
cat package.json | jq '.dependencies'

# TypeScript configs
find packages -name "tsconfig.json" -not -path "*/node_modules/*"
```

## 📦 Documentation Types

### Architecture Documentation

**Purpose**: Explain how systems are structured and why

**Location**: `architecture/`

**When to create**:

- New major system added
- Significant architectural change
- Complex integration needs explanation

**Template**: `templates/ARCHITECTURE.template.md`

### Development Rules

**Purpose**: Guide developers on how to work with specific packages

**Location**: `rules/`

**When to create**:

- New package created
- Package-specific conventions needed
- Common patterns to document

**Template**: `templates/DEVELOPMENT_GUIDELINES.template.md`

### Workflow Documentation

**Purpose**: Explain GitHub Actions workflows

**Location**: `.github/workflows/{name}.md`

**When to create**:

- New workflow created
- Complex workflow needs explanation

**Template**: `templates/GITHUB_WORKFLOW_DOC.template.md`

### Action Documentation

**Purpose**: Document custom GitHub Actions

**Location**: `.github/actions/{name}/README.md`

**When to create**:

- New custom action created

**Template**: `templates/GITHUB_ACTION_DOC.template.md`

## 🔄 Update Triggers

Update documentation when:

- ✏️ New packages added/removed
- ✏️ Package structure changes
- ✏️ New workflows/actions created
- ✏️ Technology stack changes
- ✏️ Architecture decisions made
- ✏️ Breaking changes introduced
- ✏️ New conventions established

## 💡 Best Practices

1. **Start with investigation** - Gather all facts first
2. **Use templates** - Don't start from scratch
3. **Link, don't duplicate** - Reference existing docs
4. **Be specific** - Use concrete examples
5. **Stay current** - Update dates and versions
6. **Test commands** - Verify all bash commands work
7. **Review links** - Ensure all links are valid

## 🆘 Need Help?

If you're unsure:

1. Check [`QUICK_REFERENCE.md`](../QUICK_REFERENCE.md) for fast lookup
2. Read [`HOW_TO_UPDATE.md`](HOW_TO_UPDATE.md) for detailed workflows
3. Look at existing documentation for examples
4. Use templates as guides

---

**Last Updated**: December 13, 2025
