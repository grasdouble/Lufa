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

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
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
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <Flex align={FLEX_ALIGN.center} justify={FLEX_JUSTIFY.between} wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.sm}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Placeholder key={i} color={color.interactive.default} width="auto">
          Item {i + 1}
        </Placeholder>
      ))}
    </Flex>
  </Frame>
);

export const Direction = () => (
  <Frame title="direction">
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
);

export const Align = () => (
  <Frame title="align">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
      {([
        { align: FLEX_ALIGN.start, label: "start" },
        { align: FLEX_ALIGN.center, label: "center" },
        { align: FLEX_ALIGN.end, label: "end" },
      ] as const).map(({ align, label }) => (
        <div key={label} style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>align: {label}</div>
          <div style={{ height: 120, borderRadius: 12, outline: `1px dashed ${color.border.light}`, padding: 12 }}>
            <Flex align={align} gap={SPACE_SIZE.sm} style={{ height: "100%" }}>
              <Placeholder color={color.background.secondary} width="auto" height="large">
                A
              </Placeholder>
              <Placeholder color={color.interactive.default} width="auto" height="medium">
                B
              </Placeholder>
              <Placeholder color={color.background.secondary} width="auto" height="small">
                C
              </Placeholder>
            </Flex>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const Justify = () => (
  <Frame title="justify">
    <Stack direction="vertical" gap="normal">
      {([
        { justify: FLEX_JUSTIFY.start, label: "start" },
        { justify: FLEX_JUSTIFY.between, label: "between" },
        { justify: FLEX_JUSTIFY.evenly, label: "evenly" },
      ] as const).map(({ justify, label }) => (
        <div key={label} style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>justify: {label}</div>
          <Flex justify={justify} gap={SPACE_SIZE.sm}>
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
      ))}
    </Stack>
  </Frame>
);

export const Wrap = () => (
  <Frame title="wrap">
    <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>wrap</div>
      <Flex wrap={FLEX_WRAP.wrap} gap={SPACE_SIZE.sm}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Placeholder key={i} color={color.background.secondary} width="auto">
            {i + 1}
          </Placeholder>
        ))}
      </Flex>
    </div>
  </Frame>
);

export const Gap = () => (
  <Frame title="gap">
    <Stack direction="vertical" gap="normal">
      <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>gap: md (token)</div>
        <Flex gap={SPACE_SIZE.md}>
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
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>gap: 24 (number)</div>
        <Flex gap={24}>
          <Placeholder color={color.background.secondary} width="auto">
            A
          </Placeholder>
          <Placeholder color={color.background.secondary} width="auto">
            B
          </Placeholder>
          <Placeholder color={color.background.secondary} width="auto">
            C
          </Placeholder>
        </Flex>
      </div>
      <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>gap: &quot;2rem&quot; (CSS length)</div>
        <Flex gap="2rem">
          <Placeholder color={color.background.secondary} width="auto">
            A
          </Placeholder>
          <Placeholder color={color.background.secondary} width="auto">
            B
          </Placeholder>
          <Placeholder color={color.background.secondary} width="auto">
            C
          </Placeholder>
        </Flex>
      </div>
    </Stack>
  </Frame>
);

export const Inline = () => (
  <Frame title="inline">
    <div style={{ lineHeight: 1.9, color: color.text.primary }}>
      Text before
      <Flex inline gap={SPACE_SIZE.xs} align={FLEX_ALIGN.center} style={{ marginInline: 8 }}>
        <span style={{ padding: "2px 10px", borderRadius: 999, background: color.background.secondary }}>A</span>
        <span style={{ padding: "2px 10px", borderRadius: 999, background: color.background.secondary }}>B</span>
      </Flex>
      text after
    </div>
  </Frame>
);

export const As = () => (
  <Frame title="as">
    <Stack direction="vertical" gap="normal">
      {([
        { as: "div", label: 'as="div"' },
        { as: "nav", label: 'as="nav"' },
        { as: "header", label: 'as="header"' },
        { as: "footer", label: 'as="footer"' },
      ] as const).map(({ as, label }) => (
        <Flex
          key={as}
          as={as}
          align={FLEX_ALIGN.center}
          justify={FLEX_JUSTIFY.between}
          gap={SPACE_SIZE.sm}
          style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 12, color: color.text.secondary }}>{label}</span>
          <Placeholder color={color.background.secondary} width="auto">
            content
          </Placeholder>
        </Flex>
      ))}
    </Stack>
  </Frame>
);

export const Variants = () => (
  <>
    <Direction />
    <Align />
    <Justify />
    <Wrap />
    <Gap />
    <Inline />
    <As />
  </>
);

export const ToolbarExample = () => (
  <Frame title="toolbar">
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
);

export const ResponsiveCardRowExample = () => (
  <Frame title="responsive card row (wrap)">
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
);

export const Examples = () => (
  <>
    <ToolbarExample />
    <ResponsiveCardRowExample />
  </>
);
