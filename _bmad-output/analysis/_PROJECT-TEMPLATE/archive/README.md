# Archives - {Project Name}

This directory contains archived documentation from previous versions, completed development phases, and working sessions.

**Last Updated:** {YYYY-MM-DD}

---

## 📦 Directory Structure

```
archive/
├── README.md              # This file
├── pocs/                  # Proof of concepts (completed)
├── phase-N/               # Old phase documents
├── sessions/              # Historical work sessions
├── tools/                 # Deprecated automation
├── v1-migration/          # Migration docs (if applicable)
└── {other-categories}/    # Project-specific archives
```

---

## 📁 Archive Contents

{This section will be populated as work is archived. For each archived category, add:}

### 1. {category-name}/ ({X} files)

**{Brief description of what's in this archive category}**

**Files:**

- `{filename1}` - {Description}
- `{filename2}` - {Description}
- `{filename3}` - {Description}

**Why archived:** {Reason for archiving}

**Active replacement:** {Link to current/active version if applicable}

**Archived on:** {YYYY-MM-DD}

---

### 2. {category-name}/ ({X} files)

{Same structure as above}

---

## 📝 Archive Policy

### When to Archive

✅ **Archive when:**

- Phase is 100% complete (all deliverables validated)
- Documentation superseded by comprehensive version
- POCs completed (keep results, archive experiments)
- Migration finished
- Old architecture replaced
- Session work concluded
- Tools deprecated (better solution exists)

❌ **Don't archive:**

- Documents still referenced frequently
- Active phase work
- Current implementation code
- Living documentation that gets updated
- MASTER-STATUS.md (never archived - stays at root even when project complete)

---

### What to Preserve

✅ **Keep in archive:**

- Decision-making context
- Historical references
- Migration mappings
- Visual previews/POCs
- Session records
- Intermediate drafts (if they provide context)

❌ **Don't keep:**

- Duplicate files
- Temporary scratch files
- Files with no historical value
- Broken/incomplete experiments

---

### How to Archive

**Steps:**

1. Create subdirectory in archive/ for category (e.g., `archive/phase-2/`)
2. Move files from root/current/studies to archive subdirectory
3. Create or update archive/category/README.md explaining what was archived and why
4. Update this main archive/README.md with new category
5. Update any links in active documents pointing to archived files
6. Update MASTER-STATUS.md if archived file was referenced
7. Git commit with message: `docs(archive): archive {category} - {reason}`

---

## 🔍 Quick Reference

| Need                              | Archive Location        |
| --------------------------------- | ----------------------- |
| {Specific need 1}                 | `{category}/`           |
| {Specific need 2}                 | `{category}/{filename}` |
| {Specific need 3}                 | `{category}/`           |
| Old {something} reference         | `{category}/`           |
| {Project-specific archive lookup} | `{category}/{filename}` |

---

## 📊 Archive Statistics

{Update this table as archives grow}

| Category  | Files   | Total Size   | Oldest Date    | Newest Date    |
| --------- | ------- | ------------ | -------------- | -------------- |
| pocs/     | {X}     | {~XX KB}     | YYYY-MM-DD     | YYYY-MM-DD     |
| phase-N/  | {X}     | {~XX KB}     | YYYY-MM-DD     | YYYY-MM-DD     |
| sessions/ | {X}     | {~XX KB}     | YYYY-MM-DD     | YYYY-MM-DD     |
| {other}/  | {X}     | {~XX KB}     | YYYY-MM-DD     | YYYY-MM-DD     |
| **Total** | **{X}** | **{~XX KB}** | **YYYY-MM-DD** | **YYYY-MM-DD** |

---

## 🎯 Active Documentation

For current project status and documentation, see:

**Main Documents:**

- `../MASTER-STATUS.md` - Current status
- `../README.md` - Project navigation
- `../roadmap-{version}.md` - Implementation plan {if applicable}

**Active Work:**

- `../current/` - Work in progress
- `../summaries/` - Phase completion summaries
- `../studies/` - Reference analysis documents

---

## 🔗 Related Documentation

- **Main project folder:** `../` (parent directory)
- **Archive policy:** This README
- **Organization guide:** `../../PROJECT-ORGANIZATION-GUIDE.md`

---

**Archive Maintained By:** {Name/Team}  
**Archive Location:** `_bmad-output/analysis/{project-name}/archive/`  
**Status:** 🟢 Active Archive (regularly updated)  
**Next Archive:** {After Phase {N} completion or as needed}

---

## 🎨 Customization Guide

**This is a template. To customize:**

1. **Replace {placeholders}** with your project information
2. **Add archive categories** as your project grows (pocs/, phase-N/, etc.)
3. **Update "Archive Contents" section** when you archive files
4. **Update statistics table** periodically
5. **Delete this section** (Customization Guide) when you start using this

**This README should be a living document** - update it every time you archive something.

**First archiving?** You can leave most sections empty until you actually have something to archive.
