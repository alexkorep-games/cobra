// src/features/space_flight/GameManager.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // If needed
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
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  clock: THREE.Clock = new THREE.Clock();
  planetInfos: PlanetInfo[];
  currentPlanetName: string; // Store current planet name (which is the ID)
  selectedPlanetName: string | null = null; // Store selected planet name

  // Initialize assets with correct types
  assets: GameEntities = {
    titleShips: [],
    planet: null,
    undockingSquares: [],
    spaceStation: null,
    pirateShips: [],
  };

  loadingCompleteCallback: (() => void) | null = null;
  currentState: GameState = "loading";
  // Only store class-based scene logic (just space_flight)
  sceneLogics: Partial<Record<GameState, SpaceFlightSceneLogic>> = {};
  // Map to store update functions provided by hooks
  private sceneUpdateFunctions: Partial<
    Record<GameState, (deltaTime: number) => void>
  > = {};

  animationFrameId: number | null = null;

  controls: OrbitControls | null = null; // Optional OrbitControls for debugging

  // Refs from React
  introMusicRef: React.RefObject<HTMLAudioElement>;
  undockSoundRef: React.RefObject<HTMLAudioElement>;
  reactSetters: ReactSetters; // Single property for all React setters

  // Constants (no change)
  constants = { ...Constants };

  // Bound event handlers (no change)
  boundHandleGlobalInput: (event: KeyboardEvent | MouseEvent) => void;
  boundOnWindowResize: () => void;
  boundAnimate: () => void;

  constructor(
    reactSetters: ReactSetters,
    introMusicRef: React.RefObject<HTMLAudioElement> | null,
    undockSoundRef: React.RefObject<HTMLAudioElement> | null
  ) {
    if (!introMusicRef || !undockSoundRef) {
      throw new Error("Audio refs must be provided");
    }
    this.reactSetters = reactSetters;
    this.introMusicRef = introMusicRef;
    this.undockSoundRef = undockSoundRef;

    this.boundHandleGlobalInput = this.handleGlobalInput.bind(this);
    this.boundOnWindowResize = this.onWindowResize.bind(this);
    this.boundAnimate = this.animate.bind(this);

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

  async init(canvas: HTMLCanvasElement, loadingCallback: () => void) {
    this.loadingCompleteCallback = loadingCallback;

    // Create scene first
    this.scene = new THREE.Scene();

    const cameraFarPlane = 10_000_000; // 10 million units
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      cameraFarPlane
    );
    this.camera.position.z = 15; // Default start position

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: false, // Keep pixelated aesthetic
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000); // Black background
    // Enable logarithmic depth buffer if needed for large scenes
    // NOTE: Requires compatible materials (e.g., MeshBasicMaterial wireframe might be okay)
    // this.renderer.logarithmicDepthBuffer = true; // Commented out due to type error

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Optional: OrbitControls for debugging
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.05;
    // this.controls.screenSpacePanning = false;

    // Setup scene logics before loading assets
    this.setupSceneLogics();

    try {
      await this.createAssets(cameraFarPlane); // Wait for assets to load
      this.startAnimationLoop();

      // Add global listeners
      window.addEventListener("resize", this.boundOnWindowResize);
      window.addEventListener("keydown", this.boundHandleGlobalInput);
      window.addEventListener("keyup", this.boundHandleGlobalInput); // Listen for keyup too
      window.addEventListener("mousedown", this.boundHandleGlobalInput);
      // window.addEventListener("mouseup", this.boundHandleGlobalInput); // Add if needed

      console.log("GameManager initialized and listeners added.");
    } catch (error) {
      console.error("Error during initialization:", error);
      // Still call callback to unblock UI
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
    if (!this.scene || !this.camera) {
      throw new Error("Scene or camera not initialized");
    }

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
    // Example radius - adjust as needed for scale relative to far plane
    const planetRadius = cameraFarPlane * 0.05; // Example: 5% of far plane distance
    this.assets.planet = new Planet(this.scene, planetRadius, 0x44aa44); // Greenish planet
    loadPromises.push(
      this.assets.planet.load().then(() => {
        if (this.scene) {
          this.assets.planet?.addToScene(this.scene); // Add to scene after load
          this.assets.planet?.setVisible(false); // Start hidden
        } else {
          console.warn("Scene disposed before Planet could be added.");
        }
      })
    );

    // --- Instantiate Space Station ---
    this.assets.spaceStation = new SpaceStation(
      this.scene,
      spaceStationPath,
      stationScale,
      0xffff00 // Yellow station
    );
    loadPromises.push(
      this.assets.spaceStation.load().then(() => {
        if (this.scene) {
          this.assets.spaceStation?.addToScene(this.scene);
          this.assets.spaceStation?.setVisible(false); // Start hidden
        } else {
          console.warn("Scene disposed before SpaceStation could be added.");
        }
      })
    );

    // --- Instantiate Title Ships ---
    this.assets.titleShips = []; // Clear previous array if any
    shipFilePaths.forEach((path) => {
      const ship = new Ship(this.scene!, path, Constants.SHIP_SCALE, 0x00ffff); // Cyan ships
      this.assets.titleShips.push(ship);
      loadPromises.push(
        ship.load().then(() => {
          if (this.scene) {
            ship.addToScene(this.scene); // Add each ship after it loads
            ship.setVisible(false); // Start hidden
          } else {
            console.warn(
              `Scene disposed before Title Ship (${path}) could be added.`
            );
          }
        })
      );
    });

    // --- Instantiate Pirate Ships ---
    this.assets.pirateShips = []; // Clear previous array if any
    for (let i = 0; i < Constants.PIRATE_COUNT; i++) {
      const pirate = new Ship(
        this.scene!,
        pirateShipPath,
        Constants.SHIP_SCALE,
        0xff0000
      ); // Red pirates
      this.assets.pirateShips.push(pirate);
      loadPromises.push(
        pirate.load().then(() => {
          if (this.scene) {
            pirate.addToScene(this.scene); // Add each pirate after it loads
            pirate.setVisible(false); // Start hidden
          } else {
            console.warn(
              `Scene disposed before Pirate Ship (${i}) could be added.`
            );
          }
        })
      );
    }

    // --- Undocking Squares (Keep as is for now) ---
    // Geometry and material should be created once
    const squareOutlineGeom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0,
    ]);
    squareOutlineGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3)
    );
    const squareLineMat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    squareLineMat.userData = { disposeOnce: true }; // Mark for single disposal

    this.assets.undockingSquares = [];
    if (this.scene) {
      for (let i = 0; i < 20; i++) {
        // Use the shared geometry and material
        const squareLine = new THREE.LineLoop(squareOutlineGeom, squareLineMat);
        squareLine.scale.set((i + 1) * 2, (i + 1) * 2, 1);
        squareLine.position.z = -i * 5;
        squareLine.visible = false; // Start hidden
        this.scene.add(squareLine); // Add squares directly
        this.assets.undockingSquares.push(squareLine);
      }
    } else {
      console.warn("Scene disposed before Undocking Squares could be added.");
      this.assets.undockingSquares = []; // Ensure array exists
      // Manually dispose shared geometry/material if scene died early
      squareOutlineGeom.dispose();
      squareLineMat.dispose();
    }
    // --- End Undocking Squares ---

    // --- Loading Completion ---
    console.log(`Starting loading of ${loadPromises.length} assets...`);
    await Promise.all(loadPromises); // Use await to ensure completion before proceeding

    // Check if scene exists after loading
    if (!this.scene) {
      console.warn("Scene disposed during asset loading.");
      // Still call callback? Maybe not, as the game state is likely invalid.
      // if (this.loadingCompleteCallback) this.loadingCompleteCallback();
      return; // Don't proceed if scene is gone
    }

    console.log("All assets loaded successfully.");
    if (this.loadingCompleteCallback) {
      this.loadingCompleteCallback(); // Notify React loading is done
    } else {
      console.warn("loadingCompleteCallback not set!");
    }

    // NOTE: Initial state logic activation ('enter') is now handled by the hooks
    // in App.tsx based on the `gameState` and `isActive` flags.
    // The class-based 'enter' for SpaceFlightSceneLogic will be called via switchState.
  } // End createAssets

  // --- Hook Update Registration ---
  registerSceneUpdate(state: GameState, updateFn: (deltaTime: number) => void) {
    this.sceneUpdateFunctions[state] = updateFn;
  }

  unregisterSceneUpdate(state: GameState) {
    delete this.sceneUpdateFunctions[state];
  }
  // --- End Hook Update Registration ---

  animate() {
    // Important: Check if animation should run
    if (this.animationFrameId === null && !this.clock.running) {
      console.log("Animation loop stopped, exiting animate.");
      return; // Don't request another frame if explicitly stopped
    }

    if (!this.renderer || !this.scene || !this.camera) return;
    const deltaTime = this.clock.getDelta();

    // Update Entities (Planet, Station, Pirates have their own updates)
    this.assets.planet?.update(deltaTime);
    this.assets.spaceStation?.update(deltaTime);
    this.assets.pirateShips.forEach((pirate) => pirate.update(deltaTime));
    // Title ships are updated by the TitleSceneLogic hook

    // Optional: Update OrbitControls
    // this.controls?.update();

    // Update Current Scene Logic
    // Prioritize hook update function if registered
    const currentHookUpdateFn = this.sceneUpdateFunctions[this.currentState];
    if (currentHookUpdateFn) {
      currentHookUpdateFn(deltaTime); // Call hook's update function
    } else {
      // Fallback to class-based logic (only space_flight remains)
      const currentClassLogic = this.sceneLogics[this.currentState];
      currentClassLogic?.update(deltaTime);
    }

    // Render the scene
    this.renderer.render(this.scene, this.camera);

    // Request next frame
    this.animationFrameId = requestAnimationFrame(this.boundAnimate);
  }

  startAnimationLoop() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.clock.start(); // Ensure clock is running
    this.boundAnimate(); // Initial call
  }

  stopAnimationLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.clock.stop(); // Stop the clock
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

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

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
    this.stopAnimationLoop();

    // Remove global listeners
    window.removeEventListener("resize", this.boundOnWindowResize);
    window.removeEventListener("keydown", this.boundHandleGlobalInput);
    window.removeEventListener("keyup", this.boundHandleGlobalInput);
    window.removeEventListener("mousedown", this.boundHandleGlobalInput);
    // window.removeEventListener("mouseup", this.boundHandleGlobalInput);

    // Dispose Entities managed by assets
    this.assets.planet?.dispose();
    this.assets.spaceStation?.dispose();
    this.assets.titleShips.forEach((ship) => ship.dispose());
    this.assets.pirateShips.forEach((pirate) => pirate.dispose());

    // Dispose remaining non-entity THREE objects (like undocking squares)
    // Ensure shared geometry/material are disposed only once
    let geomDisposed = false;
    let matDisposed = false;
    this.assets.undockingSquares.forEach((square) => {
      if (square.geometry && !geomDisposed) {
        square.geometry.dispose();
        geomDisposed = true;
      }
      // Check custom flag to dispose material only once, handling single or array
      const materials = Array.isArray(square.material) ? square.material : [square.material];
      materials.forEach(material => {
          if (material && !matDisposed && material.userData?.disposeOnce) {
              material.dispose();
              matDisposed = true; // Assume shared material, dispose only once globally
          }
      });

      this.scene?.remove(square); // Remove from scene
    });

    console.log("Entities and remaining objects disposed.");

    // Dispose renderer and controls
    this.renderer?.dispose();
    this.controls?.dispose();

    // Clear scene, references, and state
    this.scene?.clear(); // Clear scene children
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

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
