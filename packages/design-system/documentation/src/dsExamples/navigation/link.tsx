import React from 'react';

import { Link, Stack, tokens } from '@grasdouble/lufa_design-system';

const { color } = tokens;

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: '20px',
      backgroundColor: color.background.secondary,
      color: color.text.primary,
      borderRadius: '8px',
      marginBottom: '16px',
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: 'monospace',
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
    <Stack gap="condensed">
      <p>
        Visit our <Link href="/products">products page</Link> to see our latest offerings.
      </p>
      <p>
        Check out the{' '}
        <Link href="https://github.com" external>
          GitHub repository
        </Link>{' '}
        for more information.
      </p>
    </Stack>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
    <Stack gap="spacious">
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          default
        </div>
        <Link href="/page">Default link</Link>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          underline
        </div>
        <Link variant="underline" href="/page">
          Underlined link
        </Link>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'monospace',
            color: color.text.tertiary,
            marginBottom: 8,
          }}
        >
          button
        </div>
        <Link variant="button" href="/page">
          Button link
        </Link>
      </div>
    </Stack>
  </Frame>
);

export const Color = () => (
  <Frame title="color">
    <Stack gap="condensed">
      <Link color="primary" href="/page">
        Primary link
      </Link>
      <Link color="secondary" href="/page">
        Secondary link
      </Link>
      <Link color="success" href="/page">
        Success link
      </Link>
      <Link color="warning" href="/page">
        Warning link
      </Link>
      <Link color="danger" href="/page">
        Danger link
      </Link>
      <Link color="inherit" href="/page" style={{ color: '#e91e63' }}>
        Inherit color
      </Link>
    </Stack>
  </Frame>
);

export const Size = () => (
  <Frame title="size (button variant)">
    <Stack gap="condensed">
      <Link variant="button" size="small" href="/page">
        Small button
      </Link>
      <Link variant="button" size="medium" href="/page">
        Medium button
      </Link>
      <Link variant="button" size="large" href="/page">
        Large button
      </Link>
    </Stack>
  </Frame>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a.997.997 0 01.083.094 1 1 0 010 1.226.997.997 0 01-.083.094l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const Icons = () => (
  <Frame title="startIcon / endIcon">
    <Stack gap="condensed">
      <Link href="/page" startIcon={<span aria-hidden>←</span>}>
        Back
      </Link>
      <Link href="/page" endIcon={<ArrowRightIcon />}>
        Continue
      </Link>
      <Link variant="button" href="/page" endIcon={<ArrowRightIcon />}>
        Next
      </Link>
    </Stack>
  </Frame>
);

export const External = () => (
  <Frame title="external">
    <Stack gap="condensed">
      <Link href="https://example.com" external>
        External link (auto target/rel)
      </Link>
      <Link href="https://github.com" external variant="button">
        GitHub
      </Link>
    </Stack>
  </Frame>
);

export const InlineTextExample = () => (
  <Frame title="inline text">
    <p>
      Read the <Link href="/docs">documentation</Link> to get started, or{' '}
      <Link href="https://example.com" external>
        visit the website
      </Link>
      .
    </p>
  </Frame>
);

export const ButtonRowExample = () => (
  <Frame title="actions row">
    <Stack direction="horizontal" gap="condensed" wrap="wrap" align="center">
      <Link variant="button" href="/page">
        Primary
      </Link>
      <Link variant="button" color="secondary" href="/page">
        Secondary
      </Link>
      <Link variant="underline" href="/page">
        Cancel
      </Link>
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Variant />
    <Color />
    <Size />
    <Icons />
    <External />
  </>
);

export const Examples = () => (
  <>
    <InlineTextExample />
    <ButtonRowExample />
  </>
);
