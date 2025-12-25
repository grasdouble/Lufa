# Archived Agents

This folder contains agents that have been archived because their functionality has been merged into other agents.

## Archived Files

### `lufa-design-system-builder.agent.md`

**Date Archived:** 2025-12-23

**Reason:** Functionality merged into `lufa-design-system-expert.agent.md`

The Builder agent was a specialized agent for creating new components with TDD workflow. Its features have been integrated into the enhanced Lufa Design System Expert agent, which now handles:

- Building new components (direct or TDD workflow)
- Reviewing existing components
- Refactoring and debugging
- Architecture decisions

**Migration:** Use the `Dev - Lufa Design System` agent instead, which includes:

- All builder templates and workflows
- TDD handoffs (Write Tests → Implement → Refactor)
- Direct implementation option
- Comprehensive quality checklists

The enhanced agent provides a single, unified experience for all design system work while preserving the structured TDD workflow when needed.
