import React from 'react';
import BottomHud from '../../components/hud/BottomHud';
import '../../App.css';

interface SpaceFlightScreenProps {
  speed: number;
  roll: number;
  pitch: number;
}

const SpaceFlightScreen: React.FC<SpaceFlightScreenProps> = ({ speed, roll, pitch }) => {
  return (
    <>
      <div className="top-bar">
        <span id="bounty-text"> BOUNTY: 5.0 Cr </span>
        <span id="view-text" style={{ marginLeft: '20px' }}>Front View</span>
      </div>

      <div className="center-text" style={{ visibility: 'hidden' }}></div>

      <BottomHud speed={speed} roll={roll} pitch={pitch} />
    </>
  );
};

export default SpaceFlightScreen;