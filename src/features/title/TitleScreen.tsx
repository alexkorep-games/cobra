import React from "react";
import BottomHud from "../../components/hud/BottomHud";
import "../../components/App.css";

const TitleScreen: React.FC = () => {
  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>
      <div id="press-key-text" className="center-text">
        Press any key to start game
      </div>
      <BottomHud />
    </>
  );
};

export default TitleScreen;
