// src/components/hud/BottomHud.tsx
import React from "react";
import "../App.css"; // Assuming App.css contains the HUD styles

interface BottomHudProps {
  speed?: number; // Optional for scenes other than flight, expected 0-100
  roll?: number; // Optional, range -1 to 1 (-1 left, 1 right)
  pitch?: number; // Optional, range -1 to 1 (-1 dive, 1 climb)
  stationDirection?: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null; // Updated to use object structure
  radarPosition?: Array<{
    relativeX: number; // -1 to 1, horizontal position
    relativeZ: number; // -1 to 1, distance (forward/backward)
    isInFront: boolean; // Whether the pirate is in front of the player
  }>;
}

const BottomHud: React.FC<BottomHudProps> = ({
  speed = 0,
  roll = 0,
  pitch = 0,
  stationDirection = null,
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
    const dotY = -displayDist * Math.sin(angle) + indicatorRadius + 1;

    // Change style based on whether station is in front or behind
    dotStyle = { 
      top: `${dotY}px`, 
      left: `${dotX}px`, 
      display: "block",
      // When behind camera, show a hollow circle instead of a filled dot
      backgroundColor: isInFront ? "#00ff00" : "transparent",
      border: isInFront ? "none" : "1px solid #00ff00",
      width: isInFront ? "4px" : "2px",
      height: isInFront ? "4px" : "2px"
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
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">AFT-SHIELD</span>
          <div className="hud-bar">
            <div
              id="aft-shield-fill"
              className="hud-bar-fill"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">FUEL</span>
          <div className="hud-bar">
            <div
              id="fuel-fill"
              className="hud-bar-fill"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">CABIN TEMP</span>
          <div className="hud-bar">
            <div
              id="cabin-temp-fill"
              className="hud-bar-fill"
              style={{ width: "10%" }}
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">LASER TEMP</span>
          <div className="hud-bar">
            <div
              id="laser-temp-fill"
              className="hud-bar-fill red"
              style={{ width: "5%" }}
            ></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">ALTITUDE</span>
          <div className="hud-bar"></div>
        </div>
        <div className="hud-item">
          <span className="hud-label">MISSILES</span>
          <span className="hud-value"> M M M M</span>
        </div>
      </div>
      {/* Center HUD */}
      <div className="hud-center">
        <div className="scanner-shape">
          {/* Radar positions in center scanner */}
          {radarPosition.map((position, index) => {
            // Calculate position within the scanner
            // x: Convert from -1...1 to scanner width percentage
            const xPos = 50 + position.relativeX * 40; // 40% width from center (10% to 90%)
            
            // z: Convert from -1...1 to scanner height (frontmost at bottom)
            // Invert Z so ships in front appear at bottom of scanner
            const zPos = 70 - position.relativeZ * 60; // Map to 10%-70% of height
            
            return (
              <div 
                key={`radar-${index}`}
                className="pirate-radar-line"
                style={{
                  left: `${xPos}%`,
                  top: `${zPos}%`,
                  // Solid line for in front, dashed for behind
                  borderLeft: position.isInFront 
                    ? '2px solid #00ff00' 
                    : '2px dashed #00ff00'
                }}
              >
                {/* Top serif (crossbar) */}
                <div className="pirate-radar-serif top-serif"></div>
                {/* Bottom serif (crossbar) */}
                <div className="pirate-radar-serif bottom-serif"></div>
              </div>
            );
          })}
        </div>
      </div>
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
            {/* Dot position will be set via style */}
            <div className="direction-indicator-dot" style={dotStyle}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomHud;
