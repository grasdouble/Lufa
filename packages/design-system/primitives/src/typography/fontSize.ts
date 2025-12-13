export const fontSize = {
  12: "0.75rem", // xs - 12px - Secondary labels only - not for primary content
  14: "0.875rem", // sm - 14px - Captions, metadata - use sparingly
  16: "1rem", // base - 16px - WCAG recommended minimum for body text
  18: "1.125rem", // lg - 18px - Slightly larger body text
  20: "1.25rem", // xl - 20px - Large text threshold (WCAG 1.4.3)
  24: "1.5rem", // 2xl - 24px - Small headings
  30: "1.875rem", // 3xl - 30px - Medium headings
  36: "2.25rem", // 4xl - 36px - Large headings
  48: "3rem", // 5xl - 48px - Extra large headings
  60: "3.75rem", // 6xl - 60px - Display text
  72: "4.5rem", // 7xl - 72px - Large display
  96: "6rem", // 8xl - 96px - Extra large display
  128: "8rem", // 9xl - 128px - Massive display (hero sections)
} as const;

export type FontSize = keyof typeof fontSize;
