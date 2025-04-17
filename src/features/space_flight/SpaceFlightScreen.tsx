import React from "react";
import BottomHud from "../../components/hud/BottomHud";

interface SpaceFlightScreenProps {
  speed: number;
  roll: number;
  pitch: number;
  altitude?: number;
  stationDirection: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null; // Updated to use object structure
  radarPosition?: Array<{
    relativeX: number;
    relativeZ: number;
    isInFront: boolean;
  }>;
}

const SpaceFlightScreen: React.FC<SpaceFlightScreenProps> = ({
  speed,
  roll,
  pitch,
  altitude = 0,
  stationDirection,
  radarPosition = [],
}) => {
  return (
    <>
      <div className="top-bar">
        <span id="bounty-text"> BOUNTY: 5.0 Cr </span>
        <span id="view-text" style={{ marginLeft: "20px" }}>
          Front View
        </span>
      </div>

      <div className="center-text" style={{ visibility: "hidden" }}></div>

      <BottomHud
        speed={speed}
        roll={roll}
        pitch={pitch}
        altitude={altitude}
        stationDirection={stationDirection}
        radarPosition={radarPosition}
      />
    </>
  );
};

export default SpaceFlightScreen;
