import React from 'react';
import BottomHud from '../../components/hud/BottomHud';
import '../../App.css';

const UndockingScreen: React.FC = () => {
  return (
    <>
      <div className="top-bar">
        <span id="view-text">Front View</span>
      </div>

      <div id="leaving-text" className="center-text small">
        Leaving Space Station
      </div>

      <BottomHud />
    </>
  );
};

export default UndockingScreen;