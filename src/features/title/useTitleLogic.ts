import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { GameAssets } from "@/types"; // Use GameAssets
import * as Constants from "@/constants";
import { useGameState } from "@/features/common/useGameState";
import { useFrame } from "@react-three/fiber"; // Import useFrame if animation logic stays here

// Define state for title ship visuals (position, rotation, visibility)
// This state could be managed here and passed to ShipComponent/PlanetComponent instances in App.tsx
// Or, a dedicated TitleR3F component could consume this hook and use useFrame.
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
export function useTitleLogic(
  assets: GameAssets | null,
  introMusicRef: React.RefObject<HTMLAudioElement | null>
) {
  const shipDisplayTimerRef = useRef(0);
  const currentIndexRef = useRef(0);
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState();

  // State to hold calculated visual properties for R3F components
  // Initialize based on potential number of ships, default to hidden/initial state
  const [visualState, setVisualState] = useState<TitleVisualState | null>(null);

  // Initialize visual state when assets are available
  useEffect(() => {
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
          visible: false,
          position: [200, 0, -500], // Default position
          scale: [1, 1, 1],
        },
      });
      currentIndexRef.current = 0; // Reset index when assets load/change
      shipDisplayTimerRef.current = 0; // Reset timer
    }
  }, [assets]);

  const advanceTitleShip = useCallback(() => {
    if (!assets || assets.titleShips.length === 0) {
      console.warn("Cannot advance title ship: No ships available.");
      return;
    }
    const oldIndex = currentIndexRef.current;
    let nextIndex = (oldIndex + 1) % assets.titleShips.length;
    console.log(`Advancing title ship index from ${oldIndex} to ${nextIndex}`);
    currentIndexRef.current = nextIndex;
    shipDisplayTimerRef.current = 0; // Reset timer for the new ship
  }, [assets]);

  // --- Animation Logic (using internal update loop) ---
  // This function calculates the visual state based on time.
  // It needs to be called every frame when the title screen is active.
  // We can use a simple interval or requestAnimationFrame loop managed internally,
  // or rely on App.tsx/TitleScreen R3F component calling this via useFrame.
  // Let's keep it internal for now using requestAnimationFrame.
  const animationFrameRef = useRef<number>();

  const updateAnimation = useCallback(() => {
    if (gameState !== "title" || !assets || !visualState) {
      return; // Only run when active and assets/state ready
    }

    const deltaTime = 1 / 60; // Approximate delta time if not using useFrame
    shipDisplayTimerRef.current += deltaTime;
    const timer = shipDisplayTimerRef.current;
    const currentShipIndex = currentIndexRef.current;
    const numShips = assets.titleShips.length;

    const newShipsState = visualState.ships.map((shipState, index) => {
      let targetVisible = false;
      let targetPosition = new THREE.Vector3(...shipState.position); // Use current position
      let targetRotationY = shipState.rotation[1]; // Use current rotation

      if (index === currentShipIndex) {
        // Logic from old updateTitleShipAnimation
        const startZ = Constants.START_Z * (Constants.SHIP_SCALE > 1 ? 2 : 1);
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
          targetRotationY += 0.5 * deltaTime; // Slow rotation
        } else if (timer < totalCycle) {
          // Fly Out
          targetVisible = true;
          const flyOutTimer = timer - (flyInDuration + holdDuration);
          const t = Math.min(1, flyOutTimer / flyOutDuration);
          currentZ = THREE.MathUtils.lerp(targetZ, startZ, t);
          targetRotationY += 2.0 * deltaTime; // Faster rotation
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
          Constants.START_Z
        );
        targetRotationY = Math.PI;
      }

      return {
        visible: targetVisible,
        position: targetPosition.toArray() as [number, number, number],
        rotation: [0, targetRotationY, 0] as [number, number, number],
      };
    });

    // Update planet visibility
    const newPlanetState = {
      ...visualState.planet,
      visible: true, // Planet is always visible during title sequence
    };

    setVisualState({ ships: newShipsState, planet: newPlanetState });

    // Cycle ship if timer exceeds duration
    if (timer >= Constants.TOTAL_CYCLE_DURATION) {
      advanceTitleShip();
    }

    // Request next frame
    animationFrameRef.current = requestAnimationFrame(updateAnimation);
  }, [assets, gameState, advanceTitleShip, visualState]);

  // --- Input Handling ---
  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      if (gameState === "title" && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true;
          console.log("Title input detected, switching to credits...");
          setGameState("credits");
          setTimeout(() => {
            isProcessingInput.current = false;
          }, 100);
        }
      }
    },
    [gameState, setGameState] // Dependencies
  );

  // --- Effect for Setup, Cleanup, Input Listeners, Animation Loop ---
  useEffect(() => {
    if (gameState === "title") {
      console.log("[useTitleLogic] Activating.");
      isProcessingInput.current = false;
      currentIndexRef.current = 0; // Reset index
      shipDisplayTimerRef.current = 0; // Reset timer

      // Play intro music
      introMusicRef.current
        ?.play()
        .catch((e) => console.warn("Intro music play failed:", e));

      // Add input listeners
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);

      // Start animation loop
      animationFrameRef.current = requestAnimationFrame(updateAnimation);

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

        // Cancel animation frame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        // Reset visual state to hidden when leaving title screen
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
              visible: false,
              position: [200, 0, -500],
              scale: [1, 1, 1],
            },
          });
        }
      };
    }
  }, [gameState, assets, introMusicRef, handleInput, updateAnimation]); // Dependencies

  // Return the calculated visual state for R3F components to use
  return { visualState };
}
