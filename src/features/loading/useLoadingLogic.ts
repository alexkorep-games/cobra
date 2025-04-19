import { useEffect, useState } from "react";
import { useGameState } from "@/features/common/useGameState";
import { useInput } from "@/hooks/useInput";

export function useLoadingLogic(isAssetsLoadingComplete: boolean) {
  const { setGameState } = useGameState();
  useInput({
    onInputStart: () => {
      if (!isAssetsLoadingComplete) {
        return;
      }
      setGameState("title");
    },
  });
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);

  useEffect(() => {
    if (!isAssetsLoadingComplete) {
      return;
    }
    setShowContinuePrompt(true);
  }, [isAssetsLoadingComplete]);

  return { isLoadingComplete: isAssetsLoadingComplete, showContinuePrompt };
}
