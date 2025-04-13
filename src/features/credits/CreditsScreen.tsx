import React from "react";
import BottomHud from "../../components/hud/BottomHud";
import "../../components/App.css";

const CreditsScreen: React.FC = () => {
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
