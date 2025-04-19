import { useGameState } from "@/features/common/useGameState";
import { useInput } from "@/hooks/useInput";

export function useStatsLogic() {
  const { setGameState } = useGameState(); // Get gameState
  useInput({
    onInputStart: () => {
      setGameState("undocking");
    },
  });
}
