/**
 * Validation script for Token Naming Conventions documentation
 *
 * This script validates that the TOKENS_CONVENTIONS.md document
 * contains all required sections and standards.
 */

import { existsSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ConventionsValidator {
  private content: string;
  private errors: string[] = [];
  private warnings: string[] = [];

  constructor(filePath: string) {
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    this.content = readFileSync(filePath, 'utf-8');
  }

  validate(): boolean {
    console.log('🔍 Validating Token Naming Conventions...\n');

    this.validateVersion();
    this.validateAlphaTokens();
    this.validateShadowTokens();
    this.validateOverlayTokens();
    this.validateExamples();
    this.validateStructure();

    this.printResults();

    return this.errors.length === 0;
  }

  private validateVersion(): void {
    const versionPattern = /\*\*Version\*\*:\s*(\d+\.\d+)/;
    const statusPattern = /\*\*Status\*\*:\s*(Official Standard|Draft|Deprecated)/i;

    const versionMatch = versionPattern.exec(this.content);
    const statusMatch = statusPattern.exec(this.content);

    if (!versionMatch) {
      this.errors.push('❌ Metadata: Version number not found');
    } else {
      const version = versionMatch[1];
      console.log(`✅ Metadata: Version ${version} documented`);
    }

    if (!statusMatch) {
      this.warnings.push('⚠️  Metadata: Status not found');
    } else {
      const status = statusMatch[1];
      console.log(`✅ Metadata: Status "${status}" documented`);
    }
  }

  private validateAlphaTokens(): void {
    const checks = [
      {
        pattern: /--lufa-alpha-\{color\}-\{opacity\}/,
        name: 'Alpha token pattern documented',
      },
      {
        pattern: /3, 5, 8, 10, 15, 20, 30, 40, 50/,
        name: 'All 9 opacity values listed',
      },
      {
        pattern: /--lufa-alpha-primary-5/,
        name: 'Alpha token examples provided',
      },
      {
        pattern: /rgba\(var\(--lufa-[a-z]+-rgb\), 0\.\d+\)/,
        name: 'RGBA pattern with RGB variables shown',
      },
    ];

    checks.forEach((check) => {
      if (!check.pattern.test(this.content)) {
        this.errors.push(`❌ Alpha tokens: ${check.name}`);
      } else {
        console.log(`✅ Alpha tokens: ${check.name}`);
      }
    });
  }

  private validateShadowTokens(): void {
    const checks = [
      {
        pattern: /--lufa-shadow-\{size\}/,
        name: 'Shadow token pattern documented',
      },
      {
        pattern: /xs, sm, md, lg, xl/,
        name: 'All 5 shadow sizes listed',
      },
      {
        pattern: /--lufa-shadow-xs:/,
        name: 'xs shadow definition provided',
      },
      {
        pattern: /--lufa-shadow-sm:/,
        name: 'sm shadow definition provided',
      },
      {
        pattern: /--lufa-shadow-md:/,
        name: 'md shadow definition provided',
      },
      {
        pattern: /--lufa-shadow-lg:/,
        name: 'lg shadow definition provided',
      },
      {
        pattern: /--lufa-shadow-xl:/,
        name: 'xl shadow definition provided',
      },
      {
        pattern: /--lufa-shadow-color/,
        name: 'Shadow color variable documented',
      },
    ];

    checks.forEach((check) => {
      if (!check.pattern.test(this.content)) {
        this.errors.push(`❌ Shadow tokens: ${check.name}`);
      } else {
        console.log(`✅ Shadow tokens: ${check.name}`);
      }
    });
  }

  private validateOverlayTokens(): void {
    const checks = [
      {
        pattern: /--lufa-overlay-\{tone\}-\{intensity\}/,
        name: 'Overlay token pattern documented',
      },
      {
        pattern: /--lufa-overlay-light:/,
        name: 'Light overlay defined',
      },
      {
        pattern: /--lufa-overlay-dark:/,
        name: 'Dark overlay defined',
      },
      {
        pattern: /--lufa-overlay-backdrop:/,
        name: 'Backdrop overlay defined',
      },
      {
        pattern: /subtle.*default.*strong/i,
        name: 'Intensity levels explained',
      },
    ];

    checks.forEach((check) => {
      if (!check.pattern.test(this.content)) {
        this.errors.push(`❌ Overlay tokens: ${check.name}`);
      } else {
        console.log(`✅ Overlay tokens: ${check.name}`);
      }
    });
  }

  private validateExamples(): void {
    const checks = [
      {
        pattern: /\.button:hover/,
        name: 'Button hover example provided',
      },
      {
        pattern: /\.card\s*{[\s\S]*?box-shadow:/,
        name: 'Card shadow example provided',
      },
      {
        pattern: /\.modal-backdrop/,
        name: 'Modal backdrop example provided',
      },
      {
        pattern: /```css/g,
        name: 'Code examples formatted correctly',
        minCount: 10,
      },
    ];

    checks.forEach((check) => {
      if (check.minCount) {
        const matches = this.content.match(check.pattern);
        const count = matches ? matches.length : 0;
        if (count < check.minCount) {
          this.warnings.push(`⚠️  Examples: ${check.name} (found ${count}, expected ${check.minCount})`);
        } else {
          console.log(`✅ Examples: ${check.name} (${count} found)`);
        }
      } else if (!check.pattern.test(this.content)) {
        this.warnings.push(`⚠️  Examples: ${check.name}`);
      } else {
        console.log(`✅ Examples: ${check.name}`);
      }
    });
  }

  private validateStructure(): void {
    const requiredSections = [
      'Overview',
      'Alpha Token Convention',
      'Shadow Token Convention',
      'Overlay Token Convention',
      'Implementation Guidelines',
      'Migration from Hardcoded Values',
      'Validation and Testing',
      'Reference Examples',
    ];

    requiredSections.forEach((section) => {
      const pattern = new RegExp(`#+\\s*\\d*\\.?\\s*${section}`, 'i');
      if (!pattern.test(this.content)) {
        this.errors.push(`❌ Structure: Missing section "${section}"`);
      } else {
        console.log(`✅ Structure: Section "${section}" found`);
      }
    });

    // Validate theme implementation checklist items
    this.validateChecklist();
  }

  private validateChecklist(): void {
    const checklistItems = [
      {
        pattern: /All alpha opacity levels.*\(3, 5, 8, 10, 15, 20, 30, 40, 50\).*are defined/i,
        name: 'Checklist: Alpha opacity levels mentioned',
      },
      {
        pattern: /All shadow sizes.*\(xs, sm, md, lg, xl\).*are defined/i,
        name: 'Checklist: Shadow sizes mentioned',
      },
      {
        pattern: /Shadow color is mode-aware/i,
        name: 'Checklist: Mode-aware shadow colors mentioned',
      },
      {
        pattern: /Overlay tokens are defined/i,
        name: 'Checklist: Overlay tokens mentioned',
      },
      {
        pattern: /RGB color values.*alpha token/i,
        name: 'Checklist: RGB prerequisites mentioned',
      },
    ];

    checklistItems.forEach((check) => {
      if (!check.pattern.test(this.content)) {
        this.warnings.push(`⚠️  ${check.name}`);
      } else {
        console.log(`✅ ${check.name}`);
      }
    });
  }

  private printResults(): void {
    console.log('\n' + '='.repeat(60));

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:\n');
      this.warnings.forEach((warning) => console.log(warning));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:\n');
      this.errors.forEach((error) => console.log(error));
      console.log(`\n❌ Validation FAILED: ${this.errors.length} error(s) found\n`);
    } else {
      console.log('\n✅ Validation PASSED: All checks successful!\n');
      if (this.warnings.length > 0) {
        console.log(`ℹ️  ${this.warnings.length} warning(s) - review recommended but not blocking\n`);
      }
    }
  }
}

// Run validation
const conventionsPath = resolve(__dirname, '../TOKENS_CONVENTIONS.md');

try {
  const validator = new ConventionsValidator(conventionsPath);
  const success = validator.validate();
  process.exit(success ? 0 : 1);
} catch (error) {
  console.error('❌ Validation failed:', error);
  process.exit(1);
}
