/**
 * Factory functions for document color and hover providers.
 */
import { converter } from 'culori';
import * as vscode from 'vscode';

import type { TokenMap } from './values-map';
import {
  createCssColorVarDirectRe,
  createCssColorVarInVarRe,
  createOklchColorRe,
  cssVarNameRe,
} from './patterns/css-var-patterns';
import { createColorPathRe, tokenPathRe } from './patterns/token-path-patterns';
import {
  getPathCandidates,
  lookupValue,
  resolveTokenValueFromMap,
  toDoubleQuotedPath,
  toSingleQuotedPath,
} from './reference-resolver';

type DocumentColorProviderDeps = {
  loadValuesMap: () => TokenMap | null;
  isDebugEnabled: () => boolean;
  getOutputChannel: () => vscode.OutputChannel | null;
};

type HoverProviderDeps = {
  loadValuesMap: () => TokenMap | null;
};

type CompletionProviderDeps = {
  loadValuesMap: () => TokenMap | null;
};

type CompletionMatch = {
  kind: 'css' | 'path';
  prefix: string;
  range: vscode.Range;
};

type QuotePreference = 'single' | 'double' | null;
type CompletionDocumentation = {
  documentation: vscode.MarkdownString;
  color: string | null;
};

const MAX_COMPLETION_ITEMS = 200;

const toRgb = converter('rgb');
const tokenHoverRe = new RegExp(`${cssVarNameRe.source}|${tokenPathRe.source}`);

/**
 * Build a document color provider wired to map loading and logging helpers.
 */
