# 🤖 AI Agent Rules - Analysis Projects

> **Purpose:** Essential rules and patterns for AI agents working with analysis projects in the Lufa monorepo. This is your activation checklist and operational guide.

**When to Read This:**

- ⚡ **On activation** - When you're first assigned to work on an analysis project
- 🔄 **On resumption** - When resuming work after a break or context switch
- ❓ **When uncertain** - Before making file placement or delegation decisions
- 📋 **Before updating docs** - Before modifying MASTER-STATUS.md or creating summaries

**Last Updated:** 2026-01-24  
**Version:** 1.1  
**Related Docs:** [PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md) | [README.md](README.md) | [QUICK-START.md](QUICK-START.md)

---

## 🎯 A) Core Workflow Rules

### Rule 1: Mandatory Delegation (Mary Coordinator Pattern)

**✅ ALL implementation tasks MUST be delegated to subagents using the Task tool**

**What gets delegated:**

- Writing code (components, tokens, utilities, tests)
- Creating/modifying configuration files
- Running builds, validation scripts, or tests
- File operations (create, edit, move, delete)
- Git operations (commit, branch management)

**What Mary does NOT do:**

- ❌ Use `Edit`, `Write`, `Bash` tools for ANY file modifications
- ❌ Write production code directly
- ❌ Execute build commands directly
- ❌ Commit changes directly
- ❌ Update MASTER-STATUS.md or roadmap files directly
- ❌ Create summaries or study documents directly
- ❌ Modify ANY files in the codebase or analysis directories

**What Mary DOES do:**

- ✅ Use `Read`, `Grep`, `Glob` tools to gather context
- ✅ Analyze current state and plan next steps
- ✅ Delegate ALL work via Task tool (including documentation updates)
- ✅ Validate completed work (hybrid approach - see Rule 2)
- ✅ Report to user with summaries

---

### Rule 2: Mary Validates, Doesn't Implement (Hybrid Approach)

**Mary's role: Coordinator & Validator (with escalation criteria)**

**Mary reviews directly using Read/Grep/Glob for:**

- ✅ **Mechanical checks:**
  - Files created in correct locations
  - File naming follows conventions
  - All expected deliverables present
  - No unexpected files created

- ✅ **Standard compliance (obvious):**
  - Code follows AGENTS.md patterns (visible in file structure)
  - Uses tokens, not hardcoded values
  - TypeScript types properly defined (basic check)
  - Exports added where expected

- ✅ **Test results:**
  - Tests passing according to subagent report
  - Test coverage adequate (based on count)
  - No errors reported by subagent

- ✅ **Documentation completeness:**
  - Code comments for complex logic
  - JSDoc for public APIs
  - README/guides updated if needed

**Mary escalates to expert subagent review when:**

- 🔴 **First implementation of new pattern** (e.g., first component with utilities system)
- 🔴 **Complex architectural patterns** (e.g., polymorphic components, advanced TypeScript generics)
- 🔴 **Performance-critical code** (e.g., rendering optimization, large data handling)
- 🔴 **Multi-component changes** (affects existing components)
- 🔴 **Mary identifies potential issue** but lacks expertise to confirm
- 🔴 **Security-sensitive code** (authentication, validation, sanitization)

**Mary always delegates documentation updates:**

- 📋 MASTER-STATUS.md updates
- 📋 Roadmap file updates
- 📋 Phase completion summaries
- 📋 README.md or navigation doc updates

**Validation workflow:**

```
Subagent implements → Subagent reports
    ↓
Mary reviews (Read/Grep/Glob)
    ↓
Simple validation? ✅ → Mary validates → Delegate doc updates
    ↓
Complex/Critical? 🔴 → Mary delegates expert review → Fix if needed → Delegate doc updates
```

**If validation fails:**

1. Document specific issues clearly
2. Delegate fix to original subagent (or different subagent if needed)
3. Re-validate after fix (apply same criteria)
4. Never implement the fix yourself

---

### Rule 3: Update Documentation After Completion

**After subagent reports success:**

1. ✅ **Validate deliverables** (use Read/Grep to verify)
2. ✅ **Delegate documentation updates via Task tool:**
   - Update MASTER-STATUS.md (change "Last Updated" date, progress %, move items)
   - Update roadmap files if applicable
   - Create phase completion summaries (if phase done)
   - Update README.md or navigation docs if needed
3. ✅ **Verify documentation updates** (read updated files)
4. ✅ **Report to user** with summary of changes

**CRITICAL:** Mary does NOT update documentation files directly. She delegates these updates to a subagent using the Task tool, just like any other file modification.

---

### Rule 4: Subagent Status Protocol

**Subagents MUST report back with this format:**

```markdown
## Status: [SUCCESS | BLOCKED | QUESTIONS]

### Deliverables

- [x] File 1: path/to/file.ts
- [x] File 2: path/to/file.test.ts
- [ ] File 3: path/to/file.md (blocked - see below)

### Test Results

- [x] All tests passing (15/15)
- [x] Linting passed
- [x] Build successful

### Issues/Blockers

- Issue 1: [Description and impact]
- Issue 2: [Description and impact]

### Questions for User (if any)

1. **[Topic]:** [Question]
   - Context: [Why this matters]
   - Impact: [What's blocked]
```

**Mary's responsibility:** Extract questions and present to user in organized format (see Rule 5).

---

### Rule 5: Question Aggregation Through Mary

**When subagent has questions:**

