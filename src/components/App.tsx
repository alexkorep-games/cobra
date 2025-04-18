import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { GameState, IGameManager, RadarPosition } from "@/types"; // Adjusted imports
import { GameManager } from "@/game/GameManager";
import { useGameState } from "@/features/common/useGameState"; // Import global state hook
import { usePlanetInfos } from "@/features/common/usePlanetInfos"; // Import planet state hook
import { useHudState } from "@/features/common/useHudState"; // Import HUD state hook
import { PLANET_COUNT, PLANET_SEED, SHIP_SCALE } from "../constants";
import { generatePlanets } from "@/classes/PlanetInfo";

// Import Scene Components
import LoadingScreen from "@/features/loading/LoadingScreen";
import TitleScreen from "@/features/title/TitleScreen";
import CreditsScreen from "@/features/credits/CreditsScreen";
import StatsScreen from "@/features/stats/StatsScreen";
import CoordinatesDisplay from "@/components/hud/CoordinatesDisplay";
import SpaceFlightScreen from "@/features/space_flight/SpaceFlightScreen";
import ShortRangeChartScreen from "@/features/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "@/features/planet_info/PlanetInfoScreen";
import UndockingScreen from "@/features/undocking/UndockingScreen";

// Import R3F Entity Components
import ShipComponent from "@/components/r3f/ShipComponent";
import UndockingSquares from "@/components/r3f/UndockingSquares";

// Helper component to run GameManager update loop
const GameLoop: React.FC<{ gameManager: IGameManager | null }> = ({
  gameManager,
}) => {
  const { gameState } = useGameState(); // Get current state for logging/potential logic
  useFrame((_, delta) => {
    // Only call GM update if it exists and potentially based on state
    // if (gameState !== 'loading') { // Example: Don't run update during initial load screen
    //     gameManager?.update(delta);
    // }
    // Let GM handle its own state logic for updates for now
    gameManager?.update(delta);
  });
  return null;
};

// Helper component to initialize global state (like planets)
const GlobalStateInitializer: React.FC<{
  gameManager: IGameManager | null;
}> = ({ gameManager }) => {
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();

  useEffect(() => {
    // Generate planets once GameManager is initialized (or based on some other trigger)
    if (gameManager) {
      // Ensure GM exists, though assets might load later
      console.log("Initializing global planet state...");
      const generatedPlanets = generatePlanets(PLANET_SEED, PLANET_COUNT);
      setPlanetInfos(generatedPlanets);
      if (generatedPlanets.length > 0) {
        setCurrentPlanetName(generatedPlanets[0].name); // Set initial current planet
        console.log(`Set initial planet: ${generatedPlanets[0].name}`);
      } else {
        console.error("No planets generated!");
      }
    }
  }, [gameManager, setPlanetInfos, setCurrentPlanetName]); // Rerun if GM instance changes

  return null;
};

const App: React.FC = () => {
  // --- Global State Hooks ---
  const { gameState, setGameState } = useGameState();
  // Use HUD state hook, but we might only need values here for passing down if absolutely necessary
  // Components should ideally consume the hook directly
  const { coordinates } = useHudState(); // Example: Get coordinates if needed by CoordinatesDisplay directly here

  // --- Refs ---
  const gameManagerRef = useRef<IGameManager | null>(null);
  const introMusicRef = useRef<HTMLAudioElement>(null);
  const undockSoundRef = useRef<HTMLAudioElement>(null);

  // --- Game Logic Initialization Effect ---
  useEffect(() => {
    if (gameManagerRef.current) {
      console.log("GameManager instance already exists, skipping init.");
      return;
    }

    console.log("Initializing GameManager...");

    // Pass only necessary refs/callbacks to GameManager constructor
    const gameManager = new GameManager(
      introMusicRef,
      undockSoundRef
      // Removed setters object
    );

    const handleLoadingComplete = () => {
      console.log("React notified that loading is complete.");
      // If LoadingScreen uses a hook, this might become internal to the hook
    };

    gameManager.init(handleLoadingComplete);
    gameManagerRef.current = gameManager;

    return () => {
      // Cleanup logic remains the same
      if (gameManagerRef.current === gameManager) {
        console.log("Cleaning up active GameManager instance.");
        gameManagerRef.current?.dispose();
        gameManagerRef.current = null;
      } else if (gameManager) {
        console.log("Cleaning up potentially orphaned GameManager instance.");
        gameManager.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep dependency array empty to run only once

  useEffect(() => {
    // Update GameManager's internal state when global gameState changes
    if (
      gameManagerRef.current &&
      gameManagerRef.current.currentState !== gameState
    ) {
      gameManagerRef.current.switchState(gameState);
    }
  }, [gameState]); // React to changes in global gameState

  // --- Helper Functions ---
  // Function to render the correct scene UI component based on gameState
  const renderSceneUIComponent = () => {
    const gm = gameManagerRef.current; // Get current GM instance
    if (!gm) return null; // Don't render scenes if GM isn't ready

    switch (gameState) {
      case "loading":
        // LoadingScreen uses its own hook now, doesn't need GM prop
        return <LoadingScreen />;
      case "title":
        return <TitleScreen gameManager={gm} />; // Pass GM instance
      case "credits":
        return <CreditsScreen gameManager={gm} />; // Pass GM instance
      case "stats":
        return <StatsScreen gameManager={gm} />; // Pass GM instance
      case "undocking":
        return <UndockingScreen gameManager={gm} />; // Pass GM instance
      case "space_flight":
        // SpaceFlightScreen renders its own HUD via useHudState hook
        return null; // No separate UI overlay needed here
      case "short_range_chart":
        return <ShortRangeChartScreen gameManager={gm} />; // Pass GM instance
      case "planet_info":
        return <PlanetInfoScreen gameManager={gm} />; // Pass GM instance
      default:
        return null;
    }
  };

  // --- Render ---
  const gm = gameManagerRef.current;
  const assets = gm?.assets;

  return (
    <div id="container">
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 10_000_000, position: [0, 0, 15] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Suspense fallback={null}>
          {/* Basic lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />

          {/* Game Loop Runner */}
          <GameLoop gameManager={gm} />

          {/* Global State Initializer */}
          <GlobalStateInitializer gameManager={gm} />

          {/* --- Conditional Rendering of R3F Scene Content --- */}

          {gameState === "space_flight" && gm && (
            // Remove HUD props, SpaceFlightScreen uses useHudState
            <SpaceFlightScreen gameManager={gm} />
          )}

          {gameState === "title" &&
            assets?.titleShips &&
            assets.titleShips.map((ship, index) => (
              <ShipComponent
                key={`title-ship-${index}`}
                modelPath={ship.modelPath}
                initialScale={SHIP_SCALE}
                wireframeColor={0x00ffff}
                visible={true} // Visibility controlled by hook/GameManager internally now
                // Position/animation handled by useTitleLogic interacting with GM assets
              />
            ))}

          {gameState === "undocking" && <UndockingSquares visible={true} />}

          {/* Add other state-specific R3F components here if needed */}
        </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="overlay" style={{ zIndex: 1, position: "relative" }}>
        {renderSceneUIComponent()} {/* Render the UI overlay */}
      </div>

      {/* Audio Elements & Coordinates Display */}
      {/* CoordinatesDisplay now uses useHudState hook */}
      {gameState === "space_flight" && <CoordinatesDisplay />}
      <audio ref={introMusicRef} id="introMusic" loop>
        <source src="assets/elite_intro_music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={undockSoundRef} id="undockSound">
        <source src="assets/undocking_sound.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default App;
