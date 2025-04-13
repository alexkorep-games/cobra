import * as THREE from "three";

export type GameState =
  | "loading"
  | "title"
  | "credits"
  | "stats"
  | "undocking"
  | "space_flight";

// Forward declaration or interface for GameManager to avoid circular dependencies if needed
// If SceneLogic needs detailed access, define an interface here.
export interface IGameManager {
    assets: any; // Replace 'any' with a more specific type if possible
    currentState: GameState;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    switchState: (newState: GameState) => void;
    reactSetGameState: (state: GameState) => void;
    introMusicRef: React.RefObject<HTMLAudioElement>;
    undockSoundRef: React.RefObject<HTMLAudioElement>;
    constants: { // Pass constants explicitly if needed
        SHIP_DISPLAY_DURATION: number;
        FLY_IN_DURATION: number;
        FLY_OUT_DURATION: number;
        HOLD_DURATION: number;
        TOTAL_CYCLE_DURATION: number;
        START_Z: number;
        TARGET_POS: THREE.Vector3;
    };
    // Add other methods/properties SceneLogic needs access to
    currentShipIndex: number;
    shipDisplayTimer: number;
    prepareShip(index: number): void;
    updateTitleShipAnimation(deltaTime: number): void;
}