import React from "react";
import BottomHud from "../../components/hud/BottomHud";
import "../../components/App.css";
import { useCreditsLogic } from "./useCreditsLogic";


const CreditsScreen: React.FC = () => {
  useCreditsLogic();
  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>
      <div id="credits-text" className="center-text small">
        Game Copyright: 2025 Alexey Korepanov
      </div>
      <BottomHud /> {/* Show basic HUD frame */}
    </>
  );
};

export default CreditsScreen;
