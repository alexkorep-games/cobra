import { useEffect, useRef, useCallback } from "react";
import { IGameManager } from "../../types";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos"; // Import planet state hook

export function usePlanetInfoLogic(gameManager: IGameManager | null) {
  const isProcessingInput = useRef(false); // Optional: Prevent double processing
  const { gameState, setGameState } = useGameState();
  const { selectedPlanetName } = usePlanetInfos(); // Get selected planet name from shared state

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Only run if this is the active state and input not processed
      if (
        gameState === "planet_info" &&
        gameManager &&
        !isProcessingInput.current
      ) {
        console.log(`Planet Info KeyDown: ${event.key}`);
        let processed = false;

        switch (
          event.key.toLowerCase() // Use toLowerCase for easier comparison
        ) {
          case "j": // Jump key (example)
            console.log("Jump initiated (placeholder)... returning to chart.");
            // TODO: Implement actual jump logic (new state? animation?)
            // Might involve updating currentPlanetName in usePlanetInfos
            setGameState("short_range_chart"); // Go back for now
            processed = true;
            break;
          case "escape":
          case "n": // Allow 'n' to close the info too
            setGameState("short_range_chart"); // Go back to chart
            processed = true;
            break;
        }

        if (processed) {
          isProcessingInput.current = true;
          // Reset processing flag shortly after to allow new input
          setTimeout(() => {
            isProcessingInput.current = false;
          }, 100);
        }
      }
    },
    [gameState, gameManager, setGameState]
  ); // Add dependencies

  useEffect(() => {
    // Runs when PlanetInfoScreen mounts
    console.log("Activating Planet Info Logic Hook");
    isProcessingInput.current = false; // Reset on activation

    // Check if a planet is actually selected in shared state
    if (!selectedPlanetName) {
      console.warn(
        "No planet selected when entering Planet Info, returning to chart."
      );
      // Use RAF to ensure state change happens after current render cycle
      requestAnimationFrame(() => {
        // Check gameState again inside RAF to prevent race conditions
        if (gameState === "planet_info") {
          setGameState("short_range_chart");
        }
      });
      return; // Don't add listeners if returning immediately
    }

    console.log("Entering Planet Info Screen for:", selectedPlanetName);

    // Add keydown listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function when PlanetInfoScreen unmounts
    return () => {
      console.log("Deactivating Planet Info Logic Hook");
      // Remove listener
      window.removeEventListener("keydown", handleKeyDown);
    };
    // Add selectedPlanetName, gameState, setGameState to dependencies
  }, [gameManager, handleKeyDown, selectedPlanetName, gameState, setGameState]);

  // No update logic needed from GameManager's loop for this scene
}
