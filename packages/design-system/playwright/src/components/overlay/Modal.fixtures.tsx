import type { ComponentProps } from 'react';
import { useState } from 'react';

import { Modal } from '@grasdouble/lufa_design-system';

export const ModalWithCloseFixture = (props: ComponentProps<typeof Modal>) => {
  const [closed, setClosed] = useState(false);
  return (
    <div>
      <Modal
        {...props}
        onClose={() => {
          setClosed(true);
          props.onClose?.();
        }}
      />
      <div data-testid="close-status">{closed ? 'closed' : 'open'}</div>
    </div>
  );
};

export const ModalWithBackdropClickFixture = (props: ComponentProps<typeof Modal> & { testId?: string }) => {
  const [clickCount, setClickCount] = useState(0);
  const { testId = 'click-count', ...modalProps } = props;

  return (
    <div>
      <Modal
        {...modalProps}
        onClose={() => {
          setClickCount((prev) => prev + 1);
          props.onClose?.();
        }}
      />
      <div data-testid={testId}>{clickCount}</div>
    </div>
  );
};