1. **Subagent reports questions** in status format (Rule 4)
2. **Mary collects questions** from subagent's report
3. **Mary organizes questions** by priority
4. **Mary presents to user** in this format:

```markdown
## 🙋 Questions from Subagent - [Task Name]

### High Priority (Blockers)

1. **[Topic]:** [Question]
   - Context: [Why this matters]
   - Impact: [What's blocked without answer]
   - Recommendation: [If Mary has suggestion]

### Medium Priority (Clarifications)

2. **[Topic]:** [Question]
   - Context: [Background information]
   - Impact: [Effect on work quality/timeline]
   - Alternatives: [If multiple approaches exist]

### Low Priority (Nice-to-have)

3. **[Topic]:** [Question]
   - Context: [Context]
   - Impact: [Minor impact, can proceed without]
   - Default Action: [What subagent will do if no answer]
```

5. **User answers**
6. **Mary forwards answers** to subagent to continue work

**Why this matters:** User gets organized, prioritized questions instead of being interrupted frequently.

---

## 🧭 B) Navigation Rules (3-Step Process)

### Step 1: Always Start with MASTER-STATUS.md

**First action when resuming work or starting new task:**

```bash
Read: _bmad-output/analysis/[project-name]/MASTER-STATUS.md

# Extract from MASTER-STATUS:
- Current phase (Phase N - Name)
- Last updated date (check if stale)
- "What's Next" section (immediate actions)
- "Immediate Next Actions" section (specific tasks)
- Any blockers or questions documented
- Overall status (🟢 On Track | 🟡 At Risk | 🔴 Blocked)
```

**Why:** MASTER-STATUS.md is the single source of truth. Everything else branches from here.

**What to look for:**

- Is "Last Updated" recent? (If >7 days old, status may be stale)
- What's the current phase status? (In Progress, Blocked, Complete)
- What are the immediate next actions? (3-5 specific items)
- Are there any documented blockers? (Check "Known Issues/Risks")

---

### Step 2: Understand Project Structure

**Read the navigation guide:**

```bash
Read: _bmad-output/analysis/[project-name]/README.md

# Extract from README:
- Project description and goals
- Directory structure overview
- "How to Find Information" table
- Quick start scenarios
- Links to key documents
```

**Scan directory structure:**

```bash
Glob: _bmad-output/analysis/[project-name]/*
Glob: _bmad-output/analysis/[project-name]/*/*

# Check which directories exist:
- archive/ (completed work)
- current/ (active work)
- summaries/ (phase completions)
- studies/ (detailed analysis)
```

**Why:** Understand where things are and where you'll need to put new files.

---

### Step 3: Context Gathering (As Needed)

**If you need phase details:**

```bash
# Read most recent phase completion summary
Read: summaries/phase-N-completion-summary.md

# Extract:
- What was accomplished
- Key decisions made
- Blockers that were resolved
- Next phase transition notes
```

**If you need deep analysis:**

```bash
# Read relevant study document
Read: studies/[relevant-study].md

# Extract:
- Analysis findings
- Proposals and alternatives
- Decision rationale
- Technical details
```

**If you need to understand history:**

```bash
# Read archive index
Read: archive/README.md

# Then read specific archived content if needed
Read: archive/[category]/[specific-file].md
```

**Why:** Build context incrementally. Don't read everything upfront—read what you need for the current task.

---

## 📂 C) File Placement Decision Tree

### Where to Put New Files

**Decision tree for AI agents:**

```
Creating a new file?
│
├─ Is it MASTER-STATUS.md or project README.md?
│   └─ Put at: [project-root]/
│
├─ Is it a phase completion summary?
│   └─ Put at: summaries/phase-N-completion-summary.md
│   └─ Naming: phase-N-completion-summary.md (or phase-N-complete-summary.md)
│
├─ Is it active work in progress?
│   └─ Put at: current/phase-N-work-in-progress.md
│   └─ Can also use: current/analysis-[topic]-YYYY-MM-DD.md
│
├─ Is it detailed analysis, review, or proposal?
│   ├─ Analysis → studies/analysis-[topic].md
│   ├─ Verification → studies/conformity-review-[topic].md
│   ├─ Proposal → studies/proposition-[topic].md
│   ├─ Blocker → studies/phase-N-blocker-[issue].md
│   ├─ Planning → studies/phase-N-preparation-plan.md
│   └─ Maintenance → studies/MAINTENANCE-SYSTEM.md (or similar)
│
├─ Is it completed/deprecated work?
│   ├─ Old phase docs → archive/phase-N/
│   ├─ Completed POCs → archive/pocs/
│   ├─ Work sessions → archive/sessions/
│   ├─ Deprecated tools → archive/tools/
│   ├─ Old migrations → archive/v1-migration/
│   └─ Old source code → archive/[name]-source-v1/
│
└─ Is it initial planning/brainstorming?
    └─ Put at: [project-root]/brainstorming-session-YYYY-MM-DD.md
    └─ Or: [project-root]/planning-[topic].md
```

**Default rule:** When in doubt, put in `current/` first. You can move it later when purpose becomes clear.

### File Naming Patterns

