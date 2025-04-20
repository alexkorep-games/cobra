import React from "react";
import { getTechLevelNumber, calculateDistance } from "@/classes/PlanetInfo";
import { usePlanetInfoLogic } from "@/screens/planet_info/usePlanetInfoLogic";
import { usePlanetInfos } from "@/hooks/usePlanetInfos"; // Import shared state hook
import { usePlayerState } from "@/hooks/usePlayerState"; // Need fuel for validation
import { JUMP_RANGE } from "@/constants"; // Need jump range constant
import "../../components/hud/BottomToolbar.css"; // Reuse button styles

const PlanetInfoScreen: React.FC = () => {
  // Call the hook to get the jump handler function
  const { handleJumpAction } = usePlanetInfoLogic();

  // Get planet data from the shared state hook
  const { getCurrentPlanet, getSelectedPlanet } = usePlanetInfos();
  const { fuel } = usePlayerState(); // Get player's current fuel

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
      </>
    );
  }

  // Calculate distance (only if currentPlanet is also available)
  const distance =
    currentPlanet && selectedPlanet
      ? calculateDistance(currentPlanet.coordinates, selectedPlanet.coordinates)
      : Infinity; // Treat as infinite if planets are missing

  const canJump = distance <= JUMP_RANGE && fuel >= distance;

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
          <span
            className="planet-info-value"
            style={{
              color:
                distance > JUMP_RANGE
                  ? "#ff8888"
                  : fuel < distance
                  ? "#ff8888"
                  : "#00ffff",
            }}
          >
            {distance === Infinity ? "N/A" : distance.toFixed(1)} Light Years
            {distance > JUMP_RANGE && " (Out of Range)"}
            {distance <= JUMP_RANGE &&
              fuel < distance &&
              " (Insufficient Fuel)"}
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

        {/* --- Action Bar --- */}
        <div
          className="planet-info-actions"
          style={{
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "1px dashed #00aaaa",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button
            className={`toolbar-button ${!canJump ? "disabled" : ""}`} // Use toolbar style, maybe add 'disabled' style
            onClick={handleJumpAction}
            disabled={!canJump}
            style={{ minWidth: "100px" }} // Adjust width
            title={
              !canJump
                ? distance > JUMP_RANGE
                  ? "Target out of range"
                  : "Insufficient fuel"
                : `Jump to ${selectedPlanet.name}`
            }
          >
            JUMP
          </button>
        </div>

        {/* Updated Prompt */}
        <div className="planet-info-prompt">
          Press ESC or N to return to chart
        </div>
      </div>
    </>
  );
};

export default PlanetInfoScreen;
