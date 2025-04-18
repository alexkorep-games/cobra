import React from "react";
import BottomHud from "../../components/hud/BottomHud";
// Import types if needed, or assume props are correct
import { RadarPosition } from "../../types";

interface SpaceFlightScreenProps {
  speed: number;
  roll: number;
  pitch: number;
  laserHeat?: number; // Added laser heat
  altitude?: number;
  stationDirection: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null; // Updated to use object structure
  radarPosition?: RadarPosition[]; // Use the correct type
}

const SpaceFlightScreen: React.FC<SpaceFlightScreenProps> = ({
  speed,
  roll,
  pitch,
  laserHeat = 0, // Default laser heat
  altitude = 0,
  stationDirection,
  radarPosition = [],
}) => {
  return (
    <>
      {/* Top bar can be dynamic based on game state too */}
      <div className="top-bar">
        {/* Example: Replace with dynamic data */}
        <span id="bounty-text"> BOUNTY: 5.0 Cr </span>
        <span id="view-text" style={{ marginLeft: "20px" }}>
          Front View
        </span>
      </div>

      {/* Center text area, can be used for messages (e.g., "Hyperspace Engaged") */}
      {/* <div className="center-text"> MESSAGE AREA </div> */}
      {/* Hide placeholder if not used */}
      <div className="center-text" style={{ visibility: "hidden" }}></div>

      {/* Bottom HUD displays flight telemetry */}
      <BottomHud
        speed={speed}
        roll={roll}
        pitch={pitch}
        laserHeat={laserHeat} // Pass laser heat to HUD
        altitude={altitude}
        stationDirection={stationDirection}
        radarPosition={radarPosition} // Pass radar positions
      />
    </>
  );
};

export default SpaceFlightScreen;