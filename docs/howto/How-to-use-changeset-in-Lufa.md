# How to Use Changeset in Lufa

A changeset is a way to manage and track changes in a project, especially when working with versioning and publishing tools. Below is a step-by-step guide on how to use changesets effectively:

## Manual steps

### Step 1: Create a Changeset

Whenever you make changes that need to be tracked, create a new changeset:

```bash
pnpm changeset
```

You will be prompted to select the packages you want to include in the changeset, specify the type of change (major, minor, or patch), and provide a summary of the changes.

### Step 2: Commit the Changeset

After creating a changeset, commit the changes to your version control system:

```bash
git add .
git commit -m "Add changeset for [description of changes]"
```

## CI steps

### Automate Release and Publish with `changeset-release.yml`

The `changeset-release.yml` workflow automates the process of releasing and publishing packages. Here's how it works:

1. **Triggering the Workflow**: The workflow need to be mannually triggered and will work only on `main` branch. It detects the presence of changesets and initiates the release process.

2. **Versioning and Changelog Generation**: The workflow uses the changesets to determine the new version numbers for the packages and generates changelogs automatically.

3. **Publishing Packages**: Once the versions are updated, the workflow publishes the packages to the github registry .

4. **Commit and Tag**: The workflow commits the version changes and tags the release in the repository.

By using this workflow, we can ensure a consistent and automated release process, reducing manual effort and potential errors.

For more details, refer to the `changeset-release.yml` file in your repository or the [Changesets GitHub Actions documentation](https://github.com/changesets/action).

## Additional Tips

- Regularly review and clean up unused changesets.
- Use changesets in combination with CI/CD pipelines for automated versioning and publishing.

For more details, refer to the [Changesets documentation](https://github.com/changesets/changesets).
