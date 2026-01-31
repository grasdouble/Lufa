import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export type PortalProps = {
  /**
   * The content to render inside the portal.
   */
  children: ReactNode;
  /**
   * The container element to render into.
   * Defauts to document.body
   */
  container?: HTMLElement | null;
};

/**
 * Portal Component
 *
 * Renders children into a DOM node that exists outside the DOM hierarchy of the parent component.
 * Useful for Modals, Tooltips, Popovers, etc.
 *
 * @example
 * ```tsx
 * <Portal>
 *   <div className="modal">I am in the body!</div>
 * </Portal>
 * ```
 */
export const Portal = ({ children, container }: PortalProps) => {
  if (typeof document === 'undefined') {
    return null;
  }

  const mountNode = container ?? document.body;

  return createPortal(children, mountNode);
};

Portal.displayName = 'Portal';
