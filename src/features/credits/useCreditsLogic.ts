// src/features/credits/useCreditsLogic.ts
import { useEffect, useRef, useCallback } from "react";
import { useGameState } from "@/features/common/useGameState";

export function useCreditsLogic() {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState(); // Get gameState to check if active

  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      // Check gameState directly
      if (gameState === "credits" && !isProcessingInput.current) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true;
          console.log("Credits input detected, switching to stats...");
          // Clear timeout if input happens before it fires
          if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          setGameState("stats");
          // Optional: Reset flag after a short delay if needed, though state change handles it
          // setTimeout(() => { isProcessingInput.current = false; }, 50);
        }
      }
    },
    [gameState, setGameState]
  ); // Add gameState to dependencies

  useEffect(() => {
    // Only run logic when the credits screen is active
    if (gameState === "credits") {
      console.log("Activating Credits Logic Hook");
      isProcessingInput.current = false; // Reset input flag

      // Clear previous timeout just in case
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Set timeout to automatically switch state
      timeoutIdRef.current = setTimeout(() => {
        // Check gameState again inside timeout in case state changed rapidly
        if (gameState === "credits") {
          console.log("Credits timeout reached, switching to stats...");
          setGameState("stats");
        }
        timeoutIdRef.current = null; // Clear ref after execution
      }, 3000); // 3 second delay

      // Add input listeners
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);

      // Cleanup function
      return () => {
        console.log("Deactivating Credits Logic Hook");
        // Clear timeout if the component/hook deactivates
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
        // Remove listeners
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);
      };
    }
  }, [gameState, handleInput, setGameState]); // Add gameState and setGameState

  // No update logic needed
}
