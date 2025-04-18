import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
// Use RadarPosition from types.ts
import { GameState, RadarPosition, ReactSetters } from "../types";
import { GameManager } from "../game/GameManager";

// Import Scene Components
import LoadingScreen from "../features/loading/LoadingScreen";
import TitleScreen from "../features/title/TitleScreen";
import CreditsScreen from "../features/credits/CreditsScreen";
import StatsScreen from "../features/stats/StatsScreen";
import CoordinatesDisplay from "./hud/CoordinatesDisplay";
import SpaceFlightScreen from "../features/space_flight/SpaceFlightScreen";
import { PlanetInfo, calculateDistance } from "../classes/PlanetInfo"; // Moved PLANET constants here or import from constants.ts
import ShortRangeChartScreen from "../features/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "../features/planet_info/PlanetInfoScreen";
import UndockingScreen from "../features/undocking/UndockingScreen";

// Import R3F Entity Components
import PlanetComponent from "./r3f/PlanetComponent";
import SpaceStationComponent from "./r3f/SpaceStationComponent";
import ShipComponent from "./r3f/ShipComponent";
import UndockingSquares from "./r3f/UndockingSquares"; // Import the new component

// Import Scene Logic Hooks
import { useLoadingLogic } from "../features/loading/useLoadingLogic";
import { useTitleLogic } from "../features/title/useTitleLogic";
import { useCreditsLogic } from "../features/credits/useCreditsLogic";
import { useStatsLogic } from "../features/stats/useStatsLogic";
import { useUndockingLogic } from "../features/undocking/useUndockingLogic";
import { useShortRangeChartLogic } from "../features/short_range_chart/useShortRangeChartLogic";
import { usePlanetInfoLogic } from "../features/planet_info/usePlanetInfoLogic";
import { INITIAL_PLANET_INDEX, JUMP_RANGE } from "../constants";

// Helper component to run GameManager update loop
const GameLoop: React.FC<{ gameManager: GameManager | null }> = ({ gameManager }) => {
  useFrame((_, delta) => { // Changed state to _
    gameManager?.update(delta);
  });
  return null; // This component doesn't render anything itself
};

