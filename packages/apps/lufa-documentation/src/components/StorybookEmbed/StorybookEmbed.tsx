import React from "react";

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
  storybookUrl = "http://localhost:6006",
}) => {
  const iframeSrc = `${storybookUrl}/iframe.html?id=${storyId}&viewMode=story${
    showControls ? "" : "&args=&globals="
  }`;

  const heightValue = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <iframe
        src={iframeSrc}
        width="100%"
        height={heightValue}
        style={{
          border: "none",
          display: "block",
        }}
        title={`Storybook: ${storyId}`}
      />
    </div>
  );
};
