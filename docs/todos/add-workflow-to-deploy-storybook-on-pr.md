# Publishing Storybook on GitHub Pages for a PR with a Workflow

Follow these steps to create a GitHub Actions workflow that publishes a Storybook instance to GitHub Pages for each pull request without overwriting previous deployments:

## 1. Create a Workflow File
Create a new workflow file in your repository under `.github/workflows/publish-storybook.yml`.

```yaml
name: Publish Storybook on PR

on:
    pull_request:
        types: [labeled]

jobs:
    publish-storybook:
        if: contains(github.event.pull_request.labels.*.name, 'publish-storybook')
        runs-on: ubuntu-latest

        steps:
            # Step 1: Checkout the repository
            - name: Checkout repository
                uses: actions/checkout@v3

            # Step 2: Set up Node.js
            - name: Set up Node.js
                uses: actions/setup-node@v3
                with:
                    node-version: '16'

            # Step 3: Install dependencies
            - name: Install dependencies
                run: npm install

            # Step 4: Build Storybook
            - name: Build Storybook
                run: npm run build-storybook

            # Step 5: Deploy to GitHub Pages
            - name: Deploy to GitHub Pages
                uses: peaceiris/actions-gh-pages@v3
                with:
                    github_token: ${{ secrets.GITHUB_TOKEN }}
                    publish_dir: ./storybook-static
                    publish_branch: gh-pages
                    destination_dir: pr-${{ github.event.pull_request.number }}
                    cname: ''
```

## 2. Add the `publish-storybook` Label
Ensure that the label `publish-storybook` exists in your repository. You can create it in the "Labels" section of your repository settings.

## 3. Trigger the Workflow
When you add the `publish-storybook` label to a pull request, the workflow will automatically run, build the Storybook, and deploy it to a unique directory under the `gh-pages` branch.

## 4. Access the Deployed Storybook
The deployed Storybook for each pull request will be available at `https://<your-username>.github.io/<your-repo-name>/pr-<pr-number>/`.

## Notes
- Ensure that your repository is configured to serve GitHub Pages from the `gh-pages` branch.
- Customize the `cname` field if you are using a custom domain.
- Update the Node.js version and build commands as per your project requirements.
- Test the workflow to ensure it works as expected.
- Clean up old deployments periodically if needed to avoid clutter in the `gh-pages` branch.