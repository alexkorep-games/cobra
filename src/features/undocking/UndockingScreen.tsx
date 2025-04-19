// src/features/undocking/UndockingScreen.tsx
import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import "@/components/App.css";
import { useUndockingLogic } from "./useUndockingLogic";

// Define props interface
interface UndockingScreenProps {
  undockSoundRef: React.RefObject<HTMLAudioElement | null>;
}

// Accept props
const UndockingScreen: React.FC<UndockingScreenProps> = ({
  undockSoundRef,
}) => {
  // Pass prop to the hook
  useUndockingLogic(undockSoundRef);

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
