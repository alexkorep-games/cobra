// src/components/App.tsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "@/features/common/usePlanetInfos";
import { generatePlanets, PlanetInfo } from "@/classes/PlanetInfo";
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
import BuyCargoScreen from "@/features/buy_cargo/BuyCargoScreen"; // Added
import SellCargoScreen from "@/features/sell_cargo/SellCargoScreen"; // Added

// Import R3F Scene Content Components
import UndockingSquares from "@/components/r3f/UndockingSquares";
import TitleSceneR3F from "@/features/title/TitleSceneR3F";
import SpaceFlightSceneR3F from "@/features/space_flight/SpaceFlightSceneR3F";
import { useInputSetup } from "@/hooks/useInput";
import { MarketGenerator } from "@/classes/Market";
import { useMarketState } from "@/features/common/useMarketState";

const GlobalStateInitializer: React.FC = () => {
  useInputSetup();
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();
  const { isLoadingComplete } = useAssets();
  const { setMarket } = useMarketState(); // Get the market setter function

  useEffect(() => {
    if (isLoadingComplete) {
      console.log("Initializing global planet state...");
      const generatedPlanets: PlanetInfo[] = generatePlanets(
        Constants.PLANET_SEED,
        Constants.PLANET_COUNT
      );
      setPlanetInfos(generatedPlanets);
      if (generatedPlanets.length > 0) {
        const initialPlanet = generatedPlanets[Constants.INITIAL_PLANET_INDEX];
        setCurrentPlanetName(initialPlanet.name);
        console.log(`Set initial planet: ${initialPlanet.name}`);

        // Generate initial market for the starting planet *directly inside the effect*
        console.log(`Generating initial market for ${initialPlanet.name}...`);
        const visitSerial = 0; // Define visit serial locally or get from state if needed
        const marketData = MarketGenerator.generate(
          initialPlanet,
          Constants.PLANET_SEED, // Use constant galaxy seed
          visitSerial // Use visit serial
        );
        setMarket(marketData); // Use the setter from useMarketState
        console.log("Initial market generated and set.");
      } else {
        console.error("No planets generated!");
        setMarket(null); // Clear market if no planets
      }
    }
  }, [
    // Dependencies are now stable state/setters or values that change predictably
    isLoadingComplete,
    setPlanetInfos,
    setCurrentPlanetName,
    setMarket,
  ]);

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
        case "buy_cargo":
          return <BuyCargoScreen />;
        case "sell_cargo":
          return <SellCargoScreen />;
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
      case "buy_cargo":
      case "sell_cargo":
      case "stats":
      case "credits":
      case "loading":
      case "short_range_chart":
      case "planet_info":
        // Render nothing specific for these UI-heavy states, assuming they overlay
        // or the background doesn't need complex 3D elements unique to them.
        return null;
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

  // TODO move to a scene
  const showUndockingSquares = gameState === "undocking";

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
          <UndockingSquares visible={showUndockingSquares} />
        </Suspense>
      </Canvas>

      <div className="overlay">{renderSceneUIComponent()}</div>
    </div>
  );
};

export default App;
