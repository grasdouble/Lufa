import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  const syncMode = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme) {
      document.documentElement.setAttribute('data-mode', theme);
    }
  };

  syncMode();

  const observer = new MutationObserver(syncMode);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}
