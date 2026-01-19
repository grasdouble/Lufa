# Automated Linux Snapshot Updates via GitHub Actions

This guide explains how to use the `snapshot-update` label to automatically update Linux Playwright snapshots in a pull request.

## Overview

When you need to update Linux snapshots for Playwright component tests, you can trigger an automated workflow by adding the `snapshot-update` label to your PR. The workflow will:

1. ✅ Run Playwright tests with `--update-snapshots` on Linux
2. ✅ Compress the snapshots using oxipng (level 6)
3. ✅ Commit and push the updated snapshots to your PR branch
4. ✅ Comment on the PR with the results

## When to Use

Use the `snapshot-update` label when:

- You've updated component designs or styles
- You've changed design tokens (colors, spacing, typography)
- Tests are failing due to intentional visual changes
- You need to regenerate Linux snapshots without setting up Docker locally

## How to Use

### Step 1: Create a Pull Request

```bash
# Make your code changes
git checkout -b feature/update-button-styles
# ... make changes ...
git add .
git commit -m "feat: update button styles"
git push origin feature/update-button-styles
```

Create a PR on GitHub.

### Step 2: Add the `snapshot-update` Label

**Option 1: Via GitHub UI**

1. Go to your PR page
2. Click on "Labels" in the right sidebar
3. Add the `snapshot-update` label

**Option 2: Via GitHub CLI**

```bash
gh pr edit <PR-NUMBER> --add-label snapshot-update
```

### Step 3: Wait for Workflow to Complete

The workflow will automatically:

- Trigger when the label is added
- Take ~5-7 minutes to complete
- Post a comment on the PR when done
- **Automatically remove the `snapshot-update` label** when finished

### Step 4: Pull the Updated Snapshots

```bash
# Pull the automated commit
git pull origin feature/update-button-styles
```

### Step 5: Review and Merge

1. Review the snapshot changes in your PR
2. Ensure the visual changes are correct
3. Merge the PR

**Note:** The `snapshot-update` label is automatically removed after the workflow completes, so you don't need to remove it manually.

## Workflow Details

### What Happens

```yaml
Trigger: Label 'snapshot-update' added to PR
↓
1. Checkout PR branch
2. Install dependencies
3. Build design system packages
4. Run Playwright tests with --update-snapshots
5. Compress snapshots with oxipng
6. Commit changes (if any)
7. Push to PR branch
8. Comment on PR with results
9. Remove 'snapshot-update' label automatically
```

### Generated Commit

The workflow creates a commit with the message:

```
test: update Linux snapshots (automated)
```

### PR Comment

**If snapshots were updated:**

```
✅ Linux snapshots have been updated and compressed!

**Changes:**
- Updated Linux snapshots in `packages/design-system/playwright/__snapshots__/`
- Compressed snapshots using oxipng (level 6)

**Next steps:**
1. Pull the latest changes: `git pull`
2. Review the snapshot changes
3. Remove the `snapshot-update` label if satisfied
```

**If no changes:**

```
ℹ️ No snapshot changes detected.

The existing Linux snapshots are already up to date.
```

## Troubleshooting

### Workflow doesn't trigger

**Check:**

1. Is the label named exactly `snapshot-update`?
2. Is this a pull request (not a push to main)?
3. Check the "Actions" tab for errors

### Workflow fails

**Common causes:**

1. **Build errors**: Design system packages failed to build
   - Check the workflow logs
   - Ensure your code compiles locally

2. **Test errors**: Playwright tests failed
   - Tests might have actual failures (not just snapshot mismatches)
   - Check the workflow logs for test errors

3. **Permission errors**: Can't push to branch
   - Check if branch protection rules prevent bot commits
   - Ensure `GITHUB_TOKEN` has write permissions

4. **"Context access might be invalid" errors**
   - This was fixed by using step outputs (`$GITHUB_OUTPUT`) instead of environment variables
   - If you see this in workflow logs, ensure you're using the latest version of the workflow
   - Correct pattern:
     ```yaml
     - id: commit
       run: echo "updated=true" >> $GITHUB_OUTPUT
     - if: steps.commit.outputs.updated == 'true'
     ```

### Snapshots not compressed

If you see large snapshot files:

- The workflow includes automatic compression with oxipng
- Level 6 optimization provides maximum compression
- Compression happens before commit

## Comparison: Automated vs Manual

