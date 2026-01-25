---
name: 'step-v-09-project-type-validation'
description: 'Project-Type Compliance Validation - Validate project-type specific requirements are properly documented'

# File references (ONLY variables used in this step)
nextStepFile: './step-v-10-smart-validation.md'
prdFile: '{prd_file_path}'
prdFrontmatter: '{prd_frontmatter}'
validationReportPath: '{validation_report_path}'
projectTypesData: '../data/project-types.csv'
projectTypeReqsData: '../data/project-type-requirements.md'
---

# Step 9: Project-Type Compliance Validation

## STEP GOAL:

Validate project-type specific requirements are properly documented - different project types (api_backend, web_app, mobile_app, etc.) have different required and excluded sections.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a Validation Architect and Requirements Specialist
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in systematic validation, not collaborative dialogue
- ✅ You bring expertise in project-type-specific requirements
- ✅ This step runs autonomously - no user input needed

### Step-Specific Rules:

- 🎯 Focus ONLY on project-type compliance
- 🚫 FORBIDDEN to validate other aspects in this step
- 💬 Approach: Map project type → required/excluded sections → validate presence/absence
- 🚪 This is a validation sequence step - auto-proceeds when complete

## EXECUTION PROTOCOLS:

- 🎯 Extract project type from PRD frontmatter
- 💾 Load project-type requirements from CSV
- 📖 Validate required sections present, excluded sections absent
- 📖 Append findings to validation report
- 📖 Display "Proceeding to next check..." and load next step
- 🚫 FORBIDDEN to pause or request user input

## CONTEXT BOUNDARIES:

- Available context: PRD file, PRD frontmatter, validation report, project-types.csv
- Focus: Project-type compliance only
- Limits: Don't validate other aspects, don't pause for user input
- Dependencies: Steps 2-8 completed - format, coverage, domain validated

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise unless user explicitly requests a change.

### 1. Extract Project Type from PRD

**From {prdFrontmatter}, get `projectType` field:**

If present: Use that value
If missing: Assume "web_app" (most common) and note in findings

**Common project types:**
- api_backend
- web_app
- mobile_app
- desktop_app
- data_pipeline
- ml_system
- library_sdk
- infrastructure
- other

**If no projectType classification found:**
Assume "web_app" (most common) and note in findings

### 2. Load Project Type Requirements (Pattern 3 Optimization)

**Attempt subprocess for CSV lookup:**

"Load project-type requirements for {projectType}:

1. Read {projectTypesData} CSV file
2. Find row where project_type column matches {projectType}
3. Extract required_sections and skip_sections columns
4. Parse comma-separated values into lists
5. Return ONLY:
   - project_type: {value}
   - required_sections: [list]
   - skip_sections: [list]
   - description: {project type description}

**Context-Saving Benefit:** Returns only matching row (~3-5 lines) instead of full CSV (~120 lines). Saves ~115 lines of parent context.

Do NOT return full CSV data - only the matching row for this project type."

**Reference documentation:** {projectTypeReqsData} contains detailed examples and patterns for project-type-specific requirements.

**Graceful degradation (if no Task tool):**
Load {projectTypesData} directly and find matching row for {projectType}.

### 3. Validate Required Sections Present

**For each required section:**
- Scan {prdFile} for section heading matching the requirement
- Assess: Present / Missing / Incomplete (present but insufficient)
- Note line number if found

**Build required sections table:**
| Section | Status | Line # | Notes |
|---------|--------|--------|-------|
| {section1} | Present / Missing / Incomplete | {line} | {assessment} |
| ... | ... | ... | ... |

### 4. Validate Excluded Sections Absent

**For each excluded section:**
- Scan {prdFile} for section heading matching the exclusion
- Assess: Absent (good) / Present (violation)
- Note line number if found (violation)

**Build excluded sections table:**
| Section | Status | Line # | Notes |
|---------|--------|--------|-------|
| {section1} | Absent / Present | {line} | {if present, why violation} |
| ... | ... | ... | ... |

### 5. Assess Compliance Severity

**Calculate:**
- Required sections present: {count} / {total_required}
- Required sections missing: {count}
- Excluded sections present (violations): {count}

**Determine severity:**
- **Critical:** Missing >50% required sections OR any excluded sections present
- **Warning:** Missing 20-50% required sections
- **Pass:** All required sections present, no excluded sections present

### 6. Report Project-Type Compliance Findings to Validation Report

Append to validation report:

```markdown
## Project-Type Compliance Validation

### Project Type
**Detected Type:** {projectType} {if assumed, note "(assumed - not specified in frontmatter)"}

### Required Sections Compliance

| Section | Status | Line # | Notes |
|---------|--------|--------|-------|
{table rows}

**Summary:** {count} / {total} required sections present

### Excluded Sections Compliance

| Section | Status | Line # | Notes |
|---------|--------|--------|-------|
{table rows}

**Summary:** {count} excluded sections present (violations)

### Overall Compliance

**Status:** [Critical / Warning / Pass]

**Findings:**
- Required sections present: {count} / {total}
- Required sections missing: {list with explanations}
- Excluded sections present: {list with explanations why violations}

**Recommendation:**
[If Critical] "Project-type compliance is insufficient. Add missing required sections: {list}. Remove excluded sections: {list}."
[If Warning] "Some required sections missing. Add: {list}."
[If Pass] "PRD properly addresses all required sections for {projectType} and excludes inappropriate sections."
```

### 7. Display Progress and Auto-Proceed

Display: "**Project-Type Compliance Validation Complete**

Type: {projectType}
Required Sections: {present}/{total}
Violations: {count}

**Proceeding to next validation check...**"

Immediately load and execute {nextStepFile} (step-v-10-smart-validation.md)

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Project type extracted correctly (or default assumed)
- Required sections validated for presence and completeness
- Excluded sections validated for absence
- Compliance table built with status for all sections
- Severity assessed correctly
- Findings reported to validation report
- Auto-proceeds to next validation step
- Subprocess attempted with graceful degradation
- **Pattern 3 optimization**: CSV lookup in subprocess returns only matching row (~3-5 lines) instead of full CSV (~120 lines)

### ❌ SYSTEM FAILURE:

- Not checking project type before proceeding
- Missing required section checks
- Missing excluded section checks
- Not building compliance table
- Not reporting findings to validation report
- Not auto-proceeding

**Master Rule:** Different project types have different requirements. API PRDs don't need UX sections - validate accordingly.
