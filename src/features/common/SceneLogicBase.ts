import * as THREE from "three";
import { GameState, IGameManager } from "../../types";

export class SceneLogicBase {
  game: IGameManager;
  inputProcessed: boolean = false;
  timeoutId: NodeJS.Timeout | null = null;

  constructor(game: IGameManager) {
    this.game = game;
  }

  enter(previousState?: GameState) {
    console.log(`Entering state: ${this.game.currentState}`);
    this.inputProcessed = false;
    this.resetHud(); // Reset HUD values when entering a new state
    this.resetCommonVisibility();
  }

  exit(nextState?: GameState) {
    console.log(`Exiting state: ${this.game.currentState}`);
    if (this.timeoutId) {
      console.log(
        `Clearing timeout ${this.timeoutId} for state ${this.game.currentState}`
      );
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  protected resetHud() {
    this.game.reactSetSpeed(0);
    this.game.reactSetRoll(0);
    this.game.reactSetPitch(0);
    this.game.reactSetStationDirection(null); // Reset station direction
    this.game.reactSetPiratePositions([]); // Reset pirate positions
  }

  update(deltaTime: number) {}

  handleInput(event: KeyboardEvent | MouseEvent) {}

  // Hides common scene elements that might persist between states
  protected resetCommonVisibility() {
    // Use entity setVisible methods
    this.game.assets.planet?.setVisible(false);
    this.game.assets.spaceStation?.setVisible(false);
    this.game.assets.titleShips.forEach(ship => ship.setVisible(false));


    this.game.assets.undockingSquares?.forEach(
      (square: THREE.LineLoop) => (square.visible = false)
    );

    // Hide stars if/when implemented
    // if (this.game.assets.stars) this.game.assets.stars.visible = false;
  }
}