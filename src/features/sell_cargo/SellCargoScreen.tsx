/* src/features/sell_cargo/SellCargoScreen.tsx */
import React from "react";
import { useSellCargoLogic } from "@/features/sell_cargo/useSellCargoLogic";
import { usePlayerState } from "@/features/common/usePlayerState";
import { COMMODITIES } from "@/classes/Market"; // To get units easily
import "../../components/App.css";
import "../buy_cargo/Market.css"; // Reuse market styles

const SellCargoScreen: React.FC = () => {
  const {
    market,
    cargoItems, // Get items directly from the hook
    selectedCommodityKey,
    // Add quantity input/state if partial selling is implemented
  } = useSellCargoLogic();
  const { cash } = usePlayerState();

  // Helper to find unit for a commodity
  const getUnit = (key: string): string => {
    const commodityDef = COMMODITIES.find((c) => c.key === key);
    if (!commodityDef) return "t"; // Default to tonnes
    // Map base units for display
    if (commodityDef.key === "Gold" || commodityDef.key === "Platinum")
      return "kg";
    if (commodityDef.key === "Gem-Stones") return "g";
    return "t"; // Default
  };

  if (!market) {
    return (
      <div className="market-container sell-screen">
        <div className="market-title">SELL CARGO</div>
        <div className="market-loading">Market data unavailable...</div>
      </div>
    );
  }

  return (
    <div className="market-container sell-screen">
      <div className="market-header">
        <div className="market-title">SELL CARGO</div>
        <div className="market-credits">{cash.toFixed(1)} Credits</div>
      </div>
      <div className="market-instructions">
        Use Up/Down keys or device to select item. Press 'S' to sell the item.
        <br />
        Press 'B' to switch to Buy Screen, ESC to exit market.
      </div>
      <div className="market-table-container">
        <table className="market-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>UNIT</th>
              <th>PRICE</th>
              <th>QTY</th>
            </tr>
          </thead>
          <tbody>
            {cargoItems.map(([key, holding]) => {
              const marketState = market.get(key);
              const sellPrice = marketState ? marketState.price : 0; // Or some indication if not sold here
              const unit = getUnit(key);
              return (
                <tr
                  key={key}
                  className={key === selectedCommodityKey ? "selected" : ""}
                >
                  <td>{key}</td>
                  <td>{unit}</td>
                  {/* Show sell price from market */}
                  <td>{sellPrice > 0 ? sellPrice.toFixed(1) : "-"}</td>
                  <td>
                    {holding}
                    {unit}
                  </td>
                </tr>
              );
            })}
            {/* Add filler rows if needed */}
            {cargoItems.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "#aaaaaa",
                  }}
                >
                  Cargo hold empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="market-footer">
        {/* Placeholder for potential future info like profit margin */}
        <span>Selected: {selectedCommodityKey ?? "None"}</span>
      </div>
    </div>
  );
};

export default SellCargoScreen;