| File Type                 | Pattern                           | Example                                |
| ------------------------- | --------------------------------- | -------------------------------------- |
| **Master Status**         | `MASTER-STATUS.md`                | `MASTER-STATUS.md` (always UPPERCASE)  |
| **Phase Summaries**       | `phase-N-{descriptor}.md`         | `phase-3-completion-summary.md`        |
| **Work in Progress**      | `phase-N-work-in-progress.md`     | `phase-5-work-in-progress.md`          |
| **Analysis (dated)**      | `analysis-{topic}-{date}.md`      | `analysis-performance-2026-01-22.md`   |
| **Studies**               | `{type}-{descriptor}.md`          | `conformity-review-tokens.md`          |
| **Proposals**             | `proposition-{topic}.md`          | `proposition-cleanup-aliases.md`       |
| **Blockers**              | `phase-N-blocker-{issue}.md`      | `phase-4-blocker-missing-tokens.md`    |
| **Brainstorming**         | `brainstorming-session-{date}.md` | `brainstorming-session-2026-01-22.md`  |
| **Sessions (archived)**   | `{date}-session-{topic}.md`       | `2026-01-23-reorganization-session.md` |
| **Maintenance/Checklist** | `UPPERCASE-{descriptor}.md`       | `CHECKLIST-update-documentation.md`    |

**Principles:**

1. **UPPERCASE for visibility** - Master documents and checklists
2. **kebab-case for multi-word** - `phase-completion-summary.md`
3. **Dates in ISO format** - `YYYY-MM-DD` (sortable)
4. **Descriptive, not cryptic** - `conformity-review.md` not `cr.md`
5. **Consistent prefixes** - `phase-N-`, `analysis-`, `proposition-`

---

## 📝 D) When to Update MASTER-STATUS.md

### Update Triggers

✅ **Update MASTER-STATUS.md after:**

- ✅ Completing a phase (major update with status change)
- ✅ Completing a major milestone within a phase
- ✅ Resolving a blocker
- ✅ Making a key decision
- ✅ Adding/removing phases from roadmap
- ✅ Significant progress (>10% phase progress)
- ✅ Daily/session end if meaningful work done

❌ **Don't update MASTER-STATUS for:**

- ❌ Minor edits to other documents
- ❌ Typo fixes in documentation
- ❌ Formatting changes
- ❌ Adding study documents (unless they represent completed work or change status)
- ❌ Reading/exploration activities

### What to Update

**Minimum updates (every time):**

1. **Header "Last Updated"** - Change to today's date (`YYYY-MM-DD`)
2. **Current phase section** - Update progress or status

**When phase changes:**

3. **Phase Status Overview table** - Update status icons (✅⏳📋)
4. **Executive Summary** - Update progress bar and percentages
5. **What's Next** - Update immediate actions (3-5 items)

**When phase completes:**

6. **Phase section** - Mark as "✅ COMPLETE", add completion date
7. **Documentation link** - Add link to phase completion summary
8. **Archive old sections** - Move detailed work to archive/ if needed
9. **New phase section** - Add or update next phase details

---

## 🔗 E) Referencing Archived Work

### Pattern for MASTER-STATUS.md

**How to reference archived work without cluttering status:**

```markdown
## Phase 0: Critical Pre-Implementation Actions

**Status:** ✅ COMPLETE
**Completion Date:** 2026-01-22
**Duration:** 3 days
**Documentation:** `summaries/phase-0-complete-summary.md`

### Key Achievements

- ✅ Architecture validated via POC (see `archive/pocs/performance-results.md`)
- ✅ Automation tools deployed (93% time reduction)
- ✅ Scope defined and documented

**For intermediate summaries and detailed POC files:**
See `archive/phase-0/` and `archive/pocs/`

**For historical work sessions:**
See `archive/sessions/2026-01-22-architecture-validation.md`
```

**Why this pattern works:**

- ✅ Gives enough context that readers know archived work exists
- ✅ Provides links to most important archived items
- ✅ Doesn't clutter main status with old details
- ✅ Makes it easy to find historical context when needed

### Cross-Referencing Pattern

**Use relative paths (never absolute):**

✅ **Good - Relative paths:**

```markdown
See [Phase 2 Summary](../summaries/phase-2-completion-summary.md)
See [Archive README](../archive/README.md)
See [Project README](../README.md)
See [Token Verification](../studies/tokens-verification.md)
```

❌ **Bad - Absolute paths:**

```markdown
See [Phase 2](/Users/you/project/_bmad-output/analysis/project/summaries/...)
See [Archive](/home/user/workspace/Lufa/_bmad-output/analysis/project/archive/)
```

**Why:** Relative paths work on any machine, in any clone of the repo.

---

## 🚀 F) Delegation Rules (Mary Coordinator Pattern)

### Rule 1: Mandatory Delegation (Detailed)

**Mary's workflow for ANY implementation task:**

1. **Receive request** from user or identify next task from MASTER-STATUS.md
2. **Gather context** using Read/Grep/Glob (never guess)
3. **Create implementation plan** (see template below)
4. **Delegate via Task tool** (see delegation template below)
5. **Wait for subagent report** (never proceed without confirmation)
6. **Validate deliverables** (use Read/Grep to check)
7. **Update documentation** (MASTER-STATUS.md)
8. **Report to user** (summary of what was accomplished)

**Implementation Plan Template:**

```markdown
## Implementation Plan - [Task Name]

### Objectives

[What needs to be accomplished - high level]

### Tasks

1. **Task 1:** [Description]
   - Subagent type: [code | test | docs | validation]
   - Inputs needed: [Files/context to read]
   - Expected outputs: [Specific deliverables]
   - Estimated time: [If known]

2. **Task 2:** [Description]
   [Same structure]

### Dependencies

- Task 2 depends on Task 1 completion
- Task 3 can run parallel to Task 2

### Questions for User

[Any clarifications needed before starting]
```

---

### Rule 2: Validation, Not Implementation (Detailed)

**Mary's hybrid validation process:**

