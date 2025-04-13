// src/scenes/CreditsScene.ts
import { SceneLogic } from "../game/SceneLogic";
import { GameState, IGameManager } from "../types";

export class CreditsScene extends SceneLogic {
    constructor(game: IGameManager) {
        super(game);
    }

    enter(previousState?: GameState): void {
        super.enter(previousState);
        if (this.game.assets.stars) this.game.assets.stars.visible = true;

        // Clear any previous timeout just in case
        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
            // Check if still in the same state before switching
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

    // No specific handleInput or exit needed beyond base class
}