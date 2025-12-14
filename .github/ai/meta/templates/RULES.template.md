<!--
AI INSTRUCTIONS:

1. Replace all [placeholders] with actual values from codebase
2. Remove sections that don't apply
3. Use real commands, code examples, file paths
4. Delete this comment when done

FORMATTING:
- Use # for title, ## for sections
- Use `` for inline code, commands, file names
- Use code blocks with ```bash/ts/js for examples
- Keep tables aligned
-->

# [Package Name] - Development Rules

Package: [@scope/package-name]
Location: [path/to/package]
Updated: YYYY-MM-DD

Architecture: [../../architecture/[category]/[FILE].md](../../architecture/[category]/[FILE].md)

## Structure

```
[path/to/package]/
├── [dir]/              [purpose]
├── [config-file]       [purpose]
└── package.json
```

## Creating [Thing]

**Steps**:

1. [action] - `[command]`
2. [action] - `[command]`
3. [action] - `[command]`

**Template**:

```[lang]
[real code template]
```

**Integration**:

```[lang]
[integration code]
```

## Modifying [Thing]

1. [locate] → [change] → [test]

**Example**:

```[lang]
// Before
[code]
// After
[code]
```

**Impact**: [pkg1], [pkg2], [pkg3]

## Naming

| Type    | Format      | Example              |
| ------- | ----------- | -------------------- |
| [type1] | `[pattern]` | ✅ [good] / ❌ [bad] |
| [type2] | `[pattern]` | ✅ [good] / ❌ [bad] |

## Build

**Dev**:

```bash
[dev command]
```

Effects: [effect1], [effect2]
Hot reload: [Y/N]

**Prod**:

```bash
[build command]
```

Output: [files list]

**Test**:

```bash
[test command]         # Isolation
[integration command]  # Integration
```

## Code Templates

**[Template Name]**:

```[lang]
[complete template]
```

## Dependencies

**Add**: `pnpm add [package]`

| Type     | Packages       | When       |
| -------- | -------------- | ---------- |
| External | [dep1], [dep2] | [use case] |
| Bundled  | [dep3], [dep4] | [use case] |

**Import**:

```[lang]
import { Thing } from '@scope/external';  // External
import { util } from 'bundled';           // Bundled
```

## Deployment

**Version**:

```bash
pnpm changeset  # Select: pkg, type (patch/minor/major), summary
```

**Build**:

```bash
[deployment commands]
```

**Verify**: [URL or command]

## Rules

**DO**:

- [practice 1]
- [practice 2]
- [practice 3]

**DON'T**:

- [anti-pattern 1]
- [anti-pattern 2]
- [anti-pattern 3]

## Common Tasks

| Task    | Commands                            |
| ------- | ----------------------------------- |
| [task1] | `[cmd1]` → `[cmd2]` → verify: [how] |
| [task2] | `[cmd]`                             |

## Debug

| Issue     | Solution                |
| --------- | ----------------------- |
| [problem] | `[fix command]` - [why] |
| [problem] | `[fix command]`         |

## Examples

**[Example 1]**:

```[lang]
[complete working code]
```

Result: [output]

**[Example 2]**:

```[lang]
[integration example]
```

## Links

- [Architecture](../../architecture/[category]/[FILE].md)
- [Related](./[FILE].md)
