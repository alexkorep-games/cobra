import React, { useRef, useEffect, useState } from "react";
import { Coordinates, calculateDistance } from "@/classes/PlanetInfo";
import { usePlanetInfos } from "../../hooks/usePlanetInfos";
import { JUMP_RANGE } from "@/constants";
import "./ShortRangeChart.css"; // Import your CSS file

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
        // Calculate size considering padding if needed in the future
        const rect = chartAreaRef.current.getBoundingClientRect();
        setChartSize({
          width: rect.width, // Use clientWidth/Height or getBoundingClientRect
          height: rect.height,
        });
      }
    };

    updateSize(); // Initial size
    window.addEventListener("resize", updateSize); // Fallback/standard listener

    return () => {
      // clearTimeout(resizeTimer);
      window.removeEventListener("resize", updateSize);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  // Calculate scale based on the smaller dimension ensuring some padding visually
  const chartDrawableWidth = Math.max(1, chartSize.width - CHART_PADDING * 2);
  const chartDrawableHeight = Math.max(1, chartSize.height - CHART_PADDING * 2);
  const minChartDrawableDimension = Math.min(
    chartDrawableWidth,
    chartDrawableHeight
  );

  // The jump range circle diameter should fit within the drawable area
  const targetCircleDiameter = minChartDrawableDimension; // Fit circle within drawable area

  // Scale relates world distance (Jump Range * 2 diameter) to pixel diameter
  const effectiveScale =
    JUMP_RANGE > 0 ? targetCircleDiameter / (JUMP_RANGE * 2) : 1;

  // Function to convert planet coordinates to chart position (PIXELS)
  const getChartPositionPx = (
    planetCoords: Coordinates
  ): { left: number; top: number } | null => {
    if (
      !currentPlanet ||
      chartSize.width <= 0 ||
      chartSize.height <= 0 ||
      effectiveScale <= 0
    ) {
      return null; // Indicate invalid position
    }

    // Center of the chart area
    const chartCenterX = chartSize.width / 2;
    const chartCenterY = chartSize.height / 2;

    // Calculate difference in world coordinates
    const dx = planetCoords.x - currentPlanet.coordinates.x;
    const dy = planetCoords.y - currentPlanet.coordinates.y;

    // Convert world difference to pixel offset using scale
    const pixelOffsetX = dx * effectiveScale;
    const pixelOffsetY = -dy * effectiveScale; // Y screen coordinate is inverted from cartesian Y

    // Calculate final absolute pixel position relative to chart area's top-left
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

  // Prepare planet data with distances
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
          style={{
            position: "relative",
            overflow: "hidden" /*, border: '1px solid grey' */,
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
                    // Position is absolute, centered via transform
                    width: `${targetCircleDiameter}px`,
                    height: `${targetCircleDiameter}px`,
                    // Other styles in CSS
                  }}
                ></div>

                {/* Current Location Crosshair (centered) */}
                <div
                  className="chart-crosshair"
                  // Style the crosshair via CSS
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "20px", // Example size - style in CSS
                    height: "20px", // Example size - style in CSS
                    border: "1px solid lime", // Example simple crosshair
                  }}
                >
                  {/* You might use pseudo-elements ::before/::after in CSS for lines */}
                </div>

                {/* Current Planet Marker Label (Positioned relative to center) */}
                <div
                  className="planet-marker current-location"
                  style={{
                    position: "absolute",
                    left: "50%", // Anchor label position near center
                    top: "50%", // Anchor label position near center
                    // No transform needed here, label itself is positioned absolutely below
                  }}
                >
                  <span
                    className="planet-label"
                    // Style positioning offsets in CSS for .current-location .planet-label
                    // Example inline override if needed:
                    // style={{ marginLeft: "15px", transform: "translateY(-50%)", color: "#00ff00" }}
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
                    const posPx = getChartPositionPx(planet.coordinates);

                    if (!posPx) return null; // Skip if position calculation failed

                    return (
                      <div
                        key={planet.name}
                        className={`planet-marker ${
                          isInRange ? "in-range" : "out-range"
                        } ${isSelected ? "selected" : ""}`}
                        style={{
                          position: "absolute",
                          // Set the TOP-LEFT corner of the marker container to the calculated posPx
                          left: `${posPx.left}px`,
                          top: `${posPx.top}px`,
                          // REMOVE the transform here. We will position dot/label inside.
                          // transform: "translate(-50%, -50%)", // <-- REMOVED
                          // Add cursor styles via CSS based on in-range/out-range
                        }}
                        onClick={() => {
                          if (isInRange) {
                            setSelectedPlanetName(planet.name);
                          } else {
                            // Optional: Provide feedback for clicking out-of-range
                            console.log(
                              `${planet.name} is out of range. Distance:`,
                              distance.toFixed(2)
                            );
                            // setSelectedPlanetName(null); // Optionally deselect if clicking out of range
                          }
                        }}
                        title={`${planet.name}${
                          !isInRange
                            ? ` (Out of range: ${distance.toFixed(1)} LY)`
                            : ` (${distance.toFixed(1)} LY)`
                        }`} // Tooltip
                      >
                        {/* The Dot: Absolutely positioned and transformed to be centered at parent's top-left (posPx) */}
                        <div
                          className="planet-dot"
                          // Add styles via CSS (size, color, border-radius, position: absolute, left: 0, top: 0, transform: translate(-50%, -50%))
                        ></div>
                        {/* The Label: Absolutely positioned relative to parent's top-left (posPx), with offsets */}
                        <span
                          className="planet-label"
                          // Add styles via CSS (position: absolute, offsets like left: 8px, top: -7px, font, color, etc.)
                        >
                          {planet.name}
                        </span>
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
