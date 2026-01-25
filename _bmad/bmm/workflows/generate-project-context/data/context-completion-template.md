# Context Completion Templates

This file contains templates for completing the project context workflow, including skill-level-adapted completion messages, validation checklists, and finalization procedures.

---

## Completion Messages by Skill Level

### Expert Mode Completion Message

"Project context complete. Optimized for LLM consumption with {{rule_count}} critical rules across {{section_count}} sections.

File saved to: `{output_folder}/project-context.md`

Ready for AI agent integration."

---

### Intermediate Mode Completion Message

"Your project context is complete and optimized for AI agents!

**What we created:**

- {{rule_count}} critical implementation rules
- Technology stack with exact versions
- Framework-specific patterns and conventions
- Testing and quality guidelines
- Workflow and anti-pattern rules

**Key benefits:**

- AI agents will implement consistently with your standards
- Reduced context switching and implementation errors
- Clear guidance for unobvious project requirements

**Next steps:**

- AI agents should read this file before implementing
- Update as your project evolves
- Review periodically for optimization"

---

### Beginner Mode Completion Message

"Excellent! Your project context guide is ready! 🎉

**What this does:**
Think of this as a 'rules of the road' guide for AI agents working on your project. It ensures they all follow the same patterns and avoid common mistakes.

**What's included:**

- Exact technology versions to use
- Critical coding rules they might miss
- Testing and quality standards
- Workflow patterns to follow

**How AI agents use it:**
They read this file before writing any code, ensuring everything they create follows your project's standards perfectly.

Your project context is saved and ready to help agents implement consistently!"

---

## Final Completion Message (All Skill Levels)

Use this comprehensive message after presenting the skill-level-appropriate summary:

"✅ **Project Context Generation Complete!**

Your optimized project context file is ready at:
`{output_folder}/project-context.md`

**📊 Context Summary:**

- {{rule_count}} critical rules for AI agents
- {{section_count}} comprehensive sections
- Optimized for LLM context efficiency
- Ready for immediate agent integration

**🎯 Key Benefits:**

- Consistent implementation across all AI agents
- Reduced common mistakes and edge cases
- Clear guidance for project-specific patterns
- Minimal LLM context usage

**📋 Next Steps:**

1. AI agents will automatically read this file when implementing
2. Update this file when your technology stack or patterns evolve
3. Review quarterly to optimize and remove outdated rules

Your project context will help ensure high-quality, consistent implementation across all development work. Great work capturing your project's critical implementation requirements!"

---

## Content Validation Checklists

### Content Validation Checklist

Use this checklist before marking the workflow complete:

✅ All critical technology versions documented
✅ Language-specific rules are specific and actionable
✅ Framework rules cover project conventions
✅ Testing rules ensure consistency
✅ Code quality rules maintain standards
✅ Workflow rules prevent conflicts
✅ Anti-pattern rules prevent common mistakes

**Validation Questions:**

- Are all technology versions exact (not ranges)?
- Do language rules focus on unobvious patterns?
- Are framework rules project-specific (not generic)?
- Do testing rules cover organization and coverage?
- Are quality rules enforceable and specific?
- Do workflow rules match actual project practices?
- Are anti-patterns based on real project issues?

---

### Format Validation Checklist

Use this checklist to ensure optimal LLM consumption:

✅ Content is lean and optimized for LLMs
✅ Structure is logical and scannable
✅ No redundant or obvious information
✅ Consistent formatting throughout

**Format Questions:**

- Is the document < 1500 lines (optimal LLM context)?
- Does each section have clear heading hierarchy?
- Are bullet points used instead of paragraphs?
- Is bolding used strategically for scanning?
- Are examples specific (not generic)?
- Is formatting consistent across sections?

---

## Final File Updates

### Frontmatter Update (Completion)

When finalizing the project context file, update frontmatter:

