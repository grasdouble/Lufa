/**
 * Lufa Design System v2 - Main Exports
 *
 * This is the NEW design system based on Token Architecture v2.
 * Built with utilities system for performance and flexibility.
 *
 * Phase 5A Components (7 foundational components):
 * - Box, Text, Stack (layout primitives with utilities)
 * - Icon, Button, Badge, Divider (UI components with fixed variants)
 *
 * @see packages/design-system/main-legacy for legacy components
 */

// ============================================
// PHASE 5A - FOUNDATIONAL COMPONENTS
// ============================================

// Layout Primitives (with utilities)
export { Box } from './Box';
export type { BoxProps } from './Box';

export { Text } from './Text';
export type { TextProps } from './Text';

export { Stack } from './Stack';
export type { StackProps } from './Stack';

// UI Components
export { Icon } from './Icon';
export type { IconProps, IconName } from './Icon';

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Divider } from './Divider';
export type { DividerProps } from './Divider';

// ============================================
// FUTURE PHASES
// ============================================
// Additional components will be added in Phase 6+
// Legacy components from main-legacy will be recreated with new architecture
