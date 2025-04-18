// src/features/space_flight/GameManager.ts
// Remove unused THREE import
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // Removed
import { GameState, IGameManager, GameEntities, ReactSetters } from "../types";

import { SpaceFlightSceneLogic } from "../features/space_flight/SpaceFlightSceneLogic.ts"
// import { ShortRangeChartSceneLogic } from "../short_range_chart/ShortRangeChartSceneLogic"; // Removed
// import { PlanetInfoScreenLogic } from "../planet_info/PlanetInfoScreenLogic"; // Removed

// Import Entity Classes
import { Planet } from "./entities/Planet"; // Corrected path
import { Ship } from "./entities/Ship"; // Corrected path
import { SpaceStation } from "./entities/SpaceStation"; // Corrected path

// Import Constants and Planet Info generation
import * as Constants from "../constants"; // Corrected path
import { generatePlanets, PlanetInfo } from "../classes/PlanetInfo"; // Corrected path

// Use constants for scale
const stationScale = Constants.SHIP_SCALE * 1.5; // Make station a bit larger

export class GameManager implements IGameManager {
  // Remove Three.js core objects managed by R3F
  // scene: THREE.Scene | null = null;
  // camera: THREE.PerspectiveCamera | null = null;
  // renderer: THREE.WebGLRenderer | null = null;
  // clock: THREE.Clock = new THREE.Clock(); // R3F provides delta time in useFrame

  planetInfos: PlanetInfo[];
  currentPlanetName: string; // Store current planet name (which is the ID)
  selectedPlanetName: string | null = null; // Store selected planet name

  // Assets remain, but they won't be added to the scene here
  assets: GameEntities = {
    titleShips: [],
    planet: null,
    undockingSquares: [], // Will need refactoring for R3F
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
    // Remove checks for scene/camera as they are no longer properties here
    // if (!this.scene || !this.camera) {
    //   throw new Error("Scene or camera not initialized");
    // }

    console.log("Starting asset loading...");

    // Entities now handle their own loading via `load()` method
    // Load shared/common assets first (optional step, entities can load individually)
    try {
      await Promise.all([
        // Planet.loadCommonAssets(this.scene), // Planet likely doesn't need common assets
        // Ship.loadCommonAssets(this.scene), // Could cache GLTFs here if many duplicates
        // SpaceStation.loadCommonAssets(this.scene), // Could cache GLTF
      ]);
    } catch (error) {
      console.error("Error loading common assets:", error);
      // Decide if this is fatal or can continue
      // throw error;
    }

    const shipFilePaths = [
      "assets/ships/ship-cobra.gltf",
      "assets/ships/ship-pirate.gltf",
      "assets/ships/asteroid.gltf",
    ];
    const spaceStationPath = "assets/ships/spacestation.gltf";
    const pirateShipPath = "assets/ships/ship-pirate.gltf"; // Use pirate model

    const loadPromises: Promise<void>[] = [];

    // --- Instantiate Planet ---
    const planetRadius = cameraFarPlane * 0.05; // Example: 5% of far plane distance
    // Pass null for scene, as entities shouldn't add themselves directly anymore
    this.assets.planet = new Planet(null, planetRadius, 0x44aa44); // Greenish planet
    loadPromises.push(
      this.assets.planet.load().then(() => {
        // Remove addToScene and setVisible calls
        // if (this.scene) {
        //   this.assets.planet?.addToScene(this.scene);
        //   this.assets.planet?.setVisible(false);
        // } else {
        //   console.warn("Scene disposed before Planet could be added.");
        // }
        console.log("Planet loaded.");
      })
    );

    // --- Instantiate Space Station ---
    this.assets.spaceStation = new SpaceStation(
      null, // Pass null for scene
      spaceStationPath,
      stationScale,
      0xffff00 // Yellow station
    );
    loadPromises.push(
      this.assets.spaceStation.load().then(() => {
        // Remove addToScene and setVisible calls
        // if (this.scene) {
        //   this.assets.spaceStation?.addToScene(this.scene);
        //   this.assets.spaceStation?.setVisible(false);
        // } else {
        //   console.warn("Scene disposed before SpaceStation could be added.");
        // }
        console.log("SpaceStation loaded.");
      })
    );

    // --- Instantiate Title Ships ---
    this.assets.titleShips = []; // Clear previous array if any
    shipFilePaths.forEach((path) => {
      const ship = new Ship(null, path, Constants.SHIP_SCALE, 0x00ffff); // Pass null for scene
      this.assets.titleShips.push(ship);
      loadPromises.push(
        ship.load().then(() => {
          // Remove addToScene and setVisible calls
          // if (this.scene) {
          //   ship.addToScene(this.scene);
          //   ship.setVisible(false);
          // } else {
          //   console.warn(
          //     `Scene disposed before Title Ship (${path}) could be added.`
          //   );
          console.log(`Title Ship ${path} loaded.`);
        })
      );
    });

    // --- Instantiate Pirate Ships ---
    this.assets.pirateShips = []; // Clear previous array if any
    for (let i = 0; i < Constants.PIRATE_COUNT; i++) {
      const pirate = new Ship(
        null, // Pass null for scene
        pirateShipPath,
        Constants.SHIP_SCALE,
        0xff0000
      ); // Red pirates
      this.assets.pirateShips.push(pirate);
      loadPromises.push(
        pirate.load().then(() => {
          // Remove addToScene and setVisible calls
          // if (this.scene) {
          //   pirate.addToScene(this.scene);
          //   pirate.setVisible(false);
          // } else {
          //   console.warn(
          //     `Scene disposed before Pirate Ship (${i}) could be added.`
          //   );
          console.log(`Pirate Ship ${i} loaded.`);
        })
      );
    }

    // --- Undocking Squares (Needs complete refactor for R3F) ---
    // Remove direct THREE object creation and scene addition
    /*
    const squareOutlineGeom = new THREE.BufferGeometry();
    ...
    const squareLineMat = new THREE.LineBasicMaterial(...);
    this.assets.undockingSquares = [];
    if (this.scene) {
      for (let i = 0; i < 20; i++) {
        const squareLine = new THREE.LineLoop(...);
        this.scene.add(squareLine);
        this.assets.undockingSquares.push(squareLine);
      }
    } else { ... }
    */
    this.assets.undockingSquares = []; // Keep array, but it won't be populated here
    console.warn("Undocking Squares creation needs refactoring for R3F.");
    // --- End Undocking Squares ---

    // --- Loading Completion ---
    console.log(`Starting loading of ${loadPromises.length} assets...`);
    await Promise.all(loadPromises);

    // Remove scene check
    // if (!this.scene) { ... }

    console.log("All assets loaded successfully (but not added to scene).");
    if (this.loadingCompleteCallback) {
      this.loadingCompleteCallback(); // Notify React loading is done
    } else {
      console.warn("loadingCompleteCallback not set!");
    }

    // NOTE: Initial state logic activation ('enter') is now handled by the hooks
    // in App.tsx based on the `gameState` and `isActive` flags.
    // The class-based 'enter' for SpaceFlightSceneLogic will be called via switchState.
  } // End createAssets

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
    // Update Entities (Planet, Station, Pirates have their own updates)
    this.assets.planet?.update(deltaTime);
    this.assets.spaceStation?.update(deltaTime);
    this.assets.pirateShips.forEach((pirate) => pirate.update(deltaTime));
    // Title ships are updated by the TitleSceneLogic hook

