import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class LoadingSceneLogic extends SceneLogicBase {
  private inputProcessed: boolean = false;
  
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);
    this.inputProcessed = false; // Reset when entering the scene
  }

  update(deltaTime: number): void {
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    if (!this.inputProcessed) {
      if (event.type === "keydown" || event.type === "mousedown") {
        this.inputProcessed = true;
        console.log("Loader input detected, switching state...");
        //this.gameManager.switchState("title"); // Switch to title state
        //this.gameManager.switchState("space_flight"); // Switch to flight state
        this.gameManager.switchState("short_range_chart");
      }
    }
  }
}
