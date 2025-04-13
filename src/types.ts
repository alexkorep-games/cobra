import * as THREE from "three";

export type GameState =
  | "loading"
  | "title"
  | "credits"
  | "stats"
  | "undocking"
  | "space_flight";

// Interface for game assets
export interface GameAssets {
  titleShips: (THREE.Object3D | null)[];
  planet: THREE.Mesh | null;
  stars: THREE.Points | null;
  hyperStars: THREE.LineSegments | null; // Added for hyperspace effect
  undockingSquares: THREE.LineLoop[];
  spaceStation: THREE.Object3D | null; // Added space station
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
  reactSetStationDirection: (angle: number | null) => void; // Added for station direction
  toggleHyperSpaceVisuals: (active: boolean) => void;
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
  currentShipIndex: number;
  shipDisplayTimer: number;
  prepareNextTitleShip(): void;
  updateTitleShipAnimation(deltaTime: number): void;
}
