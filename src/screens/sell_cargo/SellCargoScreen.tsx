/* src/features/sell_cargo/SellCargoScreen.tsx */
import React from "react";
import { useSellCargoLogic } from "@/screens/sell_cargo/useSellCargoLogic";
import { usePlayerState } from "@/hooks/usePlayerState";
import { getCommodityUnit } from "@/classes/Market";
import "../../components/App.css";
import "../buy_cargo/Market.css"; // Reuse market styles

const SellCargoScreen: React.FC = () => {
  const {
    market,
    cargoItems, // Get items directly from the hook
    handleItemClick,
    selectedCommodityKey,
    // Add quantity input/state if partial selling is implemented
  } = useSellCargoLogic();
  const { cash } = usePlayerState();

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
        Use Up/Down keys or click to select item. Press 'S' to sell all.
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
              const unit = getCommodityUnit(key);
              return (
                <tr
                  key={key}
                  className={key === selectedCommodityKey ? "selected" : ""}
                  onClick={() => handleItemClick(key)}
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
