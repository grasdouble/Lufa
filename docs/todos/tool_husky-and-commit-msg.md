# Checklist for Enforcing Commit Prefixes and PR Titles

## Enforcing Commit Prefixes

### Using Git Hooks

1. **Create a `commit-msg` hook file:**
   - Create a file named `commit-msg` in the `.git/hooks/` directory of your project.

2. **Add a validation script in the `commit-msg` file:**
   - Use the following script to validate commit prefixes:

     ```bash
     #!/bin/sh

     # List of allowed prefixes
     PREFIXES="fix|feat|chore|docs|style|refactor|perf|test|build|ci|revert"

     # Read the commit message
     commit_message=$(cat "$1")

     # Check if the commit message starts with one of the allowed prefixes
     if ! echo "$commit_message" | grep -qE "^($PREFIXES):"; then
       echo "Error: Invalid commit message."
       echo "Please use one of the following prefixes: fix, feat, chore, docs, style, refactor, perf, test, build, ci, revert"
       exit 1
     fi
     ```

3. **Make the script executable:**
   ```sh
   chmod +x .git/hooks/commit-msg
   ```

### Using Husky and Commitlint

1. **Install Husky:**

   ```sh
   pnpm install husky --save-dev
   ```

2. **Set up Husky in your project:**

   ```sh
   npx husky install
   ```

3. **Add a `commit-msg` hook with Husky:**

   ```sh
   npx husky add .husky/commit-msg 'pnpm exec commitlint --edit "$1"'
   ```

4. **Install Commitlint:**

   ```sh
   pnpm install @commitlint/{config-conventional,cli} --save-dev
   ```

5. **Create a Commitlint configuration file (`commitlint.config.js`):**
   ```javascript
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     rules: {
       'type-enum': [
         2,
         'always',
         ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
       ],
     },
   };
   ```

## Enforcing PR Title Prefixes

### Using Danger to Check PR Titles

1. **Install `danger`:**

   ```sh
   pnpm install danger --save-dev
   ```

2. **Create a `Dangerfile.js`:**

   ```javascript
   const { message, fail } = require('danger');

   // List of allowed prefixes
   const prefixes = ['fix', 'feat', 'chore', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'revert'];

   // Check the PR title
   const prTitle = danger.github.pr.title;
   const prefixPattern = new RegExp(`^(${prefixes.join('|')}):`);

   if (!prefixPattern.test(prTitle)) {
     fail(
       `The PR title must start with one of the following prefixes: ${prefixes.join(
         ', '
       )}. Example: "fix: fix an important bug".`
     );
   }
   ```

3. **Set up a GitHub Actions workflow to run `danger`:**

   ```yaml
   name: Danger

   on:
     pull_request:
       types: [opened, synchronize, reopened]

   permissions:
     contents: read
     pull-requests: write

   jobs:
     danger:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout repository
           uses: actions/checkout@v4

         - name: Setup Node.js
           uses: actions/setup-node@v6
           with:
             node-version-file: .tool-versions

         - name: Install pnpm
           run: npm install -g pnpm

         - name: Install dependencies
           run: pnpm install

         - name: Run Danger
           run: pnpm exec danger ci
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

### Using Commitlint with Husky to Check PR Titles

1. **Install Commitlint and dependencies:**

   ```sh
   pnpm install @commitlint/{config-conventional,cli} --save-dev
   ```

2. **Create a `commitlint.config.js` configuration file:**

   ```javascript
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     rules: {
       'type-enum': [
         2,
         'always',
         ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
       ],
     },
   };
   ```

3. **Set up Husky to run Commitlint:**

   ```sh
   npx husky add .husky/commit-msg 'pnpm exec commitlint --edit "$1"'
   ```

4. **Add a script to check PR titles:**

   ```javascript
   #!/bin/sh
   # Check the pull request title
   title=$(gh pr view "$1" --json title --jq .title)

   # List of allowed prefixes
   prefixes="build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test"

   if ! echo "$title" | grep -qE "^($prefixes):"; then
     echo "Error: Invalid pull request title."
     echo "Please use one of the following prefixes: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test"
     exit 1
   fi
   ```
