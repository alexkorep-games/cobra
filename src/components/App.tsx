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

// Import Scene UI Overlay Components
import LoadingScreen from "@/screens/loading/LoadingScreen";
import TitleScreen from "@/screens/title/TitleScreen";
import CreditsScreen from "@/screens/credits/CreditsScreen";
import StatsScreen from "@/screens/stats/StatsScreen";
import SpaceFlightScreenUI from "@/screens/space_flight/SpaceFlightScreenUI"; // Includes Coordinates and BottomHud
import ShortRangeChartScreen from "@/screens/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "@/screens/planet_info/PlanetInfoScreen";
import UndockingScreen from "@/screens/undocking/UndockingScreen";
import BuyCargoScreen from "@/screens/buy_cargo/BuyCargoScreen";
import SellCargoScreen from "@/screens/sell_cargo/SellCargoScreen";
import TargetPlanetPricesScreen from "@/screens/target_planet_prices/TargetPlanetPricesScreen"; // <-- Import new screen
import BottomToolbar from "@/components/hud/BottomToolbar"; // *** IMPORT THE NEW TOOLBAR ***

// Import R3F Scene Content Components
import UndockingSquares from "@/components/r3f/UndockingSquares";
import TitleSceneR3F from "@/screens/title/TitleSceneR3F";
import SpaceFlightSceneR3F from "@/screens/space_flight/SpaceFlightSceneR3F";

const GlobalStateInitializer: React.FC = () => {
  useInputSetup();
  const { setPlanetInfos, setCurrentPlanetName } = usePlanetInfos();
  const { isLoadingComplete } = useAssets();
  const { setMarket } = useMarketState(); // Get the market setter directly

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
        setCurrentPlanetName(initialPlanet.name); // Update current planet name state
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

  useEffect(() => {
    load();
  }, [load]);

  const renderSceneUIComponent = () => {
    // No changes needed inside this function itself,
    // the toolbar is rendered *outside* based on gameState
    try {
      switch (gameState) {
        case "loading":
          return <LoadingScreen />;
        case "title":
          return <TitleScreen />;
        case "credits":
          return <CreditsScreen />;
        case "stats":
          return <StatsScreen />; // Will render content, toolbar rendered below
        case "undocking":
          return <UndockingScreen undockSoundRef={undockSoundRef} />;
        case "space_flight":
          // SpaceFlightScreenUI now implicitly includes CoordinatesDisplay and BottomHud
          return <SpaceFlightScreenUI />;
        case "short_range_chart":
          return <ShortRangeChartScreen />; // Will render content, toolbar rendered below
        case "planet_info":
          return <PlanetInfoScreen />; // Will render content, toolbar rendered below
        case "buy_cargo":
          return <BuyCargoScreen />; // Will render content, toolbar rendered below
        case "sell_cargo":
          return <SellCargoScreen />; // Will render content, toolbar rendered below
        case "target_planet_prices": // <-- Add case for new screen
          return <TargetPlanetPricesScreen />;
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
        return null;
      case "space_flight":
        return <SpaceFlightSceneR3F />;
      // R3F content for docked/info screens is likely null or minimal
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
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 15, 5]} intensity={1.0} castShadow />
          <GlobalStateInitializer />
          {renderSceneR3FContent()}
          <UndockingSquares visible={showUndockingSquares} />
        </Suspense>
      </Canvas>

      {/* --- UI Overlay --- */}
      <div className="overlay">
        {/* Render the main UI component for the current state */}
        {renderSceneUIComponent()}

        {/* *** Conditionally render the NEW BottomToolbar *** */}
        {/* The toolbar component itself checks the state now */}
        <BottomToolbar />

        {/* NOTE: SpaceFlightScreenUI now renders the BottomHud internally */}
        {/* Do NOT render BottomHud here globally */}
      </div>
    </div>
  );
};

export default App;
