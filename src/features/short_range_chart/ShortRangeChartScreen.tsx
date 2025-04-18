// src/features/short_range_chart/ShortRangeChartScreen.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  PlanetInfo,
  Coordinates,
  calculateDistance,
} from "../../classes/PlanetInfo";
import BottomHud from "../../components/hud/BottomHud"; // Optional: Show HUD frame?
import "../../components/App.css"; // Use relative path

interface ShortRangeChartScreenProps {
  planets: PlanetInfo[];
  currentPlanetIndex: string; // Changed to index (which is planet name in this case)
  selectedPlanetName: string | null;
  jumpRange: number;
  setSelectedPlanetName: (name: string | null) => void; // Callback to update GameManager
}

// Chart dimensions and scaling
const CHART_PADDING = 30; // Px padding inside the chart area
const MAX_COORD = 500; // Match the generation range in PlanetInfo.ts for scaling

const ShortRangeChartScreen: React.FC<ShortRangeChartScreenProps> = ({
  planets,
  currentPlanetIndex, // This is the name of the current planet
  selectedPlanetName,
  jumpRange,
  setSelectedPlanetName,
}) => {
  const chartAreaRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  const currentPlanetName = currentPlanetIndex; // Alias for clarity
  const currentPlanet = planets.find((p) => p.name === currentPlanetName);

  useEffect(() => {
    const updateSize = () => {
      if (chartAreaRef.current) {
        setChartSize({
          width: chartAreaRef.current.offsetWidth,
          height: chartAreaRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!currentPlanet) {
    return <div>Error: Current planet '{currentPlanetName}' not found.</div>;
  }

  // Calculate scaling factors
  const availableWidth = chartSize.width - CHART_PADDING * 2;
  const availableHeight = chartSize.height - CHART_PADDING * 2;
  // Calculate scale based on the MAX_COORD range (-MAX_COORD to +MAX_COORD => diameter is MAX_COORD*2)
  const scaleX = availableWidth / (MAX_COORD * 2);
  const scaleY = availableHeight / (MAX_COORD * 2);
  const scale = Math.min(scaleX, scaleY); // Use uniform scaling

  // Calculate circle size based on jump range (which is radius) and scale
  const circleDiameter = jumpRange * 2 * scale;

  // Function to convert planet coordinates to chart position (percentage)
  const getChartPosition = (
    planetCoords: Coordinates
  ): { left: string; top: string } => {
    const chartCenterX = chartSize.width / 2;
    const chartCenterY = chartSize.height / 2;

    // Position relative to the *current* planet at the center
    const dx = planetCoords.x - currentPlanet.coordinates.x;
    const dy = planetCoords.y - currentPlanet.coordinates.y;

    const posX = chartCenterX + dx * scale;
    const posY = chartCenterY - dy * scale; // Y is inverted in screen coordinates

    // Clamp to prevent markers going slightly outside due to size/centering
    const clampedX = Math.max(
      CHART_PADDING / 2,
      Math.min(chartSize.width - CHART_PADDING / 2, posX)
    );
    const clampedY = Math.max(
      CHART_PADDING / 2,
      Math.min(chartSize.height - CHART_PADDING / 2, posY)
    );

    // Return percentage values
    return {
      left: `${(clampedX / chartSize.width) * 100}%`,
      top: `${(clampedY / chartSize.height) * 100}%`,
    };
  };

  const sortedPlanets = [...planets] // Create a copy
    .filter((p) => p.name !== currentPlanet.name) // Exclude current
    .map((p) => ({
      planet: p,
      distance: calculateDistance(currentPlanet.coordinates, p.coordinates),
    }))
    .sort((a, b) => a.distance - b.distance); // Sort by distance

  const reachablePlanets = sortedPlanets.filter(
    (pd) => pd.distance <= jumpRange
  );
  const unreachablePlanets = sortedPlanets.filter(
    (pd) => pd.distance > jumpRange
  );

  return (
    <>
      <div className="short-range-chart-container">
        <div className="chart-title">SHORT RANGE CHART</div>
        <div className="chart-area" ref={chartAreaRef}>
          {chartSize.width > 0 && currentPlanet && ( // Ensure currentPlanet is valid
            <>
              {/* Jump Range Circle */}
              <div
                className="chart-range-circle"
                style={{
                  width: `${circleDiameter}px`,
                  height: `${circleDiameter}px`,
                }}
              ></div>

              {/* Current Location Crosshair */}
              <div className="chart-crosshair"></div>
              <div
                className="planet-marker current-location"
                style={{ left: "50%", top: "50%" }} // Always center current location
              >
                {/* Label for current planet */}
                <span
                  className="planet-label"
                  style={{ marginLeft: "15px", color: "#00ff00" }} // Green label, offset from center
                >
                  {currentPlanet.name}
                </span>
              </div>

              {/* Planet Markers - Render Reachable first, then Unreachable */}
              {reachablePlanets.concat(unreachablePlanets).map(({ planet, distance }) => {
                  const isInRange = distance <= jumpRange;
                  const isSelected = planet.name === selectedPlanetName;
                  const pos = getChartPosition(planet.coordinates);

                  // Optional: Skip rendering planets visually too far outside the chart area
                  // This requires checking if pos.left/top are way outside 0-100%
                  // const leftNum = parseFloat(pos.left);
                  // const topNum = parseFloat(pos.top);
                  // if (leftNum < -10 || leftNum > 110 || topNum < -10 || topNum > 110) {
                  //     return null; // Skip rendering far-off planets
                  // }

                  return (
                    <div
                      key={planet.name}
                      className={`planet-marker ${
                        isInRange ? "in-range" : "out-range"
                      } ${isSelected ? "selected" : ""}`}
                      style={{ left: pos.left, top: pos.top }}
                      onClick={() => {
                        if (isInRange) {
                          setSelectedPlanetName(planet.name);
                          // Optional: Immediately switch to planet info on click?
                          // gameManagerRef.current?.switchState("planet_info");
                        } else {
                          // Optionally provide feedback for clicking out-of-range planets
                          console.log(`${planet.name} is out of range.`);
                        }
                      }}
                    >
                      <div className="planet-dot"></div>
                      <span className="planet-label">{planet.name}</span>
                    </div>
                  );
                })}
            </>
          )}
        </div>
        <div className="chart-info-bar">
          <span>Current System: {currentPlanet.name}</span>
          <span>Target: {selectedPlanetName ?? "NONE"}</span>
          <span>Fuel: {jumpRange.toFixed(1)} LY</span>
        </div>
      </div>
      <BottomHud /> {/* Render base HUD */}
    </>
  );
};

export default ShortRangeChartScreen;