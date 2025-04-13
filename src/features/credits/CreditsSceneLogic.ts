import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class CreditsSceneLogic extends SceneLogicBase {
    constructor(game: IGameManager) {
        super(game);
    }

    enter(previousState?: GameState): void {
        super.enter(previousState);
        if (this.game.assets.stars) this.game.assets.stars.visible = true;

        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            if (this.game.currentState === "credits") {
                this.game.switchState("stats");
            }
        }, 3000);
    }

    update(deltaTime: number): void {
        if (this.game.assets.stars) {
            this.game.assets.stars.rotation.y += 0.01 * deltaTime;
        }
    }
}