const createDocumentColorProvider = (deps: DocumentColorProviderDeps): vscode.DocumentColorProvider => {
  return {
    provideDocumentColors(document) {
      const map = deps.loadValuesMap();
      if (!map) return [];

      const debug = deps.isDebugEnabled();
      const outputChannel = deps.getOutputChannel();

      if (debug && outputChannel) {
        outputChannel.appendLine(`\nlufa: === Processing ${document.fileName} ===`);
        outputChannel.appendLine(`lufa: Language: ${document.languageId}`);
        outputChannel.appendLine(`lufa: CSS vars available: ${Object.keys(map.css).length}`);
        outputChannel.appendLine(`lufa: Path entries available: ${Object.keys(map.paths).length}`);
      }

      const text = document.getText();
      const colors: vscode.ColorInformation[] = [];

      const cssColorVarInVarRe = createCssColorVarInVarRe();
      const cssColorVarDirectRe = createCssColorVarDirectRe();
      const oklchColorRe = createOklchColorRe();

      for (const match of text.matchAll(cssColorVarInVarRe)) {
        if (match.index === undefined) continue;
        const varName = match[1];
        const value = map.css[varName];
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ CSS var not found in map: ${varName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ CSS var matched: ${varName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + match[0].length, value, varName, debug, outputChannel);
      }

      for (const match of text.matchAll(cssColorVarDirectRe)) {
        if (match.index === undefined) continue;
        const varName = match[1];
        const value = map.css[varName];
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ CSS declaration not found in map: ${varName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ CSS declaration matched: ${varName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + varName.length, value, varName, debug, outputChannel);
      }

      for (const match of text.matchAll(oklchColorRe)) {
        if (match.index === undefined) continue;
        const value = match[0];
        addColor(colors, document, match.index, match.index + match[0].length, value, value, debug, outputChannel);
      }

      const colorPathRe = createColorPathRe();

      if (debug && outputChannel) {
        const allMatches = [...text.matchAll(colorPathRe)];
        outputChannel.appendLine(`lufa:   Found ${allMatches.length} color path references`);
      }

      for (const match of text.matchAll(colorPathRe)) {
        if (match.index === undefined) continue;
        const pathName = match[0];
        const lookupKeys = getPathCandidates(pathName);
        const value = lookupValue(map.paths, lookupKeys);
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ Color path not found in map: ${pathName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ Color path matched: ${pathName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + match[0].length, value, pathName, debug, outputChannel);
      }

      if (debug && outputChannel) {
        outputChannel.appendLine(`lufa: Total colors found: ${colors.length}\n`);
      }

      return colors;
    },
    provideColorPresentations() {
      return [];
    },
  };
};

/**
 * Convert a token color value to a VS Code color entry.
 */
const addColor = (
  colors: vscode.ColorInformation[],
  document: vscode.TextDocument,
  start: number,
  end: number,
  value: string,
  tokenName: string,
  debug: boolean,
  outputChannel: vscode.OutputChannel | null
): void => {
  const rgb = safeToRgb(value, debug, outputChannel, tokenName);
  if (!rgb) {
    if (debug && outputChannel) {
      outputChannel.appendLine(`lufa: Failed to parse color: "${value}"${tokenName ? ` (token: ${tokenName})` : ''}`);
    }
    return;
  }

  const color = new vscode.Color(rgb.r, rgb.g, rgb.b, rgb.alpha ?? 1);
  const range = new vscode.Range(document.positionAt(start), document.positionAt(end));
  colors.push(new vscode.ColorInformation(range, color));
};

/**
 * Build a hover provider that resolves token values on demand.
 */
const createHoverProvider = (deps: HoverProviderDeps): vscode.HoverProvider => {
  return {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position, tokenHoverRe);
      if (!range) return;

      const tokenText = document.getText(range);
      const value = resolveTokenValueFromMap(tokenText, deps.loadValuesMap());
      if (!value) return;

      const markdown = new vscode.MarkdownString();
      markdown.appendMarkdown(`\`${tokenText}\` = \`${value}\``);
      return new vscode.Hover(markdown, range);
    },
  };
};

/**
 * Build a completion provider to enrich Lufa token suggestions with values.
 */
const createCompletionProvider = (deps: CompletionProviderDeps): vscode.CompletionItemProvider => {
  return {
    provideCompletionItems(document, position) {
      const valuesMap = deps.loadValuesMap();
      if (!valuesMap) return;

      const match = getCompletionMatch(document, position);
      if (!match) return;

      if (match.kind === 'css') {
        return buildCssCompletionItems(valuesMap, match);
      }

      return buildPathCompletionItems(valuesMap, match);
    },
  };
};

const getCompletionMatch = (document: vscode.TextDocument, position: vscode.Position): CompletionMatch | null => {
  const text = document.getText();
  const offset = document.offsetAt(position);
  const scanText = text.slice(Math.max(0, offset - 200), offset);

  const cssMatch = /--lufa-(?:primitive|core|semantic|component|tokens)-[a-zA-Z0-9-]*$/.exec(scanText);
  if (cssMatch) {
    const start = offset - cssMatch[0].length;
    return {
      kind: 'css',
      prefix: cssMatch[0],
      range: new vscode.Range(document.positionAt(start), position),
    };
  }

  const pathMatch = /\b(?:tokens|primitive|core|semantic|component)\.[A-Za-z0-9_$.[\]'"]*$/.exec(scanText);
  if (pathMatch) {
    const start = offset - pathMatch[0].length;
    return {
      kind: 'path',
      prefix: pathMatch[0],
      range: new vscode.Range(document.positionAt(start), position),
    };
  }

  return null;
};

const getQuotePreference = (prefix: string): QuotePreference => {
  const lastSingle = prefix.lastIndexOf("['");
  const lastDouble = prefix.lastIndexOf('["');

  if (lastSingle === -1 && lastDouble === -1) return null;
  return lastSingle > lastDouble ? 'single' : 'double';
};

const applyQuotePreference = (value: string, preference: QuotePreference): string => {
  if (preference === 'single') {
    return toSingleQuotedPath(value);
  }

  if (preference === 'double') {
    return toDoubleQuotedPath(value);
  }

  return value;
};

const buildCompletionItem = (
  label: string,
  value: string,
  range: vscode.Range,
  kind: vscode.CompletionItemKind
): vscode.CompletionItem => {
  const { documentation, color } = buildCompletionDocumentation(label, value);
  const resolvedKind = color ? vscode.CompletionItemKind.Color : kind;
  const item = new vscode.CompletionItem(label, resolvedKind);
  item.detail = color ?? value;
  item.documentation = documentation;

  item.insertText = label;
  item.range = range;
  item.filterText = label;

  return item;
};

const buildCompletionDocumentation = (label: string, value: string): CompletionDocumentation => {
  const documentation = new vscode.MarkdownString();
  documentation.appendMarkdown(`\`${label}\`\n\n\`${value}\``);

  const color = toCssColor(value);
  if (color) {
    documentation.supportHtml = true;
    documentation.appendMarkdown(
      `\n\n<span style="display:inline-block;width:12px;height:12px;border-radius:2px;border:1px solid rgba(0,0,0,0.2);background:${color};"></span> \`${color}\``
    );
  }

  return { documentation, color };
};

const toCssColor = (value: string): string | null => {
  const rgb = safeToRgb(value);
  if (!rgb) return null;

  const toChannel = (channel: number): number => Math.round(channel * 255);
  const alpha = rgb.alpha ?? 1;
  const alphaText = Math.min(1, Math.max(0, alpha)).toFixed(3).replace(/0+$/, '').replace(/\.$/, '');

  const r = toChannel(rgb.r);
  const g = toChannel(rgb.g);
  const b = toChannel(rgb.b);

  if (alphaText === '1') {
    return `rgb(${r} ${g} ${b})`;
  }

  return `rgb(${r} ${g} ${b} / ${alphaText || '0'})`;
};

const safeToRgb = (
  value: string,
  debug?: boolean,
  outputChannel?: vscode.OutputChannel | null,
  tokenName?: string
): ReturnType<typeof toRgb> => {
  try {
    return toRgb(value);
  } catch (error) {
    if (debug && outputChannel) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      outputChannel.appendLine(
        `lufa: Error parsing color "${value}"${tokenName ? ` (token: ${tokenName})` : ''}: ${errorMsg}`
      );
    }
    return null;
  }
};

const buildCssCompletionItems = (valuesMap: TokenMap, match: CompletionMatch): vscode.CompletionItem[] => {
  const items: vscode.CompletionItem[] = [];
  const entries = Object.entries(valuesMap.css);

  for (const [name, value] of entries) {
    if (!name.startsWith(match.prefix)) continue;
    items.push(buildCompletionItem(name, value, match.range, vscode.CompletionItemKind.Variable));
    if (items.length >= MAX_COMPLETION_ITEMS) break;
  }

  return items;
};

const buildPathCompletionItems = (valuesMap: TokenMap, match: CompletionMatch): vscode.CompletionItem[] => {
  const items: vscode.CompletionItem[] = [];
  const quotePreference = getQuotePreference(match.prefix);

  // Determine namespace from prefix (tokens, primitive, core, semantic, component)
  const namespaceMatch = /^(tokens|primitive|core|semantic|component)\./.exec(match.prefix);
  const namespace = namespaceMatch ? namespaceMatch[1] + '.' : '';

  const entries = Object.entries(valuesMap.paths);

  for (const [name, value] of entries) {
    if (!name.startsWith(namespace)) continue;

    const label = applyQuotePreference(name, quotePreference);
    if (!label.startsWith(match.prefix)) continue;

    items.push(buildCompletionItem(label, value, match.range, vscode.CompletionItemKind.Constant));
    if (items.length >= MAX_COMPLETION_ITEMS) break;
  }

  return items;
};

export { createDocumentColorProvider, createHoverProvider, createCompletionProvider };
