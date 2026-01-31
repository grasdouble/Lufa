/**
 * Live examples for Grid component documentation
 */

import React from 'react';

import { Box, Grid } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Grid columns={3} gap="default">
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        1
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        2
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        3
      </Box>
    </Grid>
  );
}
