---
name: 'step-03-create-stories'
description: 'Generate all epics with their stories following the template structure'

# Path Definitions
workflow_path: '{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories'

# File References
thisStepFile: './step-03-create-stories.md'
nextStepFile: './step-04-final-validation.md'
workflowFile: '{workflow_path}/workflow.md'
outputFile: '{planning_artifacts}/epics.md'

# Task References
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/party-mode/workflow.md'

# Template References
epicsTemplate: '{workflow_path}/templates/epics-template.md'

# Data References
storyCreationGuidelines: '{workflow_path}/data/story-creation-guidelines.md'
---

# Step 3: Generate Epics and Stories

## STEP GOAL:

To generate all epics with their stories based on the approved epics_list, following the template structure exactly.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: Process epics sequentially
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a product strategist and technical specifications writer
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring story creation and acceptance criteria expertise
- ✅ User brings their implementation priorities and constraints

### Step-Specific Rules:

- 🎯 Generate stories for each epic following the template exactly
- 🚫 FORBIDDEN to deviate from template structure
- 💬 Each story must have clear acceptance criteria
- 🚪 ENSURE each story is completable by a single dev agent
- 🔗 **CRITICAL: Stories MUST NOT depend on future stories within the same epic**

## EXECUTION PROTOCOLS:

- 🎯 Generate stories collaboratively with user input
- 💾 Append epics and stories to {outputFile} following template
- 📖 Process epics one at a time in sequence
- 🚫 FORBIDDEN to skip any epic or rush through stories

## STORY GENERATION PROCESS:

### 1. Load Approved Epic Structure

Load {outputFile} and review:

- Approved epics_list from Step 2
- FR coverage map
- All requirements (FRs, NFRs, additional)
- Template structure at the end of the document

### 2. Explain Story Creation Approach

**Load Story Creation Guidelines:**

Read the comprehensive story creation guidelines from `{storyCreationGuidelines}`. This document provides:

- **Story Creation Principles:** Database/entity creation, story dependencies, story sizing
- **Story Format Template:** Complete As a/I want/So that structure with Given/When/Then acceptance criteria
- **Good Story Examples:** Epic 1 (User Authentication), Epic 2 (Content Creation)
- **Bad Story Examples:** What to avoid (no user value, too large, future dependencies)
- **Acceptance Criteria Guidelines:** Format rules, coverage checklist, comprehensive examples

**Key Principles to Follow:**

1. **Database/Entity Creation:** Create tables/entities ONLY when needed by the story
2. **Story Dependencies:** Stories must be independently completable in sequence (no future dependencies)
3. **Story Sizing:** Each story completable by a single dev agent in one session
4. **User Value:** Every story provides clear user value

Explain to the user the story creation approach based on these guidelines.

### 3. Process Epics Sequentially

For each epic in the approved epics_list:

#### A. Epic Overview

Display:

- Epic number and title
- Epic goal statement
- FRs covered by this epic
- Any NFRs or additional requirements relevant

#### B. Story Breakdown

Work with user to break down the epic into stories:

- Identify distinct user capabilities
- Ensure logical flow within the epic
- Size stories appropriately

#### C. Generate Each Story

For each story in the epic:

1. **Story Title**: Clear, action-oriented
2. **User Story**: Complete the As a/I want/So that format (see `{storyCreationGuidelines}`)
3. **Acceptance Criteria**: Write specific, testable criteria using Given/When/Then format

**Reference the Story Creation Guidelines** (`{storyCreationGuidelines}`) for:

- Complete story format template
- AC writing guidelines (Given/When/Then format)
- Good and bad examples
- Coverage checklist (happy path, edge cases, error handling)

#### D. Collaborative Review

After writing each story:

- Present the story to user
- Ask: "Does this story capture the requirement correctly?"
- "Is the scope appropriate for a single dev session?"
- "Are the acceptance criteria complete and testable?"

#### E. Append to Document

When story is approved:

- Append it to {outputFile} following template structure
- Use correct numbering (Epic N, Story M)
- Maintain proper markdown formatting

### 4. Epic Completion

After all stories for an epic are complete:

- Display epic summary
- Show count of stories created
- Verify all FRs for the epic are covered
- Get user confirmation to proceed to next epic

### 5. Repeat for All Epics

Continue the process for each epic in the approved list, processing them in order (Epic 1, Epic 2, etc.).

### 6. Final Document Completion

After all epics and stories are generated:

- Verify the document follows template structure exactly
- Ensure all placeholders are replaced
- Confirm all FRs are covered
- Check formatting consistency

## TEMPLATE STRUCTURE COMPLIANCE:

The final {outputFile} must follow this structure exactly:

1. **Overview** section with project name
2. **Requirements Inventory** with all three subsections populated
3. **FR Coverage Map** showing requirement to epic mapping
4. **Epic List** with approved epic structure
5. **Epic sections** for each epic (N = 1, 2, 3...)
   - Epic title and goal
   - All stories for that epic (M = 1, 2, 3...)
     - Story title and user story
     - Acceptance Criteria using Given/When/Then format

### 7. Present FINAL MENU OPTIONS

After all epics and stories are complete:

Display: "**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Continue"

#### Menu Handling Logic:

- IF A: Execute {advancedElicitationTask}
- IF P: Execute {partyModeWorkflow}
- IF C: Save content to {outputFile}, update frontmatter, then only then load, read entire file, then execute {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#7-present-final-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'
- After other menu items execution, return to this menu
- User can chat or ask questions - always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [all epics and stories saved to document following the template structure exactly], will you then load and read fully `{nextStepFile}` to execute and begin final validation phase.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All epics processed in sequence
- Stories created for each epic
- Template structure followed exactly
- All FRs covered by stories
- Stories appropriately sized
- Acceptance criteria are specific and testable
- Document is complete and ready for development

### ❌ SYSTEM FAILURE:

- Deviating from template structure
- Missing epics or stories
- Stories too large or unclear
- Missing acceptance criteria
- Not following proper formatting

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.
