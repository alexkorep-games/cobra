import * as THREE from "three";
import { IGameManager, RadarPosition } from "../../types";

export class SceneLogicBase {
  protected gameManager: IGameManager;
  protected isActive: boolean = false;

  constructor(gameManager: IGameManager) {
    this.gameManager = gameManager;
  }

  // --- Lifecycle Methods ---
  enter(previousState?: string): void {
    this.isActive = true;
    console.log(`Base enter for ${this.constructor.name}`);
  }

  exit(nextState?: string): void {
    this.isActive = false;
    console.log(`Base exit for ${this.constructor.name}`);
  }

  update(deltaTime: number): void {
    // Will be overridden by derived classes
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
    // Will be overridden by derived classes
  }
}