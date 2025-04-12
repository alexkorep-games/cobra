import { Scene } from "@babylonjs/core/scene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";
import AbstractScene from './AbstractScene';
import SceneManager from '../core/SceneManager';

export default class LoadingScene extends AbstractScene {
    engine: any;

    constructor(sceneManager: SceneManager) {
        super(sceneManager);
        this.engine = sceneManager.engine;
    }

    async initialize(): Promise<void> {
        // Create the scene first
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);

        // Create and add the loading text
        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("LoadingUI", true, this.scene);
        const loadingText = new TextBlock();
        loadingText.text = "Loading...";
        loadingText.color = "white";
        loadingText.fontSize = 24;
        advancedTexture.addControl(loadingText);
        
        // Ensure the scene is fully ready
        await this.scene.whenReadyAsync();
        
        // After initialization and assets are loaded, transition to title scene
        setTimeout(() => this.transitionToTitle(), 2000);
    }

    async transitionToTitle() {
        await this.sceneManager.switchScene("Title");
    }

    dispose() {
        if (this.scene) {
            this.scene.dispose();
        }
    }
}