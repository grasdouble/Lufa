import React from "react";
import { Center, Placeholder, Spinner, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Spinner />
      <div style={{ color: color.text.secondary }}>Loading…</div>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        size
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        {(["small", "medium", "large"] as const).map((size) => (
          <div key={size} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Spinner size={size} />
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>{size}</div>
          </div>
        ))}
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        mode
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        {(["A", "B"] as const).map((mode) => (
          <div key={mode} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Spinner mode={mode} />
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>mode: {mode}</div>
          </div>
        ))}
      </div>
    </Frame>
  </>
);

export const Examples = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        centered loading panel
      </div>
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
            <div style={{ color: color.text.secondary, fontSize: 12 }}>Fetching data…</div>
          </Stack>
        </Center>
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        inline next to text
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Spinner size="small" />
        <div style={{ color: color.text.secondary }}>Syncing</div>
        <Placeholder color={color.background.secondary} width="auto">
          background task
        </Placeholder>
      </div>
    </Frame>
  </>
);

