# AI Documentation Guide

Last Updated: 2025-12-14

## Task Reference

| Task                  | Template                                           | Output                             |
| --------------------- | -------------------------------------------------- | ---------------------------------- |
| Document workflow     | `templates/GITHUB_WORKFLOW_DOC.template.md`        | `.github/workflows/{name}.md`      |
| Document action       | `templates/GITHUB_ACTION_DOC.template.md`          | `.github/actions/{name}/README.md` |
| Document architecture | `templates/ARCHITECTURE.template.md`               | `architecture/{TOPIC}.md`          |
| Document rules        | `templates/RULES.template.md`                      | `rules/{TOPIC}.md`                 |
| Update architecture   | `prompts/ARCHITECTURE_UPDATE_PROMPTS.md`           | `architecture/{TOPIC}.md`          |
| Update rules          | `prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md` | `rules/{TOPIC}.md`                 |
| Understand project    | `architecture/GLOBAL.md`                           | -                                  |
| Learn standards       | `rules/design-system/{PACKAGE}.md`                 | -                                  |

## Structure

```
.github/ai/
├── architecture/
│   ├── GLOBAL.md
│   ├── design-system/
│   │   ├── DESIGN_SYSTEM.md
│   │   ├── PRIMITIVES.md
│   │   ├── TOKENS.md
│   │   ├── MAIN.md
│   │   ├── STORYBOOK.md
│   │   ├── CSS.md
│   │   └── DOCUMENTATION.md
│   └── microfrontend/
│       ├── MICROFRONTEND.md
│       ├── CONTAINER.md
│       └── PARCELS.md
├── rules/
│   └── design-system/
│       ├── MAIN.md
│       ├── PRIMITIVES.md
│       ├── TOKENS.md
│       ├── STORYBOOK.md
│       └── DOCUMENTATION.md
└── meta/
    ├── README.md
    ├── HOW_TO_UPDATE.md
    ├── templates/
    │   ├── ARCHITECTURE.template.md
    │   ├── RULES.template.md
    │   ├── GITHUB_ACTION_DOC.template.md
    │   └── GITHUB_WORKFLOW_DOC.template.md
    └── prompts/
        ├── ARCHITECTURE_UPDATE_PROMPTS.md
        └── DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md
```

## Format Elements

| Element   | Format      | Example                        |
| --------- | ----------- | ------------------------------ |
| Stats     | Bullets     | `- Dev Port: 5173`             |
| Tech      | Table       | `Framework \| React 19`        |
| Examples  | Code blocks | Single example per concept     |
| Decisions | Table       | `What \| Why \| Trade-off`     |
| Debug     | Table       | `Issue \| Solution \| Command` |
| Emojis    | None        | AI-optimized                   |

Template sections: Package/Location/Updated/Version → Stats → Structure → Tech Stack → Key Concepts → Config → Build → Dependencies → Integration → Workflows → Decisions → Deployment → Debug → Best Practices → Links

## Standards

| Category      | Rule              | Format              |
| ------------- | ----------------- | ------------------- |
| Data source   | Real data only    | From repository     |
| Verification  | All info verified | Before writing      |
| Examples      | Actual codebase   | Not invented        |
| Package names | From package.json | Exact match         |
| File paths    | Existing only     | Valid paths         |
| Commands      | Executable        | Working             |
| Placeholders  | Zero              | No `[brackets]`     |
| TODOs         | Zero              | Complete all        |
| Links         | Valid only        | Existing files      |
| Inline code   | Use \`\`          | code/packages/paths |
| Headers       | Ordered           | # → ## → ### → #### |
| Dates         | Required          | Last Updated at top |

## Investigation Commands

```bash
# Workspace
cat pnpm-workspace.yaml
ls -R packages/

# Packages
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;
cat packages/PATH/package.json | jq '.version, .scripts'

# Workflows/Actions
ls .github/workflows/
ls .github/actions/

# Dependencies
cat package.json | jq '.dependencies'

# TypeScript
find packages -name "tsconfig.json" -not -path "*/node_modules/*"
```

## Workflows

```bash
# Create Architecture Doc
templates/ARCHITECTURE.template.md → gather data → fill all sections → remove instructions → save architecture/{TOPIC}.md

# Create Rules Doc
templates/RULES.template.md → identify patterns → document conventions → remove instructions → save rules/{category}/{PACKAGE}.md

# Update Architecture
prompts/ARCHITECTURE_UPDATE_PROMPTS.md → run investigation → update architecture/{TOPIC}.md → update date

# Document Workflow
templates/GITHUB_WORKFLOW_DOC.template.md → read .github/workflows/{name}.yml → fill data → remove instructions → save .github/workflows/{name}.md

# Document Action
templates/GITHUB_ACTION_DOC.template.md → read .github/actions/{name}/action.yml → fill inputs/outputs → remove instructions → save .github/actions/{name}/README.md
```

## Doc Types

| Type         | Purpose                  | Location                           | When                    | Template                          |
| ------------ | ------------------------ | ---------------------------------- | ----------------------- | --------------------------------- |
| Architecture | System structure         | `architecture/`                    | New system/major change | `ARCHITECTURE.template.md`        |
| Rules        | Development guidelines   | `rules/`                           | New package/conventions | `RULES.template.md`               |
| Workflow     | GitHub Actions workflows | `.github/workflows/{name}.md`      | New/complex workflow    | `GITHUB_WORKFLOW_DOC.template.md` |
| Action       | Custom GitHub Actions    | `.github/actions/{name}/README.md` | New custom action       | `GITHUB_ACTION_DOC.template.md`   |

## Update Triggers

| Change                    | Action                      |
| ------------------------- | --------------------------- |
| Package added/removed     | Update architecture         |
| Package structure changed | Update architecture         |
| New workflow/action       | Create workflow/action doc  |
| Technology stack changed  | Update architecture         |
| Architecture decision     | Update architecture         |
| Breaking change           | Update architecture + rules |
| New convention            | Update rules                |

## Required Checks

| Check                           | Status |
| ------------------------------- | ------ |
| All `[placeholders]` replaced   | [ ]    |
| Package names from package.json | [ ]    |
| File paths exist                | [ ]    |
| Commands executable             | [ ]    |
| Links valid                     | [ ]    |
| Date current                    | [ ]    |
| Code from codebase              | [ ]    |
| Template instructions removed   | [ ]    |
| Compact format used             | [ ]    |
| Info verified                   | [ ]    |

## Links

| Link                                                | Purpose                 |
| --------------------------------------------------- | ----------------------- |
| [HOW_TO_UPDATE.md](HOW_TO_UPDATE.md)                | Detailed workflows      |
| [templates/](templates/)                            | Documentation templates |
| [prompts/](prompts/)                                | Update guides           |
| [architecture/GLOBAL.md](../architecture/GLOBAL.md) | Monorepo overview       |
