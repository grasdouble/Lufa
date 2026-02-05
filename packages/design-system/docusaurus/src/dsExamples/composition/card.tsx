import React from 'react';

import { Card, Text } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <Card>
      <div style={{ padding: '16px' }}>Card content</div>
    </Card>
  );
}

export function AsDemo() {
  return (
    <Card as="article">
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Text as="h3" variant="h4" weight="semibold">
          Article card
        </Text>
        <Text variant="body-small" color="secondary">
          Rendered as an article element.
        </Text>
      </div>
    </Card>
  );
}
