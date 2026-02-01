/**
 * Live examples for Grid component documentation
 */

import React from 'react';

import { Box, Grid } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Grid columns={3}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Grid>
  );
}

export function GapDemo() {
  return (
    <Grid columns={2} gapX="spacious" gapY="tight">
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        gapX
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        gapY
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        tight row gap
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        spacious column gap
      </Box>
    </Grid>
  );
}

export function ColumnsDemo() {
  return (
    <Grid columns={4} gap="compact">
      {['1', '2', '3', '4'].map((label) => (
        <Box key={label} padding="compact" background="surface" borderWidth="thin" borderColor="default">
          {label}
        </Box>
      ))}
    </Grid>
  );
}

export function AlignDemo() {
  return (
    <Grid columns={3} gap="default" align="center" style={{ minHeight: '120px' }}>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        A
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        B
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        C
      </Box>
    </Grid>
  );
}

export function JustifyDemo() {
  return (
    <Grid columns={3} gap="default" justify="center" style={{ minHeight: '120px' }}>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        A
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        B
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        C
      </Box>
    </Grid>
  );
}
