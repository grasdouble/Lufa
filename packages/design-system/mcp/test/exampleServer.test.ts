import fetch from 'node-fetch';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { createLufaDesignSystemMcpServer } from '../src/server/lufaDesignSystemMcpServer.js';

let transport: any;

beforeAll(() => {
  const result = createLufaDesignSystemMcpServer();
  transport = result.transport;
});

afterAll(async () => {
  await transport.close();
});

describe('Lufa Design System MCP Server', () => {
  it('responds to hello tool', async () => {
    const res = await fetch('http://localhost:8090/tools/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Lufa' }),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.content).toContain('Hello, Lufa');
    expect(json.structuredContent.greeting).toBe('Hello, Lufa!');
  });

  it('responds to designSystemInfo tool', async () => {
    const res = await fetch('http://localhost:8090/tools/designSystemInfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.structuredContent).toHaveProperty('name', '@grasdouble/lufa_design-system');
    expect(json.structuredContent).toHaveProperty('layers');
    expect(Array.isArray(json.structuredContent.layers)).toBe(true);
    expect(json.structuredContent).toHaveProperty('componentCategories');
    expect(Array.isArray(json.structuredContent.componentCategories)).toBe(true);
    expect(json.structuredContent).toHaveProperty('resources');
    expect(json.structuredContent.resources).toHaveProperty('documentation');
  });
});
