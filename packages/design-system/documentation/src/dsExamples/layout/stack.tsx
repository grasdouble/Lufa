import React from "react";
import {
  Placeholder,
  Stack,
  STACK_ALIGN,
  STACK_DIRECTION,
  STACK_GAP,
  STACK_JUSTIFY,
  STACK_WRAP,
  tokens,
} from "@grasdouble/lufa_design-system";

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
    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
      <Placeholder color={color.interactive.default}>Item 1</Placeholder>
      <Placeholder color={color.interactive.default}>Item 2</Placeholder>
      <Placeholder color={color.interactive.default}>Item 3</Placeholder>
    </Stack>
  </div>
);

export const Variants = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <div>
      <div style={{ fontFamily: "monospace", marginBottom: "8px" }}>
        direction: horizontal
      </div>
      <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
        <Placeholder color={color.interactive.default}>A</Placeholder>
        <Placeholder color={color.interactive.default}>B</Placeholder>
        <Placeholder color={color.interactive.default}>C</Placeholder>
      </Stack>
    </div>

    <div>
      <div style={{ fontFamily: "monospace", marginBottom: "8px" }}>
        direction: vertical
      </div>
      <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
        <Placeholder color={color.success.default}>A</Placeholder>
        <Placeholder color={color.success.default}>B</Placeholder>
        <Placeholder color={color.success.default}>C</Placeholder>
      </Stack>
    </div>
  </div>
);

export const Examples = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "16px",
    }}
  >
    <div>
      <div style={{ fontFamily: "monospace", marginBottom: "8px" }}>
        justify: space-between
      </div>
      <Stack
        direction={STACK_DIRECTION.horizontal}
        gap={STACK_GAP.condensed}
        align={STACK_ALIGN.center}
        justify={STACK_JUSTIFY["space-between"]}
        wrap={STACK_WRAP.nowrap}
      >
        <Placeholder color={color.interactive.default}>Left</Placeholder>
        <Placeholder color={color.interactive.default}>Right</Placeholder>
      </Stack>
    </div>

    <div>
      <div style={{ fontFamily: "monospace", marginBottom: "8px" }}>
        wrap: wrap
      </div>
      <Stack
        direction={STACK_DIRECTION.horizontal}
        gap={STACK_GAP.condensed}
        wrap={STACK_WRAP.wrap}
        align={STACK_ALIGN.start}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Placeholder key={index} color={color.brand.secondary}>
            {index + 1}
          </Placeholder>
        ))}
      </Stack>
    </div>
  </div>
);
