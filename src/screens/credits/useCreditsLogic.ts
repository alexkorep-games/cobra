import { useGameState } from "@/hooks/useGameState";
import { useInput } from "@/hooks/useInput";

export function useCreditsLogic() {
  const { setGameState } = useGameState();
  useInput({
    onInputStart: () => {
      setGameState("buy_cargo");
    },
  });
}
