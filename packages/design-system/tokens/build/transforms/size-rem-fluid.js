/**
 * Custom size/rem transform that handles both simple values and fluid clamp() functions
 * 
 * This transform extends the built-in size/rem transform to handle:
 * - Simple px values: "16px" → "1rem"
 * - Fluid clamp values: "clamp(1rem, 1vw, 2rem)" → pass through unchanged
 * 
 * Tokens with fluid: true extension or clamp() values are NOT matched by this transform
 */
export const sizeRemFluid = {
  type: 'value',
  name: 'size/rem/fluid',
  transitive: true,
  filter: (token) => {
    // Only process dimension tokens
    const isDimension = token.$type === 'dimension' || token.type === 'dimension';
    if (!isDimension) {
      return false;
    }
    
    const value = token.$value || token.value;
    
    // Skip tokens with clamp() - they're already in final format
    if (typeof value === 'string' && value.includes('clamp(')) {
      return false;
    }
    
    // Skip tokens marked as fluid
    if (token.$extensions?.lufa?.fluid === true || token.original?.$extensions?.lufa?.fluid === true) {
      return false;
    }
    
    // Process all other dimension tokens
    return true;
  },
  transform: (token) => {
    const value = token.$value || token.value;
    
    // Parse numeric value (handles "16px", "1.5rem", "24", etc.)
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return value; // Can't parse, return unchanged
    }
    
    // Convert to rem (assuming 16px base)
    const remValue = numValue / 16;
    return `${remValue}rem`;
  },
};
