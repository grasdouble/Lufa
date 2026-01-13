import React from 'react';
import tokens from '@grasdouble/lufa_design-system-tokens';

export interface StorybookEmbedProps {
  /** Story ID from Storybook (e.g., "2-layout-stack--default") */
  storyId: string;
  /** Height of the iframe */
  height?: string | number;
  /** Show Storybook controls panel */
  showControls?: boolean;
  /** Storybook base URL */
  storybookUrl?: string;
}

/**
 * Embeds a Storybook story in an iframe
 *
 * @example
 * ```tsx
 * <StorybookEmbed storyId="2-layout-stack--default" />
 * ```
 */
export const StorybookEmbed: React.FC<StorybookEmbedProps> = ({
  storyId,
  height = 500,
  showControls = false,
  storybookUrl = 'http://localhost:6006',
}) => {
  const iframeSrc = `${storybookUrl}/iframe.html?id=${storyId}&viewMode=story${showControls ? '' : '&args=&globals='}`;

  const heightValue = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      style={{
        width: tokens.maxWidth.full,
        marginBottom: tokens.spacing.lg,
        border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
        borderRadius: tokens.radius.base,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={iframeSrc}
        width={tokens.maxWidth.full}
        height={heightValue}
        style={{
          border: tokens.borderWidth.none,
          display: 'block',
        }}
        title={`Storybook: ${storyId}`}
      />
    </div>
  );
};
