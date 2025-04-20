/* src/features/buy_cargo/BuyCargoScreen.tsx */
import React from "react";
import { useBuyCargoLogic } from "@/features/buy_cargo/useBuyCargoLogic";
import { usePlayerState } from "@/features/common/usePlayerState";
import { COMMODITIES } from "@/classes/Market"; // To get units easily
import "../../components/App.css";
import "./Market.css";

const BuyCargoScreen: React.FC = () => {
  const {
    market,
    selectedCommodityKey,
    quantityInput,
    isEnteringQuantity,
    cargoSpaceLeft,
  } = useBuyCargoLogic();
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
      <div className="market-container buy-screen">
        <div className="market-title">BUY CARGO</div>
        <div className="market-loading">Market data unavailable...</div>
      </div>
    );
  }

  return (
    <div className="market-container buy-screen">
      <div className="market-header">
        <div className="market-title">BUY CARGO</div>
        <div className="market-credits">{cash.toFixed(1)} Credits</div>
      </div>
      <div className="market-instructions">
        Use Up/Down keys or device to select item. Press 'B' to buy the item.
        <br />
        Press 'S' to switch to Sell Screen, ESC to exit market.
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
            {Array.from(market.entries()).map(([commodityKey, state]) => (
              <tr
                key={commodityKey}
                className={
                  commodityKey === selectedCommodityKey ? "selected" : ""
                }
              >
                <td>{commodityKey}</td>
                <td>{getUnit(commodityKey)}</td>
                <td>{state.price.toFixed(1)}</td>
                <td>
                  {state.quantity > 0
                    ? `${state.quantity}${getUnit(commodityKey)}`
                    : "-"}
                </td>
              </tr>
            ))}
            {/* Add filler rows if needed */}
          </tbody>
        </table>
      </div>
      <div className="market-footer">
        <span>Cargo Space: {cargoSpaceLeft}t</span>
        {isEnteringQuantity && (
          <div className="quantity-prompt">
            Quantity? <span className="quantity-input">{quantityInput}</span>
          </div>
        )}
        {!isEnteringQuantity &&
          selectedCommodityKey &&
          market.get(selectedCommodityKey)?.quantity === 0 && (
            <div className="quantity-prompt" style={{ color: "#ff0000" }}>
              OUT OF STOCK
            </div>
          )}
        {!isEnteringQuantity &&
          selectedCommodityKey &&
          market.get(selectedCommodityKey)?.quantity !== 0 &&
          cargoSpaceLeft <= 0 && (
            <div className="quantity-prompt" style={{ color: "#ff0000" }}>
              CARGO HOLD FULL
            </div>
          )}
      </div>
    </div>
  );
};

export default BuyCargoScreen;
