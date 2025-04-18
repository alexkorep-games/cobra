import { useEffect, useState, useRef, useCallback } from "react";
import { IGameManager } from "../../types";
import { PlanetInfo, calculateDistance } from "../../classes/PlanetInfo";
import { JUMP_RANGE } from "../../constants";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "../common/usePlanetInfos"; // Import planet state hook

export function useShortRangeChartLogic(gameManager: IGameManager | null) {
  const { gameState, setGameState } = useGameState();
  const {
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
    getCurrentPlanet,
  } = usePlanetInfos();

  // State to manage the list of *just* the reachable planets and the current selection index *within that list*
  const [reachablePlanets, setReachablePlanets] = useState<PlanetInfo[]>([]);
  const [selectedIndexInReachable, setSelectedIndexInReachable] =
    useState<number>(0);
  const isProcessingInput = useRef(false);

  // Update reachable planets and selection index when planets, current planet, or selection changes
  useEffect(() => {
    console.log("Recalculating reachable planets for Short Range Chart");
    const currentPlanet = getCurrentPlanet();

    if (!currentPlanet) {
      console.warn("Current planet not found in useShortRangeChartLogic!");
      setReachablePlanets([]);
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

    // Try to find the currently selected planet within the new reachable list
    const foundIndex = nearby.findIndex((p) => p.name === selectedPlanetName);

    if (foundIndex !== -1) {
      setSelectedIndexInReachable(foundIndex);
    } else if (nearby.length > 0) {
      // If previous selection is not reachable (or no selection), select the first reachable one
      setSelectedIndexInReachable(0);
      setSelectedPlanetName(nearby[0].name); // Update shared state
    } else {
      // No reachable planets
      setSelectedIndexInReachable(0); // Reset index
      setSelectedPlanetName(null); // Clear selection in shared state
    }
    isProcessingInput.current = false; // Reset input processing flag
  }, [
    planetInfos,
    currentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
    getCurrentPlanet,
  ]); // Dependencies

  // --- Input Handling ---
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Check if the Short Range Chart is the active state
      if (
        gameState === "short_range_chart" &&
        gameManager &&
        !isProcessingInput.current
      ) {
        if (
          reachablePlanets.length === 0 &&
          event.key !== "Escape" &&
          event.key.toLowerCase() !== "n" // Check lowercase 'n'
        ) {
          // Only allow exit keys if no planets are selectable
          return;
        }

        console.log(`Short Range Chart KeyDown: ${event.key}`);
        let processed = false;
        let newIndex = selectedIndexInReachable;

        switch (event.key) {
          case "ArrowUp":
          case "ArrowLeft":
            if (reachablePlanets.length > 0) {
              newIndex =
                (selectedIndexInReachable - 1 + reachablePlanets.length) %
                reachablePlanets.length;
              processed = true;
            }
            break;
          case "ArrowDown":
          case "ArrowRight":
            if (reachablePlanets.length > 0) {
              newIndex =
                (selectedIndexInReachable + 1) % reachablePlanets.length;
              processed = true;
            }
            break;
          case "Enter":
            if (reachablePlanets.length > 0 && selectedPlanetName) {
              // Check if a planet is actually selected
              console.log(`Confirmed selection: ${selectedPlanetName}`);
              setGameState("planet_info"); // Switch to planet info screen
              processed = true;
            }
            break;
          case "Escape":
            setGameState("space_flight"); // Go back to flight
            processed = true;
            break;
          case "n": // Allow 'n' (case-insensitive) to close the chart too
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

          if (
            newIndex !== selectedIndexInReachable &&
            reachablePlanets[newIndex]
          ) {
            setSelectedIndexInReachable(newIndex);
            setSelectedPlanetName(reachablePlanets[newIndex].name); // Update selection in shared state
          } else if (
            event.key === "Escape" ||
            event.key.toLowerCase() === "n" ||
            event.key === "Enter"
          ) {
            // Don't clear selection if just navigating away
            if (event.key !== "Enter") {
              // Optional: Clear selection when exiting via Esc/N? Debatable UX.
              // setSelectedPlanetName(null);
            }
          }
        }
      }
    },
    [
      gameState,
      gameManager,
      reachablePlanets,
      selectedIndexInReachable,
      selectedPlanetName,
      setGameState,
      setSelectedPlanetName,
    ] // Dependencies
  );

  // Return values/functions needed by the component
  return {
    reachablePlanets,
    selectedIndexInReachable,
    handleKeyDown, // Export handler so component can attach it
  };
}
