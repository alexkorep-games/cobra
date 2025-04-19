// src/features/space_flight/SpaceFlightScreenUI.tsx
import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import CoordinatesDisplay from "@/components/hud/CoordinatesDisplay";
import "@/components/App.css"; // Import common styles

const SpaceFlightScreenUI: React.FC = () => {
  // This component's sole purpose is to render the overlay UI elements.
  // It doesn't need complex logic, as the state is managed globally
  // and consumed by BottomHud and CoordinatesDisplay internally via useHudState.

  return (
    <>
      {/* Top Bar (Optional - could add status messages here later) */}
      {/* <div className="top-bar">...</div> */}

      {/* Top-Left Coordinates */}
      <CoordinatesDisplay />

      {/* Bottom HUD Bar */}
      <BottomHud />

      {/* Center Screen Messages (Optional) */}
      {/* <div className="center-text">...</div> */}
    </>
  );
};

export default SpaceFlightScreenUI;