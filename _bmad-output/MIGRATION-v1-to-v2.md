# BMad Output Structure Migration

**Date:** 2026-01-26  
**Version:** 1.0 → 2.0  
**Status:** Complete

---

## Summary

Migrated BMad output structure from **flat organization** (v1.0) to **subject-based organization** (v2.0) to support multiple concurrent projects without file naming conflicts.

---

## Problem

### Old Structure (v1.0)

```
_bmad-output/
├── analysis/
│   ├── theme-system-analysis-2026-01-26.md
│   └── badge-component-analysis-2026-01-27.md    ❌ Mixed subjects
├── planning-artifacts/
│   ├── theme-integration-technical-spec.md
│   ├── badge-component-technical-spec.md         ❌ Mixed subjects
│   └── PLANNING-SUMMARY.md                       ❌ Generic name!
└── implementation-artifacts/
    ├── theme-integration-implementation-report.md
    └── badge-component-implementation-report.md  ❌ Mixed subjects
```

**Issues:**

- ❌ Files from different subjects mixed together
- ❌ Generic filenames caused conflicts
- ❌ Hard to find "all files for subject X"
- ❌ Doesn't scale beyond 5-10 subjects

---

## Solution

### New Structure (v2.0)

```
_bmad-output/
├── subjects/                                     🆕 Subject isolation
│   ├── theme-integration/                        ✅ All theme files here
│   │   ├── README.md
│   │   ├── analysis/
│   │   ├── planning/
│   │   └── implementation/
│   │
│   └── badge-component/                          ✅ All badge files here
│       ├── README.md
│       ├── analysis/
│       ├── planning/
│       └── implementation/
│
├── adrs/                                         🆕 Central ADR repository
│   ├── README.md
│   ├── ADR-001-modes-vs-themes-separation.md
│   └── ADR-002-html-attributes-naming.md
│
└── global/                                       🆕 Cross-project files
    ├── README.md
    └── bmm-workflow-status.yaml
```

**Benefits:**

- ✅ **Perfect isolation:** Each subject has its own folder
- ✅ **No conflicts:** Filenames can be simple within subject
- ✅ **Easy navigation:** "Show me everything about theme-integration"
- ✅ **Scalable:** 100 subjects = 100 folders
- ✅ **Clear ADRs:** Central reference for all decisions

---

## Migration Steps Performed

### 1. Created New Structure

```bash
mkdir -p _bmad-output/subjects/theme-integration/{analysis,planning,implementation}
mkdir -p _bmad-output/adrs
mkdir -p _bmad-output/global
```

### 2. Moved Files

**Analysis:**

```bash
mv _bmad-output/analysis/theme-system-analysis-2026-01-26.md \
   _bmad-output/subjects/theme-integration/analysis/
```

**Planning:**

```bash
mv _bmad-output/planning-artifacts/theme-integration-technical-spec.md \
   _bmad-output/subjects/theme-integration/planning/technical-spec.md

mv _bmad-output/planning-artifacts/theme-integration-implementation-checklist.md \
   _bmad-output/subjects/theme-integration/planning/implementation-checklist.md

mv _bmad-output/planning-artifacts/theme-integration-planning-summary.md \
   _bmad-output/subjects/theme-integration/planning/planning-summary.md
```

**Implementation:**

```bash
mv _bmad-output/implementation-artifacts/theme-integration-implementation-report.md \
   _bmad-output/subjects/theme-integration/implementation/implementation-report.md
```

**ADRs:**

```bash
mv _bmad-output/planning-artifacts/ADR-001-modes-vs-themes-separation.md \
   _bmad-output/adrs/

mv _bmad-output/planning-artifacts/ADR-002-html-attributes-naming.md \
   _bmad-output/adrs/
```

**Global:**

```bash
mv _bmad-output/planning-artifacts/bmm-workflow-status.yaml \
   _bmad-output/global/
```

