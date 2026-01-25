# Epic Quality Review Criteria Framework

This framework provides comprehensive criteria for validating epics and stories against create-epics-and-stories best practices, focusing on user value, independence, dependencies, and implementation readiness.

---

## Epic Quality Standards

### Core Principles

**Epics must:**

1. Deliver user value (not technical milestones)
2. Function independently (Epic N cannot require Epic N+1)
3. Be properly sized and structured
4. Have clear acceptance criteria

**Stories must:**

1. Deliver meaningful user value
2. Be independently completable
3. Have no forward dependencies
4. Follow proper sizing guidelines

---

## 1. Epic Structure Validation

### A. User Value Focus Check

For each epic, validate:

**Epic Title Check:**

- Is it user-centric (describes what user can do)?
- Focuses on user capability, not technical implementation

**Epic Goal Check:**

- Does it describe user outcome?
- Explains the benefit to end users

**Value Proposition Check:**

- Can users benefit from this epic alone?
- Delivers standalone value

### Red Flags (Violations)

❌ **Technical Milestones (NOT epics):**

- "Setup Database" or "Create Models" - no user value
- "API Development" - technical milestone
- "Infrastructure Setup" - not user-facing

❌ **Borderline Cases (Require scrutiny):**

- "Authentication System" - Is it delivering user value? (users can register, login, secure their account)
- "Payment Integration" - Are users getting payment capability? (yes) or just technical setup? (no)

✅ **Good Examples:**

- "User Registration and Profile Management" - users can create and manage accounts
- "Product Browsing and Search" - users can discover products
- "Shopping Cart and Checkout" - users can purchase items

---

### B. Epic Independence Validation

Test epic independence using dependency rules:

**Independence Rules:**

- **Epic 1:** Must stand alone completely (no dependencies)
- **Epic 2:** Can function using ONLY Epic 1 output (no Epic 3+ references)
- **Epic 3:** Can function using Epic 1 & 2 outputs (no Epic 4+ references)
- **Rule:** Epic N cannot require Epic N+1 to work (forward dependency forbidden)

**How to Test:**

1. Review Epic 2 features - do they reference Epic 3 components?
2. Check Epic 2 stories - do they depend on Epic 3 stories?
3. Validate Epic 2 can be deployed without Epic 3

### Document Failures

❌ **Common Violations:**

- "Epic 2 requires Epic 3 features to function"
- Stories in Epic 2 referencing Epic 3 components
- Circular dependencies between epics (Epic 2 needs 3, Epic 3 needs 2)
- Epic 1 depending on Epic 2 (reverse dependency)

✅ **Proper Dependency Flow:**

```
Epic 1 (standalone) → Epic 2 (uses Epic 1) → Epic 3 (uses Epic 1 + 2)
```

❌ **Forbidden Dependency Flow:**

```
Epic 1 → Epic 2 (needs Epic 3) ← Epic 3 (circular)
```

---

## 2. Story Quality Assessment

### A. Story Sizing Validation

Check each story for:

**Clear User Value:**

- Does the story deliver something meaningful to users?
- Can users see/feel the difference after this story?

**Independence:**

- Can it be completed without future stories?
- All dependencies are on PAST stories only (1.1 → 1.2 → 1.3)

### Common Violations

❌ **Not User Stories:**

- "Setup all models" - technical task, not user value
- "Create database schema" - technical implementation
- "Configure API endpoints" - no user benefit

❌ **Forward Dependencies (Forbidden):**

- "Create login UI (depends on Story 1.3)" - forward dependency if this is Story 1.1
- "Implement cart (requires Story 2.1)" - forward dependency from Epic 1

✅ **Good Examples:**

- "User can register with email and password" - clear user value, independent
- "User can view product catalog" - users see products immediately
- "User can add items to cart" - tangible user capability

---

### B. Acceptance Criteria Review

For each story's ACs, validate:

**Given/When/Then Format:**

- Uses proper BDD (Behavior-Driven Development) structure
- Clear preconditions (Given), actions (When), expected outcomes (Then)

**Testable:**

- Each AC can be verified independently
- No vague or ambiguous criteria

**Complete:**

- Covers all scenarios including errors
- Happy path, error conditions, edge cases

**Specific:**

- Clear expected outcomes
- Measurable success criteria

### Issues to Find

❌ **Vague Criteria:**

- "User can login" - too vague (what happens? success/failure scenarios?)
- "System works" - not measurable

❌ **Missing Error Conditions:**

- Only happy path covered
- No validation failures
- No network error handling

❌ **Incomplete Happy Path:**

- Missing steps in workflow
- Skipped critical scenarios

❌ **Non-Measurable Outcomes:**

- "User is happy" - subjective
- "System is fast" - not specific

✅ **Good Acceptance Criteria Example:**

```markdown
**Given** user is on registration page
**When** user enters valid email and password
**Then** account is created and user is redirected to dashboard

**Given** user is on registration page
**When** user enters invalid email format
**Then** error message "Please enter a valid email address" is displayed

**Given** user is on registration page
**When** user enters email that already exists
**Then** error message "This email is already registered" is displayed
```

---

## 3. Dependency Analysis

### A. Within-Epic Dependencies

Map story dependencies within each epic:

**Proper Dependency Flow:**

- Story 1.1 must be completable alone (no dependencies)
- Story 1.2 can use Story 1.1 output (backward dependency OK)
- Story 1.3 can use Story 1.1 & 1.2 outputs (backward dependencies OK)

