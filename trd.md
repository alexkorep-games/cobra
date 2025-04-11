**Technical Requirements Document: Project Cobra (Elite Browser Clone)**

**Version:** 1.0
**Date:** 2023-10-27

**1. Introduction**

*   **1.1 Purpose:** This document outlines the technical requirements for developing "Project Cobra," a web browser-based clone inspired by the seminal 1984 space trading and combat simulator, "Elite." The goal is to recreate the core gameplay mechanics and visual aesthetic of the original game using modern web technologies.
*   **1.2 Project Goal:** To create a functional, single-player Elite experience accessible through standard web browsers, leveraging HTML for structure, JavaScript for game logic, and Three.js for 3D rendering via WebGL.
*   **1.3 Scope:**
    *   **In Scope:**
        *   Core 3D space flight mechanics (pitch, roll, yaw, thrust).
        *   First-person cockpit view with HUD.
        *   Wireframe or simple flat-shaded polygon rendering style reminiscent of the original.
        *   Basic combat system (lasers, missiles, targeting).
        *   Space station docking (manual and potentially automated).
        *   Hyperspace travel between systems.
        *   Procedurally generated galaxy (based on original algorithms if feasible, or simplified).
        *   Basic trading system with commodities and varying market prices.
        *   Player status tracking (credits, combat rating, legal status).
        *   Basic NPC ship AI (pirates, traders).
        *   Saving and loading game state locally in the browser.
    *   **Out of Scope (Initial Version):**
        *   Multiplayer functionality.
        *   Complex mission system (beyond basic bounty hunting).
        *   Atmospheric flight or planetary landings.
        *   Advanced physics simulations (e.g., detailed orbital mechanics).
        *   Thargoids and complex alien encounters (simple pirates first).
        *   Exact emulation of specific hardware limitations (e.g., C64 color palette, sound chip specifics – aim for the *spirit*).
*   **1.4 Target Audience:** This document is intended for the development team working on Project Cobra.

**2. Technical Stack & Environment**

*   **2.1 Core Technologies:**
    *   **HTML5:** For structuring the web page, including the game canvas and UI elements.
    *   **CSS3:** For styling UI elements and potentially HUD overlays.
    *   **JavaScript (ES6+):** For all game logic, physics, AI, UI interactions, and Three.js integration. Modularity (e.g., using ES Modules) is required.
    *   **Three.js:** (Latest Stable Version) For 3D rendering, scene management, materials, geometry, and camera control.
    *   **WebGL:** As the underlying rendering API utilized by Three.js.
*   **2.2 Environment:**
    *   **Platform:** Modern Web Browsers supporting WebGL 1.0 or 2.0 (Targeting latest Chrome, Firefox, Edge, Safari).
    *   **Development:** Standard web development tools (code editor, browser developer tools). Consider module bundlers (e.g., Vite, Webpack) for dependency management and build processes.
*   **2.3 Asset Requirements:**
    *   3D Models (defined in code or potentially loaded if using simple formats like glTF for basic shapes).
    *   Sound Effects (e.g., `.wav`, `.mp3`, `.ogg`).
    *   Music Files (e.g., `.mp3`, `.ogg`).
    *   Font files (if using custom fonts for UI).

**3. Core Gameplay Mechanics - Technical Implementation**

*   **3.1 Universe & Galaxy Generation:**
    *   Implement a procedural generation algorithm (e.g., using a pseudo-random number generator seeded consistently) to create star systems. Reference original Elite algorithms if possible.
    *   Each system shall have properties: Name, Position (3D coordinates), Economy Type (e.g., Industrial, Agricultural), Government Type (e.g., Democracy, Dictatorship), Tech Level, Population, Short Description, Planet(s), Station(s).
    *   Store galaxy data in a suitable JavaScript structure (e.g., Array of Objects).
*   **3.2 Player Ship (Cobra Mk III equivalent):**
    *   Represent the ship using Three.js `BufferGeometry` and appropriate materials (`LineBasicMaterial` for wireframe, `MeshBasicMaterial` or `MeshStandardMaterial` with `flatShading: true` for simple polygons).
    *   Maintain ship state variables:
        *   `position`, `rotation` (Quaternion or Euler angles).
        *   `velocity`, `angularVelocity`.
        *   `shields` (fore/aft values).
        *   `hullIntegrity` (implied, game over if zero).
        *   `fuel` (for hyperspace jumps, potentially scoopable).
        *   `cargoHold` (capacity, current contents - array of {commodity, quantity}).
        *   `equipment` (Lasers [type, location], Missiles [type, count], Docking Computer [boolean], etc.).
        *   `energyLevel` (recharges, consumed by shields/lasers).
        *   `laserTemperature`.
        *   `legalStatus` (Clean, Offender, Fugitive).
        *   `combatRating` (Harmless, Mostly Harmless, ... Elite).
        *   `credits`.
