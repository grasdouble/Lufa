# Step 6: Project Structure & Boundaries

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

### 1. Analyze Requirements Mapping

Map project requirements to architectural components:

**From Epics (if available):**
"Epic: {{epic_name}} → Lives in {{module/directory/service}}"

- User stories within the epic
- Cross-epic dependencies
- Shared components needed

**From FR Categories (if no epics):**
"FR Category: {{fr_category_name}} → Lives in {{module/directory/service}}"

- Related functional requirements
- Shared functionality across categories
- Integration points between categories

### 2. Define Project Directory Structure

Based on technology stack and patterns, create the complete project structure:

**Root Configuration Files:**

- Package management files (package.json, requirements.txt, etc.)
- Build and development configuration
- Environment configuration files
- CI/CD pipeline files
- Documentation files

**Source Code Organization:**

- Application entry points
- Core application structure
- Feature/module organization
- Shared utilities and libraries
- Configuration and environment files

**Test Organization:**

- Unit test locations and structure
- Integration test organization
- End-to-end test structure
- Test utilities and fixtures

**Build and Distribution:**

- Build output directories
- Distribution files
- Static assets
- Documentation build

### 3. Define Integration Boundaries

Map how components communicate and where boundaries exist:

**API Boundaries:**

- External API endpoints
- Internal service boundaries
- Authentication and authorization boundaries
- Data access layer boundaries

**Component Boundaries:**

- Frontend component communication patterns
- State management boundaries
- Service communication patterns
- Event-driven integration points

**Data Boundaries:**

- Database schema boundaries
- Data access patterns
- Caching boundaries
- External data integration points

### 4. Create Complete Project Tree

Generate a comprehensive directory structure showing all files and directories.

**Important:** Use the technology-specific structure examples from `data/project-structure-document-template.md` as a reference. The template includes complete examples for:

- Next.js Full-Stack applications
- API Backend (NestJS) applications

Adapt these examples to match the specific technology stack chosen for this project.

### 5. Map Requirements to Structure

Create explicit mapping from project requirements to specific files/directories:

**Epic/Feature Mapping:**
"Epic: User Management

- Components: src/components/features/users/
- Services: src/services/users/
- API Routes: src/app/api/users/
- Database: prisma/migrations/_*users*_
- Tests: tests/features/users/"

**Cross-Cutting Concerns:**
"Authentication System

- Components: src/components/auth/
- Services: src/services/auth/
- Middleware: src/middleware/auth.ts
- Guards: src/guards/auth.guard.ts
- Tests: tests/auth/"

### 6. Generate Structure Content

**Template Location:**
`data/project-structure-document-template.md`

Load the complete project structure template from the data file. This template provides:

- Complete directory structure with technology-specific examples
- Architectural boundary definitions (API, Component, Service, Data)
- Requirements to structure mapping patterns
- Integration points and communication patterns
- File organization standards
- Development workflow integration guidelines

Using the template structure from `data/project-structure-document-template.md`:

1. **Fill the complete project tree** based on technology stack and architectural decisions
2. **Define all architectural boundaries** for API, components, services, and data access
3. **Map requirements to specific directories** showing exactly where epics/features live
4. **Document integration points** for internal and external communication
5. **Specify file organization patterns** for configuration, source, tests, and assets
6. **Include workflow integration details** for development, build, and deployment

The template includes examples for Next.js and NestJS projects that can be adapted to your specific technology choices.

### 7. Present Content and Menu

Show the generated project structure content and present choices:

"I've created a complete project structure based on all our architectural decisions.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Explore innovative project organization approaches
[P] Party Mode - Review structure from different development perspectives
[C] Continue - Save this structure and move to architecture validation"

### 8. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml with current project structure
- Process enhanced organizational insights that come back
- Ask user: "Accept these changes to the project structure? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md with project structure context
- Process collaborative insights about organization trade-offs
- Ask user: "Accept these changes to the project structure? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/architecture.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Load `./step-07-validation.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Complete project tree defined with all files and directories
✅ All architectural boundaries clearly documented
✅ Requirements/epics mapped to specific locations
✅ Integration points and communication patterns defined
✅ Project structure aligned with chosen technology stack
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Creating generic placeholder structure instead of specific, complete tree
❌ Not mapping requirements to specific files and directories
❌ Missing important integration boundaries
❌ Not considering the chosen technology stack in structure design
❌ Not defining how components communicate across boundaries
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-07-validation.md` to validate architectural coherence and completeness.

Remember: Do NOT proceed to step-07 until user explicitly selects 'C' from the A/P/C menu and content is saved!
