# Project Discovery Sequence Framework

This framework provides a structured approach for discovering and classifying projects through collaborative dialogue with the user. It helps identify project type, domain, complexity, and context (greenfield vs brownfield).

---

## Discovery Sequence

### 1. Check Document State

Read the frontmatter from the output file to get document counts:

- `briefCount` - Product briefs available
- `researchCount` - Research documents available
- `brainstormingCount` - Brainstorming docs available
- `projectDocsCount` - Existing project documentation

**Announce your understanding:**

"From step 1, I have loaded:

- Product briefs: {{briefCount}}
- Research: {{researchCount}}
- Brainstorming: {{brainstormingCount}}
- Project docs: {{projectDocsCount}}

{{if projectDocsCount > 0}}This is a brownfield project - I'll focus on understanding what you want to add or change.{{else}}This is a greenfield project - I'll help you define the full product vision.{{/if}}"

### 2. Load Classification Data

**Attempt subprocess data lookup:**

**Project Type Lookup:**
"Your task: Lookup data in {projectTypesCSV}

**Search criteria:**

- Find row where project_type matches {{detectedProjectType}}

**Return format:**
Return ONLY the matching row as a YAML-formatted object with these fields:
project_type, detection_signals

**Do NOT return the entire CSV - only the matching row.**"

**Domain Complexity Lookup:**
"Your task: Lookup data in {domainComplexityCSV}

**Search criteria:**

- Find row where domain matches {{detectedDomain}}

**Return format:**
Return ONLY the matching row as a YAML-formatted object with these fields:
domain, complexity, typical_concerns, compliance_requirements

**Do NOT return the entire CSV - only the matching row.**"

**Graceful degradation (if Task tool unavailable):**

- Load the CSV files directly
- Find the matching rows manually
- Extract required fields
- Keep in memory for intelligent classification

### 3. Begin Discovery Conversation

**Start with what you know:**

If the user has a product brief or project docs, acknowledge them and share your understanding. Then ask clarifying questions to deepen your understanding.

If this is a greenfield project with no docs, start with open-ended discovery:

- What problem does this solve?
- Who's it for?
- What excites you about building this?

**Listen for classification signals:**

As the user describes their product, match against:

- **Project type signals** (API, mobile, SaaS, etc.)
- **Domain signals** (healthcare, fintech, education, etc.)
- **Complexity indicators** (regulated industries, novel technology, etc.)

### 4. Confirm Classification

Once you have enough understanding, share your classification:

"I'm hearing this as:

- **Project Type:** {{detectedType}}
- **Domain:** {{detectedDomain}}
- **Complexity:** {{complexityLevel}}

Does this sound right to you?"

Let the user confirm or refine your classification.

### 5. Save Classification to Frontmatter and Document

When user selects 'C', update both frontmatter and document body:

**A. Update frontmatter with classification:**

```yaml
classification:
  projectType: { { projectType } }
  domain: { { domain } }
  complexity: { { complexityLevel } }
  projectContext: { { greenfield|brownfield } }
```

**B. Append classification to document body:**

Add a `## Project Discovery` section to the document with the classification details:

```markdown
## Project Discovery

**Project Type:** {{projectType}}
**Domain:** {{domain}}
**Domain Complexity:** {{complexityLevel}}
**Project Context:** {{projectContext}}

{{Brief description of what makes this classification appropriate based on the discovery conversation}}
```

---

## Classification Signals to Listen For

### Project Type Signals

Listen for these keywords and patterns to detect project type:

- **Web Application:** "website", "web app", "dashboard", "portal", "SaaS"
- **Mobile App:** "iOS", "Android", "mobile", "app store", "native app"
- **API/Backend:** "REST API", "GraphQL", "microservices", "backend service"
- **Desktop Application:** "desktop", "Electron", "native app", "Windows/Mac"
- **CLI Tool:** "command line", "terminal", "CLI", "developer tool"
- **Library/SDK:** "npm package", "library", "SDK", "framework", "reusable component"

### Domain Signals

Listen for these domain indicators:

- **Healthcare:** "patients", "medical", "HIPAA", "EHR", "healthcare provider"
- **Fintech:** "payments", "banking", "financial", "transactions", "money"
- **E-commerce:** "shopping", "cart", "products", "online store", "checkout"
- **Education:** "students", "courses", "learning", "curriculum", "teachers"
- **Enterprise:** "workflow", "internal tool", "employees", "business process"
- **Social/Community:** "users", "content sharing", "feed", "messaging", "social"
- **Developer Tools:** "developers", "code", "CI/CD", "deployment", "debugging"

### Complexity Indicators

Listen for these complexity signals:

- **High Complexity:**
  - Regulated industries (healthcare, finance, legal)
  - Novel/cutting-edge technology
  - Complex integrations (legacy systems, multiple third-party APIs)
  - High security requirements
  - Real-time or high-scale requirements

- **Medium Complexity:**
  - Standard business applications
  - Moderate integration needs
  - Some compliance requirements
  - Standard security practices

- **Low Complexity:**
  - Simple CRUD applications
  - Minimal integrations
  - No special compliance needs
  - Standard tech stack

---

## Conversation Best Practices

### Natural Discovery Approach

**DO:**

- ✅ Ask open-ended questions
- ✅ Build on what the user shares
- ✅ Acknowledge their existing documents
- ✅ Listen actively for classification signals
- ✅ Confirm your understanding
- ✅ Be collaborative, not prescriptive

**DON'T:**

- ❌ Follow a rigid script
- ❌ Ignore user's existing work
- ❌ Jump to conclusions without validation
- ❌ Generate content for the user
- ❌ Be overly formal or robotic

### Example Conversation Flow

**For Greenfield Project (no docs):**

> "I see this is a new project. To help me understand what we're building, could you tell me:
>
> - What problem are you solving?
> - Who's this for?
> - What excites you most about this idea?"

_[User shares their vision]_

> "That's interesting! So it sounds like you're building a [detected type] for [detected domain]. A few follow-up questions:
>
> - [Clarifying question based on their response]
> - [Another question to validate classification]"

_[User provides more details]_

> "Got it. Based on what you've shared, I'm seeing this as:
>
> - Project Type: [type]
> - Domain: [domain]
> - Complexity: [level]
>
> Does that sound right?"

**For Brownfield Project (with existing docs):**

> "I've reviewed your [product brief/project docs]. I understand you're working on [brief summary].
>
> To make sure I have the full picture:
>
> - What are you looking to add or change?
> - What's working well that we should build on?
> - Any constraints or technical debt we need to consider?"

_[User provides context]_

> "Thanks for that context. So we're enhancing a [detected type] in the [detected domain] space, and it sounds like [complexity level] complexity given [reasons].
>
> Does that match your understanding?"

---

## Usage Notes

- **Context Awareness:** Always check document counts first to understand if this is greenfield or brownfield
- **Graceful Degradation:** If subprocess tools aren't available, load CSV data directly
- **Validation:** Always confirm classification with the user before saving
- **Collaborative Tone:** Maintain peer-to-peer dialogue, not command-response
- **Build on Existing Work:** Reference and acknowledge any documents the user has already provided
