import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import "@/components/App.css";
import { useTitleLogic } from "./useTitleLogic"; // Import hook

const TitleScreen: React.FC = () => {
  useTitleLogic();

  // R3F ShipComponent rendering is handled in App.tsx based on gameState
  // This component only renders the overlay UI

  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>
      <div id="press-key-text" className="center-text">
        Press any key to start game
      </div>
      {/* Render BottomHud without props */}
      <BottomHud />
    </>
  );
};

export default TitleScreen;
