# Step 3: Starter Template Evaluation

**Data File References:**

- `../data/starter-template-evaluation-framework.md` - Complete starter evaluation structure and content templates
- `../data/web-research-protocols.md` - Web search query patterns for starter research

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on evaluating starter template options with current versions
- 🌐 ALWAYS search the web to verify current versions - NEVER trust hardcoded versions
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete architecture
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🌐 Search the web to verify current versions and options
- ⚠️ Present A/P/C menu after generating starter template analysis
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2, 3]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to explore unconventional starter options or custom approaches
- **P (Party Mode)**: Bring multiple perspectives to evaluate starter trade-offs for different use cases
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When 'A' selected: Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step's A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Project context from step 2 is available and complete
- Project context file from step-01 may contain technical preferences
- No architectural decisions made yet - evaluating foundations
- Focus on technical preferences discovery and starter evaluation
- Consider project requirements and existing preferences when evaluating options

## YOUR TASK:

Discover technical preferences and evaluate starter template options, leveraging existing technical preferences and establishing solid architectural foundations.

## STARTER EVALUATION SEQUENCE:

**See:** `../data/starter-template-evaluation-framework.md` for complete document structure and `../data/web-research-protocols.md` for web search query patterns.

**Quick Process Overview:**

### 0. Check Technical Preferences & Context

Review project context file for existing technical preferences (languages, frameworks, databases, tools). Facilitate discussion about preferences, team experience, platform preferences, and existing integrations.

### 1-2. Identify Technology Domain & UX Requirements

Identify primary technology stack (Web, Mobile, API, CLI, Full-stack, Desktop). Consider UX requirements when selecting starter (animations → Framer Motion; forms → React Hook Form; real-time → WebSocket; design system → Storybook; offline → PWA).

### 3-5. Research & Analyze Starter Options

**Use web research protocols from data file** to discover current starter templates, investigate details, and analyze what each starter provides (technology decisions, architectural patterns, development experience features).

### 6-7. Present Options & Get CLI Commands

Present options based on user skill level. If user shows interest, get exact current CLI commands using web research protocols.

### 8. Generate Starter Template Content

**Load framework from:** `../data/starter-template-evaluation-framework.md`

Using the framework structure, document:

1. Primary technology domain identified
2. Starter options comparison with pros/cons
3. Starter selection rationale with key factors
4. Complete initialization command with option explanations
5. All architectural decisions provided by starter
6. Integration with requirements (UX, technical preferences)
7. Remaining decisions not made by starter

### 9-10. Present Content and Handle Menu

Show generated content, present A/P/C menu, handle selection (A: Advanced Elicitation; P: Party Mode; C: Save to document, update frontmatter `stepsCompleted: [1, 2, 3]`, load `./step-04-decisions.md`).

## APPEND TO DOCUMENT:

When user selects 'C', append content using structure from `../data/starter-template-evaluation-framework.md`.

## SUCCESS METRICS:

✅ Technical preferences discovered and documented
✅ Primary technology domain correctly identified
✅ Current starter templates researched using web research protocols
✅ All versions verified using web search (never hardcoded)
✅ Architectural implications clearly documented using framework template
✅ User provided with clear rationale
✅ A/P/C menu presented and handled correctly

## FAILURE MODES:

❌ Not verifying current versions with web search
❌ Ignoring UX requirements or technical preferences
❌ Not documenting architectural decisions made by starter
❌ Not using data file frameworks for content structure
❌ Reading only partial step file
❌ Proceeding without complete understanding

## NEXT STEP:

After 'C' selected and content saved, load `./step-04-decisions.md` for specific architectural decisions. Do NOT proceed until user explicitly selects 'C'.
