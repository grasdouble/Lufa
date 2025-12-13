# How to Update AI Documentation

> 📝 **For AI Agents**: Step-by-step workflows for maintaining and updating documentation.

## 🔄 Common Update Workflows

### 1. Document a GitHub Workflow

**Trigger**: New workflow file created in `.github/workflows/`

**Process**:

```
1. Open templates/GITHUB_WORKFLOW_DOC.template.md
2. Read AI instructions at top of template
3. Read actual workflow file: .github/workflows/{name}.yml
4. Fill template with real data from workflow
5. Remove AI instruction comments
6. Save as .github/workflows/{name}.md
```

**Example**:

```bash
# User: "Document the release-changeset workflow"

# Step 1-2: Read template
cat .github/ai/meta/templates/GITHUB_WORKFLOW_DOC.template.md

# Step 3: Read actual workflow
cat .github/workflows/release-changeset.yml

# Step 4-6: Fill template and save
# (create .github/workflows/release-changeset.md)
```

### 2. Document a GitHub Action

**Trigger**: New custom action created in `.github/actions/`

**Process**:

```
1. Open templates/GITHUB_ACTION_DOC.template.md
2. Read the action's action.yml file
3. Fill template with inputs, outputs, steps
4. Remove AI instructions
5. Save as .github/actions/{name}/README.md
```

### 3. Update Architecture Documentation

**Trigger**: New package added, structure changed, major refactor

**Process**:

```
1. Read prompts/ARCHITECTURE_UPDATE_PROMPTS.md
2. Identify what changed (new package, removed package, restructure)
3. Run investigation commands to gather current state
4. Update architecture/{TOPIC}.md with changes
5. Update monorepo structure diagram if needed
6. Update "Last Updated" date
```

**Investigation Commands**:

```bash
# List all packages
ls -R packages/

# Get package names
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;

# Check workspace config
cat pnpm-workspace.yaml

# View package details
cat packages/{PATH}/package.json | jq
```

**Example**:

```bash
# User: "Update architecture with new microfrontend package"

# Investigate
ls packages/apps/microfrontend/
cat packages/apps/microfrontend/new-app/package.json

# Update
# 1. Open architecture/GLOBAL.md or architecture/MICROFRONTEND.md
# 2. Add new package to structure tree
# 3. Add description to relevant section
# 4. Update "Last Updated" date
```

### 4. Update Development Rules

**Trigger**: New conventions, new package-specific guidelines

**Process**:

```
1. Read prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md
2. Identify which rules file needs update
3. Add/modify guidelines
4. Include code examples
5. Update "Last Updated" date
```

**Example**:

```bash
# User: "Add guidelines for creating new design system components"

# Update rules/design-system/MAIN.md
# 1. Add new section "Creating Components"
# 2. Include step-by-step process
# 3. Add code examples from existing components
# 4. Update date
```

### 5. Create New Architecture Document

**Trigger**: New major system or significant architectural change

**Process**:

```
1. Copy templates/ARCHITECTURE.template.md
2. Read AI instructions carefully
3. Gather all relevant information from codebase
4. Fill all sections with real data
5. Replace all [placeholders]
6. Remove template instructions
7. Save to architecture/{TOPIC}.md
```

### 6. Create New Rules Document

**Trigger**: New package needs development guidelines

**Process**:

```
1. Copy templates/DEVELOPMENT_GUIDELINES.template.md
2. Identify package structure and patterns
3. Document conventions and best practices
4. Include real code examples
5. Remove template instructions
6. Save to rules/{category}/{PACKAGE}.md
```

## 🔍 Investigation Commands Reference

### Project Structure

```bash
# View all packages
ls -R packages/

# Workspace configuration
cat pnpm-workspace.yaml

# Root package.json
cat package.json | jq
```

### Package Information

```bash
# All package names
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;

# Specific package details
cat packages/{PATH}/package.json | jq '.version, .scripts, .dependencies'

# Package scripts
cat packages/{PATH}/package.json | jq '.scripts'
```

### Workflows and Actions

```bash
# List workflows
ls -la .github/workflows/

# List actions
ls -la .github/actions/

# Read workflow
cat .github/workflows/{name}.yml
```

### Configuration Files

```bash
# Find all tsconfig files
find packages -name "tsconfig.json" -not -path "*/node_modules/*"

# ESLint configs
find packages/config -name "*eslint*"

# Prettier configs
find packages/config -name "*prettier*"
```

### Dependencies

```bash
# Root dependencies
cat package.json | jq '.dependencies, .devDependencies'

# Workspace dependencies
grep "workspace:" packages/*/package.json
```

## ✅ Quality Checklist

Before finalizing any documentation update:

- [ ] All `[placeholders]` replaced with real data
- [ ] All package names match package.json
- [ ] All file paths exist in the repository
- [ ] All bash commands work when executed
- [ ] All links point to existing files
- [ ] "Last Updated" date is current
- [ ] Code examples are from actual codebase
- [ ] No template instructions visible
- [ ] Markdown formatting is correct
- [ ] Information is accurate and verified

## 🎯 Decision Tree

```
Need to update docs?
│
├─ New workflow/action created?
│  └─→ Use workflow/action template
│
├─ Architecture changed?
│  └─→ Follow ARCHITECTURE_UPDATE_PROMPTS.md
│
├─ New package added?
│  ├─→ Update architecture docs
│  └─→ Create new rules doc if needed
│
├─ Development guidelines changed?
│  └─→ Follow DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md
│
└─ New system/concept?
   └─→ Create new architecture doc from template
```

## 💡 Best Practices

### Do's ✅

- **Start with investigation** - Run commands to gather facts
- **Use templates** - They ensure consistency
- **Verify everything** - Test commands, check paths
- **Link, don't duplicate** - Reference existing docs
- **Be specific** - Use concrete examples from codebase
- **Update dates** - Always update "Last Updated"
- **Remove instructions** - Clean up template comments

### Don'ts ❌

- **Don't guess** - Always verify package names, paths
- **Don't leave placeholders** - Replace all `[brackets]`
- **Don't break links** - Verify all file references
- **Don't duplicate** - Link to single source of truth
- **Don't skip investigation** - Gather real data first
- **Don't leave TODOs** - Complete all sections
- **Don't forget dates** - Update "Last Updated"

## 🔄 Regular Maintenance

### Weekly

- Review recent PRs for architecture changes
- Check for new packages in workspace
- Verify all links still work

### Monthly

- Update dependency versions in docs
- Review and update code examples
- Check for outdated information

### On Major Changes

- Update architecture docs immediately
- Create new rules docs if needed
- Update QUICK_REFERENCE.md if structure changes

## 🆘 Troubleshooting

### "I don't know where to document this"

1. Check [`QUICK_REFERENCE.md`](../QUICK_REFERENCE.md)
2. Read [`README.md`](README.md) for doc types
3. If still unclear, ask user for clarification

### "Template has missing information"

1. Run investigation commands
2. Read relevant source files
3. Check package.json and configs
4. Look at similar existing documentation

### "Information conflicts between sources"

1. Trust code over documentation
2. Verify with `cat package.json`, `ls`, etc.
3. Update old documentation to match reality

---

**Last Updated**: December 13, 2025
