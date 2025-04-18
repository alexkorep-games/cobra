/* src/components/hud/BottomHud.tsx */
// src/components/hud/BottomHud.tsx
import React, { useEffect } from "react"; // Import useEffect
import "../App.css"; // Assuming App.css contains the HUD styles
import { RadarPosition } from "../../types";
import * as Constants from "../../constants"; // Import constants for laser heat

interface BottomHudProps {
  speed?: number; // Optional for scenes other than flight, expected 0-100
  roll?: number; // Optional, range -1 to 1 (-1 left, 1 right)
  pitch?: number; // Optional, range -1 to 1 (-1 dive, 1 climb)
  altitude?: number; // Optional, range 0-100 for normalized altitude display
  stationDirection?: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null; // Updated to use object structure
  laserHeat?: number; // Add laser heat prop (0-100)
  // Update radarPosition structure for x, y, z coordinates
  radarPosition?: RadarPosition[];
}

const BottomHud: React.FC<BottomHudProps> = ({
  speed = 0,
  roll = 0,
  pitch = 0,
  altitude = 0,
  stationDirection = null,
  laserHeat = 0, // Default laser heat
  radarPosition = [],
}) => {
  // Calculate marker positions (0% to 100%) based on -1 to 1 range
  // Roll: -1 (left) -> 0%, 0 (center) -> 50%, 1 (right) -> 100%
  const rollMarkerPosition = 50 + roll * 50;
  // Pitch: -1 (dive) -> 0%, 0 (level) -> 50%, 1 (climb) -> 100%
  // Marker moves right for climb, left for dive.
  const pitchMarkerPosition = 50 + pitch * 50;

  // Calculate position for the direction indicator dot
  let dotStyle: React.CSSProperties = { display: "none" };
  if (stationDirection !== null) {
    const { x: relX, y: relY, offCenterAmount, isInFront } = stationDirection;
    const indicatorRadius = 8; // px, radius of the circle container inner space

    // Use atan2 for direction
    const angle = Math.atan2(relY, relX);

    // Use offCenterAmount for distance from center
    const displayDist = offCenterAmount * indicatorRadius;

    // Center in 18x18 container (border is 1px)
    const dotX = displayDist * Math.cos(angle) + indicatorRadius + 1;
    const dotY = -displayDist * Math.sin(angle) + indicatorRadius + 1; // Invert Y for screen coords

    // Change style based on whether station is in front or behind
    dotStyle = {
      top: `${dotY}px`,
      left: `${dotX}px`,
      display: "block",
      // When behind camera, show a hollow circle instead of a filled dot
      backgroundColor: isInFront ? "#00ff00" : "transparent",
      border: isInFront ? "none" : "1px solid #00ff00",
      width: isInFront ? "4px" : "2px", // Make hollow circle thinner
      height: isInFront ? "4px" : "2px",
    };
  }

  return (
    <div className="bottom-bar">
      {/* Left HUD */}
      <div className="hud-left">
        <div className="hud-item">
          <span className="hud-label">FORE-SHIELD</span>
          <div className="hud-bar">
            <div
              id="fore-shield-fill"
              className="hud-bar-fill"
              style={{ width: "80%" }} // TODO: Make dynamic
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">AFT-SHIELD</span>
          <div className="hud-bar">
            <div
              id="aft-shield-fill"
              className="hud-bar-fill"
              style={{ width: "80%" }} // TODO: Make dynamic
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">FUEL</span>
          <div className="hud-bar">
            <div
              id="fuel-fill"
              className="hud-bar-fill"
              style={{ width: "100%" }} // TODO: Make dynamic
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">CABIN TEMP</span>
          <div className="hud-bar">
            <div
              id="cabin-temp-fill"
              className="hud-bar-fill"
              style={{ width: "10%" }} // TODO: Make dynamic
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">LASER TEMP</span>
          <div className="hud-bar">
            {/* Change fill color dynamically based on heat */}
            <div
              id="laser-temp-fill"
              className={`hud-bar-fill ${
                laserHeat >= Constants.LASER_MAX_HEAT * 0.9 ? "red" : ""
              }`} // Red if near max heat
              style={{
                width: `${Math.max(0, Math.min(100, laserHeat))}%`,
                backgroundColor:
                  laserHeat >= Constants.LASER_MAX_HEAT * 0.9
                    ? "#ff0000"
                    : "#00ff00", // Dynamic color
              }}
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">ALTITUDE</span>
          <div className="hud-bar">
            <div
              id="altitude-fill"
              className="hud-bar-fill"
              style={{ width: `${Math.max(0, Math.min(100, altitude))}%` }}
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">MISSILES</span>
          <span className="hud-value"> M M M M</span> {/* TODO: Make dynamic */}
        </div>
      </div>
      {/* Closing tag for hud-left */}
      {/* Center HUD */}
      <div className="hud-center">
        <div className="scanner-shape">
          {/* Add horizontal center line */}
          <div className="radar-center-line"></div>
          {/* Radar positions in center scanner */}
          {/* Add a check for radarPosition length before mapping */}
          {radarPosition &&
            radarPosition.length > 0 &&
            radarPosition.map((position, index) => {
              const { x, y, z } = position;

              // Calculate position within the scanner (adjust scaling/offset as needed)
              // x: Convert from -1...1 to scanner width percentage (e.g., 5% to 95%)
              const xPos = 50 + x * 40; // Scale factor 40 for horizontal

              // z: Convert from -1..1 to scanner height (5% to 95%)
              // z=-1 (front) -> 5%, z=0 (center) -> 50%, z=1 (behind) -> 95%
              const zPos = 50 + z * 40; // Scale factor 40 for vertical

              // y: Determine line length and direction. Max length (e.g., 15% of height)
              const yLength = Math.abs(y) * 15; // Scale factor 15 for vertical line

              let topStyle: number;
              let heightStyle: string;
              let borderStyle: string | undefined = "2px solid #00ff00"; // Default line style
              const isTopSerif = y > 0; // True if line goes DOWN from zPos (serif at top)

              if (y === 0) {
                // Centered vertically, minimal height for serifs, no line
                const serifHeightPx = 2; // Height needed for serifs
                topStyle = zPos - serifHeightPx / 2; // Adjust top to center visually
                heightStyle = `${serifHeightPx}px`;
                borderStyle = "none"; // No vertical line
              } else if (y > 0) {
                // Line goes down from zPos (target is above)
                topStyle = zPos; // Start line at zPos
                heightStyle = `${yLength}%`;
              } else {
                // y < 0
                // Line goes up from zPos (target is below)
                topStyle = zPos - yLength; // Start line above zPos
                heightStyle = `${yLength}%`;
              }

              // Clamp positions to prevent going outside scanner bounds (e.g., 5% to 95%)
              const clampedLeft = Math.max(5, Math.min(95, xPos));
              // Clamp top, considering the line's height to ensure it doesn't extend beyond bounds
              let clampedTop = Math.max(5, topStyle);
              let finalHeight = parseFloat(
                heightStyle.replace("%", "").replace("px", "")
              );
              if (heightStyle.endsWith("%")) {
                if (clampedTop + finalHeight > 95) {
                  finalHeight = 95 - clampedTop; // Adjust height if bottom exceeds limit
                }
                heightStyle = `${Math.max(1, finalHeight)}%`; // Ensure minimum height 1%
              } else {
                // Pixel height (for y=0 case)
                if (clampedTop + finalHeight > 95) {
                  // If even the small pixel height exceeds, adjust top upwards
                  clampedTop = 95 - finalHeight;
                }
                heightStyle = `${Math.max(1, finalHeight)}px`; // Ensure minimum height 1px
              }
              clampedTop = Math.max(5, clampedTop); // Re-clamp top after height adjustments

              return (
                <div
                  key={`radar-${index}`}
                  className="pirate-radar-line"
                  style={{
                    left: `${clampedLeft}%`,
                    top: `${clampedTop}%`,
                    height: heightStyle,
                    borderLeft: borderStyle,
                  }}
                >
                  {/* Top serif means line goes down (y>0), bottom serif means line goes up (y<0) */}
                  {isTopSerif ? (
                    <div className="pirate-radar-serif top-serif"></div>
                  ) : (
                    <div className="pirate-radar-serif bottom-serif"></div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {/* Closing tag for hud-center */}
      {/* Right HUD */}
      <div className="hud-right">
        <div className="hud-item">
          <span className="hud-label">SPEED</span>
          <div className="hud-bar">
            {/* Speed uses fill */}
            <div
              className="hud-bar-fill"
              style={{ width: `${Math.max(0, Math.min(100, speed))}%` }}
            ></div>{" "}
            {/* Clamp speed 0-100 */}
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">ROLL</span>
          <div className="hud-bar">
            {/* Roll uses marker */}
            <div
              className="hud-bar-marker"
              style={{
                left: `${Math.max(0, Math.min(100, rollMarkerPosition))}%`,
              }}
            ></div>{" "}
            {/* Clamp position 0-100 */}
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">DIVE/CLIMB</span>
          <div className="hud-bar">
            {/* Pitch uses marker */}
            <div
              className="hud-bar-marker"
              style={{
                left: `${Math.max(0, Math.min(100, pitchMarkerPosition))}%`,
              }}
            ></div>{" "}
            {/* Clamp position 0-100 */}
          </div>
        </div>
        <div
          className="hud-item"
          style={{ justifyContent: "center", marginTop: "5px" }}
        >
          {/* Placeholder boxes */}
          <span style={{ border: "1px solid #00ff00", padding: "2px 5px" }}>
            1
          </span>
          <span
            style={{
              border: "1px solid #00ff00",
              padding: "2px 5px",
              margin: "0 5px",
            }}
          >
            2
          </span>
          <span style={{ border: "1px solid #00ff00", padding: "2px 5px" }}>
            3
          </span>
          {/* Direction Indicator */}
          <div className="direction-indicator-container">
            {/* Add a check for stationDirection before rendering dot */}
            {stationDirection && (
              <div className="direction-indicator-dot" style={dotStyle}></div>
            )}
          </div>
        </div>{" "}
        {/* Closing tag for hud-item */}
      </div>{" "}
      {/* Closing tag for hud-right */}
    </div> // Closing tag for bottom-bar
  );
};

export default BottomHud;
