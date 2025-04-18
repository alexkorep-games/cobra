// src/features/title/useTitleLogic.ts
import { useEffect, useState, useCallback, useRef } from "react";
import * as THREE from "three";
import { IGameManager } from "../../types"; // Ensure correct path
import * as Constants from "../../constants"; // Ensure correct path

export function useTitleLogic(
  gameManager: IGameManager | null,
  isActive: boolean
) {
  // State only for triggering React updates if needed, or could be removed if R3F handles visibility solely
  const [currentShipIndexState, setCurrentShipIndexState] = useState(0);
  // Refs for internal logic, avoiding effect re-runs
  const shipDisplayTimerRef = useRef(0);
  const currentIndexRef = useRef(0); // Ref to track index internally
  const isProcessingInput = useRef(false);

  // --- Helper Functions (Prepare/Advance Ship) ---
  const prepareNextTitleShip = useCallback(
    (index: number) => {
      if (
        !gameManager ||
        !gameManager.assets.titleShips ||
        index < 0 ||
        index >= gameManager.assets.titleShips.length
      ) {
        console.warn(
          `Cannot prepare ship: Invalid index ${index} or missing gameManager/assets.`
        );
        return;
      }
      const shipEntity = gameManager.assets.titleShips[index];
      if (shipEntity?.mesh) {
        const shipScale = Constants.SHIP_SCALE; // Use constant
        // Use constants from gameManager if they differ or are dynamic
        const startZ = gameManager.constants.START_Z * (shipScale > 1 ? 2 : 1);
        shipEntity.setPosition(
          gameManager.constants.TARGET_POS.x,
          gameManager.constants.TARGET_POS.y,
          startZ
        );
        shipEntity.setRotation(0, Math.PI, 0); // Face camera
        shipEntity.setVisible(true);
        // console.log(`Prepared title ship ${index}: ${shipEntity.mesh.name}`);
      } else {
        console.warn(
          `Title Ship entity or mesh at index ${index} is missing.`
        );
        // Advancing here might be complex, let the update loop handle it
      }
    },
    [gameManager] // Dependency on gameManager (should be stable after init)
  );

  const advanceTitleShip = useCallback(() => {
    if (
      !gameManager ||
      !gameManager.assets.titleShips ||
      gameManager.assets.titleShips.length === 0
    ) {
      console.warn("Cannot advance title ship: No ships available.");
      return; // Stop if no ships
    }

    const oldIndex = currentIndexRef.current; // Read from ref
    const currentShipEntity = gameManager.assets.titleShips[oldIndex];
    currentShipEntity?.setVisible(false); // Hide the old one

    let nextIndex = (oldIndex + 1) % gameManager.assets.titleShips.length;
    let attempts = 0;
    // Find the next valid index (check entity and mesh exist)
    while (
      !gameManager.assets.titleShips[nextIndex]?.mesh &&
      attempts < gameManager.assets.titleShips.length
    ) {
      console.warn(`Skipping invalid title ship at index ${nextIndex}`);
      nextIndex = (nextIndex + 1) % gameManager.assets.titleShips.length;
      attempts++;
    }

    // Check if a valid ship was found after attempts
    if (!gameManager.assets.titleShips[nextIndex]?.mesh) {
      console.error(
        "CRITICAL: No valid title ships found after checking all indices."
      );
      // Hide all ships as a fallback
      gameManager.assets.titleShips.forEach((ship) => ship?.setVisible(false));
      currentIndexRef.current = 0; // Reset ref
      setCurrentShipIndexState(0); // Reset state
      shipDisplayTimerRef.current = 0; // Reset timer ref
      // Consider stopping the animation loop or showing an error state
      return; // Stop if no valid ships found
    }

    // console.log(`Advancing title ship from ${oldIndex} to ${nextIndex}`);
    currentIndexRef.current = nextIndex; // Update ref
    setCurrentShipIndexState(nextIndex); // Update state (for potential React updates)
    shipDisplayTimerRef.current = 0; // Reset timer ref
    prepareNextTitleShip(nextIndex); // Prepare the newly selected valid ship
  }, [gameManager, prepareNextTitleShip]); // Dependencies: gameManager, prepareNextTitleShip (stable)

  // --- Update Logic (Called by GameManager via registration) ---
  const updateTitleShipAnimation = useCallback(
    (deltaTime: number) => {
      // No need to check isActive here, GameManager only calls registered update for the active state
      if (!gameManager) return;

      const shipEntities = gameManager.assets.titleShips;
      const currentShipIndex = currentIndexRef.current; // Read from ref

      // Ensure index is valid before accessing
      if (currentShipIndex < 0 || currentShipIndex >= shipEntities.length) {
        console.warn(
          `Invalid currentShipIndex ${currentShipIndex} during Title update.`
        );
        advanceTitleShip(); // Attempt recovery
        return;
      }

      const currentShipEntity = shipEntities[currentShipIndex];
      if (!currentShipEntity?.mesh) {
        console.warn(
          `Invalid ship entity/mesh during Title update (index ${currentShipIndex}). Advancing.`
        );
        advanceTitleShip(); // Advance immediately
        return;
      }

      // Update timer using ref
      shipDisplayTimerRef.current += deltaTime;
      const newTimer = shipDisplayTimerRef.current;

      const currentShipMesh = currentShipEntity.mesh;
      const shipScale = Constants.SHIP_SCALE;
      const startZ = gameManager.constants.START_Z * (shipScale > 1 ? 2 : 1);
      const targetZ = gameManager.constants.TARGET_POS.z;

      // Animation logic based on 'newTimer'
      if (newTimer < gameManager.constants.FLY_IN_DURATION) {
        const t = Math.min(1, newTimer / gameManager.constants.FLY_IN_DURATION);
        currentShipMesh.position.z = THREE.MathUtils.lerp(startZ, targetZ, t);
        currentShipMesh.rotation.y += 0.1 * deltaTime; // Simple rotation during fly-in
      } else if (
        newTimer <
        gameManager.constants.FLY_IN_DURATION +
          gameManager.constants.HOLD_DURATION
      ) {
        currentShipMesh.position.z = targetZ; // Hold position
        // More complex rotation during hold
        currentShipMesh.rotation.y += 0.5 * deltaTime;
        currentShipMesh.rotation.x += 0.25 * deltaTime;
      } else if (newTimer < gameManager.constants.TOTAL_CYCLE_DURATION) {
        const flyOutTimer =
          newTimer -
          (gameManager.constants.FLY_IN_DURATION +
            gameManager.constants.HOLD_DURATION);
        const t = Math.min(
          1,
          flyOutTimer / gameManager.constants.FLY_OUT_DURATION
        );
        currentShipMesh.position.z = THREE.MathUtils.lerp(targetZ, startZ, t);
        currentShipMesh.rotation.y += 0.1 * deltaTime; // Simple rotation during fly-out
      } else {
        // Ensures position is reset if deltaTime pushes timer far beyond cycle duration
        currentShipMesh.position.z = startZ;
      }

      // Cycle to next ship *after* applying animation for the current frame
      if (newTimer >= gameManager.constants.TOTAL_CYCLE_DURATION) {
        // advanceTitleShip handles resetting the timer ref
        advanceTitleShip();
      }
      // No need to set timer state here anymore
    },
    [gameManager, advanceTitleShip] // Dependencies: gameManager, advanceTitleShip (stable)
  );

  // --- Input Handling ---
  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      // Check isActive and gameManager exist, and input hasn't been processed yet
      // isActive check is still relevant here as listener is attached to window
      if (isActive && gameManager && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true; // Prevent double processing
          console.log("Title input detected, switching to credits...");
          gameManager.switchState("credits"); // Switch to the next state
        }
      }
    },
    [isActive, gameManager] // Dependencies: isActive, gameManager (stable)
  );

  // --- Effect for Setup, Cleanup, Registration ---
  useEffect(() => {
    // Only run setup when the hook becomes active and gameManager is available
    if (isActive && gameManager) {
      console.log("[useTitleLogic] Effect setup running."); // Log setup
      isProcessingInput.current = false; // Reset input processing flag
      currentIndexRef.current = 0; // Reset internal index ref
      setCurrentShipIndexState(0); // Reset state index
      shipDisplayTimerRef.current = 0; // Reset timer ref

      // Ensure all title ships start hidden
      gameManager.assets.titleShips?.forEach((ship) => ship?.setVisible(false));

      // Prepare the first valid ship
      if (
        gameManager.assets.titleShips &&
        gameManager.assets.titleShips.length > 0
      ) {
        prepareNextTitleShip(0); // Use stable callback
      } else {
        console.warn(
          "Title logic activated, but no title ships found in assets."
        );
      }

      // Show planet
      if (gameManager.assets.planet) {
        gameManager.assets.planet.setVisible(true);
        gameManager.assets.planet.setPosition(200, 0, -500);
        gameManager.assets.planet.setScale(1, 1, 1);
      }

      // Play intro music
      gameManager.introMusicRef.current
        ?.play()
        .catch((e) => console.warn("Intro music play failed:", e));

      // Register the update function
      gameManager.registerSceneUpdate("title", updateTitleShipAnimation); // Use stable callback

      // Add input listeners
      window.addEventListener("keydown", handleInput); // Use stable callback
      window.addEventListener("mousedown", handleInput); // Use stable callback

      // Cleanup function
      return () => {
        console.log("[useTitleLogic] Effect cleanup running."); // Log cleanup
        // Unregister the update function
        gameManager.unregisterSceneUpdate("title");

        // Remove input listeners
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);

        // Hide the currently displayed ship (use ref index at time of cleanup)
        const shipToHideIndex = currentIndexRef.current; // Read from ref
        const currentShipEntity =
          gameManager.assets?.titleShips?.[shipToHideIndex];
        currentShipEntity?.setVisible(false);

        // Hide the planet
        gameManager.assets?.planet?.setVisible(false);

        // Stop music and reset time
        gameManager.introMusicRef.current?.pause();
        if (gameManager.introMusicRef.current) {
          gameManager.introMusicRef.current.currentTime = 0;
        }
      };
    }
  }, [
    isActive,
    gameManager,
    // Include the stable callbacks in the dependency array
    prepareNextTitleShip,
    updateTitleShipAnimation,
    handleInput,
  ]);
  // Note: We removed currentShipIndex (state) and shipDisplayTimer (state)
  // The callbacks are now stable (or depend only on gameManager/isActive)
}
