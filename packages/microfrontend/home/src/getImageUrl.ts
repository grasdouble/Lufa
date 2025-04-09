export function getImageUrl(filename: string): string {
  return new URL(`./assets/${filename}.webp`, import.meta.url).href;
}
