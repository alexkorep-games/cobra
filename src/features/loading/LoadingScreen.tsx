import React, { useState, useEffect } from "react";
import "../../components/App.css";

interface LoadingScreenProps {
  isLoadingComplete: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoadingComplete }) => {
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  useEffect(() => {
    setShowContinuePrompt(false);

    if (isLoadingComplete) {
      const timer = setTimeout(() => {
        setShowContinuePrompt(true); // Show prompt slightly after load complete
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoadingComplete]);

  return (
    <>
      <div className="top-bar" style={{ visibility: "hidden" }}></div>

      <div id="loader-screen" className="center-text">
        {!showContinuePrompt && <p id="loader-progress-text">LOADING...</p>}
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