*   **3.3 Flight Model:**
    *   Implement 6-degrees-of-freedom (6DOF) flight controls, mapping keyboard inputs (e.g., WASDQE for translation/strafe/roll, Arrow Keys or Mouse for pitch/yaw) or simplified Pitch/Roll/Yaw + Thrust controls like the original.
    *   Use a simple physics integration loop (e.g., Euler integration) within the main game loop (`requestAnimationFrame`) to update ship position and rotation based on velocity and player input.
    *   Include controls for increasing/decreasing speed (thrust).
    *   Implement basic collision detection (ship-station, ship-ship, ship-asteroid) using Three.js bounding boxes/spheres or raycasting.
*   **3.4 Combat System:**
    *   **Targeting:** Implement a system to lock onto nearby ships. Display target information on HUD. Cycle targets.
    *   **Lasers:**
        *   Trigger laser firing on key press/mouse click.
        *   Visualize lasers using `LineSegments` or potentially raycasting effects.
        *   Implement laser temperature/overheating mechanic limiting continuous fire.
        *   Detect hits using raycasting from the firing point towards the target or projectile simulation.
        *   Apply damage to target shields first, then hull/components upon hit.
    *   **Missiles:**
        *   Trigger missile launch on key press.
        *   Instantiate missile objects (simple geometry) with independent movement logic.
        *   Implement basic homing behavior if target is locked.
        *   Missiles destroy on impact or after timeout, applying significant damage. Limited ammo.
    *   **Damage Model:** Simple shield depletion (fore/aft). Once shields are down, hits reduce hull integrity (or trigger destruction).
    *   **Explosions:** Visualize ship destruction using particle effects (Three.js `Points` or sprite sheets) and sound effects.
*   **3.5 NPC AI:**
    *   Implement basic AI states for NPC ships (e.g., `IDLE`, `TRADING_ROUTE`, `ATTACKING`, `FLEEING`).
    *   Pirates: Detect player ship (especially if carrying valuable cargo), engage in combat, potentially flee if heavily damaged.
    *   Traders: Follow predefined (or simple procedural) paths between stations, attempt to flee when attacked.
    *   Police: Attack ships with Fugitive status.
    *   Spawn NPCs dynamically around stations and potentially at random jump-in points.
*   **3.6 Trading & Economy:**
    *   Define a list of tradeable commodities (e.g., Food, Textiles, Computers, Narcotics).
    *   Implement market logic where prices vary based on the system's economy type and tech level (e.g., buy low in agricultural, sell high in industrial).
    *   Provide UI screens within stations to buy/sell goods, manage cargo.
*   **3.7 Docking:**
    *   Stations (e.g., Coriolis) should have a rotating docking bay entrance.
    *   Implement manual docking controls requiring precise alignment with the docking bay entrance. Use visual cues (e.g., rotating mail slot guides).
    *   Implement collision detection with the station structure.
    *   Implement a docking sequence (request permission, granted/denied message, autopilot approach if docking computer equipped).
    *   Transition to station interface upon successful docking.
*   **3.8 Hyperspace:**
    *   Implement a jump drive function triggered by player command.
    *   Check if destination is within range based on current fuel level.
    *   Consume fuel upon jumping.
    *   Visualize jump sequence (e.g., star streak effect, tunnel effect).
    *   Load the new system environment upon arrival.
*   **3.9 Navigation:**
    *   Implement a short-range scanner (visualized on HUD) showing relative positions of nearby objects (ships, station, planet). Use distinct symbols/colors.
    *   Implement a galactic chart screen showing nearby systems, allowing selection of hyperspace destination. Display system info (name, distance, basic stats).
    *   Implement a compass or indicator showing the direction to the main planet/station in the current system.

**4. Graphics & Rendering (Three.js Specifics)**

