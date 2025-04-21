import { useState, useEffect, useRef, useCallback } from "react";
import { useGameState } from "@/hooks/useGameState";
import { usePlanetInfos } from "@/hooks/usePlanetInfos"; // Use this hook
import { PlanetInfo, calculateDistance } from "@/classes/PlanetInfo";
import { JUMP_RANGE } from "@/constants";

export function useShortRangeChartLogic() {
  const [reachablePlanets, setReachablePlanets] = useState<PlanetInfo[]>([]);
  const [selectedIndexInReachable, setSelectedIndexInReachable] = useState(0);
  const isProcessingInput = useRef(false);

  const { gameState, setGameState } = useGameState();
  const {
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
  } = usePlanetInfos();

  // Update reachable planets and selection
  useEffect(() => {
    if (gameState === "short_range_chart") {
      const currentPlanet = planetInfos.find(
        (p) => p.name === currentPlanetName
      );

      if (!currentPlanet) {
        setReachablePlanets([]);
        setSelectedIndexInReachable(0);
        setSelectedPlanetName(null);
        return;
      }

      const nearby = planetInfos
        .filter((p) => p.name !== currentPlanet.name)
        .map((p) => ({
          planet: p,
          distance: calculateDistance(currentPlanet.coordinates, p.coordinates),
        }))
        .filter((pd) => pd.distance <= JUMP_RANGE)
        .sort((a, b) => a.distance - b.distance)
        .map((pd) => pd.planet);

      setReachablePlanets(nearby);

      // Maintain selection or default
      const currentSelectedName = selectedPlanetName;
      const foundIndex = nearby.findIndex(
        (p) => p.name === currentSelectedName
      );

      if (foundIndex !== -1) {
        setSelectedIndexInReachable(foundIndex);
      } else if (nearby.length > 0) {
        setSelectedIndexInReachable(0);
        // *** Don't automatically select the first one here unless intended ***
        // setSelectedPlanetName(nearby[0].name); // Keep selection based on user action
      } else {
        setSelectedIndexInReachable(0);
      }
      isProcessingInput.current = false;
    }
  }, [
    gameState,
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
  ]);

  // --- Input Handling ---
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameState !== "short_range_chart" || isProcessingInput.current) {
        return;
      }

      let processed = false;
      let newIndex = selectedIndexInReachable;

      switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (reachablePlanets.length > 0) {
            newIndex =
              (selectedIndexInReachable - 1 + reachablePlanets.length) %
              reachablePlanets.length; // Wrap around
            processed = true;
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (reachablePlanets.length > 0) {
            newIndex = (selectedIndexInReachable + 1) % reachablePlanets.length; // Wrap around
            processed = true;
          }
          break;
        case "Enter":
        case " ": // Spacebar
        case "j": // Jump/Select key
        case "J":
          if (selectedPlanetName) {
            console.log(`Keyboard confirmed selection: ${selectedPlanetName}`);
            setGameState("planet_info"); // Switch to planet info screen
            processed = true;
          } else {
            console.log("Keyboard confirm ignored: No planet selected.");
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

        // Update local index and shared selected planet name if index changed via keyboard
        if (
          newIndex !== selectedIndexInReachable &&
          reachablePlanets[newIndex]
        ) {
          setSelectedIndexInReachable(newIndex);
          setSelectedPlanetName(reachablePlanets[newIndex].name); // Update shared state
        }
      }
    },
    [
      gameState,
      reachablePlanets,
      selectedIndexInReachable,
      selectedPlanetName, // *** Add selectedPlanetName dependency ***
      setGameState,
      setSelectedPlanetName,
    ]
  );

  // Setup keyboard listener
  useEffect(() => {
    if (gameState === "short_range_chart") {
      window.addEventListener("keydown", handleKeyDown);
      isProcessingInput.current = false; // Reset on activation
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [gameState, handleKeyDown]); // Add handleKeyDown dependency

  // Hook no longer needs to return anything specific for the component's rendering logic
  // Component now gets selectedPlanetName directly from usePlanetInfos
  // return { reachablePlanets, selectedIndexInReachable };
}
