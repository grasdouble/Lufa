<!--
AI INSTRUCTIONS:

1. Replace all [placeholders] with actual content from action.yml
2. Remove sections that don't apply (e.g., Outputs if none, Exit Codes if not applicable)
3. Remove italic instructions (lines starting with `_`)
4. Add action-specific sections as needed
5. Delete this instruction comment when done

FORMATTING:
- Use # for title, ## for main sections, ### for subsections
- Use code blocks with ```yaml for examples
- Use `` for inline code, filenames, input/output names
- Use **bold** for emphasis in best practices and error handling
- Keep tables aligned for readability (inputs, outputs, permissions)
- Include real usage examples from actual workflows
-->

# [Action Name]

A composite GitHub Action that [brief description of what the action does].

## Description

This action [detailed description of the action's purpose and what it accomplishes].

Key features:

1. **[Feature 1]**: [Description]
2. **[Feature 2]**: [Description]
3. **[Feature 3]**: [Description]

## Usage

### Basic Usage

```yaml
- name: [Action name in workflow]
  uses: ./.github/actions/[action-directory-name]
  with:
    input1: ${{ [example value or context] }}
    input2: "example-value"
```

### Example with optional inputs

```yaml
- name: [Action name in workflow]
  id: [step-id]
  uses: ./.github/actions/[action-directory-name]
  with:
    input1: ${{ [example value] }}
    input2: "example-value"
    optional_input: "optional-value"
```

## Inputs

| Input            | Required | Default | Description                                  |
| ---------------- | -------- | ------- | -------------------------------------------- |
| `input1`         | Yes      | -       | [Description of required input]              |
| `input2`         | Yes      | -       | [Description of required input]              |
| `optional_input` | No       | `""`    | [Description of optional input with default] |

## Outputs

| Output    | Description                                |
| --------- | ------------------------------------------ |
| `output1` | [Description of what this output contains] |
| `output2` | [Description of what this output contains] |

_Note: If the action has no outputs, replace this section with: "This action does not produce any outputs."_

## Implementation Details

### [Process/Workflow Name]

Brief explanation of the main process or workflow steps:

1. **[Step 1]**: [Description of what happens]
2. **[Step 2]**: [Description of what happens]
3. **[Step 3]**: [Description of what happens]

### [Key Concept/Component]

Explain important implementation details, logic, or configuration:

- **[Detail 1]**: [Explanation]
- **[Detail 2]**: [Explanation]
- **[Detail 3]**: [Explanation]

### [Additional Section if Needed]

Add additional implementation details as necessary, such as:

- File formats
- Directory structures
- Validation rules
- Processing logic

### Exit Codes

_Only include this section if the action can fail with specific exit codes:_

- **0**: [Success condition]
- **1**: [Failure condition]

## Required Permissions

The workflow using this action must have the following GitHub token permissions:

_If no special permissions needed:_
This action does not require any special permissions beyond the default `GITHUB_TOKEN` access.

_If special permissions are required:_

| Permission      | Access Level | Purpose                                 |
| --------------- | ------------ | --------------------------------------- |
| `contents`      | `read`       | [Explain why this permission is needed] |
| `pull-requests` | `write`      | [Explain why this permission is needed] |
| `[other]`       | `[level]`    | [Explain why this permission is needed] |

**Example configuration:**

```yaml
permissions:
  contents: read
  pull-requests: write
  [other]: [level]
```

**Why these permissions are needed:**

- **[permission]: [level]** - [Detailed explanation of why this permission is required]
- **[permission]: [level]** - [Detailed explanation of why this permission is required]

## Error Handling

_Include this section if the action has specific error conditions:_

The action will fail if:

- [Error condition 1]
- [Error condition 2]
- [Error condition 3]

## [Additional Section]

_Add any action-specific sections as needed, such as:_

- Configuration formats
- Output examples
- Special considerations
- Integration points

## Best Practices

_Include this section if there are recommended usage patterns:_

1. **[Practice 1]**: [Explanation]
2. **[Practice 2]**: [Explanation]
3. **[Practice 3]**: [Explanation]

## Maintenance

To update [action name]:

1. **[Update type 1]**: [Instructions on how to modify this aspect]
2. **[Update type 2]**: [Instructions on how to modify this aspect]
3. **[Update type 3]**: [Instructions on how to modify this aspect]
4. Update this README with new [features/inputs/outputs/examples]
5. Test [specific scenarios] before deploying
