// src/components/hud/SpaceFlightToolbar.tsx
import React, { useCallback } from "react";
import { useGameState } from "@/hooks/useGameState";
import { usePlanetInfos } from "@/hooks/usePlanetInfos";
import { usePlayerState } from "@/hooks/usePlayerState";
import { calculateDistance } from "@/classes/PlanetInfo";
import { JUMP_RANGE } from "@/constants";
import { useMarketGenerator } from "@/hooks/useMarketGenerator";
import "./SpaceFlightToolbar.css"; // Import styles specific to this toolbar
import "../hud/BottomToolbar.css"; // Re-use general button styles

const SpaceFlightToolbar: React.FC = () => {
  const { gameState, setGameState } = useGameState();
  const {
    getSelectedPlanet,
    getCurrentPlanet,
    setCurrentPlanetName,
    selectedPlanetName,
  } = usePlanetInfos();
  const { fuel, setFuelLevel } = usePlayerState();
  const generateMarketForPlanet = useMarketGenerator();

  const currentPlanet = getCurrentPlanet();
  const targetPlanet = getSelectedPlanet();

  // --- Hyperspace Eligibility Check ---
  let canHyperspace = false;
  let hyperspaceDistance = Infinity;
  if (targetPlanet && currentPlanet && targetPlanet.name !== currentPlanet.name) {
    hyperspaceDistance = calculateDistance(
      currentPlanet.coordinates,
      targetPlanet.coordinates
    );
    if (hyperspaceDistance <= JUMP_RANGE && fuel >= hyperspaceDistance) {
      canHyperspace = true;
    }
  }

  // --- Hyperspace Button Handler ---
  const handleHyperspace = useCallback(() => {
    if (!canHyperspace || !targetPlanet || !currentPlanet) {
      console.warn("Hyperspace jump condition not met.");
      // Add visual/audio feedback if needed
      return;
    }

    console.log(
      `Initiating hyperspace jump to ${
        targetPlanet.name
      } (${hyperspaceDistance.toFixed(1)} LY)...`
    );

    // 1. Consume Fuel (do this *before* changing state)
    setFuelLevel(fuel - hyperspaceDistance);

    // 2. Trigger Hyperspace Animation State
    // Store necessary info for after the jump (e.g., target planet object)
    // This could be stored in a temporary atom or passed via state transition logic if more complex
    // For now, we rely on usePlanetInfos having the targetPlanet available after animation.
    setGameState("hyperspace_jump");

    // The useHyperspaceLogic hook (to be created) will handle:
    // - The animation duration
    // - Setting the new currentPlanetName
    // - Generating the market for the new planet
    // - Setting the state back to 'space_flight'
  }, [
    canHyperspace,
    targetPlanet,
    currentPlanet,
    hyperspaceDistance,
    setFuelLevel,
    fuel,
    setGameState,
    // Note: setCurrentPlanetName and generateMarketForPlanet are called *after* the animation
  ]);

  // --- Jump Button Handler (Opens Chart) ---
  const handleJumpButton = () => {
    console.log("Opening Short Range Chart...");
    setGameState("short_range_chart");
  };

  // --- Dock Button Handler ---
  const handleDockButton = () => {
    console.log("Docking requested...");
    // TODO: Optional - Add check if near station? For now, allows docking anywhere.
    setGameState("stats"); // Go directly to the status/docked screen
  };

  // --- Determine Title Text for Hyperspace Button ---
  let hyperspaceTitle = "Select a target system in the chart";
  if (targetPlanet && currentPlanet) {
    if (targetPlanet.name === currentPlanet.name) {
      hyperspaceTitle = "Cannot jump to current system";
    } else if (hyperspaceDistance > JUMP_RANGE) {
      hyperspaceTitle = `Target out of range (${hyperspaceDistance.toFixed(
        1
      )} LY)`;
    } else if (fuel < hyperspaceDistance) {
      hyperspaceTitle = `Insufficient fuel (Need ${hyperspaceDistance.toFixed(
        1
      )} LY)`;
    } else if (canHyperspace) {
      hyperspaceTitle = `Hyperspace to ${targetPlanet.name}`;
    }
  }

  // Only render if in space flight state
  if (gameState !== "space_flight") {
    return null;
  }

  return (
    <div className="space-flight-toolbar">
      <button
        className={`toolbar-button ${!canHyperspace ? "disabled" : ""}`}
        onClick={handleHyperspace}
        disabled={!canHyperspace}
        title={hyperspaceTitle}
      >
        HYPERSPACE
      </button>
      <button
        className="toolbar-button"
        onClick={handleJumpButton}
        title="Open Navigation Chart (J)"
      >
        JUMP {/* Label matches key, action is chart */}
      </button>
      <button
        className="toolbar-button"
        onClick={handleDockButton}
        title="Dock at Station (Return to Status)"
      >
        DOCK
      </button>
    </div>
  );
};

export default SpaceFlightToolbar;