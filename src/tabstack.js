function TabStack(selector) {
  this.container = document.querySelector(selector);
  if (!this.container) {
    console.error(`TabStack: No container found for selector '${selector}'`);
    return;
  }

  this.tabs = Array.from(this.container.querySelectorAll("li a"));
  if (!this.tabs) {
    console.error(`TabStack: No tabs found inside the container`);
    return;
  }

  this.panels = this.tabs
    .map((tab) => {
      const panel = document.querySelector(tab.getAttribute("href"));
      if (!panel) {
        console.error(
          `TabStack: No panel found for selector '${tab.getAttribute("href")}'`,
        );
      }
      return panel;
    })
    .filter(Boolean);

  if (this.tabs.length !== this.panels.length) return;

  this._init();
}

TabStack.prototype._init = function () {
  const tabActive = this.tabs[0];
  tabActive.closest("li").classList.add("tabstack--active");
  this.panels.forEach((panel) => (panel.hidden = true));

  this.tabs.forEach((tab) => {
    tab.onclick = (event) => this._handleTabClick(event, tab);
  });

  const panelActive = this.panels[0];
  panelActive.hidden = false;
};

TabStack.prototype._handleTabClick = function (event, tab) {
  event.preventDefault();

  this.tabs.forEach((tab) => {
    tab.closest("li").classList.remove("tabstack--active");
  });

  tab.closest("li").classList.add("tabstack--active");

  this.panels.forEach((panel) => (panel.hidden = true));
  const panelActive = document.querySelector(tab.getAttribute("href"));
  panelActive.hidden = false;
};
