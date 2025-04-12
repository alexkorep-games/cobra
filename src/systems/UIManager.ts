export default class UIManager {
  private panels: { [key: string]: HTMLElement | null };

  constructor() {
    this.panels = {};
  }

  registerPanel(name: string, elementId: string): void {
    this.panels[name] = document.getElementById(elementId);
    if (!this.panels[name]) {
      console.warn(`UIManager: Panel element with ID "${elementId}" not found.`);
    }
  }

  showPanel(name: string): void {
    const panel = this.panels[name];
    if (panel) {
      panel.style.display = "block";
    } else {
      console.warn(`UIManager: Panel "${name}" not registered or not found in the DOM.`);
    }
  }

  hidePanel(name: string): void {
    const panel = this.panels[name];
    if (panel) {
      panel.style.display = "none";
    } else {
      console.warn(`UIManager: Panel "${name}" not registered or not found in the DOM.`);
    }
  }

  updatePanelContent(name: string, content: string): void {
    const panel = this.panels[name];
    if (panel) {
      panel.innerHTML = content;
    } else {
      console.warn(`UIManager: Panel "${name}" not registered or not found in the DOM.`);
    }
  }
}