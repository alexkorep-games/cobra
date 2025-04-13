// src/scenes/UndockingScene.ts
import * as THREE from "three";
import { SceneLogic } from "../game/SceneLogic";
import { GameState, IGameManager } from "../types";

export class UndockingScene extends SceneLogic {
    constructor(game: IGameManager) {
        super(game);
    }

    enter(previousState?: GameState): void {
        super.enter(previousState);
        // if (this.game.assets.stars) this.game.assets.stars.visible = true; // Keep stars hidden for undocking

        this.game.assets.undockingSquares.forEach((square: THREE.LineLoop, i: number) => {
            square.position.z = -i * 5; // Reset positions
            square.visible = true;
        });

        this.game.undockSoundRef.current
            ?.play()
            .catch((e) => console.warn("Undock sound play failed:", e));

        // Clear any previous timeout just in case
        if (this.timeoutId) clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
             // Check if still in the same state before switching
            if (this.game.currentState === "undocking") {
                this.game.switchState("space_flight");
            }
        }, 3500); // Duration of undocking sequence + sound
    }

    exit(nextState?: GameState): void {
        super.exit(nextState);
        this.game.assets.undockingSquares.forEach((s: THREE.LineLoop) => (s.visible = false));
        if (this.game.undockSoundRef.current) {
            this.game.undockSoundRef.current.pause(); // Stop sound if switching early
            this.game.undockSoundRef.current.currentTime = 0;
        }
        // Make sure stars are visible for the next scene (space_flight)
        if (this.game.assets.stars) {
            this.game.assets.stars.visible = true;
        }
    }

    update(deltaTime: number): void {
        // if (this.game.assets.stars) {
        //     this.game.assets.stars.rotation.y += 0.01 * deltaTime; // No need to rotate if invisible
        // }

        const speed = 20.0;
        const cameraZ = this.game.camera?.position.z ?? 0; // Use camera Z if available

        this.game.assets.undockingSquares.forEach((s: THREE.LineLoop) => {
            s.position.z += speed * deltaTime;
            // Wrap around logic
            if (s.position.z > cameraZ + 5) {
                // Calculate how far past the wrap point it went
                const overshoot = s.position.z - (cameraZ + 5);
                 // Reposition behind the last square, considering the overshoot
                s.position.z = -(this.game.assets.undockingSquares.length * 5) + 5 - overshoot;
            }
        });
    }

    // No specific handleInput needed
}