import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { GameState, RadarPosition, GameAssets } from "@/types"; // Adjusted imports
import { useGameState } from "@/features/common/useGameState";
import { useHudState } from "@/features/common/useHudState";
import {
  usePlanetInfos,
  PlanetInfosProvider,
} from "@/features/common/usePlanetInfos"; // Keep PlanetInfosProvider
import {
  generatePlanets,
  PLANET_SEED,
  PLANET_COUNT,
} from "@/classes/PlanetInfo";
import { useAssetLoader } from "@/hooks/useAssetLoader"; // Import new hook
import { useAudioManager } from "@/hooks/useAudioManager"; // Import new hook
import * as Constants from "@/constants"; // Keep constants

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
import PlanetComponent from "@/components/r3f/PlanetComponent"; // Import if needed globally
import SpaceStationComponent from "@/components/r3f/SpaceStationComponent"; // Import if needed globally

// Removed GameLoop component

// Helper component to initialize global planet state
const GlobalStateInitializer: React.FC = () => {
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();
  const { isLoadingComplete } = useAssetLoader(); // Use asset loader state as trigger

  useEffect(() => {
    // Generate planets once assets are loaded (or based on another trigger)
    if (isLoadingComplete) {
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
  }, [isLoadingComplete, setPlanetInfos, setCurrentPlanetName]); // Rerun if loading completes

  return null;
};

const AppContent: React.FC = () => {
  // --- Global State Hooks ---
  const { gameState } = useGameState(); // Keep gameState
  const { assets, isLoadingComplete } = useAssetLoader(); // Use asset loader
  const { introMusicRef, undockSoundRef } = useAudioManager(); // Use audio manager
  // HUD state can be used directly by HUD components or passed if needed
  const {
    coordinates,
    speed,
    roll,
    pitch,
    altitude,
    laserHeat,
    stationDirection,
    radarPositions,
  } = useHudState();

  // --- Helper Functions ---
  // Function to render the correct scene UI component based on gameState
  const renderSceneUIComponent = () => {
    // Pass necessary props like assets or audio refs if UI components need them
    switch (gameState) {
      case "loading":
        // LoadingScreen uses its own hook now
        return <LoadingScreen />;
      case "title":
        // Pass assets if TitleScreen UI needs them (e.g., display ship names)
        return <TitleScreen />;
      case "credits":
        return <CreditsScreen />;
      case "stats":
        return <StatsScreen />;
      case "undocking":
        return <UndockingScreen />;
      case "space_flight":
        // SpaceFlightScreen renders its own HUD via useHudState hook
        return null; // No separate UI overlay needed here
      case "short_range_chart":
        // Pass assets if needed
        return <ShortRangeChartScreen />;
      case "planet_info":
        // Pass assets if needed
        return <PlanetInfoScreen />;
      default:
        return null;
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

          {/* --- Conditional Rendering of R3F Scene Content --- */}

          {/* Undocking Animation */}
          {gameState === "undocking" && <UndockingSquares />}

          {/* Space Flight Scene (includes Planet, Station, Pirates) */}
          {/* Pass assets directly */}
          {gameState === "space_flight" && assets && (
            <SpaceFlightScreen
              assets={assets}
              // Pass HUD values needed for R3F logic (if any)
              // speed={speed} // Example if needed by R3F physics
            />
          )}

          {/* Title Ships - Render based on assets */}
          {/* Visibility/Positioning now handled within useTitleLogic/TitleScreen R3F part */}
          {gameState === "title" &&
            assets?.titleShips &&
            assets.titleShips.map((ship, index) => (
              <ShipComponent
                key={`title-ship-${index}`}
                modelPath={ship.modelPath}
                initialScale={Constants.SHIP_SCALE}
                wireframeColor={0x00ffff}
                // Visibility and position/animation likely controlled by useTitleLogic state
                // or a dedicated Title R3F component using useFrame
                visible={false} // Start hidden, logic hook/component will manage
              />
            ))}

          {/* Title Planet - Render based on assets */}
          {gameState === "title" && assets?.planet && (
            <PlanetComponent
              radius={assets.planet.radius}
              color={assets.planet.color}
              // Visibility and position controlled by useTitleLogic state
              // or a dedicated Title R3F component
              visible={false} // Start hidden
              position={[200, 0, -500]} // Example initial position from old logic
              scale={[1, 1, 1]}
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

// Wrap AppContent with providers
const App: React.FC = () => {
  return (
    <PlanetInfosProvider>
      {" "}
      {/* Keep PlanetInfosProvider */}
      <AppContent />
    </PlanetInfosProvider>
  );
};

export default App;
