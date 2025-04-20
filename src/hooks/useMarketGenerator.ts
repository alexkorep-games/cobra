// src/hooks/useMarketGenerator.ts
import { useCallback } from "react";
import { usePlanetInfos } from "@/hooks/usePlanetInfos";
import { useMarketState } from "@/hooks/useMarketState";
import { MarketGenerator } from "@/classes/Market";
import { PLANET_SEED } from "@/constants"; // Assuming galaxy seed is constant for now

// Hook to provide a function for generating market data for the current planet
export function useMarketGenerator() {
  const { getCurrentPlanet } = usePlanetInfos();
  const { setMarket } = useMarketState();
  // TODO: Get visit serial number, perhaps from player state if needed
  const visitSerial = 0; // Hardcoded for now

  const generateMarketForCurrentPlanet = useCallback(() => {
    const currentPlanet = getCurrentPlanet();
    if (currentPlanet) {
      console.log(
        `Generating market for ${currentPlanet.name} (Visit ${visitSerial})`
      );
      const marketData = MarketGenerator.generate(
        currentPlanet,
        PLANET_SEED, // Use constant galaxy seed
        visitSerial // Use visit serial
      );
      setMarket(marketData);
    } else {
      console.warn("Cannot generate market: Current planet not found.");
      setMarket(null); // Clear market data if planet is invalid
    }
  }, [getCurrentPlanet, setMarket, visitSerial]); // Dependencies

  return generateMarketForCurrentPlanet;
}

// Usage:
// Call generateMarketForCurrentPlanet() when the player docks at a station/planet.
