/* src/features/loading/LoadingScreen.tsx */
import React from "react";
import "../../components/App.css";
import { useLoadingLogic } from "./useLoadingLogic"; // Import the hook
import { useAssetLoader } from "@/hooks/useAssetLoader";

const LoadingScreen: React.FC = () => {
  const {isLoadingComplete} = useAssetLoader(); // Call the asset loader hook
  const { showContinuePrompt } = useLoadingLogic(isLoadingComplete);

  return (
    <>
      <div className="top-bar" style={{ visibility: "hidden" }}></div>

      <div id="loader-screen" className="center-text">
        {!isLoadingComplete && !showContinuePrompt && (
          <p id="loader-progress-text">LOADING...</p>
        )}
        {showContinuePrompt && (
          <p id="loader-continue-text">
            GAME LOADED
            <br /> PRESS ANY KEY TO CONTINUE
          </p>
        )}
      </div>

      <div className="bottom-bar" style={{ visibility: "hidden" }}></div>
    </>
  );
};

export default LoadingScreen;
