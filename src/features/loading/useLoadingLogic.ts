// src/features/loading/useLoadingLogic.ts
import { useEffect, useRef, useCallback } from 'react';
import { IGameManager, GameState } from '../../types';

export function useLoadingLogic(
    gameManager: IGameManager | null,
    isActive: boolean,
    isLoadingComplete: boolean // Receive loading status from App component
) {
  const isProcessingInput = useRef(false);

  const handleInput = useCallback((event: KeyboardEvent | MouseEvent) => {
    // Only process input if the loading is complete and the hook is active
    if (isActive && gameManager && isLoadingComplete && !isProcessingInput.current) {
      if (event.type === 'keydown' || event.type === 'mousedown') {
        isProcessingInput.current = true;
        console.log('Loader input detected (loading complete), switching state...');
        // Example: Switch to the title screen after loading
        gameManager.switchState('title');
        // Or directly to another state for testing:
        // gameManager.switchState('short_range_chart');
      }
    }
  }, [isActive, gameManager, isLoadingComplete]);

  useEffect(() => {
    if (isActive && gameManager) {
      console.log('Activating Loading Logic Hook');
      isProcessingInput.current = false; // Reset input flag on activation

      // Add input listeners immediately, but handleInput callback checks isLoadingComplete
      window.addEventListener('keydown', handleInput);
      window.addEventListener('mousedown', handleInput);

      // Cleanup function
      return () => {
        console.log('Deactivating Loading Logic Hook');
        // Remove listeners
        window.removeEventListener('keydown', handleInput);
        window.removeEventListener('mousedown', handleInput);
      };
    }
  }, [isActive, gameManager, handleInput]);

  // No update logic needed from GameManager's loop for this scene
}