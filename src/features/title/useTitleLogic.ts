import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber"; // Import useFrame
import { GameAssets } from "@/types"; // Use GameAssets
import * as Constants from "@/constants";
import { useGameState } from "@/features/common/useGameState";

// Define state for title ship visuals (position, rotation, visibility)
interface TitleVisualState {
  ships: {
    visible: boolean;
    position: [number, number, number];
    rotation: [number, number, number];
  }[];
  planet: {
    visible: boolean;
    position: [number, number, number];
    scale: [number, number, number];
  };
}

// Pass assets config and audio ref
// This hook now requires being called from within the R3F render tree (a component inside <Canvas>)
// because it uses useFrame.
export function useTitleLogic(
  assets: GameAssets | null,
  introMusicRef: React.RefObject<HTMLAudioElement | null>
) {
  const shipDisplayTimerRef = useRef(0);
  const currentIndexRef = useRef(0);
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState();

  // State to hold calculated visual properties for R3F components
  const [visualState, setVisualState] = useState<TitleVisualState | null>(null);

  // Initialize visual state when assets are available
  useEffect(() => {
    if (assets) {
      console.log("[useTitleLogic] Initializing visual state.");
      setVisualState({
        ships: assets.titleShips.map(() => ({
          visible: false,
          position: [
            Constants.TARGET_POS.x,
            Constants.TARGET_POS.y,
            Constants.START_Z,
          ],
          rotation: [0, Math.PI, 0],
        })),
        planet: {
          visible: true, // Assume planet is visible if assets loaded
          position: [200, 0, -500], // Default position
          scale: [1, 1, 1],
        },
      });
      currentIndexRef.current = 0; // Reset index when assets load/change
      shipDisplayTimerRef.current = 0; // Reset timer
    }
  }, [assets]); // Dependency on assets

  const advanceTitleShip = useCallback(() => {
    if (!assets || assets.titleShips.length === 0) {
      console.warn(
        "[useTitleLogic] Cannot advance title ship: No ships available."
      );
      return;
    }
    const oldIndex = currentIndexRef.current;
    let nextIndex = (oldIndex + 1) % assets.titleShips.length;
    console.log(
      `[useTitleLogic] Advancing title ship index from ${oldIndex} to ${nextIndex}`
    );
    currentIndexRef.current = nextIndex;
    shipDisplayTimerRef.current = 0; // Reset timer for the new ship
  }, [assets]);

  // --- Animation Logic (using useFrame) ---
  useFrame((_state, delta) => {
    // Guard: Only run animation when in title state and assets/visualState are ready
    if (gameState !== "title" || !assets || !visualState) {
      return;
    }

    shipDisplayTimerRef.current += delta; // Use delta time from useFrame
    const timer = shipDisplayTimerRef.current;
    const currentShipIndex = currentIndexRef.current;

    const newShipsState = visualState.ships.map((shipState, index) => {
      let targetVisible = false;
      let targetPosition = new THREE.Vector3(...shipState.position);
      let targetRotationY = shipState.rotation[1];

      const startZ = Constants.START_Z; // Base start Z
      if (index === currentShipIndex) {
        const targetZ = Constants.TARGET_POS.z;
        const flyInDuration = Constants.FLY_IN_DURATION;
        const holdDuration = Constants.HOLD_DURATION;
        const flyOutDuration = Constants.FLY_OUT_DURATION;
        const totalCycle = flyInDuration + holdDuration + flyOutDuration;

        let currentZ = startZ; // Default to start

        if (timer < flyInDuration) {
          // Fly In
          targetVisible = true;
          const t = Math.min(1, timer / flyInDuration);
          currentZ = THREE.MathUtils.lerp(startZ, targetZ, t);
          targetRotationY = Math.PI + t * Math.PI * 4; // Spin in
        } else if (timer < flyInDuration + holdDuration) {
          // Hold
          targetVisible = true;
          currentZ = targetZ;
          targetRotationY += 0.5 * delta; // Slow rotation (use delta)
        } else if (timer < totalCycle) {
          // Fly Out
          targetVisible = true;
          const flyOutTimer = timer - (flyInDuration + holdDuration);
          const t = Math.min(1, flyOutTimer / flyOutDuration);
          currentZ = THREE.MathUtils.lerp(targetZ, startZ, t);
          targetRotationY += 2.0 * delta; // Faster rotation (use delta)
        } else {
          // Cycle ended for this ship (advanceTitleShip will handle index/timer reset)
          targetVisible = false;
          currentZ = startZ;
        }
        targetPosition.set(
          Constants.TARGET_POS.x,
          Constants.TARGET_POS.y,
          currentZ
        );
      } else {
        // Not the current ship, ensure it's hidden and reset
        targetVisible = false;
        targetPosition.set(
          Constants.TARGET_POS.x,
          Constants.TARGET_POS.y,
          startZ
        );
        targetRotationY = Math.PI;
      }

      return {
        visible: targetVisible,
        position: targetPosition.toArray() as [number, number, number],
        rotation: [0, targetRotationY, 0] as [number, number, number],
      };
    });

    // Update planet state (e.g., make it visible if it wasn't)
    // Planet rotation etc. might be handled within PlanetComponent itself using its own useFrame
    const newPlanetState = {
      ...visualState.planet,
      visible: true, // Ensure planet is marked visible during title
    };

    // Update the visual state
    // Throttle state updates if performance becomes an issue, but usually fine
    setVisualState({ ships: newShipsState, planet: newPlanetState });

    // Cycle ship if timer exceeds duration
    if (timer >= Constants.TOTAL_CYCLE_DURATION) {
      advanceTitleShip();
    }
  }); // End of useFrame

  // --- Input Handling ---
  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (gameState === "title" && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true;
          console.log(
            "[useTitleLogic] Title input detected, switching to credits..."
          );
          setGameState("credits");
          // No need for timeout to reset isProcessingInput, state change handles it
        }
      }
    },
    [gameState, setGameState] // Dependencies
  );

  // --- Effect for Setup, Cleanup, Input Listeners ---
  useEffect(() => {
    if (gameState === "title") {
      console.log("[useTitleLogic] Activating.");
      isProcessingInput.current = false; // Reset input flag on activation

      // Reset ship index/timer only if assets are loaded (visualState exists)
      if (visualState) {
        currentIndexRef.current = 0;
        shipDisplayTimerRef.current = 0;
        // Optionally force reset visual state to ensure clean start
        setVisualState((prev) =>
          prev
            ? {
                ...prev,
                ships: prev.ships.map((ship, index) => ({
                  ...ship,
                  visible: index === 0 ? false : false, // Ensure only first ship might become visible initially
                  position: [
                    Constants.TARGET_POS.x,
                    Constants.TARGET_POS.y,
                    Constants.START_Z,
                  ],
                  rotation: [0, Math.PI, 0],
                })),
              }
            : null
        );
      }

      // Play intro music
      introMusicRef.current
        ?.play()
        .catch((e) =>
          console.warn("[useTitleLogic] Intro music play failed:", e)
        );

      // Add input listeners
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);

      // NOTE: Animation is now handled by useFrame, no need to start/stop RAF

      // Cleanup function
      return () => {
        console.log("[useTitleLogic] Deactivating.");
        // Remove input listeners
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);

        // Stop music and reset time
        introMusicRef.current?.pause();
        if (introMusicRef.current) {
          introMusicRef.current.currentTime = 0;
        }

        // Reset visual state to hidden when leaving title screen
        // This prevents flicker if the component calling the hook doesn't unmount immediately
        if (assets) {
          setVisualState({
            ships: assets.titleShips.map(() => ({
              visible: false,
              position: [
                Constants.TARGET_POS.x,
                Constants.TARGET_POS.y,
                Constants.START_Z,
              ],
              rotation: [0, Math.PI, 0],
            })),
            planet: {
              visible: false, // Hide planet when leaving title
              position: [200, 0, -500],
              scale: [1, 1, 1],
            },
          });
        }
      };
    }
  }, [
    gameState,
    assets,
    introMusicRef,
    handleInput,
    setGameState,
    visualState,
  ]);

  return { visualState };
}
