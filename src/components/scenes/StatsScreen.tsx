import React from 'react';
import BottomHud from '../hud/BottomHud';
import '../App.css';

const StatsScreen: React.FC = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>

      {/* Center Content */}
      <div id="stats-screen" className="center-text small">
        <h2>COMMANDER JAMESON</h2>
        <p>
          <strong>System:</strong> LAVE
        </p>{' '}
        <p>
          <strong>Hypersystem:</strong> LAVE
        </p>{' '}
        <p>
          <strong>Fuel:</strong> 7.0 Light Years
        </p>{' '}
        <p>
          <strong>Cash:</strong> 100.0 Credits
        </p>{' '}
        <p>
          <strong>Legal Status:</strong> Clean
        </p>{' '}
        <p>
          <strong>Rating:</strong> Harmless
        </p>{' '}
        <p className="equipment">
          <strong>EQUIPMENT:</strong>
        </p>{' '}
        <p>Missile (3)</p> <p>Pulse Laser (Fore)</p>
      </div>

      {/* Bottom HUD */}
      <BottomHud />
    </>
  );
};

export default StatsScreen;