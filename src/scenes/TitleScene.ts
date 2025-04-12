import * as BABYLON from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { AdvancedDynamicTexture, Button, TextBlock } from "@babylonjs/gui";
import AbstractScene from "./AbstractScene";
import SceneManager from "../core/SceneManager";

export default class TitleScene extends AbstractScene {
    engine: any;

    constructor(sceneManager: SceneManager) {
        super(sceneManager);
        this.engine = sceneManager.engine;
    }

    async initialize(): Promise<void> {
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);

        // Create a simple rotating box
        const box = MeshBuilder.CreateBox("box", { size: 2 }, this.scene);
        const material = new StandardMaterial("boxMaterial", this.scene);
        material.wireframe = true;
        material.emissiveColor = new Color3(1, 1, 1);
        box.material = material;
        box.position = new Vector3(0, 0, 0);

        // Add a camera for this scene
        const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 3, 10, Vector3.Zero(), this.scene);
        camera.attachControl(this.engine.getRenderingCanvas(), true);

        // Animation for the box
        this.scene.registerBeforeRender(() => {
            box.rotation.y += 0.01;
            box.rotation.x += 0.005;
        });

        // Create GUI
        const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

        // Add title text
        const titleText = new TextBlock();
        titleText.text = "Project Cobra";
        titleText.color = "white";
        titleText.fontSize = 48;
        titleText.top = "-100px";
        guiTexture.addControl(titleText);

        const newGameButton = Button.CreateSimpleButton("newGame", "New Game");
        newGameButton.width = "150px";
        newGameButton.height = "40px";
        newGameButton.color = "white";
        newGameButton.background = "green";
        newGameButton.onPointerUpObservable.add(async () => {
            await this.sceneManager.switchScene("SpaceFlightScene");
        });
        guiTexture.addControl(newGameButton);

        const loadGameButton = Button.CreateSimpleButton("loadGame", "Load Game");
        loadGameButton.width = "150px";
        loadGameButton.height = "40px";
        loadGameButton.color = "white";
        loadGameButton.background = "blue";
        loadGameButton.top = "60px";
        loadGameButton.onPointerUpObservable.add(() => {
            console.log("Load Game clicked");
            // TODO: Implement load game functionality
        });
        guiTexture.addControl(loadGameButton);

        // Ensure scene is ready
        await this.scene.whenReadyAsync();
    }

    dispose(): void {
        if (this.scene) {
            this.scene.dispose();
        }
    }
}