import { useEffect, useRef } from "react";
import { useGameState } from "@/hooks/useGameState";

const UNDOCKING_DURATION = 2000; // ms

// Receive audio ref
export function useUndockingLogic(
  undockSoundRef: React.RefObject<HTMLAudioElement | null>
) {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { gameState, setGameState } = useGameState(); // Get gameState

  // No update logic needed here anymore, R3F component handles its animation

  // --- Effect for Setup, Cleanup ---
  useEffect(() => {
    // Runs when UndockingScreen mounts/activates
    if (gameState === "undocking") {
      console.log("Activating Undocking Logic Hook");

      // Play undocking sound using the passed ref
      undockSoundRef.current
        ?.play()
        .catch((e) => console.warn("Undock sound play failed:", e));

      // Clear previous timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Set timeout to switch to space flight
      timeoutIdRef.current = setTimeout(() => {
        // Check state again in timeout
        if (gameState === "undocking") {
          console.log("Undocking finished, switching to space flight...");
          setGameState("space_flight");
        }
        timeoutIdRef.current = null;
      }, UNDOCKING_DURATION);

      // Cleanup function when UndockingScreen unmounts/deactivates
      return () => {
        console.log("Deactivating Undocking Logic Hook");

        // Clear timeout
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }

        // Stop and reset sound using the passed ref
        if (undockSoundRef.current) {
          undockSoundRef.current.pause();
          undockSoundRef.current.currentTime = 0;
        }
        // R3F component will hide itself based on gameState in App.tsx
      };
    }
    // Effect dependencies
  }, [gameState, setGameState, undockSoundRef]); // Added gameState, setGameState, undockSoundRef

  // No input handling needed for this scene
  // Hook doesn't need to return anything for the component
}
