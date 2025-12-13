import sharedConfig from '@grasdouble/lufa_config_prettier/prettier.config.mjs';

/**
 * @type {import("prettier").Config}
 */
const config = {
    ...sharedConfig,
    plugins: [...(sharedConfig.plugins || []), 'prettier-plugin-tailwindcss'],
};

export default config;
