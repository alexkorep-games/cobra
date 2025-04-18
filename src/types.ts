// src/types.ts
import * as THREE from "three";
import { Planet } from "./game/entities/Planet"; // Ensure correct paths
import { Ship } from "./game/entities/Ship";
import { SpaceStation } from "./game/entities/SpaceStation";
import { PlanetInfo } from "./classes/PlanetInfo";

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
export interface GameEntities {
  titleShips: Ship[];                  // Ships shown on the title screen
  planet: Planet | null;               // The current planet (or sun) object
  undockingSquares: THREE.LineLoop[];  // Visual effect for undocking
  spaceStation: SpaceStation | null;   // The space station object
  pirateShips: Ship[];                 // Array of pirate ship NPCs
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
  assets: GameEntities;                     // Access to loaded game objects
  currentState: GameState;                  // The current game state
  scene: THREE.Scene | null;                // The main THREE.js scene
  camera: THREE.PerspectiveCamera | null;   // The main THREE.js camera
  constants: typeof Constants;              // Access to game constants

  // State Management
  switchState: (newState: GameState) => void; // Function to change the game state

  // React Integration
  reactSetters: ReactSetters;               // Setters to update React UI state
  introMusicRef: React.RefObject<HTMLAudioElement>; // Ref to intro music audio element
  undockSoundRef: React.RefObject<HTMLAudioElement>; // Ref to undock sound audio element

  // Hook Integration
  registerSceneUpdate: (state: GameState, updateFn: (deltaTime: number) => void) => void; // Register hook update logic
  unregisterSceneUpdate: (state: GameState) => void; // Unregister hook update logic

  // Planet Data Management
  planetInfos: PlanetInfo[];                // List of all generated planets
  currentPlanetName: string;                // Name of the current planet system
  selectedPlanetName: string | null;        // Name of the currently selected target planet
  getCurrentPlanet: () => PlanetInfo;       // Get info for the current planet
  setSelectedPlanetName: (name: string | null) => void; // Set the selected target planet
  getSelectedPlanet: () => PlanetInfo | undefined; // Get info for the selected planet (if any)
}