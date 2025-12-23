# Archived Prompts

This folder contains prompt files that have been archived because agents provide better interactive experiences for these workflows.

## Archived Files

### `lufa-design-system-builder.prompt.md`

**Date Archived:** 2025-12-23

**Reason:** Superseded by the enhanced `lufa-design-system-expert.agent.md`

This prompt provided step-by-step guidance for building design system components. It has been replaced by the more powerful agent-based approach which offers:

- **Interactive guidance** - Agents can ask clarifying questions and adapt to your needs
- **Tool access** - Agents can search codebase, run tests, and make edits
- **TDD workflow** - Optional handoffs to TDD agents for structured development
- **Better UX** - Agents remember context and provide continuous support

**Migration:** Use the `Dev - Lufa Design System` agent instead:

- Invoke the agent: `@workspace /new Dev - Lufa Design System`
- Describe what you need (build, review, refactor, or debug)
- Choose direct implementation or TDD workflow with handoffs
- Get interactive help with code templates and quality checks

The agent includes all the templates, patterns, and guidance from this prompt plus interactive capabilities.
