// src/hooks/useMarketState.ts
import { atom, useAtom } from "jotai";
import { MarketSnapshot, CommodityState } from "@/classes/Market"; // Import CommodityState

// Atom to hold the current market data for the docked location
const marketSnapshotAtom = atom<MarketSnapshot | null>(null);

// Hook to access and update the market state
export function useMarketState() {
  const [market, setMarket] = useAtom(marketSnapshotAtom);

  /**
   * Updates the quantity of a specific commodity in the current market snapshot.
   * Creates a new MarketSnapshot object to maintain immutability.
   * @param key The commodity key to update.
   * @param change The amount to change the quantity by (positive for adding stock, negative for removing).
   */
  const updateMarketQuantity = (key: string, change: number) => {
    setMarket((currentMarket) => {
      if (!currentMarket) {
        console.warn("Cannot update market quantity: Market snapshot is null.");
        return null; // Return null if no market exists
      }

      const currentTable = currentMarket.table;
      const currentState = currentTable.get(key);

      if (!currentState) {
        console.warn(
          `Cannot update market quantity: Commodity "${key}" not found in market.`
        );
        return currentMarket; // Return original market if key not found
      }

      // Create a new map based on the old one to ensure immutability
      const newTable = new Map<string, CommodityState>(currentTable);
      const newQuantity = Math.max(0, currentState.quantity + change); // Ensure quantity doesn't go below 0

      // Update the specific commodity in the new map
      newTable.set(key, { ...currentState, quantity: newQuantity });

      // Create and return a new MarketSnapshot with the updated table
      return new MarketSnapshot(currentMarket.timestamp, newTable);
    });
  };

  return {
    market,
    setMarket,
    updateMarketQuantity, // Export the new function
  };
}