**Critical Violations:**

❌ **Forward Dependencies (Forbidden):**

- "This story depends on Story 1.4" (from Story 1.1) - forward dependency
- "Wait for future story to work" - blocks implementation
- Stories referencing features not yet implemented

✅ **Proper Story Ordering:**

```
Story 1.1 (standalone)
  ↓
Story 1.2 (uses 1.1)
  ↓
Story 1.3 (uses 1.1, 1.2)
```

❌ **Forbidden Story Ordering:**

```
Story 1.1 → Story 1.3 (skips 1.2)
Story 1.2 → Story 1.1 (reverse dependency)
Story 1.1 → Story 1.4 (forward jump)
```

---

### B. Database/Entity Creation Timing

Validate database creation approach:

**Wrong Approach (Violation):**

- Epic 1 Story 1 creates all tables upfront (database-first approach)
- "Setup all database models" as first story
- Creating tables for features not yet implemented

**Right Approach (Best Practice):**

- Each story creates tables it needs when needed
- Database evolves with features (just-in-time creation)
- Tables created in the story that first uses them

**Check:**

- Are tables created only when first needed?
- Is database creation driven by feature delivery?

**Example:**

✅ **GOOD:**

```
Story 1.1: User Registration
  - Creates: users table
Story 1.3: User Profiles
  - Creates: user_profiles table
Story 2.1: Product Catalog
  - Creates: products table
```

❌ **BAD:**

```
Story 1.1: Database Setup
  - Creates: users, user_profiles, products, orders, payments (all at once)
```

---

## 4. Special Implementation Checks

### A. Starter Template Requirement

Check if Architecture specifies starter template:

**If YES (Starter template specified):**

- Epic 1 Story 1 MUST be: "Set up initial project from starter template"
- Verify story includes:
  - Cloning starter repository
  - Installing dependencies
  - Initial configuration
  - Running initial build/tests

**If NO (Custom setup):**

- Epic 1 Story 1 should be: "Initialize project with basic structure"

---

### B. Greenfield vs Brownfield Indicators

**Greenfield Projects (New from scratch) should have:**

- Initial project setup story
- Development environment configuration story
- CI/CD pipeline setup early (Epic 1 or 2)
- No integration stories with existing systems

**Brownfield Projects (Existing system) should have:**

- Integration points with existing systems
- Migration or compatibility stories
- Data migration stories if applicable
- Legacy system interaction stories

**Red Flags:**

- Greenfield project with no setup stories (where does code come from?)
- Brownfield project with no integration stories (how does it connect?)

---

## 5. Best Practices Compliance Checklist

Use this checklist for each epic:

### Per-Epic Validation

- [ ] Epic delivers user value (not technical milestone)
- [ ] Epic can function independently (no forward dependencies)
- [ ] Stories appropriately sized (completable independently)
- [ ] No forward dependencies in stories
- [ ] Database tables created when needed (not upfront)
- [ ] Clear acceptance criteria for all stories (Given/When/Then)
- [ ] Traceability to Functional Requirements maintained

### Per-Story Validation

- [ ] Story title describes user capability
- [ ] Story delivers meaningful user value
- [ ] Story can be completed independently
- [ ] Acceptance criteria use Given/When/Then format
- [ ] ACs cover happy path, errors, edge cases
- [ ] ACs are testable and specific
- [ ] Story has proper dependencies (backward only)

---

## 6. Quality Assessment Documentation

Document all findings by severity:

### 🔴 Critical Violations (Must Fix)

**Definition:** Issues that break fundamental epic/story principles

**Examples:**

- Technical epics with no user value (e.g., "Database Setup Epic")
- Forward dependencies breaking independence (Epic 2 needs Epic 3)
- Epic-sized stories that cannot be completed (stories > 5 days)

**Impact:** Blocks implementation or delivers no user value

---

### 🟠 Major Issues (Should Fix)

**Definition:** Issues that significantly reduce quality or clarity

**Examples:**

- Vague acceptance criteria ("user can login" without scenarios)
- Stories requiring future stories (Story 1.2 depends on Story 2.1)
- Database creation violations (all tables created in Story 1.1)

**Impact:** Reduces implementability or testability

---

### 🟡 Minor Concerns (Nice to Fix)

**Definition:** Issues that don't block implementation but reduce consistency

**Examples:**

- Formatting inconsistencies (some ACs not in Given/When/Then)
- Minor structure deviations (missing FR traceability)
- Documentation gaps (missing story descriptions)

**Impact:** Reduces consistency or maintainability

---

## Usage Notes for Step Files

**This framework should be referenced when:**

- Conducting epic quality reviews (Step 5 of check-implementation-readiness)
- Validating epics and stories against best practices
- Identifying structural violations and dependencies
- Providing remediation guidance

**Step files should:**

1. Reference this framework in frontmatter under `data_files`
2. Apply validation criteria systematically to each epic
3. Document violations by severity (Critical/Major/Minor)
4. Link to specific sections for detailed validation rules
5. Keep workflow-specific logic in step file, not here

---

## Related Data Files

None currently - this is a standalone framework for epic quality validation.

Future expansions could include:

- Epic remediation patterns (how to fix common violations)
- Story splitting guidelines (how to break down large stories)
- Acceptance criteria templates (common Given/When/Then patterns)
