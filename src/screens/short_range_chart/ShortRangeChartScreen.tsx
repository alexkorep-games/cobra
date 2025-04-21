import React, { useRef, useEffect, useState } from "react";
import { Coordinates, calculateDistance } from "@/classes/PlanetInfo";
import { usePlanetInfos } from "../../hooks/usePlanetInfos";
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

  const targetCircleDiameter = minChartDrawableDimension;
  const effectiveScale =
    JUMP_RANGE > 0 ? targetCircleDiameter / (JUMP_RANGE * 2) : 1;

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
    const pixelOffsetY = -dy * effectiveScale;

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
                {/* Jump Range Circle */}
                <div
                  className="chart-range-circle"
                  style={{
                    width: `${targetCircleDiameter}px`,
                    height: `${targetCircleDiameter}px`,
                  }}
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
                    // No transform needed here, label itself is positioned absolutely below
                    cursor: "pointer", // Make it look clickable
                  }}
                  title={`Current Location: ${currentPlanet.name} (Click to view info)`} // Add tooltip
                >
                  <span className="planet-label">{currentPlanet.name}</span>
                  <div
                    className="planet-dot"
                    style={{
                      position: "absolute",
                      left: "0px", // Position relative to the centered parent div
                      top: "0px", // Position relative to the centered parent div
                      transform: "translate(-50%, -50%)", // Center the dot itself
                      backgroundColor: "#00ff00", // Make it green like reachable ones maybe?
                    }}
                  ></div>
                </div>

                {/* Other Planet Markers */}
                {allDisplayPlanets.map(({ planet, distance }) => {
                  const isInRange = distance <= JUMP_RANGE;
                  const isSelected = planet.name === selectedPlanetName;
                  const posPx = getChartPositionPx(planet.coordinates);

                  if (!posPx) return null;

                  return (
                    <div
                      key={planet.name}
                      className={`planet-marker ${
                        isInRange ? "in-range" : "out-range"
                      } ${isSelected ? "selected" : ""}`}
                      style={{
                        position: "absolute",
                        left: `${posPx.left}px`,
                        top: `${posPx.top}px`,
                      }}
                      onClick={() => {
                        if (isInRange) {
                          console.log(`Clicked planet: ${planet.name}`);
                          setSelectedPlanetName(planet.name);
                          // *** OPTIONAL: Navigate directly on click for *other* planets too? Or require Enter? ***
                          // setGameState('planet_info'); // Uncomment if you want direct navigation for all clicks
                        } else {
                          console.log(
                            `${planet.name} is out of range. Distance:`,
                            distance.toFixed(2)
                          );
                        }
                      }}
                      title={`${planet.name}${
                        !isInRange
                          ? ` (Out of range: ${distance.toFixed(1)} LY)`
                          : ` (${distance.toFixed(1)} LY)`
                      }`}
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
          <span>Fuel: {JUMP_RANGE.toFixed(1)} LY</span>
        </div>
      </div>
    </>
  );
};

export default ShortRangeChartScreen;
