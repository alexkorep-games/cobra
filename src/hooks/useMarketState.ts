// src/features/common/useMarketState.ts
import { atom, useAtom } from "jotai";
import { MarketSnapshot } from "@/classes/Market";

// Atom to hold the current market data for the docked location
const marketSnapshotAtom = atom<MarketSnapshot | null>(null);

// Hook to access and update the market state
export function useMarketState() {
  const [market, setMarket] = useAtom(marketSnapshotAtom);

  return {
    market,
    setMarket,
  };
}

// NOTE: You'll need to call `setMarket` somewhere when the player docks.
// This likely involves:
// 1. Getting the current planet info (from usePlanetInfos).
// 2. Getting the galaxy seed (needs to be stored somewhere, maybe player state or constants).
// 3. Getting a "visit serial" number (could increment in player state each time they dock).
// 4. Calling MarketGenerator.generate(planet, seed, visitSerial).
// 5. Calling setMarket with the result.
// This logic could live in a 'docking' sequence handler or when transitioning to a 'docked' state.
