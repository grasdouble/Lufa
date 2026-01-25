# Project Context Document Template

This template defines the complete structure for the final project context file that AI agents will read. It ensures consistent formatting and optimal LLM context efficiency.

---

## Complete Document Structure

Use this structure when generating the final project context file:

```markdown
# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

{{concise_technology_list_with_exact_versions}}

**Critical Version Constraints:**
{{version_compatibility_notes}}

---

## Critical Implementation Rules

### Language-Specific Rules

{{bullet_points_of_critical_language_rules}}

**Key Patterns:**

- {{import_export_patterns}}
- {{error_handling_patterns}}
- {{configuration_requirements}}

### Framework-Specific Rules

{{bullet_points_of_framework_patterns}}

**Component/Module Patterns:**

- {{organization_rules}}
- {{state_management_patterns}}
- {{performance_considerations}}

### Testing Rules

{{bullet_points_of_testing_requirements}}

**Test Organization:**

- {{test_file_patterns}}
- {{mock_conventions}}
- {{coverage_requirements}}

### Code Quality & Style Rules

{{bullet_points_of_style_and_quality_rules}}

**Organization:**

- {{file_structure_rules}}
- {{naming_conventions}}
- {{documentation_patterns}}

### Development Workflow Rules

{{bullet_points_of_workflow_patterns}}

**Repository Patterns:**

- {{branch_naming}}
- {{commit_message_format}}
- {{pr_requirements}}

### Critical Don't-Miss Rules

{{bullet_points_of_anti_patterns_and_edge_cases}}

**Anti-Patterns:**

- {{patterns_to_avoid}}

**Edge Cases:**

- {{special_handling_requirements}}

**Security:**

- {{security_considerations}}

**Performance:**

- {{performance_gotchas}}

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

## Content Generation Guidelines

### Section: Technology Stack & Versions

**What to include:**

- Exact package versions (e.g., `React 18.2.0`, not just `React 18`)
- Node.js/runtime version requirements
- Key dependencies with version constraints
- Version compatibility notes

**Example:**

```markdown
## Technology Stack & Versions

- **Runtime:** Node.js 20.x (LTS)
- **Package Manager:** pnpm 8.x
- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.x
- **TypeScript:** 5.3+
- **Testing:** Vitest 1.x, Playwright 1.40+

**Critical Version Constraints:**

- Must use React 18.2+ for automatic batching
- TypeScript 5.3+ required for const type parameters
- Vite 5.x required for improved HMR performance
```

### Section: Language-Specific Rules

**What to include:**

- Import/export patterns specific to project
- TypeScript configuration requirements
- Error handling conventions
- Module resolution patterns

**Example:**

```markdown
### Language-Specific Rules

- Use named exports (no default exports except for pages/routes)
- Import paths use `@/` alias for src directory
- Use `type` imports for TypeScript types: `import type { Foo } from './types'`
- Error handling: Always use custom error classes from `@/lib/errors`
- Async functions: Always handle errors with try/catch, no unhandled promise rejections
```

### Section: Framework-Specific Rules

**What to include:**

- Component organization patterns
- State management conventions
- Routing patterns
- Framework-specific anti-patterns

**Example:**

```markdown
### Framework-Specific Rules

**React Patterns:**

- Use functional components with hooks only (no class components)
- Server components by default (Next.js App Router)
- Use `use client` directive only when necessary (interactivity, browser APIs)
- State management: Zustand for global state, React hooks for local state
- Data fetching: Use Server Components for initial data, React Query for client-side

**Performance:**

- Use `React.memo()` only for expensive computations (not by default)
- Implement virtualization for lists > 100 items (react-window)
- Code split routes automatically via Next.js App Router
```

### Section: Testing Rules

**What to include:**

- Test file organization and naming
- Mock patterns and conventions
- Coverage expectations
- Test boundaries (unit vs integration)

**Example:**

```markdown
### Testing Rules

