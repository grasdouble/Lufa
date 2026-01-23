# 📚 Project Organization Guide

> **Purpose:** This is the definitive guide for creating and organizing analysis projects within the Lufa monorepo. Use this when starting new complex, multi-phase projects that require structured documentation and tracking.

**For:** Human contributors and AI agents (especially Mary, the AI coordinator)  
**Last Updated:** 2026-01-24  
**Version:** 1.0

---

## 🎯 A) Overview

### What is an Analysis Project?

An **analysis project** is a structured workspace for managing complex, multi-phase initiatives that require:

- Detailed planning and documentation
- Progress tracking across multiple phases
- Historical record keeping
- Coordination between human and AI contributors
- Clear status visibility

### When to Use This Guide

✅ **Use this guide when:**

- Starting a new architectural refactoring project
- Planning a multi-phase feature implementation
- Conducting a comprehensive analysis or research initiative
- Managing a project with multiple deliverables over weeks/months
- Need to coordinate work between multiple contributors (human + AI)

❌ **Don't use this for:**

- Simple bug fixes or single-task work
- Quick experiments or POCs (unless they evolve into something larger)
- Standard feature development that follows existing patterns

### Who This Guide is For

**Human Contributors:**

- Project leads planning complex initiatives
- Contributors joining ongoing analysis projects
- Anyone needing to understand project status quickly

**AI Agents:**

- Mary (AI Coordinator) - orchestrating multi-phase work
- Subagents - understanding where to put deliverables
- Future AI agents - navigating existing analysis projects

---

## 🗂️ B) Directory Structure Template

### Complete Directory Tree

```
analysis/
├── your-project-name/                  # Root project directory (kebab-case)
│   │
│   ├── README.md                       # 📖 Project navigation guide
│   ├── MASTER-STATUS.md                # 🔴 REQUIRED - Single source of truth
│   ├── roadmap-{version}.md            # Optional: Detailed phase roadmap
│   ├── brainstorming-session-{date}.md # Optional: Initial ideation
│   │
│   ├── archive/                        # 🗄️ Completed work, old versions
│   │   ├── README.md                   # What's archived and why
│   │   ├── pocs/                       # Proof of concepts (completed)
│   │   ├── phase-N/                    # Old phase documents
│   │   ├── sessions/                   # Historical work sessions
│   │   ├── tools/                      # Deprecated automation
│   │   └── v1-migration/               # Migration docs (if applicable)
│   │
│   ├── current/                        # 🚧 Active work in progress
│   │   ├── README.md                   # What's currently active
│   │   ├── phase-N-work-in-progress.md # Active phase work
│   │   └── analysis-[topic].md         # Ongoing analysis
│   │
│   ├── summaries/                      # ✅ Phase completion summaries
│   │   ├── README.md                   # Summary index
│   │   ├── phase-0-complete-summary.md
│   │   ├── phase-1-completion-summary.md
│   │   └── phase-N-completion-summary.md
│   │
│   └── studies/                        # 📊 Detailed analysis documents
│       ├── README.md                   # Study index
│       ├── conformity-review-*.md      # Reviews and verifications
│       ├── proposition-*.md            # Proposals and ideas
│       ├── analysis-*.md               # In-depth analysis
│       ├── phase-N-blocker-*.md        # Blocker analysis
│       └── MAINTENANCE-SYSTEM.md       # Optional: Maintenance docs
│
└── _PROJECT-TEMPLATE/                  # 📦 Copy this to start new projects
    └── (see Part 3 below)
```

### Directory Explanations

| Directory    | Purpose                                 | What Goes Here                                         | When to Use                       |
| ------------ | --------------------------------------- | ------------------------------------------------------ | --------------------------------- |
| **Root**     | Active project documents                | README, MASTER-STATUS, roadmap, brainstorming          | Always - these are your core docs |
| `archive/`   | Historical records, completed work      | Old phases, deprecated docs, completed POCs, sessions  | After work is 100% complete       |
| `current/`   | Work in progress                        | Draft analysis, active phase work, temporary notes     | While actively working            |
| `summaries/` | Phase completion records                | Detailed summaries of each completed phase             | After each phase completes        |
| `studies/`   | Reference analysis and detailed reviews | Verifications, proposals, blockers, maintenance guides | As needed for deep dives          |

---

## 📄 C) Required Files

### 1. MASTER-STATUS.md (🔴 REQUIRED)

**Purpose:** Single source of truth for project status - the first document anyone should read.

**Template Structure:**

```markdown
# 📋 MASTER STATUS - [Project Name]

**Last Updated:** YYYY-MM-DD
**Overall Status:** [🟢 On Track | 🟡 At Risk | 🔴 Blocked]
**Current Phase:** Phase N - [Name]
**Confidence:** [0-100%]

---

## 🎯 Executive Summary

### Current Progress

[High-level status with progress bars - visual and scannable]

Progress: ████████████░░░░░░░░ 60%

✅ Phase 0: Complete
✅ Phase 1: Complete
⏳ Phase 2: In Progress (60%)
📋 Phase 3: Planned

### What's Next

[3-5 bullet points - immediate next actions, no vague statements]

---

## 📊 Phase Status Overview

| Phase   | Status         | Duration    | Completed  | Documentation                 |
| ------- | -------------- | ----------- | ---------- | ----------------------------- |
| Phase 0 | ✅ Complete    | 3 days      | YYYY-MM-DD | `phase-0-complete-summary.md` |
| Phase 1 | ⏳ In Progress | TBD         | -          | -                             |
| Phase 2 | 📋 Planned     | Est. 1 week | -          | -                             |

---

## [Detailed Phase Sections]

## Phase N: [Name]

**Status:** [Status]
**Date:** [Date or TBD]
**Duration:** [Actual or estimated]

### Objectives

### Deliverables

### Progress

---

## 📚 Key Decisions

[Link to decision records, major architectural choices]

---

## 🚧 Known Issues/Risks

[Current blockers, risks, mitigation strategies]

---

## 📂 Documentation References

[Links to other key documents]

---

## 🎯 Immediate Next Actions

[Step-by-step guide for next 1-3 actions]
```

