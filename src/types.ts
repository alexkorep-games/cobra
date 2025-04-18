import * as THREE from "three";
import * as Constants from "@/constants";

// Define possible game states as a string union type
export type GameState =
  | "loading"
  | "title"
  | "credits"
  | "stats"
  | "undocking"
  | "space_flight"
  | "short_range_chart"
  | "planet_info";

export interface GameAssets {
  titleShips: Array<{ modelPath: string }>; // Just model path
  planet: {
    radius: number;
    color: THREE.ColorRepresentation;
    // Add initial position/rotation config if needed by components
    // initialPosition?: [number, number, number];
  } | null;
  undockingSquares: any[]; // Config may be empty if fully managed by component
  spaceStation: {
    modelPath: string;
    // Add initial position/rotation config if needed
    // initialPosition?: [number, number, number];
  } | null;
  pirateShips: Array<{
    modelPath: string;
    // Add initial config if needed (e.g., base health)
  }>;
}

// Type describing the position of an object on the radar HUD
export type RadarPosition = {
  x: number; // -1 (left) to +1 (right) relative direction
  y: number; // -1 (below) to +1 (above) relative direction
  z: number; // -1 (front) to +1 (behind) relative direction
};

// Interface defining the methods and properties the scene logic (hooks or classes)
// expects the GameManager instance to provide. Simplified.
export interface IGameManager {
  assets: GameAssets; // Holds configuration, not live objects
  currentState: GameState;
  constants: typeof Constants;
  loadingCompleteCallback: (() => void) | null; // Callback for loading complete signal

  // Lifecycle methods
  init: (loadingCallback: () => void) => Promise<void>;
  update: (deltaTime: number) => void;
  dispose: () => void;

  // State Management (triggered by React based on global state)
  switchState: (newState: GameState) => void;

  // React Integration (Audio Refs only)
  introMusicRef: React.RefObject<HTMLAudioElement | null>;
  undockSoundRef: React.RefObject<HTMLAudioElement | null>;

  // Hook Integration (Registering update loops)
  registerSceneUpdate: (
    state: GameState,
    updateFn: (deltaTime: number) => void
  ) => void;
  unregisterSceneUpdate: (state: GameState) => void;

  // Optional: Methods for hooks to update/get internal visual state cache (less preferred)
  updateAssetVisualState?: (
    assetType: string,
    index: number,
    state: any
  ) => void;
  getAssetVisualState?: (assetType: string, index: number) => any | undefined;
}
