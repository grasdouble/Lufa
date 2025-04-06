## [2025-03-18]

- Microfrontend added with a first application (home) who display Lufa logo and link to linkedin, github and the storybook
- Add changeset and a workflow to force the usage of it in PR
- Init a new application to display markdown doc and/or todo

## [2025-03-19]

- Add changeset to manage changelogs and releases

## [2025-03-20]

- Improve shared config packages (especially eslint and tsconfig)
- Update publish config for all package except those inside poc folder

## [2025-03-21]

- Try to fix issue in DS and storybook since the upgrade to v4

## [2025-03-23]

- Add dark mode switcher in storybook
- Clean code (no more tailwind.config.mjs, all is managed directly in css now. https://v3.tailwindcss.com/docs/v4-beta#css-first-configuration)

## [2025-03-24]

- Add a workflow to publish a storybook from a PR in github pages using a tag ('publish-storybook')

## [2025-03-25]

- Add Stack.Item component in DS and story in storybook

## [2025-03-27]

- add workflow to publish storybook in production
- start spinner component

## [2025-03-28]

- add workflow to run lint in all PR
- move vite plugins created during poc about singleSpa to a new package folder and release them
- archive poc about SingleSPA

## [2025-06-06]

- create a script to generate cdn content based on a list of packages
- add import-map-override usable (https://github.com/single-spa/import-map-overrides/blob/main/docs/configuration.md#client-side-single-map)
