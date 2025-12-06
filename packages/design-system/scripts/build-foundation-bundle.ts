/**
 * Build Foundation CSS Bundle
 * 
 * This script generates a single foundation.css file that combines all
 * foundation CSS variables (colors, typography, spacing, etc.) into one file.
 * This is the base layer for themability and component styling.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const foundationDir = join(distDir, 'foundation');

// Read all foundation CSS files
const colorsCss = readFileSync(join(foundationDir, 'colors.css'), 'utf-8');
const typographyCss = readFileSync(join(foundationDir, 'typography.css'), 'utf-8');
const spacingCss = readFileSync(join(foundationDir, 'spacing.css'), 'utf-8');
const radiusCss = readFileSync(join(foundationDir, 'radius.css'), 'utf-8');
const shadowsCss = readFileSync(join(foundationDir, 'shadows.css'), 'utf-8');
const zIndexCss = readFileSync(join(foundationDir, 'zIndex.css'), 'utf-8');
const breakpointsCss = readFileSync(join(foundationDir, 'breakpoints.css'), 'utf-8');

// Combine all foundation CSS
const foundationCss = `/**
 * Lufa Design System - Foundation CSS Variables
 * 
 * This file contains all the CSS custom properties (variables) that form
 * the foundation of the design system. Import this file to get access to:
 * 
 * - Semantic color tokens (--lufa-color-*)
 * - Typography scales (--lufa-font-size-*, --lufa-font-weight-*)
 * - Spacing scale (--lufa-spacing-*)
 * - Border radius (--lufa-radius-*)
 * - Shadows (--lufa-shadow-*)
 * - Z-index layers (--lufa-z-index-*)
 * - Breakpoints (--lufa-breakpoint-*)
 * 
 * Use this for:
 * - Building custom components with design system tokens
 * - Theming applications (override these variables)
 * - Integration with existing CSS frameworks (no conflicts)
 * 
 * Component styles are separate and included automatically via CSS modules
 * when you import components from the design system.
 * 
 * @package @grasdouble/lufa_design-system
 */

/* ============================================ */
/* COLORS - Semantic color tokens              */
/* ============================================ */
${colorsCss}

/* ============================================ */
/* TYPOGRAPHY - Font scales and weights        */
/* ============================================ */
${typographyCss}

/* ============================================ */
/* SPACING - Consistent spacing scale          */
/* ============================================ */
${spacingCss}

/* ============================================ */
/* RADIUS - Border radius tokens               */
/* ============================================ */
${radiusCss}

/* ============================================ */
/* SHADOWS - Elevation and depth               */
/* ============================================ */
${shadowsCss}

/* ============================================ */
/* Z-INDEX - Layering system                   */
/* ============================================ */
${zIndexCss}

/* ============================================ */
/* BREAKPOINTS - Responsive breakpoints        */
/* ============================================ */
${breakpointsCss}
`;

// Write the combined CSS file
const outputPath = join(distDir, 'foundation.css');
writeFileSync(outputPath, foundationCss, 'utf-8');

console.log('✅ Generated foundation.css');