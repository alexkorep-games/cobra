import { GameState, IGameManager, GameAssets, ReactSetters } from "../types";
import * as Constants from "../constants";
import { generatePlanets, PlanetInfo } from "../classes/PlanetInfo";

export class GameManager implements IGameManager {
  planetInfos: PlanetInfo[];
  currentPlanetName: string;
  selectedPlanetName: string | null = null;

  assets: GameAssets = {
    titleShips: [],
    planet: null,
    undockingSquares: [],
    spaceStation: null,
    pirateShips: [],
  };

  loadingCompleteCallback: (() => void) | null = null;
  currentState: GameState = "loading";
  private sceneUpdateFunctions: Partial<
    Record<GameState, (deltaTime: number) => void>
  > = {};

  introMusicRef: React.RefObject<HTMLAudioElement | null>;
  undockSoundRef: React.RefObject<HTMLAudioElement | null>;
  reactSetters: ReactSetters;

  constants = { ...Constants };
  boundHandleGlobalInput: (event: KeyboardEvent | MouseEvent) => void;

  constructor(
    reactSetters: ReactSetters,
    introMusicRef: React.RefObject<HTMLAudioElement | null>,
    undockSoundRef: React.RefObject<HTMLAudioElement | null>
  ) {
    if (!introMusicRef || !undockSoundRef) {
      throw new Error("Audio refs must be provided");
    }
    this.reactSetters = reactSetters;
    this.introMusicRef = introMusicRef;
    this.undockSoundRef = undockSoundRef;

    this.boundHandleGlobalInput = this.handleGlobalInput.bind(this);

    this.planetInfos = generatePlanets(
      Constants.PLANET_SEED,
      Constants.PLANET_COUNT
    );
    const initialPlanet = this.planetInfos[Constants.INITIAL_PLANET_INDEX];
    this.currentPlanetName = initialPlanet?.name ?? this.planetInfos[0]?.name ?? "Unknown";

    console.log(
      `Generated ${this.planetInfos.length} planets. Starting at: ${this.currentPlanetName}`
    );

    this.reactSetters.setPlanetInfos(this.planetInfos);
    this.reactSetters.setCurrentPlanetIndex(this.currentPlanetName);
  }

  async init(loadingCallback: () => void) {
    this.loadingCompleteCallback = loadingCallback;

    try {
      const cameraFarPlane = 10_000_000;
      await this.createAssets(cameraFarPlane);

      window.addEventListener("keydown", this.boundHandleGlobalInput);
      window.addEventListener("keyup", this.boundHandleGlobalInput);
      window.addEventListener("mousedown", this.boundHandleGlobalInput);

      console.log("GameManager initialized (R3F handles scene/renderer) and listeners added.");
    } catch (error) {
      console.error("Error during initialization:", error);
      if (this.loadingCompleteCallback) {
        this.loadingCompleteCallback();
      }
    }
  }

  async createAssets(cameraFarPlane: number) {
    console.log("Starting asset configuration...");

    const shipFilePaths = [
      "assets/ships/ship-cobra.gltf",
      "assets/ships/ship-pirate.gltf",
      "assets/ships/asteroid.gltf",
    ];
    const spaceStationPath = "assets/ships/spacestation.gltf";
    const pirateShipPath = "assets/ships/ship-pirate.gltf";

    const planetRadius = cameraFarPlane * 0.05;
    this.assets.planet = {
      radius: planetRadius,
      color: 0x44aa44,
    };

    this.assets.spaceStation = {
      modelPath: spaceStationPath,
    };

    this.assets.titleShips = shipFilePaths.map(path => ({
      modelPath: path,
    }));

    this.assets.pirateShips = Array(Constants.PIRATE_COUNT).fill(null).map(() => ({
      modelPath: pirateShipPath,
    }));

    this.assets.undockingSquares = [];

    console.log("Asset configuration complete.");
    if (this.loadingCompleteCallback) {
      this.loadingCompleteCallback();
    } else {
      console.warn("loadingCompleteCallback not set!");
    }
  }

  registerSceneUpdate(state: GameState, updateFn: (deltaTime: number) => void) {
    this.sceneUpdateFunctions[state] = updateFn;
  }

  unregisterSceneUpdate(state: GameState) {
    delete this.sceneUpdateFunctions[state];
  }

  update(deltaTime: number) {
    const currentHookUpdateFn = this.sceneUpdateFunctions[this.currentState];
    if (currentHookUpdateFn) {
      currentHookUpdateFn(deltaTime);
    }
  }

  switchState(newState: GameState) {
    if (newState === this.currentState) {
      return;
    }
    const oldState = this.currentState;
    console.log(`Switching state from ${oldState} to ${newState}`);

    this.currentState = newState;
    this.reactSetters.setGameState(newState);
  }

  setSelectedPlanetName(name: string | null): void {
    if (this.selectedPlanetName !== name) {
      console.log(`GameManager: Setting selected planet to ${name}`);
      this.selectedPlanetName = name;
      this.reactSetters.setSelectedPlanetName(name);
    }
  }

  getCurrentPlanet(): PlanetInfo {
    const current = this.planetInfos.find(
      (p) => p.name === this.currentPlanetName
    );
    if (!current) {
      console.error(
        `Could not find current planet: ${this.currentPlanetName}! Falling back.`
      );
      return (
        this.planetInfos[0] ||
        ({
          name: "Error Planet",
          coordinates: { x: 0, y: 0 },
        } as PlanetInfo)
      );
    }
    return current;
  }

  getSelectedPlanet(): PlanetInfo | undefined {
    if (!this.selectedPlanetName) return undefined;
    return this.planetInfos.find((p) => p.name === this.selectedPlanetName);
  }

  handleGlobalInput(event: KeyboardEvent | MouseEvent) {
    const currentHookUpdateFn = this.sceneUpdateFunctions[this.currentState];
    if (currentHookUpdateFn && typeof (currentHookUpdateFn as any).handleInput === 'function') {
       (currentHookUpdateFn as any).handleInput(event);
    }
  }

  dispose() {
    console.log("Disposing GameManager...");
    window.removeEventListener("keydown", this.boundHandleGlobalInput);
    window.removeEventListener("keyup", this.boundHandleGlobalInput);
    window.removeEventListener("mousedown", this.boundHandleGlobalInput);

    this.assets = {
      titleShips: [],
      planet: null,
      undockingSquares: [],
      spaceStation: null,
      pirateShips: [],
    };

    this.sceneUpdateFunctions = {};
    this.loadingCompleteCallback = null;
    this.planetInfos = [];
    this.currentPlanetName = "";
    this.selectedPlanetName = null;

    console.log("GameManager disposed.");
  }
}
