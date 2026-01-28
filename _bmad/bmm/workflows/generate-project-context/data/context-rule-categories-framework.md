# Project Context Rule Categories Framework

This framework provides comprehensive templates for generating project context rules across all critical implementation areas. Each category includes facilitation scripts adapted to user skill levels (Expert, Intermediate, Beginner).

---

## 1. Technology Stack & Versions

Document the exact technology stack from discovery with version-specific constraints.

### Expert Mode Script

"Technology stack from your architecture and package files:
{{exact_technologies_with_versions}}

Any critical version constraints I should document for agents?"

### Intermediate Mode Script

"I found your technology stack:

**Core Technologies:**
{{main_technologies_with_versions}}

**Key Dependencies:**
{{important_dependencies_with_versions}}

Are there any version constraints or compatibility notes agents should know about?"

### Beginner Mode Script

"Here are the technologies you're using:

**Main Technologies:**
{{friendly_description_of_tech_stack}}

**Important Notes:**
{{key_things_agents_need_to_know_about_versions}}

Should I document any special version rules or compatibility requirements?"

---

## 2. Language-Specific Rules

Focus on unobvious language patterns agents might miss.

### TypeScript/JavaScript Rules Template

"Based on your codebase, I notice some specific patterns:

**Configuration Requirements:**
{{typescript_config_rules}}

**Import/Export Patterns:**
{{import_export_conventions}}

**Error Handling Patterns:**
{{error_handling_requirements}}

Are these patterns correct? Any other language-specific rules agents should follow?"

### Python/Ruby/Other Language Rules Template

Adapt to the actual language in use with similar focused questions:

- Configuration file patterns (pyproject.toml, Gemfile, etc.)
- Module/package import conventions
- Error handling and exception patterns
- Language-specific best practices for the project

---

## 3. Framework-Specific Rules

Document framework-specific patterns that agents must follow.

### React Rules Template (if applicable)

"For React development, I see these patterns:

**Hooks Usage:**
{{hooks_usage_patterns}}

**Component Structure:**
{{component_organization_rules}}

**State Management:**
{{state_management_patterns}}

**Performance Rules:**
{{performance_optimization_requirements}}

Should I add any other React-specific rules?"

### Vue Rules Template (if applicable)

Adapt for Vue-specific patterns:

- Composition API vs Options API usage
- Component organization (SFC structure)
- State management (Pinia, Vuex)
- Reactivity patterns
- Performance considerations

### Angular Rules Template (if applicable)

Adapt for Angular-specific patterns:

- Component/Module organization
- Dependency injection patterns
- RxJS and observable usage
- Change detection strategy
- NgModule vs Standalone components

### Next.js Rules Template (if applicable)

Adapt for Next.js-specific patterns:

- App Router vs Pages Router conventions
- Server vs Client Component usage
- Data fetching patterns (SSR, SSG, ISR)
- Route organization and file conventions
- Performance optimization patterns

### Express Rules Template (if applicable)

Adapt for Express-specific patterns:

- Route organization and middleware usage
- Error handling middleware patterns
- Request validation patterns
- Authentication/authorization patterns
- API response structure conventions

---

## 4. Testing Rules

Focus on testing patterns that ensure consistency.

### Test Structure Rules Template

"Your testing setup shows these patterns:

**Test Organization:**
{{test_file_organization}}

**Mock Usage:**
{{mock_patterns_and_conventions}}

**Test Coverage Requirements:**
{{coverage_expectations}}

**Integration vs Unit Test Rules:**
{{test_boundary_patterns}}

Are there testing rules agents should always follow?"

### Testing Framework-Specific Questions

**Jest/Vitest:**

- Test file naming conventions (.test.ts vs .spec.ts)
- Mock patterns (jest.mock vs vi.mock)
- Assertion library preferences
- Setup/teardown patterns

**Playwright/Cypress:**

- Test organization (page objects, fixtures)
- Selector strategies (data-testid, role-based)
- Test data management
- Parallel execution considerations

**PyTest/RSpec:**

- Fixture usage patterns
- Test parametrization
- Assertion styles
- Test discovery conventions

---

## 5. Code Quality & Style Rules

Document critical style and quality rules that prevent inconsistency.

