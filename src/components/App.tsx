// src/components/App.tsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos";
import { generatePlanets } from "@/classes/PlanetInfo";
import { useAssetLoader } from "@/hooks/useAssetLoader";
import { useAudioManager } from "@/hooks/useAudioManager"; // Make sure this is imported
import * as Constants from "@/constants";

// Import Scene Components
import LoadingScreen from "@/features/loading/LoadingScreen";
import TitleScreen from "@/features/title/TitleScreen";
import CreditsScreen from "@/features/credits/CreditsScreen";
import StatsScreen from "@/features/stats/StatsScreen";
import CoordinatesDisplay from "@/components/hud/CoordinatesDisplay";
import SpaceFlightScreen from "@/features/space_flight/SpaceFlightScreen";
import ShortRangeChartScreen from "@/features/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "@/features/planet_info/PlanetInfoScreen";
import UndockingScreen from "@/features/undocking/UndockingScreen"; // Import UndockingScreen

// Import R3F Entity Components
import ShipComponent from "@/components/r3f/ShipComponent";
import UndockingSquares from "@/components/r3f/UndockingSquares";
import PlanetComponent from "@/components/r3f/PlanetComponent";

const GlobalStateInitializer: React.FC = () => {
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();
  const { isLoadingComplete } = useAssetLoader(); // Use asset loader state as trigger

  useEffect(() => {
    // Generate planets once assets are loaded (or based on another trigger)
    if (isLoadingComplete) {
      console.log("Initializing global planet state...");
      const generatedPlanets = generatePlanets(
        Constants.PLANET_SEED,
        Constants.PLANET_COUNT
      );
      setPlanetInfos(generatedPlanets);
      if (generatedPlanets.length > 0) {
        setCurrentPlanetName(generatedPlanets[0].name); // Set initial current planet
        console.log(`Set initial planet: ${generatedPlanets[0].name}`);
      } else {
        console.error("No planets generated!");
      }
    }
  }, [isLoadingComplete, setPlanetInfos, setCurrentPlanetName]); // Rerun if loading completes

  return null;
};

const App: React.FC = () => {
  const { gameState } = useGameState();
  const { assets, isLoadingComplete } = useAssetLoader();
  const { introMusicRef, undockSoundRef } = useAudioManager(); // Get audio refs

  // Function to render the correct scene UI component based on gameState
  const renderSceneUIComponent = () => {
    try {
      // Add try-catch for better error reporting during rendering
      switch (gameState) {
        case "loading":
          return <LoadingScreen />;
        case "title":
          // Pass assets and introMusicRef as props
          return <TitleScreen assets={assets} introMusicRef={introMusicRef} />;
        case "credits":
          return <CreditsScreen />;
        case "stats":
          return <StatsScreen />;
        case "undocking":
          // Pass undockSoundRef as prop
          return <UndockingScreen undockSoundRef={undockSoundRef} />;
        case "space_flight":
          return null; // R3F component handles HUD via hook
        case "short_range_chart":
          return <ShortRangeChartScreen />;
        case "planet_info":
          return <PlanetInfoScreen />;
        default:
          return null;
      }
    } catch (error) {
      console.error(
        `An error occurred in the <${gameState || "Unknown"}> component.`,
        error
      );
      // Optionally render a fallback UI
      return <div>An error occurred rendering this screen.</div>;
    }
  };

  // --- Render ---
  // Conditional rendering based on loading state
  if (!isLoadingComplete || !assets) {
    // Optionally return a minimal loading indicator here,
    // although LoadingScreen handles the primary loading UI
    // return <div>Core Loading...</div>;
    // Render LoadingScreen UI while assets are null/loading
    return <LoadingScreen />;
  }

  return (
    <div id="container">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: Constants.CAMERA_FAR_PLANE,
          position: [0, 0, 15],
        }} // Use constant
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
          {/* Removed GameLoop component */}
          {/* Global State Initializer (Planets) */}
          <GlobalStateInitializer />
          // --- Conditional Rendering of R3F Scene Content ---
          {/* Undocking Animation - Pass visibility based on gameState */}
          {assets && <UndockingSquares visible={gameState === "undocking"} />}
          {/* Space Flight Scene (includes Planet, Station, Pirates) */}
          {gameState === "space_flight" && assets && (
            <SpaceFlightScreen assets={assets} />
          )}
          {/* Title Ships & Planet - Visibility/Positioning now handled by useTitleLogic state */}
          {/* Use the visualState returned from the hook (if you modify the hook to return it) */}
          {/* OR keep the conditional rendering here but ensure the hook updates state */}
          {/* For simplicity, let's assume useTitleLogic modifies some shared state or the R3F components directly use it */}
          {/* The R3F components for title need to be rendered conditionally but ALSO need */}
          {/* access to the visual state calculated by useTitleLogic. */}
          {/* This might require returning visualState from useTitleLogic and passing it down */}
          {/* OR having useTitleLogic update a Jotai atom that the R3F components read */}
          {/* --- TEMPORARY FIX: Keep conditional rendering, assume hook controls refs/state indirectly --- */}
          {/* Title Ships */}
          {gameState === "title" &&
            assets?.titleShips &&
            assets.titleShips.map((ship, index) => (
              <ShipComponent
                key={`title-ship-${index}`}
                modelPath={ship.modelPath}
                initialScale={Constants.SHIP_SCALE}
                wireframeColor={0x00ffff}
                // TODO: Connect visibility/position/rotation to state managed by useTitleLogic
                visible={gameState === "title"} // Simplistic visibility
              />
            ))}
          {/* Title Planet */}
          {gameState === "title" && assets?.planet && (
            <PlanetComponent
              radius={assets.planet.radius}
              color={assets.planet.color}
              // TODO: Connect visibility/position/scale to state managed by useTitleLogic
              visible={gameState === "title"} // Simplistic visibility
              position={[200, 0, -500]} // Example initial position
            />
          )}
          {/* Add other global R3F components if needed */}
        </Suspense>
      </Canvas>

      {/* --- UI Overlay --- */}
      <div id="ui-overlay" style={{ zIndex: 1 }}>
        {/* Render the current scene's UI component */}
        {renderSceneUIComponent()}

        {/* Render HUD components conditionally */}
        {gameState === "space_flight" && <CoordinatesDisplay />}
        {/* Add other HUD elements here, potentially consuming useHudState */}
        {/* Example: <SpeedIndicator speed={speed} /> */}
        {/* Example: <RadarDisplay positions={radarPositions} /> */}
      </div>

      {/* Audio elements (hidden) - Refs managed by useAudioManager */}
      {/* No need to render them explicitly if refs are handled */}
    </div>
  );
};

export default App;
