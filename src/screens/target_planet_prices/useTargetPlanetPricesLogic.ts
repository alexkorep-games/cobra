// src/screens/target_planet_prices/useTargetPlanetPricesLogic.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { usePlanetInfos } from "@/hooks/usePlanetInfos";
import { useGameState } from "@/hooks/useGameState";
import { MarketGenerator, MarketSnapshot } from "@/classes/Market";
import { PLANET_SEED } from "@/constants"; // Assuming galaxy seed is constant for now

export function useTargetPlanetPricesLogic() {
  const { getSelectedPlanet } = usePlanetInfos();
  const { gameState, setGameState } = useGameState();
  const [targetMarket, setTargetMarket] = useState<MarketSnapshot | null>(null);
  const [selectedPlanetNameForPrices, setSelectedPlanetNameForPrices] =
    useState<string | null>(null);
  const isProcessingInput = useRef(false);

  const selectedPlanet = getSelectedPlanet();

  // Generate market data when the selected planet changes or the screen becomes active
  useEffect(() => {
    if (gameState === "target_planet_prices" && selectedPlanet) {
      // Store the name of the planet we're showing prices for
      setSelectedPlanetNameForPrices(selectedPlanet.name);

      console.log(
        `Generating temporary market view for ${selectedPlanet.name}...`
      );
      // Generate market data for the selected planet (visit 0 for viewing)
      const marketData = MarketGenerator.generate(
        selectedPlanet,
        PLANET_SEED,
        0
      );
      setTargetMarket(marketData);
      isProcessingInput.current = false; // Reset input flag
    } else if (gameState !== "target_planet_prices") {
      // Clear data when leaving the screen
      setTargetMarket(null);
      setSelectedPlanetNameForPrices(null);
    }
  }, [gameState, selectedPlanet]); // Re-run if game state or selected planet changes

  // --- Action to go back to the planet info screen ---
  const handleReturnToInfo = useCallback(() => {
    if (isProcessingInput.current) return;
    isProcessingInput.current = true;
    setGameState("planet_info");
    // Reset processing flag
    setTimeout(() => {
      isProcessingInput.current = false;
    }, 100);
  }, [setGameState]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState !== "target_planet_prices" || isProcessingInput.current)
        return;

      const key = event.key.toLowerCase();
      let processed = false;

      switch (key) {
        case "escape":
        case "n": // Like chart exit
        case "i": // Like info exit (since we came from Info)
          handleReturnToInfo(); // Use the shared handler
          processed = true;
          break;
      }
    },
    [gameState, handleReturnToInfo] // Depend on the handler
  );

  // Setup keyboard listener
  useEffect(() => {
    if (gameState === "target_planet_prices") {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [gameState, handleKeyDown]);

  return {
    targetMarket,
    planetName: selectedPlanetNameForPrices ?? "Unknown", // Provide the name to the component
    handleReturnToInfo,
  };
}
