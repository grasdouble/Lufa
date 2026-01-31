/**
 * Live examples for Flex component documentation
 */

import React from 'react';

import { Box, Flex } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Flex gap="default" justify="between" align="center">
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Left
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Right
      </Box>
    </Flex>
  );
}
