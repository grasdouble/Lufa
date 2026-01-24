# 📁 {Project Name}

> **Brief Description:** {1-2 sentence description of what this project is about and what problem it solves}

**Status:** {🟢 Active | 🟡 On Hold | 🔵 Complete}  
**Start Date:** {YYYY-MM-DD}  
**Current Phase:** {Phase N - Phase Name}

---

## 🎯 Main Documents (Consult Regularly)

### 1. ⭐ MASTER-STATUS.md

**Role:** Current project status - Quick reference

**When to consult:**

- 🚀 Starting a session → "Where are we?"
- 💬 Someone asks for status
- 📊 Need quick metrics
- ✅ See next immediate actions

**Contains:**

- Executive summary with progress
- Phase status overview (table)
- Detailed phase sections
- Immediate next actions

**Last Updated:** {YYYY-MM-DD}

---

### 2. roadmap-{version}.md (Optional)

**Role:** Detailed complete plan - All phases

**When to consult:**

- 📅 Planning a new phase
- 🔍 Understanding phase details
- 📝 Seeing all tasks for a phase
- 🎯 Understanding future phases

**Contains:**

- Complete phase breakdown (0-N)
- Tasks and deliverables per phase
- Dependencies and timeline
- Success criteria and risks

---

### 3. brainstorming-session-{date}.md (Optional)

**Role:** Initial planning and ideation

**When to consult:**

- 🧠 Understanding initial decisions
- 🎯 Seeing alternatives considered
- 📖 Historical context of project

---

## 📂 Directory Structure

```
{project-name}/
├── README.md           - This file (navigation guide)
├── MASTER-STATUS.md    - Single source of truth
├── roadmap-*.md        - Optional: Detailed plan
├── archive/            - Completed work, historical records
├── current/            - Active work in progress
├── summaries/          - Phase completion summaries
└── studies/            - Detailed analysis and reviews
```

---

## 🚀 Quick Start Guide

### Scenario 1: "I'm starting a work session"

```
1. Open MASTER-STATUS.md
2. Read "Executive Summary" (30 seconds)
3. See "What's Next" section
4. Follow "Immediate Next Actions"
```

---

### Scenario 2: "I just finished Phase {N}"

```
1. Create phase-{N}-completion-summary.md in summaries/
2. Update MASTER-STATUS.md (status, progress, next steps)
3. Update roadmap-{version}.md if applicable
4. Move intermediate docs to archive/phase-{N}/
5. Git commit with clear message
```

---

### Scenario 3: "I want to plan Phase {N+1}"

```
1. Open MASTER-STATUS.md → See "What's Next"
2. Open roadmap-{version}.md → Find Phase {N+1} section
3. Review phase objectives and deliverables
4. Create work plan in current/ or studies/
5. Update MASTER-STATUS with phase start
```

---

### Scenario 4: "Someone asks for project status"

```
1. Open MASTER-STATUS.md
2. Share "Executive Summary" section
3. Or point them to MASTER-STATUS.md directly
```

---

## 📊 How to Find Information

| Question                         | Document to Consult                       |
| -------------------------------- | ----------------------------------------- |
| Where is the project?            | MASTER-STATUS.md (Executive Summary)      |
| What's the current phase?        | MASTER-STATUS.md (header)                 |
| What's next?                     | MASTER-STATUS.md (What's Next)            |
| How do I start Phase {N}?        | MASTER-STATUS.md (Immediate Next Actions) |
| Details on completed Phase {N}?  | summaries/phase-{N}-completion-summary.md |
| Why was decision X made?         | studies/ or brainstorming-session-\*.md   |
| What's archived?                 | archive/README.md                         |
| {Add project-specific questions} | {Add project-specific answers}            |

---

## 🤖 AI Agent Guidelines

### Quick Start for AI Agents

**Step 1: Orient**

```bash
# Always start here
Read: MASTER-STATUS.md

# Extract:
- Current phase
- Last completed actions
- Next steps
- Blockers/questions
```

**Step 2: Understand Context**

```bash
# If you need phase details
Read: summaries/phase-N-completion-summary.md

# If you need analysis
Read: studies/[relevant-study].md
```

**Step 3: Execute or Plan**

- Coordinate work (if Mary/coordinator)
- Implement tasks (if subagent)
- Report back with status

---

### Where to Put New Files

- **Phase summary** → `summaries/phase-N-completion-summary.md`
- **Active work** → `current/phase-N-work-in-progress.md`
- **Analysis/review** → `studies/[type]-[topic].md`
- **Completed work** → `archive/[category]/`
- **Planning** → root level (e.g., `brainstorming-session-{date}.md`)

---

## 📝 Conventions

### File Naming

- **MASTER-STATUS.md** - ALL CAPS = central document
- **phase-N-{descriptor}.md** - Phase summaries
- **{type}-{topic}.md** - Studies (analysis-, review-, proposal-)
- **YYYY-MM-DD-{name}.md** - Dated documents (sessions, snapshots)

### Documentation Update

- **Frequency:** After each phase completion or major milestone
- **Responsible:** {Team member names or "Project lead + AI coordinator"}
- **Verification:** Check MASTER-STATUS ↔ Roadmap consistency

---

## 🔗 Related Documentation

**Project-Level:**

- {Link to main repo documentation}
- {Link to technical specs}
- {Link to design docs}

**Monorepo-Level:**

- [AGENTS.md](../../AGENTS.md) - AI agent guidelines and code standards
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Git workflow and PR process

---

## 📞 Support & Questions

**For AI Agents:**

- Check MASTER-STATUS.md first
- Then check this README
- Then check main analysis/README.md
- If still unclear: Ask user with structured questions

**For Humans:**

- Organization: See PROJECT-ORGANIZATION-GUIDE.md
- Project status: See MASTER-STATUS.md
- Code standards: See AGENTS.md (repo root)

---

## 📈 Project Health Indicators

**Healthy project =**

- ✅ MASTER-STATUS.md updated recently (<7 days)
- ✅ All completed phases have summaries
- ✅ current/ directory is clean (≤3 files)
- ✅ Root directory is scannable (≤7 files)
- ✅ Archive is organized with READMEs

**Warning signs =**

- ❌ MASTER-STATUS.md outdated (>2 weeks)
- ❌ Phase complete but no summary
- ❌ current/ cluttered (>5 files)
- ❌ Broken links
- ❌ Duplicate documents

---

**Document Maintained By:** {Your name or team}  
**Last Updated:** {YYYY-MM-DD}  
**Status:** 🟢 Active  
**Next Review:** {After major milestone or monthly}

---

## ✨ Getting Started

**This is a template. To use it:**

1. **Copy this entire directory structure** to your new project location
2. **Replace all {placeholders}** with your actual project information
3. **Delete this section** (Getting Started)
4. **Fill in MASTER-STATUS.md** with your project details
5. **Update main analysis/README.md** to include your project
6. **Start working!**

**Need help?** See `PROJECT-ORGANIZATION-GUIDE.md` for detailed instructions.
