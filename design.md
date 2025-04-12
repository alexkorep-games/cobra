**Design Document: Project Cobra (Elite Browser Clone - Babylon.js)**

**Version:** 1.0
**Date:** 2023-10-27

**1. Overview**

This document details the technical design for "Project Cobra," a browser-based Elite clone built using the Babylon.js framework. It translates the requirements outlined in the PRD into a specific implementation strategy, focusing on architecture, scene management, core systems, and asset handling within the Babylon.js ecosystem.

**2. Core Architecture**

*   **Engine:** A single Babylon.js `Engine` instance will be created and managed globally, attached to an HTML5 canvas element.
*   **Scene Management:** The game will utilize multiple Babylon.js `Scene` objects to represent distinct game states (e.g., Title Screen, Space Flight, Station UI). A dedicated `SceneManager` class will handle loading, unloading, switching between scenes, and passing necessary context (like player state). This promotes better code organization and resource management compared to manipulating a single complex scene.
*   **Game Loop:** The main game loop will be driven by `engine.runRenderLoop()`. Each active scene will register its own logic within this loop using `scene.onBeforeRenderObservable` or similar observables for updates.
*   **Modularity:** Code will be organized into ES6 modules to ensure maintainability, testability, and clear separation of concerns.
*   **State Management:** A dedicated `StateManager` module will handle the global game state (player credits, location, ship status, cargo, etc.) and persistence (saving/loading to `localStorage`). Scenes and systems will interact with the `StateManager` to get and update data.

**3. Proposed File/Folder Structure**

```
project-cobra/
│
├── index.html              # Main HTML file hosting the canvas and UI overlays
├── style.css               # CSS for HTML UI overlays and basic page styling
│
├── src/
│   ├── main.js             # Application entry point, initializes Engine, SceneManager, Game
│   ├── Game.js             # Main game class, orchestrates scene transitions & high-level logic
│   ├── constants.js        # Game constants (e.g., commodity types, ship stats, key codes)
│   │
│   ├── core/
│   │   ├── Engine.js       # Singleton or module managing the Babylon Engine instance
│   │   └── SceneManager.js # Handles loading, switching, and disposing scenes
│   │
│   ├── scenes/             # Modules defining specific game scenes
│   │   ├── AbstractScene.js # Base class for scenes (optional, for common setup/dispose)
│   │   ├── LoadingScene.js # Initial asset loading progress display
│   │   ├── TitleScene.js   # Main menu scene (New Game, Load Game)
│   │   ├── SpaceFlightScene.js # The core 3D space environment
│   │   ├── StationUIScene.js # Manages HTML overlays for docked interactions
│   │   ├── MapScene.js     # Manages HTML overlay for Galactic/System Map
│   │   └── GameOverScene.js # Displays game over message and options
│   │
│   ├── gameplay/           # Core game logic systems
│   │   ├── Player.js       # Manages player state, ship instance link
│   │   ├── Ship.js         # Base class/logic for ship entities (player and NPC)
│   │   ├── CobraMk3.js     # Player ship specific implementation (extends Ship)
│   │   ├── NPCController.js # Spawns, manages AI, and controls NPC ships
│   │   ├── AI/             # AI state machines and behaviors
│   │   │   └── BasicPirateAI.js
│   │   │   └── BasicTraderAI.js
│   │   ├── CombatSystem.js # Handles targeting, weapon firing, damage calculation
│   │   ├── TradingSystem.js # Calculates market prices, handles buy/sell logic
│   │   ├── Universe.js     # Procedural galaxy/system generation, system data access
│   │   └── Navigation.js   # Hyperspace jump logic, intra-system navigation aids
│   │
│   ├── graphics/           # Rendering-specific modules
│   │   ├── ShipFactory.js  # Creates ship meshes (wireframe/low-poly) & materials
│   │   ├── StationFactory.js # Creates station meshes (e.g., Coriolis)
│   │   ├── EffectsManager.js # Manages particle systems (explosions), laser visuals
│   │   └── Hud.js          # Creates and updates the Babylon.js GUI HUD elements (Alternative: Managed by UIManager for HTML)
│   │
│   ├── systems/            # Cross-cutting concerns and managers
│   │   ├── InputManager.js # Handles keyboard/mouse input bindings and dispatches actions
│   │   ├── AudioManager.js # Manages sound effects and music playback (Web Audio API)
│   │   ├── StateManager.js # Handles game state and saving/loading to localStorage
│   │   └── UIManager.js      # Manages HTML overlay UI panels (visibility, data binding)
│   │
│   ├── utils/              # Utility functions (math, random number generation, etc.)
│   │   └── helpers.js
│   │
│   └── assets/             # Static game assets (served to the browser)
│       ├── textures/       # Skybox images, UI elements, particle textures
│       │   └── starfield_px.png
│       │   └── ...
│       ├── sounds/         # Sound effects and music files
│       │   └── laser.wav
│       │   └── explosion.mp3
│       │   └── blue_danube.ogg
│       │   └── ...
│       ├── fonts/          # Custom font files if needed for HTML UI
│       └── data/           # Potentially static data files (e.g., commodity definitions - could also be in constants.js)
│
└── package.json            # Project dependencies and build scripts (if using npm/bundler)
└── vite.config.js          # Example if using Vite bundler
```

