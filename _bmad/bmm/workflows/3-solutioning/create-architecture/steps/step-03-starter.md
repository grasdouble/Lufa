# Step 3: Starter Template Evaluation

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

### 0. Check Technical Preferences & Context

**Check Project Context for Existing Technical Preferences:**

Review project context file for existing technical preferences (languages, frameworks, databases, tools, development patterns, platform preferences).

**Discover User Technical Preferences:**

Facilitate discussion about:

- Languages/Frameworks preferences
- Database and infrastructure preferences
- Team experience level with technologies
- Platform/Deployment preferences (AWS, Vercel, Railway, etc.)
- Existing integrations and third-party services

These preferences guide starter template recommendations and architectural decisions.

### 1. Identify Primary Technology Domain

Based on project context analysis and technical preferences, identify the primary technology stack (Web application, Mobile app, API/Backend, CLI tool, Full-stack, or Desktop).

### 2. UX Requirements Consideration

If UX specification was loaded, consider UX requirements when selecting starter:

- **Rich animations** → Framer Motion compatible starter
- **Complex forms** → React Hook Form included starter
- **Real-time features** → Socket.io or WebSocket ready starter
- **Design system** → Storybook-enabled starter
- **Offline capability** → Service worker or PWA configured starter

### 3. Research Current Starter Options

Search the web to find current, maintained starter templates:

```
Search the web: "{{primary_technology}} starter template CLI create command latest"
Search the web: "{{primary_technology}} boilerplate generator latest options"
Search the web: "{{primary_technology}} production-ready starter best practices"
```

### 4. Investigate Top Starter Options

For each promising starter found, investigate details:

```
Search the web: "{{starter_name}} default setup technologies included latest"
Search the web: "{{starter_name}} project structure file organization"
Search the web: "{{starter_name}} production deployment capabilities"
Search the web: "{{starter_name}} recent updates maintenance status"
```

### 5. Analyze What Each Starter Provides

For each viable starter option, document:

**Technology Decisions Made:**

- Language/TypeScript configuration
- Styling solution (CSS, Tailwind, Styled Components, etc.)
- Testing framework setup
- Linting/Formatting configuration
- Build tooling and optimization
- Project structure and organization

**Architectural Patterns Established:**

- Code organization patterns
- Component structure conventions
- API layering approach
- State management setup
- Routing patterns
- Environment configuration

**Development Experience Features:**

- Hot reloading and development server
- TypeScript configuration
- Debugging setup
- Testing infrastructure
- Documentation generation

### 6. Present Starter Options

Present options based on user skill level (Expert: quick list with key decisions; Intermediate: explanations with recommendation; Beginner: friendly analogies with guidance).

For each option, highlight:

- Key architectural decisions it makes
- How it aligns with project needs
- Maintenance and community support

### 7. Get Current CLI Commands

If user shows interest in a starter, get the exact current commands:

```
Search the web: "{{starter_name}} CLI command options flags latest"
Search the web: "{{starter_name}} create new project command examples"
```

### 8. Generate Starter Template Content

**Framework Location:**
`data/starter-template-evaluation-framework.md`

Load the complete starter template evaluation framework from the data file. This framework provides:

- Primary technology domain identification
- Starter options comparison structure
- Selected starter rationale and initialization command
- Architectural decisions provided by starter
- Integration with project requirements
- Remaining architectural decisions to be made

Using the framework structure from `data/starter-template-evaluation-framework.md`:

1. **Document primary technology domain** identified from project analysis
2. **Compare starter options considered** with pros/cons for each
3. **Explain starter selection rationale** with key selection factors
4. **Provide complete initialization command** with option explanations
5. **Document all architectural decisions** provided by the starter (language, styling, build, testing, organization)
6. **Show integration with requirements** including UX and technical preferences
7. **List remaining decisions** not made by starter that require next steps

The framework ensures comprehensive documentation of starter evaluation and selection process.

### 9. Present Content and Menu

Show the generated content and present choices:

"I've analyzed starter template options for {{project_type}} projects.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 8]

**What would you like to do?**
[A] Advanced Elicitation - Explore custom approaches or unconventional starters
[P] Party Mode - Evaluate trade-offs from different perspectives
[C] Continue - Save this decision and move to architectural decisions"

### 10. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml with current starter analysis
- Process enhanced insights about starter options or custom approaches
- Ask user: "Accept these changes to the starter template evaluation? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md with starter evaluation context
- Process collaborative insights about starter trade-offs
- Ask user: "Accept these changes to the starter template evaluation? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/architecture.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3]`
- Load `./step-04-decisions.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 8.

## SUCCESS METRICS:

✅ Primary technology domain correctly identified from project context
✅ Current, maintained starter templates researched and evaluated
✅ All versions verified using web search, not hardcoded
✅ Architectural implications of starter choice clearly documented
✅ User provided with clear rationale for starter selection
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not verifying current versions with web search
❌ Ignoring UX requirements when evaluating starters
❌ Not documenting what architectural decisions the starter makes
❌ Failing to consider maintenance status of starter templates
❌ Not providing clear rationale for starter selection
❌ Not presenting A/P/C menu after content generation
❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-04-decisions.md` to begin making specific architectural decisions.

Remember: Do NOT proceed to step-04 until user explicitly selects 'C' from the A/P/C menu and content is saved!

```

```
