import React from "react";
import { Placeholder, Space, SPACE_DIRECTION, SPACE_SIZE, Stack, tokens } from "@grasdouble/lufa_design-system";

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

const VisibleSpace = (props: React.ComponentProps<typeof Space>) => (
  <Space
    {...props}
    style={{
      backgroundColor: color.background.tertiary,
      borderRadius: 10,
      outline: `1px solid ${color.border.light}`,
      ...(props.style ?? {}),
    }}
  />
);

export const LiveDemo = () => (
  <Frame>
    <Placeholder color={color.interactive.default}>Before</Placeholder>
    <VisibleSpace size={SPACE_SIZE.lg} />
    <Placeholder color={color.interactive.default}>After</Placeholder>
    <div style={{ marginTop: 12, fontFamily: "monospace", color: color.text.tertiary, fontSize: 12 }}>
      size: {SPACE_SIZE.lg} → {spacing[SPACE_SIZE.lg]}
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        direction
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <div>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
            vertical
          </div>
          <Placeholder color={color.interactive.default}>Before</Placeholder>
          <VisibleSpace direction={SPACE_DIRECTION.vertical} size={SPACE_SIZE.md} />
          <Placeholder color={color.interactive.default}>After</Placeholder>
        </div>
        <div>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
            horizontal
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Placeholder color={color.interactive.default}>Left</Placeholder>
            <VisibleSpace direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.md} />
            <Placeholder color={color.interactive.default}>Right</Placeholder>
          </div>
        </div>
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        size (visible)
      </div>
      <Stack direction="vertical" gap="normal">
        {([SPACE_SIZE.xs, SPACE_SIZE.md, SPACE_SIZE.xl] as const).map((size) => (
          <div key={size}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              size: {size} → {spacing[size]}
            </div>
            <Placeholder color={color.interactive.default}>Before</Placeholder>
            <VisibleSpace size={size} />
            <Placeholder color={color.interactive.default}>After</Placeholder>
          </div>
        ))}

        <div>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
            custom: 40px
          </div>
          <Placeholder color={color.interactive.default}>Before</Placeholder>
          <VisibleSpace size={40} />
          <Placeholder color={color.interactive.default}>After</Placeholder>
        </div>
      </Stack>
    </Frame>
  </>
);

export const Examples = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        inline spacing inside text (as="span")
      </div>
      <div style={{ lineHeight: 1.9, color: color.text.primary }}>
        Pay now
        <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
        <span style={{ padding: "2px 10px", borderRadius: 999, background: color.background.secondary, outline: `1px solid ${color.border.light}` }}>
          badge
        </span>
        <Space as="span" direction={SPACE_DIRECTION.horizontal} size={SPACE_SIZE.sm} />
        or later
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        separating sections
      </div>
      <Placeholder color={color.background.secondary}>Section A</Placeholder>
      <VisibleSpace size={SPACE_SIZE.xl} />
      <Placeholder color={color.background.secondary}>Section B</Placeholder>
    </Frame>
  </>
);

