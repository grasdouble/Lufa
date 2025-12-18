import React from "react";
import {
  Grid,
  GRID_COLUMNS,
  GRID_GUTTER,
  Placeholder,
  Stack,
  tokens,
} from "@grasdouble/lufa_design-system";

const { color } = tokens;

const Frame = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
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
      <div
        style={{
          fontFamily: "monospace",
          color: color.text.tertiary,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
    ) : null}
    {children}
  </div>
);

export const LiveDemo = () => (
  <Frame title="live demo">
    <Grid columns={GRID_COLUMNS.quad} gutter={GRID_GUTTER.sm}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Placeholder key={index} color={color.interactive.default}>
          {index + 1}
        </Placeholder>
      ))}
    </Grid>
  </Frame>
);

export const Columns = () => (
  <Frame title="columns">
    <Stack direction="vertical" gap="normal">
      {(
        [
          GRID_COLUMNS.double,
          GRID_COLUMNS.quad,
          GRID_COLUMNS.six,
          GRID_COLUMNS.twelve,
        ] as const
      ).map((columns) => (
        <div key={columns}>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
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
);

export const Gutter = () => (
  <Frame title="gutter">
    <Stack direction="vertical" gap="normal">
      {(
        [
          GRID_GUTTER.none,
          GRID_GUTTER.sm,
          GRID_GUTTER.lg,
          GRID_GUTTER.xl,
        ] as const
      ).map((gutter) => (
        <div key={gutter}>
          <div
            style={{
              fontFamily: "monospace",
              color: color.text.tertiary,
              marginBottom: 8,
            }}
          >
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
);

export const Variants = () => (
  <>
    <Columns />
    <Gutter />
  </>
);

export const DashboardCardsExample = () => (
  <Frame title="dashboard cards">
    <Grid columns={GRID_COLUMNS.triple} gutter={GRID_GUTTER.md}>
      {["Revenue", "Orders", "Conversion", "Users", "Retention", "Support"].map(
        (label) => (
          <Placeholder key={label} color={color.background.secondary}>
            {label}
          </Placeholder>
        ),
      )}
    </Grid>
  </Frame>
);

export const ImageGalleryExample = () => (
  <Frame title="image gallery (responsive-ish)">
    <Grid columns={GRID_COLUMNS.quad} gutter={GRID_GUTTER.sm}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Placeholder
          key={index}
          color={color.background.secondary}
          height="large"
        >
          Item {index + 1}
        </Placeholder>
      ))}
    </Grid>
  </Frame>
);

export const Examples = () => (
  <>
    <DashboardCardsExample />
    <ImageGalleryExample />
  </>
);
