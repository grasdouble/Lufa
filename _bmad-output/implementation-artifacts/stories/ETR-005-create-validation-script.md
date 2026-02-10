# Story ETR-005: Create Validation Script

**Story ID**: ETR-005  
**Epic**: ETR-EPIC-001 - Infrastructure & Tokens Foundation  
**Priority**: P2 (Optional)  
**Story Points**: 3  
**Estimated Time**: 1 hour  
**Type**: Tooling  
**Status**: Ready for Development  
**Dependencies**: ETR-003, ETR-004

---

## Epic Context

This story is part of Epic 1: Infrastructure & Tokens Foundation. This optional tooling story creates automation to validate that all themes follow the token-based approach and have no hardcoded colors.

**Epic Goals**:
1. Define and document token naming conventions
2. Create token templates for alpha, shadow, and overlay tokens
3. Pilot the entire process with Steampunk theme as reference implementation
4. Establish validation and testing procedures

---

## User Story

As a developer, I need an automated validation script so that I can ensure no hardcoded colors remain in theme files.

---

## Description

Create a Node.js script that scans CSS files for hardcoded rgba/hex values and reports violations. This script helps maintain token consistency across all themes and can be integrated into CI/CD pipelines.

---

## Acceptance Criteria

- [ ] Script scans all *-docusaurus.css files
- [ ] Detects rgba() with hardcoded values (not using variables)
- [ ] Detects hex colors (#RRGGBB, #RGB)
- [ ] Allows exceptions for justified cases (gradients, etc.)
- [ ] Reports findings with file path and line number
- [ ] Exit code 0 if no violations, 1 if violations found
- [ ] Can be integrated into CI/CD pipeline
- [ ] Documentation on how to run and interpret results

---

## Technical Details

### Detection Patterns

```javascript
// Regex patterns to detect:
// 1. rgba(R, G, B, A) where R,G,B are numbers
const rgbaPattern = /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g;

// 2. #RGB or #RRGGBB hex colors
const hexPattern = /#[0-9A-Fa-f]{3,6}\b/g;

// 3. Exclude patterns:
// - var(--*) variable references
// - linear-gradient contexts (optional)
// - Whitelisted exceptions
```

### Script Structure

```typescript
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface Violation {
  file: string;
  line: number;
  column: number;
  value: string;
  type: 'rgba' | 'hex';
}

// Configuration
const SCAN_DIRECTORY = 'packages/design-system/docusaurus/src/css';
const SCAN_PATTERN = '*-docusaurus.css';
const EXCEPTIONS = [
  // Add exceptions here
  'linear-gradient', // Allow gradients
];

function scanFile(filePath: string): Violation[] {
  // Implementation
}

function validateTokens(): void {
  // Scan all files
  // Collect violations
  // Report results
  // Exit with appropriate code
}

validateTokens();
```

---

## Files to Create

- `packages/design-system/docusaurus/scripts/validate-tokens.ts` (new)
- Update `packages/design-system/docusaurus/package.json` with script: `"validate:tokens": "tsx scripts/validate-tokens.ts"`

---

## Implementation Steps

1. Create the scripts directory if it doesn't exist
2. Create the validate-tokens.ts script
3. Implement file scanning logic
4. Implement regex pattern detection
5. Implement exception handling
6. Implement reporting logic
7. Add npm script to package.json
8. Test the script on existing files
9. Document usage in README

---

## Output Format

### Success Case
```
✅ Token Validation Passed

Scanned Files:
  - steampunk-docusaurus.css
  - ocean-docusaurus.css
  - cyberpunk-docusaurus.css
  
Total Files: 3
Total Lines: 2,450
Violations Found: 0

All files are using design tokens correctly!
```

### Violation Case
```
❌ Token Validation Failed

Violations Found:

📄 steampunk-docusaurus.css
  Line 45:   background: rgba(184, 115, 51, 0.05);
             ^ Use: var(--lufa-alpha-primary-5)
  
  Line 78:   border-color: #B87333;
             ^ Use: var(--lufa-color-primary)

📄 ocean-docusaurus.css
  Line 23:   box-shadow: 0 2px 4px rgba(8, 145, 178, 0.25);
             ^ Use: var(--lufa-shadow-sm)

Total Violations: 3
Exit Code: 1
```

---

## Testing & Validation

### Test Cases
1. **Test with clean file**: Should report 0 violations
2. **Test with rgba violation**: Should detect and report
3. **Test with hex violation**: Should detect and report
4. **Test with exception**: Should allow whitelisted patterns
5. **Test with multiple files**: Should scan all and aggregate results

### Commands to Test
```bash
cd packages/design-system/docusaurus
pnpm validate:tokens
```

---

## CI/CD Integration

Add to GitHub Actions or CI pipeline:

```yaml
- name: Validate Design Tokens
  run: |
    cd packages/design-system/docusaurus
    pnpm validate:tokens
```

---

## Configuration Options

Consider adding a configuration file for flexibility:

```json
// .validate-tokens.json
{
  "scanDirectory": "packages/design-system/docusaurus/src/css",
  "scanPattern": "*-docusaurus.css",
  "exceptions": [
    "linear-gradient",
    "radial-gradient"
  ],
  "allowedFiles": [
    "landing-themes.css" // temporarily allow during migration
  ]
}
```

---

## Related Stories

- **Depends on**: ETR-003 (Pilot Steampunk Theme - Add Base Tokens)
- **Depends on**: ETR-004 (Pilot Steampunk Theme - Refactor Docusaurus CSS)
- **Useful for**: All subsequent refactoring stories in Epics 2, 3, 4, 5

---

## Notes

This is an **optional** story that provides valuable automation. While not critical for the refactoring itself, it significantly improves quality assurance and maintainability.

**Priority**: Can be completed after Epic 1 pilot is successful, or deferred to later if time is constrained.

---

**Created**: 2026-02-10  
**Last Updated**: 2026-02-10  
**Language**: English (technical), French (communication)
