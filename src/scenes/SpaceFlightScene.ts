import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import AbstractScene from './AbstractScene';
import { ShipFactory } from '../graphics/ShipFactory';
import InputManager from '../systems/InputManager';
import * as constants from '../utils/constants';
import SceneManager from '../core/SceneManager';

export default class SpaceFlightScene extends AbstractScene {
    playerShip: BABYLON.Mesh | null = null;
    camera: BABYLON.FreeCamera | null = null;
    hud: GUI.AdvancedDynamicTexture | null = null;
    creditsLabel: GUI.TextBlock | null = null;
    player: { credits: number };
    inputManager: InputManager;
    engine: BABYLON.Engine;

    constructor(sceneManager: SceneManager) {
        super(sceneManager);
        this.player = { credits: 1000 };
    }
    
    async initialize(): Promise<void> {
        this.engine = this.sceneManager.engine;
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

        // Create and position the camera first
        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(this.engine.getRenderingCanvas(), true);

        // Player Ship - using static method
        this.playerShip = ShipFactory.createWireframeShip("CobraMk3", this.scene);
        this.playerShip.position = new BABYLON.Vector3(0, 0, 0);
        
        // Attach camera to ship
        this.camera.parent = this.playerShip;

        // Simple lighting
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;

        // Initialize input manager
        this.inputManager = new InputManager(this.scene);
        this.setupControls();

        // Setup HUD
        this.setupHUD();

        // Ensure scene is ready
        await this.scene.whenReadyAsync();
    }

    setupControls() {
        this.inputManager.mapAction("KeyW", "forward");
        this.inputManager.mapAction("KeyS", "backward");
        this.inputManager.mapAction("KeyA", "left");
        this.inputManager.mapAction("KeyD", "right");
        this.inputManager.mapAction("Space", "up");
        this.inputManager.mapAction("KeyC", "down");

        this.inputManager.subscribeToAction("forward", (isDown) => {
            if (this.playerShip && isDown) {
                this.playerShip.position.z += 0.1;
            }
        });

        this.inputManager.subscribeToAction("backward", (isDown) => {
            if (this.playerShip && isDown) {
                this.playerShip.position.z -= 0.1;
            }
        });

        this.inputManager.subscribeToAction("left", (isDown) => {
            if (this.playerShip && isDown) {
                this.playerShip.rotation.y -= 0.1;
            }
        });

        this.inputManager.subscribeToAction("right", (isDown) => {
            if (this.playerShip && isDown) {
                this.playerShip.rotation.y += 0.1;
            }
        });
    }

    setupHUD() {
        this.hud = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        this.creditsLabel = new GUI.TextBlock();
        this.creditsLabel.text = `Credits: ${this.player.credits}`;
        this.creditsLabel.color = "white";
        this.creditsLabel.fontSize = 24;
        this.creditsLabel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.creditsLabel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.creditsLabel.paddingLeft = "20px";
        this.creditsLabel.paddingTop = "20px";
        this.hud.addControl(this.creditsLabel);
    }

    update() {
        if (this.creditsLabel) {
            this.creditsLabel.text = `Credits: ${this.player.credits}`;
        }
    }

    dispose() {
        if (this.scene) {
            this.scene.dispose();
        }
        if (this.inputManager) {
            this.inputManager.clearActions();
        }
    }
}