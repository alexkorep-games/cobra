import React from 'react';
import BottomHud from '../hud/BottomHud';
import '../App.css';

const UndockingScreen: React.FC = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <span id="view-text">Front View</span>
      </div>

      {/* Center Content */}
      <div id="leaving-text" className="center-text small">
        Leaving Space Station
      </div>

      {/* Bottom HUD */}
      <BottomHud />
    </>
  );
};

export default UndockingScreen;