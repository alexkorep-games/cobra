import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; // Correct import path
import "./App.css"; // Import the CSS

// --- Constants ---
const SHIP_DISPLAY_DURATION = 10.0; // Seconds

// Define game states
type GameState =
  | "loading"
  | "title"
  | "credits"
  | "stats"
  | "undocking"
  | "space_flight";

const App: React.FC = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>("loading");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isReadyToContinue, setIsReadyToContinue] = useState(false); // For loader screen prompt

  // --- Refs ---
  const mountRef = useRef<HTMLDivElement>(null); // Ref for the container div
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameInstanceRef = useRef<any>(null); // To hold game logic instance/state across renders
  const introMusicRef = useRef<HTMLAudioElement>(null);
  const undockSoundRef = useRef<HTMLAudioElement>(null);

  // --- Game Logic (encapsulated within useEffect) ---
  useEffect(() => {
    if (!mountRef.current || !canvasRef.current) {
      console.error("Mount point or canvas not found");
      return;
    }

    // Prevent multiple initializations if StrictMode is on
    if (gameInstanceRef.current) {
      console.log("Game instance already exists, skipping init.");
      return;
    }

    console.log("Initializing Game Logic...");

    // --- Base Scene Class (Adapted for internal use) ---
    class SceneLogic {
      game: any; // Reference to the main game logic object
      inputProcessed: boolean = false;
      timeoutId: NodeJS.Timeout | null = null;

      constructor(game: any) {
        this.game = game;
      }
      enter(previousState?: GameState) {
        // Optional previous state for context
        console.log(`Entering state: ${this.game.currentState}`);
        this.inputProcessed = false;
        // Reset common elements visibility often needed on state change
        this.game.assets.planet.visible = false;
        this.game.assets.stars.visible = false;
        this.game.assets.titleShips.forEach(
          (ship: THREE.Object3D | null) => ship && (ship.visible = false)
        );
        this.game.assets.undockingSquares.forEach(
          (square: THREE.Mesh) => (square.visible = false)
        );
      }
      exit(nextState?: GameState) {
        // Optional next state for context
        console.log(`Exiting state: ${this.game.currentState}`);
        if (this.timeoutId) clearTimeout(this.timeoutId);
      }
      update(deltaTime: number) {}
      handleInput(event: KeyboardEvent | MouseEvent) {}
    }

    // --- Game Manager Object (Simplified) ---
    const gameLogic = {
      scene: null as THREE.Scene | null,
      camera: null as THREE.PerspectiveCamera | null,
      renderer: null as THREE.WebGLRenderer | null,
      clock: new THREE.Clock(),
      assets: {
        titleShips: [] as (THREE.Object3D | null)[],
        planet: null as THREE.Mesh | null,
        stars: null as THREE.Points | null,
        undockingSquares: [] as THREE.Mesh[],
      },
      assetsToLoad: 0,
      assetsLoaded: 0,
      loadingCompleteCallback: null as (() => void) | null, // Callback for React state update
      currentState: "loading" as GameState, // Keep track internally too
      sceneLogics: {} as Record<GameState, SceneLogic>, // Store logic handlers
      animationFrameId: null as number | null,

      // --- Title Scene Specific ---
      currentShipIndex: 0,
      shipDisplayTimer: 0,
      FLY_IN_DURATION: 0.5,
      FLY_OUT_DURATION: 0.5,
      HOLD_DURATION: Math.max(0, SHIP_DISPLAY_DURATION - 0.5 - 0.5),
      TOTAL_CYCLE_DURATION: SHIP_DISPLAY_DURATION,
      START_Z: -150,
      TARGET_POS: new THREE.Vector3(-3, 0, 0),

      init(canvas: HTMLCanvasElement, loadingCallback: () => void) {
        this.loadingCompleteCallback = loadingCallback;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          4100
        ); // Increased far plane for stars
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: false,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);

        this.createAssets(); // Start loading
        this.setupSceneLogics();
        this.startAnimationLoop();

        window.addEventListener("resize", this.onWindowResize);
        window.addEventListener("keydown", this.handleGlobalInput);
        window.addEventListener("mousedown", this.handleGlobalInput);
      },

      setupSceneLogics() {
        // Loader Logic
        this.sceneLogics.loading = new SceneLogic(this);
        this.sceneLogics.loading.enter = () => {
          SceneLogic.prototype.enter.call(this.sceneLogics.loading); // Call base enter
          if (this.assets.stars) this.assets.stars.visible = true;
        };
        this.sceneLogics.loading.update = (deltaTime) => {
          if (this.assets.stars)
            this.assets.stars.rotation.y += 0.01 * deltaTime;
        };
        this.sceneLogics.loading.handleInput = (event) => {
          if (
            !this.sceneLogics.loading.inputProcessed &&
            this.game.loadingCompleteCallback
          ) {
            // Check if React state is ready
            if (event.type === "keydown" || event.type === "mousedown") {
              this.sceneLogics.loading.inputProcessed = true;
              this.switchState("title");
            }
          }
        };

        // Title Logic
        this.sceneLogics.title = new SceneLogic(this);
        this.sceneLogics.title.enter = () => {
          SceneLogic.prototype.enter.call(this.sceneLogics.title);
          this.assets.titleShips.forEach(
            (ship) => ship && (ship.visible = false)
          );
          this.currentShipIndex = 0;
          this.shipDisplayTimer = 0;
          this.prepareShip(this.currentShipIndex);

          if (this.assets.planet) {
            this.assets.planet.visible = true;
            this.assets.planet.position.set(200, 0, -500);
            this.assets.planet.scale.set(1, 1, 1);
          }
          if (this.assets.stars) this.assets.stars.visible = true;

          introMusicRef.current
            ?.play()
            .catch((e) => console.warn("Intro music play failed:", e));
        };
        this.sceneLogics.title.exit = () => {
          SceneLogic.prototype.exit.call(this.sceneLogics.title);
          const currentShip = this.assets.titleShips[this.currentShipIndex];
          if (currentShip) currentShip.visible = false;
          if (this.assets.planet) this.assets.planet.visible = false;
          introMusicRef.current?.pause();
          if (introMusicRef.current) introMusicRef.current.currentTime = 0;
        };
        this.sceneLogics.title.update = (deltaTime) => {
          if (this.assets.stars)
            this.assets.stars.rotation.y += 0.01 * deltaTime;
          this.updateTitleShipAnimation(deltaTime);
        };
        this.sceneLogics.title.handleInput = (event) => {
          if (
            !this.sceneLogics.title.inputProcessed &&
            (event.type === "keydown" || event.type === "mousedown")
          ) {
            this.sceneLogics.title.inputProcessed = true;
            this.switchState("credits");
          }
        };

        // Credits Logic
        this.sceneLogics.credits = new SceneLogic(this);
        this.sceneLogics.credits.enter = () => {
          SceneLogic.prototype.enter.call(this.sceneLogics.credits);
          if (this.assets.stars) this.assets.stars.visible = true;
          this.sceneLogics.credits.timeoutId = setTimeout(() => {
            if (this.currentState === "credits") this.switchState("stats");
          }, 3000);
        };
        this.sceneLogics.credits.update = (deltaTime) => {
          if (this.assets.stars)
            this.assets.stars.rotation.y += 0.01 * deltaTime;
        };

        // Stats Logic
        this.sceneLogics.stats = new SceneLogic(this);
        this.sceneLogics.stats.enter = () => {
          SceneLogic.prototype.enter.call(this.sceneLogics.stats);
          if (this.assets.stars) this.assets.stars.visible = true;
          this.sceneLogics.stats.timeoutId = setTimeout(() => {
            if (this.currentState === "stats") this.switchState("undocking");
          }, 5000);
        };
        this.sceneLogics.stats.update = (deltaTime) => {
          if (this.assets.stars)
            this.assets.stars.rotation.y += 0.01 * deltaTime;
        };

        // Undocking Logic
        this.sceneLogics.undocking = new SceneLogic(this);
        this.sceneLogics.undocking.enter = () => {
          SceneLogic.prototype.enter.call(this.sceneLogics.undocking);
          if (this.assets.stars) this.assets.stars.visible = true;
          this.assets.undockingSquares.forEach((square, i) => {
            square.position.z = -i * 5;
            square.visible = true;
          });
          undockSoundRef.current
            ?.play()
            .catch((e) => console.warn("Undock sound play failed:", e));
          this.sceneLogics.undocking.timeoutId = setTimeout(() => {
            if (this.currentState === "undocking")
              this.switchState("space_flight");
          }, 3500);
        };
        this.sceneLogics.undocking.exit = () => {
          SceneLogic.prototype.exit.call(this.sceneLogics.undocking);
          this.assets.undockingSquares.forEach((s) => (s.visible = false));
          if (undockSoundRef.current) undockSoundRef.current.currentTime = 0;
        };
        this.sceneLogics.undocking.update = (deltaTime) => {
          if (this.assets.stars)
            this.assets.stars.rotation.y += 0.01 * deltaTime;
          const speed = 20.0;
          const cameraZ = this.camera?.position.z ?? 0;
          this.assets.undockingSquares.forEach((s, i) => {
            s.position.z += speed * deltaTime;
            if (s.position.z > cameraZ + 5) {
              s.position.z =
                -this.assets.undockingSquares.length * 5 +
                (5 - (s.position.z - (cameraZ + 5)));
            }
          });
        };

        // Space Flight Logic
        this.sceneLogics.space_flight = new SceneLogic(this);
        this.sceneLogics.space_flight.enter = () => {
          SceneLogic.prototype.enter.call(this.sceneLogics.space_flight);
          if (this.assets.planet) {
            this.assets.planet.position.set(0, 15, -60);
            this.assets.planet.scale.set(5, 5, 5);
            this.assets.planet.visible = true;
          }
          if (this.assets.stars) this.assets.stars.visible = true;
          console.log("Entered Space Flight Scene. Intro sequence complete.");
        };
        this.sceneLogics.space_flight.update = (deltaTime) => {
          if (this.assets.stars)
            this.assets.stars.rotation.y += 0.01 * deltaTime;
        };
      },

      // --- Asset Creation and Loading ---
      createAssets() {
        if (!this.scene) return;
        const loader = new GLTFLoader();
        // Make paths relative by removing leading slash
        const shipFilePaths = [
          "assets/ships/ship-cobra.gltf",
          "assets/ships/ship-pirate.gltf",
          "assets/ships/asteroid.gltf",
        ];
        const shipScale = 6;

        this.assetsToLoad = shipFilePaths.length;
        this.assetsLoaded = 0;
        this.assets.titleShips = new Array(this.assetsToLoad).fill(null);

        console.log(`Expecting ${this.assetsToLoad} ship assets.`);

        // Planet
        const planetGeometry = new THREE.SphereGeometry(160, 16, 12);
        const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.assets.planet = new THREE.Mesh(planetGeometry, planetMaterial);
        this.assets.planet.visible = false;
        this.scene.add(this.assets.planet);

        // Starfield
        const starVertices = [];
        for (let i = 0; i < 2000; i++) {
          const x = THREE.MathUtils.randFloatSpread(4000);
          const y = THREE.MathUtils.randFloatSpread(4000);
          const z = THREE.MathUtils.randFloatSpread(4000);
          if (Math.sqrt(x * x + y * y + z * z) > 100)
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
          sizeAttenuation: false,
        });
        this.assets.stars = new THREE.Points(starGeometry, starMaterial);
        this.assets.stars.visible = false;
        this.scene.add(this.assets.stars);

        // Undocking Squares
        const squareGeom = new THREE.PlaneGeometry(1, 1);
        const squareMat = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          side: THREE.DoubleSide,
          wireframe: true,
        });
        this.assets.undockingSquares = [];
        for (let i = 0; i < 10; i++) {
          const square = new THREE.Mesh(squareGeom, squareMat);
          square.scale.set((i + 1) * 2, (i + 1) * 2, 1);
          square.position.z = -i * 5;
          square.visible = false;
          this.scene.add(square);
          this.assets.undockingSquares.push(square);
        }

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
                  // Ensure wireframe if needed, or basic material
                  if (
                    !mesh.material ||
                    (mesh.material as THREE.Material).type ===
                      "MeshStandardMaterial"
                  ) {
                    mesh.material = new THREE.MeshBasicMaterial({
                      color: 0xffff00,
                      wireframe: true,
                    });
                  } else if (
                    (mesh.material as THREE.MeshBasicMaterial).wireframe !==
                    undefined
                  ) {
                    (mesh.material as THREE.MeshBasicMaterial).wireframe = true; // Force wireframe for the retro look
                  }
                }
              });
              this.scene?.add(loadedShip);
              this.assets.titleShips[index] = loadedShip;
              this.checkLoadingComplete();
            },
            undefined, // Optional progress handler
            (error) => {
              console.error(`Error loading ${path}:`, error);
              this.assets.titleShips[index] = null; // Mark as failed
              this.checkLoadingComplete();
            }
          );
        });

        // Check completion immediately in case there are 0 assets to load
        if (this.assetsToLoad === 0) {
          this.checkLoadingComplete();
        }
      },

      checkLoadingComplete() {
        this.assetsLoaded++;
        console.log(`Assets loaded: ${this.assetsLoaded}/${this.assetsToLoad}`);
        if (this.assetsLoaded >= this.assetsToLoad) {
          console.log("All assets processed. Informing React.");
          if (this.loadingCompleteCallback) {
            this.loadingCompleteCallback(); // Trigger React state update
          } else {
            console.warn("loadingCompleteCallback not set!");
          }
        }
      },

      // --- Animation Loop ---
      animate() {
        if (!this.renderer || !this.scene || !this.camera) return;
        const deltaTime = this.clock.getDelta();

        // Call update function of the current state logic
        const currentLogic = this.sceneLogics[this.currentState];
        if (currentLogic && typeof currentLogic.update === "function") {
          currentLogic.update(deltaTime);
        }

        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
      },

      startAnimationLoop() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.animate();
      },

      stopAnimationLoop() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      },

      // --- State Switching ---
      switchState(newState: GameState) {
        if (newState === this.currentState) return; // No change

        const oldState = this.currentState;
        const oldLogic = this.sceneLogics[oldState];
        const newLogic = this.sceneLogics[newState];

        if (oldLogic && typeof oldLogic.exit === "function") {
          oldLogic.exit(newState); // Pass next state for context
        }

        this.currentState = newState;
        console.log("GameLogic switched state to:", newState);

        // Call React's state setter via the callback passed from useEffect
        this.reactSetGameState(newState);

        if (newLogic && typeof newLogic.enter === "function") {
          newLogic.enter(oldState); // Pass previous state for context
        }
      },

      // This function will be replaced by the actual setGameState from useState
      reactSetGameState: (state: GameState) => {
        console.warn(
          "reactSetGameState placeholder called. This should be overridden."
        );
      },

      // --- Event Handlers ---
      onWindowResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },

      handleGlobalInput(event: KeyboardEvent | MouseEvent) {
        const currentLogic = this.sceneLogics[this.currentState];
        if (currentLogic && typeof currentLogic.handleInput === "function") {
          // Specific check for loader continue prompt activation
          if (this.currentState === "loading" && !isReadyToContinue) {
            // Don't process input for loader until 'GAME LOADED' appears
            return;
          }
          currentLogic.handleInput(event);
        }
      },

      // --- Title Scene Animation Helpers ---
      prepareShip(index: number) {
        const ship = this.assets.titleShips[index];
        if (ship) {
          ship.position.set(this.TARGET_POS.x, this.TARGET_POS.y, this.START_Z);
          ship.rotation.set(0, Math.PI, 0);
          ship.visible = true;
        } else {
          console.warn(`Attempted to prepare missing ship at index ${index}`);
        }
      },

      updateTitleShipAnimation(deltaTime: number) {
        if (this.assets.titleShips.length === 0) return;

        this.shipDisplayTimer += deltaTime;
        const currentShip = this.assets.titleShips[this.currentShipIndex];

        if (!currentShip) {
          console.warn(
            `Ship at index ${this.currentShipIndex} is missing. Skipping.`
          );
          this.shipDisplayTimer = this.TOTAL_CYCLE_DURATION; // Force cycle
        } else {
          const timer = this.shipDisplayTimer;
          if (timer < this.FLY_IN_DURATION) {
            const t = Math.min(1, timer / this.FLY_IN_DURATION);
            currentShip.position.z = THREE.MathUtils.lerp(
              this.START_Z,
              this.TARGET_POS.z,
              t
            );
            currentShip.rotation.y += 0.1 * deltaTime;
          } else if (timer < this.FLY_IN_DURATION + this.HOLD_DURATION) {
            currentShip.position.z = this.TARGET_POS.z;
            currentShip.rotation.y += 0.5 * deltaTime;
            currentShip.rotation.x += 0.25 * deltaTime;
          } else if (timer < this.TOTAL_CYCLE_DURATION) {
            const flyOutTimer =
              timer - (this.FLY_IN_DURATION + this.HOLD_DURATION);
            const t = Math.min(1, flyOutTimer / this.FLY_OUT_DURATION);
            currentShip.position.z = THREE.MathUtils.lerp(
              this.TARGET_POS.z,
              this.START_Z,
              t
            );
            currentShip.rotation.y += 0.1 * deltaTime;
          }
        }

        if (this.shipDisplayTimer >= this.TOTAL_CYCLE_DURATION) {
          if (currentShip) currentShip.visible = false;
          this.currentShipIndex =
            (this.currentShipIndex + 1) % this.assets.titleShips.length;
          this.prepareShip(this.currentShipIndex);
          this.shipDisplayTimer = 0;
        }
      },

      // --- Cleanup ---
      dispose() {
        console.log("Disposing game logic...");
        this.stopAnimationLoop();
        window.removeEventListener("resize", this.onWindowResize);
        window.removeEventListener("keydown", this.handleGlobalInput);
        window.removeEventListener("mousedown", this.handleGlobalInput);

        this.renderer?.dispose();
        // Dispose geometries, materials, textures if needed for full cleanup
        this.scene?.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            // Dispose materials carefully, check if array
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else if (object.material) {
              object.material.dispose();
            }
          } else if (object instanceof THREE.Points) {
            object.geometry?.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            }
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
        }; // Clear assets
        gameInstanceRef.current = null; // Clear the ref
      },
    };

    // --- Bind React's state setter to the game logic ---
    gameLogic.reactSetGameState = setGameState; // Allow game logic to trigger React state updates

    // --- Initialize game logic ---
    gameLogic.init(canvasRef.current, () => {
      // This callback runs when checkLoadingComplete decides loading is done
      console.log("React notified that loading is complete.");
      setIsLoadingComplete(true); // Update React state
    });

    // Store the game logic instance in the ref
    gameInstanceRef.current = gameLogic;

    // --- Cleanup on component unmount ---
    return () => {
      gameInstanceRef.current?.dispose();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Effect to handle the loader's "Press Key" prompt ---
  useEffect(() => {
    if (gameState === "loading" && isLoadingComplete) {
      // Small delay to ensure "LOADING..." text disappears visually first if desired
      const timer = setTimeout(() => {
        setIsReadyToContinue(true);
      }, 100); // Short delay
      return () => clearTimeout(timer);
    } else {
      setIsReadyToContinue(false); // Reset if not in loading state or loading isn't complete
    }
  }, [gameState, isLoadingComplete]);

  // --- Global Input Handler (delegated by gameLogic) ---
  // We bind the actual event listeners in the gameLogic.init,
  // but keep this structure if we needed React-level handling later.
  // const handleInput = useCallback((event: KeyboardEvent | MouseEvent) => {
  //     gameInstanceRef.current?.handleGlobalInput(event);
  // }, []); // No dependencies needed as gameInstanceRef is stable

  // --- Render ---
  return (
    <div ref={mountRef} id="container">
      <canvas ref={canvasRef} id="eliteCanvas"></canvas>

      <div className="overlay">
        {/* --- Top Bar --- */}
        <div className="top-bar">
          {gameState !== "loading" &&
            gameState !== "undocking" &&
            gameState !== "space_flight" && (
              <span id="title-text">--- PROJECT COBRA ---</span>
            )}
          {gameState === "space_flight" && (
            <span id="bounty-text">
              BOUNTY: 5.0 Cr
            </span> /* Example: Show only in flight */
          )}
          {(gameState === "undocking" || gameState === "space_flight") && (
            <span id="view-text">Front View</span>
          )}
        </div>

        {/* --- Center Content (Conditional Rendering based on gameState) --- */}
        {gameState === "loading" && (
          <div id="loader-screen" className="center-text">
            {!isReadyToContinue && <p id="loader-progress-text">LOADING...</p>}
            {isReadyToContinue && (
              <p id="loader-continue-text">
                GAME LOADED
                <br />
                PRESS ANY KEY TO CONTINUE
              </p>
            )}
          </div>
        )}

        {gameState === "title" && (
          <div id="press-key-text" className="center-text">
            Press any key to start game
          </div>
        )}

        {gameState === "credits" && (
          <div id="credits-text" className="center-text small">
            Game Copyright:-
            <br />
            Bell & Braben
            <br />
            Code Copyright:-
            <br />
            Realtime Games
            <br />
            Software Ltd
            <br />
            Written by:-
            <br />
            Andy Onions
            <br />
            Cracked by:-
            <br />
            Key Software
          </div>
        )}

        {gameState === "stats" && (
          <div id="stats-screen" className="center-text small">
            <h2>COMMANDER JAMESON</h2>
            <p>
              <strong>System:</strong> LAVE
            </p>
            <p>
              <strong>Hypersystem:</strong> LAVE
            </p>
            <p>
              <strong>Fuel:</strong> 7.0 Light Years
            </p>
            <p>
              <strong>Cash:</strong> 100.0 Credits
            </p>
            <p>
              <strong>Legal Status:</strong> Clean
            </p>
            <p>
              <strong>Rating:</strong> Harmless
            </p>
            <p className="equipment">
              <strong>EQUIPMENT:</strong>
            </p>
            <p>Missile (3)</p>
            <p>Pulse Laser (Fore)</p>
          </div>
        )}

        {gameState === "undocking" && (
          <div id="leaving-text" className="center-text small">
            Leaving Space Station
          </div>
        )}

        {/* --- Bottom HUD (Show after loading) --- */}
        {gameState !== "loading" && (
          <div className="bottom-bar">
            {/* HUD Left */}
            <div className="hud-left">
              <div className="hud-item">
                <span className="hud-label">FORE-SHIELD</span>
                <div className="hud-bar">
                  <div
                    id="fore-shield-fill"
                    className="hud-bar-fill"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="hud-item">
                <span className="hud-label">AFT-SHIELD</span>
                <div className="hud-bar">
                  <div
                    id="aft-shield-fill"
                    className="hud-bar-fill"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="hud-item">
                <span className="hud-label">FUEL</span>
                <div className="hud-bar">
                  <div
                    id="fuel-fill"
                    className="hud-bar-fill"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div className="hud-item">
                <span className="hud-label">CABIN TEMP</span>
                <div className="hud-bar">
                  <div
                    id="cabin-temp-fill"
                    className="hud-bar-fill"
                    style={{ width: "10%" }}
                  ></div>
                </div>
              </div>
              <div className="hud-item">
                <span className="hud-label">LASER TEMP</span>
                <div className="hud-bar">
                  <div
                    id="laser-temp-fill"
                    className="hud-bar-fill red"
                    style={{ width: "5%" }}
                  ></div>
                </div>
              </div>
              <div className="hud-item">
                <span className="hud-label">ALTITUDE</span>
                <div className="hud-bar"></div> {/* No fill in original */}
              </div>
              <div className="hud-item">
                <span className="hud-label">MISSILES</span>
                <span className="hud-value"> M M M M</span>
              </div>
            </div>
            {/* HUD Center */}
            <div className="hud-center">
              <div className="scanner-shape"></div>
            </div>
            {/* HUD Right */}
            <div className="hud-right">
              <div className="hud-item">
                <span className="hud-label">SPEED</span>
                <div className="hud-bar">
                  <div className="hud-bar-fill" style={{ width: "10%" }}></div>
                </div>
              </div>
              <div className="hud-item">
                <span className="hud-label">ROLL</span>
                <div className="hud-bar">
                  <div className="hud-bar-fill" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div className="hud-item">
                <span className="hud-label">DIVE/CLIMB</span>
                <div className="hud-bar">
                  <div className="hud-bar-fill" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div
                className="hud-item"
                style={{ justifyContent: "center", marginTop: "5px" }}
              >
                <span
                  style={{ border: "1px solid #00ff00", padding: "2px 5px" }}
                >
                  1
                </span>
                <span
                  style={{
                    border: "1px solid #00ff00",
                    padding: "2px 5px",
                    margin: "0 5px",
                  }}
                >
                  2
                </span>
                <span
                  style={{ border: "1px solid #00ff00", padding: "2px 5px" }}
                >
                  3
                </span>
                <span
                  style={{
                    border: "1px solid #ffff00",
                    borderRadius: "50%",
                    width: "15px",
                    height: "15px",
                    display: "inline-block",
                    marginLeft: "10px",
                  }}
                ></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Audio Elements - Use refs */}
      <audio ref={introMusicRef} id="introMusic" loop>
        <source src="assets/elite_intro_music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element. (Needs
        elite_intro_music.mp3)
      </audio>
      <audio ref={undockSoundRef} id="undockSound">
        <source src="assets/undocking_sound.mp3" type="audio/mpeg" />
        Your browser does not support the audio element. (Needs
        undocking_sound.mp3)
      </audio>
    </div>
  );
};

export default App;
