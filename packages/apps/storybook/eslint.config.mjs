import storybook from 'eslint-plugin-storybook';

import lufaReactConfig from '@grasdouble/lufa_config_eslint/react.mjs';

export default [...lufaReactConfig, { ignores: ['storybook-static'] }, ...storybook.configs['flat/recommended']];
