---
name: step-02-update-packages
description: Generate or update documentation for selected packages using PARALLEL subagents
workflowPath: '{project-root}/_bmad-custom/bmm/workflows/update-project-docs'
subagentPackageDocTemplate: '{workflowPath}/templates/subagent-package-doc.prompt.md'
nextStepContext: './step-03-update-context.md'
naming: '{workflowPath}/data/package-naming-conventions.md'
---

# Step 2: Update Package Documentation (PARALLEL Subagents)

**Objective:** Generate comprehensive documentation for each package using **dedicated subagents running IN PARALLEL** - one subagent per package for isolation and quality.

---

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules

- 📖 Read entire step file before taking any action
- 🚚 This step auto-proceeds — no main user input menu (packages were selected in step-01)
- ⏸️ HALT and wait for user input ONLY on subagent errors
- 🚫 NEVER document packages yourself — delegate each package to a dedicated subagent

### Step-Specific Rules

- Load `{subagentPackageDocTemplate}`, substitute `{{variable}}` placeholders, then launch subagents
- LAUNCH ALL SUBAGENTS IN PARALLEL in the SAME function_calls block
- For naming conventions reference: see `{naming}`

## EXECUTION PROTOCOLS

- Prepare package list from `packages_to_update`
- Load and populate prompt template for each package
- Launch ALL subagents simultaneously in one block
- Collect all results, report progress
- Handle errors interactively, route to next step

---

## 🚨 CRITICAL: PARALLEL SUBAGENT ARCHITECTURE

> See [`./data/parallel-architecture.md`](./data/parallel-architecture.md) for full architecture rationale and mandatory rules.

**Summary:** 1 package = 1 subagent. ALL subagents launch **IN PARALLEL** in the same `function_calls` block. Never batch multiple packages in one subagent call.

---

## 1. ANNOUNCE STEP

Display to user:

```
📦 **Step 2/4: Package Documentation Update**

{count} packages to document via dedicated subagents IN PARALLEL.

🔄 Architecture: 1 package = 1 isolated subagent (parallel execution)
   All subagents will be launched simultaneously!
```

---

## 2. PREPARE PARALLEL LAUNCH

### 2.1 Build Package List

Create a package list from `packages_to_update`:

```yaml
packages_for_parallel:
  total: { count }
  items:
    - package_name: '{name}'
      package_path: '{path}'
      category: '{category}'
    - ...
```

### 2.2 Display Packages to User

```
📋 **{count} packages to process in parallel**

| Package | Category | Path |
|---------|----------|------|
| {name} | {category} | {path} |
| {name} | {category} | {path} |
...

🚀 Launching all subagents in parallel...
```

---

## 3. PARALLEL SUBAGENT LAUNCH

### 3.1 Launch ALL Subagents Simultaneously

**CRITICAL**: To execute in parallel, you MUST call ALL `runSubagent` invocations in the SAME function_calls block.

Load the template from `{subagentPackageDocTemplate}` and customize for each package by substituting all `{{variable}}` placeholders with values from the package scan data.

**Example with 3 packages**:

In ONE function_calls block, launch all three:

- runSubagent("Document lufa_design-system", prompt_for_lufa_design_system)
- runSubagent("Document lufa_design-system-tokens", prompt_for_lufa_design_system_tokens)
- runSubagent("Document lufa_plugin_vite_import-map-injector", prompt_for_lufa_plugin_vite_import_map_injector)

All three subagents will execute IN PARALLEL automatically.

### 3.2 Wait for All Results

All subagent results will return together. Process them as a batch.

---

## 4. PROCESS PARALLEL RESULTS

### 4.1 Parse Subagent Response

After subagent completes, parse its response to extract:

- Files created (names and paths)
- Line counts
- Key findings
- Any errors or warnings

### 4.2 Report Progress

```
✅ [{index}/{total}] {package_name} - COMPLETED

   📄 Files created:
      • {package_name_short}.md ({lines} lines)
      • {package_name_short}.context.md ({lines} lines)

   💡 Key points: {brief_summary}
```

Update queue:

```yaml
- index: { n }
  status: 'completed'
  result:
    doc_file: '{package_name_short}.md'
    context_file: '{package_name_short}.context.md'
```

### 4.3 Handle Subagent Errors

If subagent fails or returns errors:

```
❌ [{index}/{total}] {package_name} - ERROR

   {error_description}

   Options:
   [R] Retry - Relaunch the subagent
   [S] Skip - Skip this package (mark as ignored)
   [M] Manual - Create an empty template to complete manually
   [A] Abort - Stop processing the queue

   Your choice:
```

#### Execution Rules

- ⏸️ ALWAYS halt and wait for user input on errors
- **IF R:** Re-invoke subagent with same parameters
- **IF S:** Mark as skipped, continue to next
- **IF M:** Create empty template files, continue
- **IF A:** Stop processing, go to summary
- **IF any other input:** Answer query, then redisplay error options

---

## 5. SUMMARY AND CONTINUE

After all packages processed:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 **Summary - Package Documentation Update**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Packages successfully documented: {success_count}/{total}
{for each successful}
   • {package_name} → {doc_file}, {context_file}
{/for}

⏭️ Packages skipped: {skipped_count}
{if any skipped}
   • {package_name} - {reason}
{/if}

❌ Packages with errors: {error_count}
{if any errors}
   • {package_name} - {error}
{/if}

📁 Documentation stockée dans: _bmad-docs/packages/
```

### Update Workflow State

```yaml
packages_updated: [{ list of successful packages }]
packages_skipped: [{ list of skipped packages }]
packages_failed: [{ list of failed packages }]
```

### Routing

- **IF mode is F or S:**
  Display: "Proceeding to step 3: project-context.md update..."
  Load, read completely, and execute `{nextStepContext}`

- **IF mode is P:**
  Display: "Packages Only mode completed."
  End workflow

---

## Reference

For variable naming, file naming conventions, and directory mapping, see:
`{workflowPath}/data/package-naming-conventions.md`

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS

- All selected packages processed by dedicated subagents
- Results collected and reported to user
- State updated with success/skip/fail lists
- Routed correctly to next step or end

### ❌ SYSTEM FAILURE

- Processing packages without subagents
- Launching subagents sequentially instead of in parallel
- Not halting for user input on errors
- Proceeding to next step before all subagents complete

**Master Rule:** One subagent per package. All parallel. No exceptions.