**Update Frequency:** After every completed phase, major milestone, or significant change

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/MASTER-STATUS.md`

---

### 2. README.md (Required)

**Purpose:** Navigation guide for the project directory - helps people find what they need quickly.

**Template Structure:**

```markdown
# 📁 [Project Name]

Brief description of what this project is about (1-2 paragraphs).

---

## 🎯 Main Documents (Consult Regularly)

### 1. ⭐ MASTER-STATUS.md

**Role:** Current project status - Quick reference

**When to consult:**

- 🚀 Starting a session → "Where are we?"
- 💬 Someone asks for status
- ✅ See next immediate actions

**Last Updated:** YYYY-MM-DD

---

### 2. roadmap-{version}.md (if applicable)

**Role:** Detailed complete plan

**When to consult:**

- Planning a new phase
- Understanding future phases
- Seeing all tasks for a phase

---

## 📂 Directory Structure
```

project-name/
├── archive/ - Completed work, historical records
├── current/ - Active work in progress
├── summaries/ - Phase completion summaries
└── studies/ - Detailed analysis and reviews

```

---

## 🚀 Quick Start Guide

### Scenario 1: "I'm starting a work session"

1. Open MASTER-STATUS.md
2. Read "Executive Summary" (30 seconds)
3. See "What's Next" section
4. Follow "Immediate Next Actions"

### Scenario 2: "I just finished Phase N"

1. Create phase-N-completion-summary.md
2. Update MASTER-STATUS.md
3. Update roadmap (if applicable)
4. Move intermediate docs to archive/
5. Git commit

---

## 📊 How to Find Information

| Question | Document to Consult |
|----------|---------------------|
| Where is the project? | MASTER-STATUS.md (Executive Summary) |
| What's the next phase? | MASTER-STATUS.md (What's Next) |
| Details on Phase N? | summaries/phase-N-completion-summary.md |
| Why was decision X made? | studies/ or brainstorming session |
| What's archived? | archive/README.md |

---

**Document Maintained By:** [Your name/team]
**Last Updated:** YYYY-MM-DD
**Status:** 🟢 Active
```

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/README.md`

---

### 3. Roadmap (Optional but Recommended)

**When to Create:**

- Multi-phase projects (3+ phases)
- Need detailed planning and task tracking
- Multiple contributors need coordination

**Naming:** `roadmap-{version}.md` or `roadmap-implementation-{version}.md`

**Should Include:**

- All phases with detailed objectives
- Tasks/deliverables per phase
- Dependencies between phases
- Success criteria and metrics
- Timeline estimates
- Risk assessment

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/roadmap-implementation-v2.0.md`

---

### 4. Brainstorming/Planning Docs (Optional)

**When to Create:**

- Initial project planning
- Architectural decision sessions
- Major pivots or redesigns

**Naming:** `brainstorming-session-{date}.md` or `planning-{topic}.md`

**Should Include:**

- Session metadata (date, participants, goals)
- Ideas generated
- Decisions made
- Alternatives considered and rejected
- Next steps from session

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/brainstorming-session-2026-01-22.md`

---

## 🗂️ D) Directory Purposes (Detailed)

### archive/ Directory

**Purpose:** Long-term storage for completed work and historical context.

#### When to Archive

✅ **Archive when:**

- Phase is 100% complete (all deliverables validated and merged)
- Documentation has been superseded by a comprehensive version
- POCs are complete (keep the results, archive the experiments)
- Migration is finished
- Old architecture is replaced
- Session work is concluded
- Tools are deprecated (superseded by better solutions)

❌ **Don't archive:**

- Documents still referenced frequently
- Active phase work
- Current implementation code
- Living documentation that gets updated

#### What Goes in archive/

**Sub-directory Structure:**

```
archive/
├── README.md               # REQUIRED - Explains what's archived and why
├── pocs/                   # Proof of concepts (completed)
│   ├── README.md
│   └── performance-test-*.md
├── phase-N/                # Old intermediate phase documents
│   ├── README.md
│   └── phase-N-draft-*.md
├── sessions/               # Historical work sessions
│   ├── README.md
│   └── YYYY-MM-DD-session-*.md
├── tools/                  # Deprecated automation
│   ├── README.md
│   └── old-script.sh
└── v1-migration/           # Migration documentation (if applicable)
    ├── README.md
    └── MIGRATION_STATUS.md
```

**Each subdirectory MUST have a README.md explaining:**

- What's in this archive folder
- Why it was archived
- When it was archived
- Where to find the current/active version

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/archive/`

---

### current/ Directory

**Purpose:** Workspace for active, in-progress work.

#### When to Use current/

✅ **Put here when:**

- Starting new phase work (before it's done)
- Working on draft analysis documents
- Collecting notes and findings during active work
- Temporary files that will be organized later

#### When to Move Out of current/

📦 **Move to summaries/ when:**

- Phase is complete → Create completion summary

📦 **Move to studies/ when:**

- Analysis is finalized → Becomes reference document

📦 **Move to archive/ when:**

- Document is superseded or deprecated

#### File Organization in current/

**Naming convention:**

- `phase-N-work-in-progress.md` - Active phase work
- `analysis-[topic]-YYYY-MM-DD.md` - Dated analysis
- `review-draft-[topic].md` - Draft reviews
- `notes-[session].md` - Session notes

**Keep it Clean:** This directory should be regularly emptied as work completes.

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/current/` (currently empty, as designed)

