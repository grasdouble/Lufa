import React from "react";
import { Button, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color } = tokens;

const SearchIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
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

export const LiveDemo = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "24px",
    }}
  >
    <Button variant="solid" color="primary">
      Click Me
    </Button>
  </div>
);

export const Variants = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <Stack direction="horizontal" gap="normal" wrap="wrap">
      <Button variant="solid" color="primary">
        Solid
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="text" color="primary">
        Text
      </Button>
      <Button variant="ghost" color="primary">
        Ghost
      </Button>
      <Button variant="link" color="primary">
        Link
      </Button>
    </Stack>

    <Stack direction="horizontal" gap="normal" wrap="wrap">
      <Button variant="solid" color="primary">
        Primary
      </Button>
      <Button variant="solid" color="secondary">
        Secondary
      </Button>
      <Button variant="solid" color="success">
        Success
      </Button>
      <Button variant="solid" color="warning">
        Warning
      </Button>
      <Button variant="solid" color="danger">
        Danger
      </Button>
    </Stack>

    <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Stack>
  </div>
);

export const Examples = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
      <Button startIcon={<SearchIcon />}>Search</Button>
      <Button endIcon={<ArrowRightIcon />}>Continue</Button>
      <Button variant="outlined" loading>
        Loading
      </Button>
      <Button disabled>Disabled</Button>
    </Stack>

    <div style={{ maxWidth: 420, width: "100%" }}>
      <div style={{ fontFamily: "monospace", color: color.text.secondary, marginBottom: 8 }}>
        fullWidth
      </div>
      <Stack direction="vertical" gap="normal">
        <Button fullWidth variant="solid">
          Full width
        </Button>
        <Button fullWidth variant="outlined">
          Full width outlined
        </Button>
      </Stack>
    </div>
  </div>
);

