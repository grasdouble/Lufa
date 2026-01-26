# Architecture Decision Changes - January 25, 2026

**Reference:** `brainstorming-session-2026-01-22.md`  
**Decisions Document:** `architecture-decisions.md` (in same folder)

---

## Purpose

This document records **changes to architectural decisions** made during implementation. It does NOT track implementation progress (see session summaries in `_bmad-output/` for that).

For the current state of all decisions, see `architecture-decisions.md`.

---

## Decision Change #1: TypeScript Export Cancelled

**Date:** January 25, 2026  
**Affects:** Decision #3 (Distribution) and Decision #5 (TypeScript)

### Original Decision (2026-01-22)

Export TypeScript with CSS variable references:

```typescript
// tokens.ts
export const tokens = {
  color: {
    background: {
      primary: 'var(--lufa-color-background-primary)',
    },
  },
};
```

**Use case:** Type-safe token access in React/TS components

### Changed Decision (2026-01-25)

**No TypeScript/JavaScript export**

Tokens only available as:

1. **CSS Custom Properties** (`tokens.css`)
2. **JSON metadata** (`tokens-metadata.json`)
3. **JSON values** (`tokens-values.json`)

### Rationale

**Why changed:**

1. **Simpler architecture** - One less output format to maintain
2. **Direct CSS usage** - Components use CSS vars directly (industry standard)
3. **Reduced build complexity** - Fewer transforms and formats
4. **JSON sufficient** - Metadata available for tooling/docs without TS file

**Trade-offs accepted:**

- ❌ No TypeScript autocomplete for token paths
- ❌ No compile-time token validation
- ✅ But: Simpler, more maintainable, smaller package

### Impact

**Package exports (before):**

```json
{
  "exports": {
    "./tokens.css": "./dist/tokens.css",
    "./tokens": "./dist/tokens.ts", // ❌ Removed
    "./tokens-metadata.json": "./dist/tokens-metadata.json"
  }
}
```

**Package exports (after):**

```json
{
  "exports": {
    "./tokens.css": "./dist/tokens.css",
    "./tokens-metadata.json": "./dist/tokens-metadata.json",
    "./tokens-values.json": "./dist/tokens-values.json"
  }
}
```

**Style Dictionary config:**

```javascript
// Removed entire 'typescript' platform
platforms: {
  css: { /* ... */ },
  json: { /* ... */ }
  // typescript: { /* ... */ } ❌ Removed
}
```

**Component usage (no change):**

```tsx
// Before and After - same usage
const Button = styled.button`
  background: var(--lufa-core-brand-primary);
  color: var(--lufa-core-neutral-text-on-primary);
`;
```

### Migration

**For consumers (v2.0.0):**

No migration needed - CSS variables remain unchanged. If using TypeScript exports (which never existed in v1), switch to direct CSS var usage.

---

## Decision Change #2: Theme Template Distribution

**Date:** January 25, 2026  
**Affects:** Decision #8 (Dark Mode)

### Original Approach

Include `theme-template.css` in package distribution:

```json
{
  "exports": {
    "./theme-template.css": "./dist/theme-template.css"
  }
}
```

### Changed Approach

**Template available via CLI only:**

```bash
npx lufa-validate-theme --template > my-theme.css
```

### Rationale

**Why changed:**

1. **Better developer experience** - Generated on-demand with latest tokens
2. **Always up-to-date** - Template reflects current token structure
3. **Smaller package** - No need to distribute large template file
4. **Separation of concerns** - Custom theming is advanced use case, fits CLI better

**Trade-offs:**

- ✅ Template always matches current tokens
- ✅ CLI provides validation immediately after generation
- ⚠️ Requires CLI package installation (but already needed for validation)

### Impact

**Old workflow:**

```bash
cp node_modules/@grasdouble/lufa-tokens/theme-template.css ./my-theme.css
# Edit my-theme.css
npx lufa-validate-theme ./my-theme.css
```

**New workflow:**

```bash
npx lufa-validate-theme --template > my-theme.css
# Edit my-theme.css
npx lufa-validate-theme ./my-theme.css
```

---

## Non-Decision: Multi-Mode Implementation Details

**Date:** January 25, 2026

### Not a Decision Change

The brainstorming session (2026-01-22) specified multi-mode support with `modes` metadata. Implementation followed this exactly, with no architectural changes needed.

**What was implemented:**

- ✅ `modes` metadata in token definitions (as planned)
- ✅ Custom Style Dictionary format for multi-mode CSS (as planned)
- ✅ `[data-theme]` CSS selectors (as planned)
- ✅ 31 tokens support light/dark/high-contrast (as planned)

**Details:**

- Neutral (9 tokens), Brand (6 tokens), Semantic (16 tokens)
- CSS output: 528 lines with 3 theme selectors
- No undefined values, all references resolved correctly

**Reference:** See session summaries for implementation details.

---

## Future Decision Points

### Under Consideration (Not Yet Decided)

1. **Official `useTheme()` React Hook**
   - Option A: Separate package `@grasdouble/lufa-react-hooks`
   - Option B: Include in `@grasdouble/lufa-react` main package
   - Decision pending: Phase 2

2. **Lifecycle Metadata Fields**
   - Add `stability`, `deprecated`, `replacedBy` fields
   - Runtime deprecation warnings
   - Decision pending: Phase 3

3. **IDE Extension Strategy**
   - VSCode extension for autocomplete
   - LSP-based vs JSON schema approach
   - Decision pending: Phase 3

---

## Decision History Summary

| Date       | Decision              | Change                   | Status |
| ---------- | --------------------- | ------------------------ | ------ |
| 2026-01-22 | Initial brainstorming | 9 core decisions defined | ✅     |
| 2026-01-25 | TypeScript Export     | Cancelled                | ✅     |
| 2026-01-25 | Theme Template        | CLI-only distribution    | ✅     |
| 2026-01-25 | Multi-mode            | Implemented as planned   | ✅     |

---

## Related Documents

- **Current Decisions:** `architecture-decisions.md` (same folder) ← Single source of truth
- **Brainstorming Session:** `brainstorming-session-2026-01-22.md` (same folder)
- **Implementation Progress:** `/_bmad-output/SESSION-CONTINUATION-SUMMARY-2026-01-25.md`
- **Alignment Report:** `/_bmad-output/DESIGN-SYSTEM-ALIGNMENT-REPORT.md`

---

**Document Type:** Decision Change Log  
**Last Updated:** January 25, 2026  
**Next Review:** On next architectural change