    // Update Current Scene Logic
    const currentHookUpdateFn = this.sceneUpdateFunctions[this.currentState];
    if (currentHookUpdateFn) {
      currentHookUpdateFn(deltaTime); // Call hook's update function
    } else {
      const currentClassLogic = this.sceneLogics[this.currentState];
      currentClassLogic?.update(deltaTime);
    }
  }

  switchState(newState: GameState) {
    // Allow switching even if no specific logic class/hook exists (e.g., simple UI screens)
    if (newState === this.currentState) {
      console.warn(`Already in state ${newState}.`);
      return;
    }
    const oldState = this.currentState;
    console.log(`Switching state from ${oldState} to ${newState}`);

    // Exit logic for the old state (only relevant for class-based logic)
    const oldClassLogic = this.sceneLogics[oldState];
    oldClassLogic?.exit(newState);

    // Update state variable and notify React (this triggers hooks)
    this.currentState = newState;
    this.reactSetters.setGameState(newState);

    // Enter logic for the new state (only relevant for class-based logic)
    const newClassLogic = this.sceneLogics[newState];
    newClassLogic?.enter(oldState);
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

    // Dispose Entities managed by assets
    this.assets.planet?.dispose();
    this.assets.spaceStation?.dispose();
    this.assets.titleShips.forEach((ship) => ship.dispose());
    this.assets.pirateShips.forEach((pirate) => pirate.dispose());

    // Remove disposal of undocking squares THREE objects
    /*
    let geomDisposed = false;
    let matDisposed = false;
    this.assets.undockingSquares.forEach((square) => {
      // ... disposal logic removed ...
      // this.scene?.remove(square); // Remove scene removal
    });
    */
    console.log("Entities disposed.");

    // Remove renderer and controls disposal
    // this.renderer?.dispose();
    // this.controls?.dispose();

    // Remove scene, camera, renderer, controls clearing
    // this.scene?.clear();
    // this.scene = null;
    // this.camera = null;
    // this.renderer = null;
    // this.controls = null;

    // Reset assets structure
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
