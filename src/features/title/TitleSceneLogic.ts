import * as THREE from "three";
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";
import { TARGET_POS } from "../../constants";

export class TitleSceneLogic extends SceneLogicBase {
    constructor(game: IGameManager) {
        super(game);
    }

    enter(previousState?: GameState): void {
        super.enter(previousState);

        this.game.assets.titleShips.forEach(
            (ship: THREE.Object3D | null) => ship && (ship.visible = false)
        );
        this.game.currentShipIndex = 0;
        this.game.shipDisplayTimer = 0;
        this.game.prepareShip(this.game.currentShipIndex);

        if (this.game.assets.planet) {
            this.game.assets.planet.visible = true;
            this.game.assets.planet.position.set(200, 0, -500);
            this.game.assets.planet.scale.set(1, 1, 1);
        }
        if (this.game.assets.stars) {
            this.game.assets.stars.visible = true;
        }

        this.game.introMusicRef.current
            ?.play()
            .catch((e) => console.warn("Intro music play failed:", e));
    }

    exit(nextState?: GameState): void {
        super.exit(nextState);
        this.resetHud();

        const currentShip = this.game.assets.titleShips[this.game.currentShipIndex];
        if (currentShip) currentShip.visible = false;

        if (this.game.assets.planet) {
            this.game.assets.planet.visible = false;
        }
        this.game.introMusicRef.current?.pause();
        if (this.game.introMusicRef.current) this.game.introMusicRef.current.currentTime = 0;
    }

    update(deltaTime: number): void {
        if (this.game.assets.stars) {
            this.game.assets.stars.rotation.y += 0.01 * deltaTime;
        }
        this.game.updateTitleShipAnimation(deltaTime);
    }

    handleInput(event: KeyboardEvent | MouseEvent): void {
        if (!this.inputProcessed) {
            if (event.type === "keydown" || event.type === "mousedown") {
                this.inputProcessed = true;
                this.game.switchState("undocking");
            }
        }
    }
}