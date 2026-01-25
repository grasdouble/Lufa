# UX Workflow Menu Handling

## Purpose

This document provides standard menu handling protocols for UX design workflow steps. These patterns ensure consistent user experience across all workflow steps that use the A/P/C (Advanced Elicitation / Party Mode / Continue) menu system.

---

## Menu Structure

### Standard A/P/C Menu

After generating content in any step, present this menu structure:

```
**What would you like to do?**
[A] Advanced Elicitation - [Step-specific description of what refinement this enables]
[P] Party Mode - [Step-specific description of what perspectives this brings]
[C] Continue - Save this to the document and [move to next step / complete the workflow]
```

### Menu Options Explained

**[A] Advanced Elicitation:**

- Launches advanced discovery protocols to develop deeper insights
- Uses structured elicitation techniques to refine the content
- Returns to the same step's A/P/C menu after completion
- User accepts or rejects changes before proceeding

**[P] Party Mode:**

- Brings multiple perspectives and personas to evaluate content
- Facilitates collaborative insights from different viewpoints
- Returns to the same step's A/P/C menu after completion
- User accepts or rejects changes before proceeding

**[C] Continue:**

- Saves the finalized content to the output document
- Updates document frontmatter with step completion
- Proceeds to the next step in the workflow
- Should ONLY be executed when user explicitly selects 'C'

---

## Protocol Integration

### When 'A' (Advanced Elicitation) Selected

**Execute:**

```
{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
```

**Flow:**

1. Execute advanced elicitation workflow with current step content
2. Process the enhanced insights that come back
3. Ask user: "Accept these improvements to [step content name]? (y/n)"
4. If yes: Update content with improvements
5. If no: Keep original content
6. Return to A/P/C menu (redisplay menu options)

**Important:** Never proceed to next step after Advanced Elicitation - always return to menu.

### When 'P' (Party Mode) Selected

**Execute:**

```
{project-root}/_bmad/core/workflows/party-mode/workflow.md
```

**Flow:**

1. Execute party mode workflow with current step content
2. Process the collaborative insights that come back
3. Ask user: "Accept these changes to [step content name]? (y/n)"
4. If yes: Update content with improvements
5. If no: Keep original content
6. Return to A/P/C menu (redisplay menu options)

**Important:** Never proceed to next step after Party Mode - always return to menu.

### When 'C' (Continue) Selected

**Execute:**

1. Append the finalized content to `{planning_artifacts}/[output-file-name].md`
2. Update document frontmatter: append current step to end of `stepsCompleted` array
3. Load the next step file: `./step-[XX]-[step-name].md`
4. **CRITICAL:** Read the ENTIRE next step file before proceeding

**Important:** This is the ONLY path that proceeds to the next step.

---

## Menu Handling Implementation

### Standard Menu Handling Code Pattern

```markdown
### [N]. Present Content and Menu

Show the generated [step content name] and present choices:
"I've [completed step action description] for {{project_name}}. [Brief explanation of what was accomplished]

**Here's what I'll add to the document:**

[Show the complete markdown content that will be saved]

**What would you like to do?**
[A] Advanced Elicitation - Let's refine [step content focus]
[P] Party Mode - Bring different perspectives on [step content focus]
[C] Continue - Save this to the document and [next action]

### [N+1]. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Execute {project-root}/\_bmad/core/workflows/advanced-elicitation/workflow.xml with the current [step content name]
- Process the enhanced [step insights] that come back
- Ask user: "Accept these improvements to [step content name]? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Execute {project-root}/\_bmad/core/workflows/party-mode/workflow.md with the current [step content name]
- Process the collaborative [step insights] that come back
- Ask user: "Accept these changes to [step content name]? (y/n)"
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/[output-file-name].md`
- Update frontmatter: append step to end of stepsCompleted array
- Load `./step-[XX]-[next-step].md`
```

---

## Success Metrics Template

Use this template for evaluating step completion:

### ✅ SUCCESS:

- [Step-specific content requirement 1]
- [Step-specific content requirement 2]
- [Step-specific content requirement 3]
- A/P/C menu presented and handled correctly
- Content properly appended to document when C selected

### ❌ FAILURE MODES:

**Content-Related:**

- [Step-specific failure mode 1]
- [Step-specific failure mode 2]
- [Step-specific failure mode 3]

**Menu-Related:**

- Not presenting A/P/C menu after content generation
- Appending content without user selecting 'C'
- Proceeding to next step without explicit 'C' selection

**Critical Failures:**

- ❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
- ❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
- ❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

---

## Execution Rules

### Mandatory Rules for All Steps

1. **Never generate content without user input**
2. **Always read the complete step file before taking action**
3. **Present A/P/C menu after generating content**
4. **Only save when user chooses C (Continue)**
5. **Update frontmatter when saving content**
6. **Never proceed to next step until C is selected**

### Protocol Execution Rules

1. **Protocols always return to the originating step's A/P/C menu**
2. **User must accept or reject protocol changes**
3. **Never auto-proceed after protocol execution**
4. **Allow user to run protocols multiple times before continuing**

### Content Saving Rules

1. **Append content to document using specified structure**
2. **Update frontmatter with step completion**
3. **Read ENTIRE next step file before executing**
4. **Ensure proper markdown formatting and structure**

---

## Common Mistakes to Avoid

### ❌ DON'T:

1. **Proceed without user confirmation**
   - Never auto-save or auto-continue
   - Always wait for explicit 'C' selection

2. **Skip the menu**
   - Every content generation step must present A/P/C menu
   - No shortcuts or assumptions

3. **Move to next step after protocol**
   - Advanced Elicitation and Party Mode always return to menu
   - Never auto-proceed after protocol execution

4. **Forget to update frontmatter**
   - Always append step to stepsCompleted array
   - Maintain proper document metadata

5. **Read partial next step file**
   - ALWAYS read the ENTIRE next step file
   - Partial reads lead to incomplete execution

### ✅ DO:

1. **Present clear menu options**
   - Explain what each option does
   - Make it obvious what happens next

2. **Return to menu after protocols**
   - Let user decide if they want more refinement
   - Allow multiple protocol runs if desired

3. **Confirm changes from protocols**
   - Always ask "Accept these changes?"
   - Respect user's decision to accept or reject

4. **Save properly when continuing**
   - Append content in correct format
   - Update all metadata
   - Read next step completely

5. **Respect user control**
   - User drives the workflow pace
   - Agent facilitates, doesn't auto-proceed

---

## Example Implementation

### Full Example: Design System Choice Step

```markdown
### 7. Present Content and Menu

Show the generated design system content and present choices:
"I've documented our design system choice for {{project_name}}. This foundation will ensure consistency and speed up development.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let's refine our design system decision
[P] Party Mode - Bring technical perspectives on design systems
[C] Continue - Save this to the document and move to defining experience

### 8. Handle Menu Selection

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
```

---

## Step-by-Step Checklist

Before implementing menu handling in a step, verify:

- [ ] Content has been generated based on user conversation
- [ ] Content is ready to be shown to user
- [ ] A/P/C menu is presented with step-specific descriptions
- [ ] Menu options clearly explain what each does
- [ ] Protocol paths (A and P) return to menu
- [ ] Continue path (C) saves and proceeds correctly
- [ ] Success metrics defined for step completion
- [ ] Failure modes documented for common mistakes
- [ ] Frontmatter update included in Continue flow
- [ ] Next step file reading is explicit in Continue flow

---

**Last Updated:** 2026-01-25  
**Version:** 1.0  
**Used By:** All UX design workflow steps with A/P/C menus (steps 3-14)
