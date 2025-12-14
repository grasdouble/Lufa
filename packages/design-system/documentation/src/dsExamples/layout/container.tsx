import React from "react";
import { Container, Placeholder, Stack, tokens } from "@grasdouble/lufa_design-system";

const { color, spacing } = tokens;

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
    <Container
      size="md"
      paddingY="md"
      style={{
        border: `2px dashed ${color.border.light}`,
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <Stack direction="vertical" gap="normal">
        <Placeholder color={color.interactive.default}>Header</Placeholder>
        <Placeholder color={color.background.secondary}>Content</Placeholder>
      </Stack>
    </Container>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        size
      </div>
      <Stack direction="vertical" gap="normal">
        {(["xs", "sm", "md", "lg", "xl", "full", "fluid"] as const).map((size) => (
          <div key={size}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              size: {size}
            </div>
            <Container
              size={size}
              paddingY="sm"
              style={{
                border: `1px solid ${color.border.light}`,
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <Placeholder color={color.interactive.default}>Content</Placeholder>
            </Container>
          </div>
        ))}
      </Stack>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        align (with a constrained container)
      </div>
      <Stack direction="vertical" gap="normal">
        {(["start", "center", "end"] as const).map((align) => (
          <div key={align}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              align: {align}
            </div>
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: color.background.secondary,
                outline: `1px dashed ${color.border.light}`,
              }}
            >
              <Container
                size="sm"
                align={align}
                paddingY="sm"
                style={{
                  border: `1px solid ${color.border.light}`,
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <Placeholder color={color.interactive.default}>Aligned</Placeholder>
              </Container>
            </div>
          </div>
        ))}
      </Stack>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        paddingX / paddingY
      </div>
      <Stack direction="vertical" gap="normal">
        {([
          { paddingX: "none", paddingY: "none" },
          { paddingX: "base", paddingY: "none" },
          { paddingX: "base", paddingY: "lg" },
        ] as const).map(({ paddingX, paddingY }) => (
          <div key={`${paddingX}-${paddingY}`}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              paddingX: {paddingX} • paddingY: {paddingY}
            </div>
            <Container
              size="md"
              paddingX={paddingX}
              paddingY={paddingY}
              style={{
                border: `1px solid ${color.border.light}`,
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <div
                style={{
                  height: 48,
                  borderRadius: 10,
                  outline: `1px dashed ${color.border.light}`,
                  background: color.background.secondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: color.text.secondary,
                }}
              >
                inner content area
              </div>
            </Container>
          </div>
        ))}
      </Stack>
    </Frame>

    <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>
      Tokens: spacing.base → {spacing.base}
    </div>
  </>
);

export const Examples = () => (
  <Frame>
    <Stack direction="vertical" gap="normal">
      <Container as="main" size="lg" paddingY="lg">
        <Stack direction="vertical" gap="normal">
          <Placeholder color={color.interactive.default}>Main content</Placeholder>
          <Placeholder color={color.background.secondary}>Section</Placeholder>
          <Placeholder color={color.background.secondary}>Section</Placeholder>
        </Stack>
      </Container>
      <Container as="footer" size="lg" paddingY="sm">
        <Placeholder color={color.background.secondary}>Footer</Placeholder>
      </Container>
    </Stack>
  </Frame>
);

