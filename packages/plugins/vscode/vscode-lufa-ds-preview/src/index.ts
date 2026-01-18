/**
 * VS Code extension entry point wiring activation, providers, and lifecycle.
 */
import * as vscode from 'vscode';

import type { ValuesMapStore } from './values-map-store';
import { createCompletionProvider, createDocumentColorProvider, createHoverProvider } from './preview-providers';
import { createValuesMapStore } from './values-map-store';

let outputChannel: vscode.OutputChannel | null = null;
let lastStatus: string | null = null;
let mapStore: ValuesMapStore | null = null;

/**
 * Log a message once to avoid repeating identical status lines.
 */
const logOnce = (message: string): void => {
  if (!outputChannel) return;
  if (lastStatus === message) return;
  outputChannel.appendLine(message);
  lastStatus = message;
};

/**
 * Provide the current output channel for downstream helpers.
 */
const getOutputChannel = (): vscode.OutputChannel | null => outputChannel;

/**
 * Activate the extension and register providers and watchers.
 */
export function activate(context: vscode.ExtensionContext): void {
  outputChannel = vscode.window.createOutputChannel('Lufa DS Preview');
  outputChannel.appendLine('lufa: Extension activated.');
  context.subscriptions.push(outputChannel);

  mapStore = createValuesMapStore(logOnce);
  mapStore.setExtensionRootPath(context.extensionPath);
  mapStore.setupMapWatchers(context);

  // Re-setup watcher when configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('lufaDsPreview')) {
        logOnce('lufa: Configuration changed, re-initializing map watchers');
        mapStore?.resetAllCache();
        mapStore?.setupMapWatchers(context);
      }
    })
  );

  const provider = createDocumentColorProvider({
    loadValuesMap: () => mapStore?.loadValuesMap() ?? null,
    isDebugEnabled: () => mapStore?.isDebugEnabled() ?? false,
    getOutputChannel,
  });

  const hoverProvider = createHoverProvider({
    loadValuesMap: () => mapStore?.loadValuesMap() ?? null,
  });

  const completionProvider = createCompletionProvider({
    loadValuesMap: () => mapStore?.loadValuesMap() ?? null,
  });

  const selector: vscode.DocumentSelector = [
    { scheme: 'file', language: 'css' },
    { scheme: 'file', language: 'scss' },
    { scheme: 'file', language: 'postcss' },
    { scheme: 'file', language: 'typescript' },
    { scheme: 'file', language: 'typescriptreact' },
  ];

  context.subscriptions.push(vscode.languages.registerColorProvider(selector, provider));
  context.subscriptions.push(vscode.languages.registerHoverProvider(selector, hoverProvider));
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(selector, completionProvider, '-', '.', '[', '"', "'")
  );
}

/**
 * Dispose resources created during activation.
 */
export function deactivate(): void {
  mapStore?.dispose();
  mapStore = null;
  outputChannel?.dispose();
  outputChannel = null;
  lastStatus = null;
}
