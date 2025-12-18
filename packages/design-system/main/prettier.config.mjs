import sharedConfig from '@grasdouble/lufa_config_prettier/prettier.config.mjs';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...sharedConfig,
  plugins: [...sharedConfig.plugins],
};

export default config;
