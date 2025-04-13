import * as THREE from "three";
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class UndockingSceneLogic extends SceneLogicBase {
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);

    this.game.assets.undockingSquares.forEach(
      (square: THREE.LineLoop, i: number) => {
        square.position.z = -i * 5;
        square.visible = true;
      }
    );

    // Ensure sound plays from the beginning if re-entering state quickly
    this.game.undockSoundRef.current
      ?.play()
      .catch((e) => console.warn("Undock sound play failed:", e));

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      if (this.game.currentState === "undocking") {
        this.game.switchState("space_flight");
      }
    }, 4000); // Slightly longer duration maybe?
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    this.resetHud();
    this.game.assets.undockingSquares.forEach(
      (s: THREE.LineLoop) => (s.visible = false)
    );
    if (this.game.undockSoundRef.current) {
      this.game.undockSoundRef.current.pause();
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
