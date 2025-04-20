import { useGameState } from "@/features/common/useGameState";
import { useInput } from "@/hooks/useInput";

export function useCreditsLogic() {
  const { setGameState } = useGameState();
  useInput({
    onInputStart: () => {
      setGameState("stats");
    },
  });
}
