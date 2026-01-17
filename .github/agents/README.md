# Custom AI Agents

This directory contains 11 specialized AI agents for the Lufa project, optimized for specific development tasks.

---

## 📚 Available Agents

### Design System & Components

#### 🎨 Lufa Design System Expert

**File**: [lufa-design-system-expert.agent.md](lufa-design-system-expert.agent.md)
**Name**: `Dev - Lufa Design System`
**Purpose**: Expert in Lufa Design System - build, review, refactor components

**When to use**:

- Creating new design system components
- Reviewing component code for three-layer architecture compliance
- Refactoring existing components
- Architecture questions about the design system
- Component testing with Playwright

**Example prompts**:

```
Build a Badge component with variants
Review this Button component for token usage
Why does my component fail to build?
```

#### ♿ Accessibility Expert

**File**: [accessibility.agent.md](accessibility.agent.md)
**Name**: Accessibility specialist
**Purpose**: WCAG 2.2 Level AA compliance expert

**When to use**:

- Auditing components for accessibility
- Implementing ARIA attributes
- Keyboard navigation patterns
- Screen reader optimization
- Color contrast validation

**Example prompts**:

```
Audit this component for WCAG 2.2 AA compliance
Add proper keyboard navigation to Modal
Review ARIA attributes in this form
```

#### 🎭 Playwright Tester

**File**: [playwright-tester.agent.md](playwright-tester.agent.md)
**Purpose**: Generate Playwright component and E2E tests

**When to use**:

- Creating component tests for design system
- Writing E2E tests for microfrontends
- Debugging test failures
- Test architecture questions

**Example prompts**:

```
Generate Playwright test for TextField component
Why is this test flaking?
Create E2E test for login flow
```

### Development Workflows

#### ⚛️ Expert React Frontend Engineer

**File**: [expert-react-frontend-engineer.agent.md](expert-react-frontend-engineer.agent.md)
**Purpose**: React 19+ expert with hooks, patterns, and best practices

**When to use**:

- Complex React component logic
- Hook composition patterns
- Performance optimization
- State management questions
- React architecture decisions

**Example prompts**:

```
Optimize this component for re-renders
Best way to compose these hooks?
Review this custom hook implementation
```

### Testing & Quality (TDD Workflow)

The TDD agents work together to implement Test-Driven Development:

#### 🔴 TDD Red

**File**: [tdd-red.agent.md](tdd-red.agent.md)
**Purpose**: Write failing tests first (TDD Red phase)

**When to use**:

- Starting TDD workflow
- Defining test cases before implementation
- Ensuring tests fail correctly

**Example prompts**:

```
Write failing tests for Button disabled state
Create test cases for form validation
TDD: Test for error handling in API call
```

#### 🟢 TDD Green

**File**: [tdd-green.agent.md](tdd-green.agent.md)
**Purpose**: Implement minimal code to make tests pass (TDD Green phase)

**When to use**:

- After writing failing tests (Red phase)
- Implementing features to pass tests
- Minimal viable implementation

**Example prompts**:

```
Make the Button tests pass
Implement form validation to pass tests
Minimal code to pass API error tests
```

#### ♻️ TDD Refactor

**File**: [tdd-refactor.agent.md](tdd-refactor.agent.md)
**Purpose**: Refactor code while keeping tests green (TDD Refactor phase)

**When to use**:

- After tests pass (Green phase)
- Code cleanup and optimization
- Improving code quality without changing behavior

**Example prompts**:

```
Refactor Button implementation
Clean up form validation code
Optimize API error handling
```

### Debugging & Analysis

#### 🐛 Debug

**File**: [debug.agent.md](debug.agent.md)
**Purpose**: Systematic debugging and issue resolution

**When to use**:

- Tracking down bugs
- Understanding error messages
- Build failures
- Test failures
- Runtime issues

**Example prompts**:

```
Why does this component throw an error?
Debug this TypeScript type error
Find why tests are failing
Investigate this build failure
```

### Meta & Tooling

#### 🏗️ Meta Agentic Project Scaffold

**File**: [meta-agentic-project-scaffold.agent.md](meta-agentic-project-scaffold.agent.md)
**Purpose**: Project structure and scaffolding

**When to use**:

- Setting up new packages
- Creating boilerplate
- Project architecture
- Monorepo structure

**Example prompts**:

```
Scaffold new microfrontend package
Set up new design system sub-package
Create boilerplate for new feature
```

### Advanced Agents

#### 🦁 GPT-5 Beast Mode

**File**: [gpt-5-beast-mode.agent.md](gpt-5-beast-mode.agent.md)
**Purpose**: Advanced problem-solving with maximum capabilities

**When to use**:

- Complex architectural decisions
- Multi-faceted problems
- Deep analysis required
- When other agents aren't sufficient

