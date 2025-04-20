/* src/features/sell_cargo/useSellCargoLogic.ts */
import { useState, useEffect, useRef, useCallback } from "react";
import { useMarketState } from "../common/useMarketState";
import { usePlayerState } from "../common/usePlayerState";
import { useGameState } from "../common/useGameState";

export function useSellCargoLogic() {
  const { market } = useMarketState(); // Get market data generated on dock
  const { cargoHold, sellCargo } = usePlayerState();
  const { gameState, setGameState } = useGameState();

  const [cargoItems, setCargoItems] = useState<[string, number][]>([]); // Array of [key, quantity]
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCommodityKey, setSelectedCommodityKey] = useState<
    string | null
  >(null);
  const isProcessingInput = useRef(false);

  // Update the list of items the player *actually* has when cargoHold changes
  useEffect(() => {
    const items = Array.from(cargoHold.entries()).filter(
      ([key, qty]) => qty > 0
    );
    setCargoItems(items);

    if (items.length > 0) {
      // Try to maintain selection or default to first
      const currentKey = selectedCommodityKey;
      const foundIndex = items.findIndex(([key, qty]) => key === currentKey);
      if (foundIndex !== -1) {
        setSelectedIndex(foundIndex);
        // Key already set
      } else {
        setSelectedIndex(0);
        setSelectedCommodityKey(items[0][0]); // Select the key of the first item
      }
    } else {
      setSelectedIndex(0);
      setSelectedCommodityKey(null);
    }
  }, [cargoHold, selectedCommodityKey]); // Re-run if cargo changes

  // Update selected key when index changes
  useEffect(() => {
    if (cargoItems.length > selectedIndex) {
      setSelectedCommodityKey(cargoItems[selectedIndex][0]); // Get key from tuple
    } else {
      setSelectedCommodityKey(null);
    }
  }, [selectedIndex, cargoItems]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        gameState !== "sell_cargo" ||
        isProcessingInput.current ||
        cargoItems.length === 0
      )
        return;

      let processed = false;
      const key = event.key.toLowerCase();

      switch (key) {
        case "arrowup":
        case "w":
          setSelectedIndex((prev) => Math.max(0, prev - 1));
          processed = true;
          break;
        case "arrowdown":
        case "s":
          setSelectedIndex((prev) => Math.min(cargoItems.length - 1, prev + 1));
          processed = true;
          break;
        case "s": // Sell
          const currentKey = selectedCommodityKey;
          const marketInfo = currentKey ? market?.get(currentKey) : undefined;
          const currentHolding = currentKey ? cargoHold.get(currentKey) : 0;

          // Check if the market actually buys this item (has a price > 0)
          if (
            currentKey &&
            currentHolding &&
            currentHolding > 0 &&
            marketInfo &&
            marketInfo.price > 0
          ) {
            const sellPricePerUnit = marketInfo.price;
            const amountToSell = currentHolding; // Sell all for now
            const earnings = amountToSell * sellPricePerUnit;

            sellCargo(currentKey, amountToSell, earnings); // Update player state
            console.log(
              `Sold ${amountToSell} of ${currentKey} for ${earnings}`
            );

            // Selection will update automatically via useEffect on cargoHold change
            // Might need to reset index if the list becomes empty
            if (
              cargoHold.size === 1 &&
              cargoHold.get(currentKey) === amountToSell
            ) {
              // Check if this was the last item type
              setSelectedIndex(0); // Reset index if needed
            }
          } else {
            console.warn(
              "Sell failed: Item not selected, not held, or market doesn't buy it."
            );
            // TODO: Add error sound/visual feedback
          }
          processed = true;
          break;
        case "b": // Switch to buy screen
          setGameState("buy_cargo");
          processed = true;
          break;
        case "escape": // Exit market
          // Assuming back to stats for now
          setGameState("stats"); // Or maybe 'docked_services'
          processed = true;
          break;
      }

      if (processed) {
        isProcessingInput.current = true;
        setTimeout(() => {
          isProcessingInput.current = false;
        }, 50); // Short debounce
      }
    },
    [
      gameState,
      market,
      selectedIndex,
      selectedCommodityKey,
      cargoItems,
      cargoHold,
      setGameState,
      sellCargo,
    ]
  );

  // Setup keyboard listener
  useEffect(() => {
    if (gameState === "sell_cargo") {
      window.addEventListener("keydown", handleKeyDown);
      isProcessingInput.current = false; // Reset on activation
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [gameState, handleKeyDown]);

  return {
    market,
    cargoItems, // Pass derived items to component
    selectedCommodityKey,
  };
}
