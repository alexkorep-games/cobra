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

    this.game.assets.undockingSquares.forEach(
      (square: THREE.LineLoop, i: number) => {
        square.position.z = -i * 5; // Reset positions
        square.visible = true;
      }
    );

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
    this.game.assets.undockingSquares.forEach(
      (s: THREE.LineLoop) => (s.visible = false)
    );
    if (this.game.undockSoundRef.current) {
      this.game.undockSoundRef.current.pause(); // Stop sound if switching early
      this.game.undockSoundRef.current.currentTime = 0;
    }
  }

  update(deltaTime: number): void {
    const speed = 20.0;
    this.game.assets.undockingSquares.forEach((s: THREE.LineLoop) => {
      s.position.z += speed * deltaTime;
    });
  }
}
