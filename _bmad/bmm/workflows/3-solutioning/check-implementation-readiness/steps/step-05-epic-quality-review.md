---
name: 'step-05-epic-quality-review'
description: 'Validate epics and stories against create-epics-and-stories best practices'

# Path Definitions
workflow_path: '{project-root}/_bmad/bmm/workflows/3-solutioning/implementation-readiness'

# File References
thisStepFile: './step-05-epic-quality-review.md'
nextStepFile: './step-06-final-assessment.md'
workflowFile: '{workflow_path}/workflow.md'
outputFile: '{planning_artifacts}/implementation-readiness-report-{{date}}.md'
epicsBestPractices: '{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories'

# Data File References
data_files:
  - '../data/epic-quality-review-criteria.md'
---

# Step 5: Epic Quality Review

## DATA FILE REFERENCES:

This step uses shared criteria and validation frameworks:

- **../data/epic-quality-review-criteria.md**: Comprehensive epic quality standards, user value focus validation, epic independence rules, story quality assessment, acceptance criteria review, dependency analysis, database creation timing, greenfield vs brownfield indicators, best practices compliance checklist, quality assessment documentation by severity

## STEP GOAL:

To validate epics and stories against the best practices defined in create-epics-and-stories workflow, focusing on user value, independence, dependencies, and implementation readiness.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are an EPIC QUALITY ENFORCER
- ✅ You know what good epics look like - challenge anything deviating
- ✅ Technical epics are wrong - find them
- ✅ Forward dependencies are forbidden - catch them
- ✅ Stories must be independently completable

### Step-Specific Rules:

- 🎯 Apply create-epics-and-stories standards rigorously
- 🚫 Don't accept "technical milestones" as epics
- 💬 Challenge every dependency on future work
- 🚪 Verify proper story sizing and structure

## EXECUTION PROTOCOLS:

- 🎯 Systematically validate each epic and story
- 💾 Document all violations of best practices
- 📖 Check every dependency relationship
- 🚫 FORBIDDEN to accept structural problems

## EPIC QUALITY REVIEW PROCESS:

**For detailed validation criteria and frameworks, see: ../data/epic-quality-review-criteria.md**

### 1. Initialize Best Practices Validation

"Beginning **Epic Quality Review** against create-epics-and-stories standards.

I will rigorously validate:

- Epics deliver user value (not technical milestones)
- Epic independence (Epic 2 doesn't need Epic 3)
- Story dependencies (no forward references)
- Proper story sizing and completeness

Any deviation from best practices will be flagged as a defect."

### 2. Epic Structure Validation

Validate epics using criteria from the framework:

**A. User Value Focus Check** - See **epic-quality-review-criteria.md** for:

- Epic title, goal, and value proposition validation
- Red flags (technical milestones) and borderline cases
- Good examples of user-centric epics

**B. Epic Independence Validation** - See **epic-quality-review-criteria.md** for:

- Independence rules (Epic N cannot require Epic N+1)
- How to test independence
- Common violations and proper dependency flow

### 3. Story Quality Assessment

Validate stories using criteria from the framework:

**A. Story Sizing Validation** - See **epic-quality-review-criteria.md** for:

- Clear user value and independence checks
- Common violations (technical tasks, forward dependencies)
- Good examples of properly sized stories

**B. Acceptance Criteria Review** - See **epic-quality-review-criteria.md** for:

- Given/When/Then format validation
- Testable, complete, and specific criteria
- Common issues (vague criteria, missing errors, incomplete happy path)

### 4. Dependency Analysis

Analyze dependencies using rules from the framework:

**A. Within-Epic Dependencies** - See **epic-quality-review-criteria.md** for:

- Proper story dependency flow (1.1 → 1.2 → 1.3)
- Critical violations (forward dependencies, story ordering issues)
- Proper vs forbidden story ordering patterns

**B. Database/Entity Creation Timing** - See **epic-quality-review-criteria.md** for:

- Wrong approach (database-first, all tables upfront)
- Right approach (just-in-time table creation)
- Good vs bad examples

### 5. Special Implementation Checks

Apply special checks using guidelines from the framework:

**A. Starter Template Requirement** - See **epic-quality-review-criteria.md** for requirements

**B. Greenfield vs Brownfield Indicators** - See **epic-quality-review-criteria.md** for expected patterns

### 6. Best Practices Compliance Checklist

Use the checklist from the framework for systematic validation.

See **epic-quality-review-criteria.md** for:

- Per-epic validation checklist (7 items)
- Per-story validation checklist (7 items)

### 7. Quality Assessment Documentation

Document all findings by severity using categories from the framework.

See **epic-quality-review-criteria.md** for:

- 🔴 Critical Violations (must fix)
- 🟠 Major Issues (should fix)
- 🟡 Minor Concerns (nice to fix)
- Definitions, examples, and impact for each severity level

### 8. Autonomous Review Execution

This review runs autonomously to maintain standards:

- Apply best practices without compromise
- Document every violation with specific examples
- Provide clear remediation guidance
- Prepare recommendations for each issue

## REVIEW COMPLETION:

After completing epic quality review:

- Update {outputFile} with all quality findings
- Document specific best practices violations
- Provide actionable recommendations
- Load {nextStepFile} for final readiness assessment

## CRITICAL STEP COMPLETION NOTE

This step executes autonomously. Load {nextStepFile} only after complete epic quality review is documented.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All epics validated against best practices
- Every dependency checked and verified
- Quality violations documented with examples
- Clear remediation guidance provided
- No compromise on standards enforcement

### ❌ SYSTEM FAILURE:

- Accepting technical epics as valid
- Ignoring forward dependencies
- Not verifying story sizing
- Overlooking obvious violations

**Master Rule:** Enforce best practices rigorously. Find all violations.
