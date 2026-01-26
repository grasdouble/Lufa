# Global Configuration & Tracking

This directory contains files that track project-wide concerns across all subjects.

## Contents

### bmm-workflow-status.yaml

**Purpose:** Tracks BMM (Business Motivation Model) workflow progress across the entire project.

**What it tracks:**

- Project type and context
- Selected workflow track
- Phase completion (Analysis, Planning, Solutioning, Implementation)
- Workflow items and their status

**When to update:**

- When completing a major workflow phase
- When starting a new project track
- At sprint boundaries

**Example:**

```yaml
workflow_status: 'in_progress'
project: 'Lufa'
project_type: 'Design System v2.0'
```

**Location:** This is a **singleton** - only one file for the entire project.

---

## Guidelines

### What Goes Here

Files in this directory should be:

- ✅ **Cross-cutting:** Affect multiple subjects
- ✅ **Global state:** Track project-wide progress
- ✅ **Singleton:** Only one instance needed
- ✅ **Reference data:** Used by multiple subjects

### What Does NOT Go Here

- ❌ Subject-specific files (use `subjects/{name}/`)
- ❌ ADRs (use `adrs/`)
- ❌ Temporary files (use `tmp/`)
- ❌ Analysis/planning/implementation docs (use `subjects/{name}/{phase}/`)

---

## Relationship to Other Directories

```
_bmad-output/
├── global/                # THIS - Project-wide tracking
│   └── bmm-workflow-status.yaml
│
├── adrs/                  # Global decisions (not state)
│   └── ADR-*.md
│
└── subjects/              # Subject-specific everything
    └── {subject}/
        ├── analysis/
        ├── planning/
        └── implementation/
```

---

**Maintained by:** BMad Master Agent  
**Last Updated:** 2026-01-26
