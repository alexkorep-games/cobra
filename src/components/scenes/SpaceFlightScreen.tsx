import React from 'react';
import BottomHud from '../hud/BottomHud';
import '../App.css';

const SpaceFlightScreen: React.FC = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <span id="bounty-text"> BOUNTY: 5.0 Cr </span>
        <span id="view-text" style={{ marginLeft: '20px' }}>Front View</span> {/* Example spacing */}
      </div>

      {/* Center Content (Optional: Placeholder for dynamic info) */}
      {/* <div id="space-flight-info" className="center-text small">
            SPACE FLIGHT ACTIVE
         </div> */}
        {/* Add empty div to keep space consistent if no center text */}
        <div className="center-text" style={{ visibility: 'hidden' }}></div>

      {/* Bottom HUD */}
      <BottomHud />
    </>
  );
};

export default SpaceFlightScreen;