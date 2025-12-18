<!--
AI INSTRUCTIONS:

1. Replace all [placeholders] with actual content from action.yml
2. Remove sections that don't apply (e.g., Outputs if none, Exit Codes if not applicable)
3. Add action-specific sections as needed
4. Delete this instruction comment when done

FORMATTING:
- Use # for title, ## for main sections, ### for subsections
- Use code blocks with ```yaml for examples
- Use `` for inline code, filenames, input/output names
- Include real usage examples from actual workflows
-->

# [Action Name]

[Brief description of what the action does]

## Description

[Detailed description and key features as bullet points]

## Usage

**Basic**:

```yaml
- uses: ./.github/actions/[action-dir]
  with:
    input1: ${{ [value] }}
    input2: '[value]'
```

**With Optional Inputs**:

```yaml
- uses: ./.github/actions/[action-dir]
  id: [step-id]
  with:
    input1: ${{ [value] }}
    optional_input: '[value]'
```

## Inputs

| Input      | Required | Default | Description   |
| ---------- | -------- | ------- | ------------- |
| `input1`   | Yes      | -       | [description] |
| `input2`   | Yes      | -       | [description] |
| `optional` | No       | `""`    | [description] |

## Outputs

| Output    | Description   |
| --------- | ------------- |
| `output1` | [description] |
| `output2` | [description] |

_If no outputs: "This action produces no outputs."_

## Implementation

**Process**:

1. [step 1] - [what happens]
2. [step 2] - [what happens]
3. [step 3] - [what happens]

**Exit Codes** _(if applicable)_:

- 0: [success]
- 1: [failure]

## Permissions

_If no special permissions:_ "No special permissions required beyond default GITHUB_TOKEN."

_If special permissions needed:_

| Permission      | Level   | Purpose |
| --------------- | ------- | ------- |
| `contents`      | `read`  | [why]   |
| `pull-requests` | `write` | [why]   |

**Config**:

```yaml
permissions:
  contents: read
  pull-requests: write
```

## Error Handling

Fails if:

- [condition 1]
- [condition 2]

## Links

- [Related Action](../[action-dir]/README.md)
- [Workflow](.github/workflows/[file].yml)
