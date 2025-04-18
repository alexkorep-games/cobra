// src/features/short_range_chart/useShortRangeChartLogic.ts
import { useEffect, useState, useRef, useCallback } from "react";
import { IGameManager } from "../../types";
import { PlanetInfo, calculateDistance } from "../../classes/PlanetInfo";
import { JUMP_RANGE } from "../../constants";
import { useGameState } from '@/features/common/useGameState';

export function useShortRangeChartLogic(
  gameManager: IGameManager | null,
  isActive: boolean
) {
  // State to manage the list of reachable planets and the current selection index
  const [reachablePlanets, setReachablePlanets] = useState<PlanetInfo[]>([]);
  // Store the index within the reachablePlanets array
  const [selectedIndexInReachable, setSelectedIndexInReachable] =
    useState<number>(0);
  const isProcessingInput = useRef(false);

  const { setGameState } = useGameState();

  // Update reachable planets and selection when the hook becomes active or planets/current planet changes
  useEffect(() => {
    if (isActive && gameManager) {
      console.log("Updating reachable planets for Short Range Chart");
      const planets = gameManager.planetInfos;
      const currentPlanet = gameManager.getCurrentPlanet(); // Assumes GM provides this method

      if (!currentPlanet) {
        console.error("Current planet not found in GameManager!");
        setReachablePlanets([]);
        return;
      }

      const nearby = planets
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
      const currentSelectedName = gameManager.selectedPlanetName;
      const foundIndex = nearby.findIndex(
        (p) => p.name === currentSelectedName
      );

      if (foundIndex !== -1) {
        setSelectedIndexInReachable(foundIndex);
      } else if (nearby.length > 0) {
        // If previous selection is not reachable, select the first reachable one
        setSelectedIndexInReachable(0);
        // Update GameManager's state as well
        gameManager.setSelectedPlanetName(nearby[0].name);
      } else {
        // No reachable planets
        setSelectedIndexInReachable(0); // Reset index
        gameManager.setSelectedPlanetName(null); // Clear selection in GM
      }
      isProcessingInput.current = false; // Reset input processing flag
    }
  }, [isActive, gameManager]); // Re-calculate when isActive or gameManager instance changes (or potentially planetInfos/currentPlanet if they were props)

  // --- Input Handling ---
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isActive && gameManager && !isProcessingInput.current) {
        // Check isActive and gameManager
        if (
          reachablePlanets.length === 0 &&
          event.key !== "Escape" &&
          event.key !== "n" &&
          event.key !== "N"
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
            if (reachablePlanets.length > 0) {
              const selectedPlanet = reachablePlanets[selectedIndexInReachable];
              if (selectedPlanet) {
                console.log(`Confirmed selection: ${selectedPlanet.name}`);
                // Update GM's selected planet (already done by arrow keys)
                // gameManager.setSelectedPlanetName(selectedPlanet.name);
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

          if (
            newIndex !== selectedIndexInReachable &&
            reachablePlanets[newIndex]
          ) {
            setSelectedIndexInReachable(newIndex);
            gameManager.setSelectedPlanetName(reachablePlanets[newIndex].name); // Update selection in GameManager
          }
        }
      }
    },
    [isActive, gameManager, reachablePlanets, selectedIndexInReachable]
  ); // Dependencies

  // Effect for adding/removing input listener
  useEffect(() => {
    if (isActive && gameManager) {
      console.log("Activating Short Range Chart Logic Hook");
      // Add listener
      window.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        console.log("Deactivating Short Range Chart Logic Hook");
        // Remove listener
        window.removeEventListener("keydown", handleKeyDown);
        // Optional: Clear selection when leaving? Depends on UX.
        // gameManager.setSelectedPlanetName(null);
      };
    }
  }, [isActive, gameManager, handleKeyDown]); // Rerun if dependencies change

  // No update logic needed from GameManager's loop for this scene
}
