import React from "react";
import BottomHud from "../../components/hud/BottomHud";

interface SpaceFlightScreenProps {
  speed: number;
  roll: number;
  pitch: number;
  stationDirection: number | null; // Angle in radians or null
}

const SpaceFlightScreen: React.FC<SpaceFlightScreenProps> = ({
  speed,
  roll,
  pitch,
  stationDirection,
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
        stationDirection={stationDirection}
      />
    </>
  );
};

export default SpaceFlightScreen;
