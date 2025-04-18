// src/features/title/useTitleLogic.ts
import { useEffect, useState, useCallback, useRef } from "react";
import * as THREE from "three";
import { IGameManager } from "../../types"; // Ensure correct path
import * as Constants from "../../constants"; // Ensure correct path

export function useTitleLogic(
  gameManager: IGameManager | null,
  isActive: boolean
) {
  // Internal state for the hook
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [shipDisplayTimer, setShipDisplayTimer] = useState(0);
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
          `Title Ship entity or mesh at index ${index} is missing. Attempting next.`
        );
        // Directly trigger advance logic if preparation fails.
        // This is risky if called during initial prepare, might be better to handle in advanceTitleShip
        // advanceTitleShip();
      }
    },
    [gameManager]
  ); // Dependency on gameManager

  const advanceTitleShip = useCallback(() => {
    if (
      !gameManager ||
      !gameManager.assets.titleShips ||
      gameManager.assets.titleShips.length === 0
    ) {
      console.warn("Cannot advance title ship: No ships available.");
      return; // Stop if no ships
    }

    const oldIndex = currentShipIndex;
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
      setCurrentShipIndex(0); // Reset index
      setShipDisplayTimer(0);
      // Consider stopping the animation loop or showing an error state
      return; // Stop if no valid ships found
    }

    // console.log(`Advancing title ship from ${oldIndex} to ${nextIndex}`);
    setCurrentShipIndex(nextIndex); // Update state for the new index
    setShipDisplayTimer(0); // Reset timer state
    prepareNextTitleShip(nextIndex); // Prepare the newly selected valid ship
  }, [gameManager, currentShipIndex, prepareNextTitleShip]); // Dependencies

  // --- Update Logic (Called by GameManager via registration) ---
  const updateTitleShipAnimation = useCallback(
    (deltaTime: number) => {
      // This function is called by GameManager's animate loop
      // It assumes isActive check might have already happened, but double-checking is safe
      if (!isActive || !gameManager) return;

      const shipEntities = gameManager.assets.titleShips;
      // Ensure index is valid before accessing
      if (currentShipIndex < 0 || currentShipIndex >= shipEntities.length) {
        console.warn(
          `Invalid currentShipIndex ${currentShipIndex} during Title update.`
        );
        // Attempt recovery by advancing (which resets index if needed)
        advanceTitleShip();
        return;
      }

      const currentShipEntity = shipEntities[currentShipIndex];
      if (!currentShipEntity?.mesh) {
        console.warn(
          `Invalid ship entity/mesh during Title update (index ${currentShipIndex}). Advancing.`
        );
        // Advance immediately if the current ship becomes invalid during the scene
        advanceTitleShip();
        return;
      }

      // Calculate new timer value *without* setting state immediately
      // State update (setShipDisplayTimer) happens via the advanceTitleShip function or at the end
      const newTimer = shipDisplayTimer + deltaTime;

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
        // advanceTitleShip handles resetting the timer state via setShipDisplayTimer(0)
        advanceTitleShip();
      } else {
        // If not advancing, update the timer state for the next frame's calculation
        setShipDisplayTimer(newTimer);
      }
    },
    [
      isActive,
      gameManager,
      currentShipIndex,
      shipDisplayTimer,
      advanceTitleShip,
    ]
  ); // Dependencies

  // --- Input Handling ---
  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      // Check isActive and gameManager exist, and input hasn't been processed yet
      if (isActive && gameManager && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true; // Prevent double processing
          console.log("Title input detected, switching to credits...");
          gameManager.switchState("credits"); // Switch to the next state
          // No need for setTimeout to reset isProcessingInput here, as the state switch deactivates the hook
        }
      }
    },
    [isActive, gameManager]
  ); // Dependencies

  // --- Effect for Setup, Cleanup, Registration ---
  useEffect(() => {
    // Only run setup when the hook becomes active and gameManager is available
    if (isActive && gameManager) {
      console.log("Activating Title Logic Hook");
      isProcessingInput.current = false; // Reset input processing flag
      setCurrentShipIndex(0); // Reset ship index state on activation
      setShipDisplayTimer(0); // Reset timer state on activation

      // Ensure all title ships start hidden (might be redundant but safe)
      gameManager.assets.titleShips?.forEach((ship) => ship?.setVisible(false));

      // Prepare the *first* valid ship (index 0)
      // Need to ensure assets are loaded before calling this
      if (
        gameManager.assets.titleShips &&
        gameManager.assets.titleShips.length > 0
      ) {
        prepareNextTitleShip(0);
      } else {
        console.warn(
          "Title logic activated, but no title ships found in assets."
        );
      }

      // Show planet
      if (gameManager.assets.planet) {
        gameManager.assets.planet.setVisible(true);
        gameManager.assets.planet.setPosition(200, 0, -500); // Example position
        gameManager.assets.planet.setScale(1, 1, 1); // Example scale
      }

      // Play intro music
      gameManager.introMusicRef.current
        ?.play()
        .catch((e) => console.warn("Intro music play failed:", e));

      // Register the update function with GameManager
      // GameManager will call this function in its animation loop when 'title' state is active
      gameManager.registerSceneUpdate("title", updateTitleShipAnimation);

      // Add input listeners to the window
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);

      // Cleanup function - runs when isActive becomes false or component unmounts
      return () => {
        console.log("Deactivating Title Logic Hook");
        // Unregister the update function from GameManager
        gameManager.unregisterSceneUpdate("title");

        // Remove input listeners
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);

        // Hide the currently displayed ship (use state index at time of cleanup)
        // Check if assets still exist before accessing
        const currentShipEntity =
          gameManager.assets?.titleShips?.[currentShipIndex];
        currentShipEntity?.setVisible(false);

        // Hide the planet
        gameManager.assets?.planet?.setVisible(false);

        // Stop music and reset time
        gameManager.introMusicRef.current?.pause();
        if (gameManager.introMusicRef.current) {
          gameManager.introMusicRef.current.currentTime = 0;
        }
        // Reset HUD elements if this scene modified them (usually done by GameManager on state switch)
      };
    }
    // Dependencies for the useEffect hook:
    // - isActive: Run setup/cleanup when activation status changes.
    // - gameManager: Ensure gameManager instance is available.
    // - updateTitleShipAnimation, handleInput, prepareNextTitleShip: Include stable callbacks.
  }, [
    isActive,
    gameManager,
    updateTitleShipAnimation,
    handleInput,
    prepareNextTitleShip,
    currentShipIndex,
  ]);
  // Note: currentShipIndex is included because the cleanup function uses it.
  // It's generally okay if the value is slightly stale during cleanup,
  // but including it ensures the effect re-runs if the index somehow changes *while* active (which shouldn't happen here).
}
