import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import { useCreditsLogic } from "./useCreditsLogic"; // Import hook

const CreditsScreen: React.FC = () => {
  // Call the hook
  useCreditsLogic();

  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>
      <div id="credits-text" className="center-text small">
        Game Copyright: 2025 Alexey Korepanov
      </div>
    </>
  );
};

export default CreditsScreen;
