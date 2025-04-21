/* src/features/sell_cargo/useSellCargoLogic.ts */
import { useState, useEffect, useRef, useCallback } from "react";
import { useMarketState } from "../../hooks/useMarketState";
import { usePlayerState } from "../../hooks/usePlayerState";
import { useGameState } from "../../hooks/useGameState";

export function useSellCargoLogic() {
  const { market, updateMarketQuantity } = useMarketState(); // Get market data generated on dock
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

  // Handler for clicking an item row (Sells all units if possible)
  const handleItemClick = useCallback(
    (key: string) => {
      if (!market || isProcessingInput.current) return;

      setSelectedCommodityKey(key); // Select the clicked item
      const marketInfo = market.get(key);
      const currentHolding = cargoHold.get(key) || 0;

      if (currentHolding <= 0) {
        console.warn(`Sell failed: No ${key} in cargo hold.`);
        return;
      }
      if (!marketInfo || marketInfo.price <= 0) {
        console.warn(`Sell failed: Market does not buy ${key} here.`);
        // TODO: Add sound/visual feedback
        return;
      }

      const sellPricePerUnit = marketInfo.price;
      const amountToSell = currentHolding; // Sell all
      const earnings = amountToSell * sellPricePerUnit;

      sellCargo(key, amountToSell, earnings); // Update player state
      updateMarketQuantity(key, +amountToSell);
      console.log(`Sold ${amountToSell} ${key} for ${earnings.toFixed(1)}`);
      // Selection will update automatically via useEffect on cargoHold change
    },
    [
      market,
      cargoHold,
      sellCargo,
      setSelectedCommodityKey,
      updateMarketQuantity,
    ]
  );

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
        case "s": // Sell (all)
          const currentKey = selectedCommodityKey;
          if (currentKey) {
            handleItemClick(currentKey); // Reuse click logic
          } else {
            console.warn("Sell failed: No item selected.");
          }
          processed = true;
          break;
        case "b": // Switch to buy screen
          setGameState("buy_cargo");
          processed = true;
          break;
        case "escape": // Exit market
          setGameState("stats");
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
      selectedIndex,
      selectedCommodityKey,
      cargoItems,
      setGameState,
      handleItemClick,
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
    handleItemClick,
    selectedCommodityKey,
  };
}
