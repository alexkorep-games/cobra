// src/features/planet_info/PlanetInfoSceneLogic.ts
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";

export class PlanetInfoScreenLogic extends SceneLogicBase {
  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);
    console.log("Entering Planet Info Screen for:", this.gameManager.selectedPlanetName);
    if (!this.gameManager.selectedPlanetName) {
      console.warn("No planet selected, returning to chart.");
      this.gameManager.switchState("short_range_chart");
      return;
    }
    this.bindInputHandlers();
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    this.unbindInputHandlers();
    console.log("Exiting Planet Info Screen");
  }

  update(deltaTime: number): void {
    // No updates needed typically
  }

   private bindInputHandlers(): void {
        window.addEventListener("keydown", this.handleKeyDown);
    }

    private unbindInputHandlers(): void {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (!this.isActive) return;

        console.log(`Planet Info KeyDown: ${event.key}`);

        switch (event.key) {
            case "j": // Jump key (example)
            case "J":
                console.log("Jump initiated (placeholder)... returning to chart for now.");
                // TODO: Implement actual jump logic (new state? animation?)
                this.gameManager.switchState("short_range_chart"); // Go back for now
                break;
            case "Escape":
            case "n": // Allow 'n' to close the info too
            case "N":
                this.gameManager.switchState("short_range_chart"); // Go back to chart
                break;
        }
    }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    // Use specific handler
    if (event.type === 'keydown') {
        // Handled by bound handleKeyDown
    }
  }
}