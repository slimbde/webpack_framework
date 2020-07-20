function createAnalytics() {
  let counter = 0;
  let isDestroyed = false;

  const listener = () => ++counter
  document.addEventListener("click", listener);

  return {
    getClicks() {
      return isDestroyed
        ? `Analytics is no longer available`
        : `Clicked ${counter} times`
    },

    destroy() {
      document.removeEventListener("click", listener);
      isDestroyed = true;
    },
  }
}

window.analytics = createAnalytics();