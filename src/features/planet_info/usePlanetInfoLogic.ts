// src/features/planet_info/usePlanetInfoLogic.ts
import { useEffect, useRef, useCallback } from 'react';
import { IGameManager, GameState } from '../../types';
import { useGameState } from '@/features/common/useGameState';

export function usePlanetInfoLogic(gameManager: IGameManager | null, isActive: boolean) {
  const isProcessingInput = useRef(false); // Optional: Prevent double processing
  const { setGameState } = useGameState();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isActive && gameManager && !isProcessingInput.current) { // Check isActive and gameManager
      console.log(`Planet Info KeyDown: ${event.key}`);
      let processed = false;

      switch (event.key) {
        case "j": // Jump key (example)
        case "J":
          console.log("Jump initiated (placeholder)... returning to chart.");
          // TODO: Implement actual jump logic (new state? animation?)
          setGameState("short_range_chart"); // Go back for now
          processed = true;
          break;
        case "Escape":
        case "n": // Allow 'n' to close the info too
        case "N":
          setGameState("short_range_chart"); // Go back to chart
          processed = true;
          break;
      }

      if (processed) {
         isProcessingInput.current = true;
         // Reset processing flag shortly after to allow new input
         setTimeout(() => { isProcessingInput.current = false; }, 100);
      }
    }
  }, [isActive, gameManager]); // Dependencies for the callback

  useEffect(() => {
    if (isActive && gameManager) {
      console.log('Activating Planet Info Logic Hook');
      isProcessingInput.current = false; // Reset on activation

      // Check if a planet is actually selected in GameManager's state
      if (!gameManager.selectedPlanetName) {
        console.warn("No planet selected when entering Planet Info, returning to chart.");
        // Use requestAnimationFrame to ensure the state switch happens after the current render cycle
        requestAnimationFrame(() => {
            if (gameManager.currentState === 'planet_info') { // Double check state hasn't changed again
                 setGameState("short_range_chart");
            }
        });
        return; // Don't add listeners if returning immediately
      }

      console.log("Entering Planet Info Screen for:", gameManager.selectedPlanetName);

      // Add keydown listener
      window.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        console.log('Deactivating Planet Info Logic Hook');
        // Remove listener
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isActive, gameManager, handleKeyDown]); // Rerun effect if isActive, gameManager, or handleKeyDown changes

  // No update logic needed from GameManager's loop for this scene
}