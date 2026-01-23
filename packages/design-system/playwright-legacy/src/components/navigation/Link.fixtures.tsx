import { useRef, useState } from 'react';

import { Link } from '@grasdouble/lufa_design-system';

// Test fixture icons for Link component tests
export const HomeIcon = () => <span data-testid="home-icon">🏠</span>;
export const ArrowIcon = () => <span data-testid="arrow-icon">→</span>;

// Test wrapper for onClick handler
export const LinkWithClickHandler = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div data-testid="status">{clicked ? 'clicked' : 'not-clicked'}</div>
      <Link href="#" onClick={() => setClicked(true)}>
        Click
      </Link>
    </>
  );
};

// Test wrapper for onMouseEnter handler
export const LinkWithHoverHandler = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div data-testid="hover-status">{hovered ? 'hovered' : 'not-hovered'}</div>
      <Link href="#" onMouseEnter={() => setHovered(true)}>
        Hover
      </Link>
    </>
  );
};

// Test wrapper for ref forwarding
export const LinkWithRef = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tagName, setTagName] = useState('');

  return (
    <>
      <div data-testid="tag-name">{tagName}</div>
      <button data-testid="check-ref" onClick={() => setTagName(ref.current?.tagName ?? 'null')}>
        Check Ref
      </button>
      <Link href="#" ref={ref}>
        Test Link
      </Link>
    </>
  );
};
