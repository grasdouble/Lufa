# AI Agent Prompts Directory

This directory contains reusable prompts for AI agents working with the Lufa codebase.

---

## 📚 Available Prompts

### Documentation & Project Setup

- **[create-agentsmd.prompt.md](create-agentsmd.prompt.md)**
  - Generate or update AGENTS.md file
  - Follows the [AGENTS.md standard](https://agents.md/)
  - Agent: `agent`

- **[create-readme.prompt.md](create-readme.prompt.md)**
  - Generate README files for packages
  - Agent: TBD

### Testing & Quality Assurance

- **[playwright-generate-test.prompt.md](playwright-generate-test.prompt.md)**
  - Generate Playwright E2E tests
  - Follows best practices from `.github/instructions/playwright-typescript.instructions.md`
  - Agent: TBD

- **[playwright-explore-website.prompt.md](playwright-explore-website.prompt.md)**
  - Explore and map website structure
  - Useful for understanding app architecture before writing tests
  - Agent: TBD

### Design System (Archived)

- **[archived/lufa-design-system-builder.prompt.md](archived/lufa-design-system-builder.prompt.md)**
  - Legacy design system builder prompt (archived)
  - Replaced by improved workflows in AGENTS.md
  - Agent: `agent`

### Code Quality & Security

- **[ai-prompt-engineering-safety-review.prompt.md](ai-prompt-engineering-safety-review.prompt.md)**
  - Review code for security and safety issues
  - Check for prompt injection vulnerabilities
  - Agent: TBD

### Utilities & Conversion

- **[tailwindcss-convert.prompt.md](tailwindcss-convert.prompt.md)**
  - Convert traditional CSS to Tailwind CSS utilities
  - Respects design system tokens
  - Agent: TBD

- **[model-recommendation.prompt.md](model-recommendation.prompt.md)**
  - Get recommendations on which AI model to use for specific tasks
  - Agent: TBD

---

## 🎯 How to Use Prompts

### With GitHub Copilot

Reference prompts in chat:

```
@workspace use prompt from .github/prompts/playwright-generate-test.prompt.md
```

Or use with specific context:

```
@workspace Generate Playwright tests for Button component using the prompt in .github/prompts/playwright-generate-test.prompt.md
```

### With Claude Code

Use the Skill tool or reference the prompt file directly:

```
Use the prompt from .github/prompts/create-agentsmd.prompt.md to update AGENTS.md
```

### With Aider

Reference the file directly:

```bash
aider --read .github/prompts/create-readme.prompt.md
```

Or in chat:

```
/read .github/prompts/create-readme.prompt.md
```

### With Other AI Agents

Copy the prompt content or reference the file path in your agent's interface.

---

## 📝 Creating New Prompts

When creating new prompts, follow these guidelines:

### File Naming Convention

Use descriptive names with `.prompt.md` extension:

```
<action>-<subject>.prompt.md
```

Examples:
- `generate-component-test.prompt.md`
- `refactor-for-accessibility.prompt.md`
- `analyze-performance.prompt.md`

### File Structure

Use YAML frontmatter for metadata:

```markdown
---
description: "Brief description of what this prompt does"
agent: "agent" # or specific agent type
---

# Prompt Title

[Detailed instructions for the AI agent]

## Context
[Relevant context about the project]

## Task
[Specific task to accomplish]

## Requirements
[Requirements and constraints]

## Example
[Example of expected output]
```

### Best Practices

1. **Be Specific**: Clear, unambiguous instructions
2. **Provide Context**: Include relevant project conventions
3. **Include Examples**: Show expected output format
4. **Reference Standards**: Link to `.github/instructions/` files
5. **Test the Prompt**: Verify it works with multiple AI agents
6. **Update This README**: Add your new prompt to the list above

---

## 🔗 Related Documentation

- **[AGENTS.md](../../AGENTS.md)** - Complete development guide
- **[CLAUDE.md](../../CLAUDE.md)** - Quick reference for Claude Code
- **[.github/copilot-instructions.md](../copilot-instructions.md)** - GitHub Copilot instructions
- **[.github/instructions/](../instructions/)** - Path-scoped instructions
- **[.github/agents/](../agents/)** - Custom agent definitions

---

## 📊 Prompt Categories

| Category | Active Prompts | Purpose |
|----------|---------------|---------|
| **Documentation** | 2 | Generate/update docs |
| **Testing** | 2 | Generate tests, explore apps |
| **Code Quality** | 1 | Security reviews |
| **Utilities** | 2 | Convert code, model selection |
| **Total** | **7** | - |

> 📜 **History**: 6 prompts removed (5 suggestion tools + 1 legacy design system builder). See "Removed Prompts History" section below.

---

## 🚀 Quick Links

**Most Used Prompts:**
1. [Generate Playwright tests](playwright-generate-test.prompt.md)
2. [Create AGENTS.md](create-agentsmd.prompt.md)
3. [Security review](ai-prompt-engineering-safety-review.prompt.md)

**For Beginners:**
- Start with [model-recommendation.prompt.md](model-recommendation.prompt.md) to choose the right AI model
- Use [create-readme.prompt.md](create-readme.prompt.md) for documentation
- Review [.github/instructions/](../instructions/) for path-scoped coding guidance

---

## 💡 Tips

- **Combine Prompts**: Chain multiple prompts for complex tasks
- **Customize**: Adapt prompts to your specific needs
- **Share**: Contribute successful prompts back to the project
- **Version Control**: All prompts are versioned with git

---

## 📜 Removed Prompts History

Prompts removed from active use. Available in Git history if needed.

| Prompt | Category | Removed | Reason |
|--------|----------|---------|--------|
| `suggest-awesome-github-copilot-agents.prompt.md` | Meta / Improvement | 2025-01-11 | Comprehensive set already exists |
| `suggest-awesome-github-copilot-chatmodes.prompt.md` | Meta / Improvement | 2025-01-11 | Comprehensive set already exists |
| `suggest-awesome-github-copilot-collections.prompt.md` | Meta / Improvement | 2025-01-11 | Comprehensive set already exists |
| `suggest-awesome-github-copilot-instructions.prompt.md` | Meta / Improvement | 2025-01-11 | Comprehensive set already exists |
| `suggest-awesome-github-copilot-prompts.prompt.md` | Meta / Improvement | 2025-01-11 | Comprehensive set already exists |
| `lufa-design-system-builder.prompt.md` | Design System | 2025-01-11 | Improved workflows available |

**Restoration**: Recover from Git with:
```bash
git log --all --full-history -- ".github/prompts/<filename>"
git checkout <commit-hash> -- ".github/prompts/<filename>"
```

---

**Need help?** See [AGENTS.md](../../AGENTS.md) for complete project documentation.
