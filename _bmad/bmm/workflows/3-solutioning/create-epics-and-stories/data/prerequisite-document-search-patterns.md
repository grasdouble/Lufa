# Prerequisite Document Search Patterns

## Purpose

This document defines the search patterns and priority ordering for locating required input documents for the create-epics-and-stories workflow. Documents may exist as single whole files or as sharded (split) documents with an index file.

---

## Document Types

### Required Documents

1. **PRD (Product Requirements Document)** - Contains FRs, NFRs, and product scope
2. **Architecture** - Contains technical decisions, API contracts, data models, starter template
3. **UX Design** (optional) - Contains interaction patterns, mockups, user flows, accessibility requirements

### Document Formats

**Whole Document:**

- Single markdown file containing complete document
- Preferred format for smaller documents
- Example: `prd.md`, `architecture.md`, `ux-design.md`

**Sharded Document:**

- Large document split into multiple smaller files
- Contains an `index.md` file that references all sections
- Organized in a directory with the document name
- Example: `prd/index.md`, `architecture/index.md`, `ux-design/index.md`

---

## PRD Document Search

### Search Priority

Search for PRD using these patterns in priority order:

**Priority 1: Whole Document**

```
{planning_artifacts}/*prd*.md
```

**Priority 2: Sharded Document**

```
{planning_artifacts}/*prd*/index.md
```

### Search Strategy

1. First attempt to find whole document matching `*prd*.md`
2. If not found, look for sharded version at `*prd*/index.md`
3. If sharded version exists, read `index.md` to understand document structure
4. Extract requirements from whole document OR all sections referenced in index

### Common PRD File Names

- `prd.md`
- `product-requirements.md`
- `product-requirements-document.md`
- `requirements.md`
- `prd/index.md` (sharded)

---

## Architecture Document Search

### Search Priority

Search for Architecture using these patterns in priority order:

**Priority 1: Whole Document**

```
{planning_artifacts}/*architecture*.md
```

**Priority 2: Sharded Document**

```
{planning_artifacts}/*architecture*/index.md
```

### Search Strategy

1. First attempt to find whole document matching `*architecture*.md`
2. If not found, look for sharded version at `*architecture*/index.md`
3. If sharded version exists, read `index.md` to understand document structure
4. Extract technical requirements from whole document OR all sections referenced in index

### Common Architecture File Names

- `architecture.md`
- `technical-architecture.md`
- `system-architecture.md`
- `architecture-design.md`
- `architecture/index.md` (sharded)

### Critical Architecture Elements

When reading Architecture document, look for:

- **Starter Template Specification** (CRITICAL for Epic 1 Story 1)
- Technology stack choices
- Database schema and migrations
- API design and contracts
- Infrastructure and deployment
- Security implementation
- Third-party integrations

---

## UX Design Document Search (Optional)

### Search Priority

Search for UX Design using these patterns in priority order:

**Priority 1: Whole Document**

```
{planning_artifacts}/*ux*.md
```

**Priority 2: Sharded Document**

```
{planning_artifacts}/*ux*/index.md
```

### Search Strategy

1. First attempt to find whole document matching `*ux*.md`
2. If not found, look for sharded version at `*ux*/index.md`
3. UX Design document is **optional** - workflow can proceed without it
4. If found, extract UX-specific requirements (responsive, accessibility, interaction patterns)

### Common UX Design File Names

- `ux.md`
- `ux-design.md`
- `user-experience.md`
- `ui-design.md`
- `design.md`
- `ux/index.md` (sharded)

### UX Document Elements

When reading UX document, look for:

- Responsive design breakpoints
- Accessibility requirements (WCAG level)
- Browser/device compatibility
- Interaction patterns and animations
- User flow diagrams
- Mockups and wireframes
- Error handling UX

---

## Search Implementation

### Glob Pattern Examples

**Using Bash/Shell:**

