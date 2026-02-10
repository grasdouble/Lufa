/**
 * Template Validation Script
 *
 * Validates that _token-template.css contains all required elements
 * according to ETR-002 acceptance criteria.
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type ValidationResult = {
  passed: boolean;
  message: string;
  details?: string;
};

class TemplateValidator {
  private templateContent: string;
  private results: ValidationResult[] = [];

  constructor(templatePath: string) {
    try {
      this.templateContent = readFileSync(templatePath, 'utf-8');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to read template file: ${errorMessage}`);
    }
  }

  /**
   * Main validation method
   */
  public validate(): boolean {
    console.log('🔍 Validating Token Template...\n');

    this.validateCSSStructure();
    this.validateAlphaTokens();
    this.validateShadowTokens();
    this.validateOverlayTokens();
    this.validateRGBPlaceholders();
    this.validateDocumentation();
    this.validateModeSupport();

    return this.printResults();
  }

  /**
   * Validate CSS structure - tokens must be in selectors
   */
  private validateCSSStructure(): void {
    // Check that tokens are inside CSS selectors (not at root level)
    const selectorPattern = /\[data-color-theme=['"][\w-]+['"]\]/g;
    const selectors = this.templateContent.match(selectorPattern);

    if (!selectors || selectors.length < 3) {
      this.results.push({
        passed: false,
        message: 'CSS structure validation failed',
        details: `Expected multiple [data-color-theme] selectors with tokens inside, found ${selectors?.length ?? 0}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ CSS structure valid (${selectors.length} theme selectors found)`,
      });
    }

    // Check for "HOW TO USE THIS TEMPLATE" guide
    if (!this.templateContent.includes('HOW TO USE THIS TEMPLATE')) {
      this.results.push({
        passed: false,
        message: 'Missing usage instructions',
        details: 'Template should include "HOW TO USE THIS TEMPLATE" section',
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ Usage instructions present',
      });
    }
  }

  /**
   * AC1: Alpha token template created with all opacity levels
   */
  private validateAlphaTokens(): void {
    const requiredOpacities = [3, 5, 8, 10, 15, 20, 30, 40, 50];
    const section = 'ALPHA TOKENS TEMPLATE';

    // Check section exists
    if (!this.templateContent.includes(section)) {
      this.results.push({
        passed: false,
        message: 'Alpha tokens section missing',
        details: `Template must include "${section}" section`,
      });
      return;
    }

    // Check each opacity level exists in primary tokens
    const missingOpacities: number[] = [];
    requiredOpacities.forEach((opacity) => {
      const pattern = new RegExp(`--lufa-alpha-primary-${opacity}:`);
      if (!pattern.test(this.templateContent)) {
        missingOpacities.push(opacity);
      }
    });

    if (missingOpacities.length > 0) {
      this.results.push({
        passed: false,
        message: 'Alpha tokens incomplete',
        details: `Missing opacity levels: ${missingOpacities.join(', ')}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ Alpha tokens complete (all ${requiredOpacities.length} opacity levels)`,
      });
    }

    // Validate alpha token pattern structure
    const alphaPattern = /--lufa-alpha-\w+-\d+:\s*rgba\(/g;
    const matches = this.templateContent.match(alphaPattern);
    // Should have 6 colors × 9 opacity levels = 54 tokens minimum
    if (!matches || matches.length < 54) {
      this.results.push({
        passed: false,
        message: 'Alpha token format validation failed',
        details: `Expected 54 alpha tokens (6 colors × 9 levels), found ${matches?.length ?? 0}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ Alpha token format valid (${matches.length} tokens)`,
      });
    }

    // Validate that semantic colors have all 9 levels (not just 3)
    const semanticColors = ['success', 'error', 'warning', 'info'];
    const missingSemanticLevels: string[] = [];

    semanticColors.forEach((color) => {
      requiredOpacities.forEach((opacity) => {
        const pattern = new RegExp(`--lufa-alpha-${color}-${opacity}:`);
        if (!pattern.test(this.templateContent)) {
          missingSemanticLevels.push(`${color}-${opacity}`);
        }
      });
    });

    if (missingSemanticLevels.length > 0) {
      this.results.push({
        passed: false,
        message: 'Semantic alpha tokens incomplete',
        details: `Missing: ${missingSemanticLevels.slice(0, 10).join(', ')}${missingSemanticLevels.length > 10 ? ` (and ${missingSemanticLevels.length - 10} more)` : ''}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ Semantic colors have all 9 opacity levels',
      });
    }
  }

  /**
   * AC2: Shadow token template created with all sizes
   */
  private validateShadowTokens(): void {
    const requiredSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    const section = 'SHADOW TOKENS TEMPLATE';

    // Check section exists
    if (!this.templateContent.includes(section)) {
      this.results.push({
        passed: false,
        message: 'Shadow tokens section missing',
        details: `Template must include "${section}" section`,
      });
      return;
    }

    // Check each shadow size
    const missingSizes: string[] = [];
    requiredSizes.forEach((size) => {
      const pattern = new RegExp(`--lufa-shadow-${size}:`);
      if (!pattern.test(this.templateContent)) {
        missingSizes.push(size);
      }
    });

    if (missingSizes.length > 0) {
      this.results.push({
        passed: false,
        message: 'Shadow tokens incomplete',
        details: `Missing sizes: ${missingSizes.join(', ')}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ Shadow tokens complete (all ${requiredSizes.length} sizes)`,
      });
    }

    // Check shadow-color variable exists
    if (!this.templateContent.includes('--lufa-shadow-color:')) {
      this.results.push({
        passed: false,
        message: 'Shadow color variable missing',
        details: '--lufa-shadow-color: must be defined',
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ Shadow color variable defined',
      });
    }

    // Validate shadow-xl matches TOKENS_CONVENTIONS.md spec (12px 24px, not 16px 32px)
    // Check actual token definitions (not comments)
    const shadowXlPattern = /--lufa-shadow-xl:\s*0\s+(\d+)px\s+(\d+)px/g;
    const shadowXlMatches = Array.from(this.templateContent.matchAll(shadowXlPattern));

    if (shadowXlMatches.length === 0) {
      this.results.push({
        passed: false,
        message: 'Shadow-xl definition not found',
        details: 'Could not find --lufa-shadow-xl token definition',
      });
    } else {
      const incorrectShadows = shadowXlMatches.filter((match) => match[1] !== '12' || match[2] !== '24');

      if (incorrectShadows.length > 0) {
        this.results.push({
          passed: false,
          message: 'Shadow-xl spec mismatch',
          details: `Found shadow-xl with incorrect blur values. Expected "0 12px 24px", found "0 ${incorrectShadows[0][1]}px ${incorrectShadows[0][2]}px"`,
        });
      } else {
        this.results.push({
          passed: true,
          message: `✅ Shadow-xl matches official spec (0 12px 24px) - ${shadowXlMatches.length} definitions verified`,
        });
      }
    }
  }

  /**
   * AC3: Overlay token template created for light/dark variants
   */
  private validateOverlayTokens(): void {
    const section = 'OVERLAY TOKENS TEMPLATE';

    // Check section exists
    if (!this.templateContent.includes(section)) {
      this.results.push({
        passed: false,
        message: 'Overlay tokens section missing',
        details: `Template must include "${section}" section`,
      });
      return;
    }

    // Check light overlays
    const lightTokens = ['--lufa-overlay-light-subtle:', '--lufa-overlay-light:', '--lufa-overlay-light-strong:'];

    const missingLight = lightTokens.filter((token) => !this.templateContent.includes(token));

    // Check dark overlays
    const darkTokens = ['--lufa-overlay-dark-subtle:', '--lufa-overlay-dark:', '--lufa-overlay-dark-strong:'];

    const missingDark = darkTokens.filter((token) => !this.templateContent.includes(token));

    if (missingLight.length > 0 || missingDark.length > 0) {
      this.results.push({
        passed: false,
        message: 'Overlay tokens incomplete',
        details: `Missing: ${[...missingLight, ...missingDark].join(', ')}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ Overlay tokens complete (light and dark variants)',
      });
    }
  }

  /**
   * AC4: Templates include placeholders for RGB values
   */
  private validateRGBPlaceholders(): void {
    // Check for CORRECT RGB variable pattern: --lufa-{color}-rgb (NOT --lufa-rgb-{color})
    const correctPattern = /var\(--lufa-\w+-rgb\)/g;
    const correctMatches = this.templateContent.match(correctPattern);

    // Check for INCORRECT pattern that should NOT be present
    const incorrectPattern = /var\(--lufa-rgb-\w+\)/g;
    const incorrectMatches = this.templateContent.match(incorrectPattern);

    if (incorrectMatches && incorrectMatches.length > 0) {
      this.results.push({
        passed: false,
        message: 'RGB naming pattern incorrect',
        details: `Found ${incorrectMatches.length} instances of var(--lufa-rgb-*). Should be var(--lufa-*-rgb) per TOKENS_CONVENTIONS.md`,
      });
    } else if (!correctMatches || correctMatches.length < 54) {
      this.results.push({
        passed: false,
        message: 'RGB placeholders insufficient',
        details: `Expected 54+ var(--lufa-*-rgb) references, found ${correctMatches?.length ?? 0}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ RGB placeholders correct (${correctMatches.length} references with --lufa-*-rgb pattern)`,
      });
    }

    // Check for RGB variable documentation with CORRECT pattern
    if (!this.templateContent.includes('--lufa-primary-rgb:')) {
      this.results.push({
        passed: false,
        message: 'RGB variable examples missing or incorrect',
        details: 'Template should include --lufa-primary-rgb: (not --lufa-rgb-primary)',
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ RGB variable examples use correct naming pattern',
      });
    }

    // Check for RGB extraction guide
    if (!this.templateContent.includes('EXTRACTING RGB VALUES FROM HEX COLORS')) {
      this.results.push({
        passed: false,
        message: 'RGB extraction guide missing',
        details: 'Template should include guide for converting hex to RGB',
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ RGB extraction guide included',
      });
    }
  }

  /**
   * AC5: Templates documented with usage instructions
   */
  private validateDocumentation(): void {
    const requiredSections = [
      'LUFA DESIGN SYSTEM - TOKEN TEMPLATE',
      'PREREQUISITES: RGB VARIABLE TOKENS',
      'Use Cases:',
      'IMPLEMENTATION CHECKLIST',
      'BEST PRACTICES',
      'USAGE EXAMPLE',
      'REFERENCES',
    ];

    const missingSections = requiredSections.filter((section) => !this.templateContent.includes(section));

    if (missingSections.length > 0) {
      this.results.push({
        passed: false,
        message: 'Documentation incomplete',
        details: `Missing sections: ${missingSections.join(', ')}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ Documentation complete (${requiredSections.length} required sections)`,
      });
    }

    // Check for usage examples
    const examplePattern = /\[data-color-theme=/g;
    const examples = this.templateContent.match(examplePattern);
    if (!examples || examples.length < 3) {
      this.results.push({
        passed: false,
        message: 'Usage examples insufficient',
        details: 'Template should include multiple usage examples',
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ Usage examples provided (${examples.length} examples)`,
      });
    }

    // Check for file structure guide
    if (!this.templateContent.includes('FILE STRUCTURE GUIDE')) {
      this.results.push({
        passed: false,
        message: 'File structure guide missing',
        details: 'Template should explain where to place tokens in file structure',
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ File structure guide included',
      });
    }
  }

  /**
   * AC6: Templates cover all 3 modes: light, dark, high-contrast
   */
  private validateModeSupport(): void {
    const requiredModes = ['light', 'dark', 'high-contrast'];
    const missingModes: string[] = [];

    requiredModes.forEach((mode) => {
      const pattern = new RegExp(`data-mode.*${mode}`);
      if (!pattern.test(this.templateContent)) {
        missingModes.push(mode);
      }
    });

    if (missingModes.length > 0) {
      this.results.push({
        passed: false,
        message: 'Mode support incomplete',
        details: `Missing modes: ${missingModes.join(', ')}`,
      });
    } else {
      this.results.push({
        passed: true,
        message: `✅ All 3 modes documented (${requiredModes.join(', ')})`,
      });
    }

    // Check for mode-aware shadow documentation
    if (!this.templateContent.includes('Mode-Aware Recommendations')) {
      this.results.push({
        passed: false,
        message: 'Mode-aware guidance missing',
        details: 'Template should include mode-aware recommendations for shadows',
      });
    } else {
      this.results.push({
        passed: true,
        message: '✅ Mode-aware guidance included',
      });
    }

    // Check that template correctly references ETR-001 (not ETR-002)
    if (this.templateContent.includes('ETR-002') && !this.templateContent.includes('(defined in ETR-001)')) {
      this.results.push({
        passed: false,
        message: 'Incorrect convention reference',
        details: 'Template references ETR-002 but conventions are defined in ETR-001',
      });
    } else if (this.templateContent.includes('ETR-001') || this.templateContent.includes('(defined in ETR-001)')) {
      this.results.push({
        passed: true,
        message: '✅ Correctly references ETR-001 conventions',
      });
    }
  }

  /**
   * Print validation results
   */
  private printResults(): boolean {
    const passed = this.results.filter((r) => r.passed).length;
    const failed = this.results.filter((r) => !r.passed).length;
    const total = this.results.length;

    console.log('📊 Validation Results:\n');

    // Print all results
    this.results.forEach((result) => {
      const icon = result.passed ? '✅' : '❌';
      console.log(`${icon} ${result.message}`);
      if (result.details) {
        console.log(`   ${result.details}`);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log(`\n📈 Score: ${passed}/${total} checks passed`);

    if (failed === 0) {
      console.log('\n🎉 Template validation PASSED! All acceptance criteria met.');
      return true;
    } else {
      console.log(`\n❌ Template validation FAILED: ${failed} check(s) failed.`);
      return false;
    }
  }
}

// Run validation
const templatePath = join(__dirname, '..', 'src', '_token-template.css');

try {
  const validator = new TemplateValidator(templatePath);
  const success = validator.validate();
  process.exit(success ? 0 : 1);
} catch (error) {
  console.error('❌ Validation error:', error);
  process.exit(1);
}
