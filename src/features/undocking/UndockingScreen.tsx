import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import "@/components/App.css";
import { useUndockingLogic } from "./useUndockingLogic"; // Import hook

const UndockingScreen: React.FC = () => {
  useUndockingLogic();

  // R3F UndockingSquares rendering is handled in App.tsx based on gameState
  // This component only renders the overlay UI

  return (
    <>
      <div className="top-bar">
        <span id="view-text">Front View</span>
      </div>
      <div id="leaving-text" className="center-text small">
        Leaving Space Station
      </div>
      {/* Render BottomHud without props */}
      <BottomHud />
    </>
  );
};

export default UndockingScreen;
