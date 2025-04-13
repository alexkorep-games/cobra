import React from 'react';
import BottomHud from '../hud/BottomHud';
import '../App.css';

const TitleScreen: React.FC = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>

      {/* Center Content */}
      <div id="press-key-text" className="center-text">
        Press any key to start game
      </div>

      {/* Bottom HUD */}
      <BottomHud />
    </>
  );
};

export default TitleScreen;