- Test files: Co-located with source files using `.test.ts` extension
- Component tests: Use Playwright component testing (not RTL)
- Unit tests: Use Vitest for business logic and utilities
- Mocks: Use `vi.mock()` at top of test file, actual implementations preferred
- Coverage: Minimum 80% for utility functions, 60% for components
- Integration tests: Test user workflows end-to-end with Playwright
```

### Section: Code Quality & Style Rules

**What to include:**

- Linting/formatting configuration
- File and folder organization
- Naming conventions
- Documentation requirements

**Example:**

```markdown
### Code Quality & Style Rules

**File Organization:**

- Components: `src/components/{ComponentName}/{ComponentName}.tsx`
- Utilities: `src/lib/{category}/{utility-name}.ts`
- Types: Co-located with implementation, shared types in `src/types/`
- Tests: Co-located with source files

**Naming Conventions:**

- Components: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`, `fetchUser.ts`)
- Files: Match export name (e.g., `Button.tsx` exports `Button`)
- Types: PascalCase with descriptive names (e.g., `UserProfile`, `ButtonProps`)

**Documentation:**

- JSDoc required for all public functions and complex logic
- README updates required for new features
- API documentation via TSDoc for library code
```

### Section: Development Workflow Rules

**What to include:**

- Branch naming conventions
- Commit message patterns
- PR requirements
- Deployment considerations

**Example:**

```markdown
### Development Workflow Rules

**Branch Naming:**

- Features: `feat/description` (e.g., `feat/user-authentication`)
- Fixes: `fix/description` (e.g., `fix/login-error`)
- Chores: `chore/description` (e.g., `chore/update-deps`)

**Commit Messages:**

- Use Conventional Commits format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`
- Include issue number when applicable: `feat(auth): add login (#123)`

**PR Requirements:**

- 2 approvals required before merge
- All CI checks must pass (lint, test, build)
- Update README/docs if user-facing changes
- Add changeset for version bumping
```

### Section: Critical Don't-Miss Rules

**What to include:**

- Anti-patterns specific to codebase
- Edge cases requiring special handling
- Security considerations
- Performance gotchas

**Example:**

```markdown
### Critical Don't-Miss Rules

**Anti-Patterns:**

- ❌ Never use `any` type - use `unknown` and type guards
- ❌ Don't import from `src/` directly - use `@/` alias
- ❌ Never mutate props or state directly - always create new objects
- ❌ Don't use `useEffect` for data fetching - use Server Components or React Query

**Edge Cases:**

- Handle null/undefined for all user inputs (Zod validation)
- Check for empty arrays before array operations
- Validate environment variables at startup (src/lib/env.ts)
- Handle network errors gracefully with fallback UI

**Security:**

- Sanitize all user inputs before rendering (XSS prevention)
- Use environment variables for secrets (never hardcode)
- Validate API inputs with Zod schemas
- Implement rate limiting on public API endpoints

**Performance:**

- Avoid large bundle sizes: Tree-shake unused code
- Optimize images: Use Next.js Image component
- Database queries: Always use indexes, avoid N+1 queries
- Client-side state: Minimize data stored in state (derive when possible)
```

---

## Content Structure Metadata

When saving content to the project context file:

### Frontmatter Structure

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
status: 'in_progress' # or 'complete'
rule_count: { { total_rules } }
optimized_for_llm: true
---
```

### Usage in Step Files

**When generating content (Step 2):**

1. Use this template structure as the target format
2. Generate content for each section based on discovery
3. Append each completed section to the project context file
4. Update frontmatter with completed sections

**When finalizing (Step 3):**

1. Validate all sections are present
2. Optimize content for LLM efficiency
3. Add usage guidelines section
4. Update frontmatter status to 'complete'

---

## Optimization Guidelines

**Keep content lean:**

- Focus on unobvious rules (not general best practices)
- Use bullet points instead of paragraphs
- Combine related rules into single items
- Remove redundant information

**Optimize for scanning:**

- Use clear section headings
- Bold key terms for quick identification
- Use consistent formatting patterns
- Group related rules together

**LLM Context Efficiency:**

- Target 500-1500 lines for complete document
- Each rule should provide unique value
- No filler or obvious information
- Specific examples over general advice

---

## Related Data Files

- **context-rule-categories-framework.md**: Templates for generating each rule category
- **context-completion-template.md**: Completion messages and validation checklists