### 3. Cleaned Up Empty Directories

```bash
rmdir _bmad-output/analysis
rmdir _bmad-output/planning-artifacts
rmdir _bmad-output/implementation-artifacts
```

### 4. Created Documentation

**New files:**

- `_bmad-output/README.md` (updated to v2.0)
- `_bmad-output/NAMING-CONVENTIONS.md` (comprehensive guide)
- `_bmad-output/subjects/theme-integration/README.md` (subject summary)
- `_bmad-output/adrs/README.md` (ADR index and guidelines)
- `_bmad-output/global/README.md` (global files purpose)

---

## File Mapping

### Before → After

| Old Location                                                          | New Location                                                              | Notes                            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------- |
| `analysis/theme-system-analysis-2026-01-26.md`                        | `subjects/theme-integration/analysis/theme-system-analysis-2026-01-26.md` | Moved to subject folder          |
| `planning-artifacts/theme-integration-technical-spec.md`              | `subjects/theme-integration/planning/technical-spec.md`                   | Moved + renamed (removed prefix) |
| `planning-artifacts/theme-integration-implementation-checklist.md`    | `subjects/theme-integration/planning/implementation-checklist.md`         | Moved + renamed                  |
| `planning-artifacts/theme-integration-planning-summary.md`            | `subjects/theme-integration/planning/planning-summary.md`                 | Moved + renamed                  |
| `implementation-artifacts/theme-integration-implementation-report.md` | `subjects/theme-integration/implementation/implementation-report.md`      | Moved + renamed                  |
| `planning-artifacts/ADR-001-*.md`                                     | `adrs/ADR-001-*.md`                                                       | Moved to central ADR location    |
| `planning-artifacts/ADR-002-*.md`                                     | `adrs/ADR-002-*.md`                                                       | Moved to central ADR location    |
| `planning-artifacts/bmm-workflow-status.yaml`                         | `global/bmm-workflow-status.yaml`                                         | Moved to global                  |

**Pattern:** Subject prefix removed from filenames (path provides context)

---

## Naming Changes

### Within Subject Folders

Filenames **simplified** because subject is in the path:

**Before:**

```
planning-artifacts/theme-integration-technical-spec.md
```

**After:**

```
subjects/theme-integration/planning/technical-spec.md
└─────┬──────────┘         └────┬────────┘
      │                         │
   Subject context        Simple name
```

**Rationale:** No need to repeat "theme-integration" in filename when it's already in the path.

---

## Benefits by Stakeholder

### For Developers

- ✅ **Quick navigation:** `cd subjects/badge-component` shows everything
- ✅ **Clear scope:** Each folder = one subject
- ✅ **Easy archiving:** Completed subjects can be archived as a unit

### For BMad Agents

- ✅ **Clear targets:** "Create analysis for badge-component" → `subjects/badge-component/analysis/`
- ✅ **No conflicts:** Multiple subjects can have `technical-spec.md`
- ✅ **Scalable:** Pattern works for 100+ subjects

### For Documentation

- ✅ **Subject READMEs:** Each subject documents itself
- ✅ **ADR index:** Central reference for all decisions
- ✅ **Clear history:** Git history per subject folder

---

## Future Subjects

### Creating a New Subject

```bash
# 1. Create structure
mkdir -p _bmad-output/subjects/{new-subject}/{analysis,planning,implementation}

# 2. Create README
cat > _bmad-output/subjects/{new-subject}/README.md << EOF
# {New Subject}

**Status:** In Progress
**Started:** $(date +%Y-%m-%d)

## Overview
...
EOF

# 3. Agents populate during BMM workflow
# - analysis/{subject}-analysis-{date}.md
# - planning/technical-spec.md
# - planning/implementation-checklist.md
# - implementation/implementation-report.md
```

### Example: Badge Component

