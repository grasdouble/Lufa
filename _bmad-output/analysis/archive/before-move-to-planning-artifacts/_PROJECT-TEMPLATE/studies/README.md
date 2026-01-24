# Studies and Analysis Documents

This directory contains detailed analysis, verification, and review documents that support the {project name}.

---

## 📋 Purpose

Study documents provide:

- **In-depth analysis** of design decisions
- **Verification and conformity reviews** of implementations
- **Brainstorming sessions** and ideation (beyond initial planning)
- **Maintenance procedures** and routines
- **Technical documentation reviews**
- **Blocker analysis** and resolution strategies
- **Proposals** for improvements or changes

---

## 📂 Files

{This section will be populated as studies are created. Update this as you add documents:}

### Analysis & Reviews

- `conformity-review-{topic}.md` - Review comparing plans vs implementation
- `tokens-verification-{topic}.md` - Verification of structure/implementation
- `analysis-{topic}.md` - In-depth analysis of specific topic

### Planning & Proposals

- `proposition-{topic}.md` - Proposal for improvements/changes
- `phase-N-preparation-plan.md` - Detailed preparation plan for phase
- `phase-N-blocker-{issue}.md` - Analysis of specific blockers

### Maintenance & Procedures

- `MAINTENANCE-SYSTEM.md` - Overall maintenance system documentation
- `CHECKLIST-{task}.md` - Checklists for recurring tasks
- `AI-ROUTINE-{task}.md` - Automated routines for AI agents

---

## 📚 Document Types

### 1. Analysis Documents (`analysis-*.md`)

**Purpose:** In-depth examination of a topic

**When to create:**

- Need to understand something deeply
- Researching alternatives
- Comparative analysis needed

**Contains:**

- Problem statement
- Research findings
- Comparative analysis
- Recommendations

---

### 2. Verification Documents (`verification-*.md`, `conformity-review-*.md`)

**Purpose:** Validate implementation against requirements

**When to create:**

- After major implementation milestone
- Before phase completion
- Quality assurance checks

**Contains:**

- Requirements checklist
- Implementation validation
- Gaps identified
- Conformity percentage

---

### 3. Proposals (`proposition-*.md`, `proposal-*.md`)

**Purpose:** Ideas for improvements or changes

**When to create:**

- Identified improvement opportunity
- Alternative approach discovered
- Optimization needed

**Contains:**

- Current state analysis
- Proposed solution
- Pros/cons comparison
- Implementation strategy

---

### 4. Blocker Analysis (`phase-N-blocker-*.md`)

**Purpose:** Deep dive into specific blockers

**When to create:**

- Significant blocker encountered
- Root cause analysis needed
- Multiple solution paths exist

**Contains:**

- Blocker description
- Root cause analysis
- Solution options
- Recommended path forward

---

### 5. Maintenance Documents (`MAINTENANCE-*.md`, `CHECKLIST-*.md`)

**Purpose:** System maintenance procedures

**When to create:**

- Recurring process identified
- Quality checks needed
- Automation opportunities

**Contains:**

- Procedure steps
- Validation checks
- Automation scripts/tools
- Troubleshooting guide

---

### 6. Planning Documents (`phase-N-preparation-plan.md`)

**Purpose:** Detailed phase planning before phase starts

**When to create:**

- Before starting new phase
- Complex phase with many unknowns
- Need detailed task breakdown

**Contains:**

- Phase objectives
- Detailed task list
- Dependencies
- Risk assessment

---

## 📛 Naming Conventions

Use descriptive names with consistent prefixes:

- `analysis-{topic}.md` - Analysis documents
- `conformity-review-{topic}.md` - Review documents
- `verification-{topic}.md` - Verification checks
- `proposition-{topic}.md` - Proposals
- `proposal-{topic}.md` - Alternative spelling
- `phase-N-blocker-{issue}.md` - Blocker analysis
- `phase-N-preparation-plan.md` - Phase planning
- `MAINTENANCE-{topic}.md` - Maintenance docs (uppercase)
- `CHECKLIST-{task}.md` - Checklists (uppercase)
- `AI-ROUTINE-{task}.md` - AI automation (uppercase)

**Include context in names:**

- ✅ `conformity-review-token-architecture.md` (clear)
- ❌ `review.md` (too vague)

---

## ✅ Guidelines

### Studies vs. Summaries

**Study (studies/):**

- **Why/how** - Deep analysis
- **Reference material** - Consulted as needed
- **Can be created anytime** - During or after work

**Summary (summaries/):**

- **What happened** - Completion record
- **Historical record** - One per phase
- **Created after completion** - Phase is done

---

### Studies vs. Current Work

**Study (studies/):**

- **Finalized** - Document is complete
- **Reference** - Used for decision-making
- **Permanent** - Doesn't change (append addendums if needed)

**Current Work (current/):**

- **Draft** - Still being written
- **Active editing** - Changes frequently
- **Temporary** - Will move to studies/ or archive/ when done

---

## 🔗 Usage

These documents are reference materials for:

- **Understanding reasoning** behind architectural decisions
- **Verifying conformity** of implementations
- **Planning future work** with detailed preparation
- **Maintaining consistency** with documented procedures
- **Troubleshooting issues** with blocker analysis
- **Proposing improvements** with structured proposals

---

## 📊 Study Statistics

{Update this as studies are created}

| Category                 | Count   | Latest Update  |
| ------------------------ | ------- | -------------- |
| Analysis & Reviews       | {X}     | YYYY-MM-DD     |
| Planning & Proposals     | {X}     | YYYY-MM-DD     |
| Maintenance & Procedures | {X}     | YYYY-MM-DD     |
| **Total**                | **{X}** | **YYYY-MM-DD** |

---

## 🔗 Related Documents

- **Project status:** `../MASTER-STATUS.md` - Links to key studies
- **Phase summaries:** `../summaries/` - High-level completion records
- **Active work:** `../current/` - Work in progress
- **Historical archives:** `../archive/` - Deprecated studies

---

## 🎯 Quick Reference

**Finding specific information:**

| Question                         | Where to Look                          |
| -------------------------------- | -------------------------------------- |
| Why was decision X made?         | `analysis-{topic}.md` or phase summary |
| How does implementation conform? | `conformity-review-*.md`               |
| What's the plan for Phase N?     | `phase-N-preparation-plan.md`          |
| How do I handle task X?          | `CHECKLIST-{task}.md`                  |
| What caused blocker Y?           | `phase-N-blocker-{issue}.md`           |
| How do we maintain Z?            | `MAINTENANCE-{topic}.md`               |

---

**Location:** `_bmad-output/analysis/{project-name}/studies/`  
**Maintained By:** {Project team}  
**Last Updated:** {YYYY-MM-DD}

---

## 🎨 Customization Guide

**This is a template. To customize:**

1. **Replace {placeholders}** with your project information
2. **Update "Files" section** as you create studies
3. **Update "Study Statistics" table** periodically
4. **Adjust document types** if you have project-specific needs
5. **Delete this section** (Customization Guide) when you start using this

**Pro tip:** Create studies as you go - don't wait until the end. Document decisions when they're made, not after you've forgotten why.
