# Step 6: Project Structure & Boundaries

**Data File References:**

- `../data/project-structure-document-template.md` - Complete project structure document templates and examples

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on defining complete project structure and clear boundaries
- 🗺️ MAP requirements/epics to architectural components
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🗺️ Create complete project tree, not generic placeholders
- ⚠️ Present A/P/C menu after generating project structure
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to explore innovative project organization approaches
- **P (Party Mode)**: Bring multiple perspectives to evaluate project structure trade-offs
- **C (Continue)**: Save the project structure and proceed to validation

## PROTOCOL INTEGRATION:

- When 'A' selected: Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step's A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- All previous architectural decisions are complete
- Implementation patterns and consistency rules are defined
- Focus on physical project structure and component boundaries
- Map requirements to specific files and directories

## YOUR TASK:

Define the complete project structure and architectural boundaries based on all decisions made, creating a concrete implementation guide for AI agents.

## PROJECT STRUCTURE SEQUENCE:

**See:** `../data/project-structure-document-template.md` for complete document structure and examples.

**Quick Process Overview:**

### 1. Analyze Requirements Mapping

Map requirements to architectural components. From epics: "Epic → module/directory/service" with user stories, dependencies, shared components. From FR categories (if no epics): "FR Category → module/directory/service" with related FRs, shared functionality, integration points.

### 2. Define Project Directory Structure

Create complete project structure based on technology stack and patterns: Root configuration files, source code organization (src/components, src/services, src/utils, etc.), testing directories (unit, integration, e2e), documentation folders, deployment configs.

### 3. Define Integration Boundaries

Document clear boundaries between modules/services: Public APIs/interfaces exported, Internal implementation details (private), Cross-module communication patterns, Data flow between components, Testing boundaries and mocking strategies.

### 4. Create Complete Project Tree

Generate ASCII tree representation of complete project structure with actual file names (not placeholders), configuration files with extensions, test files co-located with source, documentation structure, special directories (assets, migrations, etc.).

### 5. Map Requirements to Structure

Create explicit mapping table: Requirement/Epic → Implementation Location → Key Files → Dependencies. This ensures all requirements have clear implementation homes.

### 6. Generate Structure Content

**Load framework from:** `../data/project-structure-document-template.md`

Using the framework structure, document complete project organization with:

1. Requirements to components mapping
2. Complete directory structure (ASCII tree)
3. Module boundaries and interfaces
4. Cross-cutting concerns organization
5. Testing strategy alignment with structure
6. Deployment artifact organization

### 7-8. Present Content and Handle Menu

Show generated structure content, present A/P/C menu, handle selection (A: Advanced Elicitation; P: Party Mode; C: Save to document, update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`, load `./step-07-validation.md`).

## APPEND TO DOCUMENT:

When user selects 'C', append content using structure from `../data/project-structure-document-template.md`.

## SUCCESS METRICS:

✅ Complete project tree with all files/directories using framework template
✅ Architectural boundaries clearly documented
✅ Requirements/epics mapped to specific locations
✅ Integration points and communication patterns defined
✅ Structure aligned with technology stack
✅ A/P/C menu presented and handled correctly

## FAILURE MODES:

❌ Generic placeholders instead of real file names
❌ Missing cross-module communication patterns
❌ Incomplete requirements mapping
❌ Not using data file framework for structure
❌ Reading only partial step file

## NEXT STEP:

After 'C' selected and content saved, load `./step-07-validation.md` for architecture validation. Do NOT proceed until user explicitly selects 'C'.
