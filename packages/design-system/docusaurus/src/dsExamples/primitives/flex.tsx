/**
 * Live examples for Flex component documentation
 */

import React from 'react';

import { Box, Flex } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Flex>
      <div>Left</div>
      <div>Right</div>
    </Flex>
  );
}

export function DirectionDemo() {
  return (
    <Flex direction="column" gap="default">
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Column item 1
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Column item 2
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Column item 3
      </Box>
    </Flex>
  );
}

export function WrapDemo() {
  return (
    <Flex gap="compact" wrap="wrap">
      {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((label) => (
        <Box
          key={label}
          padding="compact"
          background="surface"
          borderWidth="thin"
          borderColor="default"
          style={{ minWidth: '120px' }}
        >
          {label}
        </Box>
      ))}
    </Flex>
  );
}

export function AlignDemo() {
  return (
    <Flex direction="row" gap="default" align="center" style={{ minHeight: '80px' }}>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Short
      </Box>
      <Box
        padding="compact"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        style={{ paddingBottom: '24px' }}
      >
        Tall
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Short
      </Box>
    </Flex>
  );
}

export function JustifyDemo() {
  return (
    <Flex gap="default" justify="between" style={{ width: '100%' }}>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Start
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Middle
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        End
      </Box>
    </Flex>
  );
}

export function GapDemo() {
  return (
    <Flex gap="spacious">
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Item 1
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Item 2
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        Item 3
      </Box>
    </Flex>
  );
}
