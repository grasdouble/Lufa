/**
 * Custom Transform: Detect Responsive Tokens
 *
 * Identifies tokens with responsive variants (base, md, lg) and marks them
 * for special handling in the CSS format.
 *
 * A token is considered "responsive" if:
 * - Its last path segment matches a known breakpoint name (base, sm, md, lg, xl, 2xl)
 *
 * This uses "convention over configuration" - responsive tokens are detected
 * by their naming pattern rather than requiring explicit metadata.
 */

/**
 * Valid breakpoint names
 */
const VALID_BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

/**
 * Get the last segment of a token's path
 * @param {object} token - Style Dictionary token
 * @returns {string} - Last path segment
 */
const getLastPathSegment = (token) => {
  const path = token.path || [];
  return path[path.length - 1] || '';
};

/**
 * Check if a token is a responsive variant
 * @param {object} token - Style Dictionary token
 * @returns {boolean}
 */
export const isResponsiveToken = (token) => {
  const lastSegment = getLastPathSegment(token);
  return VALID_BREAKPOINTS.includes(lastSegment);
};

/**
 * Get the breakpoint for a responsive token
 * @param {object} token - Style Dictionary token
 * @returns {string|null} - Breakpoint name (base, md, lg, etc.) or null
 */
export const getTokenBreakpoint = (token) => {
  if (!isResponsiveToken(token)) {
    return null;
  }
  return getLastPathSegment(token);
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
