import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { GameAssets } from "@/types";
import * as Constants from "@/constants";
import { useGameState } from "@/features/common/useGameState";

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

export function useTitleLogic(
  assets: GameAssets | null,
  introMusicRef: React.RefObject<HTMLAudioElement | null>
) {
  const shipDisplayTimerRef = useRef(0);
  const currentIndexRef = useRef(0);
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState();

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
          visible: true,
          position: [200, 0, -500],
          scale: [1, 1, 1],
        },
      });
      currentIndexRef.current = 0;
      shipDisplayTimerRef.current = 0;
    } else {
      // Reset visual state if assets become null
      setVisualState(null);
    }
  }, [assets]); // Dependency ONLY on assets

  const advanceTitleShip = useCallback(() => {
    // Added guard for visualState existence as well
    if (!assets || !visualState || assets.titleShips.length === 0) {
      console.warn(
        "[useTitleLogic] Cannot advance title ship: No ships available or visualState not ready."
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

    // --- Optimization: Force immediate visual reset for non-current ships ---
    // This prevents potential brief visibility of the wrong ship if useFrame hasn't caught up
    setVisualState((prevState) => {
      if (!prevState) return null; // Should not happen if called from advanceTitleShip, but safe check
      const newShips = prevState.ships.map((ship, index) => ({
        ...ship,
        visible: false, // Hide all initially
        position: [
          Constants.TARGET_POS.x,
          Constants.TARGET_POS.y,
          Constants.START_Z,
        ] as [number, number, number],
        rotation: [0, Math.PI, 0] as [number, number, number],
      }));
      return { ...prevState, ships: newShips };
    });
    // useFrame will then immediately start animating the *new* current ship on the next frame tick.
  }, [assets, visualState]); // Added visualState dependency here

  // --- Animation Logic (using useFrame) ---
  useFrame((_state, delta) => {
    // Guard: Only run animation when in title state and assets/visualState are ready
    if (gameState !== "title" || !assets || !visualState) {
      return;
    }

    shipDisplayTimerRef.current += delta;
    const timer = shipDisplayTimerRef.current;
    const currentShipIndex = currentIndexRef.current;
    const totalCycle = Constants.TOTAL_CYCLE_DURATION; // Calculate once

    let needsStateUpdate = false; // Flag to track if visual state actually changes
    const newShipsState = visualState.ships.map((shipState, index) => {
      let targetVisible = shipState.visible;
      let targetPosition = new THREE.Vector3(...shipState.position);
      let targetRotationY = shipState.rotation[1];
      const originalPositionArr = shipState.position;
      const originalRotationArr = shipState.rotation;
      const originalVisible = shipState.visible;

      const startZ = Constants.START_Z;

      if (index === currentShipIndex) {
        const targetZ = Constants.TARGET_POS.z;
        const flyInDuration = Constants.FLY_IN_DURATION;
        const holdDuration = Constants.HOLD_DURATION;
        const flyOutDuration = Constants.FLY_OUT_DURATION;

        let currentZ = targetPosition.z; // Start with current Z

        if (timer < flyInDuration) {
          targetVisible = true;
          const t = Math.min(1, timer / flyInDuration);
          // Use ease-out interpolation for smoother arrival
          currentZ = THREE.MathUtils.lerp(
            startZ,
            targetZ,
            1 - Math.pow(1 - t, 3)
          ); // Ease-out cubic
          targetRotationY = Math.PI + t * Math.PI * 4;
        } else if (timer < flyInDuration + holdDuration) {
          targetVisible = true;
          currentZ = targetZ; // Ensure it stays at target Z
          targetRotationY += 0.5 * delta; // Slow rotation
        } else if (timer < totalCycle) {
          targetVisible = true;
          const flyOutTimer = timer - (flyInDuration + holdDuration);
          const t = Math.min(1, flyOutTimer / flyOutDuration);
          // Use ease-in interpolation for smoother departure
          currentZ = THREE.MathUtils.lerp(targetZ, startZ, t * t * t); // Ease-in cubic
          targetRotationY += 2.0 * delta; // Faster rotation
        } else {
          // Cycle ended for this ship - will be handled by advanceTitleShip check below
          // Ensure it's hidden *if* the timer has just passed the cycle duration
          targetVisible = false;
          currentZ = startZ;
          targetRotationY = Math.PI; // Reset rotation
        }
        targetPosition.set(
          Constants.TARGET_POS.x,
          Constants.TARGET_POS.y,
          currentZ
        );
      } else {
        // Not the current ship, ensure it's hidden and reset *if it's not already*
        if (targetVisible || targetPosition.z !== startZ) {
          targetVisible = false;
          targetPosition.set(
            Constants.TARGET_POS.x,
            Constants.TARGET_POS.y,
            startZ
          );
          targetRotationY = Math.PI;
        }
      }

      const newPositionArr = targetPosition.toArray() as [
        number,
        number,
        number
      ];
      const newRotationArr = [0, targetRotationY, 0] as [
        number,
        number,
        number
      ];

      // Check if anything actually changed for this specific ship
      if (
        originalVisible !== targetVisible ||
        originalPositionArr[0] !== newPositionArr[0] ||
        originalPositionArr[1] !== newPositionArr[1] ||
        originalPositionArr[2] !== newPositionArr[2] ||
        originalRotationArr[1] !== newRotationArr[1] // Only check Y rotation as others are fixed
      ) {
        needsStateUpdate = true;
      }

      return {
        visible: targetVisible,
        position: newPositionArr,
        rotation: newRotationArr,
      };
    });

    // Check if planet state needs update (only visibility for now)
    if (!visualState.planet.visible) {
      needsStateUpdate = true;
    }
    const newPlanetState = {
      ...visualState.planet,
      visible: true, // Ensure planet is marked visible during title
    };

    // Update the visual state ONLY if something actually changed
    if (needsStateUpdate) {
      setVisualState({ ships: newShipsState, planet: newPlanetState });
    }

    // Cycle ship if timer exceeds duration
    // Use >= to catch cases where delta might push it slightly over
    if (timer >= totalCycle) {
      advanceTitleShip(); // This will reset the timer and index
    }
  }); // End of useFrame

  // --- Input Handling ---
  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      // Check gameState *inside* the handler to ensure it uses the latest value
      if (gameState === "title" && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true; // Prevent double triggers
          console.log(
            "[useTitleLogic] Title input detected, switching to credits..."
          );
          setGameState("credits");
          // No need to reset isProcessingInput here, the component/hook will effectively reset when gameState changes.
        }
      }
    },
    // handleInput depends on setGameState and gameState (implicitly checked inside)
    // If gameState changes, the old listeners are removed anyway by useEffect cleanup
    [setGameState, gameState] // Added gameState here to ensure the check inside uses the right value context
  );

  // --- Effect for Setup, Cleanup, Input Listeners ---
  useEffect(() => {
    if (gameState === "title") {
      console.log("[useTitleLogic] Activating Title State.");
      isProcessingInput.current = false; // Reset input flag on activation

      // Reset animation state refs ONLY when entering the title state
      // This ensures the animation starts from the beginning each time
      currentIndexRef.current = 0;
      shipDisplayTimerRef.current = 0;

      // --- Removed redundant setVisualState reset here ---
      // The initial useEffect based on `assets` handles the initial setup.
      // `useFrame` will handle positioning based on the reset refs.

      // Play intro music
      introMusicRef.current
        ?.play()
        .catch((e) =>
          console.warn("[useTitleLogic] Intro music play failed:", e)
        );

      // Add input listeners
      console.log("[useTitleLogic] Adding input listeners.");
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);

      // Cleanup function for when gameState changes AWAY from 'title' or component unmounts
      return () => {
        console.log("[useTitleLogic] Deactivating Title State.");
        // Remove input listeners
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);

        // Stop music and reset time
        introMusicRef.current?.pause();
        if (introMusicRef.current) {
          introMusicRef.current.currentTime = 0;
        }

        // Reset visual state to hidden when leaving title screen
        // Check if assets exist before trying to map them
        if (assets) {
          console.log("[useTitleLogic] Resetting visual state for cleanup.");
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
        } else {
          // If assets are null, ensure visual state is also null
          setVisualState(null);
        }
      };
    }
    // Else: If gameState is not 'title', do nothing related to title setup/listeners
    // The cleanup function from the *previous* run (when gameState WAS 'title') handles teardown.
  }, [
    gameState,
    assets, // Keep assets dependency for the cleanup logic
    introMusicRef,
    handleInput, // handleInput now depends on gameState/setGameState
    setGameState, // Keep setGameState if needed by handleInput indirectly
    // REMOVED visualState from dependencies
  ]); // End of Setup/Cleanup useEffect

  return { visualState };
}