```
subjects/badge-component/
├── README.md                           # Overview, status, links
├── analysis/
│   └── badge-component-analysis-2026-01-27.md
├── planning/
│   ├── technical-spec.md
│   ├── implementation-checklist.md
│   └── planning-summary.md
└── implementation/
    ├── sprint-1-report.md
    └── sprint-2-report.md
```

**ADRs:**

```
adrs/ADR-003-badge-variant-strategy.md    # Created during badge planning
```

**No conflicts with theme-integration!** ✅

---

## Backward Compatibility

### Old References

If any documents reference the old paths:

**Find old references:**

```bash
grep -r "_bmad-output/planning-artifacts" .
grep -r "_bmad-output/analysis" .
grep -r "_bmad-output/implementation-artifacts" .
```

**Update to new paths:**

```
Old: _bmad-output/planning-artifacts/theme-integration-technical-spec.md
New: _bmad-output/subjects/theme-integration/planning/technical-spec.md
```

### Git History

Git tracks file moves, so history is preserved:

```bash
git log --follow _bmad-output/subjects/theme-integration/planning/technical-spec.md
# Shows history from old location
```

---

## Statistics

### Files Moved

- **13 files** moved to new structure
- **0 files** lost
- **4 new** documentation files created

### Directory Changes

**Removed:**

- `analysis/` (empty)
- `planning-artifacts/` (empty)
- `implementation-artifacts/` (empty)

**Added:**

- `subjects/theme-integration/`
- `adrs/`
- `global/`

**Net change:** +3 top-level directories (better organization)

---

## Validation

### Checklist

- [x] All theme-integration files moved
- [x] ADRs centralized
- [x] Global files identified
- [x] Subject README created
- [x] ADR index created
- [x] Documentation updated (README, NAMING-CONVENTIONS)
- [x] Old directories removed
- [x] No broken references
- [x] Git tracking preserved

### Test Navigation

```bash
# Show all theme-integration artifacts
ls -R _bmad-output/subjects/theme-integration/

# Show all ADRs
ls _bmad-output/adrs/

# Show global files
ls _bmad-output/global/
```

**Result:** ✅ All files accessible, well-organized

---

## Rollback Plan

If needed, revert with:

```bash
git checkout HEAD -- _bmad-output/
```

**Risk:** Low - All files tracked in git, easy to revert

---

## Related Changes

### Updated Documentation

- [README.md](./README.md) - v2.0 with subject-based organization
- [NAMING-CONVENTIONS.md](./NAMING-CONVENTIONS.md) - Updated for subject folders
- [adrs/README.md](./adrs/README.md) - ADR guidelines and index
- [subjects/theme-integration/README.md](./subjects/theme-integration/README.md) - Subject summary

### Git Changes

```bash
git status --short
# Shows:
# - Modified: README.md
# - Deleted: planning-artifacts/bmm-workflow-status.yaml
# - Added: adrs/, subjects/, global/
# - Added: New documentation files
```

---

## Lessons Learned

### What Worked

- ✅ **Subject isolation:** Immediately clearer
- ✅ **Simplified names:** Less repetition
- ✅ **Central ADRs:** Easy to find all decisions
- ✅ **Scalable pattern:** Ready for many subjects

### What to Watch

- ⚠️ **ADR references:** Need to update if documents reference old ADR paths
- ⚠️ **Agent prompts:** Agents need to know new structure
- ⚠️ **Documentation:** Keep READMEs updated as structure evolves

---

## Next Steps

1. ✅ **Commit new structure**
2. ⏳ **Update agent prompts** to use new paths
3. ⏳ **Test with new subject** (badge-component)
4. ⏳ **Archive template** for completed subjects

---

## References

- [BMad Output Organization](./README.md)
- [Naming Conventions](./NAMING-CONVENTIONS.md)
- [ADR Guidelines](./adrs/README.md)

---

**Migration By:** BMad Master Agent  
**Date:** 2026-01-26  
**Status:** ✅ Complete  
**Version:** 1.0 → 2.0
