// src/game/GameManager.ts
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GameState, IGameManager, GameAssets } from "../types"; // Import GameAssets
import { SceneLogicBase } from "../features/common/SceneLogicBase";

// Import Scene Logics
import { LoadingSceneLogic } from "../features/loading/LoadingSceneLogic";
import { TitleSceneLogic } from "../features/title/TitleSceneLogic";
import { CreditsSceneLogic } from "../features/credits/CreditsSceneLogic";
import { StatsSceneLogic } from "../features/stats/StatsSceneLogic";
import { UndockingSceneLogic } from "../features/undocking/UndockingSceneLogic";
import { SpaceFlightSceneLogic } from "../features/space_flight/SpaceFlightSceneLogic";

// Import Constants
import * as Constants from "../constants";

// Keep ship scale as needed based on model source size
const shipScale = 6;

export class GameManager implements IGameManager {
  scene: THREE.Scene | null = null;
  camera: THREE.PerspectiveCamera | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  clock: THREE.Clock = new THREE.Clock();
  assets: GameAssets = {
    titleShips: [],
    planet: null,
    stars: null,
    undockingSquares: [],
    hyperStars: null, // Add hyperspace stars
    spaceStation: null,
  };
  assetsToLoad: number = 0;
  assetsLoaded: number = 0;
  loadingCompleteCallback: (() => void) | null = null;
  currentState: GameState = "loading";
  sceneLogics: Partial<Record<GameState, SceneLogicBase>> = {};
  animationFrameId: number | null = null;

  // Refs from React
  introMusicRef: React.RefObject<HTMLAudioElement>;
  undockSoundRef: React.RefObject<HTMLAudioElement>;
  reactSetGameState: (state: GameState) => void;
  reactSetCoordinates: (coords: [number, number, number]) => void;
  reactSetSpeed: (speed: number) => void;
  reactSetRoll: (roll: number) => void;
  reactSetPitch: (pitch: number) => void;
  reactSetStationDirection: (angle: number | null) => void;

  // Title Scene State
  currentShipIndex: number = 0;
  shipDisplayTimer: number = 0;

  // Constants
  constants = { ...Constants };

  // Bound event handlers
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

