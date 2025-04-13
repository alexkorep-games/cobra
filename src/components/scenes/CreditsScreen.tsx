import React from 'react';
import BottomHud from '../hud/BottomHud';
import '../App.css';

const CreditsScreen: React.FC = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>

      {/* Center Content */}
      <div id="credits-text" className="center-text small">
        Game Copyright:-
        <br />
        Bell & Braben
        <br />
        Code Copyright:-
        <br />
        Realtime Games
        <br />
        Software Ltd
        <br />
        Written by:-
        <br />
        Andy Onions
        <br />
        Cracked by:-
        <br />
        Key Software
      </div>

      {/* Bottom HUD */}
      <BottomHud />
    </>
  );
};

export default CreditsScreen;