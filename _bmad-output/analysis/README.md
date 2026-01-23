# 📊 Analysis Projects Index

> **Purpose:** This directory contains structured analysis and planning documentation for complex, multi-phase projects in the Lufa monorepo. Each subdirectory represents a distinct analysis project with its own lifecycle, phases, and deliverables.

---

## 📘 Documentation Resources

### For Creating New Projects

**🚀 Start here:**

- **[QUICK-START.md](QUICK-START.md)** - ⚡ 5-minute quick reference for creating new projects
  - 3-step setup process
  - Verification checklist
  - Common questions answered
  - **Perfect for: Getting started fast**

**📚 Deep dive:**

- **[PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md)** - 📖 Comprehensive guide (1754 lines)
  - Complete directory structure templates
  - File naming conventions
  - Detailed workflow instructions
  - AI agent guidelines
  - Real-world example walkthroughs
  - Decision trees and checklists
  - **Perfect for: Understanding the system deeply**

**📦 Ready to use:**

- **[\_PROJECT-TEMPLATE/](_PROJECT-TEMPLATE/)** - 📦 Template directory to copy
  - All required files with placeholders
  - Pre-configured subdirectories (archive, current, summaries, studies)
  - Template README files for each subdirectory
  - **Perfect for: Starting your project immediately**

### Quick Start for New Project

```bash
# 1. Copy template
cp -r _bmad-output/analysis/_PROJECT-TEMPLATE _bmad-output/analysis/your-project-name

# 2. Fill in templates (replace {placeholders})
# Edit: MASTER-STATUS.md, README.md, and subdirectory READMEs

# 3. Add to this index (see "Active Projects" table below)

# 4. Start working!
```

**See [QUICK-START.md](QUICK-START.md) for 5-minute setup guide or [PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md) Section F for detailed instructions.**

---

## 🎯 Active Projects

| Project Name                      | Status               | Current Phase               | Last Updated | Entry Point        |
| --------------------------------- | -------------------- | --------------------------- | ------------ | ------------------ |
| `design-system-new-architecture/` | 🟢 Phase 5 Prep Done | Phase 5A - React Components | 2026-01-23   | `MASTER-STATUS.md` |

### Project Details

#### 🎨 Design System New Architecture (v2.0)

**Goal:** Rebuild design system with proper 4-layer token architecture (Primitives → Core → Semantic → Component)

**Progress:**

- ✅ 438 tokens created (100% architecture complete)
- ✅ DTCG format compliance: 100%
- ✅ Phases 0-5 Prep: Complete
- ⏳ Next: Phase 5A - React Component Implementation (7 components)

**Key Achievements:**

- Architecture validated via performance POC (8ms << 16ms threshold)
- Automation tools deployed (93% time reduction)
- Strict scope defined (anti-scope-creep strategy)

**Next Steps:**

1. Implement 4 core components: Box, Text, Stack, Icon
2. Implement 3 UI components: Button, Badge, Divider
3. Estimated duration: 1-2 weeks

---

## 🤖 Workflow Rules for AI Agents

### Critical Agent Coordination Protocol

#### 👤 Role Definition: Mary (Analyst Agent)

**Mary's Responsibilities:**

- **Coordinator & Validator** - Orchestrates work, validates deliverables
- **NOT an Implementer** - Does not write code or execute implementation tasks
- **Question Collector** - Aggregates questions from subagents and presents to user

#### 📋 Rule 1: Mandatory Delegation

**✅ ALL implementation tasks MUST be delegated to subagents using the Task tool**

This includes:

- Writing code (components, tokens, utilities)
- Creating/modifying configuration files
- Running builds or validation scripts
- File operations (create, edit, move, delete)
- Git operations (commit, branch management)
- Test writing and execution

**❌ Mary does NOT:**

- Use `Edit`, `Write`, `Bash` tools directly for implementation
- Write production code
- Execute build commands
- Commit changes

**✅ Mary DOES:**

- Use `Read`, `Grep`, `Glob` tools to gather context
- Analyze current state and plan next steps
- Delegate work via Task tool
- Validate completed work
- Update analysis documents (MASTER-STATUS.md, phase summaries)

#### 📋 Rule 2: Mary as Coordinator

**Workflow:**

```
User Request
    ↓
Mary reads current status (Read/Grep/Glob)
    ↓
Mary creates implementation plan
    ↓
Mary delegates to subagent(s) (Task tool)
    ↓
Subagent executes & reports back
    ↓
Mary validates deliverable
    ↓
Mary updates MASTER-STATUS.md
    ↓
Mary reports to user
```

**Example Delegation:**

```markdown
Task: "Implement Box component with system props"
Context: [Provide token paths, requirements, patterns]
Expected Output: [List specific files/deliverables]
Questions to Ask User: [If any unknowns exist]
```

#### 📋 Rule 3: Validation Only, Not Execution

**Mary's validation checklist:**

- ✅ Files created in correct locations
- ✅ Code follows project standards (from AGENTS.md)
- ✅ Tests included and passing
- ✅ Documentation updated
- ✅ No errors reported by subagent

