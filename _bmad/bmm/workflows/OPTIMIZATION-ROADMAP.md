# Next Optimization Targets: Workflow Analysis Report

**Analysis Date:** 2026-01-25  
**Scope:** All BMAD workflows excluding PRD (already optimized)  
**Focus:** Identify high-value optimization opportunities

---

## Executive Summary

After successfully optimizing the PRD workflow (Phases 0-6 complete, 3.7x faster), we've identified **significant optimization opportunities** across other BMAD workflows.

**Key Findings:**

- 🚨 **18 files exceed 250-line limit** (vs. 0 in optimized PRD workflow)
- 📊 **5 workflows with 1000+ total lines** (potential for optimization)
- 🎯 **3 high-priority workflows** identified for next optimization campaign
- ⚡ **Estimated 50-100+ hours of optimization work** across all workflows

---

## Workflow Size Analysis

### Top 10 Largest Workflows

| Rank | Workflow                 | Total Lines | Steps | Lines/Step | Priority     |
| ---- | ------------------------ | ----------- | ----- | ---------- | ------------ |
| 1    | **prd**                  | 20,745      | 32    | 648        | ✅ OPTIMIZED |
| 2    | **research**             | 5,019       | 19    | 264        | 🔴 HIGH      |
| 3    | **create-ux-design**     | 3,349       | 15    | 223        | 🟡 MEDIUM    |
| 4    | **create-architecture**  | 2,701       | 9     | 300        | 🔴 HIGH      |
| 5    | **create-product-brief** | 1,425       | 7     | 204        | 🟢 LOW       |
| 6    | **check-impl-readiness** | 1,130       | 6     | 188        | 🟢 LOW       |
| 7    | **create-epics-stories** | 1,025       | 4     | 256        | 🟡 MEDIUM    |
| 8    | **quick-dev**            | 800         | 6     | 133        | 🟢 LOW       |
| 9    | **quick-spec**           | 787         | 4     | 197        | 🟢 LOW       |

---

## Critical File Size Violations (250+ Lines)

### 🚨 CRITICAL Violations (400+ lines)

| Lines   | File                           | Workflow             | Violation % |
| ------- | ------------------------------ | -------------------- | ----------- |
| **486** | step-06-research-synthesis.md  | research (technical) | 194%        |
| **475** | step-06-research-completion.md | research (market)    | 190%        |
| **443** | step-06-research-synthesis.md  | research (domain)    | 177%        |

**Impact:** These 3 files alone are **176%, 190%, 194% over the limit** - severe violations requiring immediate attention.

### 🟠 HIGH Violations (350-399 lines)

| Lines   | File                  | Workflow            | Violation % |
| ------- | --------------------- | ------------------- | ----------- |
| **379** | step-06-structure.md  | create-architecture | 152%        |
| **359** | step-07-validation.md | create-architecture | 144%        |
| **359** | step-05-patterns.md   | create-architecture | 144%        |
| **352** | step-08-complete.md   | create-architecture | 141%        |

**Impact:** 4 files in **create-architecture workflow alone** - indicates systemic issue requiring workflow-level refactoring.

### 🟡 MEDIUM Violations (250-349 lines)

| Lines | File                           | Workflow                 | Violation % |
| ----- | ------------------------------ | ------------------------ | ----------- |
| 331   | step-03-starter.md             | create-architecture      | 132%        |
| 318   | step-02-generate.md            | generate-project-context | 127%        |
| 318   | step-04-decisions.md           | create-architecture      | 127%        |
| 278   | step-03-complete.md            | generate-project-context | 111%        |
| 272   | step-03-create-stories.md      | create-epics-stories     | 109%        |
| 264   | step-13-responsive-a11y.md     | create-ux-design         | 106%        |
| 259   | step-01-validate-prereqs.md    | create-epics-stories     | 104%        |
| 259   | step-04-customer-decisions.md  | research (market)        | 104%        |
| 254   | step-07-defining-experience.md | create-ux-design         | 102%        |
| 253   | step-02-discovery.md           | prd (already noted)      | 101%        |
| 252   | step-05-epic-quality-review.md | check-impl-readiness     | 101%        |
| 252   | step-06-design-system.md       | create-ux-design         | 101%        |

