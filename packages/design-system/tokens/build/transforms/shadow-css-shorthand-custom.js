/**
 * Custom shadow/css/shorthand transform that doesn't call size/rem internally
 * 
 * This replaces the built-in shadow/css/shorthand to avoid warnings with fluid clamp() tokens.
 * Converts shadow objects to CSS shorthand: "0px 2px 4px 0px rgba(0,0,0,0.1)"
 */

export const shadowCssShorthandCustom = {
  type: 'value',
  name: 'shadow/css/shorthand-custom',
  transitive: true,
  filter: (token) => {
    return token.$type === 'shadow' || token.type === 'shadow';
  },
  transform: (token) => {
    const value = token.$value || token.value;
    
    // If already a string, return as-is
    if (typeof value === 'string') {
      return value;
    }
    
    // If it's an array of shadows, process each
    if (Array.isArray(value)) {
      return value.map(shadow => formatShadow(shadow)).join(', ');
    }
    
    // Single shadow object
    if (typeof value === 'object') {
      return formatShadow(value);
    }
    
    return value;
  },
};

/**
 * Format a single shadow object to CSS string
 */
function formatShadow(shadow) {
  const {
    offsetX = '0',
    offsetY = '0',
    blur = '0',
    spread = '0',
    color = 'transparent',
    inset = false
  } = shadow;
  
  const parts = [
    inset ? 'inset' : null,
    offsetX,
    offsetY,
    blur,
    spread,
    color
  ].filter(Boolean);
  
  return parts.join(' ');
}

export default shadowCssShorthandCustom;
