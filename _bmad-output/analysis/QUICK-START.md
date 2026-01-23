# 🚀 Quick Start - Creating a New Analysis Project

> **This is a 5-minute quick reference. For full details, see [PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md)**

---

## ⚡ Fast Setup (3 steps)

### Step 1: Copy Template

```bash
cd _bmad-output/analysis/
cp -r _PROJECT-TEMPLATE your-project-name
cd your-project-name/
```

**Naming:** Use `kebab-case` (lowercase with hyphens)

---

### Step 2: Fill In Templates

**Replace all `{placeholders}` in these files:**

1. **MASTER-STATUS.md** (most important)
   - Project name and description
   - Current phase (start with Phase 0)
   - Objectives and next actions

2. **README.md**
   - Project description
   - Customize quick start scenarios
   - Update "How to Find Information" table

3. **All README.md files in subdirectories**
   - Replace `{project name}` with actual name
   - Replace `{placeholders}` with your info
   - Delete "Customization Guide" sections

**Optional:**

- Create `brainstorming.md` if you had a planning session

---

### Step 3: Update Main Index

**Edit:** `_bmad-output/analysis/README.md`

**Add to "Active Projects" table:**

```markdown
| `your-project-name/` | 🟢 Phase 0 | Phase 0 - Setup | YYYY-MM-DD | `MASTER-STATUS.md` |
```

**Add to "Project Details" section:**

```markdown
#### 🎨 Your Project Name

**Goal:** Brief description of what this project does

**Progress:**

- ⏳ Phase 0: Setup

**Next Steps:**

1. Define objectives
2. Create roadmap
3. Start Phase 1
```

---

### Step 4: Git Commit

```bash
git add _bmad-output/analysis/your-project-name/
git add _bmad-output/analysis/README.md
git commit -m "docs(analysis): initialize [your-project-name] analysis project"
```

---

## ✅ Verification Checklist

Before you start working:

- [ ] Copied \_PROJECT-TEMPLATE to new directory
- [ ] Replaced all {placeholders} in MASTER-STATUS.md
- [ ] Replaced all {placeholders} in README.md
- [ ] Replaced {placeholders} in subdirectory READMEs
- [ ] Deleted "Customization Guide" sections
- [ ] Updated main analysis/README.md
- [ ] Git committed the setup
- [ ] Opened MASTER-STATUS.md and it makes sense

---

## 📂 Required Files (All Created by Template)

```
your-project-name/
├── MASTER-STATUS.md          ✅ Single source of truth
├── README.md                 ✅ Navigation guide
├── archive/README.md         ✅ Archive policy
├── current/README.md         ✅ Active work guidelines
├── summaries/README.md       ✅ Phase summary index
└── studies/README.md         ✅ Study document index
```

---

## 🎯 What to Do Next

### After Setup

1. **Define Phase 0 objectives** in MASTER-STATUS.md
2. **Create initial planning** (optional brainstorming.md)
3. **Start working** on first tasks
4. **Update MASTER-STATUS.md** regularly

### As You Work

1. **Put active work** in `current/`
2. **Create phase summaries** in `summaries/` when phases complete
3. **Create studies** in `studies/` for detailed analysis
4. **Archive completed work** in `archive/` when done
5. **Update MASTER-STATUS.md** after every major milestone

---

## 🤖 For AI Agents

### Essential Reading

**📖 [AI-AGENT-RULES.md](AI-AGENT-RULES.md)** - Complete operational guide for AI agents

**Before starting work on any analysis project:**

```bash
# Step 1: Read project status
Read: _bmad-output/analysis/your-project-name/MASTER-STATUS.md

# Step 2: Read navigation guide
Read: _bmad-output/analysis/your-project-name/README.md

# Step 3: Follow delegation patterns
# See AI-AGENT-RULES.md Section F for Mary Coordinator workflow
```

**Quick File Placement:**

- Phase summary → `summaries/phase-N-completion-summary.md`
- Active work → `current/phase-N-work-in-progress.md`
- Analysis → `studies/analysis-topic.md`
- Completed → `archive/category/`

**Full decision tree:** [AI-AGENT-RULES.md § C](AI-AGENT-RULES.md#c-file-placement-decision-tree)

**Delegation rules:** [AI-AGENT-RULES.md § F](AI-AGENT-RULES.md#f-delegation-rules-mary-coordinator-pattern)

---

## 📚 Resources

**Full Documentation:**

- [PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md) - Complete guide (1754 lines)
- [\_PROJECT-TEMPLATE/](_PROJECT-TEMPLATE/) - Template directory
- [design-system-new-architecture/](design-system-new-architecture/) - Real example

**Specific Topics:**

- Section B: Directory structure template
- Section C: Required files (MASTER-STATUS, README)
- Section F: Step-by-step workflow
- Section J: Real example walkthrough

**Checklists:**

- Section K: New project setup checklist
- Section K: File organization checklist
- Section K: Before archiving checklist
- Section K: Link integrity checklist

---

## 💡 Pro Tips

1. **Start simple** - Don't overthink Phase 0. Just set up structure and start working.
2. **Update regularly** - MASTER-STATUS.md should be updated after every completed task or daily.
3. **Archive aggressively** - Keep root clean. Move old docs to archive/ quickly.
4. **Use real example** - Look at `design-system-new-architecture/` when in doubt.
5. **Document as you go** - Don't wait until the end to create summaries.

---

## ❓ Common Questions

**Q: Do I need all these directories?**
A: Yes, but they can start empty. Structure prevents chaos later.

**Q: What if I don't know all phases yet?**
A: Start with Phase 0 and 1. Add more as you learn.

**Q: Can I modify the template structure?**
A: Yes, but keep the core: MASTER-STATUS, README, and 4 subdirectories.

**Q: Where do I put {specific file type}?**
A: See [PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md) Section I (decision trees).

**Q: What's the difference between summaries/ and studies/?**
A:

- **summaries/** = What happened (completion records, one per phase)
- **studies/** = Why/how (analysis and reference, as needed)

---

**You're ready to start! 🎉**

**Next:** Fill in MASTER-STATUS.md with your Phase 0 objectives and start working.

**Need help?** See [PROJECT-ORGANIZATION-GUIDE.md](PROJECT-ORGANIZATION-GUIDE.md) for comprehensive instructions.
