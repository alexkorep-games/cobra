import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";

class SceneManager {
  engine: Engine;
  scenes: { [key: string]: any };
  currentScene: any;

  constructor(engine: Engine) {
    this.engine = engine; 
    this.scenes = {}; 
    this.currentScene = null; 
  }

  addScene(name: string, scene: any): void {
    this.scenes[name] = scene;
  }

  getScene(name: string): any {
    return this.scenes[name];
  }

  async switchScene(name: string, sceneData: any = null): Promise<Scene | void> {
    if (this.currentScene) {
      this.unloadScene();
    }

    const scene = this.scenes[name]; 
    if (!scene) {
      console.error(`Scene "${name}" not found.`);
      return;
    }

    this.currentScene = scene;
    await scene.initialize();
    
    const babylonScene = scene.scene;
    if (babylonScene) {
      // Ensure the scene is ready before rendering
      await babylonScene.whenReadyAsync();
      
      if (scene.onEnter) {
        await scene.onEnter(sceneData);
      }
    }
    
    return babylonScene;
  }

  unloadScene(): void {
    if (this.currentScene && this.currentScene.scene) {
      if (this.currentScene.onExit) {
        this.currentScene.onExit();
      }
      this.currentScene.dispose();
      this.currentScene = null; 
    }
  }

  getCurrentScene(): Scene | null {
    return this.currentScene ? this.currentScene.scene : null;
  }
}

export default SceneManager;