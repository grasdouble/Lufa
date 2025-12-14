# Architecture Update Prompts

**CRITICAL**: Always use `.github/ai/templates/ARCHITECTURE.template.md` as structure reference. Never remove or reorder sections.

## Update Triggers

Update when:

- New/removed packages
- Package structure changes
- New workflows/actions
- Technology stack changes
- Deployment changes
- Package naming changes

## Investigation Commands

```bash
cat pnpm-workspace.yaml
ls -R packages/
cat package.json
ls .github/workflows/
ls .github/actions/
find packages -name "package.json" -exec jq -r '.name' {} \;
```

## Complete Regeneration

1. Read template: `.github/ai/templates/ARCHITECTURE.template.md`
2. Keep exact same section order and headings
3. Scan workspace (pnpm-workspace.yaml)
4. Replace all [placeholders] with actual content
5. Update monorepo structure diagram
6. Set "Last Updated" date
7. Remove template comments

## Incremental Update

1. Read current ARCHITECTURE.md structure
2. Update only changed sections
3. Maintain all existing sections and order
4. Update "Last Updated" date
