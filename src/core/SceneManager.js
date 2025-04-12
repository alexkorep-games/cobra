class SceneManager {
  constructor(engine) {
    this.engine = engine;
    this.scenes = {};
    this.currentScene = null;
  }

  addScene(name, scene) {
    this.scenes[name] = scene;
  }

  getScene(name) {
    return this.scenes[name];
  }

  async switchScene(name, sceneData = null) {
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
      scene.scene.render(); // Render if the scene is already created
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


  unloadScene() {
    if (this.currentScene && this.currentScene.scene) {
      if (this.currentScene.onExit) {
        this.currentScene.onExit();
      }
      this.currentScene.scene.dispose();
      this.currentScene = null;
    }
  }

  getCurrentScene() {
    return this.currentScene ? this.currentScene.scene : null;
  }
}

export default SceneManager;