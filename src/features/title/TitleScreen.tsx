import React from "react";
import BottomHud from "@/components/hud/BottomHud";
import "@/components/App.css";
import { useTitleLogic } from "./useTitleLogic";
import { GameAssets } from "@/types"; // Import GameAssets type

// Define props interface
interface TitleScreenProps {
  assets: GameAssets | null;
  introMusicRef: React.RefObject<HTMLAudioElement | null>;
}

// Accept props
const TitleScreen: React.FC<TitleScreenProps> = ({ assets, introMusicRef }) => {
  // Pass props to the hook
  useTitleLogic(assets, introMusicRef);

  // R3F ShipComponent rendering is handled in App.tsx based on gameState
  // This component only renders the overlay UI

  return (
    <>
      <div className="top-bar">
        <span id="title-text">--- PROJECT COBRA ---</span>
      </div>
      <div id="press-key-text" className="center-text">
        Press any key to start game
      </div>
      {/* Render BottomHud without props */}
      <BottomHud />
    </>
  );
};

export default TitleScreen;
