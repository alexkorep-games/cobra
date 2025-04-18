import { GameState, IGameManager, GameAssets, ReactSetters } from "../types";
import { SpaceFlightSceneLogic } from "../features/space_flight/SpaceFlightSceneLogic";
import * as Constants from "../constants";
import { generatePlanets, PlanetInfo } from "../classes/PlanetInfo";

export class GameManager implements IGameManager {
  // Remove Three.js core objects managed by R3F
  // scene: THREE.Scene | null = null;
  // camera: THREE.PerspectiveCamera | null = null;
  // renderer: THREE.WebGLRenderer | null = null;
  // clock: THREE.Clock = new THREE.Clock(); // R3F provides delta time in useFrame

  planetInfos: PlanetInfo[];
  currentPlanetName: string; // Store current planet name (which is the ID)
  selectedPlanetName: string | null = null; // Store selected planet name

  // Update assets type
  assets: GameAssets = {
    titleShips: [],
    planet: null,
    undockingSquares: [],
    spaceStation: null,
    pirateShips: [],
  };

  loadingCompleteCallback: (() => void) | null = null;
  currentState: GameState = "loading";
  sceneLogics: Partial<Record<GameState, SpaceFlightSceneLogic>> = {};
  private sceneUpdateFunctions: Partial<
    Record<GameState, (deltaTime: number) => void>
  > = {};

  // Remove animation loop properties
  // animationFrameId: number | null = null;

  // Remove controls
  // controls: OrbitControls | null = null;

  // Refs from React - Update constructor signature to accept potentially null refs
  introMusicRef: React.RefObject<HTMLAudioElement | null>;
  undockSoundRef: React.RefObject<HTMLAudioElement | null>;
  reactSetters: ReactSetters; // Single property for all React setters

  // Constants (no change)
  constants = { ...Constants };

  // Bound event handlers (remove resize and animate)
  boundHandleGlobalInput: (event: KeyboardEvent | MouseEvent) => void;
  // boundOnWindowResize: () => void;
  // boundAnimate: () => void;

  constructor(
    reactSetters: ReactSetters,
    introMusicRef: React.RefObject<HTMLAudioElement | null>, // Accept null
    undockSoundRef: React.RefObject<HTMLAudioElement | null> // Accept null
  ) {
    if (!introMusicRef || !undockSoundRef) {
      throw new Error("Audio refs must be provided");
    }
    this.reactSetters = reactSetters;
    this.introMusicRef = introMusicRef;
    this.undockSoundRef = undockSoundRef;

    this.boundHandleGlobalInput = this.handleGlobalInput.bind(this);
    // Remove bindings for resize and animate
    // this.boundOnWindowResize = this.onWindowResize.bind(this);
    // this.boundAnimate = this.animate.bind(this);

    // Generate planets using constants from Constants
    this.planetInfos = generatePlanets(
      Constants.PLANET_SEED, // Use Constants
      Constants.PLANET_COUNT // Use Constants
    );
    // Set initial planet based on constant from Constants
    // Find the planet at the specified index
    const initialPlanet = this.planetInfos[Constants.INITIAL_PLANET_INDEX];
    this.currentPlanetName =
      initialPlanet?.name ?? // Use the name of the planet found at the index
      this.planetInfos[0]?.name ?? // Fallback to first if index is out of bounds
      "Unknown"; // Final fallback

    console.log(
      `Generated ${this.planetInfos.length} planets. Starting at: ${this.currentPlanetName}`
    );

    // Pass planet info to React state immediately
    this.reactSetters.setPlanetInfos(this.planetInfos);
    this.reactSetters.setCurrentPlanetIndex(this.currentPlanetName); // Pass initial name
  }

  // Adjust init signature - remove canvas parameter
  async init(loadingCallback: () => void) {
    this.loadingCompleteCallback = loadingCallback;

    // Remove scene, camera, renderer, lighting, controls setup
    /*
    this.scene = new THREE.Scene();
    const cameraFarPlane = 10_000_000;
    this.camera = new THREE.PerspectiveCamera(...);
    this.renderer = new THREE.WebGLRenderer(...);
    this.renderer.setSize(...);
    this.renderer.setClearColor(...);
    const ambientLight = new THREE.AmbientLight(...);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(...);
    this.scene.add(directionalLight);
    // this.controls = new OrbitControls(...);
    */

    // Setup scene logics (remains the same for now)
    this.setupSceneLogics();

    try {
      // Pass a large number for cameraFarPlane if createAssets still uses it
      // Or refactor createAssets to not depend on it directly
      const cameraFarPlane = 10_000_000; // Keep for now if needed by createAssets
      await this.createAssets(cameraFarPlane); // Wait for assets to load

      // Remove animation loop start
      // this.startAnimationLoop();

      // Add global listeners (remove resize)
      // window.addEventListener("resize", this.boundOnWindowResize);
      window.addEventListener("keydown", this.boundHandleGlobalInput);
      window.addEventListener("keyup", this.boundHandleGlobalInput); // Listen for keyup too
      window.addEventListener("mousedown", this.boundHandleGlobalInput);

      console.log("GameManager initialized (without scene/renderer) and listeners added.");
    } catch (error) {
      console.error("Error during initialization:", error);
      if (this.loadingCompleteCallback) {
        this.loadingCompleteCallback();
      }
    }
  }

