import React, { useRef, useEffect, useState } from "react";
import { Coordinates, calculateDistance } from "@/classes/PlanetInfo";
import BottomHud from "@/components/hud/BottomHud";
import { useShortRangeChartLogic } from "./useShortRangeChartLogic"; // Import hook
import { usePlanetInfos } from "../common/usePlanetInfos"; // Import shared state hook
import { JUMP_RANGE } from "@/constants"; // Import jump range

// Chart dimensions and scaling
const CHART_PADDING = 30; // Px padding inside the chart area
const MAX_COORD = 500; // Match the generation range in PlanetInfo.ts for scaling

const ShortRangeChartScreen: React.FC = () => {
  // Call the hook to manage logic and selection state
  const { reachablePlanets, selectedIndexInReachable, handleKeyDown } =
    useShortRangeChartLogic();

  // Get data from shared state hook
  const {
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
    getCurrentPlanet,
  } = usePlanetInfos();

  const chartAreaRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  const currentPlanet = getCurrentPlanet();

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

  // Add keydown listener managed by the hook
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!currentPlanet) {
    return (
      <div>
        Error: Current planet '{currentPlanetName}' not found or loading...
      </div>
    );
  }

  // Calculate scaling factors
  const availableWidth = chartSize.width - CHART_PADDING * 2;
  const availableHeight = chartSize.height - CHART_PADDING * 2;
  const scaleX = availableWidth / (MAX_COORD * 2);
  const scaleY = availableHeight / (MAX_COORD * 2);
  const scale = Math.min(scaleX, scaleY);
  const circleDiameter = JUMP_RANGE * 2 * scale;

  // Function to convert planet coordinates to chart position (percentage)
  const getChartPosition = (
    planetCoords: Coordinates
  ): { left: string; top: string } => {
    const chartCenterX = chartSize.width / 2;
    const chartCenterY = chartSize.height / 2;
    const dx = planetCoords.x - currentPlanet.coordinates.x;
    const dy = planetCoords.y - currentPlanet.coordinates.y;
    const posX = chartCenterX + dx * scale;
    const posY = chartCenterY - dy * scale;
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

  // Get all planets excluding current, calculate distance, sort
  const sortedPlanets = planetInfos
    .filter((p) => p.name !== currentPlanet.name)
    .map((p) => ({
      planet: p,
      distance: calculateDistance(currentPlanet.coordinates, p.coordinates),
    }))
    .sort((a, b) => a.distance - b.distance);

  // Separate into reachable and unreachable based on distance
  const displayReachablePlanets = sortedPlanets.filter(
    (pd) => pd.distance <= JUMP_RANGE
  );
  const displayUnreachablePlanets = sortedPlanets.filter(
    (pd) => pd.distance > JUMP_RANGE
  );

  return (
    <>
      <div className="short-range-chart-container">
        <div className="chart-title">SHORT RANGE CHART</div>
        <div className="chart-area" ref={chartAreaRef}>
          {chartSize.width > 0 && currentPlanet && (
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
                style={{ left: "50%", top: "50%" }}
              >
                <span
                  className="planet-label"
                  style={{ marginLeft: "15px", color: "#00ff00" }}
                >
                  {currentPlanet.name}
                </span>
              </div>

              {/* Planet Markers */}
              {displayReachablePlanets
                .concat(displayUnreachablePlanets)
                .map(({ planet, distance }) => {
                  const isInRange = distance <= JUMP_RANGE;
                  const isSelected = planet.name === selectedPlanetName; // Check against shared state
                  const pos = getChartPosition(planet.coordinates);

                  return (
                    <div
                      key={planet.name}
                      className={`planet-marker ${
                        isInRange ? "in-range" : "out-range"
                      } ${isSelected ? "selected" : ""}`}
                      style={{ left: pos.left, top: pos.top }}
                      onClick={() => {
                        // Only allow clicking reachable planets
                        if (isInRange) {
                          setSelectedPlanetName(planet.name); // Update shared state
                          // Optional: Immediately switch to planet info on click?
                          // handleKeyDown({ key: 'Enter' } as KeyboardEvent); // Simulate Enter press
                        } else {
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
          <span>Fuel: {JUMP_RANGE.toFixed(1)} LY</span>
        </div>
      </div>
      {/* Render BottomHud without props */}
      <BottomHud />
    </>
  );
};

export default ShortRangeChartScreen;
