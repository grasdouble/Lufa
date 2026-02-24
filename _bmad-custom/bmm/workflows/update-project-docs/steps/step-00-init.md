---
name: step-00-init
description: Display welcome and capture update mode selection from user
nextStepScan: './step-01-scan.md'
nextStepContext: './step-03-update-context.md'
---

# Step 0: Mode Selection

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules

- 📖 Read entire step file before taking any action
- ⏸️ ALWAYS halt and wait for user input after presenting the menu
- 🔄 For unrecognized input or questions: answer the query, then redisplay the menu
- 🎯 This step ONLY captures the mode — no analysis, no subagents

### Step-Specific Rules

- FORBIDDEN to proceed without user selecting a valid mode
- FORBIDDEN to start any scan or subagent from this step
- Route to the correct step based on mode selection

## EXECUTION PROTOCOLS

- Display welcome message
- Present mode selection menu
- Halt and wait for user selection
- Execute routing based on choice

---

## 1. DISPLAY WELCOME

```
🔄 **Update Project Documentation Workflow v2.0**

This workflow uses parallel subagents to update documentation efficiently.

Architecture:
  • Step 1 — Scan monorepo (1 subagent)
  • Step 2 — Package docs (N subagents IN PARALLEL, 1 per package)
  • Step 3 — project-context.md (1 subagent)
  • Step 4 — index.md (1 subagent)
```

---

## 2. PRESENT MODE MENU

```
**Select update mode:**

[F] Full Update    — Scan + packages (parallel) + context + index
[S] Selective      — Choose which steps to include
[P] Packages Only  — Scan + packages only (parallel)
[C] Context Only   — Update project-context.md only

Your choice:
```

### Menu Handling Logic

- **IF F:** Set `{mode}` = F. Display "Full update selected. Starting scan...". Load, read completely, and execute `{nextStepScan}`.
- **IF S:** Ask user which steps to include (scan/packages/context/index). Store selections in `{mode}` = S with inclusions. Load, read completely, and execute `{nextStepScan}`.
- **IF P:** Set `{mode}` = P. Display "Packages-only mode selected. Starting scan...". Load, read completely, and execute `{nextStepScan}`.
- **IF C:** Set `{mode}` = C. Display "Context-only mode selected. Launching subagent...". Load, read completely, and execute `{nextStepContext}`.
- **IF any other input or question:** Answer the user's query, then [redisplay this menu](#2-present-mode-menu).

### Execution Rules

- ⏸️ ALWAYS halt and wait for user selection after displaying the menu
- ONLY proceed after a valid option (F/S/P/C) is selected
- After answering any query or comment, return to the menu display

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS

- Welcome message displayed
- Mode menu presented
- Valid user selection captured
- Correct step routed and loaded

### ❌ SYSTEM FAILURE

- Proceeding without user input
- Starting subagents from this step
- Routing to wrong step for selected mode
- Failing to redisplay menu after non-mode input

**Master Rule:** This step captures mode only. No work is done here.
