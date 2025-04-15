// src/game/GameManager.ts
import * as THREE from "three";
// Removed GLTFLoader import here, entities handle their own loading
import { GameState, IGameManager, GameAssets } from "../types";
import { SceneLogicBase } from "../features/common/SceneLogicBase";

// Import Scene Logics (no change needed here)
import { LoadingSceneLogic } from "../features/loading/LoadingSceneLogic";
import { TitleSceneLogic } from "../features/title/TitleSceneLogic";
import { CreditsSceneLogic } from "../features/credits/CreditsSceneLogic";
import { StatsSceneLogic } from "../features/stats/StatsSceneLogic";
import { UndockingSceneLogic } from "../features/undocking/UndockingSceneLogic";
import { SpaceFlightSceneLogic } from "../features/space_flight/SpaceFlightSceneLogic";

// Import Entity Classes
import { Planet } from "./entities/Planet";
import { Ship } from "./entities/Ship";
import { SpaceStation } from "./entities/SpaceStation";

// Import Constants
import * as Constants from "../constants";

// Keep ship scale as needed based on model source size
const shipScale = 6;
const stationScale = shipScale * 1.5; // Make station a bit larger

export class GameManager implements IGameManager {
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  clock: THREE.Clock = new THREE.Clock();
  // Initialize assets with correct types
  assets: GameAssets = {
    titleShips: [],
    planet: null,
    undockingSquares: [],
    spaceStation: null,
    pirateShips: [], // Initialize pirate ships array
  };
  // Removed assetsToLoad, assetsLoaded - now handled by Promise.all
  loadingCompleteCallback: (() => void) | null = null;
  currentState: GameState = "loading";
  sceneLogics: Partial<Record<GameState, SceneLogicBase>> = {};
  animationFrameId: number | null = null;

  // Refs from React (no change)
  introMusicRef: React.RefObject<HTMLAudioElement>;
  undockSoundRef: React.RefObject<HTMLAudioElement>;
  reactSetGameState: (state: GameState) => void;
  reactSetCoordinates: (coords: [number, number, number]) => void;
  reactSetSpeed: (speed: number) => void;
  reactSetRoll: (roll: number) => void;
  reactSetPitch: (pitch: number) => void;
  reactSetStationDirection: (angle: number | null) => void;

  // Title Scene State (no change)
  currentShipIndex: number = 0;
  shipDisplayTimer: number = 0;

  // Constants (no change)
  constants = { ...Constants };

  // Bound event handlers (no change)
  boundHandleGlobalInput: (event: KeyboardEvent | MouseEvent) => void;
  boundOnWindowResize: () => void;
  boundAnimate: () => void;

  constructor(
    reactSetGameState: (state: GameState) => void,
    introMusicRef: React.RefObject<HTMLAudioElement>,
    undockSoundRef: React.RefObject<HTMLAudioElement>,
    reactSetCoordinates: (coords: [number, number, number]) => void,
    reactSetSpeed: (speed: number) => void,
    reactSetRoll: (roll: number) => void,
    reactSetPitch: (pitch: number) => void,
    reactSetStationDirection: (angle: number | null) => void
  ) {
    this.reactSetGameState = reactSetGameState;
    this.introMusicRef = introMusicRef;
    this.reactSetCoordinates = reactSetCoordinates;
    this.undockSoundRef = undockSoundRef;
    this.reactSetSpeed = reactSetSpeed;
    this.reactSetRoll = reactSetRoll;
    this.reactSetPitch = reactSetPitch;
    this.reactSetStationDirection = reactSetStationDirection;

    this.boundHandleGlobalInput = this.handleGlobalInput.bind(this);
    this.boundOnWindowResize = this.onWindowResize.bind(this);
    this.boundAnimate = this.animate.bind(this);
  }

