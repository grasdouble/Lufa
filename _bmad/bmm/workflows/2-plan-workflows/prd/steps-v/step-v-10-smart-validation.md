---
name: 'step-v-10-smart-validation'
description: 'SMART Requirements Validation - Validate Functional Requirements meet SMART quality criteria'

# File references (ONLY variables used in this step)
nextStepFile: './step-v-11-holistic-quality-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml'
smartCriteriaFile: '../data/smart-validation-criteria.md'
---

# Step 10: SMART Requirements Validation

## STEP GOAL:

Validate Functional Requirements meet SMART quality criteria (Specific, Measurable, Attainable, Relevant, Traceable), ensuring high-quality requirements.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a Validation Architect and Quality Assurance Specialist
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in systematic validation, not collaborative dialogue
- ✅ You bring requirements engineering expertise and quality assessment
- ✅ This step runs autonomously - no user input needed

### Step-Specific Rules:

- 🎯 Focus ONLY on FR quality assessment using SMART framework
- 🚫 FORBIDDEN to validate other aspects in this step
- 💬 Approach: Score each FR on SMART criteria (1-5 scale)
- 🚪 This is a validation sequence step - auto-proceeds when complete

## EXECUTION PROTOCOLS:

- 🎯 Extract all FRs from PRD
- 🎯 Score each FR on SMART criteria (Specific, Measurable, Attainable, Relevant, Traceable)
- 💾 Flag FRs with score < 3 in any category
- 📖 Append scoring table and suggestions to validation report
- 📖 Display "Proceeding to next check..." and load next step
- 🚫 FORBIDDEN to pause or request user input

## CONTEXT BOUNDARIES:

- Available context: PRD file, validation report
- Focus: FR quality assessment only using SMART framework
- Limits: Don't validate NFRs or other aspects, don't pause for user input
- Dependencies: Steps 2-9 completed - comprehensive validation checks done

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise unless user explicitly requests a change.

### 1. Extract All Functional Requirements

From the PRD's Functional Requirements section, extract:

- All FRs with their FR numbers (FR-001, FR-002, etc.)
- Count total FRs
- Determine batch strategy based on FR count (see section 2)

### 2. Attempt Sub-Process Validation (Pattern 4: Parallel Batch Processing)

**OPTIMIZATION CONTEXT:**

- **Pattern**: For large PRDs (20+ FRs), split into batches and process in parallel
- **Performance Gain**: 3-5x faster (depends on FR count and batch size)
- **Context Savings**: Each subprocess loads only its FR batch, not full PRD
- **Fallback**: If Task tool unavailable, use sequential processing (section 3)
- **SMART Criteria**: Detailed scoring rubric in {smartCriteriaFile}

**Determine batch strategy:**

- If FRs ≤ 20: Use single subprocess (minimal gain from parallelization)
- If FRs 21-50: Split into 3 batches (~7-17 FRs each)
- If FRs 51-100: Split into 5 batches (~10-20 FRs each)
- If FRs > 100: Split into 8 batches (~13-25 FRs each)

**Try to use Task tool to spawn parallel subprocesses:**

For each batch, launch subprocess:
"Perform SMART validation on this batch of Functional Requirements: {FR-XXX through FR-YYY}

Score each FR on SMART criteria (1-5 scale) using rubric from {smartCriteriaFile}:

- Specific, Measurable, Attainable, Relevant, Traceable

Return: FR number, scores (S/M/A/R/T), average, flag if any <3, improvement suggestion if flagged."

**Aggregation:** Merge scoring tables, calculate overall quality metrics, compile improvement suggestions.

### 3. Graceful Degradation (if Task tool unavailable)

If Task tool unavailable, perform sequential SMART scoring using criteria from {smartCriteriaFile}:

- Score each FR on all 5 criteria (1-5)
- Flag if any score < 3
- Note improvement suggestions

### 4. Build Scoring Table

**Aggregate results from parallel batches or sequential analysis:**

- Calculate percentage of FRs with all scores ≥ 3
- Calculate percentage of FRs with all scores ≥ 4
- Calculate average score across all FRs and categories

### 5. Report SMART Findings to Validation Report

Append to validation report:

```markdown
## SMART Requirements Validation

**Total Functional Requirements:** {count}

### Scoring Summary

**All scores ≥ 3:** {percentage}% ({count}/{total})
**All scores ≥ 4:** {percentage}% ({count}/{total})
**Overall Average Score:** {average}/5.0

### Scoring Table

| FR #   | Specific | Measurable | Attainable | Relevant | Traceable | Average | Flag          |
| ------ | -------- | ---------- | ---------- | -------- | --------- | ------- | ------------- |
| FR-001 | {s1}     | {m1}       | {a1}       | {r1}     | {t1}      | {avg1}  | {X if any <3} |
| FR-002 | {s2}     | {m2}       | {a2}       | {r2}     | {t2}      | {avg2}  | {X if any <3} |

[Continue for all FRs]

**Legend:** 1=Poor, 3=Acceptable, 5=Excellent
**Flag:** X = Score < 3 in one or more categories

### Improvement Suggestions

**Low-Scoring FRs:**

**FR-{number}:** {specific suggestion for improvement}
[For each FR with score < 3 in any category]

### Overall Assessment

**Severity:** [Critical if >30% flagged FRs, Warning if 10-30%, Pass if <10%]

**Recommendation:**
[If Critical] "Many FRs have quality issues. Revise flagged FRs using SMART framework to improve clarity and testability."
[If Warning] "Some FRs would benefit from SMART refinement. Focus on flagged requirements above."
[If Pass] "Functional Requirements demonstrate good SMART quality overall."
```

### 6. Display Progress and Auto-Proceed

Display: "**SMART Requirements Validation Complete**

FR Quality: {percentage}% with acceptable scores ({severity})

**Proceeding to next validation check...**"

Immediately load and execute {nextStepFile} (step-v-11-holistic-quality-validation.md)

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All FRs extracted from PRD
- Each FR scored on all 5 SMART criteria (1-5 scale)
- FRs with scores < 3 flagged for improvement
- Improvement suggestions provided for low-scoring FRs
- Scoring table built with all FR scores
- Overall quality assessment calculated
- Findings reported to validation report
- Auto-proceeds to next validation step
- **Subprocess Pattern 4 (Parallel Batch):** Parallel subprocesses attempted with graceful degradation
- **Performance:** 3-5x faster for large PRDs (parallel batch processing, context savings per batch)

### ❌ SYSTEM FAILURE:

- Not scoring all FRs on all SMART criteria
- Missing improvement suggestions for low-scoring FRs
- Not building scoring table
- Not calculating overall quality metrics
- Not reporting findings to validation report
- Not auto-proceeding

**Master Rule:** FRs should be high-quality, not just present. SMART framework provides objective quality measure.