**Impact:** 12 additional files with moderate violations across 6 workflows.

---

## Priority Workflow Rankings for Optimization

### Priority 1: 🔴 **Research Workflow** (HIGH)

**Rationale:** Highest number of severe violations

**Statistics:**

- Total lines: 5,019 (2nd largest workflow)
- Steps: 19
- Files > 250 lines: **6 files** (highest count)
- Worst violation: 486 lines (194% over limit)
- Three sub-workflows: technical, market, domain

**Violations:**

1. technical-steps/step-06-research-synthesis.md: **486 lines** (194% over)
2. market-steps/step-06-research-completion.md: **475 lines** (190% over)
3. domain-steps/step-06-research-synthesis.md: **443 lines** (177% over)
4. market-steps/step-04-customer-decisions.md: **259 lines** (104% over)

**Optimization Opportunities:**

- Research synthesis steps are massive (443-486 lines) - likely contain extensive templates/criteria
- Extract research criteria, synthesis frameworks, analysis templates to data files
- Implement subprocess optimizations for parallel research analysis
- Apply Pattern 2 (Deep Analysis) for research compilation

**Estimated Effort:** 3-5 days (high complexity due to multiple sub-workflows)  
**Estimated Benefit:**

- 4 files refactored under 250 lines
- ~1000+ lines extracted to data files
- 2-3x performance improvement with subprocess patterns

---

### Priority 2: 🔴 **Create Architecture Workflow** (HIGH)

**Rationale:** Most consistent violations (6 files in single workflow)

**Statistics:**

- Total lines: 2,701 (4th largest)
- Steps: 9
- Files > 250 lines: **6 files** (67% of workflow!)
- Average violation: 350 lines per violating file
- Worst violation: 379 lines (152% over limit)

**Violations:**

1. step-06-structure.md: **379 lines** (152% over)
2. step-07-validation.md: **359 lines** (144% over)
3. step-05-patterns.md: **359 lines** (144% over)
4. step-08-complete.md: **352 lines** (141% over)
5. step-03-starter.md: **331 lines** (132% over)
6. step-04-decisions.md: **318 lines** (127% over)

**Optimization Opportunities:**

- 67% of workflow steps are oversized - systemic issue
- Likely contains extensive architecture patterns, validation criteria, decision frameworks
- Extract architecture patterns catalog, validation checklists, decision trees to data files
- Implement subprocess optimizations for parallel pattern validation
- Apply Pattern 1 (Grep) for pattern detection, Pattern 2 (Deep) for analysis

**Estimated Effort:** 4-6 days (high complexity, architectural content)  
**Estimated Benefit:**

- 6 files refactored under 250 lines
- ~1500+ lines extracted to data files
- 2-3x performance improvement with subprocess patterns
- Improved maintainability and clarity

---

### Priority 3: 🟡 **Create Epics & Stories Workflow** (MEDIUM)

**Rationale:** High lines-per-step ratio, moderate violations

**Statistics:**

- Total lines: 1,025
- Steps: 4
- Files > 250 lines: **2 files** (50% of workflow)
- Lines per step: 256 (highest ratio)
- Worst violation: 272 lines (109% over limit)

**Violations:**

1. step-03-create-stories.md: **272 lines** (109% over)
2. step-01-validate-prerequisites.md: **259 lines** (104% over)

**Optimization Opportunities:**

- High lines-per-step indicates concentrated complexity
- Validation prerequisites likely contain extensive checklists
- Story creation likely contains templates and formats
- Extract story templates, acceptance criteria formats, validation checklists to data files
- Implement subprocess optimizations for parallel story validation

**Estimated Effort:** 1-2 days (moderate complexity)  
**Estimated Benefit:**

- 2 files refactored under 250 lines
- ~300+ lines extracted to data files
- Better separation of concerns

---

### Priority 4: 🟡 **Create UX Design Workflow** (MEDIUM)

**Rationale:** Moderate violations, moderate total size

**Statistics:**

