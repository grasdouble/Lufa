/**
 * Live examples for Input component documentation
 */

import React from 'react';

import { Input, Label } from '@grasdouble/lufa_design-system';

export function LiveDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <Label htmlFor="demo-username">Username</Label>
        <Input id="demo-username" placeholder="Enter username" />
      </div>
      <div>
        <Label htmlFor="demo-email">Email</Label>
        <Input id="demo-email" error placeholder="Enter email" />
      </div>
    </div>
  );
}
