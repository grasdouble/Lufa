import { designSystemInfo } from '../data/designSystemInfo.js';

export const designSystemInfoTool = {
  description:
    'Returns structured information about the Lufa Design System, including layers, categories, and resources.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: async () => ({
    content: [
      {
        type: 'text',
        text: `Lufa Design System v${designSystemInfo.version}: ${designSystemInfo.description}`,
      },
    ],
    structuredContent: designSystemInfo,
    isError: false,
  }),
};
