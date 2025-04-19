// src/features/credits/useCreditsLogic.ts
import { useEffect, useRef } from "react";
import { useGameState } from "@/features/common/useGameState";
import { useInput } from "@/hooks/useInput";

export function useCreditsLogic() {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState(); // Get gameState to check if active
  const { keysPressed } = useInput();

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

      // Cleanup function
      return () => {
        console.log("Deactivating Credits Logic Hook");
        // Clear timeout if the component/hook deactivates
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
      };
    }
  }, [gameState, setGameState]); // Add gameState and setGameState

  useEffect(() => {
    setGameState("stats");
  }, [keysPressed]);

  // No update logic needed
}
