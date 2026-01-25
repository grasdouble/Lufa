# Step 7: Architecture Validation & Completion

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

### 1. Coherence Validation

Check that all architectural decisions work together:

**Decision Compatibility:**

- Do all technology choices work together without conflicts?
- Are all versions compatible with each other?
- Do patterns align with technology choices?
- Are there any contradictory decisions?

**Pattern Consistency:**

- Do implementation patterns support the architectural decisions?
- Are naming conventions consistent across all areas?
- Do structure patterns align with technology stack?
- Are communication patterns coherent?

**Structure Alignment:**

- Does the project structure support all architectural decisions?
- Are boundaries properly defined and respected?
- Does the structure enable the chosen patterns?
- Are integration points properly structured?

### 2. Requirements Coverage Validation

Verify all project requirements are architecturally supported:

**From Epics (if available):**

- Does every epic have architectural support?
- Are all user stories implementable with these decisions?
- Are cross-epic dependencies handled architecturally?
- Are there any gaps in epic coverage?

**From FR Categories (if no epics):**

- Does every functional requirement have architectural support?
- Are all FR categories fully covered by architectural decisions?
- Are cross-cutting FRs properly addressed?
- Are there any missing architectural capabilities?

**Non-Functional Requirements:**

- Are performance requirements addressed architecturally?
- Are security requirements fully covered?
- Are scalability considerations properly handled?
- Are compliance requirements architecturally supported?

### 3. Implementation Readiness Validation

Assess if AI agents can implement consistently:

**Decision Completeness:**

- Are all critical decisions documented with versions?
- Are implementation patterns comprehensive enough?
- Are consistency rules clear and enforceable?
- Are examples provided for all major patterns?

**Structure Completeness:**

- Is the project structure complete and specific?
- Are all files and directories defined?
- Are integration points clearly specified?
- Are component boundaries well-defined?

**Pattern Completeness:**

- Are all potential conflict points addressed?
- Are naming conventions comprehensive?
- Are communication patterns fully specified?
- Are process patterns (error handling, etc.) complete?

### 4. Gap Analysis

Identify and document any missing elements:

**Critical Gaps:**

- Missing architectural decisions that block implementation
- Incomplete patterns that could cause conflicts
- Missing structural elements needed for development
- Undefined integration points

**Important Gaps:**

- Areas that need more detailed specification
- Patterns that could be more comprehensive
- Documentation that would help implementation
- Examples that would clarify complex decisions

**Nice-to-Have Gaps:**

- Additional patterns that would be helpful
- Supplementary documentation
- Tooling recommendations
- Development workflow optimizations

### 5. Address Validation Issues

For any issues found, facilitate resolution:

**Critical Issues:**
"I found some issues that need to be addressed before implementation:

{{critical_issue_description}}

These could cause implementation problems. How would you like to resolve this?"

**Important Issues:**
"I noticed a few areas that could be improved:

{{important_issue_description}}

These aren't blocking, but addressing them would make implementation smoother. Should we work on these?"

**Minor Issues:**
"Here are some minor suggestions for improvement:

{{minor_issue_description}}

These are optional refinements. Would you like to address any of these?"

### 6. Generate Validation Content

**Template Location:**
`data/architecture-validation-template.md`

Load the complete architecture validation template from the data file. This template provides:

- Coherence validation structure (decision compatibility, pattern consistency, structure alignment)
- Requirements coverage validation (epic/feature coverage, FR coverage, NFR coverage)
- Implementation readiness validation (decision, structure, and pattern completeness)
- Gap analysis framework with priority levels
- Architecture completeness checklist
- Readiness assessment and implementation handoff guidelines

Using the template structure from `data/architecture-validation-template.md`:

1. **Complete coherence validation** across all architectural dimensions
2. **Verify requirements coverage** for all epics/features and FRs/NFRs
3. **Assess implementation readiness** with comprehensive completeness checks
4. **Perform gap analysis** identifying critical, important, and nice-to-have gaps
5. **Fill completeness checklist** confirming all architectural aspects are addressed
6. **Provide readiness assessment** with confidence level and key strengths
7. **Document implementation handoff** with AI agent guidelines and first steps

The template ensures comprehensive validation of architectural coherence, completeness, and readiness for consistent AI agent implementation.

### 7. Present Content and Menu

Show the validation results and present choices:

"I've completed a comprehensive validation of your architecture.

**Validation Summary:**

- ✅ Coherence: All decisions work together
- ✅ Coverage: All requirements are supported
- ✅ Readiness: AI agents can implement consistently

**Here's what I'll add to complete the architecture document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Address any complex architectural concerns
[P] Party Mode - Review validation from different implementation perspectives
[C] Continue - Complete the architecture and finish workflow"

### 8. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml with validation issues
- Process enhanced solutions for complex concerns
- Ask user: "Accept these architectural improvements? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md with validation context
- Process collaborative insights on implementation readiness
- Ask user: "Accept these changes to the validation results? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/architecture.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Load `./step-08-complete.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ All architectural decisions validated for coherence
✅ Complete requirements coverage verified
✅ Implementation readiness confirmed
✅ All gaps identified and addressed
✅ Comprehensive validation checklist completed
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Skipping validation of decision compatibility
❌ Not verifying all requirements are architecturally supported
❌ Missing potential implementation conflicts
❌ Not addressing gaps found during validation
❌ Providing incomplete validation checklist
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-08-complete.md` to complete the workflow and provide implementation guidance.

Remember: Do NOT proceed to step-08 until user explicitly selects 'C' from the A/P/C menu and content is saved!
