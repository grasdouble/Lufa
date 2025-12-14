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

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: 12,
      border: `1px solid ${color.border.light}`,
      background: "#fff",
      minHeight: 160,
      padding: 12,
      position: "relative",
    }}
  >
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: color.border.light }} />
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: color.border.light }} />
    </div>
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame>
    <Center axis="both" minHeight={200} style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff" }}>
      <Spinner />
    </Center>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        axis
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        {([
          { axis: "horizontal", label: "horizontal" },
          { axis: "vertical", label: "vertical" },
          { axis: "both", label: "both" },
        ] as const).map(({ axis, label }) => (
          <div key={axis}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              axis: {label}
            </div>
            <Panel>
              <Center axis={axis} minHeight={160}>
                <Placeholder color={color.interactive.default} width="auto">
                  Content
                </Placeholder>
              </Center>
            </Panel>
          </div>
        ))}
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        inline (inside text flow)
      </div>
      <div style={{ lineHeight: 1.9, color: color.text.primary }}>
        Text before
        <Center as="span" inline axis="vertical" style={{ marginInline: 8, padding: "2px 10px", borderRadius: 999, background: color.background.secondary }}>
          <span style={{ fontFamily: "monospace", fontSize: 12 }}>badge</span>
        </Center>
        text after (same line)
      </div>
    </Frame>
  </>
);

export const Examples = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      loading panel
    </div>
    <Panel>
      <Center axis="both" minHeight={200}>
        <Stack direction="vertical" gap="normal" align="center">
          <Spinner />
          <div style={{ color: color.text.secondary, fontSize: 12 }}>Loading…</div>
        </Stack>
      </Center>
    </Panel>
  </Frame>
);

