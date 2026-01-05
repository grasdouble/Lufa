declare module 'culori' {
  /**
   * RGB color representation with values in the range [0, 1]
   */
  export type Rgb = {
    /** Red channel: 0-1 */
    r: number;
    /** Green channel: 0-1 */
    g: number;
    /** Blue channel: 0-1 */
    b: number;
    /** Alpha channel: 0-1 (default: 1) */
    alpha?: number;
  };

  /**
   * Creates a converter function for the specified color space
   * @param space - Color space name (e.g., 'rgb', 'hsl', 'lab')
   * @returns Converter function that parses color strings to the specified space
   */
  export function converter(space: string): (input: string) => Rgb | null;
}