**4. Scene Breakdown**

*   **4.1 LoadingScene (`scenes/LoadingScene.js`)**
    *   **Purpose:** Display loading progress while initial assets are fetched.
    *   **Implementation:** A simple Babylon.js scene with a 2D UI (Babylon GUI `AdvancedDynamicTexture`) showing a progress bar or text. Uses `AssetsManager` to load essential assets needed for the Title Screen. Transitions to `TitleScene` upon completion.
*   **4.2 TitleScene (`scenes/TitleScene.js`)**
    *   **Purpose:** Presents the main menu (New Game, Load Game options).
    *   **Implementation:** Minimal 3D elements (maybe a rotating wireframe ship or starfield). Primarily uses Babylon GUI or HTML overlay (`UIManager`) for menu buttons. Handles input for menu selection and triggers transitions via `SceneManager` to `SpaceFlightScene` (new/load) or potentially an options scene. Plays title music (`AudioManager`).
*   **4.3 SpaceFlightScene (`scenes/SpaceFlightScene.js`)**
    *   **Purpose:** The core interactive 3D space environment where flight, combat, and navigation occur.
    *   **Implementation:** This is the most complex scene.
        *   **Rendering:** Manages the main `PerspectiveCamera` attached to the player ship. Uses `ShipFactory` and `StationFactory` to create meshes. Implements the starfield background (Skybox or Points). Uses `EffectsManager` for visuals.
        *   **Entities:** Instantiates the player's `CobraMk3` object. Uses `NPCController` to spawn and manage other `Ship` instances.
        *   **Physics/Movement:** Handles player ship movement based on `InputManager` events. Manages simple collision detection between ships, station, asteroids (using bounding boxes or `intersectsMesh`).
        *   **Gameplay:** Integrates `CombatSystem` for weapon firing/damage. Listens for docking attempts near stations. Listens for Hyperspace jump commands (`Navigation`).
        *   **UI:** Creates and updates the in-cockpit HUD using Babylon GUI (`graphics/Hud.js`) OR relies on HTML overlays managed by `UIManager`. Displays data from `Player` and `CombatSystem`.
        *   **Audio:** Triggers spatialized sounds (engine hum, nearby lasers/explosions) via `AudioManager`.
        *   **Context:** Receives player state from `StateManager` on load. Updates `StateManager` when significant events occur (e.g., destruction, docking).
*   **4.4 StationUIScene (`scenes/StationUIScene.js` & HTML/CSS)**
    *   **Purpose:** Represents the docked state. Provides access to station services (Market, Refuel, Status).
    *   **Implementation:** This might *not* be a distinct Babylon.js 3D scene. Instead, the `SceneManager` could:
        1.  Pause/hide the `SpaceFlightScene`.
        2.  Instruct the `UIManager` to display the relevant HTML overlay panels (Market, Equipment, etc.).
        3.  `UIManager` interacts with `TradingSystem`, `Player`, `StateManager` to populate data and handle transactions.
        4.  Listens for the "Launch" command via `InputManager` / `UIManager` to transition back to `SpaceFlightScene`. Plays docking music (`AudioManager`).
