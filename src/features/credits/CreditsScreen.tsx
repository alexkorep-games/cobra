import React from "react";
import BottomHud from "../../components/hud/BottomHud";
import "../../components/App.css";
import { useCreditsLogic } from "./useCreditsLogic"; // Import hook
import { IGameManager } from "@/types";

interface CreditsScreenProps {
  gameManager: IGameManager | null; // Pass GM for hook initialization
}

const CreditsScreen: React.FC<CreditsScreenProps> = ({ gameManager }) => {
  // Call the hook
  useCreditsLogic(gameManager);

  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>
      <div id="credits-text" className="center-text small">
        Game Copyright: 2025 Alexey Korepanov
      </div>
      {/* Render BottomHud without props */}
      <BottomHud />
    </>
  );
};

export default CreditsScreen;