### Linting/Formatting Template

"Your code style configuration requires:

**ESLint/Prettier Rules:**
{{specific_linting_rules}}

**Code Organization:**
{{file_and_folder_structure_rules}}

**Naming Conventions:**
{{naming_patterns_agents_must_follow}}

**Documentation Requirements:**
{{comment_and_documentation_patterns}}

Any additional code quality rules?"

### Code Organization Specifics

**File Structure:**

- Component/module file organization
- Index file patterns (barrel exports)
- Co-location vs separation patterns
- Shared/common code organization

**Naming Conventions:**

- File naming (PascalCase, camelCase, kebab-case)
- Variable/function naming patterns
- Class/interface naming conventions
- Constant naming patterns

**Documentation:**

- JSDoc/TSDoc requirements
- README update expectations
- Inline comment guidelines
- API documentation patterns

---

## 6. Development Workflow Rules

Document workflow patterns that affect implementation.

### Git/Repository Rules Template

"Your project uses these patterns:

**Branch Naming:**
{{branch_naming_conventions}}

**Commit Message Format:**
{{commit_message_patterns}}

**PR Requirements:**
{{pull_request_checklist}}

**Deployment Patterns:**
{{deployment_considerations}}

Should I document any other workflow rules?"

### Workflow Specifics

**Branch Naming:**

- Feature branch patterns (feature/, feat/, etc.)
- Bugfix branch patterns (fix/, bugfix/, etc.)
- Release branch patterns
- Hotfix patterns

**Commit Messages:**

- Conventional commits usage (feat:, fix:, chore:)
- Scope patterns
- Breaking change notation
- Reference patterns (issue numbers, tickets)

**PR Requirements:**

- Review requirements (approvals needed)
- CI/CD checks that must pass
- Documentation update requirements
- Testing requirements before merge

**Deployment:**

- Pre-deployment checklist
- Environment-specific considerations
- Rollback procedures
- Post-deployment validation

---

## 7. Critical Don't-Miss Rules

Identify rules that prevent common mistakes and handle edge cases.

### Anti-Patterns Template

"Based on your codebase, here are critical things agents must NOT do:

{{critical_anti_patterns_with_examples}}

**Edge Cases:**
{{specific_edge_cases_agents_should_handle}}

**Security Rules:**
{{security_considerations_agents_must_follow}}

**Performance Gotchas:**
{{performance_patterns_to_avoid}}

Are there other 'gotchas' agents should know about?"

### Anti-Pattern Categories

**Common Anti-Patterns:**

- Code patterns to avoid (specific to codebase)
- Deprecated APIs or libraries not to use
- Known problematic patterns
- Legacy code patterns being phased out

**Edge Cases:**

- Boundary conditions that need special handling
- Race conditions to watch for
- State management edge cases
- Error scenarios requiring special handling

**Security Considerations:**

- Input validation requirements
- Authentication/authorization patterns
- Sensitive data handling
- API security patterns
- CSRF/XSS prevention patterns

**Performance Gotchas:**

- Operations that cause performance issues
- Memory leak patterns to avoid
- Database query anti-patterns
- Frontend rendering performance issues
- Network request optimization patterns

---

## Usage Notes for Step Files

**This framework should be referenced when:**

- Facilitating project context generation (Step 2)
- Adapting questions to user skill level
- Ensuring comprehensive coverage of all rule categories
- Providing consistent facilitation patterns

**Step files should:**

1. Reference this framework in frontmatter under `data_files`
2. Use category templates as conversation guides
3. Adapt scripts based on detected user skill level
4. Link to specific sections when detailed templates are needed
5. Keep workflow-specific logic in step file, not here

---

## Content Optimization Guidelines

**Focus on:**

- Unobvious rules agents might miss
- Project-specific patterns (not general best practices)
- Critical version constraints and compatibility notes
- Anti-patterns specific to this codebase
- Edge cases requiring special handling

**Avoid:**

- Obvious rules agents already know
- Generic advice available in documentation
- Overly verbose explanations
- Redundant information across categories
- Time estimates (AI development speed varies)

---

## Related Data Files

- **context-document-template.md**: Final project context document structure
- **context-completion-template.md**: Completion messages and validation checklists
