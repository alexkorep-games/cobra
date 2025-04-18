/* src/features/loading/useLoadingLogic.ts */
// src/features/loading/useLoadingLogic.ts
import { useEffect, useRef, useCallback, useState } from 'react';
import { IGameManager } from "@/types";
import { useGameState } from '@/features/common/useGameState';

export function useLoadingLogic() {
  const isProcessingInput = useRef(false);
  const { gameState, setGameState } = useGameState();
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  // Callback for GameManager to signal loading completion
  const handleGmLoadingComplete = useCallback(() => {
    console.log("useLoadingLogic notified that loading is complete.");
    setIsLoadingComplete(true);
    // Optionally add a slight delay before showing the prompt for better UX
    setTimeout(() => setShowContinuePrompt(true), 100);
  }, []);

  // Effect to re-run init if gameManager instance changes (e.g., during HMR)
  // And to pass the completion callback to GameManager
  useEffect(() => {
     if (gameManager) {
         console.log("GameManager available, setting loading complete callback.")
         // Ensure the callback is attached or re-attached
         gameManager.loadingCompleteCallback = handleGmLoadingComplete;
         // If GM is already initialized and loading was complete before this hook ran,
         // check its status or trigger callback immediately.
         // For simplicity, we assume GM calls the callback only once upon completion.
     }
  }, [gameManager, handleGmLoadingComplete])

  const handleInput = useCallback((event: KeyboardEvent | MouseEvent) => {
    // Only process input if loading is complete and the hook is active (component is mounted)
    if (gameState === 'loading' && gameManager && isLoadingComplete && !isProcessingInput.current) {
      if (event.type === 'keydown' || event.type === 'mousedown') {
        isProcessingInput.current = true;
        console.log('Loader input detected (loading complete), switching state...');
        setGameState('title');
        // Reset flag shortly after
        setTimeout(() => { isProcessingInput.current = false; }, 100);
      }
    }
  }, [gameState, gameManager, isLoadingComplete, setGameState]); // Add setGameState dependency

  useEffect(() => {
    // This effect runs when the LoadingScreen mounts
    console.log('Activating Loading Logic Hook');
    isProcessingInput.current = false; // Reset input flag on activation

    // Reset prompt state on mount (in case of re-mounts)
    setShowContinuePrompt(isLoadingComplete); // Show prompt immediately if already complete

    // Add input listeners immediately, but handleInput callback checks isLoadingComplete
    window.addEventListener('keydown', handleInput);
    window.addEventListener('mousedown', handleInput);

    // Cleanup function when LoadingScreen unmounts
    return () => {
      console.log('Deactivating Loading Logic Hook');
      // Remove listeners
      window.removeEventListener('keydown', handleInput);
      window.removeEventListener('mousedown', handleInput);
      // Crucially, remove the callback from GM if it exists to prevent memory leaks
      // or calls to unmounted components, *if* the GM persists longer than the hook.
      // If GM is recreated with App, this might be less critical.
      if (gameManager && gameManager.loadingCompleteCallback === handleGmLoadingComplete) {
          gameManager.loadingCompleteCallback = null;
          console.log("Removed loading complete callback from GameManager.")
      }
    };
    // Effect dependencies
  }, [gameManager, handleInput, isLoadingComplete, handleGmLoadingComplete]);

  // Return state needed by the component
  return { isLoadingComplete, showContinuePrompt };
}