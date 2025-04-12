import { Scene } from "@babylonjs/core/scene";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector"; // Import Vector3
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera"; // Import FreeCamera
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

        // Create a basic camera. Position doesn't matter much for a UI-only scene,
        // but it needs to exist and be active.
        const camera = new FreeCamera("loadingCamera", new Vector3(0, 0, -10), this.scene);
        // Point the camera towards the scene origin (where the UI plane usually is implicitly)
        camera.setTarget(Vector3.Zero());
        // Set this camera as the active camera for the scene
        this.scene.activeCamera = camera;
        // You might not need camera controls for a loading screen, so we don't call attachControl
        // camera.attachControl(this.engine.getRenderingCanvas(), true);

        // Create and add the loading text
        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("LoadingUI", true, this.scene);
        const loadingText = new TextBlock();
        loadingText.text = "Loading...";
        loadingText.color = "white";
        loadingText.fontSize = 24;
        advancedTexture.addControl(loadingText);

        // Ensure the scene is fully ready
        // Note: 'whenReadyAsync' might not be strictly necessary if you're only loading GUI text,
        // but it doesn't hurt. If you were loading external assets (models, textures), it would be essential.
        await this.scene.whenReadyAsync();

        // After initialization and potentially loaded assets, transition to title scene
        // Using setTimeout is okay for a fixed delay, but ideally, you'd transition
        // after actual loading operations complete if you had any.
        setTimeout(() => this.transitionToTitle(), 2000);
    }

    async transitionToTitle() {
        // Ensure sceneManager is available and has the method
        if (this.sceneManager && typeof this.sceneManager.switchScene === 'function') {
             await this.sceneManager.switchScene("Title");
        } else {
            console.error("SceneManager or switchScene method not available.");
        }
    }

    dispose() {
        console.log("Disposing LoadingScene"); // Add log for debugging
        // Dispose the GUI texture first if it exists
        const uiTexture = this.scene?.getTextureByName("LoadingUI") as AdvancedDynamicTexture;
        if (uiTexture) {
            uiTexture.dispose();
        }

        // Then dispose the scene
        if (this.scene) {
            this.scene.dispose();
            // Nullify the reference after disposal
            this.scene = null;
        }
    }
}