```markdown
## Validation Checklist for [Task Name]

### Phase 1: Mechanical Verification (Mary does directly with Read/Grep)

- [ ] All expected files created
- [ ] Files in correct directories (check decision tree)
- [ ] File naming follows conventions
- [ ] No unexpected files created
- [ ] Exports added to index files

### Phase 2: Standard Compliance Check (Mary does directly with Read)

- [ ] Code follows AGENTS.md standards (visible patterns)
- [ ] Uses tokens, not hardcoded values (search for hex colors, px units)
- [ ] TypeScript types defined (check interfaces exist)
- [ ] React patterns match project style (forwardRef, displayName, etc.)

### Phase 3: Test Verification (Mary does directly from report)

- [ ] Tests included for new functionality
- [ ] Tests passing (check subagent report)
- [ ] Test coverage adequate (count of test cases)
- [ ] No errors in test output

### Phase 4: Documentation Check (Mary does directly with Read)

- [ ] Code comments for complex logic
- [ ] JSDoc for public APIs
- [ ] README/guide updated if needed
- [ ] Changeset created (if user-facing change)

### Phase 5: Escalation Decision (Mary decides)

**Escalate to expert review if ANY of these:**

- [ ] First implementation of new pattern
- [ ] Complex architectural patterns (polymorphic, advanced generics)
- [ ] Performance-critical code
- [ ] Multi-component changes
- [ ] Mary identified potential issue but unsure
- [ ] Security-sensitive code

**If escalation needed:**

1. Document what needs expert review
2. Delegate to expert subagent with specific review scope
3. Wait for expert report
4. Proceed based on expert findings

**If no escalation needed:**

1. Mark validation as complete
2. Proceed to documentation updates (delegate via Task)
```

**If ANY checkbox fails in Phases 1-4:**

1. Document the specific issue
2. Create fix task with clear requirements
3. Delegate fix to subagent
4. Re-validate with checklist

**Never:**

- ❌ Fix issues yourself using Edit/Write
- ❌ Assume "it's probably fine"
- ❌ Skip validation steps to save time
- ❌ Skip escalation when criteria met

---

### Rule 3: Documentation Updates (Detailed)

**After successful validation, Mary updates docs:**

**1. Update MASTER-STATUS.md:**

```markdown
# Changes to make:

## Header

- Last Updated: 2026-01-24 (today's date)

## Executive Summary - Current Progress

- Update progress percentage (if phase progress changed)
- Update progress bar visualization
- Update "What's Next" (remove completed, add new)

## Phase N Section (Current Phase)

### Progress

- [x] Completed task (move from ⏳ to ✅)
- ⏳ Next task (add if new)

### Deliverables

- ✅ Deliverable 1: [Mark complete]

## Immediate Next Actions

1. [Update with next 3-5 concrete actions]
```

**2. Create phase completion summary (if phase done):**

- Filename: `summaries/phase-N-completion-summary.md`
- Use template structure (see Section G)
- Include all achievements, decisions, lessons learned

**3. Move files from current/ (if applicable):**

- Phase complete → Move WIP docs to archive/phase-N/
- Analysis finalized → Move to studies/
- Deprecated content → Move to archive/[category]/

**4. Update cross-references:**

- Add link from MASTER-STATUS to new summary
- Update README.md if new major deliverable
- Update archive/README.md if archiving files

---

### Rule 4: Question Workflow (Detailed)

**Detailed question aggregation process:**

**Step 1: Subagent reports questions** (in their status report)

**Step 2: Mary extracts and categorizes**

```markdown
## Question Analysis - Internal (Mary's notes)

### Questions from Subagent Report:

1. Original question text
2. Original question text

### Categorization:

- High Priority: Questions 1 (blocks progress)
- Medium Priority: Questions 2 (affects quality)
- Low Priority: None

### Context to Add:

- Question 1: User needs to know X because Y
- Question 2: This affects Z decision from Phase N
```

**Step 3: Mary formats for user**

```markdown
## 🙋 Questions from Subagent - [Implementing Box Component]

### High Priority (Blockers)

1. **System Props API:** Should we use styled-system convention or custom API?
   - Context: Box component needs responsive spacing/sizing props
   - Impact: HIGH - Affects all 7 components in Phase 5A
   - Technical: styled-system uses `sx` prop, custom would be individual props
   - Recommendation: styled-system for consistency with industry
   - Blocks: Cannot proceed with Box implementation without decision

### Medium Priority (Clarifications)

2. **TypeScript Generics:** Should Box accept `as` prop for polymorphic behavior?
   - Context: Box could render as `div`, `section`, `article`, etc.
   - Impact: MEDIUM - Affects TypeScript complexity and bundle size
   - Alternatives:
     - Option A: Polymorphic with `as` prop (more flexible, complex types)
     - Option B: Fixed `div` element (simpler, less flexible)
   - Can Proceed: Yes, will use Option B as default if no answer
   - Time Impact: +2 hours for Option A

### Low Priority (Nice-to-have)

3. **Test Approach:** Playwright component tests or Vitest unit tests?
   - Context: Both are available in project
   - Impact: LOW - Can standardize later
   - Current Approach: Using Playwright (matches existing patterns)
   - Can Proceed: Yes, continuing with Playwright
```

**Step 4: User answers**

**Step 5: Mary forwards to subagent**

