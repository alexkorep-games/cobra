import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class LoadingSceneLogic extends SceneLogicBase {
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);
    if (this.game.assets.stars) this.game.assets.stars.visible = true;
  }

  update(deltaTime: number): void {
    if (this.game.assets.stars) {
      this.game.assets.stars.rotation.y += 0.01 * deltaTime;
    }
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    if (!this.inputProcessed) {
      if (event.type === "keydown" || event.type === "mousedown") {
        this.inputProcessed = true;
        console.log("Loader input detected, switching state...");
        this.game.switchState("space_flight");
      }
    }
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
  }
}