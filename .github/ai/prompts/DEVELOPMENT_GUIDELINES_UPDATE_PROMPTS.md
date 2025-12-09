# Development Guidelines Update Prompts

**CRITICAL**: Always use `.github/ai/templates/DEVELOPMENT_GUIDELINES.template.md` as structure reference. Never remove or reorder sections.

## Update Triggers

Update when:

- New coding standards
- Technology/tools change
- Testing framework change
- File naming conventions change
- Security/accessibility practices update
- Build tools change
- Common issues identified

## Investigation Commands

```bash
cat package.json
ls packages/config/
find packages/config -name "*eslint*"
find packages/config -name "*tsconfig*"
find . -name "*.test.*" | head -10
cat package.json | jq '.scripts'
```

## Complete Regeneration

1. Read template: `.github/ai/templates/DEVELOPMENT_GUIDELINES.template.md`
2. Keep exact same section order and headings
3. Review actual code/configs in repo
4. Replace all [placeholders] with real patterns
5. Verify all code examples work
6. Remove template comments

## Incremental Update

1. Read current DEVELOPMENT_GUIDELINES.md structure
2. Update only changed sections
3. Maintain all existing sections and order
4. Verify examples work
