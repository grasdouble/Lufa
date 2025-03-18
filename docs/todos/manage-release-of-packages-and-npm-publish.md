# How to Release and Publish a Package

Follow these steps to release and publish a package:

## 1. Prepare Your Package

- Ensure your code is complete and tested.
- Update the `README.md` file with relevant information.
- Verify the `package.json` file:
  - Update the `version` field (use [Semantic Versioning](https://semver.org/)).
  - Ensure the `name`, `description`, and `main` fields are accurate.
  - Add or update the `scripts` section for build and test commands.

## 2. Build the Package

- Run the build command (if applicable):
  ```bash
  npm run build
  ```
- Verify the output files in the `dist` or equivalent directory.

## 3. Test the Package

- Run tests to ensure everything works as expected:
  ```bash
  npm test
  ```
- Optionally, test the package locally:
  ```bash
  npm pack
  npm install ./<package-name>-<version>.tgz
  ```

## 4. Login to npm

- Authenticate with npm:
  ```bash
  npm login
  ```
- Provide your username, password, and email.

## 5. Publish the Package

- Publish the package to npm:
  ```bash
  npm publish
  ```
- For scoped packages, use:
  ```bash
  npm publish --access public
  ```

## 6. Verify the Release

- Check the package on the npm registry:
  ```bash
  npm info <package-name>
  ```
- Install the package in a new project to confirm it works:
  ```bash
  npm install <package-name>
  ```

## 7. Tag the Release in Git

- Create a Git tag for the release:
  ```bash
  git tag -a v<version> -m "Release version <version>"
  git push origin v<version>
  ```

## 8. Announce the Release

- Share the release notes or changelog with your audience.
- Optionally, create a GitHub release with detailed notes.
