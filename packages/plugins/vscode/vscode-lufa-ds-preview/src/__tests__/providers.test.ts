import { describe, expect, it, vi } from 'vitest';
import { createDocumentColorProvider, createHoverProvider } from '../providers';

vi.mock('vscode', () => {
  class MarkdownString {
    value = '';

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

  return {
    MarkdownString,
    Hover,
    Color,
    Range,
    ColorInformation,
  };
});

const createMap = () => ({
  version: 1,
  css: {
    '--lufa-color-text-primary': 'rgb(255 0 0)',
  },
  paths: {
    'primitives.color.chromatic.red[500]': 'rgb(0 255 0)',
    'tokens.color.text.primary': 'rgb(0 0 255)',
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
        'color: var(--lufa-color-text-primary); background: tokens.color.text.primary; border: primitives.color.chromatic.red[500];',
      positionAt: (offset: number) => ({ line: 0, character: offset }),
    };

    const colors = provider.provideDocumentColors(document as never);

    expect(colors).toHaveLength(3);
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
