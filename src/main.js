import { Engine } from "@babylonjs/core";
import SceneManager from "./core/SceneManager";
import LoadingScene from "./scenes/LoadingScene";

const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas, true);
const sceneManager = new SceneManager(engine);

sceneManager.addScene("loading", new LoadingScene(sceneManager));

sceneManager.switchToScene("loading");

engine.runRenderLoop(function () {
  const scene = sceneManager.getCurrentScene();
  if (scene) {
    scene.update();
    scene.scene.render();
  }
});

window.addEventListener("resize", function () {
  engine.resize();
});