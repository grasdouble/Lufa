---
name: 'step-02-discovery'
description: 'Discover project type, domain, and context through collaborative dialogue'

# File References
nextStepFile: './step-03-success.md'
outputFile: '{planning_artifacts}/prd.md'

# Data Files
projectTypesCSV: '../data/project-types.csv'
domainComplexityCSV: '../data/domain-complexity.csv'

# DATA FILE REFERENCES
# This step uses data files for comprehensive frameworks
# See: ../data/project-discovery-sequence-framework.md for complete discovery methodology

# Task References
advancedElicitationTask: '{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml'
partyModeWorkflow: '{project-root}/_bmad/core/workflows/party-mode/workflow.md'
---

# Step 2: Project Discovery

**Progress: Step 2 of 13** - Next: Product Vision

## STEP GOAL:

Discover and classify the project - understand what type of product this is, what domain it operates in, and the project context (greenfield vs brownfield).

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read
- ✅ ALWAYS treat this as collaborative discovery between PM peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a product-focused PM facilitator collaborating with an expert peer
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision

### Step-Specific Rules:

- 🎯 Focus on classification and understanding - no content generation yet
- 🚫 FORBIDDEN to generate executive summary or vision statements (that's next steps)
- 💬 APPROACH: Natural conversation to understand the project
- 🎯 LOAD classification data BEFORE starting discovery conversation

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after classification complete
- 💾 ONLY save classification to frontmatter when user chooses C (Continue)
- 📖 Update frontmatter, adding this step to the end of the list of stepsCompleted
- 🚫 FORBIDDEN to load next step until C is selected

## CONTEXT BOUNDARIES:

- Current document and frontmatter from step 1 are available
- Input documents already loaded are in memory (product briefs, research, brainstorming, project docs)
- **Document counts available in frontmatter `documentCounts`**
- Classification CSV data will be loaded in this step only
- No executive summary or vision content yet (that's steps 2b and 2c)

## YOUR TASK:

Discover and classify the project through natural conversation:

- What type of product is this? (web app, API, mobile, etc.)
- What domain does it operate in? (healthcare, fintech, e-commerce, etc.)
- What's the project context? (greenfield new product vs brownfield existing system)
- How complex is this domain? (low, medium, high)

## DISCOVERY SEQUENCE:

**See:** `../data/project-discovery-sequence-framework.md` for complete discovery methodology including:

- Document state checking and announcement patterns
- Classification data loading (project types and domain complexity)
- Discovery conversation approaches (greenfield vs brownfield)
- Classification signals to listen for
- Validation and confirmation patterns
- Frontmatter and document body updates

**Quick Reference:**

### 1. Check Document State

Read frontmatter from `{outputFile}` to get document counts (`briefCount`, `researchCount`, `brainstormingCount`, `projectDocsCount`).

Announce understanding: "From step 1, I have loaded: [counts]. {{if projectDocsCount > 0}}This is brownfield...{{else}}This is greenfield...{{/if}}"

### 2. Load Classification Data

Attempt subprocess lookup for project type and domain complexity from CSV files. If unavailable, load CSV files directly and extract matching rows manually.

### 3. Begin Discovery Conversation

**Start with what you know:** Acknowledge existing documents and share understanding, or start with open-ended discovery for greenfield projects.

**Listen for classification signals:** Match against project type signals, domain signals, and complexity indicators (see data file for complete lists).

### 4. Confirm Classification

Share detected classification: "I'm hearing this as: **Project Type:** {{detectedType}}, **Domain:** {{detectedDomain}}, **Complexity:** {{complexityLevel}}. Does this sound right?"

### 5. Save Classification When User Selects 'C'

Update frontmatter with `classification:` section and append `## Project Discovery` section to document body with classification details.

### N. Present MENU OPTIONS

Present the project classification for review, then display menu:

"Based on our conversation, I've discovered and classified your project.

**Here's the classification:**

**Project Type:** {{detectedType}}
**Domain:** {{detectedDomain}}
**Complexity:** {{complexityLevel}}
**Project Context:** {{greenfield|brownfield}}

**What would you like to do?**"

Display: "**Select:** [A] Advanced Elicitation [P] Party Mode [C] Continue to Product Vision (Step 2b of 13)"

#### Menu Handling Logic:

- IF A: Execute {advancedElicitationTask}, and when finished redisplay the menu
- IF P: Execute {partyModeWorkflow}, and when finished redisplay the menu
- IF C: Save classification to {outputFile} frontmatter, append ## Project Discovery section to document body with classification details, add this step name to the end of stepsCompleted array, then load, read entire file, then execute {nextStepFile}
- IF Any other: help user respond, then redisplay the menu

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'
- After other menu items execution, return to this menu

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [classification saved to frontmatter], will you then load and read fully `{nextStepFile}` to explore product vision.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Document state checked and announced to user
- Classification data loaded and used intelligently
- Natural conversation to understand project type, domain, complexity
- Classification validated with user before saving
- Frontmatter updated with classification when C selected
- User's existing documents acknowledged and built upon

### ❌ SYSTEM FAILURE:

- Not reading documentCounts from frontmatter first
- Skipping classification data loading
- Generating executive summary or vision content (that's later steps!)
- Not validating classification with user
- Being prescriptive instead of having natural conversation
- Proceeding without user selecting 'C'

**Master Rule:** This is classification and understanding only. No content generation yet. Build on what the user already has. Have natural conversations, don't follow scripts.
