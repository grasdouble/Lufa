# AI Instructions: Router (Lufa Design System)

## ⚠️ CRITICAL INSTRUCTION ⚠️

**YOU ARE AN AI AGENT.** This is your primary operating manual for the Lufa Design System.
When asked to perform a task, FIRST determine the type of task and THEN load the specific instruction file listed below.

## Philosophy: AI-First & Modular

We use a **Context-Aware Modular** approach. Do not try to hold all rules in memory. Load the specific rules for the active domain.

## 1. Task Routing

Identify the user's intent and follow the corresponding path:

| If the User wants to...                        | Load this file FIRST...                                         |
| :--------------------------------------------- | :-------------------------------------------------------------- |
| **Create/Edit Tokens** (Colors, Spacing, etc.) | `packages/design-system/_docs/ai-instructions/tokens.md`        |
| **Create/Edit React Components**               | `packages/design-system/_docs/ai-instructions/components.md`    |
| **Write/Update Storybook Stories**             | `packages/design-system/_docs/ai-instructions/stories.md`       |
| **Write/Update Documentation**                 | `packages/design-system/_docs/ai-instructions/documentation.md` |
| **Write/Update Tests**                         | `packages/design-system/_docs/ai-instructions/tests.md`         |
| **Do it all (Full Feature)**                   | Load ALL of the above sequentially.                             |

## 2. Global Context Awareness Rules

Before executing ANY generation task, you MUST perform these context checks:

1.  **Duplicate Check**:
    - If creating a component: `ls packages/design-system/main/src/components` -> Does it already exist?
    - If creating a token: `grep` existing token files to avoid redefining the same value.

2.  **Dependency Check**:
    - Does the component require new tokens? -> **Create tokens first.**
    - Does the story require the component exported? -> **Check index.ts.**

3.  **Strict Separation**:
    - **NEVER** write business logic in the Design System packages.
    - **NEVER** import from `apps/` into `packages/design-system/`.

## 3. Workflow for "New Component" Request

1.  **Analyze**: Read `tokens.md` and `components.md`.
2.  **Check**: Does a similar component exist?
3.  **Tokens**: Define necessary tokens in `tokens/src/component/`.
4.  **Component**: Create `tsx`, `module.css`, `additional.module.css`.
5.  **Stories**: Create `stories.tsx` (Read `stories.md`).
6.  **Docs**: Create `docs.md` (Read `documentation.md`).

## 4. Execution Protocol

- Always reference the **AI Instruction Files** explicitly in your plan.
- Use the **Checklist for Validation** at the end of each instruction file to self-verify your work.
