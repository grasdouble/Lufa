# How to Update AI Documentation

AI agent workflows for maintaining documentation.

## Format Rules

| Element       | Format         | Example                                  |
| ------------- | -------------- | ---------------------------------------- |
| Stats         | Bullet list    | `- Dev Port: 5173`                       |
| Tech Stack    | Table          | `Framework \| React 19`                  |
| Code Examples | Single example | One lifecycle hook, not all              |
| Decisions     | Compact table  | `What \| Why: reason \| Trade-off: cost` |
| Debug         | Table          | `Issue \| Solution \| Command`           |

Rules: Tables over prose, code over explanation, facts only, 1 example per concept, zero decorative text.

## Update Workflows

| Task                     | Trigger                                       | Output                             |
| ------------------------ | --------------------------------------------- | ---------------------------------- |
| Document GitHub Workflow | New file in `.github/workflows/`              | `.github/workflows/{name}.md`      |
| Document GitHub Action   | New action in `.github/actions/`              | `.github/actions/{name}/README.md` |
| Update Architecture      | New package, structure change, major refactor | `architecture/{TOPIC}.md`          |
| Update Development Rules | New conventions, package-specific guidelines  | `rules/{category}/{PACKAGE}.md`    |
| Create Architecture Doc  | New major system or architectural change      | `architecture/{TOPIC}.md`          |
| Create Rules Doc         | New package needs development guidelines      | `rules/{category}/{PACKAGE}.md`    |

### Workflow: Document GitHub Workflow

```
1. Open templates/GITHUB_WORKFLOW_DOC.template.md
2. Read AI instructions at top of template
3. Read actual workflow file: .github/workflows/{name}.yml
4. Fill template with real data from workflow
5. Remove AI instruction comments
6. Save as .github/workflows/{name}.md
```

```bash
# Example: Document release-changeset workflow
cat .github/ai/meta/templates/GITHUB_WORKFLOW_DOC.template.md
cat .github/workflows/release-changeset.yml
# Fill template and save to .github/workflows/release-changeset.md
```

### Workflow: Document GitHub Action

```
1. Open templates/GITHUB_ACTION_DOC.template.md
2. Read the action's action.yml file
3. Fill template with inputs, outputs, steps
4. Remove AI instructions
5. Save as .github/actions/{name}/README.md
```

### Workflow: Update Architecture Documentation

```
1. Read prompts/ARCHITECTURE_UPDATE_PROMPTS.md
2. Identify what changed (new package, removed package, restructure)
3. Run investigation commands to gather current state
4. Update architecture/{TOPIC}.md with changes
5. Update monorepo structure diagram if needed
6. Update "Last Updated" date
```

```bash
# Investigation commands
ls -R packages/
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;
cat pnpm-workspace.yaml
cat packages/{PATH}/package.json | jq
```

```bash
# Example: Add new microfrontend package
ls packages/apps/microfrontend/
cat packages/apps/microfrontend/new-app/package.json
# 1. Open architecture/GLOBAL.md or architecture/MICROFRONTEND.md
# 2. Add new package to structure tree
# 3. Add description to relevant section
# 4. Update "Last Updated" date
```

### Workflow: Update Development Rules

```
1. Read prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md
2. Identify which rules file needs update
3. Add/modify guidelines
4. Include code examples
5. Update "Last Updated" date
```

```bash
# Example: Add design system component guidelines
# Update rules/design-system/MAIN.md
# 1. Add new section "Creating Components"
# 2. Include step-by-step process
# 3. Add code examples from existing components
# 4. Update date
```

### Workflow: Create New Architecture Document

```
1. Copy templates/ARCHITECTURE.template.md
2. Read AI instructions carefully
3. Gather all relevant information from codebase
4. Fill all sections with real data
5. Replace all [placeholders]
6. Remove template instructions
7. Save to architecture/{TOPIC}.md
```

### Workflow: Create New Rules Document

```
1. Copy templates/DEVELOPMENT_GUIDELINES.template.md
2. Identify package structure and patterns
3. Document conventions and best practices
4. Include real code examples
5. Remove template instructions
6. Save to rules/{category}/{PACKAGE}.md
```

## Investigation Commands

### Project Structure

```bash
ls -R packages/
cat pnpm-workspace.yaml
cat package.json | jq
```

### Package Information

```bash
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;
cat packages/{PATH}/package.json | jq '.version, .scripts, .dependencies'
cat packages/{PATH}/package.json | jq '.scripts'
```

### Workflows and Actions

```bash
ls -la .github/workflows/
ls -la .github/actions/
cat .github/workflows/{name}.yml
```

### Configuration Files

```bash
find packages -name "tsconfig.json" -not -path "*/node_modules/*"
find packages/config -name "*eslint*"
find packages/config -name "*prettier*"
```

### Dependencies

```bash
cat package.json | jq '.dependencies, .devDependencies'
grep "workspace:" packages/*/package.json
```

## Quality Checklist

- [ ] All `[placeholders]` replaced with real data
- [ ] All package names match package.json
- [ ] All file paths exist in the repository
- [ ] All bash commands work when executed
- [ ] All links point to existing files
- [ ] "Last Updated" date is current
- [ ] Code examples are from actual codebase
- [ ] No template instructions visible
- [ ] Compact format used (tables, code, no prose)
- [ ] Markdown formatting is correct
- [ ] Information is accurate and verified

## Decision Tree

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

## Best Practices

| Do                                                             | Don't                                               |
| -------------------------------------------------------------- | --------------------------------------------------- |
| Start with investigation - Run commands to gather facts        | Don't guess - Always verify package names, paths    |
| Use templates - They ensure consistency                        | Don't leave placeholders - Replace all `[brackets]` |
| Follow compact format - Tables and code blocks, not paragraphs | Don't write prose - Use tables and code blocks      |
| Verify everything - Test commands, check paths                 | Don't break links - Verify all file references      |
| Link, don't duplicate - Reference existing docs                | Don't duplicate - Link to single source of truth    |
| Be specific - Use concrete examples from codebase              | Don't skip investigation - Gather real data first   |
| Update dates - Always update "Last Updated"                    | Don't leave TODOs - Complete all sections           |
| Remove instructions - Clean up template comments               | Don't forget dates - Update "Last Updated"          |

## Regular Maintenance

| Period           | Tasks                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| Weekly           | Review recent PRs for architecture changes, Check for new packages in workspace, Verify all links still work          |
| Monthly          | Update dependency versions in docs, Review and update code examples, Check for outdated information                   |
| On Major Changes | Update architecture docs immediately, Create new rules docs if needed, Update QUICK_REFERENCE.md if structure changes |

## Troubleshooting

| Issue                                 | Solution                                                                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Don't know where to document this     | 1. Check `QUICK_REFERENCE.md`<br>2. Read `README.md` for doc types<br>3. If still unclear, ask user for clarification                            |
| Template has missing information      | 1. Run investigation commands<br>2. Read relevant source files<br>3. Check package.json and configs<br>4. Look at similar existing documentation |
| Information conflicts between sources | 1. Trust code over documentation<br>2. Verify with `cat package.json`, `ls`, etc.<br>3. Update old documentation to match reality                |

---
