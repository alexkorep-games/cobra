export default class UIManager {
  constructor() {
    this.panels = {};
  }

  registerPanel(name, elementId) {
    this.panels[name] = document.getElementById(elementId);
    if (!this.panels[name]) {
      console.warn(`UIManager: Panel element with ID "${elementId}" not found.`);
    }
  }

  showPanel(name) {
    const panel = this.panels[name];
    if (panel) {
      panel.style.display = "block";
    } else {
      console.warn(`UIManager: Panel "${name}" not registered.`);
    }
  }

  hidePanel(name) {
    const panel = this.panels[name];
    if (panel) {
      panel.style.display = "none";
    } else {
      console.warn(`UIManager: Panel "${name}" not registered.`);
    }
  }

  updatePanelContent(name, content) {
    const panel = this.panels[name];
    if (panel) {
      panel.innerHTML = content; // Basic update, could be improved with data binding
    } else {
      console.warn(`UIManager: Panel "${name}" not registered.`);
    }
  }
}