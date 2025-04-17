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
export interface GameEntities {
  titleShips: Ship[];
  planet: Planet | null;
  undockingSquares: THREE.LineLoop[];
  spaceStation: SpaceStation | null;
  pirateShips: Ship[]; // Added for pirate NPCs
}

// These functions called by GameManager to update the React components
// like BottomHud, etc.

export type RadarPosition = {
  x: number; // -1..1 (relative horizontal direction)
  y: number; // -1..1 (relative vertical direction)
  z: number; // -1..1 (relative forward/backward direction)
  isInFront: boolean; // Is the target in front of the player?
}

export interface ReactSetters {
  setGameState: (state: GameState) => void;
  setCoordinates: (coords: [number, number, number]) => void;
  setSpeed: (speed: number) => void;
  setRoll: (roll: number) => void;
  setPitch: (pitch: number) => void;
  setLaserHeat: (heat: number) => void;
  setStationDirection: (direction: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null) => void;
  setRadarPositions: (positions: RadarPosition[]) => void;
}

// Forward declaration or interface for GameManager to avoid circular dependencies if needed
// If SceneLogic needs detailed access, define an interface here.
export interface IGameManager {
  assets: GameEntities;
  currentState: GameState;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  switchState: (newState: GameState) => void;
  reactSetters: ReactSetters;
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
}
