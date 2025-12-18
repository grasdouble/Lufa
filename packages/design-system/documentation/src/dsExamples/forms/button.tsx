import React from "react";
import { Button, Stack, tokens } from "@grasdouble/lufa_design-system";

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
      padding: "20px",
      backgroundColor: color.background.secondary,
      color: color.text.primary,
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

export const LiveDemo = () => (
  <Frame title="live demo">
    <Button variant="solid" color="primary">
      Click Me
    </Button>
  </Frame>
);

export const Variant = () => (
  <Frame title="variant">
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
  </Frame>
);

export const Color = () => (
  <Frame title="color">
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
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Stack>
  </Frame>
);

export const Icons = () => (
  <Frame title="startIcon / endIcon">
    <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
      <Button startIcon={<SearchIcon />}>Search</Button>
      <Button endIcon={<ArrowRightIcon />}>Continue</Button>
    </Stack>
  </Frame>
);

export const Loading = () => (
  <Frame title="loading">
    <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
      <Button variant="outlined" loading>
        Loading
      </Button>
    </Stack>
  </Frame>
);

export const Disabled = () => (
  <Frame title="disabled">
    <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
      <Button disabled>Disabled</Button>
      <Button variant="outlined" disabled>
        Disabled outlined
      </Button>
      <Button variant="text" disabled>
        Disabled text
      </Button>
    </Stack>
  </Frame>
);

export const FullWidth = () => (
  <Frame title="fullWidth">
    <div style={{ maxWidth: 420, width: "100%" }}>
      <Stack direction="vertical" gap="normal">
        <Button fullWidth variant="solid">
          Full width
        </Button>
        <Button fullWidth variant="outlined">
          Full width outlined
        </Button>
      </Stack>
    </div>
  </Frame>
);

export const FormSubmitExample = () => (
  <Frame title="form submit">
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log("Submitted");
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <Button type="submit" variant="solid" color="primary">
        Save
      </Button>
      <Button type="reset" variant="text" color="secondary">
        Reset
      </Button>
    </form>
  </Frame>
);

export const ButtonGroupExample = () => (
  <Frame title="actions row">
    <Stack direction="horizontal" gap="normal" wrap="wrap" align="center">
      <Button variant="solid">Primary</Button>
      <Button variant="outlined">Secondary</Button>
      <Button variant="text">Cancel</Button>
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Variant />
    <Color />
    <Size />
    <Icons />
    <Loading />
    <Disabled />
    <FullWidth />
  </>
);

export const Examples = () => (
  <>
    <FormSubmitExample />
    <ButtonGroupExample />
  </>
);
