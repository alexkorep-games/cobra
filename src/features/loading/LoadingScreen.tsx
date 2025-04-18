/* src/features/loading/LoadingScreen.tsx */
import React from "react";
import "../../components/App.css";
import { useLoadingLogic } from "./useLoadingLogic"; // Import the hook
// Removed IGameManager import

// Remove LoadingScreenProps interface

const LoadingScreen: React.FC = () => {
  // Call the hook inside the component, it manages its own state now
  // Pass null for gameManager as it's no longer needed by the hook directly for setters
  // Note: If useLoadingLogic *still* needs GM for other reasons, adjust accordingly.
  // Assuming it only needed setGameState which comes from useGameState now.
  const { isLoadingComplete, showContinuePrompt } = useLoadingLogic();

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
