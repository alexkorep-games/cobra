import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { GameState, PiratePosition, ReactSetters } from "../types";
import { GameManager } from "../game/GameManager";

// Import Scene Components
import LoadingScreen from "../features/loading/LoadingScreen";
import TitleScreen from "../features/title/TitleScreen";
import CreditsScreen from "../features/credits/CreditsScreen";
import StatsScreen from "../features/stats/StatsScreen";
import UndockingScreen from "../features/undocking/UndockingScreen";
import CoordinatesDisplay from "./hud/CoordinatesDisplay";
import SpaceFlightScreen from "../features/space_flight/SpaceFlightScreen";

const App: React.FC = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>("loading");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number, number]>([
    0, 0, 0,
  ]);
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
  const [radarPosition, setRadarPosition] = useState<PiratePosition[]>([]);

  // --- Refs ---
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager | null>(null);
  const introMusicRef = useRef<HTMLAudioElement>(null);
  const undockSoundRef = useRef<HTMLAudioElement>(null);

  // --- Game Logic Initialization Effect ---
  useEffect(() => {
    if (!mountRef.current || !canvasRef.current) {
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
      setRadarPositions: setRadarPosition
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
      } else {
        console.log("Cleaning up potentially orphaned GameManager instance.");
        gameManager.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Removed effect for loader prompt, now handled in LoadingScreen

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
            stationDirection={stationDirection}
            radarPosition={radarPosition} // Pass radar positions
          />
        );

      default:
        return null; // Or a default component/error message
    }
  };

  // --- Render ---
  return (
    <div ref={mountRef} id="container">
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