**If validation fails:**

1. Document specific issues clearly
2. Delegate fix to subagent with precise instructions
3. Re-validate after fix

#### 📋 Rule 4: Subagent Status Protocol

**Subagents must report back with:**

```markdown
## Status: [SUCCESS | BLOCKED | QUESTIONS]

### Deliverables

- [x] File 1: path/to/file.ts
- [x] File 2: path/to/file.test.ts
- [ ] File 3: path/to/file.md (blocked - see below)

### Issues/Blockers

- Issue 1: [Description]
- Issue 2: [Description]

### Questions for User (if any)

1. Question about requirement X
2. Question about approach Y
```

#### 📋 Rule 5: Question Aggregation

**When subagent has questions:**

1. **Mary collects questions** from subagent's report
2. **Mary organizes questions** by priority/category
3. **Mary presents to user** in clear format:

```markdown
## 🙋 Questions from Subagent - [Task Name]

### High Priority (Blockers)

1. **Token naming:** Should on-hover use `on-hover` or `onHover` pattern?
   - Context: Affects 12 component tokens
   - Impact: High (consistency across system)

### Medium Priority (Clarifications)

2. **Variant scope:** Should Button support `ghost` variant in v2.0?
   - Context: Not in original scope doc
   - Impact: Medium (adds 1 day of work)

### Low Priority (Nice-to-have)

3. **Documentation style:** Prefer JSDoc or separate .md files?
   - Context: Component documentation approach
   - Impact: Low (can standardize later)
```

4. **User answers**
5. **Mary forwards answers** to subagent to continue work

---

## 📁 Project Structure Guidelines

### Required Structure for Each Project

```
project-name/
├── MASTER-STATUS.md           # 🔴 REQUIRED - Single source of truth
│   ├── Executive Summary
│   ├── Current Phase Status
│   ├── Next Steps
│   ├── Phase History
│   └── Links to detailed docs
│
├── phase-N-completion-summary.md   # One per completed phase
├── phase-N-session-notes.md        # Detailed work logs
├── decisions/                       # Architecture Decision Records (ADRs)
│   └── 001-token-architecture.md
├── archive/                         # 🗄️ Old phases/sessions
│   ├── phase-0/
│   └── phase-1/
└── deliverables/                    # Final outputs (optional)
    └── v2.0-scope.md
```

### Naming Conventions

- **Projects:** `kebab-case` (e.g., `design-system-new-architecture`)
- **Status files:** `MASTER-STATUS.md` (uppercase, required)
- **Phase docs:** `phase-N-[type]-[descriptor].md`
- **Decisions:** `NNN-short-title.md` (3-digit number)

### Content Guidelines

#### MASTER-STATUS.md Template

```markdown
# 📋 MASTER STATUS - [Project Name]

**Last Updated:** YYYY-MM-DD
**Overall Status:** [🟢 On Track | 🟡 At Risk | 🔴 Blocked]
**Current Phase:** Phase N - [Name]
**Confidence:** [0-100%]

---

## 🎯 Executive Summary

### Current Progress

[High-level status with progress bars]

### What's Next

[Immediate next steps, 3-5 items max]

---

## 📊 Phase Status Overview

| Phase | Status | Duration | Completed | Documentation |
| ----- | ------ | -------- | --------- | ------------- |
| ...   | ...    | ...      | ...       | ...           |

---

## [Detailed Phase Sections]

## 📚 Key Decisions

## 🚧 Known Issues/Risks

## 📝 Notes
```

### Archive Policy

**When to archive:**

- Phase is 100% complete
- All deliverables validated and merged
- Documentation finalized
- No active work remaining

**What to archive:**

- Session notes from completed phases
- Draft documents superseded by finals
- Experimental POCs (keep final decision docs)
- Old versions of living documents

**What stays at root:**

- MASTER-STATUS.md (always current)
- Active phase documents
- Key decision records (ADRs)
- Latest completion summaries (last 2-3 phases)

---

## 🚀 How to Start/Resume Work

### For AI Agents (Mary Protocol)

#### Step 1: Orient Yourself

```bash
# Read the master status
Read: _bmad-output/analysis/[project-name]/MASTER-STATUS.md

# Extract:
- Current phase
- Last completed actions
- Next steps section
- Any blockers/questions
```

#### Step 2: Understand Context

```bash
# Read recent phase completion (if just finished a phase)
Read: phase-N-completion-summary.md

# Check for open questions or decisions needed
Grep: "TODO" | "QUESTION" | "DECISION NEEDED"
```

#### Step 3: Plan Next Actions

**Mary creates implementation plan:**

```markdown
## Implementation Plan - Phase N: [Name]

### Tasks

1. Task 1: [Description]
   - Subagent: [Type - e.g., "code", "test", "docs"]
   - Inputs: [Files/context needed]
   - Outputs: [Expected deliverables]
2. Task 2: [Description]
   ...

### Dependencies

- Task 2 depends on Task 1 completion
- Task 3 can run parallel to Task 2

### Questions for User (if any)

1. Question about X
2. Clarification needed on Y
```

