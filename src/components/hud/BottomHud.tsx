import React from 'react';
import '../App.css'; // Assuming App.css contains the HUD styles

const BottomHud: React.FC = () => {
  return (
    <div className="bottom-bar">
      {/* Left HUD */}
      <div className="hud-left">
        <div className="hud-item">
          <span className="hud-label">FORE-SHIELD</span>
          <div className="hud-bar">
            <div id="fore-shield-fill" className="hud-bar-fill" style={{ width: '80%' }}></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">AFT-SHIELD</span>
          <div className="hud-bar">
            <div id="aft-shield-fill" className="hud-bar-fill" style={{ width: '80%' }}></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">FUEL</span>
          <div className="hud-bar">
            <div id="fuel-fill" className="hud-bar-fill" style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">CABIN TEMP</span>
          <div className="hud-bar">
            <div id="cabin-temp-fill" className="hud-bar-fill" style={{ width: '10%' }}></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">LASER TEMP</span>
          <div className="hud-bar">
            <div id="laser-temp-fill" className="hud-bar-fill red" style={{ width: '5%' }}></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">ALTITUDE</span>
          <div className="hud-bar"></div>
        </div>
        <div className="hud-item">
          <span className="hud-label">MISSILES</span>
          <span className="hud-value"> M M M M</span>
        </div>
      </div>
      {/* Center HUD */}
      <div className="hud-center">
        <div className="scanner-shape"></div> {/* Placeholder for scanner */}
      </div>
      {/* Right HUD */}
      <div className="hud-right">
        <div className="hud-item">
          <span className="hud-label">SPEED</span>
          <div className="hud-bar">
            <div className="hud-bar-fill" style={{ width: '10%' }}></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">ROLL</span>
          <div className="hud-bar">
            <div className="hud-bar-fill" style={{ width: '50%' }}></div>
          </div>
        </div>
        <div className="hud-item">
          <span className="hud-label">DIVE/CLIMB</span>
          <div className="hud-bar">
            <div className="hud-bar-fill" style={{ width: '50%' }}></div>
          </div>
        </div>
        <div className="hud-item" style={{ justifyContent: 'center', marginTop: '5px' }}>
          <span style={{ border: '1px solid #00ff00', padding: '2px 5px' }}>1</span>
          <span style={{ border: '1px solid #00ff00', padding: '2px 5px', margin: '0 5px' }}>2</span>
          <span style={{ border: '1px solid #00ff00', padding: '2px 5px' }}>3</span>
          <span
            style={{
              border: '1px solid #ffff00',
              borderRadius: '50%',
              width: '15px',
              height: '15px',
              display: 'inline-block',
              marginLeft: '10px',
            }}
          ></span>{' '}
          {/* ECM Indicator? */}
        </div>
      </div>
    </div>
  );
};

export default BottomHud;