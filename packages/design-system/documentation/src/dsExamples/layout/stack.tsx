import React from "react";
import {
  Placeholder,
  Stack,
  STACK_ALIGN,
  STACK_DIRECTION,
  STACK_GAP,
  STACK_JUSTIFY,
  STACK_PADDING,
  STACK_WRAP,
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
    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
      <Placeholder color={color.interactive.default}>Item 1</Placeholder>
      <Placeholder color={color.interactive.default}>Item 2</Placeholder>
      <Placeholder color={color.interactive.default}>Item 3</Placeholder>
    </Stack>
  </Frame>
);

export const Direction = () => (
  <Frame title="direction">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
      <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>horizontal</div>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
          <Placeholder color={color.interactive.default}>A</Placeholder>
          <Placeholder color={color.interactive.default}>B</Placeholder>
          <Placeholder color={color.interactive.default}>C</Placeholder>
        </Stack>
      </div>
      <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
        <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>vertical</div>
        <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
          <Placeholder color={color.success.default}>A</Placeholder>
          <Placeholder color={color.success.default}>B</Placeholder>
          <Placeholder color={color.success.default}>C</Placeholder>
        </Stack>
      </div>
    </div>
  </Frame>
);

export const Gap = () => (
  <Frame title="gap">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
      {([
        { gap: STACK_GAP.condensed, label: "condensed" },
        { gap: STACK_GAP.normal, label: "normal" },
        { gap: STACK_GAP.spacious, label: "spacious" },
      ] as const).map(({ gap, label }) => (
        <div key={label} style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>gap: {label}</div>
          <Stack direction={STACK_DIRECTION.vertical} gap={gap}>
            <Placeholder color={color.background.secondary}>Item</Placeholder>
            <Placeholder color={color.background.secondary}>Item</Placeholder>
            <Placeholder color={color.background.secondary}>Item</Placeholder>
          </Stack>
        </div>
      ))}
    </div>
  </Frame>
);

export const Align = () => (
  <Frame title="align">
    <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
      <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
        <Placeholder color={color.background.secondary} height="small">
          A
        </Placeholder>
        <Placeholder color={color.interactive.default} height="large">
          B
        </Placeholder>
        <Placeholder color={color.background.secondary} height="medium">
          C
        </Placeholder>
      </Stack>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12, marginTop: 10 }}>
        align: center
      </div>
    </div>
  </Frame>
);

export const Justify = () => (
  <Frame title="justify">
    <Stack direction="vertical" gap="normal">
      {([
        { justify: STACK_JUSTIFY.start, label: "start" },
        { justify: STACK_JUSTIFY["space-between"], label: "space-between" },
        { justify: STACK_JUSTIFY["space-evenly"], label: "space-evenly" },
      ] as const).map(({ justify, label }) => (
        <div key={label} style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>justify: {label}</div>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed} align={STACK_ALIGN.center} justify={justify}>
            <Placeholder color={color.interactive.default}>Left</Placeholder>
            <Placeholder color={color.interactive.default}>Right</Placeholder>
          </Stack>
        </div>
      ))}
    </Stack>
  </Frame>
);

export const Wrap = () => (
  <Frame title="wrap">
    <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
      <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed} wrap={STACK_WRAP.wrap} align={STACK_ALIGN.start}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Placeholder key={index} color={color.brand.secondary}>
            {index + 1}
          </Placeholder>
        ))}
      </Stack>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12, marginTop: 10 }}>
        wrap: wrap
      </div>
    </div>
  </Frame>
);

export const Padding = () => (
  <Frame title="padding">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
      {([
        { padding: STACK_PADDING.none, label: "none" },
        { padding: STACK_PADDING.normal, label: "normal" },
        { padding: STACK_PADDING.spacious, label: "spacious" },
      ] as const).map(({ padding, label }) => (
        <div key={label} style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff" }}>
          <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.condensed} padding={padding}>
            <Placeholder color={color.background.secondary}>Item</Placeholder>
            <Placeholder color={color.background.secondary}>Item</Placeholder>
          </Stack>
          <div style={{ fontFamily: "monospace", color: color.text.tertiary, fontSize: 12, padding: 12, paddingTop: 0 }}>
            padding: {label}
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

export const ItemGrow = () => (
  <Frame title="Stack.Item grow">
    <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
      <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed} align={STACK_ALIGN.center}>
        <Placeholder color={color.background.secondary} width="auto">
          Left
        </Placeholder>
        <Stack.Item grow>
          <Placeholder color={color.interactive.default} width="full">
            Grows
          </Placeholder>
        </Stack.Item>
        <Placeholder color={color.background.secondary} width="auto">
          Right
        </Placeholder>
      </Stack>
    </div>
  </Frame>
);

export const Variants = () => (
  <>
    <Direction />
    <Gap />
    <Align />
    <Justify />
    <Wrap />
    <Padding />
    <ItemGrow />
  </>
);

export const ToolbarExample = () => (
  <Frame title="toolbar">
    <div style={{ borderRadius: 12, border: `1px solid ${color.border.light}`, background: "#fff", padding: 12 }}>
      <Stack direction={STACK_DIRECTION.horizontal} align={STACK_ALIGN.center} justify={STACK_JUSTIFY["space-between"]} gap={STACK_GAP.normal}>
        <Stack direction={STACK_DIRECTION.horizontal} align={STACK_ALIGN.center} gap={STACK_GAP.condensed}>
          <Placeholder color={color.interactive.default} width="auto">
            Logo
          </Placeholder>
          <Placeholder color={color.background.secondary} width="auto">
            Search
          </Placeholder>
        </Stack>
        <Stack direction={STACK_DIRECTION.horizontal} align={STACK_ALIGN.center} gap={STACK_GAP.condensed}>
          <Placeholder color={color.background.secondary} width="auto">
            Help
          </Placeholder>
          <Placeholder color={color.background.secondary} width="auto">
            Profile
          </Placeholder>
        </Stack>
      </Stack>
    </div>
  </Frame>
);

export const WrappingChipsExample = () => (
  <Frame title="wrapping chips">
    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed} wrap={STACK_WRAP.wrap} align={STACK_ALIGN.start}>
      {["Design", "Dev", "Marketing", "Ops", "Finance", "QA", "Support", "Security", "Legal", "Product"].map((label) => (
        <Placeholder key={label} color={color.background.secondary} width="auto">
          {label}
        </Placeholder>
      ))}
    </Stack>
  </Frame>
);

export const Examples = () => (
  <>
    <ToolbarExample />
    <WrappingChipsExample />
  </>
);
