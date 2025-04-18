import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { IGameManager } from "@/types"; // Ensure correct path
import * as Constants from "@/constants"; // Ensure correct path
import { useGameState } from "@/features/common/useGameState";

// Define a simpler structure for title ship state managed by GM
interface TitleShipAsset {
  modelPath: string;
  // No direct THREE objects here, R3F handles those
  // We need temporary state within the hook/GM update logic if needed
  mesh?: THREE.Object3D; // Optional reference for direct manipulation if absolutely needed
  visible?: boolean; // Track visibility if needed outside R3F
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
}

export function useTitleLogic(gameManager: IGameManager | null) {
  // Refs for internal logic, avoiding effect re-runs
  const shipDisplayTimerRef = useRef(0);
  const currentIndexRef = useRef(0); // Ref to track index internally
  const isProcessingInput = useRef(false);

  // Get global state and setter
  const { gameState, setGameState } = useGameState();

  // --- Helper Functions (Prepare/Advance Ship) ---
  // These helpers might become less critical if R3F handles visibility/position via props,
  // but we might still need to manage the *index* and *timer*.
  // The GM update function will directly manipulate positions/visibility now.

  const advanceTitleShip = useCallback(() => {
    if (
      !gameManager ||
      !gameManager.assets.titleShips ||
      gameManager.assets.titleShips.length === 0
    ) {
      console.warn("Cannot advance title ship: No ships available.");
      return;
    }

    const oldIndex = currentIndexRef.current;
    let nextIndex = (oldIndex + 1) % gameManager.assets.titleShips.length;

    // Basic advance logic - the update function will handle positioning/visibility
    console.log(`Advancing title ship index from ${oldIndex} to ${nextIndex}`);
    currentIndexRef.current = nextIndex;
    shipDisplayTimerRef.current = 0; // Reset timer for the new ship
  }, [gameManager]);

  // --- Update Logic (Called by GameManager via registration) ---
  const updateTitleShipAnimation = useCallback(
    (deltaTime: number) => {
      // No need to check gameState here, GM only calls registered update
      if (
        !gameManager ||
        !gameManager.assets.titleShips ||
        gameManager.assets.titleShips.length === 0
      )
        return;

      const shipAssets = gameManager.assets.titleShips; // Asset config { modelPath: string }
      const currentShipIndex = currentIndexRef.current;

      // Update timer
      shipDisplayTimerRef.current += deltaTime;
      const timer = shipDisplayTimerRef.current;

      // Update ALL ship positions/visibilities based on the *current index* and *timer*
      shipAssets.forEach((shipAsset, index) => {
        // Find the corresponding mesh in the scene if needed (less ideal)
        // Or assume App.tsx's conditional rendering handles visibility mostly
        // and we just update positions here directly on the GM's stored refs (if we store them)
        // --> Let's simplify: App.tsx renders *all* potential title ships.
        // --> This hook's update function tells the GM *which* ship (by index) *should* be visible
        // --> And calculates its position/rotation. The GM applies this.
        // --> This requires GM to hold references to the R3F-managed meshes/groups.

        // Alternative: The hook calculates position/rotation/visibility *state*
        // and App.tsx reads this state (e.g., from context/atoms) and passes it as props
        // to the ShipComponent instances. This avoids GM needing direct mesh refs. Let's try this.

        // Calculate desired state for *this* ship (index)
        let targetPosition = new THREE.Vector3();
        let targetRotationY = Math.PI; // Face camera initially
        let targetVisible = false;

        if (index === currentShipIndex) {
          targetVisible = true; // This ship should be visible
          const shipScale = Constants.SHIP_SCALE;
          const startZ = Constants.START_Z * (shipScale > 1 ? 2 : 1);
          const targetZ = Constants.TARGET_POS.z;
          let currentZ = startZ; // Default to start

          if (timer < Constants.FLY_IN_DURATION) {
            const t = Math.min(1, timer / Constants.FLY_IN_DURATION);
            currentZ = THREE.MathUtils.lerp(startZ, targetZ, t);
            targetRotationY += 0.1 * timer; // Simple rotation during fly-in based on total time
          } else if (
            timer <
            Constants.FLY_IN_DURATION + Constants.HOLD_DURATION
          ) {
            currentZ = targetZ; // Hold position
            // More complex rotation during hold
            targetRotationY +=
              0.1 * Constants.FLY_IN_DURATION +
              0.5 * (timer - Constants.FLY_IN_DURATION);
            // Add X rotation (example)
            // targetRotationX = 0.25 * (timer - Constants.FLY_IN_DURATION);
          } else if (timer < Constants.TOTAL_CYCLE_DURATION) {
            const flyOutTimer =
              timer - (Constants.FLY_IN_DURATION + Constants.HOLD_DURATION);
            const t = Math.min(1, flyOutTimer / Constants.FLY_OUT_DURATION);
            currentZ = THREE.MathUtils.lerp(targetZ, startZ, t);
            // Add rotation based on total time elapsed in fly-out
            targetRotationY +=
              0.1 * Constants.FLY_IN_DURATION +
              0.5 * Constants.HOLD_DURATION +
              0.1 * flyOutTimer;
          } else {
            // Timer exceeded cycle, should be hidden or reset by advanceTitleShip
            targetVisible = false;
            currentZ = startZ; // Ensure it's reset
          }
          targetPosition.set(
            Constants.TARGET_POS.x,
            Constants.TARGET_POS.y,
            currentZ
          );
          // TODO: Need to store/apply these calculated values (position, rotation, visibility)
          // How? Maybe update GM's internal representation of asset state?
          // Let's assume GameManager has a method to update asset state for now.
          if (gameManager.updateAssetVisualState) {
            gameManager.updateAssetVisualState("titleShip", index, {
              position: targetPosition.toArray() as [number, number, number],
              rotation: [0, targetRotationY, 0], // Example rotation
              visible: targetVisible,
            });
          }
        } else {
          // This ship is not the current one, ensure it's hidden
          if (gameManager.updateAssetVisualState) {
            gameManager.updateAssetVisualState("titleShip", index, {
              visible: false,
            });
          }
        }
      });

      // Cycle to next ship if timer exceeds duration
      if (timer >= Constants.TOTAL_CYCLE_DURATION) {
        advanceTitleShip(); // Handles resetting the timer ref
      }
    },
    [gameManager, advanceTitleShip] // Dependencies
  );

  // --- Input Handling ---
  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      // Check if this is the active state
      if (gameState === "title" && gameManager && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true; // Prevent double processing
          console.log("Title input detected, switching to credits...");
          setGameState("credits"); // Switch to the next state
          // Reset flag shortly after
          setTimeout(() => {
            isProcessingInput.current = false;
          }, 100);
        }
      }
    },
    [gameState, gameManager, setGameState] // Dependencies
  );

  // --- Effect for Setup, Cleanup, Registration ---
  useEffect(() => {
    // Only run setup when the hook's component mounts (i.e., gameState is 'title')
    if (gameManager) {
      console.log("[useTitleLogic] Effect setup running.");
      isProcessingInput.current = false; // Reset input processing flag
      currentIndexRef.current = 0; // Reset internal index ref
      shipDisplayTimerRef.current = 0; // Reset timer ref

      // Initial setup of ship visibility/position is handled by first run of update function
      // Ensure planet is setup (might need direct GM method or state update)
      // Example: using hypothetical GM method
      if (gameManager.updateAssetVisualState) {
        gameManager.updateAssetVisualState("planet", 0, {
          // Assuming planet has index 0 or similar ID
          visible: true,
          position: [200, 0, -500],
          scale: [1, 1, 1],
        });
      }

      // Play intro music
      gameManager.introMusicRef.current
        ?.play()
        .catch((e) => console.warn("Intro music play failed:", e));

      // Register the update function
      gameManager.registerSceneUpdate("title", updateTitleShipAnimation);

      // Add input listeners
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);

      // Cleanup function when TitleScreen unmounts
      return () => {
        console.log("[useTitleLogic] Effect cleanup running.");
        // Unregister the update function
        gameManager.unregisterSceneUpdate("title");

        // Remove input listeners
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);

        // Hide the currently displayed ship and planet via GM method
        const shipToHideIndex = currentIndexRef.current;
        if (gameManager.updateAssetVisualState) {
          gameManager.updateAssetVisualState("titleShip", shipToHideIndex, {
            visible: false,
          });
          gameManager.updateAssetVisualState("planet", 0, { visible: false });
        }

        // Stop music and reset time
        gameManager.introMusicRef.current?.pause();
        if (gameManager.introMusicRef.current) {
          gameManager.introMusicRef.current.currentTime = 0;
        }
      };
    }
    // Dependencies for setup/cleanup effect
  }, [gameManager, updateTitleShipAnimation, handleInput]);

  // Hook doesn't need to return anything for the component itself
}
