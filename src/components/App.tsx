import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { GameState, PiratePosition, ReactSetters } from "../types";
import { GameManager } from "../game/GameManager";

// Import Scene Components
import LoadingScreen from "../features/loading/LoadingScreen";
import TitleScreen from "../features/title/TitleScreen";
import CreditsScreen from "../features/credits/CreditsScreen";
import StatsScreen from "../features/stats/StatsScreen";
import CoordinatesDisplay from "./hud/CoordinatesDisplay";
import SpaceFlightScreen from "../features/space_flight/SpaceFlightScreen";
import { PlanetInfo, calculateDistance } from "../classes/PlanetInfo"; // Moved PLANET constants here or import from constants.ts
// import { INITIAL_PLANET_INDEX } from "../constants"; // Import from PlanetInfo instead
import ShortRangeChartScreen from "../features/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "../features/planet_info/PlanetInfoScreen";
import UndockingScreen from "../features/undocking/UndockingScreen";

// Import Scene Logic Hooks
import { useLoadingLogic } from "../features/loading/useLoadingLogic";
import { useTitleLogic } from "../features/title/useTitleLogic";
import { useCreditsLogic } from "../features/credits/useCreditsLogic";
import { useStatsLogic } from "../features/stats/useStatsLogic";
import { useUndockingLogic } from "../features/undocking/useUndockingLogic";
import { useShortRangeChartLogic } from "../features/short_range_chart/useShortRangeChartLogic";
import { usePlanetInfoLogic } from "../features/planet_info/usePlanetInfoLogic";
import { INITIAL_PLANET_INDEX, JUMP_RANGE } from "../constants";

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
  const [radarPositions, setRadarPositions] = useState<PiratePosition[]>([]);

  // --- Planet Info State ---
  // These are now set by GameManager via reactSetters
  const [planetInfos, setPlanetInfos] = useState<PlanetInfo[]>([]);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState<string>(INITIAL_PLANET_INDEX); // Index is name
  const [selectedPlanetName, setSelectedPlanetName] = useState<string | null>(null);

  // --- Refs ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager | null>(null);
  const introMusicRef = useRef<HTMLAudioElement>(null);
  const undockSoundRef = useRef<HTMLAudioElement>(null);


  // --- Game Logic Initialization Effect ---
  useEffect(() => {
    // TODO figure out why it happens twice
    if (!canvasRef.current) {
      console.error("Mount point or canvas not found");
      return;
    }
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

    gameManager.init(canvasRef.current, handleLoadingComplete);
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
            radarPosition={radarPositions} // Pass radar positions
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
  return (
    <div id="container">
      <canvas ref={canvasRef} id="eliteCanvas"></canvas>

      {/* The overlay now renders the specific scene component */}
      <div className="overlay">{renderSceneComponent()}</div>

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