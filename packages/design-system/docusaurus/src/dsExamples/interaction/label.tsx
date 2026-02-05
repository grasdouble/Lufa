/**
 * Live examples for Label component documentation
 */

import React from 'react';

import { Input, Label } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label htmlFor="demo-label">Full Name</Label>
      <Input id="demo-label" placeholder="Enter full name" />
    </div>
  );
}

export function InlineLabelDemo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Label as="span">Email</Label>
      <Input id="demo-inline" placeholder="Enter email" />
    </div>
  );
}
