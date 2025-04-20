// src/components/App.tsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos";
import { generatePlanets } from "@/classes/PlanetInfo";
import { useAssets } from "@/hooks/useAssets";
import { useAudioManager } from "@/hooks/useAudioManager";
import * as Constants from "@/constants";

// Import Scene UI Overlay Components
import LoadingScreen from "@/features/loading/LoadingScreen";
import TitleScreen from "@/features/title/TitleScreen";
import CreditsScreen from "@/features/credits/CreditsScreen";
import StatsScreen from "@/features/stats/StatsScreen";
// CoordinatesDisplay is now part of SpaceFlightScreenUI
import SpaceFlightScreenUI from "@/features/space_flight/SpaceFlightScreenUI";
import ShortRangeChartScreen from "@/features/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "@/features/planet_info/PlanetInfoScreen";
import UndockingScreen from "@/features/undocking/UndockingScreen";

// Import R3F Scene Content Components
import UndockingSquares from "@/components/r3f/UndockingSquares";
import TitleSceneR3F from "@/features/title/TitleSceneR3F";
import SpaceFlightSceneR3F from "@/features/space_flight/SpaceFlightSceneR3F";
import { useInputSetup } from "@/hooks/useInput";

const GlobalStateInitializer: React.FC = () => {
  useInputSetup();
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();
  const { isLoadingComplete } = useAssets();

  useEffect(() => {
    if (isLoadingComplete) {
      console.log("Initializing global planet state...");
      const generatedPlanets = generatePlanets(
        Constants.PLANET_SEED,
        Constants.PLANET_COUNT
      );
      setPlanetInfos(generatedPlanets);
      if (generatedPlanets.length > 0) {
        setCurrentPlanetName(generatedPlanets[0].name); // Use defined constant
        console.log(
          `Set initial planet: ${
            generatedPlanets[Constants.INITIAL_PLANET_INDEX].name
          }`
        );
      } else {
        console.error("No planets generated!");
      }
    }
  }, [isLoadingComplete, setPlanetInfos, setCurrentPlanetName]);

  return null;
};

const App: React.FC = () => {
  const { gameState } = useGameState();
  const { load, assets, isLoadingComplete } = useAssets();
  const { introMusicRef, undockSoundRef } = useAudioManager();

  useEffect(() => {
    load(); // Load assets on mount
  }, [load]);

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
          return <SpaceFlightScreenUI />;
        case "short_range_chart":
          return <ShortRangeChartScreen />;
        case "planet_info":
          return <PlanetInfoScreen />;
        default:
          return (
            <div className="center-text">Unknown Game State: {gameState}</div>
          );
      }
    } catch (error) {
      console.error(
        `An error occurred rendering the UI Overlay for <${
          gameState || "Unknown"
        }>.`,
        error
      );
      return <div className="center-text">Error rendering UI.</div>;
    }
  };

  const renderSceneR3FContent = () => {
    if (!assets) return null;

    switch (gameState) {
      case "title":
        return <TitleSceneR3F assets={assets} introMusicRef={introMusicRef} />;
      case "undocking":
        // UndockingSquares are now controlled by their own visibility prop triggered by the gameState check below
        return null; // Or render a specific minimal scene if desired
      case "space_flight":
        // Render the dedicated R3F scene component
        return <SpaceFlightSceneR3F />; // <-- Use new R3F component
      // Add other cases if different states have unique 3D scenes
      default:
        // Render nothing or a default empty scene
        return null;
    }
  };

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  }
  if (!assets) {
    console.log("Waiting for assets to be set...");
    return <LoadingScreen />;
  }

  return (
    <div id="container">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: Constants.CAMERA_FAR_PLANE,
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
          <ambientLight intensity={0.6} /> {/* Slightly adjusted intensity */}
          <directionalLight
            position={[10, 15, 5]}
            intensity={1.0}
            castShadow
          />{" "}
          {/* Global State Initializer (Planets) */}
          <GlobalStateInitializer />
          {renderSceneR3FContent()}
          <UndockingSquares visible={gameState === "undocking"} />
        </Suspense>
      </Canvas>

      <div className="overlay">{renderSceneUIComponent()}</div>
    </div>
  );
};

export default App;