#### Step 4: Delegate to Subagent

**Use Task tool with clear instructions:**

```markdown
Task: [Concise title - max 60 chars]

Context:

- Current phase: Phase N
- Goal: [What to accomplish]
- Related files: [Paths to read]
- Standards: See AGENTS.md sections X, Y, Z

Instructions:

1. [Step-by-step, numbered]
2. [Be specific about files/paths]
3. [Include testing requirements]

Expected Deliverables:

- [ ] File 1: path/to/file.ext
- [ ] File 2: path/to/test.ext
- [ ] Documentation update in X

Questions to Ask User (if blockers arise):

- [Provide template for what info you need]

Report Back Format:
Use Rule 4 status protocol (see analysis/README.md)
```

#### Step 5: Validate & Update

**After subagent reports back:**

1. **Validate deliverables** (use Read/Grep to check)
2. **If issues found:** Delegate fix to subagent
3. **If successful:**
   - Update MASTER-STATUS.md (current phase progress)
   - Create phase completion summary if phase done
   - Report to user with summary

### For Human Contributors

#### Quick Start

1. **Navigate to project:**

   ```bash
   cd _bmad-output/analysis/[project-name]/
   ```

2. **Read master status:**

   ```bash
   cat MASTER-STATUS.md | head -100
   ```

3. **Identify next action:**
   - Look at "What's Next" section
   - Check phase status table for current phase

4. **Execute or delegate:**
   - Simple tasks: Execute directly
   - Complex tasks: Ask Mary (AI agent) to coordinate

#### Status Update Protocol

**After completing work:**

1. Update MASTER-STATUS.md:
   - Change "Last Updated" date
   - Update phase status/progress
   - Move completed items from "Next" to "Completed"
   - Add new next steps

2. Create completion summary if phase done:
   - Use template from existing phase-N-completion-summary.md
   - Document all deliverables
   - Note any deviations from plan
   - Highlight key decisions/learnings

3. Archive old content:
   - Move completed phase docs to `archive/phase-N/`
   - Keep MASTER-STATUS.md clean and current

---

## 📚 Related Documentation

### Project-Level Docs (in main repo root)

- **[AGENTS.md](../../AGENTS.md)** - AI agent guidelines, code standards, architecture
- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code agent
- **[CONTRIBUTING.md](../../CONTRIBUTING.md)** - Git workflow, PR process

### Analysis-Specific Docs

- **[Multi-Agent Documentation Maintenance](.github/instructions/multi-agent-documentation-maintenance.instructions.md)** - How to keep AI docs in sync
- **[Design System Instructions](.github/instructions/lufa-design-system.instructions.md)** - Design system specific standards

### Tool Documentation

- **[Changesets Guide](../../docs/howto/How-to-use-changeset-in-Lufa.md)** - Version management workflow

---

## 🎓 Tips for Effective Analysis Management

### For AI Agents

1. **Always start with Read** - Never assume current state, always verify
2. **Update MASTER-STATUS.md frequently** - After every completed task
3. **Use Task tool liberally** - Delegate all implementation work
4. **Ask questions early** - Don't guess requirements, ask user
5. **Document decisions** - Create ADRs for architectural choices

### For Humans

1. **Keep MASTER-STATUS.md current** - It's the single source of truth
2. **Archive aggressively** - Old docs create noise
3. **Use emojis for status** - Visual scanning is faster (🟢🟡🔴✅⏳📋)
4. **Link liberally** - Connect related docs with relative paths
5. **Write for future you** - You'll forget context in 2 weeks

### Common Pitfalls to Avoid

❌ **Don't:**

- Let MASTER-STATUS.md get stale (>1 week old)
- Create parallel tracking systems (use one source of truth)
- Skip phase completion summaries (future you needs them)
- Commit without updating analysis docs
- Create orphaned documents (always link from MASTER-STATUS.md)

✅ **Do:**

- Update status with every meaningful change
- Archive completed work promptly
- Document decisions at decision time (not later)
- Keep next steps actionable (not vague)
- Use consistent formatting across projects

---

## 📞 Support & Questions

### For AI Agents

If you encounter ambiguity or need clarification:

1. **Check existing docs first:**
   - AGENTS.md (architecture, standards)
   - MASTER-STATUS.md (current project state)
   - Phase completion summaries (past decisions)

2. **If still unclear:** Use Rule 5 (Question Aggregation)
   - Collect all questions
   - Organize by priority
   - Present to user in structured format

3. **Never guess:**
   - Incorrect assumptions waste time
   - Ask user > implement wrong thing

### For Humans

Questions about:

- **Workflow:** See this README (you're reading it!)
- **Code Standards:** See [AGENTS.md](../../AGENTS.md)
- **Design System:** See project MASTER-STATUS.md
- **Git/PRs:** See [CONTRIBUTING.md](../../CONTRIBUTING.md)

---

**Last Updated:** 2026-01-23  
**Maintained by:** Project contributors and Mary (AI coordinator)  
**Version:** 1.0