  init(canvas: HTMLCanvasElement, loadingCallback: () => void) {
    this.loadingCompleteCallback = loadingCallback;
    this.scene = new THREE.Scene();

    const cameraFarPlane = 10000000; // 10 million units
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      cameraFarPlane
    );
    this.camera.position.z = 15;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.renderer.logarithmicDepthBuffer = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Slightly stronger directional
    directionalLight.position.set(5, 5, 5); // Adjust position for better angles
    this.scene.add(directionalLight);

    this.createAssets(cameraFarPlane); // Will now trigger async loading
    this.setupSceneLogics();
    this.startAnimationLoop();

    window.addEventListener("resize", this.boundOnWindowResize);
    window.addEventListener("keydown", this.boundHandleGlobalInput);
    window.addEventListener("mousedown", this.boundHandleGlobalInput);

    console.log("GameManager initialized and listeners added.");
    // Don't enter initial state here, wait for loading to complete
  }

  setupSceneLogics() {
    this.sceneLogics.loading = new LoadingSceneLogic(this);
    this.sceneLogics.title = new TitleSceneLogic(this);
    this.sceneLogics.credits = new CreditsSceneLogic(this);
    this.sceneLogics.stats = new StatsSceneLogic(this);
    this.sceneLogics.undocking = new UndockingSceneLogic(this);
    this.sceneLogics.space_flight = new SpaceFlightSceneLogic(this);
  }

  createAssets(cameraFarPlane: number) {
    if (!this.scene || !this.camera) return;

    const shipFilePaths = [
      "assets/ships/ship-cobra.gltf",
      "assets/ships/ship-pirate.gltf",
      "assets/ships/asteroid.gltf",
    ];
    const spaceStationPath = "assets/ships/spacestation.gltf";
    const pirateShipPath = "assets/ships/ship-pirate.gltf"; // Use pirate model

    const loadPromises: Promise<void>[] = [];

    // --- Instantiate Planet ---
    const planetRadius = 500000;
    this.assets.planet = new Planet(this.scene, planetRadius, 0x44aa44); // Greenish planet
    loadPromises.push(
      this.assets.planet.load().then(() => {
        this.assets.planet?.addToScene(); // Add to scene after successful load
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
        this.assets.spaceStation?.addToScene();
      })
    );

    // --- Instantiate Title Ships ---
    this.assets.titleShips = []; // Clear previous array if any
    shipFilePaths.forEach((path) => {
      const ship = new Ship(this.scene!, path, shipScale, 0x00ffff); // Cyan ships
      this.assets.titleShips.push(ship);
      loadPromises.push(
        ship.load().then(() => {
          ship.addToScene(); // Add each ship after it loads
        })
      );
    });

    // --- Instantiate Pirate Ships ---
    this.assets.pirateShips = []; // Clear previous array if any
    for (let i = 0; i < Constants.PIRATE_COUNT; i++) {
        const pirate = new Ship(this.scene!, pirateShipPath, shipScale, 0xff0000); // Red pirates
        this.assets.pirateShips.push(pirate);
        loadPromises.push(
            pirate.load().then(() => {
                pirate.addToScene(); // Add each pirate after it loads
            })
        );
    }


    // --- Undocking Squares (Keep as is for now) ---
    const squareOutlineGeom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0,
    ]);
    squareOutlineGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3)
    );
    const squareLineMat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    this.assets.undockingSquares = [];
    for (let i = 0; i < 20; i++) {
      const squareLine = new THREE.LineLoop(squareOutlineGeom, squareLineMat);
      squareLine.scale.set((i + 1) * 2, (i + 1) * 2, 1);
      squareLine.position.z = -i * 5;
      squareLine.visible = false;
      this.scene.add(squareLine); // Add squares directly
      this.assets.undockingSquares.push(squareLine);
    }
    // --- End Undocking Squares ---

    // --- Loading Completion ---
    console.log(`Starting loading of ${loadPromises.length} assets...`);
    Promise.all(loadPromises)
      .then(() => {
        console.log("All assets loaded successfully.");
        if (this.loadingCompleteCallback) {
          this.loadingCompleteCallback();
        } else {
          console.warn("loadingCompleteCallback not set!");
        }
        // Enter the initial state ONLY after loading is complete
        this.sceneLogics[this.currentState]?.enter();
      })
      .catch((error) => {
        console.error("Error loading one or more assets:", error);
        // Handle loading failure, maybe show an error message
        // Possibly still call loadingCompleteCallback to unblock UI
        if (this.loadingCompleteCallback) {
          this.loadingCompleteCallback(); // Still notify React UI might need update
        }
        // Enter initial state even with errors? Or a specific error state?
        this.sceneLogics[this.currentState]?.enter(); // Or switch to an error state
      });
  }

  // Removed checkLoadingComplete method

  animate() {
    if (!this.renderer || !this.scene || !this.camera) return;
    const deltaTime = this.clock.getDelta();

    // Update Entities
    this.assets.planet?.update(deltaTime);
    this.assets.spaceStation?.update(deltaTime);
    this.assets.pirateShips.forEach(pirate => pirate.update(deltaTime)); // Update pirates
    // Ships might have their own update logic, but title animation is external
    // this.assets.titleShips.forEach(ship => ship.update(deltaTime));

    // Update Current Scene Logic
    const currentLogic = this.sceneLogics[this.currentState];
    currentLogic?.update(deltaTime);

    this.renderer.render(this.scene, this.camera);
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
    if (newState === this.currentState || !this.sceneLogics[newState]) {
      console.warn(
        `Cannot switch to state ${newState} from ${this.currentState}`
      );
      return;
    }
    const oldState = this.currentState;
    const oldLogic = this.sceneLogics[oldState];
    const newLogic = this.sceneLogics[newState];
    console.log(`Switching state from ${oldState} to ${newState}`);
    oldLogic?.exit(newState);
    this.currentState = newState;
    this.reactSetGameState(newState); // Update React state
    newLogic?.enter(oldState);
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  handleGlobalInput(event: KeyboardEvent | MouseEvent) {
    const currentLogic = this.sceneLogics[this.currentState];
    currentLogic?.handleInput(event);
  }

  // --- Title Scene Animation Helpers ---
  // These now manipulate the Ship *entity* properties, primarily position/rotation via its mesh

  prepareNextTitleShip() {
    const shipEntity = this.assets.titleShips[this.currentShipIndex];
    if (shipEntity?.mesh) { // Check if ship and its mesh exist
      const startZ = this.constants.START_Z * (shipScale > 1 ? 2 : 1);
      // Use entity methods or direct mesh access for positioning
      shipEntity.setPosition(
        this.constants.TARGET_POS.x,
        this.constants.TARGET_POS.y,
        startZ
      );
      shipEntity.setRotation(0, Math.PI, 0);
      shipEntity.setVisible(true);
    } else {
      console.warn(
        `Ship entity or mesh at index ${this.currentShipIndex} is missing. Attempting next.`
      );
      this.advanceTitleShip();
    }
  }

  advanceTitleShip() {
    if (this.assets.titleShips.length === 0) return; // No ships

    const currentShipEntity = this.assets.titleShips[this.currentShipIndex];
    currentShipEntity?.setVisible(false); // Hide the old one using entity method

    // Find the next valid index (checking if entity and its mesh exist)
    let nextIndex = (this.currentShipIndex + 1) % this.assets.titleShips.length;
    let attempts = 0; // Prevent infinite loop if no valid ships
    while (
      (!this.assets.titleShips[nextIndex]?.mesh &&
       attempts < this.assets.titleShips.length)
    ) {
      nextIndex = (nextIndex + 1) % this.assets.titleShips.length;
      attempts++;
    }

    if (!this.assets.titleShips[nextIndex]?.mesh) {
      console.warn("No valid title ships available to display.");
      // Optionally hide all ships or handle error
      this.assets.titleShips.forEach(ship => ship?.setVisible(false));
      this.currentShipIndex = 0; // Reset index
      this.shipDisplayTimer = 0;
      return;
    }

    this.currentShipIndex = nextIndex;
    this.shipDisplayTimer = 0;
    this.prepareNextTitleShip(); // Prepare the newly selected valid ship
  }

  updateTitleShipAnimation(deltaTime: number) {
    const currentShipEntity = this.assets.titleShips[this.currentShipIndex];

    // Ensure the current entity and its mesh are valid
    if (!currentShipEntity?.mesh) {
      console.warn(
        `Current ship entity or mesh invalid (index ${this.currentShipIndex}) during animation update.`
      );
      this.advanceTitleShip(); // Try to recover
      return;
    }

    this.shipDisplayTimer += deltaTime;
    const currentShipMesh = currentShipEntity.mesh; // Use the mesh for direct manipulation

    // --- Animation Logic (manipulating the mesh directly) ---
    const timer = this.shipDisplayTimer;
    const startZ = this.constants.START_Z * (shipScale > 1 ? 2 : 1);
    const targetZ = this.constants.TARGET_POS.z;

    if (timer < this.constants.FLY_IN_DURATION) {
      const t = Math.min(1, timer / this.constants.FLY_IN_DURATION);
      currentShipMesh.position.z = THREE.MathUtils.lerp(startZ, targetZ, t);
      currentShipMesh.rotation.y += 0.1 * deltaTime; // Keep rotation direct for now
    } else if (
      timer <
      this.constants.FLY_IN_DURATION + this.constants.HOLD_DURATION
    ) {
      currentShipMesh.position.z = targetZ;
      currentShipMesh.rotation.y += 0.5 * deltaTime;
      currentShipMesh.rotation.x += 0.25 * deltaTime;
    } else if (timer < this.constants.TOTAL_CYCLE_DURATION) {
      const flyOutTimer =
        timer - (this.constants.FLY_IN_DURATION + this.constants.HOLD_DURATION);
      const t = Math.min(1, flyOutTimer / this.constants.FLY_OUT_DURATION);
      currentShipMesh.position.z = THREE.MathUtils.lerp(targetZ, startZ, t);
      currentShipMesh.rotation.y += 0.1 * deltaTime;
    } else {
      currentShipMesh.position.z = startZ; // Ensure it's fully out before advancing
    }
    // --- End Animation Logic ---

    // Cycle to next ship
    if (this.shipDisplayTimer >= this.constants.TOTAL_CYCLE_DURATION) {
      this.advanceTitleShip(); // Advances index, resets timer, prepares next
    }
  }

  dispose() {
    console.log("Disposing GameManager...");
    this.stopAnimationLoop();
    window.removeEventListener("resize", this.boundOnWindowResize);
    window.removeEventListener("keydown", this.boundHandleGlobalInput);
    window.removeEventListener("mousedown", this.boundHandleGlobalInput);

    // Dispose Entities
    this.assets.planet?.dispose();
    this.assets.spaceStation?.dispose();
    this.assets.titleShips.forEach((ship) => ship.dispose());
    this.assets.pirateShips.forEach((pirate) => pirate.dispose()); // Dispose pirates

    // Dispose remaining non-entity THREE objects (like undocking squares)
    this.assets.undockingSquares.forEach(square => {
         square.geometry?.dispose();
         if (Array.isArray(square.material)) {
             square.material.forEach(m => m.dispose());
         } else {
             square.material?.dispose();
         }
         this.scene?.remove(square); // Remove from scene as well
    });


    console.log("Entities and remaining objects disposed.");

    this.renderer?.dispose(); // Dispose renderer resources
    // Scene objects should be handled by entity dispose, but clear scene just in case
    // this.scene?.clear(); // Use dispose methods instead

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    // Reset assets structure
    this.assets = {
      titleShips: [],
      planet: null,
      undockingSquares: [],
      spaceStation: null,
      pirateShips: [],
    };
    this.sceneLogics = {};
    this.loadingCompleteCallback = null;
    console.log("GameManager disposed.");
  }
}