// src/types.ts
import * as THREE from "three";
import { Planet } from "./game/entities/Planet";
import { Ship } from "./game/entities/Ship";
import { SpaceStation } from "./game/entities/SpaceStation";

export type GameState =
  | "loading"
  | "title"
  | "credits"
  | "stats"
  | "undocking"
  | "space_flight";

// Interface for game assets
export interface GameAssets {
  titleShips: Ship[];
  planet: Planet | null;
  undockingSquares: THREE.LineLoop[];
  spaceStation: SpaceStation | null;
  pirateShips: Ship[]; // Added for pirate NPCs
}

// Forward declaration or interface for GameManager to avoid circular dependencies if needed
// If SceneLogic needs detailed access, define an interface here.
export interface IGameManager {
  assets: GameAssets;
  currentState: GameState;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  switchState: (newState: GameState) => void;
  reactSetGameState: (state: GameState) => void;
  reactSetCoordinates: (coords: [number, number, number]) => void;
  reactSetSpeed: (speed: number) => void;
  reactSetRoll: (roll: number) => void;
  reactSetPitch: (pitch: number) => void;
  reactSetLaserHeat: (heat: number) => void;
  reactSetStationDirection: (direction: [number, number, number] | null) => void; // Updated type
  introMusicRef: React.RefObject<HTMLAudioElement>;
  undockSoundRef: React.RefObject<HTMLAudioElement>;
  constants: {
    // Pass constants explicitly if needed
    SHIP_DISPLAY_DURATION: number;
    FLY_IN_DURATION: number;
    FLY_OUT_DURATION: number;
    HOLD_DURATION: number;
    TOTAL_CYCLE_DURATION: number;
    START_Z: number;
    TARGET_POS: THREE.Vector3;
    // Add HUD constants if needed directly
    MAX_VISUAL_ROLL_RATE: number;
    MAX_VISUAL_PITCH_RATE: number;
  };
  // Add other methods/properties SceneLogic needs access to
  // REMOVED Title Scene Specifics
  // currentShipIndex: number; // MOVED to TitleSceneLogic
  // shipDisplayTimer: number; // MOVED to TitleSceneLogic
  // prepareNextTitleShip(): void; // MOVED to TitleSceneLogic
  // updateTitleShipAnimation(deltaTime: number): void; // MOVED to TitleSceneLogic
}
