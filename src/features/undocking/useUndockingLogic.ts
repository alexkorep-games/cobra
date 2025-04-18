import { useEffect, useRef, useCallback } from "react";
import { IGameManager } from "@/types";
import { useGameState } from "@/features/common/useGameState";

const UNDOCKING_DURATION = 4000; // ms
// Removed SQUARE_SPEED, animation handled by UndockingSquares component

export function useUndockingLogic(gameManager: IGameManager | null) {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { gameState, setGameState } = useGameState();

  // No update logic needed here anymore, R3F component handles its animation

  // --- Effect for Setup, Cleanup ---
  useEffect(() => {
    // Runs when UndockingScreen mounts
    if (gameManager) {
      console.log("Activating Undocking Logic Hook");

      // Play undocking sound
      gameManager.undockSoundRef.current
        ?.play()
        .catch((e) => console.warn("Undock sound play failed:", e));

      // Clear previous timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Set timeout to switch to space flight
      timeoutIdRef.current = setTimeout(() => {
        // Check state again in timeout
        if (gameState === "undocking" && gameManager) {
          console.log("Undocking finished, switching to space flight...");
          setGameState("space_flight");
        }
        timeoutIdRef.current = null;
      }, UNDOCKING_DURATION);

      // No update function registration needed

      // Cleanup function when UndockingScreen unmounts
      return () => {
        console.log("Deactivating Undocking Logic Hook");

        // Clear timeout
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }

        // Stop and reset sound
        if (gameManager.undockSoundRef.current) {
          gameManager.undockSoundRef.current.pause();
          gameManager.undockSoundRef.current.currentTime = 0;
        }
        // R3F component will hide itself based on gameState in App.tsx
      };
    }
    // Effect dependencies
  }, [gameManager, gameState, setGameState]); // Added gameState, setGameState

  // No input handling needed for this scene
  // Hook doesn't need to return anything for the component
}
