import { designSystemInfo } from '../data/designSystemInfo.js';

export const primitivesInfoTool = {
  description:
    'Returns detailed information about the Primitives layer: categories, sample usage, key principles, and documentation.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: async () => ({
    content: [
      {
        type: 'text',
        text: 'Lufa Primitives: Non-semantic, value-as-key design tokens. Categories: Border, Color, Effects, Elevation, Icon, Layout, Motion, Space, Typography. See structuredContent for details.',
      },
    ],
    structuredContent: designSystemInfo.layers[0],
    isError: false,
  }),
};