| Aspect          | Automated (GitHub Actions)                 | Manual (Docker Locally)    |
| --------------- | ------------------------------------------ | -------------------------- |
| **Setup**       | Just add a label                           | Install Docker, run script |
| **Time**        | ~5-7 minutes                               | ~4-6 minutes               |
| **Environment** | Clean Linux CI                             | Your local machine         |
| **Compression** | Automatic (level 6)                        | Manual command needed      |
| **Commit**      | Automatic                                  | Manual                     |
| **Best for**    | Quick updates, team members without Docker | Local development, testing |

## Advanced: Workflow Configuration

The workflow is defined in `.github/workflows/tools-test-playwright-ct.yml`.

### Key Configuration

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened, labeled] # Triggers on label add

jobs:
  update-linux-snapshots:
    if: github.event_name == 'pull_request' &&
      contains(github.event.pull_request.labels.*.name, 'snapshot-update')
```

**Step outputs for conditional comments:**

```yaml
- name: Commit and push snapshots
  id: commit # Important: gives this step an ID
  run: |
    if git diff --staged --quiet; then
      echo "updated=false" >> $GITHUB_OUTPUT  # Set output
    else
      git commit -m "..."
      echo "updated=true" >> $GITHUB_OUTPUT   # Set output
    fi

- name: Comment on PR - Success
  if: steps.commit.outputs.updated == 'true' # Use step output in condition
```

### Customization Options

**Change the label name:**

```yaml
if: contains(github.event.pull_request.labels.*.name, 'your-custom-label')
```

**Add more browsers:**

```yaml
- name: Update Linux snapshots
  run: pnpm test-ct --update-snapshots --project=chromium --project=firefox
```

**Change compression level:**

```yaml
# In compress-snapshots script
oxipng -o 3 ... # Faster, less compression
oxipng -o 6 ... # Slower, maximum compression (current)
```

## Security Considerations

### Permissions

The workflow requires:

- `contents: write` - To push snapshot updates
- `pull-requests: write` - To comment on PR

### Branch Protection

If you have branch protection rules:

- Allow GitHub Actions bot to bypass protections for automated commits
- Or use a personal access token with appropriate permissions

### Secrets

No secrets required - uses `GITHUB_TOKEN` automatically.

## Best Practices

### 1. Review Before Merging

Always review the generated snapshots:

```bash
git pull
git diff HEAD~1 packages/design-system/playwright/__snapshots__/
```

### 2. Use for Intentional Changes Only

The workflow updates snapshots without validating if changes are correct. Use it when:

- ✅ You intentionally changed component visuals
- ❌ Don't use to "fix" failing tests without understanding why

### 3. Combine with Local Testing

```bash
# Test locally first
pnpm ds:test

# If tests fail due to expected changes, use the label
gh pr edit <PR> --add-label snapshot-update
```

### 4. Remove Label After Use

Remove the `snapshot-update` label after snapshots are updated to prevent accidental re-runs:

```bash
gh pr edit <PR> --remove-label snapshot-update
```

## FAQ

**Q: Can I use this for macOS snapshots?**  
A: No, the workflow runs on Linux (ubuntu-latest). For macOS snapshots, update them locally and commit.

**Q: Will this work for Windows snapshots?**  
A: No, you'd need a separate workflow with `runs-on: windows-latest`.

**Q: Can I trigger this manually?**  
A: Yes, add the label at any time. You can also use `workflow_dispatch` trigger for manual runs.

**Q: What if I want to update multiple times?**  
A: Keep the label on and push new commits. The workflow re-runs on each push to a labeled PR.

**Q: How do I create the `snapshot-update` label?**  
A: Go to your repository → Issues → Labels → New label, name it `snapshot-update` (lowercase, hyphen).

**Q: Does this work for forks?**  
A: It depends on your repository settings. Forked PRs might have restricted permissions. Consider using Docker locally for forks.

**Q: Can I see what changed?**  
A: Yes, check the PR's "Files changed" tab after the workflow completes. Look for `.png` files in `__snapshots__/` directories.

## Related Documentation

- [Generating Linux Snapshots with Docker](../../packages/design-system/playwright/DOCKER-LINUX-SNAPSHOTS.md) - Local Docker approach
- [Snapshot Compression Scripts](../../packages/design-system/playwright/scripts/README.md) - Manual compression
- [Playwright Component Testing](../../packages/design-system/playwright/README.md) - Testing guide

## Workflow File

The full workflow definition: [.github/workflows/tools-test-playwright-ct.yml](./tools-test-playwright-ct.yml)
