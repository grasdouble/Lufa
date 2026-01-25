# Measurability Validation Criteria

This file contains detailed validation criteria for FR and NFR measurability validation.

## Functional Requirements (FR) Validation Criteria

### 1. Format Compliance

**Expected format:** `[Actor] can [capability]`

**Examples:**

- ✅ GOOD: "Admin can export user activity logs as CSV files"
- ✅ GOOD: "Guest user can browse product catalog without authentication"
- ❌ BAD: "The system provides export functionality"
- ❌ BAD: "Export logs feature"

**Validation:**

- Does FR follow `[Actor] can [capability]` pattern?
- Is actor clearly defined?
- Is capability actionable and testable?

---

### 2. No Subjective Adjectives

**Forbidden adjectives (without measurable metrics):**

- easy, simple, intuitive, user-friendly
- fast, quick, responsive, efficient
- smooth, seamless, elegant
- robust, reliable, stable
- flexible, scalable, maintainable

**Why forbidden:** These are subjective and not testable without specific metrics.

**Examples:**

- ❌ BAD: "User can easily upload files"
- ✅ GOOD: "User can upload files up to 100MB with progress indicator"
- ❌ BAD: "System provides fast response times"
- ✅ GOOD: "System responds to user queries within 200ms (p95)"

**Validation:** Scan for subjective adjectives, note line numbers.

---

### 3. No Vague Quantifiers

**Forbidden quantifiers:**

- multiple, several, some, many, few
- various, number of, a variety of
- range of, series of

**Why forbidden:** These are non-specific and not testable.

**Examples:**

- ❌ BAD: "User can manage multiple profiles"
- ✅ GOOD: "User can create up to 5 profiles"
- ❌ BAD: "Admin can view various reports"
- ✅ GOOD: "Admin can view activity, revenue, and user engagement reports"

**Validation:** Scan for vague quantifiers, note line numbers.

---

### 4. No Implementation Details

**Forbidden implementation specifics (unless capability-relevant):**

- Technology names: React, Vue, Angular, Node.js, PostgreSQL, MongoDB
- Infrastructure: AWS, Docker, Kubernetes, Terraform
- Libraries/frameworks: Redux, Express, FastAPI, Spring Boot
- Data structures: JSON, XML, CSV (unless format is the capability)
- Protocols: REST, GraphQL, WebSocket (unless protocol is the capability)

**When allowed:** If the implementation detail is central to the capability.

- ✅ OK: "API consumers can access endpoints via REST interface"
- ✅ OK: "User can export data as CSV or JSON format"
- ❌ BAD: "User can submit form using React state management"

**Validation:** Scan for technology names, note line numbers, assess if capability-relevant.

---

## Non-Functional Requirements (NFR) Validation Criteria

### 1. Specific Metrics

**Required:** Quantifiable measurement with units and thresholds.

**Examples:**

- ❌ BAD: "System should have fast response times"
- ✅ GOOD: "System response time < 200ms (p95) for all queries"
- ❌ BAD: "Application should be scalable"
- ✅ GOOD: "System supports 10,000 concurrent users with <5% degradation"

**Validation:** Does NFR include measurable criterion with threshold?

---

### 2. Template Compliance

**Required NFR template components:**

1. **Criterion:** What is being measured?
2. **Metric:** Specific measurement with units
3. **Measurement method:** How will this be tested/verified?
4. **Context:** Why this matters, who it affects

**Example:**
"**Performance - Response Time**

- Criterion: API response time
- Metric: < 200ms (p95) for all endpoints
- Measurement: Load testing with 1,000 concurrent users
- Context: Critical for user experience; affects all interactive features"

**Validation:** Are all 4 components present?

---

### 3. Context Included

**Required context elements:**

- **Why this matters:** Business or user impact
- **Who it affects:** User types, stakeholders, systems
- **When it applies:** Conditions, scenarios, environments

**Examples:**

- ✅ GOOD: "Critical for enterprise users who process large data sets daily"
- ✅ GOOD: "Ensures compliance with GDPR requirements for EU users"
- ❌ BAD: (No context provided)

**Validation:** Is rationale or context included for the NFR?

---

## Severity Assessment

**Critical (>10 violations):**
"Many requirements are not measurable or testable. Requirements must be revised to be testable for downstream work."

**Warning (5-10 violations):**
"Some requirements need refinement for measurability. Focus on violating requirements above."

**Pass (<5 violations):**
"Requirements demonstrate good measurability with minimal issues."
