import React from "react";
import { Grid, GRID_COLUMNS, GRID_GUTTER, Placeholder, Stack, tokens } from "@grasdouble/lufa_design-system";

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
    <Grid columns={GRID_COLUMNS.quad} gutter={GRID_GUTTER.sm}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Placeholder key={index} color={color.interactive.default}>
          {index + 1}
        </Placeholder>
      ))}
    </Grid>
  </Frame>
);

export const Variants = () => (
  <>
    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        columns
      </div>
      <Stack direction="vertical" gap="normal">
        {([GRID_COLUMNS.double, GRID_COLUMNS.quad, GRID_COLUMNS.six, GRID_COLUMNS.twelve] as const).map((columns) => (
          <div key={columns}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              columns: {columns}
            </div>
            <Grid columns={columns} gutter={GRID_GUTTER.sm}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Placeholder key={index} color={color.interactive.default}>
                  {index + 1}
                </Placeholder>
              ))}
            </Grid>
          </div>
        ))}
      </Stack>
    </Frame>

    <Frame>
      <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
        gutter
      </div>
      <Stack direction="vertical" gap="normal">
        {([GRID_GUTTER.none, GRID_GUTTER.sm, GRID_GUTTER.lg] as const).map((gutter) => (
          <div key={gutter}>
            <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 8 }}>
              gutter: {gutter}
            </div>
            <Grid columns={GRID_COLUMNS.quad} gutter={gutter}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Placeholder key={index} color={color.interactive.default}>
                  {index + 1}
                </Placeholder>
              ))}
            </Grid>
          </div>
        ))}
      </Stack>
    </Frame>
  </>
);

export const Examples = () => (
  <Frame>
    <div style={{ fontFamily: "monospace", color: color.text.tertiary, marginBottom: 12 }}>
      dashboard cards
    </div>
    <Grid columns={GRID_COLUMNS.triple} gutter={GRID_GUTTER.md}>
      {["Revenue", "Orders", "Conversion", "Users", "Retention", "Support"].map((label) => (
        <Placeholder key={label} color={color.background.secondary}>
          {label}
        </Placeholder>
      ))}
    </Grid>
  </Frame>
);

