// src/screens/hyperspace_jump/HyperspaceScreen.tsx
import React from "react";
import "@/components/App.css"; // Import common styles

const HyperspaceScreen: React.FC = () => {
  // This screen might just show a simple message during the animation
  return (
    <>
      {/* Optional: Hide other HUD elements like coords/bottom bar if desired */}
      {/* <div className="top-left-coords" style={{ visibility: 'hidden' }}></div> */}
      {/* <div className="bottom-bar" style={{ visibility: 'hidden' }}></div> */}

      <div id="hyperspace-text" className="center-text">
        ENGAGING HYPERSPACE DRIVE...
      </div>
    </>
  );
};

export default HyperspaceScreen;