```yaml
---
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - quality_rules
  - workflow_rules
  - anti_patterns
status: 'complete'
rule_count: { { total_rules } }
optimized_for_llm: true
last_reviewed: '{{date}}'
---
```

**Key Fields:**

- `status`: Change from 'in_progress' to 'complete'
- `rule_count`: Total number of rules across all sections
- `optimized_for_llm`: Always `true` after completion
- `last_reviewed`: Date of completion (for maintenance tracking)

---

### Usage Guidelines Section

Append this section to the completed project context file:

```markdown
---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: {{date}}
```

---

## Content Optimization Procedures

### Review and Optimize for LLM Context

Before completion, perform these optimization checks:

#### 1. Remove Redundant Rules

**Check for:**

- Duplicate rules across sections
- Obvious rules agents already know
- Overlapping guidance (consolidate)

**Example:**

```markdown
❌ BAD (redundant):

- Use TypeScript for all files
- All files must be TypeScript
- Write code in TypeScript

✅ GOOD (consolidated):

- All source files must use TypeScript (.ts/.tsx)
```

#### 2. Combine Related Rules

**Check for:**

- Rules that can be grouped
- Related patterns scattered across sections
- Opportunities for bullet sub-points

**Example:**

```markdown
❌ BAD (scattered):

- Use PascalCase for components
- Components go in src/components
- Export components as named exports

✅ GOOD (grouped):

- **Components:**
  - PascalCase naming (e.g., `UserProfile.tsx`)
  - Located in `src/components/{ComponentName}/`
  - Use named exports only
```

#### 3. Increase Specificity

**Check for:**

- Vague or generic advice
- Rules without examples
- Abstract guidance

**Example:**

```markdown
❌ BAD (vague):

- Write good tests
- Follow best practices

✅ GOOD (specific):

- **Testing:** Co-locate tests with source files using `.test.ts` extension
- **Coverage:** Minimum 80% for utilities, 60% for components
```

#### 4. Ensure Actionability

**Check for:**

- Rules that can't be followed (too vague)
- Missing implementation details
- Unclear success criteria

**Example:**

```markdown
❌ BAD (not actionable):

- Code should be maintainable

✅ GOOD (actionable):

- Extract logic > 10 lines into separate functions
- Use descriptive variable names (no single letters except loop indices)
- Add JSDoc comments for all public functions
```

---

## Final Validation Before Completion

### Comprehensive Pre-Completion Check

Run through this final checklist:

**Content Completeness:**
✅ All 7 rule categories present and populated
✅ Technology stack includes exact versions
✅ Each rule provides unique, actionable guidance
✅ Anti-patterns based on actual project issues

**Content Quality:**
✅ No generic advice (all rules project-specific)
✅ No obvious rules (focus on unobvious patterns)
✅ Examples provided for complex rules
✅ Rules optimized for agent consumption

**Format Quality:**
✅ Document length < 1500 lines
✅ Consistent markdown formatting
✅ Clear section hierarchy
✅ Strategic use of bolding and bullets

**Metadata:**
✅ Frontmatter properly populated
✅ Status set to 'complete'
✅ Rule count accurate
✅ Usage guidelines appended

**User Communication:**
✅ Skill-appropriate completion message shown
✅ File path provided to user
✅ Benefits and next steps communicated
✅ Maintenance guidance provided

---

## Usage Notes for Step Files

**This template should be referenced when:**

- Completing the project context workflow (Step 3)
- Presenting completion messages adapted to user skill level
- Validating content and format before finalization
- Optimizing content for LLM consumption

**Step files should:**

1. Reference this template in frontmatter under `data_files`
2. Use completion messages based on detected user skill level
3. Apply validation checklists before marking complete
4. Follow optimization procedures to ensure lean content
5. Keep workflow-specific logic in step file, not here

---

## Related Data Files

- **context-rule-categories-framework.md**: Templates for generating each rule category
- **context-document-template.md**: Final project context document structure