---

### summaries/ Directory

**Purpose:** Historical record of what was accomplished in each phase.

#### What Qualifies as a Summary

✅ **Summaries are:**

- **Completion records** - Written AFTER phase is done
- **Comprehensive** - Cover all objectives, deliverables, decisions
- **Factual** - What actually happened (not plans)
- **Standalone** - Can be read without other context
- **Permanent** - Don't get edited after creation (append addendums if needed)

❌ **Summaries are NOT:**

- Planning documents (those go in root or studies/)
- Work-in-progress notes (those go in current/)
- Detailed analysis (those go in studies/)

#### Summary Template

**Naming:** `phase-N-completion-summary.md` or `phase-N-complete-summary.md`

**Structure:**

```markdown
# Phase N: [Phase Name] - Completion Summary

**Status:** ✅ COMPLETE (100%)
**Date:** YYYY-MM-DD
**Duration:** [Actual duration]
**[Relevant Metrics]:** [e.g., Tokens Created: 103]

---

## 🎯 Objectives

[What was this phase supposed to accomplish?]

---

## 📦 Deliverables

[What was delivered?]

- ✅ Deliverable 1: [description]
- ✅ Deliverable 2: [description]
- ✅ Deliverable 3: [description]

---

## 📊 Results

[Detailed results with metrics, examples, links]

### [Category 1]

### [Category 2]

---

## 🔧 Technical Details

[How was it built? Tools used? Patterns followed?]

---

## 🚧 Issues Resolved

[Problems encountered and how they were solved]

---

## 📚 Key Decisions

[Important decisions made during this phase]

---

## 🎓 Lessons Learned

[What worked well? What could be improved?]

---

## 🔗 References

[Links to code, documentation, related files]

---

## ➡️ Next Steps

[What's the immediate next phase or action?]
```

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/summaries/phase-1-completion-summary.md`

---

### studies/ Directory

**Purpose:** Reference library of detailed analysis, verifications, proposals, and maintenance documentation.

#### Types of Studies

**1. Analysis Documents** (`analysis-*.md`)

- In-depth examination of a topic
- Research findings
- Comparative analysis

**2. Verification Documents** (`verification-*.md`, `conformity-review-*.md`)

- Validation of implementation against requirements
- Compliance checks
- Quality reviews

**3. Proposals** (`proposition-*.md`, `proposal-*.md`)

- Ideas for improvements
- Architectural change proposals
- Problem-solution documents

**4. Blocker Analysis** (`phase-N-blocker-*.md`)

- Deep dives into specific blockers
- Root cause analysis
- Resolution strategies

**5. Maintenance Documents** (`MAINTENANCE-SYSTEM.md`, `CHECKLIST-*.md`)

- System maintenance procedures
- Recurring processes
- AI routines and automations

**6. Planning Documents** (`phase-N-preparation-plan.md`)

- Detailed phase planning (before phase starts)
- Implementation strategies

#### Study Naming Conventions

- **Descriptive names** - Make it obvious what the study is about
- **Include context** - `conformity-review-brainstorming-vs-implementation.md`
- **Use prefixes** - `analysis-`, `review-`, `proposal-`, etc.
- **Date if time-sensitive** - `analysis-performance-2026-01-22.md`

**Real Example:** `_bmad-output/analysis/design-system-new-architecture/studies/`

---

### Root Level

**What Stays at Root:**

✅ **Always at root:**

- `MASTER-STATUS.md` (single source of truth)
- `README.md` (navigation guide)
- Active phase documents (current phase only)
- `roadmap-*.md` (if applicable)
- `brainstorming-session-*.md` (initial project planning)

❌ **Should NOT be at root:**

- Completed phase summaries (→ summaries/)
- Detailed analysis (→ studies/)
- Work in progress (→ current/)
- Deprecated documents (→ archive/)
- More than 5-7 files (keep it clean!)

**Why:** Root should be **scannable** - someone should be able to see the most important documents in seconds.

---

## 📛 E) File Naming Conventions

### Naming Patterns

| File Type                  | Pattern                           | Example                                |
| -------------------------- | --------------------------------- | -------------------------------------- |
| **Master Status**          | `MASTER-STATUS.md`                | `MASTER-STATUS.md` (always uppercase)  |
| **Phase Summaries**        | `phase-N-{descriptor}.md`         | `phase-3-completion-summary.md`        |
| **Roadmap**                | `roadmap-{version}.md`            | `roadmap-implementation-v2.0.md`       |
| **Brainstorming**          | `brainstorming-session-{date}.md` | `brainstorming-session-2026-01-22.md`  |
| **Studies**                | `{type}-{descriptor}.md`          | `conformity-review-tokens.md`          |
| **Proposals**              | `proposition-{topic}.md`          | `proposition-cleanup-aliases.md`       |
| **Blockers**               | `phase-N-blocker-{issue}.md`      | `phase-4-blocker-missing-tokens.md`    |
| **Work in Progress**       | `phase-N-work-in-progress.md`     | `phase-5-work-in-progress.md`          |
| **Analysis (with date)**   | `analysis-{topic}-{date}.md`      | `analysis-performance-2026-01-22.md`   |
| **Sessions (archived)**    | `{date}-session-{topic}.md`       | `2026-01-23-reorganization-session.md` |
| **Maintenance/Checklists** | `UPPERCASE-{descriptor}.md`       | `CHECKLIST-update-documentation.md`    |

### Naming Principles

1. **UPPERCASE for visibility** - Master documents and checklists
2. **kebab-case for multi-word** - `phase-completion-summary.md`
3. **Dates in ISO format** - `YYYY-MM-DD` (sortable)
4. **Descriptive, not cryptic** - `conformity-review.md` not `cr.md`
5. **Consistent prefixes** - `phase-N-`, `analysis-`, `proposition-`

### Special Cases

**README.md files:**

- Always titled `README.md` (GitHub/markdown convention)
- Every subdirectory should have one
- Explains what's in the directory

**Visual summaries:**

- Optional: `{name}-VISUAL-SUMMARY.md`
- For documents that benefit from ASCII art, tables, diagrams

---

## 🔄 F) Workflow for New Projects

### Step-by-Step Project Creation

#### 1. Create Project Directory

```bash
cd _bmad-output/analysis/
mkdir your-project-name  # Use kebab-case
cd your-project-name/
```

**Naming guidelines:**

- Use kebab-case: `design-system-tokens`, `performance-optimization`
- Be descriptive but concise
- Avoid abbreviations unless universally understood

---

#### 2. Set Up Initial Structure

```bash
# Copy template
cp -r ../_PROJECT-TEMPLATE/* .

# Or create manually
mkdir archive current summaries studies
touch README.md MASTER-STATUS.md
```

---

#### 3. Create MASTER-STATUS.md

**Use the template from Section C.1 above.**

**Minimum required sections:**

- Header with metadata (Last Updated, Status, Phase, Confidence)
- Executive Summary
- Phase Status Overview (table)
- At least one detailed phase section
- Immediate Next Actions

**Fill in:**

- Project name and description
- Current phase (even if Phase 0 - Setup)
- What you know so far
- What's unclear (document questions)

---

#### 4. Create README.md

**Use the template from Section C.2 above.**

**Customize:**

- Project description (what is this about?)
- Links to main documents
- Quick start scenarios relevant to your project
- "How to Find Information" table

---

#### 5. Set Up Subdirectories

```bash
# Create README.md in each subdirectory
# Use these templates:
```

**archive/README.md:**

```markdown
# Archives - [Project Name]

This directory contains archived documentation from previous versions, completed phases, and historical work sessions.

**Last Updated:** YYYY-MM-DD

---

## 📦 Directory Structure
```

archive/
├── phase-N/ # Old phase documents
├── sessions/ # Historical work sessions
└── [others] # As needed

```

---

## 📁 Archive Contents

[Will be populated as work is archived]

---

## 📝 Archive Policy

**When to archive:**
- Phase is 100% complete
- Documents superseded by comprehensive versions
- Experimental work concluded

**What to preserve:**
- Decision-making context
- Historical references
- Session records

---

**Archive Location:** `_bmad-output/analysis/[project-name]/archive/`
**Status:** 🟢 Active Archive
```

**current/README.md:**

```markdown
# Current Work

This directory contains documents related to ongoing, active work on [project name].

## Purpose

- Work-in-progress analysis documents
- Active phase planning
- Temporary notes and findings
- Documents being actively edited

## Guidelines

- **Move when complete**: Once work is finalized, move to appropriate directory
- **Keep it clean**: Only active work should be here
- **Naming convention**: Use descriptive names with dates when relevant

## Status

[Update this as work progresses]
```

**summaries/README.md:**

```markdown
# Phase Completion Summaries

This directory contains completion summaries for each phase of [project name].

## Purpose

Phase summaries document:

- Key accomplishments during each phase
- Decisions made and rationale
- Blockers encountered and resolutions
- Next steps and transition to subsequent phases

## Files

[Will be populated as phases complete]

## Usage

These summaries serve as historical records and reference points for understanding project progression.
```

**studies/README.md:**

```markdown
# Studies and Analysis Documents

This directory contains detailed analysis, verification, and review documents for [project name].

## Purpose

Study documents provide:

- In-depth analysis of design decisions
- Verification and conformity reviews
- Brainstorming sessions and ideation
- Maintenance procedures and routines

## Files

[Will be populated as studies are created]

## Usage

These documents are reference materials for understanding reasoning, verifying conformity, and planning future work.
```

---

#### 6. Add Initial Brainstorming/Planning

If you had a planning session:

```bash
# Create brainstorming document at root
touch brainstorming-session-YYYY-MM-DD.md
```

**Fill in:**

- Session metadata (date, participants, topic)
- Ideas generated
- Decisions made
- Alternatives considered
- Next steps

---

#### 7. Update Main analysis/README.md Index

**Add your project to the index:**

```bash
cd _bmad-output/analysis/
# Edit README.md
```

**Add to "Active Projects" table:**

```markdown
| Project Name         | Status     | Current Phase   | Last Updated | Entry Point        |
| -------------------- | ---------- | --------------- | ------------ | ------------------ |
| `your-project-name/` | 🟢 Phase 0 | Phase 0 - Setup | YYYY-MM-DD   | `MASTER-STATUS.md` |
```

**Add project details section:**

```markdown
#### [Emoji] Your Project Name

**Goal:** [Brief description]

**Progress:**

- ⏳ Phase 0: Setup

**Next Steps:**

1. [Next action]
```

---

### Verification Checklist

After setup, verify:

- [ ] Project directory created with kebab-case name
- [ ] MASTER-STATUS.md exists with all required sections
- [ ] README.md exists with navigation guide
- [ ] All 4 subdirectories exist (archive, current, summaries, studies)
- [ ] Each subdirectory has a README.md
- [ ] Main analysis/README.md updated with new project
- [ ] Git add and commit setup

```bash
git add _bmad-output/analysis/your-project-name/
git add _bmad-output/analysis/README.md
git commit -m "docs(analysis): initialize [project-name] analysis project"
```

---

## 📦 G) When to Archive

### Archive Decision Tree

```
Is the work 100% complete?
├─ No → Keep in current/ or root
└─ Yes
    ├─ Is it a phase completion?
    │   ├─ Yes → Move intermediate docs to archive/phase-N/
    │   └─ No → Continue...
    │
    ├─ Is it superseded by a newer version?
    │   ├─ Yes → Move to archive/ (keep reference)
    │   └─ No → Continue...
    │
    ├─ Is it a completed POC/experiment?
    │   ├─ Yes → Move to archive/pocs/
    │   └─ No → Continue...
    │
    ├─ Is it a migration that's complete?
    │   ├─ Yes → Move to archive/v1-migration/ (or similar)
    │   └─ No → Continue...
    │
    ├─ Is it a historical work session?
    │   ├─ Yes → Move to archive/sessions/
    │   └─ No → Continue...
    │
    ├─ Is it a deprecated tool?
    │   ├─ Yes → Move to archive/tools/
    │   └─ No → Keep in studies/ (if still reference material)
    │
    └─ Is it old architecture/code?
        ├─ Yes → Move to archive/[name]-source-v1/ (or similar)
        └─ No → Probably belongs in studies/ or summaries/
```

### Common Archive Scenarios

| Scenario                                | Archive To                          | Example                              |
| --------------------------------------- | ----------------------------------- | ------------------------------------ |
| Phase complete, intermediate docs exist | `archive/phase-N/`                  | Draft summaries before final version |
| POC finished                            | `archive/pocs/`                     | Performance test HTML                |
| Migration done                          | `archive/v1-migration/`             | Migration tracking docs              |
| Old architecture replaced               | `archive/[name]-source-v1/`         | Old token structure                  |
| Work session concluded                  | `archive/sessions/`                 | Reorganization session notes         |
| Tool deprecated                         | `archive/tools/`                    | Old bash scripts                     |
| Document superseded                     | `archive/` (at root or in category) | Old planning docs                    |

### What NOT to Archive

❌ **Keep active (don't archive):**

- MASTER-STATUS.md (always current, never archived)
- README.md files (living documents)
- Latest phase summaries (last 2-3 phases should be easily accessible)
- Active decision records
- Current maintenance documentation
- Tools/scripts still in use

---

## 🔗 H) Cross-Referencing Best Practices

### Use Relative Paths

✅ **Good - Relative paths:**

```markdown
See [Phase 2 Summary](../summaries/phase-2-completion-summary.md)
See [Archive README](../archive/README.md)
See [Project README](../README.md)
```

❌ **Bad - Absolute paths:**

```markdown
See [Phase 2 Summary](/Users/you/project/_bmad-output/analysis/project/summaries/...)
```

**Why:** Relative paths work on any machine, in any clone of the repo.

---

### Link Patterns

**From MASTER-STATUS.md:**

```markdown
## 📂 Documentation References

### Phase Documentation

- **Phase 0:** `summaries/phase-0-complete-summary.md`
- **Phase 1:** `summaries/phase-1-completion-summary.md`

### Technical Documentation

- **Scope Definition:** `docs/roadmap/v2.0-scope.md` (root of repo)
- **Architecture Analysis:** `studies/conformity-review.md`

### Archives

- **Old Architecture:** `archive/tokens-source-v1/`
```

**From Phase Summary:**

```markdown
## 🔗 References

**Related Phases:**

- Previous: [Phase 1 Summary](./phase-1-completion-summary.md)
- Next: [Phase 3 Summary](./phase-3-completion-summary.md)

**Detailed Analysis:**

- [Conformity Review](../studies/conformity-review.md)
- [Performance POC](../archive/pocs/performance-results.md)

**Project Status:**

- [MASTER-STATUS.md](../MASTER-STATUS.md)
```

---

### Keep MASTER-STATUS as Central Hub

**Pattern:** MASTER-STATUS should link to **everything** important.

```markdown
## 📂 Documentation References

### Global Documentation

- **Main Roadmap:** `roadmap-implementation-v2.0.md`
- **This Document:** `MASTER-STATUS.md`

### Phase Documentation

- **Phase 0:** `summaries/phase-0-complete-summary.md`
- **Phase 1:** `summaries/phase-1-completion-summary.md`
  [...all phases...]

### Technical Documentation

- **Scope Definition:** `docs/roadmap/v2.0-scope.md`
- **Onboarding Guide:** `docs/contributors/your-first-token.md`
- **POC Performance:** `archive/pocs/performance-results.md`

### Code & Scripts

- **Tokens Package:** `packages/design-system/tokens/`
- **Validation Script:** `scripts/validate-token-metadata.js`
```

**Why:** Anyone reading MASTER-STATUS can find everything in one place.

---

### Link Summaries to Detailed Studies

**Pattern:** Summaries are high-level, studies are deep dives. Link between them.

**In Phase Summary:**

```markdown
## 📊 Results

Phase 3 created 97 semantic tokens.

**For detailed token breakdown and architecture validation:**
See [Token Verification Study](../studies/tokens-verification-primitives-core.md)
```

**In Study:**

```markdown
## Context

This verification was conducted after Phase 3 completion.

**Phase 3 Summary:** [phase-3-completion-summary.md](../summaries/phase-3-completion-summary.md)
```

---

### Update Links When Moving Files

**Checklist when archiving:**

- [ ] Update all links pointing TO this file
- [ ] Update all links FROM this file to use new path
- [ ] Update MASTER-STATUS.md references
- [ ] Update README.md if file was listed there
- [ ] Test links work (open in preview)

**Example:** Moving `phase-2/planning.md` to `archive/phase-2/planning.md`

1. Update MASTER-STATUS.md: `phase-2/planning.md` → `archive/phase-2/planning.md`
2. Update any studies that referenced it
3. Update README.md if listed

---

## 🤖 I) AI Agent Guidelines

### Navigation Rules for AI Agents

**Step 1: Always Start with MASTER-STATUS.md**

```bash
# First action when resuming work or starting new task
Read: _bmad-output/analysis/[project-name]/MASTER-STATUS.md

# Extract:
- Current phase
- Last updated date
- Next steps section
- Any blockers or questions
```

**Why:** Single source of truth. Everything else branches from here.

---

**Step 2: Understand Project Structure**

```bash
# Read the navigation guide
Read: _bmad-output/analysis/[project-name]/README.md

# Scan directory structure
Glob: _bmad-output/analysis/[project-name]/*
```

---

**Step 3: Context Gathering (as needed)**

```bash
# If you need phase details
Read: summaries/phase-N-completion-summary.md

# If you need deep analysis
Read: studies/[relevant-study].md

# If you need to understand history
Read: archive/[relevant-archive]/README.md
```

---

### Where to Put New Files

**Decision tree for AI agents:**

```
Creating a new file?
│
├─ Is it MASTER-STATUS.md or README.md?
│   └─ Put at: [project-root]/
│
├─ Is it a phase completion summary?
│   └─ Put at: summaries/phase-N-completion-summary.md
│
├─ Is it active work in progress?
│   └─ Put at: current/phase-N-work-in-progress.md
│
├─ Is it detailed analysis, review, or proposal?
│   └─ Put at: studies/[type]-[topic].md
│
├─ Is it completed/deprecated work?
│   └─ Put at: archive/[category]/
│
└─ Is it initial planning/brainstorming?
    └─ Put at: [project-root]/brainstorming-session-YYYY-MM-DD.md
```

**Default rule:** When in doubt, put in `current/` first. Can move later.

---

### When to Update MASTER-STATUS

✅ **Update MASTER-STATUS.md after:**

- Completing a phase
- Completing a major milestone within a phase
- Resolving a blocker
- Making a key decision
- Adding/removing phases
- Significant progress (>10% phase progress)

❌ **Don't update MASTER-STATUS for:**

- Minor edits to other documents
- Typo fixes
- Formatting changes
- Adding study documents (unless they change status)

---

### How to Reference Archived Work

**Pattern in MASTER-STATUS.md:**

```markdown
## Phase 0: Critical Pre-Implementation Actions

**Status:** ✅ COMPLETE
**Documentation:** `summaries/phase-0-complete-summary.md`

### Key Achievements

- ✅ Architecture validated via POC (see `archive/pocs/performance-results.md`)
- ✅ Automation complete
- ✅ Scope defined

**For intermediate summaries and detailed POC files:**
See `archive/phase-0/` and `archive/pocs/`
```

**Why:** Give enough context that someone knows archived work exists, but don't clutter main status with old details.

---

### Delegation Rules (Mary Coordinator Pattern)

**From main analysis/README.md:**

#### Rule 1: Mandatory Delegation

Mary (AI coordinator) **MUST delegate ALL implementation** to subagents using Task tool.

**What Mary does:**

- Read MASTER-STATUS.md to understand current state
- Plan next actions
- Delegate via Task tool
- Validate deliverables
- Update MASTER-STATUS.md

**What Mary does NOT do:**

- Write production code
- Use Edit/Write/Bash for implementation
- Execute builds directly

---

#### Rule 2: Mary Validates, Doesn't Implement

**Validation checklist:**

- ✅ Files in correct locations
- ✅ Follows project standards
- ✅ Tests pass
- ✅ Documentation updated

**If validation fails:**

1. Document issues clearly
2. Delegate fix to subagent
3. Re-validate

---

#### Rule 3: Update Documentation After Completion

**After subagent reports success:**

1. ✅ Validate deliverables (use Read/Grep)
2. ✅ Update MASTER-STATUS.md:
   - Change "Last Updated" date
   - Update phase progress
   - Move completed items to "Completed" section
   - Add new next steps
3. ✅ Create phase completion summary if phase done
4. ✅ Move work from current/ to appropriate directory
5. ✅ Report to user

---

#### Rule 4: Questions Go Through Mary

**When subagent has questions:**

1. Subagent reports questions in structured format
2. Mary collects and organizes questions
3. Mary presents to user with context and priority
4. User answers
5. Mary forwards answers to subagent

**Format for questions:**

```markdown
## 🙋 Questions from Subagent - [Task Name]

### High Priority (Blockers)

1. **[Topic]:** [Question]
   - Context: [Why this matters]
   - Impact: [What's blocked]

### Medium Priority (Clarifications)

2. **[Topic]:** [Question]
   - Context: [Background]
   - Impact: [Effect on work]

### Low Priority (Nice-to-have)

3. **[Topic]:** [Question]
   - Context: [Context]
   - Impact: [Minor impact]
```

---

### AI Agent Quick Reference

**Starting work:**

1. Read MASTER-STATUS.md
2. Read README.md (for navigation)
3. Plan next actions
4. Delegate via Task tool (if Mary) or execute (if subagent)
5. Report back

**Completing phase:**

1. Create phase-N-completion-summary.md in summaries/
2. Update MASTER-STATUS.md
3. Move current/ docs to appropriate locations
4. Update roadmap if applicable
5. Git commit (or provide command to user)

**Creating new files:**

- Active work → current/
- Analysis/review → studies/
- Phase summary → summaries/
- Old/deprecated → archive/

**Cross-referencing:**

- Use relative paths
- Link from MASTER-STATUS to all important docs
- Link summaries ↔ studies (bidirectional)

---

## 📋 J) Real Example: design-system-new-architecture

### Project Overview

**Goal:** Rebuild design system with proper 4-layer token architecture (Primitives → Core → Semantic → Component)

**Timeline:** January 22-23, 2026 (Phases 0-5 Prep complete)

**Status:** Phase 5 Prep DONE (438 tokens, 100% architecture complete) → Ready for React components

---

### Evolution: Chaos → Organization

**Initial State (Day 1):**

- Brainstorming session created
- Planning docs scattered
- Working sessions at root
- No clear structure

**Organized State (Day 2):**

```
design-system-new-architecture/
├── README.md                           # Navigation guide
├── MASTER-STATUS.md                    # Single source of truth
├── roadmap-implementation-v2.0.md      # Detailed plan
├── brainstorming-session-2026-01-22.md # Initial ideation
│
├── archive/                            # Completed work
│   ├── README.md
│   ├── pocs/                          # Performance tests (done)
│   ├── phase-0/                       # Intermediate summaries
│   ├── phase-2/                       # Planning docs (phase complete)
│   ├── v1-migration/                  # Migration complete
│   ├── tokens-source-v1/              # Old architecture
│   ├── sessions/                      # Historical work sessions
│   └── tools/                         # Deprecated scripts
│
├── current/                            # Active work (empty - clean!)
│   └── README.md
│
├── summaries/                          # Phase completions
│   ├── README.md
│   ├── phase-0-complete-summary.md
│   ├── phase-1-completion-summary.md
│   ├── phase-2-completion-summary.md
│   ├── phase-3-completion-summary.md
│   ├── phase-4-completion-summary.md
│   └── phase-5-preparation-complete-summary.md
│
└── studies/                            # Reference material
    ├── README.md
    ├── conformity-review-*.md
    ├── tokens-verification-*.md
    ├── proposition-*.md
    ├── phase-*-blocker-*.md
    ├── phase-5-preparation-plan.md
    ├── AI-ROUTINE-auto-update-docs.md
    ├── CHECKLIST-update-documentation.md
    └── MAINTENANCE-SYSTEM.md
```

---

### Key Files to Study

**For structure reference:**

1. **MASTER-STATUS.md** (782 lines)
   - Perfect example of comprehensive status tracking
   - Executive summary with progress bars
   - Phase-by-phase detailed sections
   - Metrics, risks, FAQs, immediate next actions

2. **README.md** (387 lines)
   - Navigation guide organized by use case
   - "How to find information" table
   - Quick start scenarios
   - Maintenance system docs

3. **Phase Summaries** (summaries/)
   - Each phase has comprehensive completion summary
   - Follows consistent template
   - Links to related studies and next phases

4. **Archive README.md** (250 lines)
   - Documents what was archived and why
   - Clear explanations of each subdirectory
   - Archive statistics table

5. **Studies/**
   - Mix of analysis, reviews, proposals, maintenance docs
   - Each serves a specific reference purpose

---

### Lessons from This Project

✅ **What worked well:**

1. **MASTER-STATUS as hub** - Everything linked from one document
2. **Clear phase boundaries** - Each phase has crisp start/end
3. **Aggressive archiving** - Old docs moved quickly, root stays clean
4. **Subdirectory READMEs** - Every directory explains itself
5. **Consistent naming** - phase-N-\* pattern makes scanning easy
6. **Studies vs Summaries** - Clear separation of purpose

⚠️ **What could improve:**

1. **Archive earlier** - Some intermediate docs lingered at root too long
2. **Standardize summary template** - Minor variations exist between phases
3. **Cross-links** - Could have more bidirectional links between summaries and studies

---

### Using This as a Template

**When starting your project, study these files:**

1. MASTER-STATUS.md - Copy structure, adapt sections
2. README.md - Copy quick start scenarios, adapt to your project
3. archive/README.md - Copy archive policy
4. summaries/phase-\*-completion-summary.md - Copy template structure
5. studies/MAINTENANCE-SYSTEM.md - Understand maintenance approach

**Don't copy verbatim** - Adapt to your project's needs, but follow the same organizational principles.

---

## ✅ K) Quick Reference Checklist

### New Project Setup Checklist

- [ ] Create project directory (kebab-case name)
- [ ] Copy \_PROJECT-TEMPLATE/ or create structure manually
- [ ] Create MASTER-STATUS.md with all required sections
- [ ] Fill in project description, current phase, objectives
- [ ] Create README.md with navigation guide
- [ ] Create archive/README.md with archive policy
- [ ] Create current/README.md with guidelines
- [ ] Create summaries/README.md with purpose
- [ ] Create studies/README.md with purpose
- [ ] Add project to main analysis/README.md index
- [ ] Create initial brainstorming/planning doc (if applicable)
- [ ] Git add and commit setup

---

### File Organization Checklist

**When creating a new file, ask:**

- [ ] What type of file is this? (summary, study, work-in-progress, archive)
- [ ] Where does it belong? (root, current, summaries, studies, archive)
- [ ] Does it follow naming conventions? (phase-N-\*, descriptive name, date if needed)
- [ ] Will people be able to find it? (linked from MASTER-STATUS or README?)
- [ ] Is it a duplicate? (check if similar doc already exists)

---

### Before Archiving Checklist

- [ ] Is the work 100% complete and validated?
- [ ] Is there a replacement document? (if superseded)
- [ ] Have I updated all links pointing to this file?
- [ ] Have I created/updated archive/[category]/README.md?
- [ ] Does the archive README explain why this was archived?
- [ ] Have I removed this from root/current if it was there?
- [ ] Have I updated MASTER-STATUS.md if this file was referenced?
- [ ] Is it clear where the current/active version is?

---

### Link Integrity Checklist

**Before committing document changes:**

- [ ] All links use relative paths (not absolute)
- [ ] All links have been tested (open in preview)
- [ ] MASTER-STATUS.md links to all important documents
- [ ] Phase summaries link to related studies
- [ ] Studies link back to relevant phase summaries
- [ ] Archived documents have links updated to new paths
- [ ] No broken links (404s)
- [ ] README.md "How to Find Information" table is up to date

---

### Phase Completion Checklist

**When completing a phase:**

- [ ] Create phase-N-completion-summary.md in summaries/
- [ ] Follow phase summary template structure
- [ ] Update MASTER-STATUS.md:
  - [ ] Change "Last Updated" date
  - [ ] Update phase status table
  - [ ] Update executive summary progress
  - [ ] Update current phase section
  - [ ] Add new "Immediate Next Actions"
- [ ] Update roadmap (if applicable)
- [ ] Move intermediate docs from current/ to archive/phase-N/
- [ ] Update archive/phase-N/README.md with what was archived
- [ ] Verify all links still work
- [ ] Git commit with descriptive message
- [ ] Report completion to team/user

---

### Documentation Health Checklist

**Monthly review (or after major changes):**

- [ ] MASTER-STATUS.md updated in last 7 days
- [ ] All phases have summaries in summaries/
- [ ] current/ directory is not cluttered (max 2-3 active files)
- [ ] Root directory has max 5-7 files
- [ ] All subdirectories have README.md files
- [ ] Archive is organized with clear explanations
- [ ] No duplicate documents in multiple locations
- [ ] Links are not broken
- [ ] Naming conventions are consistent
- [ ] README.md "How to Find Information" table is accurate

---

## 📞 Support & Questions

### For AI Agents

**If you encounter ambiguity:**

1. **Check existing docs first:**
   - MASTER-STATUS.md (project state)
   - This guide (PROJECT-ORGANIZATION-GUIDE.md)
   - Main analysis/README.md (workflow rules)

2. **If still unclear:**
   - Collect all questions
   - Organize by priority
   - Present to user in structured format (see Section I)

3. **Never guess:**
   - Wrong assumptions waste time
   - Ask user > implement wrong thing

---

### For Humans

**Questions about:**

- **Organization:** This guide (PROJECT-ORGANIZATION-GUIDE.md)
- **Workflow:** Main analysis/README.md
- **Specific project status:** Project's MASTER-STATUS.md
- **Code standards:** AGENTS.md (root of repo)
- **Git/PRs:** CONTRIBUTING.md (root of repo)

---

### Common Questions

**Q: Where do I put my new document?**
A: See Section I "Where to Put New Files" decision tree

**Q: When should I archive something?**
A: See Section G "When to Archive" decision tree

**Q: How do I structure a phase summary?**
A: See Section D "summaries/ Directory" → Summary Template

**Q: What's the difference between summaries/ and studies/?**
A:

- **summaries/** = What happened (completion records)
- **studies/** = Why/how (analysis, proposals, reviews)

**Q: Should MASTER-STATUS.md go in archive when project is done?**
A: No - MASTER-STATUS always stays at root, even for completed projects. Mark it as "🔵 Complete" status.

**Q: Can I have nested subdirectories in archive/?**
A: Yes - organize as needed (pocs/, phase-N/, sessions/, etc.)

**Q: What if I'm not sure which directory?**
A: Put in `current/` first, can move later once purpose is clear.

---

## 🎓 Additional Resources

### Related Documentation

**In this repo:**

- **AGENTS.md** - AI agent guidelines, code standards, architecture
- **CLAUDE.md** - Quick reference for Claude Code agent
- **CONTRIBUTING.md** - Git workflow, PR process
- **.github/instructions/multi-agent-documentation-maintenance.instructions.md** - How to keep AI docs in sync

**External:**

- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax reference
- [AGENTS.md Standard](https://agents.md/) - Multi-agent documentation standard

---

### Templates

**Full templates available in:**

- `_bmad-output/analysis/_PROJECT-TEMPLATE/` - Copy this for new projects

**Quick templates in this guide:**

- Section C: MASTER-STATUS.md template
- Section C: README.md template
- Section D: Phase summary template
- Section D: Archive README template
- Section D: Subdirectory README templates

---

## 📝 Maintenance

**This guide should be updated when:**

- New organizational patterns emerge
- Templates are improved
- New AI agent capabilities are added
- Common questions/pitfalls are discovered
- Real-world usage reveals better practices

**Update process:**

1. Discuss changes with team
2. Update this guide
3. Update \_PROJECT-TEMPLATE/ if structure changes
4. Update main analysis/README.md if workflow changes
5. Notify users of major changes

---

**Document Created:** 2026-01-24  
**Document Maintained By:** Project contributors and Mary (AI coordinator)  
**Status:** 🟢 Active Reference Guide  
**Next Review:** After 3 projects use this guide (gather feedback)  
**Version:** 1.0

---

## 🎉 You're Ready!

You now have everything you need to create well-organized analysis projects.

**Next steps:**

1. Review \_PROJECT-TEMPLATE/ directory
2. Start your new project using Section F workflow
3. Reference design-system-new-architecture/ as real example
4. Ask questions if anything is unclear

**Remember:** Good organization saves time. Invest 30 minutes in setup to save hours later.

Happy organizing! 🚀
