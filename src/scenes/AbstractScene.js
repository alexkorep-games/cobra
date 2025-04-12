class AbstractScene {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.scene = null; // Will be initialized in subclasses
  }

  async initialize() {
    // To be implemented in subclasses
  }

  update(deltaTime) {
    // To be implemented in subclasses
  }

  dispose() {
    if (this.scene) {
      this.scene.dispose();
      this.scene = null;
    }
  }
}

export default AbstractScene;