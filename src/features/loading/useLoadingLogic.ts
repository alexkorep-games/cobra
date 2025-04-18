/* src/features/loading/useLoadingLogic.ts */
import { useEffect, useRef, useCallback, useState } from "react";
import { useGameState } from "@/features/common/useGameState";

// Receive isLoadingComplete from useAssetLoader via App component
export function useLoadingLogic(isAssetsLoadingComplete: boolean) {
  const isProcessingInput = useRef(false);
  const { setGameState } = useGameState();
  // Internal state for prompt visibility, depends on external loading state
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  // Effect to show "Press Key" prompt slightly after loading finishes
  useEffect(() => {
    // Reset prompt state if loading becomes incomplete (e.g., remount)
    setShowContinuePrompt(false);

    if (isAssetsLoadingComplete) {
      const promptTimer = setTimeout(() => {
        setShowContinuePrompt(true);
        console.log("[useLoadingLogic] Showing continue prompt.");
      }, 100); // Short delay
      return () => clearTimeout(promptTimer);
    }
  }, [isAssetsLoadingComplete]); // Run when asset loading status changes

  const handleInput = useCallback(
    (event: KeyboardEvent | MouseEvent) => {
      // Only process input if loading is complete and prompt is shown
      if (
        isAssetsLoadingComplete &&
        showContinuePrompt &&
        !isProcessingInput.current
      ) {
        if (event.type === "keydown" || event.type === "mousedown") {
          isProcessingInput.current = true;
          console.log("Loading input detected, switching to title...");
          setGameState("title");
          // No need for timeout to reset isProcessingInput, as the component/hook will unmount/deactivate
        }
      }
    },
    [isAssetsLoadingComplete, showContinuePrompt, setGameState]
  ); // Dependencies

  // Effect to add/remove input listeners
  useEffect(() => {
    // Add listeners only when the prompt is ready
    if (isAssetsLoadingComplete && showContinuePrompt) {
      window.addEventListener("keydown", handleInput);
      window.addEventListener("mousedown", handleInput);
      console.log("[useLoadingLogic] Input listeners added.");

      return () => {
        window.removeEventListener("keydown", handleInput);
        window.removeEventListener("mousedown", handleInput);
        console.log("[useLoadingLogic] Input listeners removed.");
      };
    }
  }, [isAssetsLoadingComplete, showContinuePrompt, handleInput]); // Add/remove based on state

  // Return state needed by the LoadingScreen component
  // isLoadingComplete is now derived from the prop
  return { isLoadingComplete: isAssetsLoadingComplete, showContinuePrompt };
}
