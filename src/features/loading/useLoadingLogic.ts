/* src/features/loading/useLoadingLogic.ts */
import { useEffect, useRef, useCallback, useState } from 'react';
// Removed IGameManager import
import { useGameState } from '@/features/common/useGameState';

// Remove gameManager parameter
export function useLoadingLogic() {
  const isProcessingInput = useRef(false);
  const { setGameState } = useGameState();
  // Internal state to track loading and prompt visibility
  const [isLoadingComplete, setIsLoadingComplete] = useState(false); // Assume false initially
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  // Simulate loading completion (replace with actual logic)
  // This effect now runs internally, not triggered by App.tsx prop change
  useEffect(() => {
    // Reset state on mount (or when hook logic dictates)
    setIsLoadingComplete(false);
    setShowContinuePrompt(false);
    isProcessingInput.current = false;

    console.log("[useLoadingLogic] Simulating asset loading...");
    const loadingTimer = setTimeout(() => {
      console.log("[useLoadingLogic] Loading complete.");
      setIsLoadingComplete(true);
    }, 2000); // Simulate 2 seconds loading

    return () => clearTimeout(loadingTimer);
  }, []); // Run once on mount

  // Effect to show "Press Key" prompt slightly after loading finishes
  useEffect(() => {
    if (isLoadingComplete) {
      const promptTimer = setTimeout(() => {
        setShowContinuePrompt(true);
        console.log("[useLoadingLogic] Showing continue prompt.");
      }, 100); // Short delay
      return () => clearTimeout(promptTimer);
    }
  }, [isLoadingComplete]); // Run when isLoadingComplete changes

  const handleInput = useCallback((event: KeyboardEvent | MouseEvent) => {
    // Only process input if loading is complete and prompt is shown
    if (isLoadingComplete && showContinuePrompt && !isProcessingInput.current) {
      if (event.type === "keydown" || event.type === "mousedown") {
        isProcessingInput.current = true;
        console.log("Loading input detected, switching to title...");
        setGameState("title");
        // No need for timeout to reset isProcessingInput, as the component/hook will unmount
      }
    }
  }, [isLoadingComplete, showContinuePrompt, setGameState]); // Dependencies

  // Effect to add/remove input listeners
  useEffect(() => {
    // Add listeners only when the prompt is ready
    if (isLoadingComplete && showContinuePrompt) {
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);
      console.log("[useLoadingLogic] Input listeners added.");

      return () => {
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);
        console.log("[useLoadingLogic] Input listeners removed.");
      };
    }
  }, [isLoadingComplete, showContinuePrompt, handleInput]); // Add/remove based on state

  // Return state needed by the LoadingScreen component
  return { isLoadingComplete, showContinuePrompt };
}