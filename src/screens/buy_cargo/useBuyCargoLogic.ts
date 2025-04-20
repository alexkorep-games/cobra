import { useState, useEffect, useRef, useCallback } from "react";
import { useMarketState } from "@/hooks/useMarketState";
import { usePlayerState } from "@/hooks/usePlayerState";
import { useGameState } from "@/hooks/useGameState";
import { getTonnesPerUnit } from "@/classes/Market";

export function useBuyCargoLogic() {
  const { market, updateMarketQuantity } = useMarketState(); // Get market data generated on dock
  const { cash, buyCargo, cargoCapacity, getCargoUsed } =
    usePlayerState();
  const { gameState, setGameState } = useGameState();
  const commodityKeys = useRef<string[]>([]); // Store keys present in the market
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCommodityKey, setSelectedCommodityKey] = useState<
    string | null
  >(null);
  const [isEnteringQuantity, setIsEnteringQuantity] = useState(false);
  const [quantityInput, setQuantityInput] = useState("");
  const isProcessingInput = useRef(false);
  const cargoSpaceLeft = cargoCapacity - getCargoUsed();

  // Update commodity keys and selection when market data changes
  useEffect(() => {
    if (market) {
      const keys = Array.from(market.entries())
        .filter(([_key, state]) => state.quantity > 0 || state.price > 0) // Include items with price even if 0 qty
        .map(([key]) => key);
      commodityKeys.current = keys;
      if (keys.length > 0) {
        // Try to maintain selection or default to first
        const currentKey = selectedCommodityKey;
        const foundIndex = keys.findIndex((k) => k === currentKey);
        if (foundIndex !== -1) {
          setSelectedIndex(foundIndex);
          // Key already set
        } else {
          setSelectedIndex(0);
          setSelectedCommodityKey(keys[0]);
        }
      } else {
        setSelectedIndex(0);
        setSelectedCommodityKey(null);
      }
      // Reset quantity input when market changes
      setIsEnteringQuantity(false);
      setQuantityInput("");
    }
  }, [market, selectedCommodityKey]); // Re-run if market changes

  // Update selected key when index changes
  useEffect(() => {
    if (commodityKeys.current.length > selectedIndex) {
      setSelectedCommodityKey(commodityKeys.current[selectedIndex]);
    } else {
      setSelectedCommodityKey(null);
    }
    // Reset quantity input when selection changes
    setIsEnteringQuantity(false);
    setQuantityInput("");
  }, [selectedIndex]);

  // Handler for clicking an item row (Buys 1 unit if possible)
  const handleItemClick = useCallback(
    (key: string) => {
      if (!market || isProcessingInput.current || isEnteringQuantity) return;

      setSelectedCommodityKey(key); // Select the clicked item
      const itemState = market.get(key);
      const spaceNeeded = getTonnesPerUnit(key); // Get space needed for 1 unit

      if (!itemState || itemState.quantity <= 0) {
        console.warn(`Buy failed: ${key} is out of stock.`);
        // TODO: Add sound/visual feedback
        return;
      }
      if (cargoSpaceLeft < spaceNeeded) {
        console.warn(`Buy failed: Not enough cargo space for 1 ${key}.`);
        // TODO: Add sound/visual feedback
        return;
      }
      if (cash < itemState.price) {
        console.warn(`Buy failed: Insufficient credits for 1 ${key}.`);
        // TODO: Add sound/visual feedback
        return;
      }

      buyCargo(key, 1, itemState.price); // Buy 1 unit
      updateMarketQuantity(key, -1); // <-- DECREASE market quantity by 1

      console.log(`Bought 1 ${key} for ${itemState.price.toFixed(1)}`);
    },
    [
      market,
      cash,
      cargoSpaceLeft,
      buyCargo,
      isEnteringQuantity,
      setSelectedCommodityKey,
      updateMarketQuantity,
    ]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState !== "buy_cargo" || isProcessingInput.current) return;

      let processed = false;
      const key = event.key.toLowerCase();

      if (isEnteringQuantity) {
        if (key >= "0" && key <= "9") {
          setQuantityInput((prev) => prev + key);
          processed = true;
        } else if (key === "backspace") {
          setQuantityInput((prev) => prev.slice(0, -1));
          processed = true;
        } else if (key === "enter") {
          const quantity = parseInt(quantityInput, 10);
          const currentKey = selectedCommodityKey;
          const itemState = currentKey ? market?.get(currentKey) : undefined;

          if (!isNaN(quantity) && quantity > 0 && currentKey && itemState) {
            const spaceNeeded = quantity * getTonnesPerUnit(currentKey);
            const cost = quantity * itemState.price;

            if (cash < cost) {
              console.warn("Buy failed: Insufficient credits.");
            } else if (cargoSpaceLeft < spaceNeeded) {
              console.warn("Buy failed: Insufficient cargo space.");
            } else if (quantity > itemState.quantity) {
              console.warn("Buy failed: Insufficient stock.");
            } else {
              buyCargo(currentKey, quantity, cost); // Update player state
              updateMarketQuantity(currentKey, -quantity); 
              console.log(
                `Bought ${quantity} of ${currentKey} for ${cost.toFixed(1)}`
              );
              // Need market refresh logic here if quantities should update immediately
              // For now, player state updates, market visually remains static until re-dock
            }
          }
          setIsEnteringQuantity(false);
          setQuantityInput("");
          processed = true;
        } else if (key === "escape") {
          setIsEnteringQuantity(false);
          setQuantityInput("");
          processed = true;
        }
      } else {
        // Not entering quantity, handle navigation/actions
        switch (key) {
          case "arrowup":
          case "w":
            setSelectedIndex((prev) => Math.max(0, prev - 1));
            processed = true;
            break;
          case "arrowdown":
          case "s":
            setSelectedIndex((prev) =>
              Math.min(commodityKeys.current.length - 1, prev + 1)
            );
            processed = true;
            break;
          case "b": // Buy (multiple)
            const currentKey = selectedCommodityKey;
            const itemState = currentKey ? market?.get(currentKey) : undefined;
            const spaceForOneUnit = currentKey
              ? getTonnesPerUnit(currentKey)
              : 1;

            if (
              currentKey &&
              itemState &&
              itemState.quantity > 0 &&
              cargoSpaceLeft >= spaceForOneUnit && // Must have space for at least one
              cash >= itemState.price // Must have cash for at least one
            ) {
              setIsEnteringQuantity(true);
              setQuantityInput("");
              processed = true;
            } else {
              // Cannot buy (out of stock or no space/cash for even one)
              console.log(
                "Cannot initiate buy - out of stock, no cargo space, or insufficient funds."
              );
              // TODO: Add error sound/visual feedback
            }
            break;
          case "s": // Switch to sell screen
            setGameState("sell_cargo");
            processed = true;
            break;
          case "escape": // Exit market
            setGameState("stats"); // Back to stats screen
            processed = true;
            break;
        }
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
      isEnteringQuantity,
      quantityInput,
      cash,
      cargoSpaceLeft,
      setGameState,
      buyCargo,
      updateMarketQuantity,
    ]
  );

  // Setup keyboard listener
  useEffect(() => {
    if (gameState === "buy_cargo") {
      window.addEventListener("keydown", handleKeyDown);
      isProcessingInput.current = false; // Reset on activation
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [gameState, handleKeyDown]);

  return {
    market,
    selectedCommodityKey,
    quantityInput,
    isEnteringQuantity,
    handleItemClick, // Export click handler
    cargoSpaceLeft,
  };
}
