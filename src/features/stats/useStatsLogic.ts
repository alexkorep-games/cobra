import { useEffect, useRef, useCallback } from "react";
import { IGameManager } from "@/types";
import { useGameState } from "@/features/common/useGameState";

export function useStatsLogic(gameManager: IGameManager | null) {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState(); // Get current state and setter

  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      // Check if this is the active state
      if (gameState === "stats" && gameManager && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true;
          console.log("Stats input detected, switching to undocking...");
          // Clear timeout if input happens before it fires
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          setGameState("undocking");
          // Reset flag shortly after
          setTimeout(() => {
            isProcessingInput.current = false;
          }, 100);
        }
      }
    },
    [gameState, gameManager, setGameState]
  ); // Add dependencies

  useEffect(() => {
    // Runs when StatsScreen mounts
    console.log("Activating Stats Logic Hook");
    isProcessingInput.current = false; // Reset input flag

    // Clear previous timeout just in case
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set timeout to automatically switch state
    timeoutIdRef.current = setTimeout(() => {
      // Check gameState again inside timeout
      if (gameState === "stats" && gameManager) {
        console.log("Stats timeout reached, switching to undocking...");
        setGameState("undocking");
      }
      timeoutIdRef.current = null; // Clear ref after execution
    }, 5000); // 5 second delay

    // Add input listeners
    window.addEventListener("keydown", handleInput);
    window.addEventListener("mousedown", handleInput);

    // Cleanup function when StatsScreen unmounts
    return () => {
      console.log("Deactivating Stats Logic Hook");
      // Clear timeout if the component/hook deactivates
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      // Remove listeners
      window.removeEventListener("keydown", handleInput);
      window.removeEventListener("mousedown", handleInput);
    };
    // Effect dependencies
  }, [gameManager, handleInput, setGameState, gameState]); // Added gameState dependency

  // No update logic needed from GameManager's loop for this scene
}
