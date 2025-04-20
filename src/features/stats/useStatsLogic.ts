import { useGameState } from "@/features/common/useGameState";
import { useInput } from "@/hooks/useInput";

export function useStatsLogic() {
  const { setGameState } = useGameState();
  useInput({
    onInputStart: () => {
      setGameState("undocking");
    },
  });
}
