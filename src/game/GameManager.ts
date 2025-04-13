// src/game/GameManager.ts
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GameState, IGameManager } from "../types"; // Import IGameManager if needed by SceneLogic constructor, otherwise just GameState
import { SceneLogic } from "./SceneLogic"; // Import base class if needed

// Import Scene Logics
import { LoadingScene } from "../scenes/LoadingScene";
import { TitleScene } from "../scenes/TitleScene";
import { CreditsScene } from "../scenes/CreditsScene";
import { StatsScene } from "../scenes/StatsScene";
import { UndockingScene } from "../scenes/UndockingScene";
import { SpaceFlightScene } from "../scenes/SpaceFlightScene";

// Import Constants
import * as Constants from "../constants";

// Asset Interface (Optional but good practice)
interface GameAssets {
    titleShips: (THREE.Object3D | null)[];
    planet: THREE.Mesh | null;
    stars: THREE.Points | null;
    undockingSquares: THREE.LineLoop[]; // <-- CHANGED TYPE HERE
}

export class GameManager implements IGameManager { // Implement the interface
    scene: THREE.Scene | null = null;
    camera: THREE.PerspectiveCamera | null = null;
    renderer: THREE.WebGLRenderer | null = null;
    clock: THREE.Clock = new THREE.Clock();
    assets: GameAssets = { // <-- TYPE IS CORRECT HERE
        titleShips: [],
        planet: null,
        stars: null,
        undockingSquares: [],
    };
    assetsToLoad: number = 0;
    assetsLoaded: number = 0;
    loadingCompleteCallback: (() => void) | null = null;
    currentState: GameState = "loading";
    sceneLogics: Partial<Record<GameState, SceneLogic>> = {}; // Use Partial as not all might be defined initially
    animationFrameId: number | null = null;

    // Refs from React
    introMusicRef: React.RefObject<HTMLAudioElement>;
    undockSoundRef: React.RefObject<HTMLAudioElement>;
    reactSetGameState: (state: GameState) => void;

    // Title Scene State (kept here as it uses game assets directly)
    currentShipIndex: number = 0;
    shipDisplayTimer: number = 0;

    // Store constants for easy access by scenes via `this.game.constants`
    constants = Constants;

    // --- Bound event handlers ---
    boundHandleGlobalInput: (event: KeyboardEvent | MouseEvent) => void;
    boundOnWindowResize: () => void;
    boundAnimate: () => void;


    constructor(
        reactSetGameState: (state: GameState) => void,
        introMusicRef: React.RefObject<HTMLAudioElement>,
        undockSoundRef: React.RefObject<HTMLAudioElement>
        ) {
        this.reactSetGameState = reactSetGameState;
        this.introMusicRef = introMusicRef;
        this.undockSoundRef = undockSoundRef;

        // Pre-bind methods to ensure `this` context is correct
        this.boundHandleGlobalInput = this.handleGlobalInput.bind(this);
        this.boundOnWindowResize = this.onWindowResize.bind(this);
        this.boundAnimate = this.animate.bind(this);
    }

