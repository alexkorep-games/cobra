import { useGameState } from "@/features/common/useGameState";
import { useInput } from "@/hooks/useInput";
import { useMarketGenerator } from "@/hooks/useMarketGenerator"; // Import market generator hook

export function useStatsLogic() {
  const { setGameState } = useGameState();
  const generateMarket = useMarketGenerator(); // Get the function to generate market data

  useInput({
    onInputStart: () => {
       // Generate/update market data for the current planet BEFORE switching
       generateMarket();
       // Transition to the Buy Cargo screen
      setGameState("buy_cargo");
    },
  });

   // No need for useEffect related to visualState or timers here anymore
}