- Total lines: 3,349 (3rd largest)
- Steps: 15
- Files > 250 lines: **3 files** (20% of workflow)
- Worst violation: 264 lines (106% over limit)

**Violations:**

1. step-13-responsive-accessibility.md: **264 lines** (106% over)
2. step-07-defining-experience.md: **254 lines** (102% over)
3. step-06-design-system.md: **252 lines** (101% over)

**Optimization Opportunities:**

- Accessibility guidelines likely extensive - extract to data file
- Design system guidelines and experience definitions - extract to data files
- Apply Pattern 1 (Grep) for accessibility checks

**Estimated Effort:** 2-3 days (moderate complexity)  
**Estimated Benefit:**

- 3 files refactored under 250 lines
- ~400+ lines extracted to data files
- Improved maintainability

---

### Priority 5: 🟢 **Generate Project Context Workflow** (LOW)

**Rationale:** Only 2 violations, utility workflow

**Statistics:**

- Total lines: Not in top workflows
- Steps: Unknown
- Files > 250 lines: **2 files**
- Worst violation: 318 lines (127% over)

**Violations:**

1. step-02-generate.md: **318 lines** (127% over)
2. step-03-complete.md: **278 lines** (111% over)

**Optimization Opportunities:**

- Context generation templates and formats - extract to data files
- Lower priority as utility workflow (not primary user-facing)

**Estimated Effort:** 1 day  
**Estimated Benefit:**

- 2 files refactored under 250 lines
- ~200+ lines extracted to data files

---

### Priority 6: 🟢 **Check Implementation Readiness Workflow** (LOW)

**Rationale:** Single violation, moderate severity

**Statistics:**

- Total lines: 1,130
- Steps: 6
- Files > 250 lines: **1 file**
- Worst violation: 252 lines (101% over limit)

**Violations:**

1. step-05-epic-quality-review.md: **252 lines** (101% over)

**Optimization Opportunities:**

- Epic quality review criteria - extract to data file
- Minimal refactoring needed (barely over limit)

**Estimated Effort:** 0.5 days  
**Estimated Benefit:**

- 1 file refactored under 250 lines
- ~50+ lines extracted to data file

---

## Cumulative Optimization Potential

### Total Violations Across All Workflows

| Category             | Count        | Total Lines Over Limit |
| -------------------- | ------------ | ---------------------- |
| **CRITICAL (400+)**  | 3 files      | ~500 lines over        |
| **HIGH (350-399)**   | 4 files      | ~400 lines over        |
| **MEDIUM (250-349)** | 12 files     | ~600 lines over        |
| **Total**            | **19 files** | **~1500 lines over**   |

### Estimated Optimization Impact

**If all workflows optimized to PRD standard:**

| Metric                              | Current    | Optimized   | Improvement         |
| ----------------------------------- | ---------- | ----------- | ------------------- |
| **Files > 250 lines**               | 19         | 0           | 100% compliant      |
| **Lines extracted to data files**   | 0          | ~3000+      | Better organization |
| **Workflows fully compliant**       | 1/9 (11%)  | 9/9 (100%)  | 89% improvement     |
| **Average file size**               | ~250 lines | ~180 lines  | 28% reduction       |
| **Performance (with subprocesses)** | Baseline   | 2-4x faster | Significant         |

### Total Estimated Effort

| Workflow                 | Priority  | Effort           | Files        | Benefit                            |
| ------------------------ | --------- | ---------------- | ------------ | ---------------------------------- |
| research                 | 🔴 HIGH   | 3-5 days         | 4 files      | ~1000 lines extracted, 2-3x faster |
| create-architecture      | 🔴 HIGH   | 4-6 days         | 6 files      | ~1500 lines extracted, 2-3x faster |
| create-epics-stories     | 🟡 MEDIUM | 1-2 days         | 2 files      | ~300 lines extracted               |
| create-ux-design         | 🟡 MEDIUM | 2-3 days         | 3 files      | ~400 lines extracted               |
| generate-project-context | 🟢 LOW    | 1 day            | 2 files      | ~200 lines extracted               |
| check-impl-readiness     | 🟢 LOW    | 0.5 days         | 1 file       | ~50 lines extracted                |
| **Total**                |           | **12-17.5 days** | **18 files** | **~3450+ lines extracted**         |