    const cameraFarPlane = 10000000; // 10 million units (meters / 10,000 km)
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1, // Keep near plane small for close objects
      cameraFarPlane
    );
    this.camera.position.z = 15;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.renderer.logarithmicDepthBuffer = true; // Crucial for large far plane values

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    this.createAssets(cameraFarPlane); // Pass far plane to asset creation
    this.setupSceneLogics();
    this.startAnimationLoop();

    window.addEventListener("resize", this.boundOnWindowResize);
    window.addEventListener("keydown", this.boundHandleGlobalInput);
    window.addEventListener("mousedown", this.boundHandleGlobalInput);

    console.log("GameManager initialized and listeners added.");
    this.sceneLogics[this.currentState]?.enter();
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
    const loader = new GLTFLoader();
    const shipFilePaths = [
      "assets/ships/ship-cobra.gltf",
      "assets/ships/ship-pirate.gltf",
      "assets/ships/asteroid.gltf",
    ];
    const spaceStationPath = "assets/ships/spacestation.gltf";

    this.assetsToLoad = shipFilePaths.length + 1 + 1; // +1 for space station, +1 for stars/hyperstars setup
    this.assetsLoaded = 0;
    this.assets.titleShips = new Array(shipFilePaths.length).fill(null);

    console.log(`Expecting ${this.assetsToLoad} total assets.`);

    const planetRadius = 500000; // 500 km radius (adjust as needed for visual size)
    const planetGeometry = new THREE.SphereGeometry(planetRadius, 128, 64); // Increased segments for smoother large sphere
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.assets.planet = new THREE.Mesh(planetGeometry, planetMaterial);
    this.assets.planet.visible = false;
    this.scene.add(this.assets.planet);

    // --- Star Creation (Normal and Hyperspace) ---
    const starVertices = [];
    const starfieldRadius = cameraFarPlane * 0.95; // Place stars just inside the far plane
    const numStars = 2000;
    for (let i = 0; i < numStars; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = starfieldRadius * Math.sin(phi) * Math.cos(theta);
      const y = starfieldRadius * Math.sin(phi) * Math.sin(theta);
      const z = starfieldRadius * Math.cos(phi);
      starVertices.push(x, y, z);
    }

    // Normal Point Stars
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: false, // Stars maintain size regardless of distance
    });
    this.assets.stars = new THREE.Points(starGeometry, starMaterial);
    this.assets.stars.visible = false;
    this.assets.stars.renderOrder = -1;
    this.scene.add(this.assets.stars);

    // Hyperspace Line Stars
    const hyperStarVertices = [];
    const hyperLineLength = 100000000; // Length of the streaks
    for (let i = 0; i < starVertices.length; i += 3) {
      const x = starVertices[i];
      const y = starVertices[i + 1];
      const z = starVertices[i + 2];
      const originVec = new THREE.Vector3(x, y, z);
      const direction = originVec.clone().normalize(); // Unit vector from center to star

      // Calculate the half-length offset vector *without* modifying the original direction
      const offset = direction.clone().multiplyScalar(hyperLineLength / 2);

      // Calculate start and end points relative to the original star position
      const startPoint = originVec.clone().sub(offset);
      const endPoint = originVec.clone().add(offset); // Use the *original* originVec
      hyperStarVertices.push(startPoint.x, startPoint.y, startPoint.z);
      hyperStarVertices.push(endPoint.x, endPoint.y, endPoint.z);
    }
    const hyperStarGeometry = new THREE.BufferGeometry();
    hyperStarGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(hyperStarVertices, 3)
    );
    const hyperStarMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.assets.hyperStars = new THREE.LineSegments(
      hyperStarGeometry,
      hyperStarMaterial
    );
    this.assets.hyperStars.visible = false; // Initially hidden
    this.assets.hyperStars.renderOrder = -1; // Render behind other objects
    this.scene.add(this.assets.hyperStars);
    this.checkLoadingComplete(); // Count star generation as one loaded "asset" group
    // --- End Star Creation ---

    // --- Undocking Squares ---
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
      this.scene.add(squareLine);
      this.assets.undockingSquares.push(squareLine);
    }
    // --- End Undocking Squares ---

    // Load Ships
    shipFilePaths.forEach((path, index) => {
      loader.load(
        path,
        (gltf) => {
          console.log(`Successfully loaded ${path}`);
          const loadedShip = gltf.scene.clone(); // Clone scene to avoid issues if model is reused
          loadedShip.scale.set(shipScale, shipScale, shipScale);
          loadedShip.visible = false;

          loadedShip.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.material = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true,
              });
              // Ensure material compatibility with logarithmic depth buffer
              mesh.material.needsUpdate = true;
            }
          });

          this.scene?.add(loadedShip);
          this.assets.titleShips[index] = loadedShip;
          this.checkLoadingComplete();
        },
        undefined,
        (error) => {
          console.error(`Error loading ${path}:`, error);
          this.assets.titleShips[index] = null; // Ensure null on error
          this.checkLoadingComplete();
        }
      );
    });

    // Load Space Station Separately
    loader.load(
      spaceStationPath,
      (gltf) => {
        console.log(`Successfully loaded ${spaceStationPath}`);
        this.assets.spaceStation = gltf.scene.clone(); // Clone scene
        // Apply scale - might need adjustment specifically for station
        this.assets.spaceStation.scale.set(
          shipScale * 1.5,
          shipScale * 1.5,
          shipScale * 1.5
        ); // Make station a bit larger
        this.assets.spaceStation.visible = false;

        this.assets.spaceStation.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshBasicMaterial({
              color: 0xffff00, // Yellow wireframe
              wireframe: true,
            });
            mesh.material.needsUpdate = true;
          }
        });

        this.scene?.add(this.assets.spaceStation);
        this.checkLoadingComplete();
      },
      undefined,
      (error) => {
        console.error(`Error loading ${spaceStationPath}:`, error);
        this.assets.spaceStation = null; // Explicitly set to null on error
        this.checkLoadingComplete(); // Still count it as "processed"
      }
    );

    // Check completion in case all assets were already loaded (e.g., cached) or if there were none to load
    if (this.assetsLoaded >= this.assetsToLoad) {
      this.checkLoadingComplete();
    }
  }

  checkLoadingComplete() {
    this.assetsLoaded++;
    console.log(`Assets loaded: ${this.assetsLoaded}/${this.assetsToLoad}`);
    if (
      this.assetsLoaded >= this.assetsToLoad &&
      this.loadingCompleteCallback
    ) {
      console.log("All assets processed. Informing React.");
      if (this.loadingCompleteCallback) {
        this.loadingCompleteCallback();
      } else {
        console.warn("loadingCompleteCallback not set!");
      }
    }
  }

  // Method to toggle between normal and hyperspace star visuals
  toggleHyperSpaceVisuals(active: boolean): void {
    if (this.assets.stars) {
      this.assets.stars.visible = !active;
    }
    if (this.assets.hyperStars) {
      this.assets.hyperStars.visible = active;
      // Ensure hyper stars are positioned correctly when activated
      if (
        active &&
        this.camera &&
        this.assets.hyperStars.position !== this.camera.position
      ) {
        this.assets.hyperStars.position.copy(this.camera.position);
      }
    } else {
      console.warn("HyperStars asset not available to toggle visibility.");
    }
  }

  animate() {
    if (!this.renderer || !this.scene || !this.camera) return;
    const deltaTime = this.clock.getDelta();
    const currentLogic = this.sceneLogics[this.currentState];
    currentLogic?.update(deltaTime);
    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.boundAnimate);
  }

  startAnimationLoop() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.clock.start();
    this.animationFrameId = requestAnimationFrame(this.boundAnimate);
  }

  stopAnimationLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
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
    this.reactSetGameState(newState);
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

  prepareNextTitleShip() {
    const ship = this.assets.titleShips[this.currentShipIndex]; // Get the *intended* next ship
    if (ship) {
      // Keep existing logic assuming constants are okay for now
      const startZ = this.constants.START_Z * (shipScale > 1 ? 2 : 1);
      ship.position.set(
        this.constants.TARGET_POS.x,
        this.constants.TARGET_POS.y,
        startZ
      );
      ship.rotation.set(0, Math.PI, 0);
      ship.visible = true;
    } else {
      console.warn(
        `Ship at index ${this.currentShipIndex} is missing or null. Attempting next.`
      );
      // Immediately try to advance to the next *valid* ship
      this.advanceTitleShip();
    }
  }

  advanceTitleShip() {
    if (this.assets.titleShips.length === 0) return; // No ships to cycle
    const currentShip = this.assets.titleShips[this.currentShipIndex];
    if (currentShip) currentShip.visible = false; // Hide the old one

    // Find the next valid index
    let nextIndex = (this.currentShipIndex + 1) % this.assets.titleShips.length;
    while (
      !this.assets.titleShips[nextIndex] &&
      nextIndex !== this.currentShipIndex
    ) {
      // Skip null/missing ships
      nextIndex = (nextIndex + 1) % this.assets.titleShips.length;
    }

    if (
      !this.assets.titleShips[nextIndex] &&
      nextIndex === this.currentShipIndex
    ) {
      console.warn("No valid title ships available to display.");
      this.currentShipIndex = 0; // Reset or handle appropriately
      this.shipDisplayTimer = 0;
      return; // Exit if no valid ship found
    } else {
      this.currentShipIndex = nextIndex;
      this.shipDisplayTimer = 0;
      this.prepareNextTitleShip(); // Prepare the newly selected valid ship
    }
  }

  updateTitleShipAnimation(deltaTime: number) {
    const validShips = this.assets.titleShips.filter((ship) => ship !== null);
    if (validShips.length === 0) return; // No valid ships to animate

    this.shipDisplayTimer += deltaTime;
    const currentShip = this.assets.titleShips[this.currentShipIndex];

    if (!currentShip) {
      // This case should be less likely now with prepareNextTitleShip, but handle defensively
      console.warn(
        `Current ship index ${this.currentShipIndex} invalid during animation update.`
      );
      this.advanceTitleShip(); // Try to move to the next valid one
      return;
    }

    // --- Animation Logic (largely unchanged) ---
    const timer = this.shipDisplayTimer;
    const startZ = this.constants.START_Z * (shipScale > 1 ? 2 : 1);
    const targetZ = this.constants.TARGET_POS.z;

    if (timer < this.constants.FLY_IN_DURATION) {
      const t = Math.min(1, timer / this.constants.FLY_IN_DURATION);
      currentShip.position.z = THREE.MathUtils.lerp(startZ, targetZ, t);
      currentShip.rotation.y += 0.1 * deltaTime;
    } else if (
      timer <
      this.constants.FLY_IN_DURATION + this.constants.HOLD_DURATION
    ) {
      currentShip.position.z = targetZ;
      currentShip.rotation.y += 0.5 * deltaTime;
      currentShip.rotation.x += 0.25 * deltaTime;
    } else if (timer < this.constants.TOTAL_CYCLE_DURATION) {
      const flyOutTimer =
        timer - (this.constants.FLY_IN_DURATION + this.constants.HOLD_DURATION);
      const t = Math.min(1, flyOutTimer / this.constants.FLY_OUT_DURATION);
      currentShip.position.z = THREE.MathUtils.lerp(targetZ, startZ, t);
      currentShip.rotation.y += 0.1 * deltaTime;
    } else {
      currentShip.position.z = startZ; // Ensure it's fully out
    }
    // --- End Animation Logic ---

    // Cycle to next ship
    if (this.shipDisplayTimer >= this.constants.TOTAL_CYCLE_DURATION) {
      this.advanceTitleShip();
    }
  }

  dispose() {
    console.log("Disposing GameManager...");
    this.stopAnimationLoop();
    window.removeEventListener("resize", this.boundOnWindowResize);
    window.removeEventListener("keydown", this.boundHandleGlobalInput);
    window.removeEventListener("mousedown", this.boundHandleGlobalInput);
    console.log("Event listeners removed.");
    this.renderer?.dispose();
    this.scene?.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.Points ||
        object instanceof THREE.Line
      ) {
        object.geometry?.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material?.dispose());
      }
    });
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.assets = {
      titleShips: [],
      planet: null,
      stars: null,
      undockingSquares: [],
      hyperStars: null,
      spaceStation: null,
    };
    this.sceneLogics = {};
    this.loadingCompleteCallback = null;
    console.log("GameManager disposed.");
  }
}
