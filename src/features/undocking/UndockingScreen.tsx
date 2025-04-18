import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import "@/components/App.css";
import { useUndockingLogic } from "./useUndockingLogic"; // Import hook
import { IGameManager } from "@/types";

interface UndockingScreenProps {
  gameManager: IGameManager | null; // Pass GM for hook initialization
}

const UndockingScreen: React.FC<UndockingScreenProps> = ({ gameManager }) => {
  // Call the hook
  useUndockingLogic(gameManager);

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
      <BottomHud /> {/* Show basic HUD frame */}
    </>
  );
};

export default UndockingScreen;
