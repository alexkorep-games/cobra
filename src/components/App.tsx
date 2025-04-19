// src/components/App.tsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos";
import { generatePlanets } from "@/classes/PlanetInfo";
import { useAssetLoader } from "@/hooks/useAssetLoader";
import { useAudioManager } from "@/hooks/useAudioManager";
import * as Constants from "@/constants";

// Import Scene Components
import LoadingScreen from "@/features/loading/LoadingScreen";
import TitleScreen from "@/features/title/TitleScreen"; // This is now just the UI overlay
import CreditsScreen from "@/features/credits/CreditsScreen";
import StatsScreen from "@/features/stats/StatsScreen";
import CoordinatesDisplay from "@/components/hud/CoordinatesDisplay";
import SpaceFlightScreen from "@/features/space_flight/SpaceFlightScreen"; // This likely needs to be an R3F component too
import ShortRangeChartScreen from "@/features/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "@/features/planet_info/PlanetInfoScreen";
import UndockingScreen from "@/features/undocking/UndockingScreen"; // This is just the UI overlay

// Import R3F Entity Components / Scenes
import UndockingSquares from "@/components/r3f/UndockingSquares";
import TitleSceneR3F from "@/features/title/TitleSceneR3F"; // --- IMPORT THE NEW R3F COMPONENT ---

const GlobalStateInitializer: React.FC = () => {
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();
  const { isLoadingComplete } = useAssetLoader();

  useEffect(() => {
    if (isLoadingComplete) {
      console.log("Initializing global planet state...");
      const generatedPlanets = generatePlanets(
        Constants.PLANET_SEED,
        Constants.PLANET_COUNT
      );
      setPlanetInfos(generatedPlanets);
      if (generatedPlanets.length > 0) {
        setCurrentPlanetName(generatedPlanets[0].name);
        console.log(`Set initial planet: ${generatedPlanets[0].name}`);
      } else {
        console.error("No planets generated!");
      }
    }
  }, [isLoadingComplete, setPlanetInfos, setCurrentPlanetName]);

  return null;
};

const App: React.FC = () => {
  const { gameState } = useGameState();
  const { assets, isLoadingComplete } = useAssetLoader();
  const { introMusicRef, undockSoundRef } = useAudioManager();

  const renderSceneUIComponent = () => {
    try {
      switch (gameState) {
        case "loading":
          return <LoadingScreen />;
        case "title":
          return <TitleScreen />;
        case "credits":
          return <CreditsScreen />;
        case "stats":
          return <StatsScreen />;
        case "undocking":
          return <UndockingScreen undockSoundRef={undockSoundRef} />;
        case "space_flight":
          return <CoordinatesDisplay />;
        case "short_range_chart":
          return <ShortRangeChartScreen />;
        case "planet_info":
          return <PlanetInfoScreen />;
        default:
          return null;
      }
    } catch (error) {
      console.error(
        `An error occurred rendering the UI Overlay for <${
          gameState || "Unknown"
        }>.`,
        error
      );
      return <div>An error occurred rendering this screen overlay.</div>;
    }
  };

  if (!isLoadingComplete || !assets) {
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
        }}
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
          {/* Global State Initializer (Planets) */}
          <GlobalStateInitializer />
          // --- Conditional Rendering of R3F Scene Content ---
          {gameState === "title" && assets && (
            <TitleSceneR3F assets={assets} introMusicRef={introMusicRef} />
          )}
          {assets && <UndockingSquares visible={gameState === "undocking"} />}
          {gameState === "space_flight" && assets && (
            <SpaceFlightScreen assets={assets} />
          )}
        </Suspense>
      </Canvas>

      <div id="ui-overlay" style={{ zIndex: 1 }}>
        {renderSceneUIComponent()}
      </div>
    </div>
  );
};

export default App;
