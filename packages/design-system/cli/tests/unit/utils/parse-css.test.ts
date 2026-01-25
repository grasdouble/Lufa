import { describe, expect, it } from 'vitest';

import {
  cssVarNameFromToken,
  extractCSSVarName,
  groupPropertiesByLevel,
  isCSSVarReference,
  isValidDimension,
  isValidDuration,
  isValidHexColor,
  parseCSSContent,
  resolveCSSVarValue,
  tokenNameFromCSSVar,
} from '../../../src/utils/parse-css.js';

describe('CSS Parser Utils', () => {
  describe('parseCSSContent', () => {
    it('parses simple CSS properties', () => {
      const css = ':root { --color: #fff; }';
      const result = parseCSSContent(css);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        name: '--color',
        value: '#fff',
        line: 1,
      });
    });

    it('parses multiple properties', () => {
      const css = `
        :root {
          --color-primary: #2563eb;
          --spacing-base: 16px;
          --duration: 150ms;
        }
      `;
      const result = parseCSSContent(css);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('--color-primary');
      expect(result[1].name).toBe('--spacing-base');
      expect(result[2].name).toBe('--duration');
    });

    it('parses multi-line property values', () => {
      const css = `
        :root {
          --font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }
      `;
      const result = parseCSSContent(css);

      expect(result).toHaveLength(1);
      expect(result[0].value).toBe('system-ui, -apple-system, sans-serif');
    });

    it('normalizes whitespace in values', () => {
      const css = ':root { --spacing:   16px   ; }';
      const result = parseCSSContent(css);

      expect(result[0].value).toBe('16px');
    });

    it('removes CSS comments', () => {
      const css = `
        :root {
          /* This is a comment */
          --color: #fff; /* inline comment */
          /* --commented-out: #000; */
          --valid: #000;
        }
      `;
      const result = parseCSSContent(css);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('--color');
      expect(result[1].name).toBe('--valid');
    });

    it('tracks correct line numbers', () => {
      const css = `
:root {
  --first: 1px;
  --second: 2px;
  --third: 3px;
}
      `;
      const result = parseCSSContent(css);

      expect(result[0].line).toBe(3);
      expect(result[1].line).toBe(4);
      expect(result[2].line).toBe(5);
    });

    it('handles var() references', () => {
      const css = `
        :root {
          --primary: #2563eb;
          --brand: var(--primary);
        }
      `;
      const result = parseCSSContent(css);

      expect(result).toHaveLength(2);
      expect(result[1].value).toBe('var(--primary)');
    });
  });

  describe('tokenNameFromCSSVar', () => {
    it('converts CSS variable names to token names', () => {
      expect(tokenNameFromCSSVar('--lufa-primitive-color-blue-500')).toBe('primitive.color.blue.500');
      expect(tokenNameFromCSSVar('--lufa-semantic-ui-text-primary')).toBe('semantic.ui.text.primary');
    });

    it('removes --lufa- prefix', () => {
      expect(tokenNameFromCSSVar('--lufa-core-brand-primary')).toBe('core.brand.primary');
    });

    it('converts kebab-case to dot notation', () => {
      expect(tokenNameFromCSSVar('--lufa-component-button-primary-text')).toBe('component.button.primary.text');
    });
  });

  describe('cssVarNameFromToken', () => {
    it('converts token names to CSS variable names', () => {
      expect(cssVarNameFromToken('primitive.color.blue.500')).toBe('--lufa-primitive-color-blue-500');
      expect(cssVarNameFromToken('semantic.ui.text.primary')).toBe('--lufa-semantic-ui-text-primary');
    });

    it('adds --lufa- prefix', () => {
      expect(cssVarNameFromToken('core.brand.primary')).toBe('--lufa-core-brand-primary');
    });

    it('converts dot notation to kebab-case', () => {
      expect(cssVarNameFromToken('component.button.primary.text')).toBe('--lufa-component-button-primary-text');
    });
  });

  describe('isCSSVarReference', () => {
    it('identifies valid var() references', () => {
      expect(isCSSVarReference('var(--color)')).toBe(true);
      expect(isCSSVarReference('var(--lufa-primitive-color-blue-500)')).toBe(true);
      expect(isCSSVarReference('  var(--spacing)  ')).toBe(true);
    });

    it('rejects invalid var() references', () => {
      expect(isCSSVarReference('#ffffff')).toBe(false);
      expect(isCSSVarReference('16px')).toBe(false);
      expect(isCSSVarReference('var()')).toBe(false);
      expect(isCSSVarReference('var(--color, #fff)')).toBe(false); // with fallback
      expect(isCSSVarReference('var(color)')).toBe(false); // missing --
    });
  });

  describe('extractCSSVarName', () => {
    it('extracts variable name from var() reference', () => {
      expect(extractCSSVarName('var(--color)')).toBe('--color');
      expect(extractCSSVarName('var(--lufa-primitive-color-blue-500)')).toBe('--lufa-primitive-color-blue-500');
    });

    it('returns null for invalid var() references', () => {
      expect(extractCSSVarName('#ffffff')).toBeNull();
      expect(extractCSSVarName('var()')).toBeNull();
      expect(extractCSSVarName('var(--color, #fff)')).toBeNull();
    });
  });

  describe('resolveCSSVarValue', () => {
    it('returns non-var() values as-is', () => {
      const props = new Map();
      expect(resolveCSSVarValue('#ffffff', props)).toBe('#ffffff');
      expect(resolveCSSVarValue('16px', props)).toBe('16px');
      expect(resolveCSSVarValue('150ms', props)).toBe('150ms');
    });

    it('resolves simple var() references', () => {
      const props = new Map([
        ['--primary', '#2563eb'],
        ['--brand', 'var(--primary)'],
      ]);
      expect(resolveCSSVarValue('var(--brand)', props)).toBe('#2563eb');
    });

    it('resolves nested var() references', () => {
      const props = new Map([
        ['--blue-500', '#2563eb'],
        ['--primary', 'var(--blue-500)'],
        ['--brand', 'var(--primary)'],
      ]);
      expect(resolveCSSVarValue('var(--brand)', props)).toBe('#2563eb');
    });

    it('resolves deeply nested chains', () => {
      const props = new Map([
        ['--level-1', '#2563eb'],
        ['--level-2', 'var(--level-1)'],
        ['--level-3', 'var(--level-2)'],
        ['--level-4', 'var(--level-3)'],
        ['--level-5', 'var(--level-4)'],
      ]);
      expect(resolveCSSVarValue('var(--level-5)', props)).toBe('#2563eb');
    });

    it('detects circular references', () => {
      const props = new Map([
        ['--a', 'var(--b)'],
        ['--b', 'var(--a)'],
      ]);
      expect(resolveCSSVarValue('var(--a)', props)).toBeNull();
    });

    it('detects self-referencing variables', () => {
      const props = new Map([['--self', 'var(--self)']]);
      expect(resolveCSSVarValue('var(--self)', props)).toBeNull();
    });

    it('returns null for undefined variables', () => {
      const props = new Map([['--defined', '#ffffff']]);
      expect(resolveCSSVarValue('var(--undefined)', props)).toBeNull();
    });

    it('resolves real Lufa token chains', () => {
      const props = new Map([
        ['--lufa-primitive-color-gray-900', '#111827'],
        ['--lufa-core-neutral-text-primary', 'var(--lufa-primitive-color-gray-900)'],
        ['--lufa-semantic-ui-text-primary', 'var(--lufa-core-neutral-text-primary)'],
      ]);
      expect(resolveCSSVarValue('var(--lufa-semantic-ui-text-primary)', props)).toBe('#111827');
    });
  });

  describe('isValidHexColor', () => {
    it('validates 6-digit hex colors', () => {
      expect(isValidHexColor('#ffffff')).toBe(true);
      expect(isValidHexColor('#000000')).toBe(true);
      expect(isValidHexColor('#2563eb')).toBe(true);
      expect(isValidHexColor('#AbCdEf')).toBe(true);
    });

    it('validates 3-digit hex colors', () => {
      expect(isValidHexColor('#fff')).toBe(true);
      expect(isValidHexColor('#000')).toBe(true);
      expect(isValidHexColor('#abc')).toBe(true);
    });

    it('rejects invalid hex colors', () => {
      expect(isValidHexColor('ffffff')).toBe(false); // missing #
      expect(isValidHexColor('#gggggg')).toBe(false); // invalid characters
      expect(isValidHexColor('#12')).toBe(false); // too short
      expect(isValidHexColor('#1234567')).toBe(false); // too long
      expect(isValidHexColor('#12345')).toBe(false); // invalid length
      expect(isValidHexColor('rgb(255, 255, 255)')).toBe(false); // not hex
    });

    it('handles whitespace', () => {
      expect(isValidHexColor('  #ffffff  ')).toBe(true);
      expect(isValidHexColor('#fff ')).toBe(true);
    });
  });

  describe('isValidDimension', () => {
    it('validates px dimensions', () => {
      expect(isValidDimension('16px')).toBe(true);
      expect(isValidDimension('0px')).toBe(true);
      expect(isValidDimension('100.5px')).toBe(true);
      expect(isValidDimension('-10px')).toBe(true);
    });

    it('validates rem dimensions', () => {
      expect(isValidDimension('1rem')).toBe(true);
      expect(isValidDimension('1.5rem')).toBe(true);
      expect(isValidDimension('0.875rem')).toBe(true);
    });

    it('validates em dimensions', () => {
      expect(isValidDimension('2em')).toBe(true);
      expect(isValidDimension('0.5em')).toBe(true);
    });

    it('validates percentage', () => {
      expect(isValidDimension('100%')).toBe(true);
      expect(isValidDimension('50%')).toBe(true);
      expect(isValidDimension('0.5%')).toBe(true);
    });

    it('validates viewport units', () => {
      expect(isValidDimension('100vh')).toBe(true);
      expect(isValidDimension('50vw')).toBe(true);
      expect(isValidDimension('10vmin')).toBe(true);
      expect(isValidDimension('20vmax')).toBe(true);
    });

    it('rejects invalid dimensions', () => {
      expect(isValidDimension('16')).toBe(false); // missing unit
      expect(isValidDimension('px')).toBe(false); // missing value
      expect(isValidDimension('16 px')).toBe(false); // space
      expect(isValidDimension('abc')).toBe(false); // not a dimension
    });
  });

  describe('isValidDuration', () => {
    it('validates milliseconds', () => {
      expect(isValidDuration('150ms')).toBe(true);
      expect(isValidDuration('0ms')).toBe(true);
      expect(isValidDuration('1000ms')).toBe(true);
      expect(isValidDuration('100.5ms')).toBe(true);
    });

    it('validates seconds', () => {
      expect(isValidDuration('1s')).toBe(true);
      expect(isValidDuration('0.5s')).toBe(true);
      expect(isValidDuration('2.5s')).toBe(true);
    });

    it('rejects invalid durations', () => {
      expect(isValidDuration('150')).toBe(false); // missing unit
      expect(isValidDuration('ms')).toBe(false); // missing value
      expect(isValidDuration('-150ms')).toBe(false); // negative
      expect(isValidDuration('150 ms')).toBe(false); // space
    });
  });

  describe('groupPropertiesByLevel', () => {
    it('groups properties by token level', () => {
      const properties = [
        { name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 },
        { name: '--lufa-core-brand-primary', value: 'var(--lufa-primitive-color-blue-500)', line: 2 },
        { name: '--lufa-semantic-ui-text-primary', value: 'var(--lufa-core-neutral-text-primary)', line: 3 },
        { name: '--lufa-component-button-primary-text', value: 'var(--lufa-semantic-ui-text-primary)', line: 4 },
        { name: '--custom-token', value: '#fff', line: 5 },
      ];

      const grouped = groupPropertiesByLevel(properties);

      expect(grouped.primitive).toHaveLength(1);
      expect(grouped.core).toHaveLength(1);
      expect(grouped.semantic).toHaveLength(1);
      expect(grouped.component).toHaveLength(1);
      expect(grouped.unknown).toHaveLength(1);
    });

    it('handles empty input', () => {
      const grouped = groupPropertiesByLevel([]);

      expect(grouped.primitive).toHaveLength(0);
      expect(grouped.core).toHaveLength(0);
      expect(grouped.semantic).toHaveLength(0);
      expect(grouped.component).toHaveLength(0);
      expect(grouped.unknown).toHaveLength(0);
    });

    it('groups all primitives correctly', () => {
      const properties = [
        { name: '--lufa-primitive-color-blue-500', value: '#2563eb', line: 1 },
        { name: '--lufa-primitive-spacing-base', value: '16px', line: 2 },
        { name: '--lufa-primitive-duration-fast', value: '150ms', line: 3 },
      ];

      const grouped = groupPropertiesByLevel(properties);

      expect(grouped.primitive).toHaveLength(3);
    });
  });
});
