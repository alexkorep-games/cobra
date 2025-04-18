// src/features/credits/useCreditsLogic.ts
import { useEffect, useRef, useCallback } from 'react';
import { IGameManager, GameState } from '@/types';

export function useCreditsLogic(gameManager: IGameManager | null, isActive: boolean) {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingInput = useRef(false);

  const handleInput = useCallback((event: KeyboardEvent | MouseEvent) => {
    if (isActive && gameManager && !isProcessingInput.current) {
      if (event.type === 'keydown' || event.type === 'mousedown') {
        isProcessingInput.current = true;
        console.log('Credits input detected, switching to stats...');
        // Clear timeout if input happens before it fires
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
        gameManager.switchState('stats');
      }
    }
  }, [isActive, gameManager]);

  useEffect(() => {
    if (isActive && gameManager) {
      console.log('Activating Credits Logic Hook');
      isProcessingInput.current = false; // Reset input flag

      // Clear previous timeout just in case
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Set timeout to automatically switch state
      timeoutIdRef.current = setTimeout(() => {
        // Check isActive again inside timeout in case state changed rapidly
        if (isActive && gameManager) {
          console.log('Credits timeout reached, switching to stats...');
          gameManager.switchState('stats');
        }
        timeoutIdRef.current = null; // Clear ref after execution
      }, 3000); // 3 second delay

      // Add input listeners
      window.addEventListener('keydown', handleInput);
      window.addEventListener('mousedown', handleInput);

      // Cleanup function
      return () => {
        console.log('Deactivating Credits Logic Hook');
        // Clear timeout if the component/hook deactivates
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
        // Remove listeners
        window.removeEventListener('keydown', handleInput);
        window.removeEventListener('mousedown', handleInput);
      };
    }
  }, [isActive, gameManager, handleInput]);

  // No update logic needed from GameManager's loop for this scene
  // No need to register/unregister an update function
}