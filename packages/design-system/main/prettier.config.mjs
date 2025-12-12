import sharedConfig from '@grasdouble/lufa_config_prettier/prettier.config.mjs';

/**
 * @type {import("prettier").Config}
 */
const config = {
    ...sharedConfig,
    plugins: ['prettier-plugin-tailwindcss', ...sharedConfig.plugins],
};

export default config;
