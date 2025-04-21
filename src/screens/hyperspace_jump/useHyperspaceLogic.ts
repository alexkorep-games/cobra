// src/screens/hyperspace_jump/useHyperspaceLogic.ts
import { useEffect, useRef } from "react";
import { useGameState } from "@/hooks/useGameState";
import { usePlanetInfos } from "@/hooks/usePlanetInfos";
import { useMarketGenerator } from "@/hooks/useMarketGenerator";
// Import sound hook if you have a hyperspace sound
// import { useAudioManager } from '@/hooks/useAudioManager';

const HYPERSPACE_DURATION = 3000; // ms for the animation

export function useHyperspaceLogic() {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { gameState, setGameState } = useGameState();
  const { getSelectedPlanet, setCurrentPlanetName } = usePlanetInfos();
  const generateMarketForPlanet = useMarketGenerator();
  // const { hyperspaceSoundRef } = useAudioManager(); // Example sound ref

  // Effect runs when entering/leaving the hyperspace_jump state
  useEffect(() => {
    if (gameState === "hyperspace_jump") {
      console.log("Activating Hyperspace Logic Hook");
      const targetPlanet = getSelectedPlanet(); // Get target *before* timeout

      if (!targetPlanet) {
        console.error(
          "Hyperspace failed: No target planet selected when entering state. Returning to space flight."
        );
        setGameState("space_flight");
        return; // Exit early
      }

      // --- Play Sound ---
      // hyperspaceSoundRef.current?.play().catch(e => console.warn("Hyperspace sound failed:", e));

      // --- Set Timeout for Completion ---
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        // Check state again inside timeout to prevent race conditions
        if (gameState === "hyperspace_jump") {
          console.log("Hyperspace jump finished. Arriving at destination.");

          // 1. Update Current Planet (use the target captured earlier)
          console.log(`Setting current planet to: ${targetPlanet.name}`);
          setCurrentPlanetName(targetPlanet.name);

          // 2. Generate Market for the *new* current planet
          // Pass the targetPlanet object directly to ensure the correct market is generated immediately.
          generateMarketForPlanet(targetPlanet);

          // 3. Switch back to Space Flight state
          console.log("Returning to space flight state.");
          setGameState("space_flight");
        }
        timeoutIdRef.current = null;
      }, HYPERSPACE_DURATION);

      // --- Cleanup Function (when leaving hyperspace_jump state) ---
      return () => {
        console.log("Deactivating Hyperspace Logic Hook");

        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }

        // --- Stop Sound ---
        // if (hyperspaceSoundRef.current) {
        //   hyperspaceSoundRef.current.pause();
        //   hyperspaceSoundRef.current.currentTime = 0;
        // }
      };
    }
  }, [
    gameState,
    setGameState,
    getSelectedPlanet,
    setCurrentPlanetName,
    generateMarketForPlanet,
    // hyperspaceSoundRef // Add sound ref if used
  ]);

  // No input handling needed for this animation state
  // Hook doesn't need to return anything for the component
}