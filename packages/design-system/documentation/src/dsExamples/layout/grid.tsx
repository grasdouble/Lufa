import React from 'react';

import { Grid, GRID_COLUMNS, GRID_GUTTER, Placeholder, Stack } from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const Frame = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div
    style={{
      padding: tokens.spacing['md-lg'],
      backgroundColor: tokens.color.background.secondary,
      color: tokens.color.text.primary,
      borderRadius: tokens.radius.base,
      marginBottom: tokens.spacing.base,
    }}
  >
    {title ? (
      <div
        style={{
          fontFamily: tokens.fontFamily.mono,
          color: tokens.color.text.tertiary,
          marginBottom: tokens.spacing.md,
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
        <Placeholder key={index} color={tokens.color.interactive.default}>
          {index + 1}
        </Placeholder>
      ))}
    </Grid>
  </Frame>
);

export const Columns = () => (
  <Frame title="columns">
    <Stack direction="vertical" gap="normal">
      {([GRID_COLUMNS.double, GRID_COLUMNS.quad, GRID_COLUMNS.six, GRID_COLUMNS.twelve] as const).map((columns) => (
        <div key={columns}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            columns: {columns}
          </div>
          <Grid columns={columns} gutter={GRID_GUTTER.sm}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Placeholder key={index} color={tokens.color.interactive.default}>
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
      {([GRID_GUTTER.none, GRID_GUTTER.sm, GRID_GUTTER.lg, GRID_GUTTER.xl] as const).map((gutter) => (
        <div key={gutter}>
          <div
            style={{
              fontFamily: tokens.fontFamily.mono,
              color: tokens.color.text.tertiary,
              marginBottom: tokens.spacing.sm,
            }}
          >
            gutter: {gutter}
          </div>
          <Grid columns={GRID_COLUMNS.quad} gutter={gutter}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Placeholder key={index} color={tokens.color.interactive.default}>
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
      {['Revenue', 'Orders', 'Conversion', 'Users', 'Retention', 'Support'].map((label) => (
        <Placeholder key={label} color={tokens.color.background.secondary}>
          {label}
        </Placeholder>
      ))}
    </Grid>
  </Frame>
);

export const ImageGalleryExample = () => (
  <Frame title="image gallery (responsive-ish)">
    <Grid columns={GRID_COLUMNS.quad} gutter={GRID_GUTTER.sm}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Placeholder key={index} color={tokens.color.background.secondary} height="large">
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
