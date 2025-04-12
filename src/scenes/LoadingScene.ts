import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import AbstractScene from './AbstractScene.ts'; // Assuming AbstractScene exists
import { SceneManager } from '../core/SceneManager.ts';

export default class LoadingScene extends AbstractScene {
    scene: BABYLON.Scene | null = null;
    engine: BABYLON.Engine;

    constructor(sceneManager: SceneManager) {
        super(sceneManager);
        this.engine = sceneManager.engine;
    }

    async initialize(): Promise<BABYLON.Scene> {
        this.scene = new BABYLON.Scene(this.engine);
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        const loadingText = new GUI.TextBlock();
        loadingText.text = "Loading...";
        loadingText.color = "white";
        loadingText.fontSize = 24;
        advancedTexture.addControl(loadingText);
        
        return this.scene as BABYLON.Scene;
    }

    transitionToTitle() {
        this.sceneManager.switchScene("Title");
    }
}