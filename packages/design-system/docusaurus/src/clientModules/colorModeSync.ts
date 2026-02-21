import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

/**
 * Syncs Docusaurus color mode (data-theme="dark"|"light" on <html>)
 * to the design system's data-mode attribute.
 *
 * Docusaurus sets data-theme="dark" in dark mode and removes/resets it in light mode.
 * The design system uses data-mode="dark"|"light" for mode-aware tokens.
 */
if (ExecutionEnvironment.canUseDOM) {
  const syncMode = () => {
    const docusaurusTheme = document.documentElement.getAttribute('data-theme');
    const mode = docusaurusTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', mode);
  };

  syncMode();

  const observer = new MutationObserver(syncMode);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}
