// Import styles, initialize component theme here.
// import '../src/common.css';
import '@grasdouble/lufa_design-system/style.css';

// Apply default theme attribute so CSS custom properties under [data-theme]
// resolve correctly. An empty string matches the [data-theme] selector used
// by the design system token cascade (same behaviour as Storybook default).
document.documentElement.setAttribute('data-theme', '');

// Bridge prefers-color-scheme (set by Playwright's colorScheme option)
// to data-mode attribute (used by the design system token selectors).
const mql = window.matchMedia('(prefers-color-scheme: dark)');
const applyMode = () => {
  document.documentElement.setAttribute('data-mode', mql.matches ? 'dark' : 'light');
};
applyMode();
mql.addEventListener('change', applyMode);
