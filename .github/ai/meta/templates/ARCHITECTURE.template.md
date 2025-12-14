<!--
AI INSTRUCTIONS:

1. Replace all [placeholders] with actual values from codebase
2. Remove sections that don't apply
3. Use real data (package.json, source files, configs)
4. Delete this comment when done

FORMATTING:
- Use # for title, ## for sections
- Use `` for inline code, file names, package names
- Use code blocks with ```ts/yaml/json for snippets
- Keep tables aligned
-->

# [Package Name]

Package: [@scope/package-name]
Location: [path/to/package]
Updated: YYYY-MM-DD
Version: [x.x.x]

## Stats

- [Key metric 1]
- [Key metric 2]
- [Key metric 3]
- Dependencies: [runtime count] runtime, [dev count] dev

## Structure

```
[path/to/package]/
├── src/
│   ├── [dir]/           [purpose]
│   └── index.ts         [exports]
├── dist/                [build output]
├── [config].ts          [config type]
└── package.json
```

## Tech Stack

| Layer       | Technology | Purpose |
| ----------- | ---------- | ------- |
| [Framework] | [Name]     | [Why]   |
| [Build]     | [Tool]     | [Why]   |
| [Language]  | [TS/JS]    | [Why]   |

## Key Concepts

**[Concept 1]**: [1-line explanation]

```[lang]
[minimal code example]
```

**[Concept 2]**: [1-line explanation]

## Config

**[config-file]**:

```[lang]
[essential config only]
```

Settings: [key1]: [value/purpose], [key2]: [value/purpose]

## Build

**Dev**:

```bash
[dev command]
```

Steps: [step1] → [step2] → [step3]

**Prod**:

```bash
[prod command]
```

Output: [files] ([size])
Format: [ES/CJS], Minified: [Y/N], Maps: [Y/N]

## Dependencies

**Runtime**: [dep1], [dep2], [dep3]
**Peer**: [peer1], [peer2]
**Dev** (key only): [dev1], [dev2]

Purpose:

- [dep-name]: [why needed]

## Integration

**[Integration Point 1]**:

```[lang]
[import/usage]
```

Flow: [step1] → [step2] → [step3]

**[Integration Point 2]**: [brief description]

## Workflows

**[Workflow Name]**:

1. [step] - `[command]`
2. [step] - `[command]`
3. [step] - `[command]`

## Decisions

- **[Decision 1]**: [What] | Why: [reason] | Trade-off: [downside]
- **[Decision 2]**: [What] | Why: [reason] | Trade-off: [downside]
- **[Decision 3]**: [What] | Why: [reason] | Trade-off: [downside]

## Deployment

Target: [platform/environment]
URL: [production-url]
Method: [deployment-type]
CI/CD: [automation-info]

## Performance

| Metric    | Target  | Optimization |
| --------- | ------- | ------------ |
| [metric1] | [value] | [technique]  |
| [metric2] | [value] | [technique]  |

## Best Practices

**Do**:

- [practice 1]
- [practice 2]

**Don't**:

- [anti-pattern 1]
- [anti-pattern 2]

## Debug

| Issue     | Fix                                |
| --------- | ---------------------------------- |
| [problem] | [solution + command if applicable] |
| [problem] | [solution]                         |

## Testing

Strategy: [approach]
Types: [unit/integration/e2e]

```bash
[test command]
```

## Links

- [Doc 1](../../path/to/doc.md)
- [Doc 2](../../path/to/doc.md)
- [Parent](../../architecture/PARENT.md)
