import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Lufa Design System",
  tagline:
    "A modern, accessible design system built with React and Tailwind CSS",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: {
      rspackBundler: true, // Use Rspack instead of Webpack for faster builds
    },
  },

  // Set the production url of your site here
  url: "https://lufa-ds.grasdouble.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "grasdouble", // Usually your GitHub org/user name.
  projectName: "Lufa", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/grasdouble/Lufa/tree/main/packages/apps/lufa-documentation/",
          sidebarCollapsible: true,
          sidebarCollapsed: false,
        },
        blog: false, // Disable blog for design system docs
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Lufa Design System",
      logo: {
        alt: "Lufa Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/grasdouble/Lufa",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/intro",
            },
            {
              label: "Installation",
              to: "/docs/getting-started/installation",
            },
            {
              label: "Components",
              to: "/docs/components/overview",
            },
          ],
        },
        {
          title: "Tokens",
          items: [
            {
              label: "Colors",
              to: "/docs/tokens/colors",
            },
            {
              label: "Typography",
              to: "/docs/tokens/typography",
            },
            {
              label: "Spacing",
              to: "/docs/tokens/spacing",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/grasdouble/Lufa",
            },
            {
              label: "Contributing",
              to: "/docs/guides/contributing",
            },
            {
              label: "Accessibility",
              to: "/docs/accessibility",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Grasdouble.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
