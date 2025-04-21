/* src/screens/title/useTitleLogic.ts */
import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { GameAssets } from "@/types";
import * as Constants from "@/constants";
import { useGameState } from "@/hooks/useGameState";
import { useInput } from "@/hooks/useInput";

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
  const { gameState, setGameState } = useGameState(); // Still need setGameState for useInput
  useInput({
    onInputStart: () => {
      if (isProcessingInput.current || gameState !== "title") return;
      isProcessingInput.current = true;
      console.log(
        "[useTitleLogic] Input detected, transitioning to credits..."
      );
      setGameState("credits"); // This transitions away
    },
  });

  const [visualState, setVisualState] = useState<TitleVisualState | null>(null);

  // Initialize visual state when assets are available
  useEffect(() => {
    if (assets) {
      console.log("[useTitleLogic] Initializing visual state based on assets.");
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
      setVisualState(null);
    }
  }, [assets]); // Dependency ONLY on assets

  const advanceTitleShip = useCallback(() => {
    if (!assets || !visualState || assets.titleShips.length === 0) {
      return;
    }
    const oldIndex = currentIndexRef.current;
    let nextIndex = (oldIndex + 1) % assets.titleShips.length;
    currentIndexRef.current = nextIndex;
    shipDisplayTimerRef.current = 0;

    setVisualState((prevState) => {
      if (!prevState) return null;
      const newShips = prevState.ships.map((ship, index) => ({
        ...ship,
        visible: false,
        position: [
          Constants.TARGET_POS.x,
          Constants.TARGET_POS.y,
          Constants.START_Z,
        ] as [number, number, number],
        rotation: [0, Math.PI, 0] as [number, number, number],
      }));
      return { ...prevState, ships: newShips };
    });
  }, [assets, visualState]);

  // --- Animation Logic (using useFrame) ---
  useFrame((_state, delta) => {
    if (gameState !== "title" || !assets || !visualState) {
      return;
    }

    shipDisplayTimerRef.current += delta;
    const timer = shipDisplayTimerRef.current;
    const currentShipIndex = currentIndexRef.current;
    const totalCycle = Constants.TOTAL_CYCLE_DURATION;

    let needsStateUpdate = false;
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

        let currentZ = targetPosition.z;

        if (timer < flyInDuration) {
          targetVisible = true;
          const t = Math.min(1, timer / flyInDuration);
          currentZ = THREE.MathUtils.lerp(
            startZ,
            targetZ,
            1 - Math.pow(1 - t, 3)
          );
          targetRotationY = Math.PI + t * Math.PI * 4;
        } else if (timer < flyInDuration + holdDuration) {
          targetVisible = true;
          currentZ = targetZ;
          targetRotationY += 0.5 * delta;
        } else if (timer < totalCycle) {
          targetVisible = true;
          const flyOutTimer = timer - (flyInDuration + holdDuration);
          const t = Math.min(1, flyOutTimer / flyOutDuration);
          currentZ = THREE.MathUtils.lerp(targetZ, startZ, t * t * t);
          targetRotationY += 2.0 * delta;
        } else {
          targetVisible = false;
          currentZ = startZ;
          targetRotationY = Math.PI;
        }
        targetPosition.set(
          Constants.TARGET_POS.x,
          Constants.TARGET_POS.y,
          currentZ
        );
      } else {
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

      if (
        originalVisible !== targetVisible ||
        originalPositionArr[0] !== newPositionArr[0] ||
        originalPositionArr[1] !== newPositionArr[1] ||
        originalPositionArr[2] !== newPositionArr[2] ||
        originalRotationArr[1] !== newRotationArr[1]
      ) {
        needsStateUpdate = true;
      }

      return {
        visible: targetVisible,
        position: newPositionArr,
        rotation: newRotationArr,
      };
    });

    if (!visualState.planet.visible) {
      needsStateUpdate = true;
    }
    const newPlanetState = {
      ...visualState.planet,
      visible: true,
    };

    if (needsStateUpdate) {
      setVisualState({ ships: newShipsState, planet: newPlanetState });
    }

    if (timer >= totalCycle) {
      advanceTitleShip();
    }
  }); // End of useFrame

  // Effect to handle setup/cleanup when entering/leaving title state
  useEffect(() => {
    console.log("gameState:", gameState);
    if (gameState === "title") {
      console.log("[useTitleLogic] Activating Title State."); // Line 236
      isProcessingInput.current = false;

      currentIndexRef.current = 0;
      shipDisplayTimerRef.current = 0;
      // Ensure visual state is reset/initialized if assets are ready
      if (assets && !visualState) {
        // Re-initialize if visualState somehow became null
        console.log(
          "[useTitleLogic] Re-initializing visual state in activation effect."
        );
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
          planet: { visible: true, position: [200, 0, -500], scale: [1, 1, 1] },
        });
      } else if (visualState) {
        // If visualState exists, ensure planet is visible
        setVisualState((vs) =>
          vs ? { ...vs, planet: { ...vs.planet, visible: true } } : null
        );
      }

      introMusicRef.current?.play().catch(
        (e) => console.warn("[useTitleLogic] Intro music play failed:", e) // Line 247
      );

      return () => {
        console.log("[useTitleLogic] Cleaning up Title State (Stop Music)."); // Line 252
        introMusicRef.current?.pause();
        if (introMusicRef.current) {
          introMusicRef.current.currentTime = 0;
        }
      };
    }
    // TODO visualState as dependency?
  }, [gameState, assets, introMusicRef]);

  return { visualState };
}
