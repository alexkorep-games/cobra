// src/scenes/LoadingScene.ts
import { SceneLogic } from "../game/SceneLogic";
import { GameState, IGameManager } from "../types";

export class LoadingScene extends SceneLogic {
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState); // Call base enter first
    if (this.game.assets.stars) this.game.assets.stars.visible = true;
  }

  update(deltaTime: number): void {
    if (this.game.assets.stars) {
      this.game.assets.stars.rotation.y += 0.01 * deltaTime;
    }
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    // React state check is handled implicitly by UI enabling input
    if (!this.inputProcessed) {
      if (event.type === "keydown" || event.type === "mousedown") {
        this.inputProcessed = true; // Mark processed for this state
        console.log("Loader input detected, switching state...");
        // For testing, go directly to flight state
        // this.game.switchState("title");
        this.game.switchState("space_flight"); // Switch to flight state
      }
    }
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    // No specific exit logic needed for stars visibility here,
    // as the next state's enter will handle it.
  }
}
