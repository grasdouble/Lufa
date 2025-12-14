import React from "react";
import {
  Flex,
  FLEX_ALIGN,
  FLEX_DIRECTION,
  FLEX_JUSTIFY,
  FLEX_WRAP,
  Placeholder,
  SPACE_SIZE,
  Stack,
  tokens,
} from "@grasdouble/lufa_design-system";

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

const Box = ({ label }: { label: string }) => (
  <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 10 }}>{label}</div>
    <div style={{ height: 120, borderRadius: 12, outline: `1px dashed ${color.border.light}`, padding: 12 }}>
      <Flex
        align={FLEX_ALIGN.center}
        justify={FLEX_JUSTIFY.between}
        wrap={FLEX_WRAP.wrap}
        gap={SPACE_SIZE.sm}
        style={{ height: "100%" }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Placeholder key={i} color={color.interactive.default} width="auto">
            Item {i + 1}
          </Placeholder>
        ))}
      </Flex>
    </div>
  </div>
);

export const LiveDemo = () => (
  <Frame>
    <Flex align={FLEX_ALIGN.center} justify={FLEX_JUSTIFY.between} wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.sm}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Placeholder key={i} color={color.interactive.default} width="auto">
          Item {i + 1}
        </Placeholder>
      ))}
    </Flex>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        direction
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>row</div>
          <Flex direction={FLEX_DIRECTION.row} gap={SPACE_SIZE.sm}>
            <Placeholder color={color.interactive.default} width="auto">
              A
            </Placeholder>
            <Placeholder color={color.interactive.default} width="auto">
              B
            </Placeholder>
            <Placeholder color={color.interactive.default} width="auto">
              C
            </Placeholder>
          </Flex>
        </div>
        <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>column</div>
          <Flex direction={FLEX_DIRECTION.column} gap={SPACE_SIZE.sm}>
            <Placeholder color={color.interactive.default} width="auto">
              A
            </Placeholder>
            <Placeholder color={color.interactive.default} width="auto">
              B
            </Placeholder>
            <Placeholder color={color.interactive.default} width="auto">
              C
            </Placeholder>
          </Flex>
        </div>
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        wrap / gap
      </div>
      <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
          wrap + gap: xl
        </div>
        <Flex wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.xl}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Placeholder key={i} color={color.background.secondary} width="auto">
              {i + 1}
            </Placeholder>
          ))}
        </Flex>
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        inline
      </div>
      <div style={{ lineHeight: 1.9, color: color.text.primary }}>
        Text before
        <Flex inline gap={SPACE_SIZE.xs} align={FLEX_ALIGN.center} style={{ marginInline: 8 }}>
          <span style={{ padding: "2px 10px", borderRadius: 999, background: color.background.secondary }}>A</span>
          <span style={{ padding: "2px 10px", borderRadius: 999, background: color.background.secondary }}>B</span>
        </Flex>
        text after
      </div>
    </Frame>
  </>
);

export const Examples = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        toolbar
      </div>
      <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
        <Flex align={FLEX_ALIGN.center} justify={FLEX_JUSTIFY.between} gap={SPACE_SIZE.md}>
          <Flex align={FLEX_ALIGN.center} gap={SPACE_SIZE.sm}>
            <Placeholder color={color.interactive.default} width="auto">
              Logo
            </Placeholder>
            <Placeholder color={color.background.secondary} width="auto">
              Search
            </Placeholder>
          </Flex>
          <Flex align={FLEX_ALIGN.center} gap={SPACE_SIZE.sm}>
            <Placeholder color={color.background.secondary} width="auto">
              Help
            </Placeholder>
            <Placeholder color={color.background.secondary} width="auto">
              Profile
            </Placeholder>
          </Flex>
        </Flex>
      </div>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        responsive card row (wrap)
      </div>
      <Flex wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.md}>
        {["Card A", "Card B", "Card C", "Card D", "Card E"].map((label) => (
          <div key={label} style={{ width: 220 }}>
            <Placeholder color={color.background.secondary} height="large">
              {label}
            </Placeholder>
          </div>
        ))}
      </Flex>
    </Frame>
  </>
);

