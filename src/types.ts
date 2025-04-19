import * as THREE from "three";

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

// Interface describing the structure of loaded game assets (configuration)
// Remains largely the same
export interface GameAssets {
  titleShips: Array<{
    modelPath: string;
    position?: [number, number, number]; // Optional initial config
    rotation?: [number, number, number]; // Optional initial config
  }>;
  planet: {
    radius: number;
    color: THREE.ColorRepresentation;
  } | null;
  undockingSquares: any[]; // Config might be empty or define parameters
  spaceStation: {
    modelPath: string;
    position?: [number, number, number]; // Optional initial config
    rotation?: [number, number, number]; // Optional initial config
  } | null;
  pirateShips: Array<{
    modelPath: string;
    // Add other config if needed (e.g., initial behavior patterns)
  }>;
}

// Type describing the position of an object on the radar HUD
export type RadarPosition = {
  x: number; // -1 (left) to +1 (right) relative direction
  y: number; // -1 (below) to +1 (above) relative direction
  z: number; // -1 (front) to +1 (behind) relative direction
};
