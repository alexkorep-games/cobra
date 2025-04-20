import React, { useRef, useEffect, useState } from "react";
import { Coordinates, calculateDistance } from "@/classes/PlanetInfo";
import { useShortRangeChartLogic } from "./useShortRangeChartLogic";
import { usePlanetInfos } from "../../hooks/usePlanetInfos";
import { JUMP_RANGE } from "@/constants";

const CHART_PADDING = 30;

const ShortRangeChartScreen: React.FC = () => {
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
    let resizeTimer: NodeJS.Timeout;
    const debouncedUpdateSize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSize, 50); // Short debounce
    };

    updateSize();
    window.addEventListener("resize", debouncedUpdateSize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedUpdateSize);
    };
  }, []);

  const minChartDimension = Math.min(chartSize.width, chartSize.height);
  const validMinDimension = Math.max(1, minChartDimension);
  const targetCircleDiameter = validMinDimension / 2;
  const effectiveScale =
    JUMP_RANGE > 0 ? targetCircleDiameter / (JUMP_RANGE * 2) : 1;

  // Function to convert planet coordinates to chart position (PIXELS)
  const getChartPositionPx = (
    planetCoords: Coordinates
  ): { left: number; top: number } | null => {
    // Return null if invalid
    if (
      !currentPlanet ||
      chartSize.width <= 0 ||
      chartSize.height <= 0 ||
      effectiveScale <= 0
    ) {
      return null; // Indicate invalid position
    }

    const chartCenterX = chartSize.width / 2;
    const chartCenterY = chartSize.height / 2;
    const dx = planetCoords.x - currentPlanet.coordinates.x;
    const dy = planetCoords.y - currentPlanet.coordinates.y;
    const pixelOffsetX = dx * effectiveScale;
    const pixelOffsetY = -dy * effectiveScale; // Y screen coordinate is inverted from cartesian Y

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
        <div
          className="chart-area"
          ref={chartAreaRef}
          style={{ position: "relative", overflow: "hidden" }}
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
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${targetCircleDiameter}px`,
                    height: `${targetCircleDiameter}px`,
                    transform: "translate(-50%, -50%)",
                    border: "1px dashed rgba(0, 255, 0, 0.5)",
                    borderRadius: "50%",
                    boxSizing: "border-box",
                    pointerEvents: "none",
                  }}
                ></div>

                {/* Current Location Crosshair */}
                <div className="chart-crosshair"></div>

                {/* Current Planet Marker Label */}
                <div
                  className="planet-marker current-location"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(0, -50%)" /* Adjust label offset */,
                  }}
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
                    const isSelected = planet.name === selectedPlanetName;
                    const posPx = getChartPositionPx(planet.coordinates); // Get { left: number, top: number } or null

                    if (!posPx) return null;

                    return (
                      <div
                        key={planet.name}
                        className={`planet-marker ${
                          isInRange ? "in-range" : "out-range"
                        } ${isSelected ? "selected" : ""}`}
                        // Apply calculated PIXEL positions
                        style={{
                          position: "absolute",
                          left: `${posPx.left}px`,
                          top: `${posPx.top}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => {
                          if (isInRange) {
                            setSelectedPlanetName(planet.name);
                          } else {
                            console.log(
                              `${planet.name} is out of range. Distance:`,
                              distance.toFixed(2)
                            );
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
          {(chartSize.width <= 0 || !currentPlanet || effectiveScale <= 0) && (
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
