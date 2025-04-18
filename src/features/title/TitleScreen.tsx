import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import "@/components/App.css";
import { useTitleLogic } from "./useTitleLogic"; // Import hook
import { IGameManager } from "@/types";

interface TitleScreenProps {
  gameManager: IGameManager | null; // Pass GM for hook initialization
}

const TitleScreen: React.FC<TitleScreenProps> = ({ gameManager }) => {
  // Call the hook
  useTitleLogic(gameManager);

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
      <BottomHud />
    </>
  );
};

export default TitleScreen;
