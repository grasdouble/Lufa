import { designSystemInfoTool } from './designSystemInfo.js';
import { helloTool } from './hello.js';
import { primitivesInfoTool } from './primitivesInfo.js';

export interface Tool {
  description: string;
  inputSchema: object;
  handler: (...args: any[]) => Promise<any>;
}

export const tools: Record<string, Tool> = {
  designSystemInfo: designSystemInfoTool,
  primitivesInfo: primitivesInfoTool,
  hello: helloTool,
};
