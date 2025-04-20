import React from "react";
import { getTechLevelNumber, calculateDistance } from "@/classes/PlanetInfo";
import BottomHud from "@/components/hud/BottomHud";
import { usePlanetInfoLogic } from "@/screens/planet_info/usePlanetInfoLogic"; // Import the hook
import { usePlanetInfos } from "@/hooks/usePlanetInfos"; // Import shared state hook

const PlanetInfoScreen: React.FC = () => {
  // Call the hook to handle logic and state transitions
  usePlanetInfoLogic();

  // Get planet data from the shared state hook
  const { getCurrentPlanet, getSelectedPlanet } = usePlanetInfos();

  const currentPlanet = getCurrentPlanet();
  const selectedPlanet = getSelectedPlanet();

  if (!selectedPlanet) {
    // Hook should ideally handle redirecting if no planet selected,
    // but add a fallback UI just in case.
    return (
      <>
        <div className="planet-info-container">
          <div className="planet-info-title">ERROR</div>
          <p style={{ textAlign: "center", color: "#ff0000" }}>
            No planet selected or data unavailable.
          </p>
          <div className="planet-info-prompt">
            Press ESC or N to return to chart
          </div>
        </div>
        <BottomHud />
      </>
    );
  }

  // Calculate distance (only if currentPlanet is also available)
  const distance = currentPlanet
    ? calculateDistance(currentPlanet.coordinates, selectedPlanet.coordinates)
    : 0; // Or show 'N/A' if current planet isn't loaded yet?

  // Format population nicely
  const formatPopulation = (popMillions: number): string => {
    if (popMillions >= 1000) {
      return `${(popMillions / 1000).toFixed(1)} Billion`;
    }
    return `${popMillions} Million`;
  };

  return (
    <>
      <div className="planet-info-container">
        <div className="planet-info-title">
          DATA ON {selectedPlanet.name.toUpperCase()}
        </div>

        <div className="planet-info-grid">
          <span className="planet-info-label">Distance:</span>
          <span className="planet-info-value">
            {distance.toFixed(1)} Light Years
          </span>

          <span className="planet-info-label">Economy:</span>
          <span className="planet-info-value">
            {selectedPlanet.economyType}
          </span>

          <span className="planet-info-label">Government:</span>
          <span className="planet-info-value">
            {selectedPlanet.governmentType}
          </span>

          <span className="planet-info-label">Tech. Level:</span>
          <span className="planet-info-value">
            {getTechLevelNumber(selectedPlanet.techLevel)}
          </span>

          <span className="planet-info-label">Population:</span>
          <span className="planet-info-value">
            {formatPopulation(selectedPlanet.population)}
          </span>

          <span className="planet-info-label">Productivity:</span>
          <span className="planet-info-value">
            {selectedPlanet.productivity.toLocaleString()} M CR
          </span>

          <span className="planet-info-label">Radius (Av):</span>
          <span className="planet-info-value">
            {selectedPlanet.radius.toLocaleString()} km
          </span>
        </div>

        <div className="planet-info-description">
          {selectedPlanet.description}
        </div>
        <div className="planet-info-prompt">
          Press J to Jump, ESC or N to return to chart
        </div>
      </div>
      {/* Render BottomHud without props */}
      <BottomHud />
    </>
  );
};

export default PlanetInfoScreen;
