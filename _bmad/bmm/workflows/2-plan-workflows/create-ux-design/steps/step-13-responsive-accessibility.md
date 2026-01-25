# Step 13: Responsive Design & Accessibility

## DATA FILE REFERENCES:

This step uses shared frameworks and templates:

- **../data/ux-workflow-menu-handling.md**: A/P/C menu protocols, success metrics, failure modes
- **../data/responsive-accessibility-framework.md**: Responsive strategy (Desktop/Tablet/Mobile), breakpoint strategy, accessibility levels (WCAG A/AA/AAA), testing strategy, implementation guidelines

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on responsive design strategy and accessibility compliance
- 🎯 COLLABORATIVE strategy definition, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating responsive/accessibility content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

For detailed A/P/C menu handling, see: **../data/ux-workflow-menu-handling.md**

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper responsive/accessibility insights
- **P (Party Mode)**: Bring multiple perspectives to define responsive/accessibility strategy
- **C (Continue)**: Save the content to the document and proceed to final step

## PROTOCOL INTEGRATION:

For detailed protocol integration, see: **../data/ux-workflow-menu-handling.md**

- When 'A' selected: Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml
- When 'P' selected: Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step's A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Platform requirements from step 3 inform responsive design
- Design direction from step 9 influences responsive layout choices
- Focus on cross-device adaptation and accessibility compliance

## YOUR TASK:

Define responsive design strategy and accessibility requirements for the product.

## RESPONSIVE & ACCESSIBILITY SEQUENCE:

**For detailed frameworks and templates, see: ../data/responsive-accessibility-framework.md**

### 1. Define Responsive Strategy

Establish how the design adapts across devices using questions from the framework:

- **Desktop Strategy**: Extra screen real estate usage, multi-column layouts, desktop-specific features
- **Tablet Strategy**: Touch-optimized interfaces, gesture interactions, information density
- **Mobile Strategy**: Navigation approach (bottom nav vs hamburger), layout collapsing, critical information

See **responsive-accessibility-framework.md** for complete facilitation scripts and questions.

### 2. Establish Breakpoint Strategy

Define when and how layouts change using guidance from the framework:

- Standard vs custom breakpoints
- Mobile-first vs desktop-first approach
- Project-specific breakpoint considerations

See **responsive-accessibility-framework.md** for common breakpoints and decision guidance.

### 3. Design Accessibility Strategy

Define accessibility requirements and compliance level using WCAG guidance from the framework:

- WCAG Level A/AA/AAA selection
- Key accessibility considerations (contrast, keyboard, screen readers, touch targets)
- Product-specific recommendations

See **responsive-accessibility-framework.md** for complete WCAG levels and accessibility checklist.

### 4. Define Testing Strategy

Plan comprehensive testing approach using strategies from the framework:

- Responsive testing (devices, browsers, network performance)
- Accessibility testing (automated tools, screen readers, keyboard navigation)
- User testing with assistive technologies

See **responsive-accessibility-framework.md** for detailed testing approaches.

### 5. Document Implementation Guidelines

Create developer guidelines using templates from the framework:

- Responsive development practices
- Accessibility development requirements

See **responsive-accessibility-framework.md** for complete implementation guidelines.

### 6. Generate Responsive & Accessibility Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

```markdown
## Responsive Design & Accessibility

### Responsive Strategy

[Responsive strategy based on conversation]

### Breakpoint Strategy

[Breakpoint strategy based on conversation]

### Accessibility Strategy

[Accessibility strategy based on conversation]

### Testing Strategy

[Testing strategy based on conversation]

### Implementation Guidelines

[Implementation guidelines based on conversation]
```

### 7. Present Content and Menu

For detailed menu handling procedures, see: **../data/ux-workflow-menu-handling.md**

Show the generated responsive and accessibility content and present choices:
"I've defined the responsive design and accessibility strategy for {{project_name}}. This ensures your product works beautifully across all devices and is accessible to all users.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let's refine our responsive/accessibility strategy
[P] Party Mode - Bring different perspectives on inclusive design
[C] Continue - Save this to the document and complete the workflow

### 8. Handle Menu Selection

For detailed menu handling logic and protocols, see: **../data/ux-workflow-menu-handling.md**

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml with the current responsive/accessibility content
- Process the enhanced insights that come back
- Ask user: "Accept these improvements to the responsive/accessibility strategy? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md with the current responsive/accessibility strategy
- Process the collaborative insights that come back
- Ask user: "Accept these changes to the responsive/accessibility strategy? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/ux-design-specification.md`
- Update frontmatter: append step to end of stepsCompleted array
- Load `./step-14-complete.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

For complete success metrics and patterns, see: **../data/ux-workflow-menu-handling.md**

✅ Responsive strategy clearly defined for all device types
✅ Appropriate breakpoint strategy established
✅ Accessibility requirements determined and documented
✅ Comprehensive testing strategy planned
✅ Implementation guidelines provided for development team
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

For complete failure mode patterns, see: **../data/ux-workflow-menu-handling.md**

❌ Not considering all device types and screen sizes
❌ Accessibility requirements not properly researched
❌ Testing strategy not comprehensive enough
❌ Implementation guidelines too generic or unclear
❌ Not addressing specific accessibility challenges for your product
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting 'C'

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-14-complete.md` to finalize the UX design workflow.

Remember: Do NOT proceed to step-14 until user explicitly selects 'C' from the A/P/C menu and content is saved!
