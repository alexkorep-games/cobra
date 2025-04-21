import { useEffect, useRef, useCallback } from "react";
import { useGameState } from "@/hooks/useGameState";
import { usePlanetInfos } from "@/hooks/usePlanetInfos"; // Use this hook
import { usePlayerState } from "@/hooks/usePlayerState"; // Need fuel state
import { useMarketGenerator } from "@/hooks/useMarketGenerator"; // Need market generator
import { calculateDistance } from "@/classes/PlanetInfo";
import { JUMP_RANGE } from "@/constants";

export function usePlanetInfoLogic() {
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState();
  // Get selected planet name and setter for current planet from shared state
  const {
    selectedPlanetName,
    setSelectedPlanetName,
    setCurrentPlanetName,
    getCurrentPlanet,
    getSelectedPlanet,
  } = usePlanetInfos();
  const { fuel, setFuelLevel } = usePlayerState(); // Get fuel and setter
  const generateMarketForPlanet = useMarketGenerator(); // Get the updated generator function

  // --- Function to Handle the Jump Action ---
  const handleJumpAction = useCallback(() => {
    if (isProcessingInput.current) return;

    const targetPlanet = getSelectedPlanet();
    const originPlanet = getCurrentPlanet();

    if (!targetPlanet || !originPlanet) {
      console.warn("Jump failed: Origin or Target planet data missing.");
      return;
    }

    // Prevent jumping to the current planet
    if (targetPlanet.name === originPlanet.name) {
      console.warn("Jump failed: Cannot jump to the current location.");
      return;
    }

    const distance = calculateDistance(
      originPlanet.coordinates,
      targetPlanet.coordinates
    );

    if (distance > JUMP_RANGE) {
      console.warn(
        `Jump failed: Target ${
          targetPlanet.name
        } is out of range (${distance.toFixed(1)} LY).`
      );
      // TODO: Add sound/visual feedback
      return;
    }

    if (fuel < distance) {
      console.warn(
        `Jump failed: Insufficient fuel for jump (${fuel.toFixed(
          1
        )} LY available, ${distance.toFixed(1)} LY needed).`
      );
      // TODO: Add sound/visual feedback
      return;
    }

    isProcessingInput.current = true; // Prevent double actions

    console.log(`Jumping from ${originPlanet.name} to ${targetPlanet.name}...`);

    // 1. Consume Fuel
    setFuelLevel(fuel - distance);

    // 2. Update Current Planet
    setCurrentPlanetName(targetPlanet.name);

    // 3. Generate Market for the *new* planet IMMEDIATELY
    //    Pass the targetPlanet object directly to ensure the correct market is generated.
    generateMarketForPlanet(targetPlanet);

    // 4. Change Game State directly to Stats
    setGameState("stats");

    // Optional: Clear selection after jump?
    // setSelectedPlanetName(null);

    // Reset processing flag after a short delay (though changing state might be enough)
    setTimeout(() => {
      isProcessingInput.current = false;
    }, 100);
  }, [
    getSelectedPlanet,
    getCurrentPlanet,
    fuel,
    setFuelLevel,
    setCurrentPlanetName,
    generateMarketForPlanet,
    setGameState,
    setSelectedPlanetName, // Add setSelectedPlanetName if used in future logic here
  ]);

  // --- Function to Handle Showing Prices ---
  const handleShowPricesAction = useCallback(() => {
    if (isProcessingInput.current) return;

    const targetPlanet = getSelectedPlanet();
    if (!targetPlanet) {
      console.warn("Show Prices failed: Target planet data missing.");
      return;
    }

    isProcessingInput.current = true;
    console.log(`Showing prices for ${targetPlanet.name}...`);
    setGameState("target_planet_prices"); // Navigate to the new price screen

    // Reset processing flag
    setTimeout(() => {
      isProcessingInput.current = false;
    }, 100);
  }, [getSelectedPlanet, setGameState]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState === "planet_info" && !isProcessingInput.current) {
        // Already check gameState here
        console.log(`Planet Info KeyDown: ${event.key}`);
        let processed = false;
        const key = event.key.toLowerCase(); // Use lowercase key

        switch (
          key // Compare with lowercase key
        ) {
          case "j": // Jump key
            handleJumpAction(); // Call the jump handler
            processed = true;
            break;
          case "p": // Prices key
            handleShowPricesAction(); // Call the show prices handler
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
    [gameState, setGameState, handleJumpAction, handleShowPricesAction] // Add handlers dependency
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

  // Hook doesn't need to return anything for the component if it reads from usePlanetInfos
  return { handleJumpAction, handleShowPricesAction };
}