```markdown
## Answers from User - [Implementing Box Component]

**1. System Props API:**
Decision: Use styled-system convention with `sx` prop
Rationale: [User's explanation]
Action: Proceed with styled-system implementation

**2. TypeScript Generics:**
Decision: Option A - Polymorphic with `as` prop
Rationale: [User's explanation]
Note: User accepts +2 hour time impact

**3. Test Approach:**
Decision: Approved - Continue with Playwright
Rationale: Maintains consistency

---

You may proceed with implementation. Report back with updated status.
```

**Why this process matters:**

- ✅ User gets organized questions, not scattered interruptions
- ✅ User has context to make informed decisions
- ✅ Subagent gets clear answers to proceed
- ✅ Decisions are documented for future reference

---

## ✅ G) Quick Reference

### Starting Work Checklist

**When you first activate or resume work:**

- [ ] Read MASTER-STATUS.md (Step 1)
- [ ] Note current phase and status
- [ ] Read "What's Next" section
- [ ] Read "Immediate Next Actions" section
- [ ] Check "Known Issues/Risks" for blockers
- [ ] Read README.md for navigation (Step 2)
- [ ] Scan directory structure (Glob)
- [ ] Read recent phase summary if phase just completed (Step 3)
- [ ] Understand what was last accomplished
- [ ] Identify immediate next task
- [ ] Gather context (read relevant studies if needed)
- [ ] Create implementation plan
- [ ] Ask user questions if any unknowns

**Time estimate:** 5-10 minutes for context gathering

---

### Completing Phase Checklist

**When a phase is 100% complete:**

- [ ] **Create phase completion summary:**
  - [ ] Filename: `summaries/phase-N-completion-summary.md`
  - [ ] Use template structure (see below)
  - [ ] Document all objectives and deliverables
  - [ ] Include key decisions made
  - [ ] Add lessons learned
  - [ ] Link to related studies
  - [ ] Add "Next Steps" pointing to next phase

- [ ] **Update MASTER-STATUS.md:**
  - [ ] Change "Last Updated" to today
  - [ ] Update Phase Status Overview table (✅ COMPLETE)
  - [ ] Update executive summary progress bar
  - [ ] Mark phase section as ✅ COMPLETE
  - [ ] Add link to phase completion summary
  - [ ] Update "What's Next" with next phase actions
  - [ ] Update current phase indicator

- [ ] **Move intermediate docs:**
  - [ ] Move current/phase-N-\* to archive/phase-N/
  - [ ] Update archive/phase-N/README.md
  - [ ] Explain what was archived and why

- [ ] **Update roadmap (if applicable):**
  - [ ] Mark phase as complete
  - [ ] Update timeline/dates
  - [ ] Adjust future phases if needed

- [ ] **Verify links:**
  - [ ] All links in MASTER-STATUS work
  - [ ] All links in phase summary work
  - [ ] Cross-references are bidirectional

- [ ] **Report to user:**
  - [ ] Summary of phase accomplishments
  - [ ] Link to phase completion summary
  - [ ] Next phase overview
  - [ ] Any questions for next phase

---

### Creating New Files Rules

**Before creating a file:**

1. **Check if it already exists** (use Grep/Glob)
2. **Determine file type** (summary, study, WIP, archive)
3. **Use decision tree** (Section C) to find correct location
4. **Follow naming conventions** (Section C)
5. **Create the file** (delegate to subagent if implementation)
6. **Link from MASTER-STATUS** (if important reference)
7. **Update directory README** (if first file in directory)

**Common mistakes to avoid:**

- ❌ Creating duplicate files in multiple locations
- ❌ Using absolute paths in links
- ❌ Putting files at root when they belong in subdirectories
- ❌ Using cryptic filenames
- ❌ Forgetting to update MASTER-STATUS with links

---

### Cross-Referencing Rules

**Linking pattern:**

```markdown
## From MASTER-STATUS.md to other docs:

### Phase Documentation

- **Phase 0:** `summaries/phase-0-complete-summary.md`
- **Phase 1:** `summaries/phase-1-completion-summary.md`

### Technical Documentation

- **Token Verification:** `studies/tokens-verification.md`
- **Architecture POC:** `archive/pocs/performance-results.md`

---

## From phase summary to other docs:

## 🔗 References

**Related Phases:**

- Previous: [Phase 1 Summary](./phase-1-completion-summary.md)
- Next: [Phase 3 Summary](./phase-3-completion-summary.md)

**Detailed Analysis:**

- [Conformity Review](../studies/conformity-review.md)

**Project Status:**

- [MASTER-STATUS.md](../MASTER-STATUS.md)

---

## From study to phase summary:

## Context

This verification was conducted after Phase 3 completion.

**Phase 3 Summary:** [phase-3-completion-summary.md](../summaries/phase-3-completion-summary.md)
```

**Rules:**

- ✅ Always use relative paths
- ✅ Link from MASTER-STATUS to all important docs
- ✅ Create bidirectional links (summary ↔ study)
- ✅ Update links when moving files
- ✅ Test links work (preview in markdown viewer)

---

## 🛠️ H) Tool Usage for AI Agents

### When to Use Read

**Use Read tool for:**

- ✅ Reading MASTER-STATUS.md (always first step)
- ✅ Reading README.md and navigation docs
- ✅ Reading phase summaries and studies
- ✅ Validating deliverables from subagents
- ✅ Checking file contents before updating
- ✅ Understanding existing code patterns

**Examples:**

```bash
# Start of session
Read: _bmad-output/analysis/[project]/MASTER-STATUS.md

# Validate subagent deliverable
Read: packages/design-system/main/src/components/Box.tsx

# Check existing pattern
Read: packages/design-system/main/src/components/Button.tsx
```

