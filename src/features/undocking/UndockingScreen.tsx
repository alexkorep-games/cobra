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
  useUndockingLogic(undockSoundRef);
  return (
    <>
      <div className="top-bar">
        <span id="view-text">Front View</span>
      </div>
      <div id="leaving-text" className="center-text small">
        Leaving Space Station
      </div>
      <BottomHud />
    </>
  );
};

export default UndockingScreen;