  setupSceneLogics() {
    // Only instantiate the class-based logic for space flight
    this.sceneLogics.space_flight = new SpaceFlightSceneLogic(this);
    // Other logics are now managed by hooks in App.tsx
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

    // Configure Planet
    const planetRadius = cameraFarPlane * 0.05;
    this.assets.planet = {
      radius: planetRadius,
      color: 0x44aa44
    };

    // Configure Space Station
    this.assets.spaceStation = {
      modelPath: spaceStationPath
    };

    // Configure Title Ships
    this.assets.titleShips = shipFilePaths.map(path => ({
      modelPath: path
    }));

    // Configure Pirate Ships
    this.assets.pirateShips = Array(Constants.PIRATE_COUNT).fill(null).map(() => ({
      modelPath: pirateShipPath
    }));

    // Undocking squares will be handled by the UndockingSquares component
    this.assets.undockingSquares = [];

    console.log("Asset configuration complete.");
    if (this.loadingCompleteCallback) {
      this.loadingCompleteCallback();
    } else {
      console.warn("loadingCompleteCallback not set!");
    }
  }

  // --- Hook Update Registration (Keep for now, might adapt later) ---
  registerSceneUpdate(state: GameState, updateFn: (deltaTime: number) => void) {
    this.sceneUpdateFunctions[state] = updateFn;
  }

  unregisterSceneUpdate(state: GameState) {
    delete this.sceneUpdateFunctions[state];
  }
  // --- End Hook Update Registration ---

  // Remove the entire animate method and related loop methods
  /*
  animate() {
    // ... removed ...
  }

  startAnimationLoop() {
    // ... removed ...
  }

  stopAnimationLoop() {
    // ... removed ...
  }
  */

  // Update method - This will likely be called differently or replaced by useFrame logic
  // For now, keep the structure but it won't be called by an animation loop here.
  update(deltaTime: number) {
    // Remove entity update calls since components handle their own updates
    // Update Current Scene Logic only
    const currentHookUpdateFn = this.sceneUpdateFunctions[this.currentState];
    if (currentHookUpdateFn) {
      currentHookUpdateFn(deltaTime); // Call hook's update function
    } else {
      const currentClassLogic = this.sceneLogics[this.currentState];
      currentClassLogic?.update(deltaTime);
    }
  }

  switchState(newState: GameState) {
    if (newState === this.currentState) {
      console.warn(`Already in state ${newState}.`);
      return;
    }
    const oldState = this.currentState;
    console.log(`Switching state from ${oldState} to ${newState}`);

    // Exit logic for the old state (without passing state)
    const oldClassLogic = this.sceneLogics[oldState];
    oldClassLogic?.exit();

    // Update state variable and notify React (this triggers hooks)
    this.currentState = newState;
    this.reactSetters.setGameState(newState);

    // Enter logic for the new state (without passing state)
    const newClassLogic = this.sceneLogics[newState];
    newClassLogic?.enter();
  }

  // --- Methods for React/Hooks to interact with GameManager ---
  setSelectedPlanetName(name: string | null): void {
    if (this.selectedPlanetName !== name) {
      console.log(`GameManager: Setting selected planet to ${name}`);
      this.selectedPlanetName = name;
      this.reactSetters.setSelectedPlanetName(name); // Keep React state in sync
    }
  }

  getCurrentPlanet(): PlanetInfo {
    // Find the current planet from the stored list using the current name
    const current = this.planetInfos.find(
      (p) => p.name === this.currentPlanetName
    );
    if (!current) {
      console.error(
        `Could not find current planet: ${this.currentPlanetName}! Falling back.`
      );
      // Fallback logic: return the first planet or a default object
      return (
        this.planetInfos[0] ||
        ({
          name: "Error Planet",
          coordinates: { x: 0, y: 0 } /* other default fields */,
        } as PlanetInfo)
      ); // Cast needed if providing partial default
    }
    return current;
  }

  getSelectedPlanet(): PlanetInfo | undefined {
    if (!this.selectedPlanetName) return undefined;
    return this.planetInfos.find((p) => p.name === this.selectedPlanetName);
  }
  // --- End Interaction Methods ---

  // Remove onWindowResize method
  /*
  onWindowResize() {
    // ... removed ...
  }
  */

  handleGlobalInput(/* event: KeyboardEvent | MouseEvent */) {
    // Hooks handle their own input via window listeners setup in their effects.
    // Class-based logic (only SpaceFlightSceneLogic) might need input,
    // but it's currently assumed hooks manage everything when active.
    // If SpaceFlightSceneLogic needs direct input handling when its state is active
    // and *not* managed by a hook, uncomment and implement its handleInput method.

    // const currentClassLogic = this.sceneLogics[this.currentState];
    // if (currentClassLogic) { // Check if logic exists for the state
    //   // Assuming SpaceFlightSceneLogic might have handleInput
    //   if (typeof (currentClassLogic as any).handleInput === 'function') {
    //      (currentClassLogic as any).handleInput(event);
    //   }
    // }
  }

  dispose() {
    console.log("Disposing GameManager...");
    // Remove stopAnimationLoop call
    // this.stopAnimationLoop();

    // Remove global listeners (remove resize)
    // window.removeEventListener("resize", this.boundOnWindowResize);
    window.removeEventListener("keydown", this.boundHandleGlobalInput);
    window.removeEventListener("keyup", this.boundHandleGlobalInput);
    window.removeEventListener("mousedown", this.boundHandleGlobalInput);

    // Reset assets structure - no need to dispose since components handle their own cleanup
    this.assets = {
      titleShips: [],
      planet: null,
      undockingSquares: [],
      spaceStation: null,
      pirateShips: [],
    };

    this.sceneLogics = {}; // Clear class-based logic store
    this.sceneUpdateFunctions = {}; // Clear hook update functions
    this.loadingCompleteCallback = null;
    this.planetInfos = []; // Clear planet data
    this.currentPlanetName = "";
    this.selectedPlanetName = null;

    console.log("GameManager disposed.");
  }
}
