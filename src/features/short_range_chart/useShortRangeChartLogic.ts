import { useState, useEffect, useRef, useCallback } from "react";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos"; // Use this hook
import { PlanetInfo, calculateDistance } from "@/classes/PlanetInfo";
import { JUMP_RANGE } from "@/constants";
import { useInput } from "@/hooks/useInput";

export function useShortRangeChartLogic() {
  const [reachablePlanets, setReachablePlanets] = useState<PlanetInfo[]>([]);
  const [selectedIndexInReachable, setSelectedIndexInReachable] = useState(0);
  const isProcessingInput = useRef(false);

  const { gameState, setGameState } = useGameState();
  // Use usePlanetInfos hook to get planet data and selection state
  const {
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
  } = usePlanetInfos();

  // Update reachable planets and selection when the hook becomes active or planets/current planet changes
  useEffect(() => {
    if (gameState === "short_range_chart") {
      console.log("Updating reachable planets for Short Range Chart");
      const currentPlanet = planetInfos.find(
        (p) => p.name === currentPlanetName
      );

      if (!currentPlanet) {
        console.error("Current planet not found in PlanetInfos state!");
        setReachablePlanets([]);
        setSelectedIndexInReachable(0); // Reset index
        setSelectedPlanetName(null); // Clear selection
        return;
      }

      const nearby = planetInfos
        .filter((p) => p.name !== currentPlanet.name) // Exclude current
        .map((p) => ({
          planet: p,
          distance: calculateDistance(currentPlanet.coordinates, p.coordinates),
        }))
        .filter((pd) => pd.distance <= JUMP_RANGE) // Filter by jump range
        .sort((a, b) => a.distance - b.distance) // Sort by distance
        .map((pd) => pd.planet); // Get just the planet objects

      setReachablePlanets(nearby);

      // Try to maintain selection or default to first/none
      const currentSelectedName = selectedPlanetName; // Use state from usePlanetInfos
      const foundIndex = nearby.findIndex(
        (p) => p.name === currentSelectedName
      );

      if (foundIndex !== -1) {
        setSelectedIndexInReachable(foundIndex);
        // No need to set selectedPlanetName here, it's already correct
      } else if (nearby.length > 0) {
        // If previous selection is not reachable, select the first reachable one
        setSelectedIndexInReachable(0);
        setSelectedPlanetName(nearby[0].name); // Update shared state
      } else {
        // No reachable planets
        setSelectedIndexInReachable(0); // Reset index
        setSelectedPlanetName(null); // Clear selection in shared state
      }
      isProcessingInput.current = false; // Reset input processing flag
    }
  }, [
    gameState,
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
  ]); // Re-calculate when active or relevant planet info changes

  // --- Input Handling ---
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState === "short_range_chart" && !isProcessingInput.current) {
        let processed = false;
        let newIndex = selectedIndexInReachable;

        switch (event.key) {
          case "ArrowUp":
          case "w":
          case "W":
            newIndex = Math.max(0, selectedIndexInReachable - 1);
            processed = true;
            break;
          case "ArrowDown":
          case "s":
          case "S":
            newIndex = Math.min(
              reachablePlanets.length - 1,
              selectedIndexInReachable + 1
            );
            processed = true;
            break;
          case "Enter":
          case " ": // Spacebar
          case "j": // Jump/Select key
          case "J":
            if (reachablePlanets.length > 0 && selectedIndexInReachable >= 0) {
              const selectedPlanet = reachablePlanets[selectedIndexInReachable];
              if (selectedPlanet) {
                console.log(`Confirmed selection: ${selectedPlanet.name}`);
                // Selection is already set in shared state by arrow keys
                setGameState("planet_info"); // Switch to planet info screen
                processed = true;
              }
            }
            break;
          case "Escape":
          case "n": // Allow 'n' to close the chart too
          case "N":
            setGameState("space_flight"); // Go back to flight
            processed = true;
            break;
        }

        if (processed) {
          isProcessingInput.current = true;
          setTimeout(() => {
            isProcessingInput.current = false;
          }, 50); // Short debounce

          // Update local index and shared selected planet name if index changed
          if (
            newIndex !== selectedIndexInReachable &&
            reachablePlanets[newIndex]
          ) {
            setSelectedIndexInReachable(newIndex);
            setSelectedPlanetName(reachablePlanets[newIndex].name); // Update shared state
          }
        }
      }
    },
    [
      gameState,
      reachablePlanets,
      selectedIndexInReachable,
      setGameState,
      setSelectedPlanetName,
    ] // Dependencies
  );

  const { keysPressed } = useInput();

  useEffect(() => {
    console.log("[useShortRangeChartLogic] Using useInput hook for input state management.");
    // Cleanup logic for keysPressed is no longer needed as useInput handles it.
  }, [keysPressed]);

  // Return state needed by the ShortRangeChartScreen component
  return { reachablePlanets, selectedIndexInReachable };
}
