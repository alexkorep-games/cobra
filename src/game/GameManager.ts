import { GameState, IGameManager, GameAssets, ReactSetters } from "../types"; // Adjusted imports
import * as Constants from "../constants";

// Define internal visual state structure (example)
interface VisualState {
  position?: [number, number, number];
  rotation?: [number, number, number];
  quaternion?: [number, number, number, number];
  visible?: boolean;
  scale?: [number, number, number];
}

// Map to store the latest calculated visual state for assets
// Keys could be like 'titleShip-0', 'titleShip-1', 'planet-0', 'station-0', 'pirate-0' etc.
type AssetVisualStateMap = Record<string, VisualState>;

export class GameManager implements IGameManager {
  // Store asset configuration, not THREE objects
  assets: GameAssets = {
    titleShips: [],
    planet: null,
    undockingSquares: [], // Config might be empty if entirely R3F managed
    spaceStation: null,
    pirateShips: [],
  };

  loadingCompleteCallback: (() => void) | null = null;
  currentState: GameState = "loading";
  private sceneUpdateFunctions: Partial<
    Record<GameState, (deltaTime: number) => void>
  > = {};

  // React integration points
  reactSetters: ReactSetters; // Store the setters object
  introMusicRef: React.RefObject<HTMLAudioElement | null>;
  undockSoundRef: React.RefObject<HTMLAudioElement | null>;

  // Constants remain
  constants = { ...Constants };

  // Internal state for visual updates (if hooks update GM instead of context/atoms)
  // This approach is less ideal than hooks updating shared state directly
  private assetVisualStates: AssetVisualStateMap = {};

  // No longer needs bound handleGlobalInput if hooks manage input

  constructor(
    reactSetters: ReactSetters, // Receive setters object
    introMusicRef: React.RefObject<HTMLAudioElement | null>,
    undockSoundRef: React.RefObject<HTMLAudioElement | null>
  ) {
    if (!reactSetters || !introMusicRef || !undockSoundRef) {
      throw new Error("ReactSetters and Audio refs must be provided");
    }
    this.reactSetters = reactSetters; // Store setters
    this.introMusicRef = introMusicRef;
    this.undockSoundRef = undockSoundRef;

    console.log("GameManager initialized with ReactSetters.");
  }

  async init(loadingCallback: () => void) {
    this.loadingCompleteCallback = loadingCallback;

    try {
      const cameraFarPlane = 10_000_000; // Example value, consider passing from R3F
      await this.configureAssets(cameraFarPlane);

      // Removed global input listeners - handled by hooks

      console.log("GameManager initialized (asset config complete).");
    } catch (error) {
      console.error("Error during initialization:", error);
      // Still call the callback on error to potentially unblock UI
      if (this.loadingCompleteCallback) {
        this.loadingCompleteCallback();
      }
    }
  }

  // Renamed from createAssets to configureAssets
  async configureAssets(cameraFarPlane: number) {
    console.log("Starting asset configuration...");

    // Define paths and parameters
    const shipFilePaths = [
      "assets/ships/ship-cobra.gltf",
      "assets/ships/ship-pirate.gltf",
      "assets/ships/asteroid.gltf",
    ];
    const spaceStationPath = "assets/ships/spacestation.gltf";
    const pirateShipPath = "assets/ships/ship-pirate.gltf";
    const planetRadius = cameraFarPlane * 0.05; // Example radius

    // Store configuration data
    this.assets.planet = {
      radius: planetRadius,
      color: 0x44aa44, // Example color
    };

    this.assets.spaceStation = {
      modelPath: spaceStationPath,
      // Initial position/rotation could be set here if static
      // position: [1000, 1000, -5000]
    };

    this.assets.titleShips = shipFilePaths.map((path) => ({
      modelPath: path,
    }));

    this.assets.pirateShips = Array(Constants.PIRATE_COUNT)
      .fill(null)
      .map(() => ({
        modelPath: pirateShipPath,
      }));

    // Undocking squares config might be minimal if R3F handles geometry/material
    this.assets.undockingSquares = [];

    console.log("Asset configuration complete.");
    // Signal loading complete *after* config is done
    if (this.loadingCompleteCallback) {
      this.loadingCompleteCallback();
    } else {
      console.warn("loadingCompleteCallback not set!");
    }
  }

  registerSceneUpdate(state: GameState, updateFn: (deltaTime: number) => void) {
    this.sceneUpdateFunctions[state] = updateFn;
    console.log(`Registered update function for state: ${state}`);
  }

  unregisterSceneUpdate(state: GameState) {
    if (this.sceneUpdateFunctions[state]) {
      delete this.sceneUpdateFunctions[state];
      console.log(`Unregistered update function for state: ${state}`);
    }
  }

  // Method for hooks to update the visual state store (less preferred alternative)
  updateAssetVisualState(assetType: string, index: number, state: VisualState) {
    const key = `${assetType}-${index}`;
    this.assetVisualStates[key] = {
      ...(this.assetVisualStates[key] || {}),
      ...state,
    };
    // In a more complex scenario, this might trigger events or updates
  }

  // Method to retrieve visual state (less preferred alternative)
  getAssetVisualState(
    assetType: string,
    index: number
  ): VisualState | undefined {
    const key = `${assetType}-${index}`;
    return this.assetVisualStates[key];
  }

  update(deltaTime: number) {
    // Call the registered update function for the current state
    const currentHookUpdateFn = this.sceneUpdateFunctions[this.currentState];
    if (currentHookUpdateFn) {
      currentHookUpdateFn(deltaTime);
    }
    // Removed direct entity updates
  }

  // This method is now primarily called by App.tsx based on global state changes
  switchState(newState: GameState) {
    if (newState === this.currentState) {
      return;
    }
    const oldState = this.currentState;
    console.log(
      `[GameManager] Switching state from ${oldState} to ${newState}`
    );

    this.currentState = newState;

    // Note: Scene-specific entry/exit logic (like playing sounds, resetting state)
    // is now primarily handled within the useEffect setup/cleanup of the scene logic hooks.
  }

  // Removed handleGlobalInput

  dispose() {
    console.log("Disposing GameManager...");
    // Remove any remaining listeners if they existed (though moved to hooks)
    // window.removeEventListener("keydown", this.boundHandleGlobalInput);
    // window.removeEventListener("keyup", this.boundHandleGlobalInput);
    // window.removeEventListener("mousedown", this.boundHandleGlobalInput);

    // Clear asset configuration
    this.assets = {
      titleShips: [],
      planet: null,
      undockingSquares: [],
      spaceStation: null,
      pirateShips: [],
    };

    // Clear registered update functions and callbacks
    this.sceneUpdateFunctions = {};
    this.loadingCompleteCallback = null;
    this.assetVisualStates = {}; // Clear visual state cache

    console.log("GameManager disposed.");
  }

  // --- Removed planet data management methods ---
  // getCurrentPlanet, setSelectedPlanetName, getSelectedPlanet are removed
  // Hooks like usePlanetInfos manage this state now.
}
