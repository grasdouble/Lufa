import React from "react";
import {
  Anchor,
  Container,
  Stack,
  tokens,
} from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      color: color.text.primary,
      padding: "20px",
      backgroundColor: color.background.secondary,
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <section id="introduction">
          <h2>Introduction</h2>
          <p>
            Welcome to our documentation. Use the navigation links to jump to
            different sections.
          </p>
        </section>
        <section id="features">
          <h2>Features</h2>
          <p>
            This component provides convenient in-page navigation via anchor
            links.
          </p>
        </section>
        <section id="usage">
          <h2>Usage Guide</h2>
          <p>Learn how to implement anchors in your application.</p>
        </section>
      </div>
      <nav
        style={{
          position: "sticky",
          top: "20px",
          marginTop: "20px",
          padding: "16px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Stack gap="condensed">
          <Anchor href="#introduction">Jump to Introduction</Anchor>
          <Anchor href="#features">Jump to Features</Anchor>
          <Anchor href="#usage">Jump to Usage Guide</Anchor>
        </Stack>
      </nav>
    </Container>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <Stack gap="spacious">
      <div>
        <h3>Default</h3>
        <Anchor href="#default">Default anchor link</Anchor>
      </div>
      <div>
        <h3>Underline</h3>
        <Anchor variant="underline" href="#underline">
          Underlined anchor link
        </Anchor>
      </div>
      <div>
        <h3>Subtle</h3>
        <Anchor variant="subtle" href="#subtle">
          Subtle anchor link
        </Anchor>
      </div>
    </Stack>
  </Frame>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a.997.997 0 01.083.094 1 1 0 010 1.226.997.997 0 01-.083.094l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const Color = () => (
  <Frame title="color">
    <Stack gap="condensed">
      <Anchor color="primary" href="#primary">
        Primary color
      </Anchor>
      <Anchor color="secondary" href="#secondary">
        Secondary color
      </Anchor>
      <Anchor color="inherit" href="#inherit" style={{ color: "#e91e63" }}>
        Inherit color
      </Anchor>
    </Stack>
  </Frame>
);

export const Icons = () => (
  <Frame title="startIcon / endIcon">
    <Stack gap="condensed">
      <Anchor startIcon={<SearchIcon />} href="#search">
        Search
      </Anchor>
      <Anchor endIcon={<ArrowRightIcon />} href="#continue">
        Continue
      </Anchor>
      <Anchor
        startIcon={<SearchIcon />}
        endIcon={<ArrowRightIcon />}
        href="#both"
      >
        Both icons
      </Anchor>
    </Stack>
  </Frame>
);

export const StickyInPageNavExample = () => (
  <Frame title="sticky in-page nav">
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <section id="intro">
              <h3 style={{ margin: 0 }}>Intro</h3>
              <p style={{ margin: 0, color: color.text.secondary }}>
                Scroll within this area (demo).
              </p>
            </section>
            <section id="details">
              <h3 style={{ margin: 0 }}>Details</h3>
              <p style={{ margin: 0, color: color.text.secondary }}>
                Anchor links jump to sections.
              </p>
            </section>
            <section id="more">
              <h3 style={{ margin: 0 }}>More</h3>
              <p style={{ margin: 0, color: color.text.secondary }}>
                Use a sticky nav for long pages.
              </p>
            </section>
          </div>
          <nav
            style={{
              position: "sticky",
              top: 20,
              alignSelf: "start",
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 12,
              border: `1px solid ${color.border.light}`,
            }}
          >
            <Stack gap="condensed">
              <Anchor href="#intro">Jump to Intro</Anchor>
              <Anchor href="#details">Jump to Details</Anchor>
              <Anchor href="#more">Jump to More</Anchor>
            </Stack>
          </nav>
        </div>
      </div>
    </Container>
  </Frame>
);

export const ExternalLinkExample = () => (
  <Frame title="external link">
    <Stack gap="condensed">
      <Anchor href="https://example.com" target="_blank" rel="noreferrer">
        Open example.com
      </Anchor>
      <div style={{ color: color.text.tertiary, fontSize: 12 }}>
        Use <code>target</code>/<code>rel</code> for external links.
      </div>
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Variant />
    <Color />
    <Icons />
  </>
);

export const Examples = () => (
  <>
    <StickyInPageNavExample />
    <ExternalLinkExample />
  </>
);