*   **4.1 Scene Setup:** Use a core `THREE.Scene` object.
*   **4.2 Camera:** Primarily use `THREE.PerspectiveCamera` attached to the player ship model for the cockpit view. Implement logic for switching to Rear/Left/Right views (potentially additional cameras or rotating the main camera temporarily).
*   **4.3 Rendering:** Use `THREE.WebGLRenderer`. Enable anti-aliasing.
*   **4.4 Models & Geometry:**
    *   Ships/Stations: Define using `THREE.BufferGeometry` with vertices/indices.
    *   Use `THREE.LineSegments` with `THREE.LineBasicMaterial` for wireframe style.
    *   Alternatively, use `THREE.Mesh` with `THREE.MeshBasicMaterial` (unlit) or `THREE.MeshStandardMaterial` (lit, ensure `flatShading: true`) for simple polygon style. Keep poly counts low.
    *   Planets/Suns: Use `THREE.SphereGeometry`.
    *   Asteroids: Simple procedural meshes or predefined low-poly models.
*   **4.5 Effects:**
    *   Starfield: Use `THREE.Points` with `THREE.PointsMaterial` for distant stars, or a Skybox (`THREE.CubeTextureLoader`, `THREE.BoxGeometry`).
    *   Lasers: `THREE.LineSegments` updated each frame, or potentially custom shaders.
    *   Missile Trails: `THREE.Points` or short `LineSegments`.
    *   Explosions: `THREE.Points` based particle system with velocity/lifetime, potentially using textured sprites (`THREE.SpriteMaterial`).
*   **4.6 Lighting:** Simple lighting setup (e.g., `THREE.AmbientLight`, one `THREE.DirectionalLight` representing the main star). Unlit materials (`MeshBasicMaterial`) can also be used for a more retro feel.

**5. User Interface (UI)**

*   **5.1 HUD:**
    *   Implement using HTML `<div>` elements overlaid on the Three.js canvas using CSS absolute positioning.
    *   Display: Fore/Aft Shields (bar graphs), Fuel Level (bar graph), Laser Temp (bar graph), Speed (numeric/bar), Roll/Pitch indicators (graphical), Scanner (dots/symbols in a circular area), Missile status (count/selected type), Energy level (bar graph), System messages (Docking granted, Target destroyed, etc.), Target info (name, shields).
*   **5.2 Info Screens:**
    *   Implement as separate HTML/CSS overlay panels or states.
    *   Required screens: Ship Status/Equipment, Inventory/Cargo, Market Prices (at station), Galactic Chart, Local System Data, Options (Sound, Controls - optional).
    *   Use clear keyboard navigation (e.g., function keys F1-F8 equivalent) to switch between views/screens.

**6. Audio**

*   **6.1 Engine:** Use Web Audio API (`AudioContext`).
*   **6.2 Sound Effects:** Load and trigger sounds for: Laser fire, Missile launch/impact, Explosions, Ship engine hum (varying with speed), Shield hits, Docking request/confirmation/denial/clamps, Hyperspace engage/disengage, UI clicks/alerts.
*   **6.3 Music:** Implement playback for title screen music (Blue Danube?) and potentially docking music. Allow volume control.

**7. Data Persistence**

*   **7.1 Storage:** Use browser `localStorage` for simplicity, or `IndexedDB` for more complex state/robustness.
*   **7.2 Save Data:** Store key player state: Commander name, credits, ship location (system name), ship equipment, cargo, fuel, shields, legal status, combat rating.
*   **7.3 Functionality:** Provide menu options to Save Game and Load Game. Handle cases where no save data exists.

**8. Non-Functional Requirements**

*   **8.1 Performance:** Target a consistent 30-60 FPS on mid-range desktop/laptop hardware with compatible browsers. Optimize draw calls, geometry complexity, and JavaScript execution.
*   **8.2 Compatibility:** Ensure functionality across the latest versions of major desktop browsers (Chrome, Firefox, Edge, Safari). Mobile compatibility is a secondary goal/stretch goal.
*   **8.3 Code Quality:** Maintainable, modular, and commented JavaScript code. Use meaningful variable and function names.
*   **8.4 Responsiveness:** The game UI should ideally scale reasonably with different browser window sizes, although a fixed aspect ratio might be acceptable initially.
*   **8.5 Error Handling:** Implement basic error handling for critical operations (e.g., loading assets, saving data).

**9. Future Considerations (Post V1.0)**

*   Advanced AI behaviors (wingmen, formations, specific pirate tactics).
*   More ship types (player-buyable and NPC).
*   More equipment types (ECM, fuel scoops, energy bombs).
*   Mission system.
*   Thargoid encounters.
*   Improved graphics (simple textures, more detailed effects).
*   Enhanced sound design.

---