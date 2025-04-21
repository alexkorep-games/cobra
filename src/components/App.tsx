// src/components/App.tsx
import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useGameState } from "@/hooks/useGameState";
import { usePlanetInfos } from "@/hooks/usePlanetInfos";
import { generatePlanets, PlanetInfo } from "@/classes/PlanetInfo";
import { useAssets } from "@/hooks/useAssets";
import { useAudioManager } from "@/hooks/useAudioManager";
import * as Constants from "@/constants";
import { useInputSetup } from "@/hooks/useInput";
import { MarketGenerator } from "@/classes/Market";
import { useMarketState } from "@/hooks/useMarketState";

// --- Import Scene UI Overlay Components ---
import LoadingScreen from "@/screens/loading/LoadingScreen";
import TitleScreen from "@/screens/title/TitleScreen";
import CreditsScreen from "@/screens/credits/CreditsScreen";
import StatsScreen from "@/screens/stats/StatsScreen";
import SpaceFlightScreenUI from "@/screens/space_flight/SpaceFlightScreenUI";
import ShortRangeChartScreen from "@/screens/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "@/screens/planet_info/PlanetInfoScreen";
import UndockingScreen from "@/screens/undocking/UndockingScreen";
import BuyCargoScreen from "@/screens/buy_cargo/BuyCargoScreen";
import SellCargoScreen from "@/screens/sell_cargo/SellCargoScreen";
import TargetPlanetPricesScreen from "@/screens/target_planet_prices/TargetPlanetPricesScreen";
import HyperspaceScreen from "@/screens/hyperspace_jump/HyperspaceScreen";
import BottomToolbar from "@/components/hud/BottomToolbar";
import SpaceFlightToolbar from "@/components/hud/SpaceFlightToolbar";
import TouchControlsOverlay from "@/components/touch/TouchControlsOverlay";

// --- Import R3F Scene Content Components ---
import UndockingSquares from "@/components/r3f/UndockingSquares";
import TitleSceneR3F from "@/screens/title/TitleSceneR3F";
import SpaceFlightSceneR3F from "@/screens/space_flight/SpaceFlightSceneR3F";
import HyperspaceAnimation from "@/components/r3f/HyperspaceAnimation";

// --- Import Logic Hooks for States ---
import { useHyperspaceLogic } from "@/screens/hyperspace_jump/useHyperspaceLogic";

const GlobalStateInitializer: React.FC = () => {
  useInputSetup();
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();
  const { isLoadingComplete } = useAssets();
  const { setMarket } = useMarketState();

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

        console.log(`Generating initial market for ${initialPlanet.name}...`);
        const visitSerial = 0;
        const initialMarket = MarketGenerator.generate(
          initialPlanet,
          Constants.PLANET_SEED,
          visitSerial
        );
        setMarket(initialMarket);
        console.log("Initial market generated and set.");
      } else {
        console.error("No planets generated!");
        setMarket(null);
      }
    }
  }, [isLoadingComplete, setPlanetInfos, setCurrentPlanetName, setMarket]);

  return null;
};

const App: React.FC = () => {
  const { gameState } = useGameState();
  const { load, assets, isLoadingComplete } = useAssets();
  const { introMusicRef, undockSoundRef } = useAudioManager();

  // --- Initialize State Logic Hooks ---
  // Initialize hooks for states that need continuous logic or setup/cleanup
  // Note: Some hooks might be called directly within their respective screen components if simpler
  useHyperspaceLogic(); // Initialize hyperspace logic

  useEffect(() => {
    load();
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
        case "target_planet_prices":
          return <TargetPlanetPricesScreen />;
        case "hyperspace_jump":
          return <HyperspaceScreen />;
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
      case "space_flight":
        return <SpaceFlightSceneR3F />;
      // R3F content for docked/info/animation screens
      case "undocking": // UndockingSquares are handled separately below
      case "hyperspace_jump": // HyperspaceAnimation handled separately below
      case "buy_cargo":
      case "sell_cargo":
      case "stats":
      case "credits":
      case "loading":
      case "short_range_chart":
      case "planet_info":
      case "target_planet_prices":
        return null;
      default:
        return null;
    }
  };

  if (!isLoadingComplete || !assets) {
    return <LoadingScreen />;
  }

  // Determine visibility for special R3F effects based on state
  const showUndockingSquares = gameState === "undocking";
  const showHyperspaceAnimation = gameState === "hyperspace_jump";

  // Determine which toolbar to show
  const showDockedToolbar = [
    "buy_cargo",
    "sell_cargo",
    "planet_info",
    "stats",
    "short_range_chart",
    "target_planet_prices",
  ].includes(gameState);

  const showFlightToolbar = gameState === "space_flight";

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
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 15, 5]} intensity={1.0} castShadow />
          <GlobalStateInitializer />
          {renderSceneR3FContent()}
          <UndockingSquares visible={showUndockingSquares} />
          <HyperspaceAnimation visible={showHyperspaceAnimation} />
        </Suspense>
      </Canvas>

      {/* --- UI Overlay --- */}
      <div className="overlay">
        {/* Render the main UI component for the current state */}
        {renderSceneUIComponent()}
        {/* Render Touch Controls Overlay (handles its own mobile visibility) */}
        <TouchControlsOverlay />
        {/* Conditionally render the correct Bottom Toolbar */}
        {showDockedToolbar && <BottomToolbar />}
        {showFlightToolbar && <SpaceFlightToolbar />}
      </div>
    </div>
  );
};

export default App;
