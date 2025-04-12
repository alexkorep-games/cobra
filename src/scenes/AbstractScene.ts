import * as BABYLON from "@babylonjs/core";

class AbstractScene<T = any> {
  sceneManager: any; // Assuming sceneManager type is not known
  scene: BABYLON.Scene | null;

  constructor(sceneManager: any) {
    this.sceneManager = sceneManager;
    this.scene = null;
  }

  async initialize(): Promise<void> {
    // To be implemented in subclasses
  }

  update(deltaTime: number): void {
    // To be implemented in subclasses
  }

  dispose(): void {
    if (this.scene) {
      this.scene.dispose();
      this.scene = null;
    }
  }
}
export default AbstractScene;