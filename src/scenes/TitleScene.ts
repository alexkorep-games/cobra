import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/gui";
import { Button } from "@babylonjs/gui/2D/controls/button";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { Color3 } from "@babylonjs/core/Maths/math";
import AbstractScene from "./AbstractScene";
import { SceneManager } from "../core/SceneManager";

export default class TitleScene extends AbstractScene {
  constructor(sceneManager: SceneManager) {
    this.scene = null;
  }

  async initialize() {
    this.scene = new Scene(this.sceneManager.engine);
    this.scene.clearColor = new Color3(0, 0, 0);

    // Create a simple rotating box
    const box = MeshBuilder.CreateBox("box", { size: 2 }, this.scene);
    const material: StandardMaterial = new StandardMaterial("boxMaterial", this.scene);
    material.wireframe = true;
    material.emissiveColor = Color3.White();
    box.material = material;
    box.position = new Vector3(0, 0, 0);

    // Animation for the box
    this.scene.registerBeforeRender(() => {
      box.rotation.y += 0.01;
      box.rotation.x += 0.005;
    });

    // Create GUI
    const guiTexture: AdvancedDynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const newGameButton = Button.CreateSimpleButton("newGame", "New Game");
    newGameButton.width = "150px";
    newGameButton.height = "40px";
    newGameButton.color = "white";
    newGameButton.background = "green";
    newGameButton.onPointerUpObservable.add(() => {
      this.sceneManager.switchScene("SpaceFlightScene"); // Assuming SpaceFlightScene is the key
    });
    guiTexture.addControl(newGameButton);

    const loadGameButton = Button.CreateSimpleButton("loadGame", "Load Game");
    loadGameButton.width = "150px";
    loadGameButton.height = "40px";
    loadGameButton.color = "white";
    loadGameButton.background = "blue";
    loadGameButton.top = "60px";
    loadGameButton.onPointerUpObservable.add(() => {
      // Load game logic here (not implemented in this example)
      console.log("Load Game clicked");
    });
    guiTexture.addControl(loadGameButton);

    return this.scene;
  }

  dispose() {
    this.scene.dispose();
  }

  update() {
    // Any per-frame updates for the title scene can go here
  }
}