---
name: 'step-v-11-holistic-quality-validation'
description: 'Holistic Quality Assessment - Assess PRD as cohesive, compelling document - is it a good PRD?'

# File references (ONLY variables used in this step)
nextStepFile: './step-v-12-completeness-validation.md'
prdFile: '{prd_file_path}'
validationReportPath: '{validation_report_path}'
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml'
qualityCriteria: '../data/holistic-quality-criteria.md'
---

# Step 11: Holistic Quality Assessment

## STEP GOAL:

Assess the PRD as a cohesive, compelling document - evaluating document flow, dual audience effectiveness (humans and LLMs), BMAD PRD principles compliance, and overall quality rating.

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
- ✅ You bring analytical rigor and document quality expertise
- ✅ This step runs autonomously - no user input needed
- ✅ Uses Advanced Elicitation for multi-perspective evaluation

### Step-Specific Rules:

- 🎯 Focus ONLY on holistic document quality assessment
- 🚫 FORBIDDEN to validate individual components (done in previous steps)
- 💬 Approach: Multi-perspective evaluation using Advanced Elicitation
- 🚪 This is a validation sequence step - auto-proceeds when complete

## EXECUTION PROTOCOLS:

- 🎯 Use Advanced Elicitation for multi-perspective assessment
- 🎯 Evaluate document flow, dual audience, BMAD principles
- 💾 Append comprehensive assessment to validation report
- 📖 Display "Proceeding to next check..." and load next step
- 🚫 FORBIDDEN to pause or request user input

## CONTEXT BOUNDARIES:

- Available context: Complete PRD file, validation report with findings from steps 1-10
- Focus: Holistic quality - the WHOLE document
- Limits: Don't re-validate individual components, don't pause for user input
- Dependencies: Steps 1-10 completed - all systematic checks done

## MANDATORY SEQUENCE

**CRITICAL:** Follow this sequence exactly. Do not skip, reorder, or improvise unless user explicitly requests a change.

### 1. Attempt Sub-Process with Advanced Elicitation

**Load evaluation criteria:**
Read {qualityCriteria} for complete assessment framework.

**Try to use Task tool to spawn a subprocess using Advanced Elicitation:**

"Perform holistic quality assessment on this PRD using multi-perspective evaluation:

**Load and execute Advanced Elicitation workflow:**
{advancedElicitationTask}

**Evaluate the PRD using criteria from {qualityCriteria}:**

- Document Flow & Coherence
- Dual Audience Effectiveness (Humans and LLMs)
- BMAD PRD Principles Compliance (7 principles)
- Overall Quality Rating (1-5 scale)
- Top 3 Improvements

Return comprehensive assessment with all perspectives, rating, and top 3 improvements."

**Graceful degradation (if no Task tool or Advanced Elicitation unavailable):**

- Perform holistic assessment directly in current context using criteria from {qualityCriteria}
- Read complete PRD
- Evaluate all criteria dimensions
- Assign overall quality rating
- Identify top 3 improvements

### 2. Synthesize Assessment

**Compile findings from multi-perspective evaluation:**

**Document Flow & Coherence:**

- Overall assessment: [Excellent/Good/Adequate/Needs Work/Problematic]
- Key strengths: [list]
- Key weaknesses: [list]

**Dual Audience Effectiveness:**

- For Humans: [assessment]
- For LLMs: [assessment]
- Overall dual audience score: [1-5]

**BMAD Principles Compliance:**

- Principles met: [count]/7
- Principles with issues: [list]

**Overall Quality Rating:** [1-5 with label]

**Top 3 Improvements:**

1. [Improvement 1]
2. [Improvement 2]
3. [Improvement 3]

### 3. Report Holistic Quality Findings to Validation Report

Append to validation report:

```markdown
## Holistic Quality Assessment

### Document Flow & Coherence

**Assessment:** [Excellent/Good/Adequate/Needs Work/Problematic]

**Strengths:**
{List key strengths}

**Areas for Improvement:**
{List key weaknesses}

### Dual Audience Effectiveness

**For Humans:**

- Executive-friendly: [assessment]
- Developer clarity: [assessment]
- Designer clarity: [assessment]
- Stakeholder decision-making: [assessment]

**For LLMs:**

- Machine-readable structure: [assessment]
- UX readiness: [assessment]
- Architecture readiness: [assessment]
- Epic/Story readiness: [assessment]

**Dual Audience Score:** {score}/5

### BMAD PRD Principles Compliance

| Principle           | Status                | Notes   |
| ------------------- | --------------------- | ------- |
| Information Density | [Met/Partial/Not Met] | {notes} |
| Measurability       | [Met/Partial/Not Met] | {notes} |
| Traceability        | [Met/Partial/Not Met] | {notes} |
| Domain Awareness    | [Met/Partial/Not Met] | {notes} |
| Zero Anti-Patterns  | [Met/Partial/Not Met] | {notes} |
| Dual Audience       | [Met/Partial/Not Met] | {notes} |
| Markdown Format     | [Met/Partial/Not Met] | {notes} |

**Principles Met:** {count}/7

### Overall Quality Rating

**Rating:** {rating}/5 - {label}

**Scale:**

- 5/5 - Excellent: Exemplary, ready for production use
- 4/5 - Good: Strong with minor improvements needed
- 3/5 - Adequate: Acceptable but needs refinement
- 2/5 - Needs Work: Significant gaps or issues
- 1/5 - Problematic: Major flaws, needs substantial revision

### Top 3 Improvements

1. **{Improvement 1}**
   {Brief explanation of why and how}

2. **{Improvement 2}**
   {Brief explanation of why and how}

3. **{Improvement 3}**
   {Brief explanation of why and how}

### Summary

**This PRD is:** {one-sentence overall assessment}

**To make it great:** Focus on the top 3 improvements above.
```

### 4. Display Progress and Auto-Proceed

Display: "**Holistic Quality Assessment Complete**

Overall Rating: {rating}/5 - {label}

**Proceeding to final validation checks...**"

Immediately load and execute {nextStepFile} (step-v-12-completeness-validation.md)

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Advanced Elicitation used for multi-perspective evaluation (or graceful degradation)
- Document flow & coherence assessed
- Dual audience effectiveness evaluated (humans and LLMs)
- BMAD PRD principles compliance checked
- Overall quality rating assigned (1-5 scale)
- Top 3 improvements identified
- Comprehensive assessment reported to validation report
- Auto-proceeds to next validation step
- Subprocess attempted with graceful degradation

### ❌ SYSTEM FAILURE:

- Not using Advanced Elicitation for multi-perspective evaluation
- Missing document flow assessment
- Missing dual audience evaluation
- Not checking all BMAD principles
- Not assigning overall quality rating
- Missing top 3 improvements
- Not reporting comprehensive assessment to validation report
- Not auto-proceeding

**Master Rule:** This evaluates the WHOLE document, not just components. Answers "Is this a good PRD?" and "What would make it great?"
