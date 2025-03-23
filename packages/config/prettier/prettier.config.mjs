/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    plugins: ['prettier-plugin-tailwindcss'],
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
};

export default config;
