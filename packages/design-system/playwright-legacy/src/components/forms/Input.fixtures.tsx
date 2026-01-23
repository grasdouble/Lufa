import type { ComponentProps } from 'react';
import { useState } from 'react';

import { Input } from '@grasdouble/lufa_design-system';

export const InputWithOnChangeFixture = (props: ComponentProps<typeof Input>) => {
  const [value, setValue] = useState('');
  return (
    <div>
      <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
      <div data-testid="output-value">{value}</div>
    </div>
  );
};
