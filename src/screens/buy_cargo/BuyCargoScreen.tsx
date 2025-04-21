/* src/features/buy_cargo/BuyCargoScreen.tsx */
import React from "react";
import { useBuyCargoLogic } from "@/screens/buy_cargo/useBuyCargoLogic";
import { usePlayerState } from "@/hooks/usePlayerState";
import { getCommodityUnit } from "@/classes/Market";
import "../../components/App.css";
import "./Market.css";

const BuyCargoScreen: React.FC = () => {
  const {
    market,
    selectedCommodityKey,
    quantityInput,
    isEnteringQuantity,
    handleItemClick,
    cargoSpaceLeft,
  } = useBuyCargoLogic();
  const { cash } = usePlayerState();

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
        Use Up/Down keys or click to select item. Press 'B' to buy multiple.
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
                onClick={() => handleItemClick(commodityKey)}
              >
                <td>{commodityKey}</td>
                <td>{getCommodityUnit(commodityKey)}</td>
                <td>{state.price.toFixed(1)}</td>
                <td>
                  {state.quantity > 0
                    ? `${state.quantity}${getCommodityUnit(commodityKey)}`
                    : "-"}
                </td>
              </tr>
            ))}
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
