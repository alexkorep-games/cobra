import React, { useRef, useEffect, useState } from "react";
import { Coordinates, calculateDistance } from "@/classes/PlanetInfo";
import { usePlanetInfos } from "../../hooks/usePlanetInfos";
import { usePlayerState } from "../../hooks/usePlayerState"; // *** Import player state hook ***
import { JUMP_RANGE } from "@/constants";
import "./ShortRangeChart.css"; // Import your CSS file
import { useShortRangeChartLogic } from "./useShortRangeChartLogic"; // *** Import the logic hook ***

const CHART_PADDING = 30;

const ShortRangeChartScreen: React.FC = () => {
  const {
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
    getCurrentPlanet,
  } = usePlanetInfos();
  const { fuel } = usePlayerState(); // *** Get current fuel level ***
  useShortRangeChartLogic();

  const chartAreaRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });

  const currentPlanet = getCurrentPlanet();

  useEffect(() => {
    const updateSize = () => {
      if (chartAreaRef.current) {
        const rect = chartAreaRef.current.getBoundingClientRect();
        setChartSize({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const chartDrawableWidth = Math.max(1, chartSize.width - CHART_PADDING * 2);
  const chartDrawableHeight = Math.max(1, chartSize.height - CHART_PADDING * 2);
  const minChartDrawableDimension = Math.min(
    chartDrawableWidth,
    chartDrawableHeight
  );

  const maxJumpRangeCircleDiameter = minChartDrawableDimension;
  const effectiveScale =
    JUMP_RANGE > 0 ? maxJumpRangeCircleDiameter / (JUMP_RANGE * 2) : 1;

  // Calculate the diameter for the *current fuel* range circle
  const currentFuelRangeCircleDiameter = Math.max(0, fuel * effectiveScale * 2);

  const getChartPositionPx = (
    planetCoords: Coordinates
  ): { left: number; top: number } | null => {
    if (
      !currentPlanet ||
      chartSize.width <= 0 ||
      chartSize.height <= 0 ||
      effectiveScale <= 0
    ) {
      return null;
    }

    const chartCenterX = chartSize.width / 2;
    const chartCenterY = chartSize.height / 2;

    const dx = planetCoords.x - currentPlanet.coordinates.x;
    const dy = planetCoords.y - currentPlanet.coordinates.y;

    const pixelOffsetX = dx * effectiveScale;
    const pixelOffsetY = -dy * effectiveScale; // Invert Y for screen coords

    const finalPosX = chartCenterX + pixelOffsetX;
    const finalPosY = chartCenterY + pixelOffsetY;

    return { left: finalPosX, top: finalPosY };
  };

  if (!currentPlanet) {
    return (
      <div>
        Error: Current planet '{currentPlanetName}' not found or loading...
      </div>
    );
  }

  const sortedPlanets = planetInfos
    .filter((p) => p.name !== currentPlanet.name)
    .map((p) => ({
      planet: p,
      distance: calculateDistance(currentPlanet.coordinates, p.coordinates),
    }))
    .sort((a, b) => a.distance - b.distance);

  const allDisplayPlanets = sortedPlanets;

  return (
    <>
      <div className="short-range-chart-container">
        <div className="chart-title">SHORT RANGE CHART</div>
        <div
          className="chart-area"
          ref={chartAreaRef}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          {chartSize.width > 0 &&
            chartSize.height > 0 &&
            currentPlanet &&
            effectiveScale > 0 && (
              <>
                {/* Max Jump Range Circle (Dashed Green) */}
                <div
                  className="chart-range-circle max-jump-range"
                  style={{
                    width: `${maxJumpRangeCircleDiameter}px`,
                    height: `${maxJumpRangeCircleDiameter}px`,
                  }}
                  title={`Max Ship Range: ${JUMP_RANGE.toFixed(1)} LY`}
                ></div>

                {/* *** Current Fuel Range Circle (Solid White) *** */}
                <div
                  className="chart-range-circle current-fuel-range"
                  style={{
                    width: `${currentFuelRangeCircleDiameter}px`,
                    height: `${currentFuelRangeCircleDiameter}px`,
                  }}
                  title={`Current Fuel Range: ${fuel.toFixed(1)} LY`}
                ></div>

                {/* Current Location Crosshair (centered) */}
                <div className="chart-crosshair"></div>

                {/* Current Planet Marker Label */}
                <div
                  onClick={() => {
                    if (currentPlanet) {
                      console.log(
                        `Clicked current planet: ${currentPlanet.name}`
                      );
                      setSelectedPlanetName(currentPlanet.name);
                    }
                  }}
                  className={`planet-marker current-location ${
                    currentPlanet.name === selectedPlanetName ? "selected" : ""
                  }`}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    cursor: "pointer", // Make it look clickable
                  }}
                  title={`Current Location: ${currentPlanet.name} (Click to view info)`} // Add tooltip
                >
                  <span className="planet-label">{currentPlanet.name}</span>
                  {/* Centered dot representing the current location */}
                  <div
                    className="planet-dot"
                    style={{
                      position: "absolute",
                      left: "0px", // Relative to parent div center
                      top: "0px", // Relative to parent div center
                      transform: "translate(-50%, -50%)", // Center the dot itself
                      backgroundColor: "#00ff00", // Green like reachable planets
                    }}
                  ></div>
                </div>

                {/* Other Planet Markers */}
                {allDisplayPlanets.map(({ planet, distance }) => {
                  // A planet is reachable if it's within the ship's max range AND current fuel
                  const isInRange = distance <= JUMP_RANGE && distance <= fuel;
                  const isOutOfFuel = distance <= JUMP_RANGE && distance > fuel;
                  const isSelected = planet.name === selectedPlanetName;
                  const posPx = getChartPositionPx(planet.coordinates);

                  if (!posPx) return null;

                  // Determine CSS class based on reachability
                  let rangeClass = "out-range"; // Default: completely out of range
                  if (isOutOfFuel) {
                    rangeClass = "out-fuel"; // Within ship range, but not enough fuel
                  } else if (isInRange) {
                    rangeClass = "in-range"; // Reachable
                  }

                  // Determine cursor style
                  const cursorStyle = isInRange ? "pointer" : "not-allowed";

                  // Determine title text
                  let titleText = `${planet.name} (${distance.toFixed(1)} LY)`;
                  if (!isInRange && !isOutOfFuel) {
                    titleText += ` (Out of Range)`;
                  } else if (isOutOfFuel) {
                    titleText += ` (Insufficient Fuel)`;
                  }

                  return (
                    <div
                      key={planet.name}
                      className={`planet-marker ${rangeClass} ${
                        isSelected ? "selected" : ""
                      }`}
                      style={{
                        position: "absolute",
                        left: `${posPx.left}px`,
                        top: `${posPx.top}px`,
                        cursor: cursorStyle,
                      }}
                      onClick={() => {
                        if (isInRange) {
                          console.log(`Clicked planet: ${planet.name}`);
                          setSelectedPlanetName(planet.name);
                        } else {
                          console.log(
                            `${
                              planet.name
                            } is unreachable. Distance: ${distance.toFixed(
                              1
                            )} LY, Fuel: ${fuel.toFixed(1)} LY`
                          );
                          // Optionally provide feedback why it's unreachable
                        }
                      }}
                      title={titleText}
                    >
                      <div className="planet-dot"></div>
                      <span className="planet-label">{planet.name}</span>
                    </div>
                  );
                })}
              </>
            )}
          {/* Loading / Initializing State */}
          {(chartSize.width <= 0 ||
            chartSize.height <= 0 ||
            !currentPlanet ||
            effectiveScale <= 0) && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "grey",
              }}
            >
              Initializing Chart...
            </div>
          )}
        </div>
        <div className="chart-info-bar">
          <span>Current System: {currentPlanet?.name ?? "N/A"}</span>
          <span>Target: {selectedPlanetName ?? "NONE"}</span>
          {/* Show current fuel level */}
          <span>Fuel: {fuel.toFixed(1)} LY</span>
        </div>
      </div>
    </>
  );
};

export default ShortRangeChartScreen;
