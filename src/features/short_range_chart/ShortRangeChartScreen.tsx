// src/features/short_range_chart/ShortRangeChartScreen.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  PlanetInfo,
  Coordinates,
  calculateDistance,
} from "../../classes/PlanetInfo";
import BottomHud from "../../components/hud/BottomHud"; // Optional: Show HUD frame?
import "../../components/App.css"; // Import shared styles

interface ShortRangeChartScreenProps {
  planets: PlanetInfo[];
  currentPlanetName: string;
  selectedPlanetName: string | null;
  jumpRange: number;
  setSelectedPlanetName: (name: string | null) => void; // Callback to update GameManager
}

// Chart dimensions and scaling
const CHART_PADDING = 20; // Px padding inside the chart area
const MAX_COORD = 50; // Match the generation range in PlanetInfo.ts for scaling

const ShortRangeChartScreen: React.FC<ShortRangeChartScreenProps> = ({
  planets,
  currentPlanetName,
  selectedPlanetName,
  jumpRange,
  setSelectedPlanetName,
}) => {
  const chartAreaRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

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
    return <div>Error: Current planet {currentPlanetName} not found.</div>;
  }

  // Calculate scaling factors
  const availableWidth = chartSize.width - CHART_PADDING * 2;
  const availableHeight = chartSize.height - CHART_PADDING * 2;
  const scaleX = availableWidth / (MAX_COORD * 2); // Range is -MAX_COORD to +MAX_COORD
  const scaleY = availableHeight / (MAX_COORD * 2);
  const scale = Math.min(scaleX, scaleY); // Use uniform scaling

  // Calculate circle size based on jump range and scale
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
          {chartSize.width > 0 && (
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
                {/* No dot needed, just label */}
                <span
                  className="planet-label"
                  style={{ marginLeft: "15px", color: "#00ff00" }}
                >
                  {currentPlanet.name}
                </span>
              </div>

              {/* Planet Markers */}
              {planets
                .filter((p) => p.name !== currentPlanet.name)
                .map((planet) => {
                  const distance = calculateDistance(
                    currentPlanet.coordinates,
                    planet.coordinates
                  );
                  const isInRange = distance <= jumpRange;
                  const isSelected = planet.name === selectedPlanetName;
                  const pos = getChartPosition(planet.coordinates);

                  // Only render if within the visual bounds (approx)
                  const dxAbs = Math.abs(
                    planet.coordinates.x - currentPlanet.coordinates.x
                  );
                  const dyAbs = Math.abs(
                    planet.coordinates.y - currentPlanet.coordinates.y
                  );
                  if (
                    dxAbs * scale > chartSize.width / 2 + 20 ||
                    dyAbs * scale > chartSize.height / 2 + 20
                  ) {
                    // return null; // Skip planets too far outside the view
                  }

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
          <span>Selected: {selectedPlanetName ?? "None"}</span>
          <span>Fuel: {jumpRange.toFixed(1)} LY</span>
        </div>
      </div>
      <BottomHud />
    </>
  );
};

export default ShortRangeChartScreen;
