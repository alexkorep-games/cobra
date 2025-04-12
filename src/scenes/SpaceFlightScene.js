import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import AbstractScene from './AbstractScene';
import ShipFactory from '../graphics/ShipFactory';
import InputManager from '../systems/InputManager';
import { constants } from '../utils/constants'; // Assuming constants.js exists

export default class SpaceFlightScene extends AbstractScene {
    constructor(sceneManager) {
        super(sceneManager);
        this.playerShip = null;
        this.camera = null;
        this.hud = null;
        this.player = { // Placeholder for player data, replace with StateManager
            credits: 1000,
        };
    }

    async initialize() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); // Black background

        // Camera
        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // Player Ship
        const shipFactory = new ShipFactory(this.scene);
        this.playerShip = shipFactory.createShip("CobraMk3"); // Assuming CobraMk3 is a ship type
        this.playerShip.position = new BABYLON.Vector3(0, 0, 0);
        this.camera.parent = this.playerShip;

        // Starfield
        const starfieldMaterial = new BABYLON.StandardMaterial("starfieldMaterial", this.scene);
        starfieldMaterial.emissiveTexture = new BABYLON.Texture("assets/textures/starfield.png", this.scene); // Replace with actual texture path
        starfieldMaterial.disableLighting = true;

        const starfield = BABYLON.MeshBuilder.CreateSphere("starfield", { diameter: 1000, segments: 32 }, this.scene);
        starfield.material = starfieldMaterial;
        starfield.infiniteDistance = true;

        // Lighting (Optional, for subtle effects if needed)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;

        // Input
        this.inputManager = new InputManager(this.scene);
        this.setupControls();

        // HUD
        this.setupHUD();
    }

    setupControls() {
        this.inputManager.registerAction("forward", ["w", "W"], () => {
            this.playerShip.moveWithCollisions(this.playerShip.forward.scale(0.1));
        });

        this.inputManager.registerAction("backward", ["s", "S"], () => {
            this.playerShip.moveWithCollisions(this.playerShip.forward.scale(-0.05));
        });

        this.inputManager.registerAction("left", ["a", "A"], () => {
            this.playerShip.rotate(BABYLON.Axis.Y, -0.05);
        });

        this.inputManager.registerAction("right", ["d", "D"], () => {
            this.playerShip.rotate(BABYLON.Axis.Y, 0.05);
        });

        this.inputManager.registerAction("up", [" "], () => {  // Spacebar for up
            this.playerShip.moveWithCollisions(new BABYLON.Vector3(0, 0.1, 0));
        });

        this.inputManager.registerAction("down", ["c", "C"], () => {  // C for down
            this.playerShip.moveWithCollisions(new BABYLON.Vector3(0, -0.1, 0));
        });
    }


    setupHUD() {
        this.hud = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const creditsLabel = new GUI.TextBlock();
        creditsLabel.text = `Credits: ${this.player.credits}`;
        creditsLabel.color = "white";
        creditsLabel.fontSize = 24;
        creditsLabel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        creditsLabel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        creditsLabel.paddingLeft = "20px";
        creditsLabel.paddingTop = "20px";
        this.hud.addControl(creditsLabel);

        this.creditsLabel = creditsLabel; // Store for updating

        // More HUD elements can be added here later...
    }


    update() {
        if (this.creditsLabel) {
            this.creditsLabel.text = `Credits: ${this.player.credits}`; // Update from StateManager in final implementation
        }
    }

    dispose() {
        this.scene.dispose();
        // Dispose of any specific resources here if needed, like materials, textures, etc.
    }

    // Method to transition to other scenes, e.g., DockedScene
    goToDockedScene() {
        this.sceneManager.switchScene("DockedScene");
    }
}