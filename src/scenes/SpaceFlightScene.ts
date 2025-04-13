// src/scenes/SpaceFlightScene.ts
import { SceneLogic } from "../game/SceneLogic";
import { GameState, IGameManager } from "../types";

export class SpaceFlightScene extends SceneLogic {
    constructor(game: IGameManager) {
        super(game);
    }

    enter(previousState?: GameState): void {
        super.enter(previousState);

        if (this.game.assets.planet) {
            this.game.assets.planet.position.set(0, 15, -60);
            this.game.assets.planet.scale.set(5, 5, 5);
            this.game.assets.planet.visible = true;
        }
        if (this.game.assets.stars) {
            this.game.assets.stars.visible = true;
        }
        console.log("Entered Space Flight Scene. Intro sequence complete.");
        // Potentially start game music, enable player controls etc.
    }

    update(deltaTime: number): void {
        if (this.game.assets.stars) {
            this.game.assets.stars.rotation.y += 0.01 * deltaTime;
        }
        // Add actual space flight update logic here (player input, movement, etc.)
    }

    handleInput(event: KeyboardEvent | MouseEvent): void {
        // Handle player input for space flight here
        // console.log("Space flight input:", event.type, event);
    }

    exit(nextState?: GameState): void {
        super.exit(nextState);
        // Cleanup specific to space flight if needed (e.g., stop game music)
    }
}