```bash
# Search for PRD (whole)
ls {planning_artifacts}/*prd*.md

# Search for PRD (sharded)
ls {planning_artifacts}/*prd*/index.md

# Search for Architecture (whole)
ls {planning_artifacts}/*architecture*.md

# Search for Architecture (sharded)
ls {planning_artifacts}/*architecture*/index.md

# Search for UX Design (whole)
ls {planning_artifacts}/*ux*.md

# Search for UX Design (sharded)
ls {planning_artifacts}/*ux*/index.md
```

**Using Glob Tool:**

```
pattern: "*prd*.md"
path: {planning_artifacts}

pattern: "*prd*/index.md"
path: {planning_artifacts}
```

### Reading Strategy

**For Whole Documents:**

```
1. Read the entire file using Read tool
2. Extract requirements from complete document
3. Process as single unit
```

**For Sharded Documents:**

```
1. Read index.md to understand structure
2. Identify all section files referenced
3. Read each section file individually
4. Combine extracted requirements from all sections
```

---

## User Confirmation

### Before Proceeding

After document discovery, present findings to user:

**Display:**

```
Found Documents:
- PRD: {path/to/prd.md} (whole document)
- Architecture: {path/to/architecture/index.md} (sharded, 8 sections)
- UX Design: {path/to/ux-design.md} (whole document)
```

**Ask User:**

1. "Are there any other documents to include for analysis?"
2. "Should any found documents be excluded?"

**Wait for user confirmation before proceeding.**

### Handling User Input

**If user provides additional files:**

- Add them to the document list
- Extract requirements from those files as well

**If user wants to exclude files:**

- Remove from document list
- Note exclusion in workflow frontmatter

**Once confirmed:**

- Create output file from template
- List all included documents in frontmatter `inputDocuments: []` array

---

## Document Not Found Handling

### PRD Not Found (CRITICAL ERROR)

**Symptom:** No PRD file matches search patterns

**Action:**

1. Display error: "PRD document not found"
2. List search patterns attempted
3. Ask user: "Please provide the path to the PRD document"
4. Wait for user to provide correct path
5. Verify file exists before proceeding

**Do NOT proceed without PRD** - it contains critical FRs and NFRs

### Architecture Not Found (CRITICAL ERROR)

**Symptom:** No Architecture file matches search patterns

**Action:**

1. Display error: "Architecture document not found"
2. List search patterns attempted
3. Ask user: "Please provide the path to the Architecture document"
4. Wait for user to provide correct path
5. Verify file exists before proceeding

**Do NOT proceed without Architecture** - it contains starter template and technical requirements

### UX Design Not Found (ACCEPTABLE)

**Symptom:** No UX Design file matches search patterns

**Action:**

1. Display info: "UX Design document not found (optional)"
2. Ask user: "Is there a UX Design document to include?"
3. If YES: Get path from user
4. If NO: Proceed without UX-specific requirements

**CAN proceed without UX Design** - it is optional for story creation

---

## Frontmatter Documentation

### Recording Input Documents

After document discovery and user confirmation, record in output file frontmatter:

```yaml
---
inputDocuments:
  - path: {planning_artifacts}/prd.md
    type: prd
    format: whole
  - path: {planning_artifacts}/architecture/index.md
    type: architecture
    format: sharded
    sections: 8
  - path: {planning_artifacts}/ux-design.md
    type: ux-design
    format: whole
---
```

This creates an audit trail of which documents were used for requirements extraction.

---

## Summary Checklist

Before proceeding with requirements extraction:

- [ ] PRD document found (whole or sharded)
- [ ] Architecture document found (whole or sharded)
- [ ] UX Design document search attempted (optional)
- [ ] User confirmed document list is complete
- [ ] User confirmed no documents should be excluded
- [ ] All found documents are accessible and readable
- [ ] Input documents recorded in output file frontmatter

---

**Last Updated:** 2026-01-25  
**Version:** 1.0  
**Used By:** create-epics-and-stories workflow, step-01-validate-prerequisites.md
