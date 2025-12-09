# AI Agent Detailed Workflows

> Detailed step-by-step workflows for common tasks. For quick reference, see README.md

## Investigation Commands

```bash
# Project structure
ls -R packages/
cat pnpm-workspace.yaml

# Configuration
cat package.json
find packages/config -name "*.json"

# Workflows and actions
ls .github/workflows/
ls .github/actions/

# Tests
find . -name "*.test.*" -o -name "*.spec.*" | head -10

# Package names
find packages -name "package.json" -not -path "*/node_modules/*" -exec jq -r '.name' {} \;

# Scripts
cat package.json | jq '.scripts'

# TypeScript configs
find packages -name "tsconfig.json" -not -path "*/node_modules/*"
```

## Step-by-Step Workflows

### Document a Workflow

```
User: "Document the release-changeset workflow"

Process:
1. Open templates/GITHUB_WORKFLOW_DOC.template.md
2. Read AI instructions at top
3. Read actual workflow: .github/workflows/release-changeset.yml
4. Fill template with real data from workflow file
5. Remove AI instructions
6. Create .github/workflows/release-changeset.md
```

### Update Architecture

```
User: "Update architecture docs with new package"

Process:
1. Open prompts/ARCHITECTURE_UPDATE_PROMPTS.md
2. Scan repo for new package (ls packages/)
3. Read package's package.json and README
4. Update ARCHITECTURE.md with real data
5. Update monorepo structure diagram
6. Update "Last Updated" date
```

### Explain Standards

```
User: "What are the TypeScript standards?"

Process:
1. Read DEVELOPMENT_GUIDELINES.md
2. Find TypeScript section
3. Summarize key points with examples
```

### Create New Package

```
User: "Help me create a new package"

Process:
1. Read DEVELOPMENT_GUIDELINES.md "Creating a New Package"
2. Read ARCHITECTURE.md for context
3. Ask clarifying questions (category, name, purpose)
4. Follow documented process with real config
5. Update docs if needed
```
