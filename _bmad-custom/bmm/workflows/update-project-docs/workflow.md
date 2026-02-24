---
name: update-project-docs
description: Scans the monorepo to update project documentation using parallel subagents
version: 2.0.0
author: 'Smouillour'
firstStepFile: './steps/step-00-init.md'
workflowPath: '{project-root}/_bmad-custom/bmm/workflows/update-project-docs'
docsPath: '{project-root}/_bmad-docs'
templatesPath: '{workflowPath}/templates'
---

# Update Project Documentation Workflow

**Goal:** Maintain up-to-date documentation in `_bmad-docs/` using **parallel subagents** for maximum efficiency.

**Your Role:** You are the **orchestrator** - coordinating subagents, not doing the work yourself. Each task is delegated to isolated subagents.

---

## 🚨 CORE ARCHITECTURE: PARALLEL SUBAGENTS

### Design Principles

1. **ALL work is done by SUBAGENTS** - Orchestrator only coordinates
2. **ONE subagent = ONE task** - Complete isolation
3. **PARALLEL execution** - Independent tasks run simultaneously
4. **FRESH context** - Each subagent starts with clean context

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR (Main Agent)                       │
│  - Coordinates workflow steps                                        │
│  - Launches subagents (parallel when possible)                       │
│  - Collects results                                                  │
│  - Handles errors and retries                                        │
│  - Reports progress to user                                          │
└─────────────────────────────────────────────────────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
┌───────────────┐          ┌───────────────┐          ┌───────────────┐
│   STEP 1      │          │   STEP 2      │          │   STEP 3-4    │
│   SCAN        │          │   PACKAGES    │          │   CONTEXT/IDX │
│ (1 subagent)  │          │ (N parallel)  │          │ (1 subagent   │
│               │          │               │          │  each)        │
└───────────────┘          └───────────────┘          └───────────────┘
```

---

## WORKFLOW STEPS

| Step | Purpose         | Execution Mode | Subagents               |
| ---- | --------------- | -------------- | ----------------------- |
| 0    | Mode selection  | Interactive    | None                    |
| 1    | Scan monorepo   | 1 subagent     | Scan & identify changes |
| 2    | Update packages | **PARALLEL**   | 1 subagent per package  |
| 3    | Update context  | 1 subagent     | project-context.md      |
| 4    | Update index    | 1 subagent     | index.md                |

---

## CRITICAL RULES

### Orchestrator Rules

1. **NEVER do analysis yourself** - Always delegate to subagents
2. **LAUNCH PARALLEL when independent** - Step 2 packages are independent
3. **WAIT for all parallel subagents** before proceeding
4. **COLLECT and MERGE results** from parallel executions
5. **HANDLE failures gracefully** - Retry or skip individual subagents

### Subagent Rules

1. **ONE task per subagent** - Never batch multiple tasks
2. **FRESH context** - Each subagent has no knowledge of others
3. **ISOLATED writes** - Each subagent writes only its assigned files
4. **REPORT results** - Each subagent returns structured completion report

### Parallel Execution Rules

1. **Group independent tasks** - All packages can run in parallel
2. **Use batch launches** - Call multiple `runSubagent` in same turn
3. **Collect all results** - Wait for all to complete
4. **Merge results** - Combine success/failure reports

---

## INITIALIZATION

Load `{project-root}/_bmad/bmm/config.yaml` and store:

- `{project_name}`, `{user_name}`, `{communication_language}`, `{document_output_language}`, `{project_knowledge}`

Resolve workflow paths from frontmatter:

- `{workflowPath}` — root folder of this workflow
- `{docsPath}` — `{project-root}/_bmad-docs`
- `{templatesPath}` — `{workflowPath}/templates`

---

Then load, read completely, and execute `{firstStepFile}`.

<!-- REMOVED SECTIONS (moved to step files):
  - EXECUTION FLOW → step-00-init.md
  - STEP EXECUTION DETAILS → step-01 through step-04
  - PARALLEL EXECUTION HOW IT WORKS → step-02-update-packages.md
  - ERROR HANDLING → step-02-update-packages.md
  - TEMPLATES REFERENCE → each step file
-->

## STATE TRACKING

```yaml
workflow_state:
  mode: null # F, S, P, or C
  current_head_commit: null
  step1_completed: false
  step2_completed: false
  step3_completed: false
  step4_completed: false
  packages_to_update: []
  packages_results: []
  failed_packages: []
```
