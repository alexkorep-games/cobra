import * as THREE from "three";
import { IGameManager } from "../../types";

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

  // --- Protected Utility Methods ---
  
  // Update coordinate display in React UI
  protected updateCoordinates(coords: [number, number, number]): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setCoordinates(coords);
  }

  // Update speed display in React UI
  protected updateSpeed(speed: number): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setSpeed(speed);
  }

  // Update roll indicator in React UI
  protected updateRoll(roll: number): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setRoll(roll);
  }

  // Update pitch indicator in React UI
  protected updatePitch(pitch: number): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setPitch(pitch);
  }

  // Update space station direction indicator in React UI
  protected updateStationDirection(direction: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setStationDirection(direction);
  }

  // Update pirate ship positions for radar display
  protected updatePiratePositions(positions: Array<{
    relativeX: number;
    relativeZ: number;
    isInFront: boolean;
  }>): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setPiratePositions(positions);
  }

  // Common utility for switching to different scenes
  protected switchToScene(scene: string): void {
    if (!this.isActive) return;
    this.gameManager.switchState(scene as any); // GameState is string union type
  }
}