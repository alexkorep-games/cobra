// src/screens/target_planet_prices/TargetPlanetPricesScreen.tsx
import React from "react";
import { useTargetPlanetPricesLogic } from "./useTargetPlanetPricesLogic";
import { getCommodityUnit } from "@/classes/Market";
import "../../components/App.css"; // Common styles
import "../buy_cargo/Market.css"; // Reuse market table styles
import "../../components/hud/BottomToolbar.css";

const TargetPlanetPricesScreen: React.FC = () => {
  const { targetMarket, planetName, handleReturnToInfo } =
    useTargetPlanetPricesLogic();

  if (!targetMarket) {
    return (
      <div
        id="target-prices-screen"
        className="market-container"
        style={{ borderColor: "#00ffff" /* Cyan border */ }}
      >
        <div className="market-title">
          MARKET PRICES AT {planetName.toUpperCase()}
        </div>
        <div className="market-loading">Loading market data...</div>
        <div className="market-footer" style={{ justifyContent: "center" }}>
          Press ESC, N, I or click Return
        </div>
      </div>
    );
  }

  // Convert map entries to an array and sort alphabetically by key
  const sortedMarketEntries = Array.from(targetMarket.entries()).sort(
    ([keyA], [keyB]) => keyA.localeCompare(keyB)
  );

  return (
    // Add an ID for CSS targeting if needed
    <div
      id="target-prices-screen"
      className="market-container"
      style={{
        borderColor: "#00ffff",
        backgroundColor: "rgba(0, 50, 50, 0.8)" /* Dark Cyan */,
      }}
    >
      <div className="market-header" style={{ borderBottomColor: "#00ffff" }}>
        <div className="market-title" style={{ color: "#00ffff" }}>
          MARKET PRICES AT {planetName.toUpperCase()}
        </div>
        {/* No credits shown here */}
      </div>
      <div className="market-instructions" style={{ color: "#aaaaff" }}>
        Showing potential market prices and quantities. Not live trade data.
      </div>
      <div
        className="market-table-container"
        style={{ borderColor: "#00aaaa" }}
      >
        <table className="market-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>UNIT</th>
              <th>PRICE (Cr)</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {sortedMarketEntries.map(([commodityKey, state]) => (
              <tr key={commodityKey}>
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
            {sortedMarketEntries.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "#aaaaaa",
                  }}
                >
                  No commodities available at this location.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="market-footer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopColor: "#00ffff",
        }}
      >
        <button
          className="toolbar-button"
          onClick={handleReturnToInfo}
          style={{ minWidth: "100px" }}
          title="Return to Planet Information screen"
        >
          RETURN
        </button>
        <span
          style={{ marginLeft: "20px", color: "#ffff00", fontSize: "0.9em" }}
        >
          (ESC, N, I)
        </span>
      </div>
    </div>
  );
};

export default TargetPlanetPricesScreen;
