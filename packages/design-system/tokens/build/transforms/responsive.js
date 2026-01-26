/**
 * Custom Transform: Detect Responsive Tokens
 * 
 * Identifies tokens with responsive variants (base, md, lg) and marks them
 * for special handling in the CSS format.
 * 
 * A token is considered "responsive" if:
 * - It has $extensions.lufa.responsive metadata
 * - It's part of a token group with multiple breakpoint variants
 */

/**
 * Check if a token is a responsive variant
 * @param {object} token - Style Dictionary token
 * @returns {boolean}
 */
export const isResponsiveToken = (token) => {
  const responsive = token.$extensions?.lufa?.responsive || token.original?.$extensions?.lufa?.responsive;
  return !!responsive;
};

/**
 * Get the breakpoint for a responsive token
 * @param {object} token - Style Dictionary token
 * @returns {string|null} - Breakpoint name (base, md, lg, etc.) or null
 */
export const getTokenBreakpoint = (token) => {
  const responsive = token.$extensions?.lufa?.responsive || token.original?.$extensions?.lufa?.responsive;
  return responsive?.breakpoint || null;
};

/**
 * Get the media query value for a breakpoint
 * @param {string} breakpoint - Breakpoint name
 * @returns {string|null} - Media query or null for base
 */
export const getMediaQuery = (breakpoint) => {
  const breakpoints = {
    base: null, // No media query for base (mobile-first)
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  };
  
  return breakpoints[breakpoint] || null;
};

/**
 * Transform: Add responsive metadata to tokens
 * This transform doesn't change the value, just adds metadata
 */
export const responsiveTransform = {
  name: 'attribute/responsive',
  type: 'attribute',
  transform: (token) => {
    if (isResponsiveToken(token)) {
      const breakpoint = getTokenBreakpoint(token);
      const mediaQuery = getMediaQuery(breakpoint);
      
      return {
        responsive: true,
        breakpoint,
        mediaQuery,
      };
    }
    return {};
  },
};

export default responsiveTransform;
