import { useEffect, useRef, useCallback } from "react";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos"; // Use this hook

export function usePlanetInfoLogic() {
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState();
  // Get selected planet name from shared state
  const { selectedPlanetName } = usePlanetInfos();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState === "planet_info" && !isProcessingInput.current) {
        console.log(`Planet Info KeyDown: ${event.key}`);
        let processed = false;

        switch (event.key) {
          case "j": // Jump key (example) - Action might change
          case "J":
            console.log(
              "Jump initiated from Planet Info (placeholder)... returning to chart."
            );
            // TODO: Implement actual jump logic (new state? animation?)
            setGameState("short_range_chart"); // Go back for now
            processed = true;
            break;
          case "Escape":
          case "n": // Allow 'n' to close the info too
          case "N":
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
    [gameState, setGameState]
  ); // Add dependencies

  useEffect(() => {
    if (gameState === "planet_info") {
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

      // Cleanup function when PlanetInfoScreen unmounts/deactivates
      return () => {
        console.log("Deactivating Planet Info Logic Hook");
        // Remove listener
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    // Add selectedPlanetName, gameState, setGameState to dependencies
  }, [gameState, handleKeyDown, selectedPlanetName, setGameState]);

  // No update logic needed
  // Hook doesn't need to return anything for the component if it reads from usePlanetInfos
}
