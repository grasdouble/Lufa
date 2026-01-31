# SMART Validation Criteria Definitions

This file contains detailed SMART criteria definitions for FR quality assessment.

## SMART Framework (1-5 Scale)

### Specific (S) - Clarity and Precision

**Score 5 - Excellent:**

- Clear, unambiguous, well-defined
- Actor and capability explicitly stated
- No room for misinterpretation
- Example: "Admin can export user activity logs as CSV files"

**Score 3 - Acceptable:**

- Somewhat clear but could be more specific
- Actor or capability could be more precise
- Minor ambiguity present
- Example: "User can manage their preferences"

**Score 1 - Poor:**

- Vague, ambiguous, unclear
- Actor or capability undefined
- Multiple interpretations possible
- Example: "System handles data appropriately"

---

### Measurable (M) - Testability

**Score 5 - Excellent:**

- Quantifiable metrics present
- Fully testable with clear pass/fail criteria
- Acceptance criteria obvious
- Example: "User can upload files up to 100MB in size"

**Score 3 - Acceptable:**

- Partially measurable
- Some test criteria identifiable
- Requires interpretation for testing
- Example: "User can upload large files"

**Score 1 - Poor:**

- Not measurable, subjective
- No clear test criteria
- Cannot determine pass/fail
- Example: "User can easily upload files"

---

### Attainable (A) - Feasibility

**Score 5 - Excellent:**

- Realistic and achievable with stated constraints
- No obvious technical barriers
- Within project scope and timeline
- Example: "User can filter search results by date range"

**Score 3 - Acceptable:**

- Probably achievable but uncertain
- Some technical complexity
- May require additional clarification
- Example: "User can search across all document types simultaneously"

**Score 1 - Poor:**

- Unrealistic or technically infeasible
- Contradicts constraints or physics
- Out of scope for project
- Example: "System predicts user intent with 100% accuracy"

---

### Relevant (R) - Alignment with Goals

**Score 5 - Excellent:**

- Clearly aligned with user needs and business objectives
- Direct connection to success criteria or user journeys
- Obvious value proposition
- Example: FR directly supports a stated user journey

**Score 3 - Acceptable:**

- Somewhat relevant but connection unclear
- Indirect alignment with goals
- Value proposition requires explanation
- Example: FR provides supporting capability

**Score 1 - Poor:**

- Not relevant to stated objectives
- No clear user need or business value
- Appears disconnected from project goals
- Example: FR doesn't align with any user journey or success criterion

---

### Traceable (T) - Origin and Justification

**Score 5 - Excellent:**

- Clearly traces to specific user journey or business objective
- Origin explicitly documented
- Justification obvious
- Example: FR number mentioned in user journey flow

**Score 3 - Acceptable:**

- Partially traceable
- General connection to user needs
- Requires inference to identify source
- Example: FR supports user type but not specific journey

**Score 1 - Poor:**

- Orphan requirement - no clear source
- Cannot trace to user journey or objective
- Appears added without justification
- Example: FR with no mention in earlier PRD sections

---

## Scoring Workflow

**For each FR:**

1. Read the full FR text
2. Score on each of the 5 SMART criteria (1-5)
3. Calculate average score
4. Flag if any category < 3

**Quality Thresholds:**

- **Pass**: <10% of FRs flagged (any score <3)
- **Warning**: 10-30% of FRs flagged
- **Critical**: >30% of FRs flagged

**Improvement Suggestions:**
For any FR with score <3 in any category, provide specific, actionable improvement suggestion.
