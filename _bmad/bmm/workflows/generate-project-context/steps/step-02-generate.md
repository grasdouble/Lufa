# Step 2: Context Rules Generation

## DATA FILE REFERENCES:

This step uses shared frameworks and templates:

- **../data/context-rule-categories-framework.md**: Comprehensive templates for all 7 rule categories (Technology Stack, Language Rules, Framework Rules, Testing Rules, Quality Rules, Workflow Rules, Anti-Patterns), skill-level-adapted facilitation scripts, content optimization guidelines
- **../data/context-document-template.md**: Final project context document structure, section formatting patterns, content generation guidelines

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ✅ ALWAYS treat this as collaborative discovery between technical peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on unobvious rules that AI agents need to be reminded of
- 🎯 KEEP CONTENT LEAN - optimize for LLM context efficiency
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 📝 Focus on specific, actionable rules rather than general advice
- ⚠️ Present A/P/C menu after each major rule category
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter with completed sections
- 🚫 FORBIDDEN to load next step until all sections are complete

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices for each rule category:

- **A (Advanced Elicitation)**: Use discovery protocols to explore nuanced implementation rules
- **P (Party Mode)**: Bring multiple perspectives to identify critical edge cases
- **C (Continue)**: Save the current rules and proceed to next category

## PROTOCOL INTEGRATION:

- When 'A' selected: Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/\_bmad/core/workflows/party-mode
- PROTOCOLS always return to display this step's A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Discovery results from step-1 are available
- Technology stack and existing patterns are identified
- Focus on rules that prevent implementation mistakes
- Prioritize unobvious details that AI agents might miss

## YOUR TASK:

Collaboratively generate specific, critical rules that AI agents must follow when implementing code in this project.

## CONTEXT GENERATION SEQUENCE:

**For detailed templates and facilitation scripts, see: ../data/context-rule-categories-framework.md**

**For document structure and formatting, see: ../data/context-document-template.md**

### 1. Technology Stack & Versions

Document the exact technology stack from discovery using skill-adapted scripts from the framework:

- Expert Mode: Direct technology list with version constraints
- Intermediate Mode: Core technologies + key dependencies
- Beginner Mode: Friendly descriptions with important notes

See **context-rule-categories-framework.md** for complete scripts and adaptation guidelines.

### 2. Language-Specific Rules

Focus on unobvious language patterns using templates from the framework:

- Configuration requirements
- Import/export patterns
- Error handling patterns
- TypeScript/JavaScript/Python/Ruby specific rules

See **context-rule-categories-framework.md** for language-specific templates.

### 3. Framework-Specific Rules

Document framework patterns using templates from the framework:

- React, Vue, Angular, Next.js, Express rules
- Hooks usage, component structure, state management
- Performance requirements

See **context-rule-categories-framework.md** for framework-specific templates.

### 4. Testing Rules

Focus on testing consistency using templates from the framework:

- Test organization and naming
- Mock patterns and conventions
- Coverage requirements
- Integration vs unit test boundaries

See **context-rule-categories-framework.md** for testing templates.

### 5. Code Quality & Style Rules

Document critical style rules using templates from the framework:

- Linting/formatting requirements
- Code organization patterns
- Naming conventions
- Documentation requirements

See **context-rule-categories-framework.md** for quality and style templates.

### 6. Development Workflow Rules

Document workflow patterns using templates from the framework:

- Branch naming conventions
- Commit message format
- PR requirements
- Deployment considerations

See **context-rule-categories-framework.md** for workflow templates.

### 7. Critical Don't-Miss Rules

Identify mistake-prevention rules using templates from the framework:

- Anti-patterns to avoid
- Edge cases to handle
- Security considerations
- Performance gotchas

See **context-rule-categories-framework.md** for anti-pattern templates.

### 8. Generate Context Content

For each category, prepare lean content using structure from the document template.

See **context-document-template.md** for:

- Complete content structure
- Section formatting patterns
- Content generation examples
- Optimization guidelines

### 9. Present Content and Menu

After each category, show the generated rules and present choices:

"I've drafted the {{category_name}} rules for your project context.

**Here's what I'll add:**

[Show the complete markdown content for this category]

**What would you like to do?**
[A] Advanced Elicitation - Explore nuanced rules for this category
[P] Party Mode - Review from different implementation perspectives
[C] Continue - Save these rules and move to next category"

### 10. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute advanced-elicitation.xml with current category rules
- Process enhanced rules that come back
- Ask user: "Accept these enhanced rules for {{category}}? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute party-mode workflow with category rules context
- Process collaborative insights on implementation patterns
- Ask user: "Accept these changes to {{category}} rules? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Save the current category content to project context file
- Update frontmatter: `sections_completed: [...]`
- Proceed to next category or step-03 if complete

## APPEND TO PROJECT CONTEXT:

When user selects 'C' for a category, append the content directly to `{output_folder}/project-context.md` using the structure from **context-document-template.md**.

## SUCCESS METRICS:

✅ All critical technology versions accurately documented
✅ Language-specific rules cover unobvious patterns
✅ Framework rules capture project-specific conventions
✅ Testing rules ensure consistent test quality
✅ Code quality rules maintain project standards
✅ Workflow rules prevent implementation conflicts
✅ Content is lean and optimized for LLM context
✅ A/P/C menu presented and handled correctly for each category

## FAILURE MODES:

❌ Including obvious rules that agents already know
❌ Making content too verbose for LLM context efficiency
❌ Missing critical anti-patterns or edge cases
❌ Not getting user validation for each rule category
❌ Not documenting exact versions and configurations
❌ Not presenting A/P/C menu after content generation

## NEXT STEP:

After completing all rule categories and user selects 'C' for the final category, load `./step-03-complete.md` to finalize the project context file.

Remember: Do NOT proceed to step-03 until all categories are complete and user explicitly selects 'C' for each!
