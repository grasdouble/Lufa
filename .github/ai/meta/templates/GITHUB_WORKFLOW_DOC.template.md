<!--
AI INSTRUCTIONS:

1. Replace all [placeholders] with actual content
2. Remove sections that don't apply to your workflow
3. Add additional sections if needed for workflow-specific details
4. Delete this instruction comment when done

FORMATTING:
- Use # for title, ## for main sections
- Use code blocks with ```yaml for snippets
- Use `` for inline code, commands, file names
- Keep tables aligned for readability
- Include actual console output examples
-->

# [Workflow Name]

[Brief description of what this workflow does]

## Overview

[Detailed explanation of purpose and role in CI/CD]

**Purpose**:

- [objective 1]
- [objective 2]
- [objective 3]

## Trigger

```yaml
on:
  [trigger_type]:
    # specific config
```

**Runs on**:

- [condition 1]
- [condition 2]

## Inputs

_If no inputs: "No input parameters. Automatically [detects/operates on] [context]."_

| Input    | Type     | Required | Default     | Options    | Description   |
| -------- | -------- | -------- | ----------- | ---------- | ------------- |
| `input1` | `choice` | Yes/No   | `"default"` | val1, val2 | [description] |

## Permissions

| Permission      | Level           | Purpose |
| --------------- | --------------- | ------- |
| `contents`      | none/read/write | [why]   |
| `packages`      | none/read/write | [why]   |
| `pull-requests` | none/read/write | [why]   |

## Steps

**1. [Step Name]**:

```yaml
- uses: [action@version]
  with:
    param: value
```

[What it does]

**2. [Step Name]**:

```yaml
- run: [command]
```

[What it does]

## Concurrency

_If applicable:_

```yaml
concurrency:
  group: [pattern]
  cancel-in-progress: [true/false]
```

[Explanation]

## Runner

```yaml
runs-on: [runner-type]
```

[Why this runner]

## Usage

**Scenario 1**:

1. [step] → [step] → [expected outcome]

**Scenario 2**:

1. [step] → [expected outcome]

## Output

**Success**:

```
[example output]
```

**Failure**:

```
[example error]
```

## Next Steps

After success:

1. [outcome]
2. [next action]

## Debug

| Problem | Solution |
| ------- | -------- |
| [issue] | [fix]    |
| [issue] | [fix]    |

## Best Practices

- [practice 1]
- [practice 2]
- [practice 3]

## Links

- [Related Action](../actions/[action]/README.md)
- [Related Workflow](.github/workflows/[file].yml)
