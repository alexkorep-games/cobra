import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import AbstractScene from './AbstractScene'; // Assuming AbstractScene exists

export default class LoadingScene extends AbstractScene {
    constructor(engine, sceneManager) {
        super(engine, sceneManager);
        this.scene = null;
    }

    async initialize() {
        this.scene = new BABYLON.Scene(this.engine);

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const loadingText = new GUI.TextBlock();
        loadingText.text = "Loading...";
        loadingText.color = "white";
        loadingText.fontSize = 24;
        advancedTexture.addControl(loadingText);

        return this.scene;
    }

    transitionToTitle() {
        this.sceneManager.switchScene("Title");
    }
}