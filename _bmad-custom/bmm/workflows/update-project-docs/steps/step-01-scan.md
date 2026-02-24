---
name: step-01-scan
description: Delegate monorepo scan to a dedicated subagent
workflowPath: '{project-root}/_bmad-custom/bmm/workflows/update-project-docs'
subagentScanTemplate: '{workflowPath}/templates/subagent-scan.prompt.md'
nextStepPackages: './step-02-update-packages.md'
nextStepContext: './step-03-update-context.md'
---

# Step 1: Scan Monorepo (Subagent)

**Architecture:** Orchestrator delegates to ONE subagent for scanning.

---

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules

- 📖 Read entire step file before taking any action
- ⏸️ ALWAYS halt and wait for user input after presenting the scan results menu
- 🔄 For unrecognized input: answer the query, then redisplay the menu
- 🚫 NEVER scan the monorepo yourself — delegate to subagent

### Step-Specific Rules

- Launch exactly ONE scan subagent using `{subagentScanTemplate}`
- Wait for the subagent JSON report before presenting results
- ONLY proceed after user selects a valid option

## EXECUTION PROTOCOLS

- Launch scan subagent, wait for result
- Present results with selection menu
- Halt and wait for user input
- Store selection, route to next step

---

## ⚠️ ORCHESTRATOR ROLE

You are the **ORCHESTRATOR**. You DO NOT scan the monorepo yourself.
You DELEGATE to a subagent.

---

## 1. ANNOUNCE STEP

Display to user:

```
📊 **Step 1/4: Monorepo Analysis**

Launching scan subagent...
```

---

## 2. LAUNCH SCAN SUBAGENT

### 2.1 Load Template

Read the subagent prompt template:

- Path: `{subagentScanTemplate}`

### 2.2 Launch Subagent

Call `runSubagent` with:

- **description**: "Scan monorepo packages"
- **prompt**: Content from `{subagentScanTemplate}`

```
runSubagent(
  description: "Scan monorepo packages",
  prompt: {content of subagentScanTemplate}
)
```

### 2.3 Wait for Result

The subagent will return a JSON report with:

- `current_head_commit` - HEAD SHA to use as `{{current_commit}}`
- List of all packages with their `generatedAtCommit` and git diff status
- `packages_needing_update` - only packages with real source changes
- Summary statistics

---

## 3. PROCESS RESULTS

### 3.1 Parse Subagent Response

Extract from subagent result:

- `packages_needing_update[]` - List of packages
- `summary` - Statistics

### 3.2 Store in Workflow State

```yaml
workflow_state:
  step1_completed: true
  packages_to_update: [list from subagent]
  scan_summary: { summary from subagent }
```

---

## 4. PRESENT RESULTS TO USER

Display summary:

```
📋 **Scan Results**

{Scan Report}

---

**Available actions:**

[A] All - Update all identified packages
[S] Select - Choose which packages to update
[N] New Only - Only new packages
[V] Version Only - Only version changes
[X] Skip - Skip to next step without package update

Your choice:
```

---

## 5. PROCESS USER SELECTION

Based on selection:

- **IF A:** Add all packages needing updates to `packages_to_update`
- **IF S:** Present numbered list, let user multi-select
- **IF N:** Add only NEW packages to `packages_to_update`
- **IF V:** Add only VERSION_CHANGED packages to `packages_to_update`
- **IF X:** Set `packages_to_update` to empty, skip to step 3
- **IF any other input or question:** Answer the user's query, then [redisplay the Scan Results menu](#4-present-results-to-user)

---

## 6. SAVE STATE AND CONTINUE

Update workflow state:

```yaml
scan_completed: true
packages_scanned: [{ all packages found }]
packages_to_update: [{ selected packages }]
```

### Routing

- **IF packages_to_update is not empty:**
  Display: "Proceeding to step 2: Package documentation update..."
  Load, read completely, and execute `{nextStepPackages}`

- **IF packages_to_update is empty AND mode is F or S:**
  Display: "No packages to update. Proceeding to step 3..."
  Load, read completely, and execute `{nextStepContext}`

- **IF mode is P:**
  Display: "Packages Only mode completed."
  End workflow

---

## SCANNING UTILITIES

### Extract Package Info Function

For each package directory, read `package.json` and extract:

```javascript
{
  name: string,
  version: string,
  description: string,
  private: boolean,
  main: string,
  exports: object,
  dependencies: object,
  devDependencies: object,
  peerDependencies: object,
  scripts: object
}
```

### Detect Changes via Git Commit

```bash
# Read generatedAtCommit from doc frontmatter
GEN_COMMIT=$(grep 'generatedAtCommit:' _bmad-docs/packages/{category}/{name}.md \
  | sed 's/generatedAtCommit: "//;s/"//')

# Check for source changes since that commit
CHANGES=$(git log ${GEN_COMMIT}..HEAD --oneline -- packages/{category}/{name}/)

# Decision:
# - Empty CHANGES → up_to_date
# - Non-empty CHANGES → needs_update
# - GEN_COMMIT not found → needs_update (no reference)
# - Doc file missing → missing
```

### Detect Source Structure

Analyze package structure to understand:

- Entry points (`src/index.ts`, `src/index.tsx`)
- Export patterns (barrel exports, named exports)
- Key modules and their purposes
- Test coverage presence
