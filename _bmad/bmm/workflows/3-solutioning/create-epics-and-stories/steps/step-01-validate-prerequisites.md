---
name: 'step-01-validate-prerequisites'
description: 'Validate required documents exist and extract all requirements for epic and story creation'

# Path Definitions
workflow_path: '{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories'

# File References
thisStepFile: './step-01-validate-prerequisites.md'
nextStepFile: './step-02-design-epics.md'
workflowFile: '{workflow_path}/workflow.md'
outputFile: '{planning_artifacts}/epics.md'
epicsTemplate: '{workflow_path}/templates/epics-template.md'

# Task References
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/party-mode/workflow.md'

# Template References
epicsTemplate: '{workflow_path}/templates/epics-template.md'

# Data References
documentSearchPatterns: '{workflow_path}/data/prerequisite-document-search-patterns.md'
requirementsExtractionFramework: '{workflow_path}/data/requirements-extraction-framework.md'
---

# Step 1: Validate Prerequisites and Extract Requirements

## STEP GOAL:

To validate that all required input documents exist and extract all requirements (FRs, NFRs, and additional requirements from UX/Architecture) needed for epic and story creation.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a product strategist and technical specifications writer
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring requirements extraction expertise
- ✅ User brings their product vision and context

### Step-Specific Rules:

- 🎯 Focus ONLY on extracting and organizing requirements
- 🚫 FORBIDDEN to start creating epics or stories in this step
- 💬 Extract requirements from ALL available documents
- 🚪 POPULATE the template sections exactly as needed

## EXECUTION PROTOCOLS:

- 🎯 Extract requirements systematically from all documents
- 💾 Populate {outputFile} with extracted requirements
- 📖 Update frontmatter with extraction progress
- 🚫 FORBIDDEN to load next step until user selects 'C' and requirements are extracted

## REQUIREMENTS EXTRACTION PROCESS:

### 1. Welcome and Overview

Welcome {user_name} to comprehensive epic and story creation!

**CRITICAL PREREQUISITE VALIDATION:**

Verify required documents exist and are complete:

1. **PRD.md** - Contains requirements (FRs and NFRs) and product scope
2. **Architecture.md** - Contains technical decisions, API contracts, data models
3. **UX Design.md** (if UI exists) - Contains interaction patterns, mockups, user flows

### 2. Document Discovery and Validation

**Load Document Search Patterns:**

Read the prerequisite document search patterns from `{documentSearchPatterns}`. This document provides:

- **PRD Document Search:** Priority ordering (whole document → sharded)
- **Architecture Document Search:** Priority ordering (whole document → sharded)
- **UX Design Document Search:** Priority ordering (optional, whole → sharded)
- **Search Implementation:** Glob patterns and reading strategies
- **Error Handling:** What to do if documents not found

**Execute Document Search:**

Using the patterns from `{documentSearchPatterns}`, search for:

1. **PRD Document** (REQUIRED) - Contains FRs, NFRs, product scope
2. **Architecture Document** (REQUIRED) - Contains technical decisions, starter template
3. **UX Design Document** (OPTIONAL) - Contains interaction patterns, accessibility requirements

Before proceeding, ask the user if there are any other documents to include for analysis, and if anything found should be excluded. Wait for user confirmation. Once confirmed, create the {outputFile} from the {epicsTemplate} and in the front matter list the files in the array of `inputDocuments: []`.

### 3. Extract Requirements from Documents

**Load Requirements Extraction Framework:**

Read the comprehensive requirements extraction framework from `{requirementsExtractionFramework}`. This document provides:

- **Functional Requirements (FRs) Extraction:** What they are, how to identify, format templates, examples
- **Non-Functional Requirements (NFRs) Extraction:** Categories, extraction methods, format templates, examples
- **Additional Requirements from Architecture:** Starter template (CRITICAL), infrastructure, integrations, security
- **Additional Requirements from UX:** Responsive design, accessibility, browser compatibility, interaction patterns
- **Complete Extraction Workflow:** Step-by-step process
- **Validation Checklist:** Before finalizing requirements

**Execute Requirements Extraction:**

Following the framework from `{requirementsExtractionFramework}`:

1. **Extract FRs from PRD:** Read entire PRD, identify all functional requirements, format as FR1, FR2, FR3...
2. **Extract NFRs from PRD:** Identify performance, security, usability, reliability requirements, format as NFR1, NFR2, NFR3...
3. **Extract Additional Requirements from Architecture:**
   - **CRITICAL:** Identify starter template specification (affects Epic 1 Story 1)
   - Infrastructure and deployment requirements
   - Integration requirements with external systems
   - Security implementation requirements
4. **Extract Additional Requirements from UX (if exists):**
   - Responsive design requirements
   - Accessibility requirements (WCAG level)
   - Browser/device compatibility
   - User interaction patterns

### 4. Load and Initialize Template

Load {epicsTemplate} and initialize {outputFile}:

1. Copy the entire template to {outputFile}
2. Replace {{project_name}} with the actual project name
3. Replace placeholder sections with extracted requirements:
   - {{fr_list}} → extracted FRs
   - {{nfr_list}} → extracted NFRs
   - {{additional_requirements}} → extracted additional requirements
4. Leave {{requirements_coverage_map}} and {{epics_list}} as placeholders for now

### 5. Present Extracted Requirements

Display to user:

**Functional Requirements Extracted:**

- Show count of FRs found
- Display the first few FRs as examples
- Ask if any FRs are missing or incorrectly captured

**Non-Functional Requirements Extracted:**

- Show count of NFRs found
- Display key NFRs
- Ask if any constraints were missed

**Additional Requirements:**

- Summarize technical requirements from Architecture
- Summarize UX requirements (if applicable)
- Verify completeness

### 6. Get User Confirmation

Ask: "Do these extracted requirements accurately represent what needs to be built? Any additions or corrections?"

Update the requirements based on user feedback until confirmation is received.

## CONTENT TO SAVE TO DOCUMENT:

After extraction and confirmation, update {outputFile} with:

- Complete FR list in {{fr_list}} section
- Complete NFR list in {{nfr_list}} section
- All additional requirements in {{additional_requirements}} section

### 7. Present MENU OPTIONS

Display: `**Confirm the Requirements are complete and correct to [C] continue:**`

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'
- User can chat or ask questions - always respond and then end with display again of the menu option

#### Menu Handling Logic:

- IF C: Save all to {outputFile}, update frontmatter, only then load, read entire file, then execute {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#7-present-menu-options)

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and all requirements are saved to document and frontmatter is updated, will you then load, read entire file, then execute {nextStepFile} to execute and begin epic design step.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All required documents found and validated
- All FRs extracted and formatted correctly
- All NFRs extracted and formatted correctly
- Additional requirements from Architecture/UX identified
- Template initialized with requirements
- User confirms requirements are complete and accurate

### ❌ SYSTEM FAILURE:

- Missing required documents
- Incomplete requirements extraction
- Template not properly initialized
- Not saving requirements to output file

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.