const App: React.FC = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>("loading");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number, number]>([0, 0, 0]);
  const [speed, setSpeed] = useState<number>(0); // 0-100%
  const [roll, setRoll] = useState<number>(0); // -1 to 1
  const [pitch, setPitch] = useState<number>(0); // -1 to 1 (Dive/Climb)
  const [laserHeat, setLaserHeat] = useState<number>(0); // 0-100%
  const [altitude, setAltitude] = useState<number>(0); // 0-100%
  const [stationDirection, setStationDirection] = useState<{
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null>(null); // Updated to use object structure
  // Use RadarPosition type for radarPositions state
  const [radarPositions, setRadarPositions] = useState<RadarPosition[]>([]);

  // --- Planet Info State ---
  // These are now set by GameManager via reactSetters
  const [planetInfos, setPlanetInfos] = useState<PlanetInfo[]>([]);
  // Initialize currentPlanetIndex as empty string, GameManager will set the correct one
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState<string>("");
  const [selectedPlanetName, setSelectedPlanetName] = useState<string | null>(null);

  // --- Refs ---
  // canvasRef is no longer needed for direct Three.js init
  const gameManagerRef = useRef<GameManager | null>(null);
  const introMusicRef = useRef<HTMLAudioElement>(null);
  const undockSoundRef = useRef<HTMLAudioElement>(null);

  // --- Game Logic Initialization Effect ---
  useEffect(() => {
    if (gameManagerRef.current) {
      console.log("GameManager instance already exists, skipping init.");
      return;
    }

    console.log("Initializing GameManager...");

    // Create the ReactSetters object with all the state setters
    const reactSetters: ReactSetters = {
      setGameState,
      setCoordinates,
      setSpeed,
      setRoll,
      setPitch,
      setLaserHeat,
      setAltitude,
      setStationDirection,
      setRadarPositions: setRadarPositions,
      setPlanetInfos, // For GameManager to set generated planets
      setCurrentPlanetIndex,
      setSelectedPlanetName // To sync selected planet between GM and React state
    };

    const gameManager = new GameManager(
      reactSetters,
      introMusicRef,
      undockSoundRef
    );

    const handleLoadingComplete = () => {
      console.log("React notified that loading is complete.");
      setIsLoadingComplete(true);
    };

    // Pass the loading callback, but not the canvas
    gameManager.init(handleLoadingComplete);
    gameManagerRef.current = gameManager;

    return () => {
      if (gameManagerRef.current === gameManager) {
        console.log("Cleaning up active GameManager instance.");
        gameManagerRef.current?.dispose();
        gameManagerRef.current = null;
      } else if (gameManager) { // Check if gameManager exists before disposing potential orphan
        console.log("Cleaning up potentially orphaned GameManager instance.");
        gameManager.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Log gameState changes
  useEffect(() => {
    console.log(`[App.tsx] gameState changed to: ${gameState}`);
  }, [gameState]);

  // --- Invoke Scene Logic Hooks ---
  // Pass gameManagerRef.current and the active state flag
  useLoadingLogic(gameManagerRef.current, gameState === 'loading', isLoadingComplete);
  useTitleLogic(gameManagerRef.current, gameState === 'title');
  useCreditsLogic(gameManagerRef.current, gameState === 'credits');
  useStatsLogic(gameManagerRef.current, gameState === 'stats');
  useUndockingLogic(gameManagerRef.current, gameState === 'undocking');
  useShortRangeChartLogic(gameManagerRef.current, gameState === 'short_range_chart');
  usePlanetInfoLogic(gameManagerRef.current, gameState === 'planet_info');

  // SpaceFlight logic is handled internally by GameManager's SpaceFlightSceneLogic class

  // --- Helper Functions ---

  // Function to render the correct scene component based on gameState
  const renderSceneComponent = () => {
    switch (gameState) {
      case "loading":
        return <LoadingScreen isLoadingComplete={isLoadingComplete} />;
      case "title":
        return <TitleScreen />;
      case "credits":
        return <CreditsScreen />;
      case "stats":
        return <StatsScreen />;
      case "undocking":
        return <UndockingScreen />;
      case "space_flight":
        return (
          <SpaceFlightScreen
            speed={speed}
            roll={roll}
            pitch={pitch}
            altitude={altitude}
            laserHeat={laserHeat} // Pass laser heat
            stationDirection={stationDirection}
            radarPosition={radarPositions} // Prop name matches state name
          />
        );
        case "short_range_chart":
          // Pass necessary data from GameManager or state
          return (
            <ShortRangeChartScreen
              planets={planetInfos}
              currentPlanetIndex={currentPlanetIndex} // Now read from React state
              selectedPlanetName={selectedPlanetName} // Now read from React state
              jumpRange={JUMP_RANGE} // Use constant from PlanetInfo or constants.ts
              setSelectedPlanetName={(name) => gameManagerRef.current?.setSelectedPlanetName(name)} // Keep callback to GM
            />
          );
        case "planet_info":
          // Find the selected planet data to pass
          const currentPlanet = planetInfos.find(p => p.name === currentPlanetIndex);
          const selectedPlanet = planetInfos.find(p => p.name === selectedPlanetName);

          // Calculate distance if both planets are found
          const distance = selectedPlanet && currentPlanet
              ? calculateDistance(currentPlanet.coordinates, selectedPlanet.coordinates) // Use imported function
              : 0;
          return selectedPlanet ? (
               <PlanetInfoScreen planet={selectedPlanet} distance={distance} />
          ) : (
               <div>Error: No planet selected</div> // Fallback
          );

      default: // Add a default case
        return null; // Or a default component/error message
    }
  };

  // --- Render ---
  const gm = gameManagerRef.current;
  const assets = gm?.assets;

  return (
    <div id="container">
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 10_000_000, position: [0, 0, 15] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      >
         <Suspense fallback={null}>
            {/* Basic lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />

            {/* Game Loop Runner */}
            <GameLoop gameManager={gm} />

            {/* Render Entities conditionally based on gameState and asset availability */}
            {assets?.planet && (
              <PlanetComponent
                planet={assets.planet}
                // Log visibility prop
                visible={(() => {
                  const isVisible = gameState === 'space_flight';
                  // console.log(`[App.tsx] PlanetComponent visible prop: ${isVisible} (gameState: ${gameState})`); // Uncomment if needed
                  return isVisible;
                })()}
              />
            )}

            {assets?.spaceStation && (
              <SpaceStationComponent
                station={assets.spaceStation}
                 // Log visibility prop
                visible={(() => {
                  const isVisible = gameState === 'undocking' || gameState === 'space_flight';
                  // console.log(`[App.tsx] SpaceStationComponent visible prop: ${isVisible} (gameState: ${gameState})`); // Uncomment if needed
                  return isVisible;
                })()}
              />
            )}

            {/* Render Title Ships */}
            {assets?.titleShips && assets.titleShips.map((ship, index) => (
              <ShipComponent
                key={`title-ship-${index}`}
                ship={ship}
                 // Log visibility prop
                visible={(() => {
                  const isVisible = gameState === 'title';
                  // console.log(`[App.tsx] Title ShipComponent ${index} visible prop: ${isVisible} (gameState: ${gameState})`); // Uncomment if needed
                  return isVisible;
                })()}
              />
            ))}

            {/* Render Pirate Ships */}
            {assets?.pirateShips && assets.pirateShips.map((pirate, index) => (
              <ShipComponent
                key={`pirate-ship-${index}`}
                ship={pirate}
                 // Log visibility prop
                visible={(() => {
                  const isVisible = gameState === 'space_flight';
                  // console.log(`[App.tsx] Pirate ShipComponent ${index} visible prop: ${isVisible} (gameState: ${gameState})`); // Uncomment if needed
                  return isVisible;
                })()}
              />
            ))}

            {/* Render Undocking Squares conditionally */}
            {gameState === 'undocking' && <UndockingSquares />}

         </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="overlay" style={{ zIndex: 1, position: 'relative' }}>
        {renderSceneComponent()}
      </div>

      {/* Audio Elements */}
      {/* Conditionally render CoordinatesDisplay only during space flight */}
      {gameState === "space_flight" && (
        <CoordinatesDisplay coordinates={coordinates} />
      )}
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