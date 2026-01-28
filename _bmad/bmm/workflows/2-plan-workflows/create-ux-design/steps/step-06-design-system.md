# Step 6: Design System Choice

## DATA FILE REFERENCES:

This step uses shared frameworks and templates:

- **../data/ux-workflow-menu-handling.md**: A/P/C menu protocols, success metrics, failure modes
- **../data/design-system-selection-framework.md**: Three design system approaches (Custom, Established, Themeable), decision factors, specific options (Material, Ant Design, MUI, Chakra, Tailwind), decision framework questions, implementation and customization strategy

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on choosing appropriate design system approach
- 🎯 COLLABORATIVE decision-making, not recommendation-only
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating design system decision content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

For detailed A/P/C menu handling, see: **../data/ux-workflow-menu-handling.md**

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper design system insights
- **P (Party Mode)**: Bring multiple perspectives to evaluate design system options
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

For detailed protocol integration, see: **../data/ux-workflow-menu-handling.md**

- When 'A' selected: Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step's A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Platform requirements from step 3 inform design system choice
- Inspiration patterns from step 5 guide design system selection
- Focus on choosing foundation for consistent design

## YOUR TASK:

Choose appropriate design system approach based on project requirements and constraints.

## DESIGN SYSTEM CHOICE SEQUENCE:

**For detailed frameworks, decision factors, and templates, see: ../data/design-system-selection-framework.md**

### 1. Present Design System Options

Educate about design system approaches using the LEGO metaphor and three approaches from the framework:

- **Custom Design System**: Complete uniqueness, full control, higher investment
- **Established System**: Fast development, great defaults, less differentiation
- **Themeable System**: Customizable foundation, brand flexibility, balanced approach

See **design-system-selection-framework.md** for complete approach descriptions and when to choose each.

### 2. Analyze Project Requirements

Guide decision based on project context using factors from the framework:

- Platform, timeline, team size considerations
- Brand requirements and technical constraints
- Speed vs uniqueness trade-offs
- Team expertise and maintenance considerations

See **design-system-selection-framework.md** for complete decision factors and evaluation criteria.

### 3. Explore Specific Design System Options

Dive deeper into relevant options using recommendations from the framework:

- Platform-specific recommendations (Web: MUI, Chakra UI, Tailwind UI, Ant Design)
- Component library quality and documentation
- Customization capabilities and accessibility
- Performance and learning curve

See **design-system-selection-framework.md** for complete options by platform and evaluation checklist.

### 4. Facilitate Decision Process

Help user make informed choice using decision framework from the framework:

1. What's most important: Speed, uniqueness, or balance?
2. How much design expertise does your team have?
3. Are there existing brand guidelines to follow?
4. What's your timeline and budget?
5. Long-term maintenance needs?

See **design-system-selection-framework.md** for complete decision facilitation scripts.

### 5. Finalize Design System Choice

Confirm and document the decision with rationale based on project needs, constraints, and team considerations.

See **design-system-selection-framework.md** for rationale templates and next steps guidance.

### 6. Generate Design System Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

```markdown
## Design System Foundation

### 1.1 Design System Choice

[Design system choice based on conversation]

### Rationale for Selection

[Rationale for design system selection based on conversation]

### Implementation Approach

[Implementation approach based on chosen system]

### Customization Strategy

[Customization strategy based on project needs]
```

### 7. Present Content and Menu

For detailed menu handling procedures, see: **../data/ux-workflow-menu-handling.md**

Show the generated design system content and present choices:
"I've documented our design system choice for {{project_name}}. This foundation will ensure consistency and speed up development.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let's refine our design system decision
[P] Party Mode - Bring technical perspectives on design systems
[C] Continue - Save this to the document and move to defining experience

### 8. Handle Menu Selection

For detailed menu handling logic and protocols, see: **../data/ux-workflow-menu-handling.md**

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml with the current design system content
- Process the enhanced design system insights that come back
- Ask user: "Accept these improvements to the design system decision? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md with the current design system choice
- Process the collaborative design system insights that come back
- Ask user: "Accept these changes to the design system decision? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/ux-design-specification.md`
- Update frontmatter: append step to end of stepsCompleted array
- Load `./step-07-defining-experience.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

For complete success metrics and patterns, see: **../data/ux-workflow-menu-handling.md**

✅ Design system options clearly presented and explained
✅ Decision framework applied to project requirements
✅ Specific design system chosen with clear rationale
✅ Implementation approach planned
✅ Customization strategy defined
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

For complete failure mode patterns, see: **../data/ux-workflow-menu-handling.md**

❌ Not explaining design system concepts clearly
❌ Rushing to recommendation without understanding requirements
❌ Not considering technical constraints or team capabilities
❌ Choosing design system without clear rationale
❌ Not planning implementation approach
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting 'C'

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-07-defining-experience.md` to define the core user interaction.

Remember: Do NOT proceed to step-07 until user explicitly selects 'C' from the A/P/C menu and content is saved!
