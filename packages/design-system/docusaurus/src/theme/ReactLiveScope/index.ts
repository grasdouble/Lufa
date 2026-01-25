import React from 'react';

import * as DesignSystem from '@grasdouble/lufa_design-system';

// Make all design system components available in live code blocks
const ReactLiveScope = {
  React,
  ...React,
  ...DesignSystem,
};

export default ReactLiveScope;
