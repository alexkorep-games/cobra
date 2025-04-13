import React, { useState, useEffect } from 'react';
import '../App.css';

interface LoadingScreenProps {
  isLoadingComplete: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoadingComplete }) => {
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  useEffect(() => {
    // Reset flag when loading starts or isn't complete
    setShowContinuePrompt(false);

    if (isLoadingComplete) {
      // Add a small delay before showing "Press Key"
      const timer = setTimeout(() => {
        setShowContinuePrompt(true);
      }, 100); // 100ms delay
      return () => clearTimeout(timer);
    }
  }, [isLoadingComplete]);

  return (
    <>
      {/* No Top Bar for Loading Screen */}
      <div className="top-bar" style={{ visibility: 'hidden' }}>{/* Keep layout space */}</div>

      {/* Center Content */}
      <div id="loader-screen" className="center-text">
        {!showContinuePrompt && <p id="loader-progress-text">LOADING...</p>}
        {showContinuePrompt && (
          <p id="loader-continue-text">
            GAME LOADED
            <br /> PRESS ANY KEY TO CONTINUE
          </p>
        )}
      </div>

      {/* No Bottom HUD for Loading Screen */}
      <div className="bottom-bar" style={{ visibility: 'hidden' }}>{/* Keep layout space */}</div>
    </>
  );
};

export default LoadingScreen;