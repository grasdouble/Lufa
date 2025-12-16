import React from "react";
import {
  Card,
  Stack,
  Typography,
  tokens,
} from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: color.background.secondary,
      color: color.text.primary,
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame>
    <Stack gap="condensed">
      <Typography variant="h2">Page Title</Typography>
      <Typography variant="body" color="secondary">
        Supporting text with secondary color.
      </Typography>
      <Typography variant="caption" color="tertiary">
        Caption text
      </Typography>
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
        }}
      >
        headings
      </div>
      <Stack gap="condensed">
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
      </Stack>
    </Frame>

    <Frame>
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
        }}
      >
        body / label / caption
      </div>
      <Stack gap="condensed">
        <Typography variant="bodyLarge">Body Large</Typography>
        <Typography variant="body">Body</Typography>
        <Typography variant="bodySmall" color="secondary">
          Body Small (secondary)
        </Typography>
        <Typography variant="label">Label</Typography>
        <Typography variant="caption" color="tertiary">
          Caption (tertiary)
        </Typography>
      </Stack>
    </Frame>
  </>
);

export const Examples = () => (
  <>
    <Frame>
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
        }}
      >
        overriding semantics (as)
      </div>
      <Stack gap="condensed">
        <Typography as="h1" variant="h3">
          Rendered as h1, styled as h3
        </Typography>
        <Typography as="label" variant="caption" color="secondary">
          Email
        </Typography>
      </Stack>
    </Frame>

    <Frame>
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
        }}
      >
        composition (Card)
      </div>
      <Card title="Account">
        <Stack gap="condensed">
          <Typography variant="body" color="secondary">
            Update your profile and notification preferences.
          </Typography>
          <Typography variant="bodySmall" color="tertiary">
            Last updated: yesterday
          </Typography>
        </Stack>
      </Card>
    </Frame>
  </>
);
