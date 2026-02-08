import { describe, expect, it, vi } from 'vitest';
import { CompletionItemKind } from 'vscode';

import { createCompletionProvider, createDocumentColorProvider, createHoverProvider } from '../preview-providers';

vi.mock('vscode', () => {
  class MarkdownString {
    value = '';
    supportHtml = false;

    appendMarkdown(text: string) {
      this.value += text;
    }
  }

  class Hover {
    constructor(
      public contents: MarkdownString,
      public range: unknown
    ) {}
  }

  class Color {
    constructor(
      public r: number,
      public g: number,
      public b: number,
      public alpha: number
    ) {}
  }

  class Range {
    constructor(
      public start: unknown,
      public end: unknown
    ) {}
  }

  class ColorInformation {
    constructor(
      public range: Range,
      public color: Color
    ) {}
  }

  class CompletionItem {
    detail?: string;
    documentation?: MarkdownString;
    insertText?: string;
    range?: Range;
    filterText?: string;

    constructor(
      public label: string,
      public kind?: number
    ) {}
  }

  const CompletionItemKind = {
    Variable: 1,
    Constant: 2,
    Color: 3,
  };

  return {
    MarkdownString,
    Hover,
    Color,
    Range,
    ColorInformation,
    CompletionItem,
    CompletionItemKind,
  };
});

const createMap = () => ({
  version: 1,
  css: {
    '--lufa-core-color-brand-500': 'rgb(255 0 0)',
  },
  paths: {
    'primitive.color.red.500': 'rgb(0 255 0)',
    'tokens.color.text.primary': 'rgb(0 0 255)',
    'tokens.spacing["sm-md"]': '0.5rem',
  },
});

describe('createDocumentColorProvider', () => {
  it('should return colors for CSS vars and token paths', () => {
    const provider = createDocumentColorProvider({
      loadValuesMap: () => createMap(),
      isDebugEnabled: () => false,
      getOutputChannel: () => null,
    });

    const document = {
      fileName: 'styles.css',
      languageId: 'css',
      getText: () =>
        'color: var(--lufa-core-color-brand-500); background: tokens.color.text.primary; border: primitive.color.red.500; box-shadow: 0 0 0 2px oklch(70% 0.1 200 / 0.5);',
      positionAt: (offset: number) => ({ line: 0, character: offset }),
    };

    const colors = provider.provideDocumentColors(document as never);

    expect(colors).toHaveLength(4);
  });
});

describe('createHoverProvider', () => {
  it('should provide hover content for matching tokens', () => {
    const provider = createHoverProvider({
      loadValuesMap: () => createMap(),
    });

    const range = { start: { line: 0, character: 0 }, end: { line: 0, character: 10 } };
    const document = {
      getWordRangeAtPosition: () => range,
      getText: () => 'tokens.color.text.primary',
    };

    const hover = provider.provideHover(document as never, {} as never);

    expect(hover).toBeTruthy();
  });
});

describe('createCompletionProvider', () => {
  it('should provide completion details for css vars', () => {
    const provider = createCompletionProvider({
      loadValuesMap: () => createMap(),
    });

    const text = 'color: var(--lufa-core-color-brand-';
    const document = {
      getText: () => text,
      offsetAt: (pos: { character: number }) => pos.character,
      positionAt: (offset: number) => ({ line: 0, character: offset }),
    };

    const items = provider.provideCompletionItems(document as never, { line: 0, character: text.length } as never);

    const match = (
      items as { label: string; detail?: string; kind?: number; documentation?: { value: string } }[]
    ).find((item) => item.label === '--lufa-core-color-brand-500');

    expect(match?.kind).toBe(CompletionItemKind.Color);
    expect(match?.documentation?.value).toContain('background:');
    expect(match?.detail).toBe('rgb(255 0 0)');
  });

  it('should respect quote preference for path tokens', () => {
    const provider = createCompletionProvider({
      loadValuesMap: () => createMap(),
    });

    const text = "const gap = tokens.spacing['";
    const document = {
      getText: () => text,
      offsetAt: (pos: { character: number }) => pos.character,
      positionAt: (offset: number) => ({ line: 0, character: offset }),
    };

    const items = provider.provideCompletionItems(document as never, { line: 0, character: text.length } as never);

    const match = (items as { label: string; detail?: string }[]).find(
      (item) => item.label === "tokens.spacing['sm-md']"
    );

    expect(match?.detail).toBe('0.5rem');
  });
});
