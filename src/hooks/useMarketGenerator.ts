// src/hooks/useMarketGenerator.ts
import { useCallback } from "react";
import { usePlanetInfos } from "@/hooks/usePlanetInfos";
import { useMarketState } from "@/hooks/useMarketState";
import { MarketGenerator } from "@/classes/Market";
import { PLANET_SEED } from "@/constants"; // Assuming galaxy seed is constant for now
import { PlanetInfo } from "@/classes/PlanetInfo"; // Import PlanetInfo type

// Hook to provide a function for generating market data for a given planet or the current one
export function useMarketGenerator() {
  const { getCurrentPlanet } = usePlanetInfos();
  const { setMarket } = useMarketState();
  // TODO: Get visit serial number, perhaps from player state if needed
  const visitSerial = 0; // Hardcoded for now

  /**
   * Generates market data for a specific target planet, or the current planet if none is provided.
   * @param targetPlanet Optional: The specific planet to generate the market for (e.g., after a jump).
   */
  const generateMarketForPlanet = useCallback(
    (targetPlanet?: PlanetInfo) => {
      const planetToUse = targetPlanet ?? getCurrentPlanet(); // Use target if provided, else current
      if (planetToUse) {
        console.log(
          `Generating market for ${planetToUse.name} (Visit ${visitSerial})`
        );
        const marketData = MarketGenerator.generate(
          planetToUse,
          PLANET_SEED, // Use constant galaxy seed
          visitSerial // Use visit serial
        );
        setMarket(marketData);
      } else {
        console.warn(
          "Cannot generate market: Planet not found (target or current)."
        );
        setMarket(null); // Clear market data if planet is invalid
      }
    },
    [getCurrentPlanet, setMarket, visitSerial]
  ); // Dependencies remain the same

  return generateMarketForPlanet; // Return the versatile function
}
