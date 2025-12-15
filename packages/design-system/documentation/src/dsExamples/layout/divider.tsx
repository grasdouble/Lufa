import React from "react";
import { Divider, Placeholder, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color } = tokens;

export const LiveDemo = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "24px",
    }}
  >
    <Divider label="Section title" />
  </div>
);

export const Variants = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <Divider label="Solid" variant="solid" />
    <Divider label="Dashed" variant="dashed" />
    <Divider label="Start" align="start" />
    <Divider label="End" align="end" />
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
    <div style={{ width: "100%" }}>
      <Placeholder color={color.interactive.default}>Context</Placeholder>
      <Divider label="Between" spacing="sm" />
      <Placeholder color={color.interactive.default}>Context</Placeholder>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "16px", height: "160px" }}>
      <Placeholder color={color.interactive.default}>Left</Placeholder>
      <Divider orientation="vertical" variant="dashed" length="90%" />
      <Placeholder color={color.interactive.default}>Right</Placeholder>
    </div>

    <Stack direction="vertical" gap="normal" padding="none">
      <Divider label="Upcoming" />
      <Placeholder color={color.background.secondary}>Item A</Placeholder>
      <Placeholder color={color.background.secondary}>Item B</Placeholder>
    </Stack>
  </div>
);

