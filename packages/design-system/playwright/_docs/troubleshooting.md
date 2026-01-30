# Troubleshooting

**Snapshots failing after compression?**

- Compression is 100% lossless - if tests fail, it's not due to compression
- Check if the component itself changed
- Update snapshots: `pnpm test-ct:update-snapshots`

**oxipng not found?**

- Install it: `brew install oxipng`
- Or skip the hook for one commit: `git commit --no-verify`

**Pre-commit hook too slow?**

- Use manual compression first: `pnpm compress-snapshots`
- Then commit (pre-commit will see files are already optimized)
