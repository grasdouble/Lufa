# Lufa - Project Context (Root)

## 🗺️ System Map & Navigation

**AI AGENTS**: This is the Root Context. Depending on your task, navigate to the specific domain context below.

> **Rule**: If a specific context file exists, it **overrides** generic instructions.

| Domain            | Path                     | Status            | Context File                                                            |
| :---------------- | :----------------------- | :---------------- | :---------------------------------------------------------------------- |
| **Design System** | `packages/design-system` | 🚧 **Active Dev** | **[👉 READ THIS CONTEXT](./packages/design-system/project-context.md)** |
| **Apps**          | `packages/apps`          | 💤 Pending        | _(No specific context yet)_                                             |
| **CDN**           | `packages/cdn`           | 💤 Pending        | _(No specific context yet)_                                             |
| **Plugins**       | `packages/plugins`       | 💤 Pending        | _(No specific context yet)_                                             |
| **POC**           | `packages/poc`           | 🧪 Experimental   | _(No specific context yet)_                                             |

## 🛠️ Monorepo Architecture

- **Type**: Monorepo
- **Package Manager**: `pnpm` (Workspaces)
- **Structure**:
  - `packages/`: All workspaces (libraries, apps, services).
  - `_bmad/`: AI Agent configurations and workflows.
  - `docs/`: Global documentation (if applicable).

## 🚨 Global Standards

1.  **Context Awareness**: Always check the specific package's `project-context.md` before generating code. The Design System has very specific strict rules (No Back-Compat) that do not necessarily apply to other parts.
2.  **Dependency Management**: Use `pnpm add -w` for root dependencies, or filter for specific packages.
3.  **Git Operations**: proper commit messages are required.
