import { z } from 'zod';

export const helloTool = {
  description: 'Returns a greeting for the provided name.',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
  handler: async (args: unknown) => {
    try {
      const input = z.object({ name: z.string() }).parse(args);
      return {
        content: [
          {
            type: 'text',
            text: `Hello, ${input.name}!`,
          },
        ],
        isError: false,
      };
    } catch (err) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: 'Invalid input for hello tool.',
          },
        ],
        error: err instanceof Error ? err.message : String(err),
      };
    }
  },
};
