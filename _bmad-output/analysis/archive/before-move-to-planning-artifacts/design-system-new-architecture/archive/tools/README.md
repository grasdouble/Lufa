# Tools Archive

**Archive Date:** January 23, 2026  
**Purpose:** Archived automation tools superseded by AI routine

---

## 📁 Archived Tools

### update-docs-after-phase.sh

**Type:** Bash script  
**Created:** January 2026  
**Purpose:** Interactive script to help update documentation after phase completion

**What it did:**
- Prompted for phase number, token count, date
- Calculated metrics (total, percentage)
- Generated pre-filled snippets for MASTER-STATUS.md
- Generated pre-filled snippets for roadmap-implementation-v2.0.md
- Provided git commit command

**Why archived:**
- ✅ Superseded by **AI-ROUTINE-auto-update-docs.md** (automatic updates)
- ✅ AI routine is more flexible and intelligent
- ✅ AI detects inconsistencies and adapts to context
- ✅ Script was only generating templates to copy-paste
- ✅ CHECKLIST-update-documentation.md provides manual fallback

---

## 🔄 Current Workflow (AI-Based)

After completing a phase, **Mary (AI)** automatically:

1. Creates `phase-X-completion-summary.md`
2. Calculates metrics (token count, percentage)
3. Updates `MASTER-STATUS.md`
4. Updates `roadmap-implementation-v2.0.md`
5. Verifies consistency between documents
6. Provides ready-to-use git commands

**User action:** Review changes + git commit ✅

See: `_bmad-output/analysis/AI-ROUTINE-auto-update-docs.md`

---

## 🛟 Manual Fallback (If AI Unavailable)

If AI routine is unavailable, use:

**Option 1:** CHECKLIST (Recommended)
- File: `_bmad-output/analysis/CHECKLIST-update-documentation.md`
- Step-by-step guide with specific sections to update
- Includes verification checklist

**Option 2:** This Script (Archived)
- Restore from archive if needed
- Run: `bash update-docs-after-phase.sh`
- Follow generated snippets

---

## 📊 Comparison: Script vs AI

| Feature                    | Bash Script | AI Routine |
| -------------------------- | ----------- | ---------- |
| **Generate snippets**      | ✅          | ✅         |
| **Calculate metrics**      | ✅          | ✅         |
| **Understand context**     | ❌          | ✅         |
| **Detect inconsistencies** | ❌          | ✅         |
| **Adapt to changes**       | ❌          | ✅         |
| **Interactive Q&A**        | Basic       | Advanced   |
| **Error handling**         | Limited     | Smart      |
| **Maintenance**            | Manual      | Self-updating |

---

## 🔧 How to Restore (If Needed)

If you need to use the script again:

```bash
# Copy back to scripts/
cp _bmad-output/analysis/archive/tools/update-docs-after-phase.sh scripts/

# Make executable
chmod +x scripts/update-docs-after-phase.sh

# Run
bash scripts/update-docs-after-phase.sh
```

---

## 📚 Related Documentation

**Active:**
- `_bmad-output/analysis/AI-ROUTINE-auto-update-docs.md` - Automatic AI routine ⭐
- `_bmad-output/analysis/CHECKLIST-update-documentation.md` - Manual checklist
- `_bmad-output/analysis/MAINTENANCE-SYSTEM.md` - Complete maintenance system

**Archived:**
- This tool (bash script)

---

## 🎯 Recommendation

**Use AI Routine** (automatic, intelligent, context-aware)

**Fallback to CHECKLIST** if AI unavailable (step-by-step manual process)

**Restore Script** only if absolutely necessary (rare edge case)

---

**Archived By:** Mary (AI Business Analyst) + Noofreuuuh  
**Reason:** Superseded by more powerful AI-based automation  
**Status:** 📦 Archived (available if needed)  
**Restoration:** Copy back to scripts/ if required

---

**Note:** This script was a good intermediate step towards full automation. The AI routine builds on the same concepts but provides better flexibility and intelligence. The script is preserved here for reference and emergency fallback.
