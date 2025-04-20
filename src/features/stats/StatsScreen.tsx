import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import "@/components/App.css";
import { useStatsLogic } from "@/features/stats/useStatsLogic";
import { usePlayerState } from "@/features/common/usePlayerState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos";

const StatsScreen: React.FC = () => {
  useStatsLogic();
  // Get player data from the hook
  const {
    cash,
    fuel,
    legalStatus,
    rating,
    shipEquipment,
    missiles,
    // currentSystem, // Managed by usePlanetInfos
  } = usePlayerState();
  const { currentPlanetName } = usePlanetInfos(); // Get current system name

  // Convert Set to Array for rendering equipment
  const equipmentList = Array.from(shipEquipment);

  // Filter out missiles from general equipment list if counted separately
  const generalEquipment = equipmentList.filter(
    (item) => !item.toLowerCase().includes("missile")
  );

  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>
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
          <strong>Fuel:</strong> {fuel.toFixed(1)} Light Years
        </p>{" "}
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
      </div>
      {/* Render BottomHud without props */}
      <BottomHud />
    </>
  );
};

export default StatsScreen;