    init(canvas: HTMLCanvasElement, loadingCallback: () => void) {
        this.loadingCompleteCallback = loadingCallback;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            4100 // Increased far plane
        );
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: false, // Keep antialias setting
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000); // Black background

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Ambient light
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        this.createAssets(); // Load assets
        this.setupSceneLogics(); // Instantiate scene logic classes
        this.startAnimationLoop(); // Start rendering

        // Add event listeners using the pre-bound methods
        window.addEventListener("resize", this.boundOnWindowResize);
        window.addEventListener("keydown", this.boundHandleGlobalInput);
        window.addEventListener("mousedown", this.boundHandleGlobalInput);

        console.log("GameManager initialized and listeners added.");

        // Enter the initial state
        this.sceneLogics[this.currentState]?.enter();
    }

    setupSceneLogics() {
        this.sceneLogics.loading = new LoadingScene(this);
        this.sceneLogics.title = new TitleScene(this);
        this.sceneLogics.credits = new CreditsScene(this);
        this.sceneLogics.stats = new StatsScene(this);
        this.sceneLogics.undocking = new UndockingScene(this);
        this.sceneLogics.space_flight = new SpaceFlightScene(this);
    }

    createAssets() {
        if (!this.scene) return;
        const loader = new GLTFLoader();
        const shipFilePaths = [
            "assets/ships/ship-cobra.gltf",
            "assets/ships/ship-pirate.gltf",
            "assets/ships/asteroid.gltf",
        ];
        const shipScale = 6;

        this.assetsToLoad = shipFilePaths.length; // Only count ships for the loader progress
        this.assetsLoaded = 0;
        this.assets.titleShips = new Array(shipFilePaths.length).fill(null);

        console.log(`Expecting ${this.assetsToLoad} ship assets.`);

        // Planet (simplified material)
        const planetGeometry = new THREE.SphereGeometry(160, 16, 12); // Adjust segments if needed
        const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red basic material
        this.assets.planet = new THREE.Mesh(planetGeometry, planetMaterial);
        this.assets.planet.visible = false;
        this.scene.add(this.assets.planet);

        // Starfield
        const starVertices = [];
        for (let i = 0; i < 2000; i++) { // Number of stars
            const x = THREE.MathUtils.randFloatSpread(4000); // Spread range
            const y = THREE.MathUtils.randFloatSpread(4000);
            const z = THREE.MathUtils.randFloatSpread(4000);
            // Ensure stars are not clumped too close to the center (optional)
            if (Math.sqrt(x*x + y*y + z*z) > 100) {
                 starVertices.push(x, y, z);
            }
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5, // Adjust size
            sizeAttenuation: false // Stars maintain size regardless of distance
        });
        this.assets.stars = new THREE.Points(starGeometry, starMaterial);
        this.assets.stars.visible = false; // Initially hidden
        this.scene.add(this.assets.stars);

        // --- Undocking Squares (Outline only) --- START CHANGE ---
        const squareOutlineGeom = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            -0.5, -0.5, 0, // bottom left
             0.5, -0.5, 0, // bottom right
             0.5,  0.5, 0, // top right
            -0.5,  0.5, 0, // top left
             // -0.5, -0.5, 0, // No need to repeat for LineLoop
        ]);
        squareOutlineGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const squareLineMat = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green lines

        // Ensure the array is cleared before pushing LineLoop objects
        this.assets.undockingSquares = [];

        for (let i = 0; i < 10; i++) { // Number of squares
            // Use LineLoop instead of Mesh
            const squareLine = new THREE.LineLoop(squareOutlineGeom, squareLineMat);
            squareLine.scale.set((i + 1) * 2, (i + 1) * 2, 1); // Increasingly larger scale
            squareLine.position.z = -i * 5; // Spaced out along Z
            squareLine.visible = false;
            this.scene.add(squareLine);
            this.assets.undockingSquares.push(squareLine); // Store the LineLoop object
        }
        // --- Undocking Squares (Outline only) --- END CHANGE ---


        // Load Ships
        shipFilePaths.forEach((path, index) => {
            loader.load(
                path,
                (gltf) => {
                    console.log(`Successfully loaded ${path}`);
                    const loadedShip = gltf.scene;
                    loadedShip.scale.set(shipScale, shipScale, shipScale);
                    loadedShip.visible = false; // Initially hidden

                    // Apply wireframe material
                    loadedShip.traverse((child) => {
                        if ((child as THREE.Mesh).isMesh) {
                            const mesh = child as THREE.Mesh;
                            // Replace existing material or create new basic wireframe
                             mesh.material = new THREE.MeshBasicMaterial({
                                color: 0xffff00, // Yellow wireframe
                                wireframe: true
                            });
                        }
                    });

                    this.scene?.add(loadedShip);
                    this.assets.titleShips[index] = loadedShip;
                    this.checkLoadingComplete(); // Check progress
                },
                undefined, // onProgress callback (optional)
                (error) => {
                    console.error(`Error loading ${path}:`, error);
                    this.assets.titleShips[index] = null; // Mark as failed/null
                    this.checkLoadingComplete(); // Still counts as processed
                }
            );
        });

        // If no ships to load, immediately mark as complete
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
                this.loadingCompleteCallback(); // Call the callback passed from React
            } else {
                console.warn("loadingCompleteCallback not set!");
            }
        }
    }

    animate() {
        if (!this.renderer || !this.scene || !this.camera) return;

        const deltaTime = this.clock.getDelta();
        const currentLogic = this.sceneLogics[this.currentState];

        // Update current scene logic
        currentLogic?.update(deltaTime);

        // Render the scene
        this.renderer.render(this.scene, this.camera);

        // Request next frame
        this.animationFrameId = requestAnimationFrame(this.boundAnimate); // Use bound version
    }

    startAnimationLoop() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.clock.start(); // Ensure clock is started/reset
        this.animationFrameId = requestAnimationFrame(this.boundAnimate); // Use bound version
    }

    stopAnimationLoop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    switchState(newState: GameState) {
        if (newState === this.currentState || !this.sceneLogics[newState]) {
            console.warn(`Cannot switch to state ${newState} from ${this.currentState}`);
            return;
        }

        const oldState = this.currentState;
        const oldLogic = this.sceneLogics[oldState];
        const newLogic = this.sceneLogics[newState];

        console.log(`Switching state from ${oldState} to ${newState}`);

        // Exit old state
        oldLogic?.exit(newState);

        this.currentState = newState;
        this.reactSetGameState(newState); // Update React state

        // Enter new state
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
        // Delegate input handling to the current scene's logic
        currentLogic?.handleInput(event);
    }

     // --- Title Scene Animation Helpers (kept in GameManager as they modify game assets/state) ---
    prepareShip(index: number) {
        const ship = this.assets.titleShips[index];
        if (ship) {
            ship.position.set(this.constants.TARGET_POS.x, this.constants.TARGET_POS.y, this.constants.START_Z);
            ship.rotation.set(0, Math.PI, 0); // Pointing towards camera initially
            ship.visible = true;
        } else {
            console.warn(`Attempted to prepare missing ship at index ${index}`);
        }
    }

    updateTitleShipAnimation(deltaTime: number) {
        // This logic remains complex and tied to game state/assets, so kept here.
        // Could be further encapsulated if needed.
        if (this.assets.titleShips.length === 0) return; // No ships loaded

        this.shipDisplayTimer += deltaTime;
        const currentShip = this.assets.titleShips[this.currentShipIndex];

        if (!currentShip) {
            console.warn(`Ship at index ${this.currentShipIndex} is missing during animation. Skipping.`);
            // Force cycle to next available ship if current one is null
            this.shipDisplayTimer = this.constants.TOTAL_CYCLE_DURATION;
        } else {
            const timer = this.shipDisplayTimer;

            if (timer < this.constants.FLY_IN_DURATION) {
                // Fly In
                const t = Math.min(1, timer / this.constants.FLY_IN_DURATION); // Clamp t to 0-1
                 // Interpolate Z position using lerp
                currentShip.position.z = THREE.MathUtils.lerp(this.constants.START_Z, this.constants.TARGET_POS.z, t);
                currentShip.rotation.y += 0.1 * deltaTime; // Gentle yaw
            } else if (timer < this.constants.FLY_IN_DURATION + this.constants.HOLD_DURATION) {
                // Hold and Rotate
                currentShip.position.z = this.constants.TARGET_POS.z; // Ensure it's exactly at target Z
                currentShip.rotation.y += 0.5 * deltaTime; // Faster yaw
                currentShip.rotation.x += 0.25 * deltaTime; // Gentle pitch/roll
            } else if (timer < this.constants.TOTAL_CYCLE_DURATION) {
                // Fly Out
                const flyOutTimer = timer - (this.constants.FLY_IN_DURATION + this.constants.HOLD_DURATION);
                const t = Math.min(1, flyOutTimer / this.constants.FLY_OUT_DURATION); // Clamp t to 0-1
                // Interpolate Z position using lerp
                currentShip.position.z = THREE.MathUtils.lerp(this.constants.TARGET_POS.z, this.constants.START_Z, t);
                currentShip.rotation.y += 0.1 * deltaTime; // Gentle yaw
            } else {
                 // Ensure ship is fully out before hiding (timer might slightly exceed TOTAL_CYCLE_DURATION)
                currentShip.position.z = this.constants.START_Z;
            }
        }

        // Check if cycle is complete
        if (this.shipDisplayTimer >= this.constants.TOTAL_CYCLE_DURATION) {
            if (currentShip) currentShip.visible = false; // Hide the completed ship

            // Find the next *valid* (non-null) ship index
            const validShipIndices = this.assets.titleShips
                .map((_, i) => i)
                .filter(i => this.assets.titleShips[i] !== null);

            if (validShipIndices.length > 0) {
                 const currentValidIndex = validShipIndices.indexOf(this.currentShipIndex);
                 // Calculate next index within the valid indices array
                 const nextValidIndex = (currentValidIndex + 1) % validShipIndices.length;
                 this.currentShipIndex = validShipIndices[nextValidIndex]; // Get the actual ship index
                 this.prepareShip(this.currentShipIndex); // Prepare the next valid ship
            } else {
                console.warn("No valid title ships available to display.");
                // Reset timer anyway to prevent infinite loop if called again
            }

            this.shipDisplayTimer = 0; // Reset timer for the next cycle
        }
    }


    dispose() {
        console.log("Disposing GameManager...");
        this.stopAnimationLoop();

        // Remove event listeners using the stored bound references
        window.removeEventListener("resize", this.boundOnWindowResize);
        window.removeEventListener("keydown", this.boundHandleGlobalInput);
        window.removeEventListener("mousedown", this.boundHandleGlobalInput);
        console.log("Event listeners removed.");

        // Dispose Three.js resources
        this.renderer?.dispose();
        this.scene?.traverse((object) => {
            if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) { // Include Line
                object.geometry?.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach((material) => material.dispose());
                } else if (object.material) {
                    object.material.dispose();
                }
            }
            // Also dispose textures if any were loaded directly
        });

        // Clear references
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.assets = { titleShips: [], planet: null, stars: null, undockingSquares: [] };
        this.sceneLogics = {};
        this.loadingCompleteCallback = null;
        // No need to explicitly nullify bound methods unless strictly necessary for GC

        console.log("GameManager disposed.");
    }
}