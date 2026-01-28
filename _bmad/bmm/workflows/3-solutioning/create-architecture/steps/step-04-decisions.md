# Step 4: Core Architectural Decisions

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on making critical architectural decisions collaboratively
- 🌐 ALWAYS search the web to verify current technology versions
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🌐 Search the web to verify technology versions and options
- ⚠️ Present A/P/C menu after each major decision category
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2, 3, 4]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices for each decision category:

- **A (Advanced Elicitation)**: Use discovery protocols to explore innovative approaches to specific decisions
- **P (Party Mode)**: Bring multiple perspectives to evaluate decision trade-offs
- **C (Continue)**: Save the current decisions and proceed to next decision category

## PROTOCOL INTEGRATION:

- When 'A' selected: Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step's A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Project context from step 2 is available
- Starter template choice from step 3 is available
- Project context file may contain technical preferences and rules
- Technical preferences discovered in step 3 are available
- Focus on decisions not already made by starter template or existing preferences
- Collaborative decision making, not recommendations

## YOUR TASK:

Facilitate collaborative architectural decision making, leveraging existing technical preferences and starter template decisions, focusing on remaining choices critical to the project's success.

## DECISION MAKING SEQUENCE:

### 1. Load Decision Framework & Check Existing Preferences

**Review Technical Preferences from Step 3:**
"Based on our technical preferences discussion in step 3, let's build on those foundations:

**Your Technical Preferences:**
{{user_technical_preferences_from_step_3}}

**Starter Template Decisions:**
{{starter_template_decisions}}

**Project Context Technical Rules:**
{{project_context_technical_rules}}"

**Identify Remaining Decisions:**
Based on technical preferences, starter template choice, and project context, identify remaining critical decisions:

**Already Decided (Don't re-decide these):**

- {{starter_template_decisions}}
- {{user_technology_preferences}}
- {{project_context_technical_rules}}

**Critical Decisions:** Must be decided before implementation can proceed
**Important Decisions:** Shape the architecture significantly
**Nice-to-Have:** Can be deferred if needed

### 2. Decision Categories by Priority

#### Category 1: Data Architecture

- Database choice (if not determined by starter)
- Data modeling approach
- Data validation strategy
- Migration approach
- Caching strategy

#### Category 2: Authentication & Security

- Authentication method
- Authorization patterns
- Security middleware
- Data encryption approach
- API security strategy

#### Category 3: API & Communication

- API design patterns (REST, GraphQL, etc.)
- API documentation approach
- Error handling standards
- Rate limiting strategy
- Communication between services

#### Category 4: Frontend Architecture (if applicable)

- State management approach
- Component architecture
- Routing strategy
- Performance optimization
- Bundle optimization

#### Category 5: Infrastructure & Deployment

- Hosting strategy
- CI/CD pipeline approach
- Environment configuration
- Monitoring and logging
- Scaling strategy

### 3. Facilitate Each Decision Category

For each category, facilitate collaborative decision making based on user skill level:

**Expert Mode:** Present concise options with tradeoffs, get quick preference  
**Intermediate Mode:** Provide brief explanations and lean toward recommendation with rationale  
**Beginner Mode:** Use educational context and real-world analogies to explain choices

**Verify Technology Versions:** Search web for current stable/LTS versions

**Get User Input and Record Decision:** Capture category, choice, version, rationale, affected components

### 4. Check for Cascading Implications

After each major decision, identify related decisions:

"This choice means we'll also need to decide:

- {{related_decision_1}}
- {{related_decision_2}}"

### 5. Generate Decisions Content

**Framework Location:**
`data/architectural-decisions-framework.md`

Load the complete architectural decisions framework from the data file. This framework provides:

- Decision priority analysis (critical, important, deferred)
- Category-based decision structure (Data, Auth/Security, API, Frontend, Infrastructure)
- Decision impact analysis with implementation sequence
- Cross-component dependencies mapping
- Technology version compatibility matrix

Using the framework structure from `data/architectural-decisions-framework.md`:

1. **Categorize all decisions by priority** (critical, important, deferred)
2. **Document decisions in each category** with versions, rationale, and affected components
3. **Analyze decision impact** showing implementation sequence and dependencies
4. **Map cross-component dependencies** between related decisions
5. **Create version compatibility matrix** for critical technologies
6. **Summarize decision rationale** including key factors and trade-offs made

The framework ensures comprehensive documentation of all architectural decisions with clear rationale and implementation guidance.

### 6. Present Content and Menu

Show the generated decisions content and present choices:

"I've documented all the core architectural decisions we've made together.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 5]

**What would you like to do?**
[A] Advanced Elicitation - Explore innovative approaches to any specific decisions
[P] Party Mode - Review decisions from multiple perspectives
[C] Continue - Save these decisions and move to implementation patterns"

### 7. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml with specific decision categories
- Process enhanced insights about particular decisions
- Ask user: "Accept these enhancements to the architectural decisions? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md with architectural decisions context
- Process collaborative insights about decision trade-offs
- Ask user: "Accept these changes to the architectural decisions? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/architecture.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4]`
- Load `./step-05-patterns.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 5.

## SUCCESS METRICS:

✅ All critical architectural decisions made collaboratively
✅ Technology versions verified using web search
✅ Decision rationale clearly documented
✅ Cascading implications identified and addressed
✅ User provided appropriate level of explanation for skill level
✅ A/P/C menu presented and handled correctly for each category
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Making recommendations instead of facilitating decisions
❌ Not verifying technology versions with web search
❌ Missing cascading implications between decisions
❌ Not adapting explanations to user skill level
❌ Forgetting to document decisions made by starter template
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-05-patterns.md` to define implementation patterns that ensure consistency across AI agents.

Remember: Do NOT proceed to step-05 until user explicitly selects 'C' from the A/P/C menu and content is saved!
