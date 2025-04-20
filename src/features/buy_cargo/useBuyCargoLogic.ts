import { useState, useEffect, useRef, useCallback } from "react";
import { useMarketState } from "@/features/common/useMarketState";
import { usePlayerState } from "@/features/common/usePlayerState";
import { useGameState } from "@/features/common/useGameState";

export function useBuyCargoLogic() {
  const { market } = useMarketState(); // Get market data generated on dock
  const { cash, cargoHold, buyCargo, cargoCapacity, getCargoUsed } =
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
      const keys = Array.from(market.keys());
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
            const cost = quantity * itemState.price;
            const spaceNeeded = quantity; // Assuming 1t for now - needs adjustment for kg/g later

            if (
              cash >= cost &&
              cargoSpaceLeft >= spaceNeeded &&
              quantity <= itemState.quantity
            ) {
              buyCargo(currentKey, quantity, cost); // Update player state
              // Refresh market potentially (or assume it's static until undock)
              console.log(`Bought ${quantity} of ${currentKey} for ${cost}`);
              // Need market refresh logic here if quantities should update immediately
            } else {
              console.warn(
                "Buy failed: Insufficient credits, space, or stock."
              );
              // TODO: Add sound effect for failure
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
          case "b": // Buy
            const currentKey = selectedCommodityKey;
            const itemState = currentKey ? market?.get(currentKey) : undefined;
            if (
              currentKey &&
              itemState &&
              itemState.quantity > 0 &&
              cargoSpaceLeft > 0
            ) {
              setIsEnteringQuantity(true);
              setQuantityInput("");
              processed = true;
            } else {
              // Cannot buy (out of stock or no space)
              // TODO: Add error sound/visual feedback
              console.log(
                "Cannot initiate buy - out of stock or no cargo space."
              );
            }
            break;
          case "s": // Switch to sell screen
            setGameState("sell_cargo");
            processed = true;
            break;
          case "escape": // Exit market
            // Need to decide where to go - back to stats? space flight? docked menu?
            // Assuming back to stats for now based on video flow
            setGameState("stats"); // Or maybe 'docked_services' if that exists
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
    cargoSpaceLeft,
  };
}