*   **4.5 MapScene (`scenes/MapScene.js` & HTML/CSS)**
    *   **Purpose:** Displays the Galactic Chart and potentially Local System information for navigation.
    *   **Implementation:** Similar to `StationUIScene`, likely managed via HTML overlays.
        1.  Activated from `SpaceFlightScene` via key press (`InputManager`).
        2.  `UIManager` displays the map panel.
        3.  Panel interacts with `Universe` and `Navigation` systems to display system data and allow hyperspace target selection.
        4.  Returns to `SpaceFlightScene` on close/selection.
*   **4.6 GameOverScene (`scenes/GameOverScene.js`)**
    *   **Purpose:** Displayed when the player's ship is destroyed.
    *   **Implementation:** Simple scene (Babylon GUI or HTML overlay) showing a "Game Over" message and options like "Load Last Save" or "Return to Title." Interacts with `StateManager`.

**5. Key Systems (Implementation Details)**

*   **InputManager (`systems/InputManager.js`):** Uses `scene.actionManager` or `scene.onKeyboardObservable` / `scene.onPointerObservable`. Maps keys/mouse events to abstract actions (e.g., `THRUST_INCREASE`, `FIRE_LASER`, `OPEN_MAP`). Active scene subscribes to relevant actions.
*   **UIManager (`systems/UIManager.js`):** Manages the display state (show/hide) of different HTML panels (`<div>` elements styled with CSS). Handles data binding between game state (`StateManager`) and UI elements. Listens for UI events (button clicks) and dispatches actions back to the game logic or `SceneManager`.
*   **StateManager (`systems/StateManager.js`):** Holds the canonical game state in JavaScript objects. Provides functions like `saveGame()`, `loadGame()`, `getPlayerCredits()`, `setPlayerLocation()`, etc. Uses `JSON.stringify` / `parse` with `localStorage.setItem` / `getItem`.
*   **AudioManager (`systems/AudioManager.js`):** Uses the Web Audio API (`AudioContext`). Loads sounds using `AssetsManager` or fetches directly. Creates `Sound` objects in Babylon.js for playback, potentially using spatial audio (`spatialSound: true`) for effects in `SpaceFlightScene`. Manages background music loops.
*   **ShipFactory (`graphics/ShipFactory.js`):** Contains functions to create `Mesh` objects for different ship types. Uses `MeshBuilder` or defines `VertexBuffer` data directly for wireframe (`LinesMesh`) or low-poly (`Mesh` with `flatShading`). Applies appropriate `Material` (`StandardMaterial` with emissive color for wireframe, potentially `PBRMaterial` for flat shaded if lighting is desired).
*   **Universe (`gameplay/Universe.js`):** Implements procedural generation algorithms (seeded PRNG). Stores galaxy data. Provides functions like `getSystemData(name)`, `findNearbySystems(position)`.

**6. Rendering Style**

*   **Wireframe:** Use `LinesMesh` or `Mesh` with `material.wireframe = true`. Set material `emissiveColor` for brightness, disable lighting.
*   **Low-Poly Flat Shaded:** Use `Mesh` with `StandardMaterial` or `PBRMaterial`. Ensure `flatShading` is enabled on the material (or vertex normals are faceted). Simple lighting (`HemisphericLight` or `DirectionalLight`). Keep polygon counts very low.
*   **Starfield:** Use `ParticleSystem` or `PointsCloudSystem` for dynamic points, or a `SkyBox` material on a large cube using pre-rendered starfield textures.
*   **Colors:** Utilize a limited, high-contrast color palette similar to the original game's platform constraints (e.g., C64, Spectrum) for UI, ships, and effects.

**7. Data Persistence**

*   Utilize `localStorage` via the `StateManager`.
*   Save key game state variables as a single JSON object.
*   Implement clear Save/Load options in the Title Screen and potentially an in-game menu (accessible when docked).

**8. Future Considerations**

*   **Physics Engine:** Integrate Cannon.js or Havok for more realistic collision responses (optional, may detract from retro feel).
*   **Advanced Rendering:** Explore `NodeMaterial` for custom shaders (e.g., retro CRT effects). Use post-processing pipelines (`DefaultRenderingPipeline`) for bloom or scanlines.
*   **Optimization:** Implement `Thin Instances` for asteroids/debris fields. Use `freezeWorldMatrix()` for static objects like stations. Profile heavily using browser dev tools and Babylon.js Inspector.
*   **Asset Containers:** Use `AssetContainer` for packaging related assets (mesh, materials, sounds) for a specific ship or station type, improving loading/instancing.

