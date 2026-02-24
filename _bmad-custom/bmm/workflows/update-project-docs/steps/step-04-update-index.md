---
name: step-04-update-index
description: Delegate index.md generation to a dedicated subagent
workflowPath: '{project-root}/_bmad-custom/bmm/workflows/update-project-docs'
subagentIndexTemplate: '{workflowPath}/templates/subagent-index.prompt.md'
indexStructureTemplate: '{workflowPath}/templates/index-structure.md'
---

# Step 4: Update Documentation Index (Subagent)

**Architecture:** Orchestrator delegates to ONE subagent for index generation.

---

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules

- 📖 Read entire step file before taking any action
- ⏸️ ALWAYS halt and wait for user input at the User Confirmation menu
- 🔄 For unrecognized input: answer the query, then redisplay the menu
- 🚫 NEVER generate the index yourself — delegate to subagent

### Step-Specific Rules

- Launch exactly ONE index subagent using `{subagentIndexTemplate}`
- Index structure guidance for the subagent: `{indexStructureTemplate}`
- ONLY save after user confirms

## EXECUTION PROTOCOLS

- Launch index subagent, wait for result
- Show preview to user
- Present confirmation menu, halt and wait
- Save and finalize

---

## ⚠️ ORCHESTRATOR ROLE

You are the **ORCHESTRATOR**. You DO NOT generate the index yourself.
You DELEGATE to a subagent.

---

## 1. ANNOUNCE STEP

Display to user:

```
📑 **Step 4/4: index.md Update**

Launching index generation subagent...
```

---

## 2. LAUNCH INDEX SUBAGENT

### 2.1 Load Template

Read the subagent prompt template: `{subagentIndexTemplate}`

### 2.2 Launch Subagent

Call `runSubagent` with:

- **description**: "Generate documentation index"
- **prompt**: Content from template

### 2.3 Wait for Result

The subagent will generate `_bmad-docs/index.md`

---

## 3. PROCESS RESULTS

### 3.1 Verify Output

Confirm that `_bmad-docs/index.md` was created/updated.

> 📋 The index structure is defined in `{indexStructureTemplate}`. See that file for the complete structure: Quick Reference Links, Package tables, Navigation Guide, and Statistics.

### 3.2 Update Workflow State

```yaml
workflow_state:
  step4_completed: true
```

---

## 4. SHOW PREVIEW

Display preview of key sections:

```
📋 **Updated Index Preview**

Main sections:
- Project Overview ✅
- Quick Reference Links ({count} links)
- Package Dependency Map ✅
- Package Documentation ({count} packages)
- Navigation Guide ✅
- Documentation Statistics ✅

Total referenced documents: {count}
```

---

## 5. USER CONFIRMATION

```
**Confirm update?**

[Y] Yes          — Save the updated index
[P] Preview Full — View complete index before saving
[E] Edit         — Modify specific sections
[N] No           — Cancel changes

Your choice:
```

### Menu Handling Logic

- **IF Y:** Proceed to section 6 to save the file.
- **IF P:** Display the full generated index to the user, then [redisplay this menu](#5-user-confirmation).
- **IF E:** Ask which sections to modify, re-launch subagent for those sections, then [redisplay this menu](#5-user-confirmation).
- **IF N:** Display "Changes cancelled. Index not updated." End workflow.
- **IF any other input:** Answer the user's query, then [redisplay this menu](#5-user-confirmation).

### Execution Rules

- ⏸️ ALWAYS halt and wait for user input after displaying this menu
- ONLY proceed to save after Y is selected
- After P/E/query, always return to this menu

---

## 6. SAVE AND FINALIZE

After confirmation:

```
✅ **index.md updated**

File: _bmad-docs/index.md
Referenced documents: {count}
Packages listed: {count}
Last updated: {date}
```

### Update State

```yaml
index_updated: true
```

---

## 7. WORKFLOW COMPLETION

Display final summary:

```
🎉 **Workflow Update Project Docs Completed**

## Summary of Actions

| Step | Status | Details |
|------|--------|---------|
| 1. Scan | ✅ | {packages_scanned} packages analysés |
| 2. Packages | ✅ | {packages_updated} packages documentés |
| 3. Context | ✅ | project-context.md updated |
| 4. Index | ✅ | index.md regenerated |

## Modified Files

- _bmad-docs/index.md
- _bmad-docs/project-context.md
{List of package docs updated}

## Suggested Next Steps

1. Review generated files for accuracy
2. Commit changes: `git add _bmad-docs && git commit -m "docs: update project documentation"`
3. Run this workflow periodically to keep documentation up to date

---

Thank you for using the Update Project Docs workflow! 🙏
```

End workflow.

---

## Reference

For link format rules, package table format, dependency diagram, and statistics tracking, see:
`{workflowPath}/templates/index-structure.md`

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS

- Index subagent launched with correct template reference
- Preview shown to user
- User confirmation obtained before saving
- `_bmad-docs/index.md` saved after confirmation
- Workflow completion summary displayed

### ❌ SYSTEM FAILURE

- Saving without user confirmation
- Generating index content directly (not via subagent)
- Not halting for user input at confirmation menu
- Missing confirmation menu handler

**Master Rule:** Always confirm with user before saving the index file.
