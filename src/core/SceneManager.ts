import { Scene } from "@babylonjs/core/scene";

class SceneManager {
  engine: any;
  scenes: { [key: string]: any };
  currentScene: any;

  constructor(engine: any) {
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
    if (scene.scene) {
      scene.scene.render(); 
      if (scene.onEnter) { 
        await scene.onEnter(sceneData);
      }
    } else {
      scene.scene = await scene.createScene(this.engine, sceneData);
      if (scene.onEnter) { 
        await scene.onEnter(sceneData);
      }
    }
    return scene.scene;
  }


  unloadScene(): void {
    if (this.currentScene && this.currentScene.scene) {
      if (this.currentScene.onExit) {
        this.currentScene.onExit();
      }
      this.currentScene.scene.dispose();
      this.currentScene = null; 
    }
  }

  getCurrentScene(): Scene | null {
    return this.currentScene ? this.currentScene.scene : null;
  }
}

export default SceneManager;