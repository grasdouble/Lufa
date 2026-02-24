---
name: step-03-update-context
description: Delegate project-context.md update to a dedicated subagent
subagentContextTemplate: '../templates/subagent-context.prompt.md'
contextStructureTemplate: '../templates/project-context-structure.md'
nextStepIndex: './step-04-update-index.md'
---

# Step 3: Update Project Context (Subagent)

**Architecture:** Orchestrator delegates to ONE subagent for context generation.

---

## MANDATORY EXECUTION RULES (READ FIRST)

### Universal Rules

- 📖 Read entire step file before taking any action
- ⏸️ ALWAYS halt and wait for user input at the User Confirmation menu
- 🔄 For unrecognized input: answer the query, then redisplay the menu
- 🚫 NEVER generate context yourself — delegate to subagent

### Step-Specific Rules

- Launch exactly ONE context subagent using `{subagentContextTemplate}`
- Context structure guidance: see `{contextStructureTemplate}`
- ONLY proceed after user confirms or selects a valid option

## EXECUTION PROTOCOLS

- Present user confirmation menu
- Halt and wait for user input
- Launch context subagent based on selected mode
- Report result and route to next step

---

## ⚠️ ORCHESTRATOR ROLE

You are the **ORCHESTRATOR**. You DO NOT generate the context yourself.
You DELEGATE to a subagent.

---

## 1. ANNOUNCE STEP

Display to user:

```
📄 **Step 3/4: project-context.md Update**

Please select the update mode for project-context.md.
```

---

## 2. USER CONFIRMATION

```
**Update options:**

[F] Full Regenerate - Completely regenerate the file
[U] Update Sections - Only update outdated sections
[A] Add Only - Add new rules without modifying existing
[R] Review - Review each change individually
[S] Skip - Skip this step

Your choice:
```

### Menu Handling Logic

- **IF F:** Set mode = "full". Proceed to section 3 with full regeneration.
- **IF U:** Set mode = "update". Proceed to section 3 targeting outdated sections.
- **IF A:** Set mode = "add-only". Proceed to section 3 adding new rules only.
- **IF R:** Set mode = "review". Proceed to section 3 reviewing each change.
- **IF S:** Skip subagent launch. Update state: `step3_completed: true`. Route per section 5.
- **IF any other input:** Answer the user's query, then [redisplay this menu](#2-user-confirmation).

### Execution Rules

- ⏸️ ALWAYS halt and wait for user input after displaying this menu
- ONLY proceed after a valid option (F/U/A/R/S) is selected
- After answering any query, return to menu display

---

## 3. GENERATE/UPDATE CONTEXT

Launch the context subagent with:

- **description**: "Generate project-context.md"
- **prompt**: Content from `{subagentContextTemplate}`, passing the selected mode and `{contextStructureTemplate}` path

The subagent will follow the structure defined in `{contextStructureTemplate}` to generate/update `_bmad-docs/project-context.md`.

---

## 4. SAVE AND REPORT

After updating:

```
✅ **project-context.md updated**

File: _bmad-docs/project-context.md
Size: {lines} lines
Sections: {count}
Last updated: {date}

Changes made:
- {summary of changes}
```

### Update State

```yaml
context_updated: true
```

---

## 5. CONTINUE TO NEXT STEP

- **IF mode is F or S:**
  Display: "Proceeding to step 4: index.md update..."
  Load, read completely, and execute `{nextStepIndex}`

- **IF mode is C:**
  Display: "Context update completed successfully."
  End workflow

---

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS

- User confirmation received before launching subagent
- Context subagent launched with correct mode and template reference
- `_bmad-docs/project-context.md` created/updated
- State updated and routed to next step

### ❌ SYSTEM FAILURE

- Proceeding without user input
- Generating context content directly (not via subagent)
- Routing to wrong step based on mode

**Master Rule:** User selects mode, subagent does the work.
