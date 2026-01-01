// MCP server for Lufa Design System
//
// To inspect and test this server with Model Context Protocol Inspector:
//
//   # From this folder (packages/design-system/mcp)
//   pnpm run inspector
//
// (or: pnpm exec @modelcontextprotocol/inspector --stdio --title "Lufa Design System MCP")
//
// This will connect the Inspector to your MCP server via stdio and allow you to browse, test, and explore the tools interactively.
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import { designSystemInfo } from './data/designSystemInfo.js';
import { tools } from './tools/index.js';

// Factory function to create and start the MCP server
export function createLufaDesignSystemMcpServer() {
  const server = new Server(
    {
      name: 'lufa-design-system',
      version: designSystemInfo.version,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List tools dynamically
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: Object.entries(tools).map(([name, { description, inputSchema }]) => ({
      name,
      description,
      inputSchema,
    })),
  }));

  // Call tool by name with structured error handling
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const tool = tools[name];
    if (!tool) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `Unknown tool: ${name}`,
          },
        ],
        error: `Unknown tool: ${name}`,
      };
    }
    return tool.handler(args);
  });

  const transport = new StdioServerTransport();

  server.connect(transport);
  return { server, transport };
}

// ESM-compatible entrypoint guard
if (import.meta.url === `file://${process.argv[1]}`) {
  createLufaDesignSystemMcpServer();
  // eslint-disable-next-line no-console
  console.log('Lufa Design System MCP server running on stdio');
}
