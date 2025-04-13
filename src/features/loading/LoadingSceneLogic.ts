import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class LoadingSceneLogic extends SceneLogicBase {
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);
  }

  update(deltaTime: number): void {
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    if (!this.inputProcessed) {
      if (event.type === "keydown" || event.type === "mousedown") {
        this.inputProcessed = true;
        console.log("Loader input detected, switching state...");
        //this.game.switchState("title"); // Switch to title state
        this.game.switchState("space_flight"); // Switch to flight state
      }
    }
  }
}
