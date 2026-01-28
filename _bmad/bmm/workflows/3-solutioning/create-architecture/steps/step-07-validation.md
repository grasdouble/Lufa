# Step 7: Architecture Validation & Completion

**Data File References:**

- `../data/architecture-validation-template.md` - Complete validation framework and checklist templates

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on validating architectural coherence and completeness
- ✅ VALIDATE all requirements are covered by architectural decisions
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ✅ Run comprehensive validation checks on the complete architecture
- ⚠️ Present A/P/C menu after generating validation results
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to address complex architectural issues found during validation
- **P (Party Mode)**: Bring multiple perspectives to resolve validation concerns
- **C (Continue)**: Save the validation results and complete the architecture

## PROTOCOL INTEGRATION:

- When 'A' selected: Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step's A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Complete architecture document with all sections is available
- All architectural decisions, patterns, and structure are defined
- Focus on validation, gap analysis, and coherence checking
- Prepare for handoff to implementation phase

## YOUR TASK:

Validate the complete architecture for coherence, completeness, and readiness to guide AI agents through consistent implementation.

## VALIDATION SEQUENCE:

**See:** `../data/architecture-validation-template.md` for complete validation framework and checklists.

**Quick Process Overview:**

### 1. Coherence Validation
Check all architectural decisions work together: Decision compatibility (technology versions, patterns alignment, no contradictions), Pattern consistency (implementation patterns, naming conventions, structure patterns, communication patterns), Structure alignment (supports decisions, boundaries defined, enables patterns, integration points structured).

### 2. Requirements Coverage Validation
Verify all requirements architecturally supported: From epics (if available): every epic supported, user stories implementable, cross-epic dependencies handled. From FR categories (if no epics): all FRs covered, architectural capabilities present. Non-functional requirements: performance, security, scalability, compliance architecturally addressed.

### 3. Implementation Readiness Validation
Assess AI agent implementation readiness: Decision completeness (all decisions documented with versions, patterns comprehensive, consistency rules clear, examples provided), Structure completeness (complete/specific tree, files/directories defined, integration points specified, boundaries well-defined), Pattern completeness (conflict points addressed, naming comprehensive, communication specified, process patterns complete).

### 4. Gap Analysis
Identify and document gaps: Missing architectural decisions, Incomplete patterns or rules, Unaddressed requirements, Integration gaps, Structure gaps, Pattern conflicts or ambiguities.

### 5. Address Validation Issues
For each gap/issue found: Propose architectural decision/pattern/rule to address it. Ensure coherence with existing decisions. Document in appropriate architecture section. Re-validate after changes.

### 6. Generate Validation Content
**Load framework from:** `../data/architecture-validation-template.md`

Using the framework structure, document:
1. Coherence validation results
2. Requirements coverage assessment  
3. Implementation readiness evaluation
4. Gaps identified and resolutions
5. Final validation status

### 7-8. Present Content and Handle Menu
Show validation results, present A/P/C menu, handle selection (A: Advanced Elicitation; P: Party Mode; C: Save to document, update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`, load `./step-08-complete.md`).

## APPEND TO DOCUMENT:

When user selects 'C', append content using structure from `../data/architecture-validation-template.md`.

## SUCCESS METRICS:

✅ Architectural decisions validated for coherence using framework
✅ Complete requirements coverage verified
✅ Implementation readiness confirmed
✅ All gaps identified and addressed
✅ A/P/C menu presented and handled correctly

## FAILURE MODES:

❌ Skipping validation of decision compatibility
❌ Not verifying requirements architecturally supported
❌ Missing implementation conflicts
❌ Not addressing validation gaps
❌ Not using data file framework

## NEXT STEP:

After 'C' selected and content saved, load `./step-08-complete.md` to complete workflow. Do NOT proceed until user explicitly selects 'C'.
