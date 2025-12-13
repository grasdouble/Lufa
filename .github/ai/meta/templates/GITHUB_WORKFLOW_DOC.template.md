<!--
AI INSTRUCTIONS:

1. Replace all [placeholders] with actual content
2. Remove sections that don't apply to your workflow
3. Add additional sections if needed for workflow-specific details
4. Keep the same section order for consistency across documentation
5. Delete this instruction comment when done

REQUIRED SECTIONS:
- Title and brief description
- Overview, Purpose, Trigger
- Input Parameters (even if "none")
- Permissions, Workflow Steps, Runner Configuration
- Usage, Expected Output
- Troubleshooting, Best Practices, Maintenance

OPTIONAL SECTIONS (include if applicable):
- Concurrency, What Happens Next
- When to Use [Feature], Related Actions, Version Control

FORMATTING:
- Use # for title, ## for main sections, ### for subsections
- Use code blocks with ```yaml for snippets
- Use `` for inline code, commands, file names, values
- Use **bold** for emphasis in best practices and troubleshooting
- Keep tables aligned for readability
- Include actual console output examples
-->

# [Workflow Name]

<!-- Brief one-sentence description of what this workflow does -->

[A brief description of the workflow's main purpose and functionality.]

## Overview

<!-- Detailed description of what the workflow does, when it runs, and its role in the project -->

[Detailed explanation of the workflow's purpose, context, and how it fits into the project's CI/CD pipeline.]

### Purpose

<!-- List the key objectives this workflow accomplishes -->

- [Objective 1]
- [Objective 2]
- [Objective 3]
- [Objective 4]

## Trigger

<!-- Describe when and how the workflow is triggered -->

This workflow runs on the following events:

```yaml
on:
  [trigger_type]:
    # Add specific trigger configuration
```

**When it runs:**

- [Condition 1]
- [Condition 2]
- [Condition 3]

<!-- If workflow_dispatch, describe how to trigger manually -->

## Input Parameters

<!-- If workflow has input parameters, document them in a table -->
<!-- If no inputs, state: "This workflow has no input parameters. It [automatically detects/operates on] [context]." -->

| Input        | Type     | Required | Default     | Options/Values | Description                   |
| ------------ | -------- | -------- | ----------- | -------------- | ----------------------------- |
| `input-name` | `choice` | Yes/No   | `"default"` | value1, value2 | [Description of what it does] |

## Permissions

<!-- Document all permissions required by the workflow -->
<!-- Use a table format showing permission, access level, and purpose -->

| Permission            | Access Level    | Purpose                                               |
| --------------------- | --------------- | ----------------------------------------------------- |
| `contents`            | none/read/write | [Why this permission is needed] [Explanation if none] |
| `packages`            | none/read/write | [Why this permission is needed] [Explanation if none] |
| `pull-requests`       | none/read/write | [Why this permission is needed] [Explanation if none] |
| `issues`              | none/read/write | [Why this permission is needed] [Explanation if none] |
| `actions`             | none/read/write | [Why this permission is needed] [Explanation if none] |
| `checks`              | none/read/write | [Why this permission is needed] [Explanation if none] |
| `deployments`         | none/read/write | [Why this permission is needed] [Explanation if none] |
| `repository-projects` | none/read/write | [Why this permission is needed] [Explanation if none] |
| `security-events`     | none/read/write | [Why this permission is needed] [Explanation if none] |
| `statuses`            | none/read/write | [Why this permission is needed] [Explanation if none] |

## Workflow Steps

<!-- Document each step in detail with YAML snippet and explanation -->

### 1. [Step Name]

```yaml
- name: [Step name from workflow]
  uses: [action@version] # or run: [command]
  with:
    parameter: value
```

[Explanation of what this step does and why it's needed]

<!-- Add bullet points if step performs multiple operations -->

- [Sub-operation 1]
- [Sub-operation 2]

### 2. [Step Name]

```yaml
- name: [Step name from workflow]
  run: |
    [command]
```

[Explanation of what this step does]

<!-- Continue for all steps in the workflow -->

## Concurrency

<!-- If workflow has concurrency configuration, document it -->
<!-- If no concurrency controls, omit this section -->

```yaml
concurrency:
  group: [group pattern]
  cancel-in-progress: [true/false]
```

- [Explanation of concurrency group]
- [Explanation of cancel-in-progress behavior]

## Runner Configuration

<!-- Document the runner configuration -->

```yaml
runs-on:
  group: [runner group]
  labels: [runner labels]
```

[Explanation of runner choice and resource requirements]

## Usage

<!-- Provide step-by-step instructions for using the workflow -->

### [Usage Scenario 1]

1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Expected outcome]

### [Usage Scenario 2]

<!-- If applicable, provide alternative usage scenarios -->

1. [Step 1]
2. [Step 2]
3. [Expected outcome]

<!-- If workflow includes commands to run locally, provide them -->

### [Related Commands/Tools]

```bash
# [Description]
[command to run]

# [Description]
[command to run]
```

## Expected Output

<!-- Document what users should expect to see after the workflow runs -->

### [Success Scenario 1]

[Description of successful outcome]

```
[Example console output or summary]
```

### [Success Scenario 2]

<!-- If applicable -->

```
[Example console output]
```

### [Failure Scenario]

```
[Example error output]
```

## What Happens Next

<!-- Optional section: Describe what happens after successful workflow execution -->

After successful execution:

1. [Outcome 1]
2. [Outcome 2]
3. [Outcome 3]
4. [Next steps for user]

## When to Use [Feature]

<!-- Optional section: If workflow has special features or bypass mechanisms, document when to use them -->

[Description of when to use specific features]

**Use for:**

- [Use case 1]
- [Use case 2]

**Do NOT use for:**

- [Anti-pattern 1]
- [Anti-pattern 2]

## Related Actions

<!-- List related workflows, actions, or documentation -->

- `[action-name]` - [Description and link]
- `.github/workflows/[workflow-file]` - [Description]

## Troubleshooting

<!-- Document common issues and their solutions -->

### [Problem Title]

**Problem**: [Description of the problem]

**Solution**:

- [Solution step 1]
- [Solution step 2]
- [Solution step 3]

### [Problem Title]

**Problem**: [Description of the problem]

**Solution**:

- [Solution step 1]
- [Solution step 2]

<!-- Add more troubleshooting sections as needed -->

## Best Practices

<!-- Provide recommendations for using the workflow effectively -->

1. **[Practice 1]** - [Explanation]
2. **[Practice 2]** - [Explanation]
3. **[Practice 3]** - [Explanation]
4. **[Practice 4]** - [Explanation]
5. **[Practice 5]** - [Explanation]

## Maintenance

<!-- Document maintenance-related information -->

- **Dependencies**:
  - `[action-name@version]` - [Description]
  - `[action-name@version]` - [Description]
- **[Configuration Item]**: [Details]
- **[Configuration Item]**: [Details]
- **Update Strategy**: [How to keep the workflow updated]
- **Testing**: [How to test changes to the workflow]

## Version Control

<!-- Optional section: Document version control specifics if relevant -->

- [Version control detail 1]
- [Version control detail 2]
- [Version control detail 3]
