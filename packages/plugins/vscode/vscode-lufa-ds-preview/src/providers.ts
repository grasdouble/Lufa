/**
 * Factory functions for document color and hover providers.
 */
import { converter } from 'culori';
import * as vscode from 'vscode';
import {
  createCssVarDirectRe,
  createCssVarInVarRe,
  createPrimitivePathRe,
  createTokenPathRe,
  tokenHoverRe,
} from './patterns';
import { getPathCandidates, lookupValue, resolveTokenValueFromMap } from './token-lookup';
import type { TokenMap } from './map-utils';

type DocumentColorProviderDeps = {
  loadValuesMap: () => TokenMap | null;
  isDebugEnabled: () => boolean;
  getOutputChannel: () => vscode.OutputChannel | null;
};

type HoverProviderDeps = {
  loadValuesMap: () => TokenMap | null;
};

const toRgb = converter('rgb');

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
        outputChannel.appendLine(`lufa: CSS tokens available: ${Object.keys(map.css).length}`);
        outputChannel.appendLine(`lufa: Path tokens available: ${Object.keys(map.paths).length}`);
      }

      const text = document.getText();
      const colors: vscode.ColorInformation[] = [];

      const cssVarInVarRe = createCssVarInVarRe();
      const cssVarDirectRe = createCssVarDirectRe();

      for (const match of text.matchAll(cssVarInVarRe)) {
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

      for (const match of text.matchAll(cssVarDirectRe)) {
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

      const primitivePathRe = createPrimitivePathRe();
      const tokenPathRe = createTokenPathRe();

      if (debug && outputChannel) {
        const allMatches = [...text.matchAll(primitivePathRe)];
        outputChannel.appendLine(`lufa:   Found ${allMatches.length} primitives.color references`);
      }

      for (const match of text.matchAll(primitivePathRe)) {
        if (match.index === undefined) continue;
        const pathName = match[0];
        const value = map.paths[pathName];
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ Primitive path not found in map: ${pathName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ Primitive path matched: ${pathName} = ${value}`);
        }
        addColor(colors, document, match.index, match.index + match[0].length, value, pathName, debug, outputChannel);
      }

      if (debug && outputChannel) {
        const allTokenMatches = [...text.matchAll(tokenPathRe)];
        outputChannel.appendLine(`lufa:   Found ${allTokenMatches.length} token color references`);
      }

      for (const match of text.matchAll(tokenPathRe)) {
        if (match.index === undefined) continue;
        const pathName = match[0];
        const lookupKeys = getPathCandidates(pathName);
        const value = lookupValue(map.paths, lookupKeys);
        if (!value) {
          if (debug && outputChannel) {
            outputChannel.appendLine(`lufa:   ❌ Token path not found in map: ${pathName}`);
          }
          continue;
        }
        if (debug && outputChannel) {
          outputChannel.appendLine(`lufa:   ✅ Token path matched: ${pathName} = ${value}`);
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
  const rgb = toRgb(value);
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

export { createDocumentColorProvider, createHoverProvider };