---

### When to Use Grep

**Use Grep tool for:**

- ✅ Finding files containing specific content
- ✅ Checking for TODOs or questions
- ✅ Verifying consistent patterns across files
- ✅ Finding examples of similar implementations
- ✅ Checking if a feature already exists

**Examples:**

```bash
# Find TODOs in current work
Grep: "TODO" path:_bmad-output/analysis/[project]/current/

# Check for existing token usage
Grep: "lufa-spacing" include:"*.tsx"

# Find similar component patterns
Grep: "ComponentPropsWithoutRef" path:packages/design-system/main/
```

---

### When to Use Glob

**Use Glob tool for:**

- ✅ Scanning project directory structure
- ✅ Finding all files of a certain type
- ✅ Discovering existing summaries or studies
- ✅ Checking what's in archive
- ✅ Verifying file organization

**Examples:**

```bash
# Scan project structure
Glob: _bmad-output/analysis/[project]/*
Glob: _bmad-output/analysis/[project]/*/*

# Find all phase summaries
Glob: _bmad-output/analysis/[project]/summaries/*.md

# Check archive contents
Glob: _bmad-output/analysis/[project]/archive/**/*.md
```

---

### When to Use Task (Delegation)

**Use Task tool for:**

- ✅ ANY implementation work (code, config, tests)
- ✅ File creation/editing (production code)
- ✅ Running builds or scripts
- ✅ Git operations (commit, branch)
- ✅ Complex validation requiring tool execution

**Delegation template:**

```markdown
Task: [Concise title - max 60 chars]

Context:

- Current phase: Phase N - [Name]
- Goal: [What to accomplish]
- Related docs: [Paths to read for context]
- Standards: See AGENTS.md sections X, Y
- Example: [Path to similar existing code if relevant]

Instructions:

1. [Step 1 - specific and actionable]
2. [Step 2 - include file paths]
3. [Step 3 - include verification steps]

Expected Deliverables:

- [ ] File 1: path/to/file.tsx (React component)
- [ ] File 2: path/to/file.spec.tsx (Playwright tests)
- [ ] File 3: path/to/file.stories.tsx (Storybook story)
- [ ] Documentation: Update README.md with usage

Standards to Follow:

- Design system: Use tokens only (no hardcoded values)
- TypeScript: Strict mode, proper types
- Testing: Playwright component tests required
- Accessibility: WCAG 2.1 AA compliance

Questions to Ask User (if blockers arise):

- [Template for what info you need]
- Format using priority structure (High/Medium/Low)

Report Back Format:

- Status: [SUCCESS | BLOCKED | QUESTIONS]
- Deliverables: [Checkboxes]
- Test Results: [Pass/fail with details]
- Issues/Blockers: [If any]
- Questions: [Using priority format]
```

---

### When NOT to Use Edit/Write/Bash (Mary's Restrictions)

**Mary does NOT use these tools for ANY file modifications:**

- ❌ Writing production code
- ❌ Editing component files
- ❌ Creating configuration files
- ❌ Running build commands
- ❌ Executing tests
- ❌ Making git commits
- ❌ **Updating MASTER-STATUS.md** (delegate via Task)
- ❌ **Creating phase completion summaries** (delegate via Task)
- ❌ **Creating study documents** (delegate via Task)
- ❌ **Updating README.md or navigation docs** (delegate via Task)
- ❌ **Updating AI-AGENT-RULES.md or any analysis docs** (delegate via Task)

**Mary's ONLY allowed file operations:**

- ✅ **NONE** - Mary delegates ALL file modifications via Task tool

**What Mary CAN do (Read-only operations):**

- ✅ Use Read tool to validate deliverables
- ✅ Use Grep tool to search for patterns
- ✅ Use Glob tool to scan directories
- ✅ Analyze content and make validation decisions
- ✅ Decide when to escalate to expert review

**Why this strict separation:**

- Maintains clear separation: Mary coordinates, subagents implement
- Ensures validation happens (subagents report status)
- Prevents Mary from bypassing her own validation process
- Keeps delegation pattern consistent across ALL work
- **Forces Mary to be a pure coordinator, never an implementer**
- Prevents accidental file corruption (learned from experience!)

---

## ⚠️ I) Common AI Agent Mistakes

### Mistake 1: Skipping MASTER-STATUS.md

❌ **Don't:**

```
Agent activates → Starts implementing immediately
```

✅ **Do:**

```
Agent activates → Reads MASTER-STATUS.md → Understands current state → Plans → Executes
```

**Why it matters:** You might implement something already done, work on wrong phase, or miss critical context.

---

### Mistake 2: Files in Wrong Directories

❌ **Don't:**

```
Creates phase-3-completion-summary.md in current/
Creates analysis-tokens.md at project root
Creates work-in-progress notes in studies/
```

✅ **Do:**

```
Phase completions → summaries/
Analysis/reviews → studies/
Active work → current/
Important status → root (MASTER-STATUS, README)
```

**Use the decision tree** in Section C before creating any file.

---

### Mistake 3: Implementing as Mary

❌ **Don't:**

```
User: "Add Box component"
Mary: [Uses Edit/Write to create component directly]
```

✅ **Do:**

```
User: "Add Box component"
Mary: [Reads context] → [Creates plan] → [Delegates via Task] → [Validates] → [Updates docs]
```

**Remember:** Mary coordinates and validates, never implements.

---

### Mistake 4: Making Assumptions

❌ **Don't:**

