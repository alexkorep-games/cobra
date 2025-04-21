import React from "react";
import "@/components/App.css";
import "../../components/hud/BottomToolbar.css"; // Import CSS for button styling
import { useStatsLogic } from "@/screens/stats/useStatsLogic";
import { usePlayerState } from "@/hooks/usePlayerState";
import { usePlanetInfos } from "@/hooks/usePlanetInfos";
import { useGameState } from "@/hooks/useGameState"; // <-- Import useGameState

const FUEL_COST_PER_LY = 10; // Example cost: 10 Credits per Light Year

const StatsScreen: React.FC = () => {
  useStatsLogic();
  const { setGameState } = useGameState(); // <-- Get setGameState
  // Get player data from the hook
  const {
    cash,
    setCash, // Need setter
    fuel,
    maxFuel, // Need max fuel
    setFuelLevel, // Need setter
    legalStatus,
    rating,
    shipEquipment,
    missiles,
    // currentSystem, // Managed by usePlanetInfos
  } = usePlayerState();
  const { currentPlanetName } = usePlanetInfos(); // Get current system name

  // --- Fuel Purchase Logic ---
  const fuelNeeded = maxFuel - fuel;
  const fuelToBuy = Math.max(0, fuelNeeded); // Don't buy negative fuel
  const totalCost = fuelToBuy * FUEL_COST_PER_LY;
  const canAffordFuel = cash >= totalCost;
  const needsFuel = fuelToBuy > 0.01; // Use a small tolerance for floating point
  const canBuyFuel = needsFuel && canAffordFuel;

  const handleBuyFuel = () => {
    if (!canBuyFuel) {
      console.warn("Cannot buy fuel - either full or cannot afford.");
      // TODO: Add sound/visual feedback
      return;
    }
    console.log(
      `Buying ${fuelToBuy.toFixed(1)} LY fuel for ${totalCost.toFixed(
        1
      )} Credits.`
    );
    setFuelLevel(maxFuel); // Fill the tank
    setCash(cash - totalCost); // Deduct cost
    // TODO: Add sound/visual feedback for purchase success
  };

  // --- Undock Logic ---
  const handleUndock = () => {
    console.log("Undocking initiated...");
    setGameState("undocking"); // <-- Change state to undocking
  };

  // Convert Set to Array for rendering equipment
  const equipmentList = Array.from(shipEquipment);

  // Filter out missiles from general equipment list if counted separately
  const generalEquipment = equipmentList.filter(
    (item) => !item.toLowerCase().includes("missile")
  );

  return (
    <>
      {/* <div className="top-bar"> */}
      {/* Title is often handled by the App layout, might not be needed here */}
      {/* </div> */}
      <div id="stats-screen" className="center-text small">
        <h2>COMMANDER JAMESON</h2>
        {/* Use data from usePlayerState and usePlanetInfos */}
        <p>
          <strong>System:</strong> {currentPlanetName || "UNKNOWN"}
        </p>{" "}
        <p>
          <strong>Hypersystem:</strong> {currentPlanetName || "UNKNOWN"}{" "}
          {/* Assuming same for now */}
        </p>{" "}
        <p>
          <strong>Fuel:</strong> {fuel.toFixed(1)} / {maxFuel.toFixed(1)} Light
          Years
        </p>{" "}
        {/* --- Add Fuel Button --- */}
        <div style={{ margin: "10px 0" }}>
          {" "}
          {/* Add some spacing */}
          <button
            className={`toolbar-button ${!canBuyFuel ? "disabled" : ""}`}
            onClick={handleBuyFuel}
            disabled={!canBuyFuel}
            style={{ minWidth: "120px" }} // Adjust size as needed
            title={
              !needsFuel
                ? "Fuel tank full"
                : !canAffordFuel
                ? `Insufficient funds (Need ${totalCost.toFixed(1)} Cr)`
                : `Buy fuel (${totalCost.toFixed(1)} Cr)`
            }
          >
            BUY FUEL {needsFuel ? `(${totalCost.toFixed(1)} Cr)` : ""}
          </button>
        </div>
        {/* --- End Fuel Button --- */}
        <p>
          <strong>Cash:</strong> {cash.toFixed(1)} Credits
        </p>{" "}
        <p>
          <strong>Legal Status:</strong> {legalStatus}
        </p>{" "}
        <p>
          <strong>Rating:</strong> {rating}
        </p>{" "}
        <p className="equipment">
          <strong>EQUIPMENT:</strong>
        </p>{" "}
        {/* Render equipment list */}
        {missiles > 0 && <p>Missile ({missiles})</p>}
        {generalEquipment.map((item) => (
          <p key={item}>{item}</p>
        ))}
        {/* --- Add Undock Button --- */}
        <div style={{ marginTop: "20px" }}>
          <button
            className={`toolbar-button`} // Always enabled when docked
            onClick={handleUndock}
            style={{ minWidth: "120px" }} // Adjust size as needed
            title="Undock from station and launch into space"
          >
            UNDOCK
          </button>
        </div>
        {/* --- End Undock Button --- */}
      </div>
    </>
  );
};

export default StatsScreen;
