// src/game/GameManager.ts
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GameState, IGameManager } from "../types";
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

// Asset Interface
interface GameAssets {
  titleShips: (THREE.Object3D | null)[];
  planet: THREE.Mesh | null;
  stars: THREE.Points | null;
  undockingSquares: THREE.LineLoop[];
}

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
    reactSetPitch: (pitch: number) => void
  ) {
    this.reactSetGameState = reactSetGameState;
    this.introMusicRef = introMusicRef;
    this.reactSetCoordinates = reactSetCoordinates;
    this.undockSoundRef = undockSoundRef;
    this.reactSetSpeed = reactSetSpeed;
    this.reactSetRoll = reactSetRoll;
    this.reactSetPitch = reactSetPitch;

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
      "assets/ships/spacestation.gltf",
      "assets/ships/ship-cobra.gltf",
      "assets/ships/ship-pirate.gltf",
      "assets/ships/asteroid.gltf",
    ];

    this.assetsToLoad = shipFilePaths.length;
    this.assetsLoaded = 0;
    this.assets.titleShips = new Array(shipFilePaths.length).fill(null);

    console.log(`Expecting ${this.assetsToLoad} ship assets.`);

    const planetRadius = 500000; // 500 km radius (adjust as needed for visual size)
    const planetGeometry = new THREE.SphereGeometry(planetRadius, 128, 64); // Increased segments for smoother large sphere
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.assets.planet = new THREE.Mesh(planetGeometry, planetMaterial);
    this.assets.planet.visible = false;
    this.scene.add(this.assets.planet);

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
          const loadedShip = gltf.scene;
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
          this.assets.titleShips[index] = null;
          this.checkLoadingComplete();
        }
      );
    });

    if (this.assetsToLoad === 0) {
      this.checkLoadingComplete();
    }
  }

  checkLoadingComplete() {
    this.assetsLoaded++;
    console.log(`Assets loaded: ${this.assetsLoaded}/${this.assetsToLoad}`);
    if (this.assetsLoaded >= this.assetsToLoad) {
      console.log("All assets processed. Informing React.");
      if (this.loadingCompleteCallback) {
        this.loadingCompleteCallback();
      } else {
        console.warn("loadingCompleteCallback not set!");
      }
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
  // No changes needed here unless TARGET_POS or START_Z constants are changed
  prepareShip(index: number) {
    const ship = this.assets.titleShips[index];
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
      console.warn(`Attempted to prepare missing ship at index ${index}`);
    }
  }

  updateTitleShipAnimation(deltaTime: number) {
    if (this.assets.titleShips.length === 0) return;
    this.shipDisplayTimer += deltaTime;
    const currentShip = this.assets.titleShips[this.currentShipIndex];

    if (!currentShip) {
      console.warn(
        `Ship at index ${this.currentShipIndex} is missing during animation. Skipping.`
      );
      this.shipDisplayTimer = this.constants.TOTAL_CYCLE_DURATION;
    } else {
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
          timer -
          (this.constants.FLY_IN_DURATION + this.constants.HOLD_DURATION);
        const t = Math.min(1, flyOutTimer / this.constants.FLY_OUT_DURATION);
        currentShip.position.z = THREE.MathUtils.lerp(targetZ, startZ, t);
        currentShip.rotation.y += 0.1 * deltaTime;
      } else {
        currentShip.position.z = startZ;
      }
    }

    if (this.shipDisplayTimer >= this.constants.TOTAL_CYCLE_DURATION) {
      if (currentShip) currentShip.visible = false;
      const validShipIndices = this.assets.titleShips
        .map((_, i) => i)
        .filter((i) => this.assets.titleShips[i] !== null);
      if (validShipIndices.length > 0) {
        const currentValidIndex = validShipIndices.indexOf(
          this.currentShipIndex
        );
        const nextValidIndex =
          (currentValidIndex + 1) % validShipIndices.length;
        this.currentShipIndex = validShipIndices[nextValidIndex];
        this.prepareShip(this.currentShipIndex);
      } else {
        console.warn("No valid title ships available to display.");
      }
      this.shipDisplayTimer = 0;
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
    };
    this.sceneLogics = {};
    this.loadingCompleteCallback = null;
    console.log("GameManager disposed.");
  }
}
