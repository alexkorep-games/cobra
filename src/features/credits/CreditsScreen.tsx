import React from 'react';
import BottomHud from '../../components/hud/BottomHud';
import '../../components/App.css';

const CreditsScreen: React.FC = () => {
  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>

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

      <BottomHud />
    </>
  );
};

export default CreditsScreen;