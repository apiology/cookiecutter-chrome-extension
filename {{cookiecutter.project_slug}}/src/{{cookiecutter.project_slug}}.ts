/**
 * {{cookiecutter.project_slug}} module.
 *
 * {{ cookiecutter.project_short_description }}
 */

export const doWork = (tab: chrome.tabs.Tab) => {
  // No tabs or host permissions needed!
  const logger = platform().logger();
  logger.debug(`Turning ${tab.url} red!`);
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"',
  });
};