```
Subagent: "Should Box support polymorphic 'as' prop?"
Mary: [Assumes yes and tells subagent to proceed]
```

✅ **Do:**

```
Subagent: "Should Box support polymorphic 'as' prop?"
Mary: [Collects question] → [Adds context] → [Asks user] → [Forwards answer]
```

**Never guess on requirements or architectural decisions.**

---

### Mistake 5: Stale MASTER-STATUS.md

❌ **Don't:**

```
[Completes 3 tasks over 2 days]
[Never updates MASTER-STATUS.md]
[User asks for status → Can't tell what's done]
```

✅ **Do:**

```
[Completes Task 1] → [Updates MASTER-STATUS] → [Reports]
[Completes Task 2] → [Updates MASTER-STATUS] → [Reports]
[Completes Task 3] → [Updates MASTER-STATUS] → [Reports]
```

**Update MASTER-STATUS after every meaningful work completion.**

---

### Mistake 6: Weak Validation

❌ **Don't:**

```
Subagent: "Status: SUCCESS. Box component created."
Mary: "Great! Moving to next task."
[Never verified files exist, tests pass, or code quality]
```

✅ **Do:**

```
Subagent: "Status: SUCCESS. Box component created."
Mary: [Reads Box.tsx] → [Reads Box.spec.tsx] → [Checks naming]
Mary: [Verifies test results in report] → [Validates]
Mary: "Validated. Updating MASTER-STATUS."
```

**Always validate deliverables. Read the files. Check the details.**

---

### Mistake 7: Poor Delegation Instructions

❌ **Don't:**

```
Task: "Make Box component"
Instructions: "Create a Box component with system props"
```

✅ **Do:**

```
Task: "Implement Box component with styled-system API"

Context:
- Phase: 5A - React Components (4/7 complete)
- Goal: Create Box primitive for layout
- Standards: AGENTS.md Section "Design System Component Pattern"
- Example: packages/design-system/main/src/components/Button.tsx

Instructions:
1. Read existing Button.tsx for component pattern
2. Create Box.tsx in packages/design-system/main/src/components/
3. Implement styled-system props (margin, padding, width, height, color, bg)
4. Add TypeScript types with ComponentPropsWithoutRef<'div'>
5. Create Box.spec.tsx with Playwright component tests
6. Create Box.stories.tsx for Storybook
7. Export from src/index.ts

Expected Deliverables:
- [ ] Box.tsx (~100 lines, with JSDoc)
- [ ] Box.spec.tsx (~150 lines, 8+ test cases)
- [ ] Box.stories.tsx (~80 lines, 5 stories)
- [ ] Export added to src/index.ts

Standards:
- Use tokens only (color.bg.*, spacing.*, etc.)
- TypeScript strict mode
- Set displayName = 'Box'
- WCAG 2.1 AA compliance
- Playwright component tests required

Report back with status using Rule 4 format.
```

**Why it matters:** Clear instructions = successful execution. Vague instructions = questions and delays.

---

### Mistake 8: Forgetting Cross-References

❌ **Don't:**

```
[Creates phase-3-completion-summary.md]
[Never links from MASTER-STATUS.md]
[Never links to related studies]
[Document becomes orphaned]
```

✅ **Do:**

```
[Creates phase-3-completion-summary.md]
[Updates MASTER-STATUS.md with link]
[Adds cross-references to related studies]
[Adds back-link from study to summary]
```

**Every important document should be linked from MASTER-STATUS.**

---

## 📚 J) Real Example Reference

### Working Example: design-system-new-architecture

**Project location:** `_bmad-output/analysis/design-system-new-architecture/`

**What to study:**

1. **MASTER-STATUS.md** (782 lines)
   - Perfect example of comprehensive status tracking
   - Executive summary with progress bars
   - Phase-by-phase detailed sections
   - Metrics, risks, FAQs, immediate next actions
   - Study this for MASTER-STATUS structure

2. **README.md** (387 lines)
   - Navigation guide organized by use case
   - "How to find information" table
   - Quick start scenarios for different roles
   - Study this for README structure

