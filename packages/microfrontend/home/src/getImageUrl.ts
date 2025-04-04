export function getImageUrl(filename: string): string {
  // note that this does not include files in subdirectories
  const path = `./assets/${filename}`;
  return new URL(path, import.meta.url).href;
}
