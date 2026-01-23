import React from 'react';

/**
 * Badge to indicate that a component supports dark mode
 */
export function DarkModeCompatible(): React.ReactElement {
  return (
    <div
      className="badge badge--success"
      style={{ marginBottom: '1rem' }}
      role="status"
      aria-label="This component is compatible with dark mode"
    >
      ✓ Dark Mode Compatible
    </div>
  );
}