3. **summaries/** directory
   - 6 phase completion summaries (Phase 0 through Phase 5 Prep)
   - Each follows consistent template
   - Links to related studies and next phases
   - Study these for phase summary structure

4. **studies/** directory
   - Mix of analysis, reviews, proposals, maintenance docs
   - conformity-review-\*.md - Verification documents
   - proposition-\*.md - Proposals and ideas
   - phase-\*-blocker-\*.md - Blocker analysis
   - Study these for study document structure

5. **archive/** directory with README.md
   - Well-organized subdirectories (pocs/, phase-0/, sessions/, tools/, etc.)
   - Each subdirectory has README explaining contents
   - Clear archive policy documented
   - Study this for archive organization

**Key patterns to copy:**

- ✅ MASTER-STATUS as central hub with links to everything
- ✅ Clear phase boundaries with completion summaries
- ✅ Aggressive archiving (root stays clean)
- ✅ Subdirectory READMEs explaining contents
- ✅ Consistent naming (phase-N-\* pattern)
- ✅ Bidirectional cross-references
- ✅ Studies vs summaries separation

**When in doubt, copy this project's patterns.**

---

## 🎯 K) Phase Completion Summary Template

**Use this template when creating phase completion summaries:**

```markdown
# Phase N: [Phase Name] - Completion Summary

**Status:** ✅ COMPLETE (100%)
**Completion Date:** YYYY-MM-DD
**Duration:** [Actual duration, e.g., "3 days" or "1 week"]
**[Relevant Metrics]:** [e.g., "Tokens Created: 103" or "Components Implemented: 4"]

---

## 🎯 Objectives

[What was this phase supposed to accomplish? 2-3 sentences]

- Primary goal 1
- Primary goal 2
- Primary goal 3

---

## 📦 Deliverables

[What was actually delivered?]

- ✅ **Deliverable 1:** [Description with path or link]
- ✅ **Deliverable 2:** [Description with path or link]
- ✅ **Deliverable 3:** [Description with path or link]

---

## 📊 Results

[Detailed results with metrics, examples, links]

### [Category 1 - e.g., "Token Creation"]

[Specific results]

### [Category 2 - e.g., "Architecture Validation"]

[Specific results]

### [Category 3 - e.g., "Documentation"]

[Specific results]

---

## 🔧 Technical Details

[How was it built? Tools used? Patterns followed?]

**Technologies:**

- Tool 1
- Tool 2

**Patterns:**

- Pattern 1 description
- Pattern 2 description

**Key Files:**

- `path/to/important/file1.ext`
- `path/to/important/file2.ext`

---

## 🚧 Issues Resolved

[Problems encountered and how they were solved]

### Issue 1: [Title]

**Problem:** [Description]
**Solution:** [How it was resolved]
**Outcome:** [Result]

### Issue 2: [Title]

[Same structure]

---

## 📚 Key Decisions

[Important decisions made during this phase]

### Decision 1: [Title]

**Context:** [Why decision was needed]
**Options Considered:**

- Option A: [Pros/cons]
- Option B: [Pros/cons]

**Decision:** [What was chosen]
**Rationale:** [Why]

### Decision 2: [Title]

[Same structure]

---

## 🎓 Lessons Learned

[What worked well? What could be improved?]

### What Worked Well ✅

- Success 1
- Success 2
- Success 3

### What Could Be Improved ⚠️

- Area 1 for improvement
- Area 2 for improvement

### What to Avoid Next Time ❌

- Pitfall 1
- Pitfall 2

---

## 🔗 References

[Links to code, documentation, related files]

**Related Phases:**

- Previous: [Phase N-1 Summary](./phase-N-1-completion-summary.md)
- Next: [Phase N+1 Planning](../studies/phase-N+1-preparation-plan.md)

**Detailed Analysis:**

- [Study 1](../studies/study-name.md)
- [Study 2](../studies/study-name.md)

**Code/Implementation:**

- `packages/[path]/` - [Description]
- `docs/[path]/` - [Description]

**Project Status:**

- [MASTER-STATUS.md](../MASTER-STATUS.md)

---

## ➡️ Next Steps

[What's the immediate next phase or action?]

### Immediate Actions (Next Phase)

1. Action 1 - [Description]
2. Action 2 - [Description]
3. Action 3 - [Description]

### Transition Notes

[Any context needed for next phase]

---

**Summary Created By:** [Mary | Human contributor name]
**Review Status:** [✅ Reviewed | ⏳ Draft]
```

---

## 🎓 L) Summary: Critical Patterns

### The 5 Most Important Things

1. **Always read MASTER-STATUS.md first** (3-step navigation)
2. **Mary delegates ALL implementation** (never implements directly)
3. **Update MASTER-STATUS after every completion** (single source of truth)
4. **Use file placement decision tree** (files in correct directories)
5. **Validate deliverables before accepting** (read files, check tests)

### When You're Unsure

1. **Check this file** (AI-AGENT-RULES.md) - Quick reference
2. **Check MASTER-STATUS.md** - Current project state
3. **Check PROJECT-ORGANIZATION-GUIDE.md** - Detailed explanations
4. **Check real example** (design-system-new-architecture/)
5. **Ask user** - Don't guess on requirements

### Red Flags (Stop and Check)

- 🚩 About to use Edit/Write/Bash for ANY file modification → **STOP! Delegate via Task tool instead**
- 🚩 About to update MASTER-STATUS.md directly → **STOP! Delegate to subagent instead**
- 🚩 About to create summary or study document → **STOP! Delegate to subagent instead**
- 🚩 About to create file and don't know where → Use decision tree, then delegate
- 🚩 About to assume a requirement → Ask user
- 🚩 MASTER-STATUS.md is >7 days old → Delegate update to subagent
- 🚩 Subagent has question and you want to answer → Ask user instead
- 🚩 Validating complex code and unsure → Escalate to expert review (don't guess)

**Remember:** Mary is a **PURE COORDINATOR WITH HYBRID VALIDATION**. She NEVER modifies files directly. She ALWAYS delegates via Task tool. She CAN validate directly for simple checks, but MUST escalate for complex/critical code.

---

**End of AI Agent Rules**

**Next Steps:**

1. Read MASTER-STATUS.md of the project you're working on
2. Follow the 3-step navigation process (Section B)
3. Use delegation pattern for all implementation (Section F)
4. Update documentation after every completion (Rule 3)

**Related Documentation:**

- [PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md) - Comprehensive guide (1754 lines)
- [README.md](README.md) - Analysis projects index and workflow
- [QUICK-START.md](QUICK-START.md) - 5-minute project setup
- [design-system-new-architecture/](design-system-new-architecture/) - Working example

---

**Document Maintained By:** Project contributors (via delegation to subagents)  
**Status:** 🟢 Active Reference Guide  
**Last Updated:** 2026-01-24  
**Version:** 1.1 - **BREAKING CHANGE: Mary now delegates ALL file modifications (including analysis docs) but uses hybrid validation approach**
