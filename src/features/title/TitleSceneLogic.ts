// src/features/title/TitleSceneLogic.ts
import * as THREE from "three"; // Keep THREE for Vector3 etc. if needed elsewhere
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";
import * as Constants from "../../constants"; // Import constants if needed directly

// Keep ship scale consistent or access via game.constants if needed elsewhere
const shipScale = 6;

export class TitleSceneLogic extends SceneLogicBase {
  private currentShipIndex: number = 0;
  private shipDisplayTimer: number = 0;

  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState); // Calls resetCommonVisibility

    // Ensure all title ships start hidden (redundant with resetCommonVisibility but safe)
    this.game.assets.titleShips.forEach(ship => ship.setVisible(false));

    this.currentShipIndex = 0; // Reset index
    this.shipDisplayTimer = 0; // Reset timer
    this.prepareNextTitleShip(); // Prepare the *first* valid ship

    // Show and position the planet using entity methods/properties
    if (this.game.assets.planet) {
        this.game.assets.planet.setVisible(true);
        // Adjust position/scale via entity if needed, or rely on default/previous state
        this.game.assets.planet.setPosition(200, 0, -500);
        this.game.assets.planet.setScale(1, 1, 1); // Assuming default scale is okay
    }

    this.game.introMusicRef.current
      ?.play()
      .catch((e) => console.warn("Intro music play failed:", e));
  }

  exit(nextState?: GameState): void {
    super.exit(nextState); // Handles timeout clear
    this.resetHud(); // Ensure HUD is reset

    // Hide the currently displayed ship (if any)
    const currentShipEntity = this.game.assets.titleShips[this.currentShipIndex];
    currentShipEntity?.setVisible(false);

    // Hide the planet
    this.game.assets.planet?.setVisible(false);

    // Stop music
    this.game.introMusicRef.current?.pause();
    if (this.game.introMusicRef.current)
      this.game.introMusicRef.current.currentTime = 0;
  }

  update(deltaTime: number): void {
    // Delegate animation logic to helper method within this class
    this.updateTitleShipAnimation(deltaTime);
    // Note: Planet rotation is handled by Planet.update called in GameManager.animate
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    if (!this.inputProcessed) {
      if (event.type === "keydown" || event.type === "mousedown") {
        this.inputProcessed = true;
        this.game.switchState("credits"); // Go to credits after title input
      }
    }
  }

  // --- Title Scene Animation Helpers (Moved from GameManager) ---

  prepareNextTitleShip() {
    const shipEntity = this.game.assets.titleShips[this.currentShipIndex];
    if (shipEntity?.mesh) { // Check if ship and its mesh exist
      const startZ = this.game.constants.START_Z * (shipScale > 1 ? 2 : 1);
      // Use entity methods or direct mesh access for positioning
      shipEntity.setPosition(
        this.game.constants.TARGET_POS.x,
        this.game.constants.TARGET_POS.y,
        startZ
      );
      shipEntity.setRotation(0, Math.PI, 0);
      shipEntity.setVisible(true);
    } else {
      console.warn(
        `Ship entity or mesh at index ${this.currentShipIndex} is missing. Attempting next.`
      );
      this.advanceTitleShip();
    }
  }

  advanceTitleShip() {
    if (this.game.assets.titleShips.length === 0) return; // No ships

    const currentShipEntity = this.game.assets.titleShips[this.currentShipIndex];
    currentShipEntity?.setVisible(false); // Hide the old one using entity method

    // Find the next valid index (checking if entity and its mesh exist)
    let nextIndex = (this.currentShipIndex + 1) % this.game.assets.titleShips.length;
    let attempts = 0; // Prevent infinite loop if no valid ships
    while (
      (!this.game.assets.titleShips[nextIndex]?.mesh &&
       attempts < this.game.assets.titleShips.length)
    ) {
      nextIndex = (nextIndex + 1) % this.game.assets.titleShips.length;
      attempts++;
    }

    if (!this.game.assets.titleShips[nextIndex]?.mesh) {
      console.warn("No valid title ships available to display.");
      // Optionally hide all ships or handle error
      this.game.assets.titleShips.forEach(ship => ship?.setVisible(false));
      this.currentShipIndex = 0; // Reset index
      this.shipDisplayTimer = 0;
      return;
    }

    this.currentShipIndex = nextIndex;
    this.shipDisplayTimer = 0;
    this.prepareNextTitleShip(); // Prepare the newly selected valid ship
  }

  updateTitleShipAnimation(deltaTime: number) {
    const currentShipEntity = this.game.assets.titleShips[this.currentShipIndex];

    // Ensure the current entity and its mesh are valid
    if (!currentShipEntity?.mesh) {
      console.warn(
        `Current ship entity or mesh invalid (index ${this.currentShipIndex}) during animation update.`
      );
      this.advanceTitleShip(); // Try to recover
      return;
    }

    this.shipDisplayTimer += deltaTime;
    const currentShipMesh = currentShipEntity.mesh; // Use the mesh for direct manipulation

    // --- Animation Logic (manipulating the mesh directly) ---
    const timer = this.shipDisplayTimer;
    const startZ = this.game.constants.START_Z * (shipScale > 1 ? 2 : 1);
    const targetZ = this.game.constants.TARGET_POS.z;

    if (timer < this.game.constants.FLY_IN_DURATION) {
      const t = Math.min(1, timer / this.game.constants.FLY_IN_DURATION);
      currentShipMesh.position.z = THREE.MathUtils.lerp(startZ, targetZ, t);
      currentShipMesh.rotation.y += 0.1 * deltaTime; // Keep rotation direct for now
    } else if (
      timer <
      this.game.constants.FLY_IN_DURATION + this.game.constants.HOLD_DURATION
    ) {
      currentShipMesh.position.z = targetZ;
      currentShipMesh.rotation.y += 0.5 * deltaTime;
      currentShipMesh.rotation.x += 0.25 * deltaTime;
    } else if (timer < this.game.constants.TOTAL_CYCLE_DURATION) {
      const flyOutTimer =
        timer - (this.game.constants.FLY_IN_DURATION + this.game.constants.HOLD_DURATION);
      const t = Math.min(1, flyOutTimer / this.game.constants.FLY_OUT_DURATION);
      currentShipMesh.position.z = THREE.MathUtils.lerp(targetZ, startZ, t);
      currentShipMesh.rotation.y += 0.1 * deltaTime;
    } else {
      currentShipMesh.position.z = startZ; // Ensure it's fully out before advancing
    }
    // --- End Animation Logic ---

    // Cycle to next ship
    if (this.shipDisplayTimer >= this.game.constants.TOTAL_CYCLE_DURATION) {
      this.advanceTitleShip(); // Advances index, resets timer, prepares next
    }
  }
}