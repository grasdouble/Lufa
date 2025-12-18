import React from "react";
import {
  Center,
  Placeholder,
  Spinner,
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

export const LiveDemo = () => (
  <Frame title="live demo">
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Spinner />
      <div style={{ color: color.text.secondary }}>Loading…</div>
    </div>
  </Frame>
);

export const Size = () => (
  <Frame title="size">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      {(["small", "medium", "large"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Spinner size={size} />
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              fontSize: 12,
            }}
          >
            {size}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const Mode = () => (
  <Frame title="mode">
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      {(["A", "B"] as const).map((mode) => (
        <div
          key={mode}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Spinner mode={mode} />
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              fontSize: 12,
            }}
          >
            mode: {mode}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const CenteredLoadingPanelExample = () => (
  <Frame title="centered loading panel">
    <div
      style={{
        borderRadius: 12,
        border: `1px solid ${color.border.light}`,
        background: "#fff",
        minHeight: 180,
        padding: 12,
      }}
    >
      <Center axis="both" minHeight={160}>
        <Stack direction="vertical" gap="normal" align="center">
          <Spinner size="large" />
          <div style={{ color: color.text.secondary, fontSize: 12 }}>
            Fetching data…
          </div>
        </Stack>
      </Center>
    </div>
  </Frame>
);

export const InlineLoadingExample = () => (
  <Frame title="inline next to text">
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Spinner size="small" />
      <div style={{ color: color.text.secondary }}>Syncing</div>
      <Placeholder color={color.background.secondary} width="auto">
        background task
      </Placeholder>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Size />
    <Mode />
  </>
);

export const Examples = () => (
  <>
    <CenteredLoadingPanelExample />
    <InlineLoadingExample />
  </>
);
