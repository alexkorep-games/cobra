// src/game/SceneLogic.ts
import * as THREE from "three";
import { GameState, IGameManager } from "../types";

export class SceneLogic {
    game: IGameManager; // Use the interface
    inputProcessed: boolean = false;
    timeoutId: NodeJS.Timeout | null = null;

    constructor(game: IGameManager) {
        this.game = game;
    }

    // Default enter logic (can be overridden)
    enter(previousState?: GameState) {
        console.log(`Entering state: ${this.game.currentState}`);
        this.inputProcessed = false;
        // Reset common visibility (moved from original SceneLogic.enter for clarity)
        this.resetCommonVisibility();
    }

    // Default exit logic (can be overridden)
    exit(nextState?: GameState) {
        console.log(`Exiting state: ${this.game.currentState}`);
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
    
    // Default cleanup for HUD elements on scene exit
    protected resetHud() {
        this.game.reactSetSpeed(0);
        this.game.reactSetRoll(0);
        this.game.reactSetPitch(0);
    }

    // To be overridden by subclasses
    update(deltaTime: number) {}

    // To be overridden by subclasses
    handleInput(event: KeyboardEvent | MouseEvent) {}

    // Helper to reset common elements visibility
    protected resetCommonVisibility() {
        if (this.game.assets.planet) this.game.assets.planet.visible = false;
        if (this.game.assets.stars) this.game.assets.stars.visible = false;
        this.game.assets.titleShips?.forEach( // Added optional chaining
            (ship: THREE.Object3D | null) => ship && (ship.visible = false)
        );
        this.game.assets.undockingSquares?.forEach( // Added optional chaining
            (square: THREE.LineLoop) => (square.visible = false)
        );
    }
}