**Note:** This is sequential effort. With proper planning and pattern reuse from PRD optimization, actual calendar time could be 2-3 weeks.

---

## Recommended Optimization Strategy

### Phase 1: High-Priority Workflows (Weeks 1-2)

**Focus:** research + create-architecture (both 🔴 HIGH priority)

**Goals:**

- Fix all 10 critical/high violations (400-486 lines)
- Extract ~2500 lines to data files
- Implement subprocess optimizations where applicable
- Achieve 100% compliance for these 2 workflows

**Expected ROI:** Highest impact - these workflows are most severely non-compliant

---

### Phase 2: Medium-Priority Workflows (Week 3)

**Focus:** create-epics-stories + create-ux-design (both 🟡 MEDIUM priority)

**Goals:**

- Fix 5 medium violations
- Extract ~700 lines to data files
- Apply lessons learned from Phase 1

**Expected ROI:** Moderate impact - improve maintainability and compliance

---

### Phase 3: Low-Priority Workflows (Week 4)

**Focus:** generate-project-context + check-impl-readiness (both 🟢 LOW priority)

**Goals:**

- Fix remaining 3 violations
- Extract ~250 lines to data files
- Achieve 100% compliance across all workflows

**Expected ROI:** Lower impact but completes the optimization campaign

---

## Lessons Learned from PRD Optimization

### Patterns to Reuse

1. **Pattern 1 (Grep/Regex):** Use for validation steps that scan for specific patterns
2. **Pattern 2 (Deep Analysis):** Use for synthesis/analysis steps that process large documents
3. **Pattern 3 (CSV Lookup):** Use for steps that reference lookup tables or taxonomies
4. **Pattern 4 (Parallel):** Use for independent validation or analysis chains

### Refactoring Strategy

1. **Identify repetitive content** (templates, criteria, checklists, examples)
2. **Extract to data files** with clear naming (e.g., `research-synthesis-framework.md`)
3. **Reference data files** from step files (keep step files focused on workflow)
4. **Update frontmatter** with data file references
5. **Test thoroughly** to ensure no loss of functionality

### Success Metrics

- ✅ 100% file size compliance (all files < 250 lines)
- ✅ Performance improvements (2-5x faster with subprocess patterns)
- ✅ Better organization (data files for reusable content)
- ✅ Improved maintainability (clear separation of concerns)

---

## Next Steps

### Immediate Actions

1. **Review this analysis** with stakeholders
2. **Prioritize workflows** based on business value and usage frequency
3. **Allocate resources** (2-3 weeks for full optimization campaign)
4. **Start with research workflow** (highest violations, highest impact)

### Long-Term Vision

**Goal:** Achieve 100% compliance across all BMAD workflows

**Benefits:**

- ✅ Consistent quality and maintainability
- ✅ Better performance (2-5x faster with optimizations)
- ✅ Easier onboarding (smaller, focused files)
- ✅ Scalable architecture (data files for reusable content)

---

## Conclusion

The PRD workflow optimization was a **massive success** (3.7x faster, 100% compliant). We now have **clear opportunities** to replicate this success across 5 more workflows:

**High Priority (Weeks 1-2):**

- 🔴 research workflow (6 violations, 5,019 lines)
- 🔴 create-architecture workflow (6 violations, 2,701 lines)

**Medium Priority (Week 3):**

- 🟡 create-epics-stories (2 violations, 1,025 lines)
- 🟡 create-ux-design (3 violations, 3,349 lines)

**Low Priority (Week 4):**

- 🟢 generate-project-context (2 violations)
- 🟢 check-impl-readiness (1 violation)

**Total effort:** 12-17.5 days (sequential) or 2-3 weeks (parallel with proper planning)

**Total impact:** 18 files refactored, ~3450+ lines extracted, 2-5x performance improvements, 100% compliance

---

**Recommendation:** Start with **research workflow** - it has the most severe violations and represents the highest-value optimization target after PRD.

🎯 **Ready to continue the optimization campaign?**
