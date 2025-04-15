// src/features/title/TitleSceneLogic.ts
import * as THREE from "three"; // Keep THREE for Vector3 etc. if needed elsewhere
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class TitleSceneLogic extends SceneLogicBase {
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState); // Calls resetCommonVisibility

    // Ensure all title ships start hidden (redundant with resetCommonVisibility but safe)
    this.game.assets.titleShips.forEach(ship => ship.setVisible(false));

    this.game.currentShipIndex = 0; // Reset index
    this.game.shipDisplayTimer = 0; // Reset timer
    this.game.prepareNextTitleShip(); // Prepare the *first* valid ship

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
    const currentShipEntity = this.game.assets.titleShips[this.game.currentShipIndex];
    currentShipEntity?.setVisible(false);

    // Hide the planet
    this.game.assets.planet?.setVisible(false);

    // Stop music
    this.game.introMusicRef.current?.pause();
    if (this.game.introMusicRef.current)
      this.game.introMusicRef.current.currentTime = 0;
  }

  update(deltaTime: number): void {
    // Delegate animation logic to GameManager helper
    this.game.updateTitleShipAnimation(deltaTime);
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
}