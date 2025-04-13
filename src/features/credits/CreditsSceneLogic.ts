import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class CreditsSceneLogic extends SceneLogicBase {
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      if (this.game.currentState === "credits") {
        this.game.switchState("stats");
      }
    }, 3000);
  }

  update(deltaTime: number): void {
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    if (event.type === "keydown" || event.type === "mousedown") {
      if (this.game.currentState === "credits") this.game.switchState("stats");
    }
  }
}
