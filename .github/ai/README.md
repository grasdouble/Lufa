# <!--

AI AGENT: Main hub for Lufa documentation tools.
Use table below to find what you need. For detailed workflows: AI_AGENT_INSTRUCTIONS.md
-->

# AI Documentation Hub

## Quick Reference

| User Request          | File to Use                                        | Output Location                    |
| --------------------- | -------------------------------------------------- | ---------------------------------- |
| Document workflow     | `templates/GITHUB_WORKFLOW_DOC.template.md`        | `.github/workflows/{name}.md`      |
| Document action       | `templates/GITHUB_ACTION_DOC.template.md`          | `.github/actions/{name}/README.md` |
| Update architecture   | `prompts/ARCHITECTURE_UPDATE_PROMPTS.md`           | `ARCHITECTURE.md`                  |
| Update dev guidelines | `prompts/DEVELOPMENT_GUIDELINES_UPDATE_PROMPTS.md` | `DEVELOPMENT_GUIDELINES.md`        |
| Understand project    | `ARCHITECTURE.md`                                  | (read & explain)                   |
| Learn standards       | `DEVELOPMENT_GUIDELINES.md`                        | (read & explain)                   |

## Folder Structure

```
ai/
├── README.md                          (quick reference)
├── AI_AGENT_INSTRUCTIONS.md           (detailed workflows)
├── ARCHITECTURE.md                    (project structure)
├── DEVELOPMENT_GUIDELINES.md          (coding standards)
├── prompts/                           (update guides)
└── templates/                         (creation templates)
```

## Usage

**Creating docs**: Use template → Read AI instructions → Fill with real data → Remove instructions
**Updating docs**: Use prompts file → Follow steps → Verify → Update

## Rules

✅ Use real data from repo (package names, file paths, commands)
✅ Verify all info before writing
✅ Remove template instructions from final docs
❌ Never leave `[placeholders]` or `[TODO]`
