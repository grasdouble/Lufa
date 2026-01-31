---
name: 'step-v-05-measurability-validation'
description: 'Measurability Validation - Validate that all requirements (FRs and NFRs) are measurable and testable'

# File references (ONLY variables used in this step)
nextStepFile: './step-v-06-traceability-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
measurabilityCriteriaFile: '../data/measurability-validation-criteria.md'
---

# Step 5: Measurability Validation

## STEP GOAL:

Validate that all Functional Requirements (FRs) and Non-Functional Requirements (NFRs) are measurable, testable, and follow proper format without implementation details.

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
- ✅ You bring analytical rigor and requirements engineering expertise
- ✅ This step runs autonomously - no user input needed

### Step-Specific Rules:

- 🎯 Focus ONLY on FR and NFR measurability
- 🚫 FORBIDDEN to validate other aspects in this step
- 💬 Approach: Systematic requirement-by-requirement analysis
- 🚪 This is a validation sequence step - auto-proceeds when complete

## EXECUTION PROTOCOLS:

- 🎯 Extract all FRs and NFRs from PRD
- 💾 Validate each for measurability and format
- 📖 Append findings to validation report
- 📖 Display "Proceeding to next check..." and load next step
- 🚫 FORBIDDEN to pause or request user input

## CONTEXT BOUNDARIES:

- Available context: PRD file, validation report
- Focus: FR and NFR measurability only
- Limits: Don't validate other aspects, don't pause for user input
- Dependencies: Steps 2-4 completed - initial validation checks done

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise unless user explicitly requests a change.

### 1. Attempt Sub-Process Validation (Pattern 4: Parallel FR/NFR)

**OPTIMIZATION CONTEXT:**

- **Pattern**: Launch 2 parallel subprocesses (FR measurability + NFR measurability)
- **Performance Gain**: 2x faster (parallel vs sequential validation)
- **Context Savings**: Minimal (primary gain is speed, not context)
- **Fallback**: If Task tool unavailable, use sequential validation (section 2)
- **Validation Criteria**: Detailed criteria in {measurabilityCriteriaFile}

**Try to use Task tool to spawn 2 parallel subprocesses:**

**Subprocess 1: FR Measurability**
"Perform FR measurability validation on this PRD using criteria from {measurabilityCriteriaFile}:

Validate format compliance, subjective adjectives, vague quantifiers, implementation leakage.

Return: Total FRs, violation counts + examples with line numbers, total FR violations."

**Subprocess 2: NFR Measurability**
"Perform NFR measurability validation on this PRD using criteria from {measurabilityCriteriaFile}:

Validate specific metrics, template compliance, context inclusion.

Return: Total NFRs, violation counts + examples with line numbers, total NFR violations."

**Aggregation:** Aggregate violation counts and compile overall assessment.

### 2. Graceful Degradation (if Task tool unavailable)

If Task tool unavailable, perform analysis directly using criteria from {measurabilityCriteriaFile}:

**Functional Requirements:** Check format compliance, subjective adjectives, vague quantifiers, implementation leakage.

**Non-Functional Requirements:** Check specific metrics, template compliance, context inclusion.

### 3. Tally Violations

**Aggregate results from 2 parallel subprocesses (or sequential analysis if Task tool unavailable):**

**FR Violations:**

- Format violations: count
- Subjective adjectives: count
- Vague quantifiers: count
- Implementation leakage: count
- Total FR violations: sum

**NFR Violations:**

- Missing metrics: count
- Incomplete template: count
- Missing context: count
- Total NFR violations: sum

**Total violations:** FR violations + NFR violations

### 4. Report Measurability Findings to Validation Report

Append to validation report:

```markdown
## Measurability Validation

### Functional Requirements

**Total FRs Analyzed:** {count}

**Format Violations:** {count}
[If violations exist, list examples with line numbers]

**Subjective Adjectives Found:** {count}
[If found, list examples with line numbers]

**Vague Quantifiers Found:** {count}
[If found, list examples with line numbers]

**Implementation Leakage:** {count}
[If found, list examples with line numbers]

**FR Violations Total:** {total}

### Non-Functional Requirements

**Total NFRs Analyzed:** {count}

**Missing Metrics:** {count}
[If missing, list examples with line numbers]

**Incomplete Template:** {count}
[If incomplete, list examples with line numbers]

**Missing Context:** {count}
[If missing, list examples with line numbers]

**NFR Violations Total:** {total}

### Overall Assessment

**Total Requirements:** {FRs + NFRs}
**Total Violations:** {FR violations + NFR violations}

**Severity:** [Critical if >10 violations, Warning if 5-10, Pass if <5]

**Recommendation:**
[If Critical] "Many requirements are not measurable or testable. Requirements must be revised to be testable for downstream work."
[If Warning] "Some requirements need refinement for measurability. Focus on violating requirements above."
[If Pass] "Requirements demonstrate good measurability with minimal issues."
```

### 5. Display Progress and Auto-Proceed

Display: "**Measurability Validation Complete**

Total Violations: {count} ({severity})

**Proceeding to next validation check...**"

Immediately load and execute {nextStepFile} (step-v-06-traceability-validation.md)

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All FRs extracted and analyzed for measurability
- All NFRs extracted and analyzed for measurability
- Violations documented with line numbers
- Severity assessed correctly
- Findings reported to validation report
- Auto-proceeds to next validation step
- **Subprocess Pattern 4 (Parallel FR/NFR):** 2 parallel subprocesses attempted with graceful degradation
- **Performance:** 2x faster (parallel FR and NFR validation)

### ❌ SYSTEM FAILURE:

- Not analyzing all FRs and NFRs
- Missing line numbers for violations
- Not reporting findings to validation report
- Not assessing severity
- Not auto-proceeding

**Master Rule:** Requirements must be testable to be useful. Validate every requirement for measurability, document violations, auto-proceed.
