# Subject Template

**Copy this template when creating a new subject.**

---

# {Subject Name}

**Status:** 🔵 Planning | 🟡 In Progress | 🟢 Complete | 🔴 Blocked  
**Started:** YYYY-MM-DD  
**Completed:** YYYY-MM-DD (if complete)  
**Type:** Feature | Bug Fix | Refactor | Architecture | Migration

---

## Overview

Brief description of what this subject is about (2-3 sentences).

### Problem

What problem does this subject solve?

### Solution

High-level solution approach.

---

## Deliverables

### Code

- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

### Documentation

- [ ] Technical spec
- [ ] Implementation checklist
- [ ] Implementation report
- [ ] User-facing docs (if applicable)

---

## Project Structure

```
subjects/{subject-name}/
├── README.md (this file)
├── analysis/
│   └── {subject}-analysis-{date}.md
├── planning/
│   ├── technical-spec.md
│   ├── implementation-checklist.md
│   └── planning-summary.md
└── implementation/
    └── implementation-report.md
```

---

## Key Decisions

### [ADR-XXX](../../adrs/ADR-XXX-{decision}.md): {Decision Title}

**Decision:** Brief summary

**Rationale:** Why this decision was made

**Impact:** What changed as a result

---

## Architecture

### Packages Affected

- **`@package/name`:** What changed
- **`@package/other`:** What changed

### Data Flow

```
User Action
    ↓
Component/Hook
    ↓
State/API
    ↓
Result
```

---

## Implementation Timeline

**Phase 1: Analysis** (Date range)

- [x] Analysis complete

**Phase 2: Planning** (Date range)

- [x] Technical spec
- [x] ADRs
- [x] Implementation checklist

**Phase 3: Implementation** (Date range)

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

**Phase 4: Documentation** (Date range)

- [ ] User docs
- [ ] Migration guide

---

## Testing

### Test Cases

- [ ] Test case 1
- [ ] Test case 2
- [ ] Test case 3

### Test Results

| Test              | Status  | Notes |
| ----------------- | ------- | ----- |
| Unit tests        | ✅ Pass |       |
| Integration tests | ✅ Pass |       |
| E2E tests         | ✅ Pass |       |

---

## Files Created/Modified

### Created (X files)

```
path/to/new-file.ts
path/to/another-file.ts
```

### Modified (X files)

```
path/to/existing-file.ts
path/to/another-existing.ts
```

---

## Metrics

- **Code:** +XXX / -XXX lines
- **Documentation:** XXX lines
- **ADRs:** X decisions
- **Duration:** X days/weeks
- **Process:** BMad Method | Agile | Ad-hoc

---

## Breaking Changes

### Change 1

**Before:**

```typescript
// Old code
```

**After:**

```typescript
// New code
```

**Migration:** Steps to migrate

---

## Next Steps

### Immediate

1. Task 1
2. Task 2

### Future

1. Future enhancement 1
2. Future enhancement 2

---

## References

### Internal

- [Analysis Report](./analysis/{subject}-analysis-{date}.md)
- [Technical Spec](./planning/technical-spec.md)
- [Implementation Report](./implementation/implementation-report.md)
- [ADR-XXX](../../adrs/ADR-XXX-{decision}.md)

### External

- [External reference](https://example.com)
- [Standard/spec](https://example.com)

---

## Team

- **Process:** BMad Method | Agile | Other
- **Agents Used:**
  - `agent-name` - Role
  - `agent-name` - Role

---

**Status:** {Current Status}  
**Last Updated:** YYYY-MM-DD  
**Next Review:** YYYY-MM-DD (if applicable)
