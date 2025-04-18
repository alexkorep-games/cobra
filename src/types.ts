// src/types.ts
import * as THREE from "three";
// Remove entity imports as they're no longer used
// import { Planet } from "./game/entities/Planet";
// import { Ship } from "./game/entities/Ship";
// import { SpaceStation } from "./game/entities/SpaceStation";
import { PlanetInfo } from "@/classes/PlanetInfo";
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

// Interface describing the structure of loaded game assets
export interface GameAssets {
  titleShips: Array<{
    modelPath: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
  }>;
  planet: {
    radius: number;
    color: THREE.ColorRepresentation;
  } | null;
  undockingSquares: any[]; // Handled by UndockingSquares component
  spaceStation: {
    modelPath: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
  } | null;
  pirateShips: Array<{
    modelPath: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
  }>;
}

// Type describing the position of an object on the radar HUD
export type RadarPosition = {
  x: number; // -1 (left) to +1 (right) relative direction
  y: number; // -1 (below) to +1 (above) relative direction
  z: number; // -1 (front) to +1 (behind) relative direction
};

// Interface defining the callback functions provided by React (App.tsx)
// to the GameManager for updating the UI state.
export interface ReactSetters {
  setGameState: (state: GameState) => void; // Update the current game state view
  setCoordinates: (coords: [number, number, number]) => void; // Update player coordinates display
  setSpeed: (speed: number) => void;        // Update speed display (0-100)
  setRoll: (roll: number) => void;          // Update roll indicator (-1 to 1)
  setPitch: (pitch: number) => void;        // Update pitch indicator (-1 to 1)
  setLaserHeat: (heat: number) => void;     // Update laser heat display (0-100)
  setAltitude: (altitude: number) => void;  // Update altitude display (0-100)
  setStationDirection: (direction: {        // Update station direction indicator
    x: number;        // Relative X direction
    y: number;        // Relative Y direction
    offCenterAmount: number; // 0 (center) to 1 (edge of view)
    isInFront: boolean; // True if station is in front of camera
  } | null) => void;
  setRadarPositions: (positions: RadarPosition[]) => void; // Update radar contacts
  setPlanetInfos: (infos: PlanetInfo[]) => void; // Set the generated planet data list
  setCurrentPlanetIndex: (name: string) => void; // Set the name of the current planet system
  setSelectedPlanetName: (name: string | null) => void; // Set/clear the name of the selected target planet
}

// Interface defining the methods and properties the scene logic (hooks or classes)
// expects the GameManager instance to provide.
export interface IGameManager {
  assets: GameAssets; // Update to use GameAssets instead of GameEntities
  currentState: GameState;
  constants: typeof Constants;

  // Lifecycle methods
  init: (loadingCallback: () => void) => Promise<void>;
  update: (deltaTime: number) => void;
  dispose: () => void;

  // State Management
  switchState: (newState: GameState) => void;

  // React Integration
  reactSetters: ReactSetters;
  introMusicRef: React.RefObject<HTMLAudioElement | null>;
  undockSoundRef: React.RefObject<HTMLAudioElement | null>;

  // Hook Integration
  registerSceneUpdate: (state: GameState, updateFn: (deltaTime: number) => void) => void;
  unregisterSceneUpdate: (state: GameState) => void;

  // Planet Data Management
  planetInfos: PlanetInfo[];
  currentPlanetName: string;
  selectedPlanetName: string | null;
  getCurrentPlanet: () => PlanetInfo;
  setSelectedPlanetName: (name: string | null) => void;
  getSelectedPlanet: () => PlanetInfo | undefined;
}