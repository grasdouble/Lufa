# Traceability Chain Validation Subprocess Prompts

This file contains detailed subprocess prompts for parallel traceability chain validation (Pattern 4).

## Subprocess 1: Executive Summary → Success Criteria Chain

**Prompt:**
"Validate Executive Summary → Success Criteria traceability in this PRD:

1. Read and extract Executive Summary content (vision, goals, objectives)
2. Read and extract Success Criteria
3. Validate alignment:
   - Does Executive Summary mention the success dimensions?
   - Are Success Criteria aligned with stated vision and goals?
   - Are there success criteria without Executive Summary support?

Return findings:

- Chain status (Intact/Gaps Identified)
- List of specific misalignments if any
- Count of unsupported success criteria"

---

## Subprocess 2: Success Criteria → User Journeys Chain

**Prompt:**
"Validate Success Criteria → User Journeys traceability in this PRD:

1. Read and extract Success Criteria
2. Read and extract User Journeys section (user types, flows, outcomes)
3. Validate coverage:
   - For each success criterion, is there a user journey that achieves it?
   - Are there success criteria without supporting user journeys?

Return findings:

- Chain status (Intact/Gaps Identified)
- List of unsupported success criteria if any
- Count of success criteria without journey support"

---

## Subprocess 3: User Journeys → Functional Requirements Chain

**Prompt:**
"Validate User Journeys → Functional Requirements traceability in this PRD:

1. Read and extract User Journeys (user types and flows)
2. Read and extract Functional Requirements (all FRs with numbers)
3. Validate traceability:
   - For each user journey/flow, are there FRs that enable it?
   - Are there FRs with no clear user journey origin?
   - Identify orphan FRs (requirements without traceable source)

Return findings:

- Chain status (Intact/Gaps Identified)
- List of user journeys without FRs
- List of orphan FRs with FR numbers
- Count of orphan FRs (CRITICAL metric)"

---

## Subprocess 4: Scope → FR Alignment Chain

**Prompt:**
"Validate Product Scope → FR alignment in this PRD:

1. Read and extract Product Scope (in-scope items, MVP scope)
2. Read and extract Functional Requirements
3. Validate alignment:
   - Does MVP scope align with essential FRs?
   - Are in-scope items supported by FRs?
   - Are there scope items without FR support?

Return findings:

- Chain status (Intact/Misaligned)
- List of specific misalignments if any
- Count of scope items without FR support"

---

## Aggregation Instructions

After all 4 subprocesses complete:

1. Collect results from all 4 chains
2. Aggregate counts of broken chains and orphan elements
3. Build traceability matrix showing coverage
4. Assess overall severity (Critical if orphan FRs exist)