**Example prompts**:

```
Design architecture for new feature
Analyze performance bottleneck
Complex refactoring strategy
```

#### 🦁 4.1-Beast

**File**: [4.1-Beast.agent.md](4.1-Beast.agent.md)
**Purpose**: High-capability problem solver

**When to use**:

- Similar to GPT-5 Beast Mode
- Complex problem-solving
- Advanced code generation

---

## 🎯 How to Use Custom Agents

### With GitHub Copilot Chat

Use `@agent-name` in GitHub Copilot Chat:

```
@lufa-design-system-expert Build a Badge component
@accessibility Audit this Modal for WCAG compliance
@playwright-tester Generate tests for TextField
```

### With Claude Code (CLI)

Reference agent files when starting a session:

```bash
claude code --agent .github/agents/lufa-design-system-expert.agent.md
```

Or mention in prompts:

```
Use the Lufa Design System Expert agent to create a Button component
```

### Recommended Workflows

#### 1. Component Development (Full Cycle)

```
1. @lufa-design-system-expert: Build the component
2. @accessibility: Audit for WCAG compliance
3. @playwright-tester: Generate component tests
4. @debug: Fix any issues
```

#### 2. TDD Workflow

```
1. @tdd-red: Write failing tests
2. @tdd-green: Implement minimal code to pass
3. @tdd-refactor: Clean up and optimize
4. @playwright-tester: Add integration tests
```

#### 3. Refactoring Existing Code

```
1. @debug: Understand current implementation
2. @expert-react-frontend-engineer: Review and suggest improvements
3. @accessibility: Ensure compliance maintained
4. @playwright-tester: Update tests
```

#### 4. Performance Optimization

```
1. @debug: Identify bottlenecks
2. @expert-react-frontend-engineer: Optimize React code
3. @playwright-tester: Add performance tests
```

---

## 📊 Agent Selection Guide

| Task                | Primary Agent                 | Supporting Agents                |
| ------------------- | ----------------------------- | -------------------------------- |
| **New component**   | Lufa Design System Expert     | Accessibility, Playwright Tester |
| **Fix bug**         | Debug                         | Lufa Design System Expert        |
| **Add tests**       | Playwright Tester             | TDD Red/Green/Refactor           |
| **Refactor**        | TDD Refactor                  | Expert React Frontend Engineer   |
| **Accessibility**   | Accessibility                 | Playwright Tester                |
| **Complex problem** | GPT-5 Beast Mode / 4.1-Beast  | Debug, Expert React              |
| **Project setup**   | Meta Agentic Project Scaffold | -                                |

---

## 💡 Tips for Working with Custom Agents

1. **Be Specific**: "Build a Button with primary/secondary variants" vs "Make a button"
2. **Reference Context**: Agents have access to project files - reference them
3. **Chain Agents**: Use multiple agents in sequence for complex tasks
4. **Use TDD Workflow**: Red → Green → Refactor for highest quality
5. **Test Early**: Run Playwright Tester early to catch issues
6. **Accessibility First**: Use Accessibility agent during development, not after

---

## 🔗 Related Documentation

- **[AGENTS.md](../../AGENTS.md)** - Complete development guide
- **[.github/prompts/README.md](../prompts/README.md)** - Reusable prompts catalog
- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/copilot-instructions.md](../copilot-instructions.md)** - GitHub Copilot instructions

---

## 📝 Creating New Agents

To create a new custom agent:

1. Follow the agent file template format
2. Define clear purpose and use cases
3. Specify appropriate tools
4. Add to this README
5. Test with real scenarios

Refer to existing agents for template examples (e.g., [lufa-design-system-expert.agent.md](lufa-design-system-expert.agent.md), [accessibility.agent.md](accessibility.agent.md)).

---

## 📜 Removed Agents History

Agents removed from active use. Available in Git history if needed.

| Agent                                 | Category       | Removed    | Reason                                |
| ------------------------------------- | -------------- | ---------- | ------------------------------------- |
| `custom-agent-foundry.agent.md`       | Meta & Tooling | 2025-01-11 | Use existing templates instead        |
| `prompt-builder.agent.md`             | Meta & Tooling | 2025-01-11 | Rarely needed                         |
| `tailwindcss-refactor.agent.md`       | Development    | 2025-01-11 | Tech stack migration completed        |
| `lufa-design-system-builder.agent.md` | Design System  | 2025-01-11 | Replaced by lufa-design-system-expert |

**Restoration**: Recover from Git with:

```bash
git log --all --full-history -- ".github/agents/<filename>"
git checkout <commit-hash> -- ".github/agents/<filename>"
```

---

**Need help?** See [AGENTS.md](../../AGENTS.md) for complete project documentation.
