import { useEffect, useState } from "react";
import { useGameState } from "@/features/common/useGameState";
import { useInput } from "@/hooks/useInput";

export function useLoadingLogic(isAssetsLoadingComplete: boolean) {
  const { setGameState } = useGameState();
  const { isAnyInputActive } = useInput();
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  useEffect(() => {
    if (!isAssetsLoadingComplete) {
      return;
    }
    setShowContinuePrompt(true);
  }, [isAssetsLoadingComplete]); // Run when asset loading status changes

  useEffect(() => {
    if (isAssetsLoadingComplete && isAnyInputActive) {
      setGameState("title");
    }
  }, [isAssetsLoadingComplete, isAnyInputActive]);

  return { isLoadingComplete: isAssetsLoadingComplete, showContinuePrompt };
}
