import { useState } from 'react';

import { Button, Modal } from '@grasdouble/lufa_design-system';

// Test wrapper for backdrop click
export const ModalWithBackdropClick = () => {
  const [closed, setClosed] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setClosed(true);
    setOpen(false);
  };

  return (
    <div>
      <div data-testid="close-status">{closed ? 'closed' : 'open'}</div>
      <Modal open={open} onClose={handleClose}>
        <p>Content</p>
      </Modal>
    </div>
  );
};

// Test wrapper for toggling visibility
export const ModalToggleFixture = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Toggle Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Toggle Test">
        <p>Modal content</p>
      </Modal>
      <div data-testid="modal-state">{open ? 'visible' : 'hidden'}</div>
    </>
  );
};

// Test wrapper for body scroll lock
export const ModalBodyScrollFixture = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div style={{ height: '3000px', background: '#f0f0f0' }}>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <p>Long content to enable scrolling</p>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Scroll Test">
        <p>Modal content</p>
      </Modal>
    </div>
  );
};
