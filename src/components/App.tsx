import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
// Use RadarPosition from types.ts
import { GameState, RadarPosition, ReactSetters, IGameManager } from "../types"; // Added IGameManager
import { GameManager } from "../game/GameManager";

// Import Scene Components
import LoadingScreen from "../features/loading/LoadingScreen";
import TitleScreen from "../features/title/TitleScreen";
import CreditsScreen from "../features/credits/CreditsScreen";
import StatsScreen from "../features/stats/StatsScreen";
import CoordinatesDisplay from "./hud/CoordinatesDisplay";
import SpaceFlightScreen from "../features/space_flight/SpaceFlightScreen";
import { PlanetInfo, calculateDistance } from "../classes/PlanetInfo";
import ShortRangeChartScreen from "../features/short_range_chart/ShortRangeChartScreen";
import PlanetInfoScreen from "../features/planet_info/PlanetInfoScreen";
import UndockingScreen from "../features/undocking/UndockingScreen";

// Import R3F Entity Components
import ShipComponent from "./r3f/ShipComponent"; // Re-added for title screen
import UndockingSquares from "./r3f/UndockingSquares"; // Keep for undocking state

// Import Scene Logic Hooks
import { useLoadingLogic } from "../features/loading/useLoadingLogic";
import { useTitleLogic } from "../features/title/useTitleLogic";
import { useCreditsLogic } from "../features/credits/useCreditsLogic";
import { useStatsLogic } from "../features/stats/useStatsLogic";
import { useUndockingLogic } from "../features/undocking/useUndockingLogic";
import { useShortRangeChartLogic } from "../features/short_range_chart/useShortRangeChartLogic";
import { usePlanetInfoLogic } from "../features/planet_info/usePlanetInfoLogic";
import { JUMP_RANGE, SHIP_SCALE } from "../constants"; // SHIP_SCALE might still be needed for Title ships

// Helper component to run GameManager update loop
const GameLoop: React.FC<{ gameManager: IGameManager | null }> = ({ gameManager }) => {
  useFrame((_, delta) => {
    // GameManager update is now primarily for non-R3F logic or state transitions
    // The core R3F update loop happens within SpaceFlightScreen's useFrame
    gameManager?.update(delta);
  });
  return null;
};

const App: React.FC = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>("loading");
  // ... (keep existing state variables) ...
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
  } | null>(null);
  const [radarPositions, setRadarPositions] = useState<RadarPosition[]>([]);
  const [planetInfos, setPlanetInfos] = useState<PlanetInfo[]>([]);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState<string>("");
  const [selectedPlanetName, setSelectedPlanetName] = useState<string | null>(null);

  // --- Refs ---
  const gameManagerRef = useRef<IGameManager | null>(null); // Use IGameManager type
  const introMusicRef = useRef<HTMLAudioElement>(null);
  const undockSoundRef = useRef<HTMLAudioElement>(null);

  // --- Game Logic Initialization Effect ---
  useEffect(() => {
    // ... (keep existing useEffect for GameManager initialization) ...
    if (gameManagerRef.current) {
      console.log("GameManager instance already exists, skipping init.");
      return;
    }

    console.log("Initializing GameManager...");

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
      setPlanetInfos,
      setCurrentPlanetIndex,
      setSelectedPlanetName
    };

    // Cast to IGameManager if necessary, or ensure GameManager implements it
    const gameManager = new GameManager(
      reactSetters,
      introMusicRef,
      undockSoundRef
    ) as IGameManager;

    const handleLoadingComplete = () => {
      console.log("React notified that loading is complete.");
      setIsLoadingComplete(true);
    };

    gameManager.init(handleLoadingComplete);
    gameManagerRef.current = gameManager;

    return () => {
      if (gameManagerRef.current === gameManager) {
        console.log("Cleaning up active GameManager instance.");
        gameManagerRef.current?.dispose();
        gameManagerRef.current = null;
      } else if (gameManager) {
        console.log("Cleaning up potentially orphaned GameManager instance.");
        gameManager.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ... (keep useEffect for logging gameState changes) ...
  useEffect(() => {
    console.log(`[App.tsx] gameState changed to: ${gameState}`);
  }, [gameState]);


  // --- Invoke Scene Logic Hooks ---
  // ... (keep existing hook calls) ...
  useLoadingLogic(gameManagerRef.current, gameState === 'loading', isLoadingComplete);
  useTitleLogic(gameManagerRef.current, gameState === 'title');
  useCreditsLogic(gameManagerRef.current, gameState === 'credits');
  useStatsLogic(gameManagerRef.current, gameState === 'stats');
  useUndockingLogic(gameManagerRef.current, gameState === 'undocking');
  useShortRangeChartLogic(gameManagerRef.current, gameState === 'short_range_chart');
  usePlanetInfoLogic(gameManagerRef.current, gameState === 'planet_info');


  // --- Helper Functions ---
  // Function to render the correct scene UI component based on gameState
  const renderSceneUIComponent = () => {
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
        // SpaceFlightScreen now handles its own UI (HUD) internally or via props
        // We might not need to render anything specific here for its UI overlay
        // unless BottomHud etc. are kept separate. Assuming SpaceFlightScreen renders its own HUD for now.
        // If SpaceFlightScreen *only* contains the R3F scene, render HUD here:
        /*
        return (
          <BottomHud
            speed={speed}
            roll={roll}
            pitch={pitch}
            altitude={altitude}
            laserHeat={laserHeat}
            stationDirection={stationDirection}
            radarPosition={radarPositions}
          />
        );
        */
        return null; // Assuming SpaceFlightScreen includes HUD rendering
      case "short_range_chart":
        return (
          <ShortRangeChartScreen
            planets={planetInfos}
            currentPlanetIndex={currentPlanetIndex}
            selectedPlanetName={selectedPlanetName}
            jumpRange={JUMP_RANGE}
            setSelectedPlanetName={(name) => gameManagerRef.current?.setSelectedPlanetName(name)}
          />
        );
      case "planet_info":
        const currentPlanet = planetInfos.find(p => p.name === currentPlanetIndex);
        const selectedPlanet = planetInfos.find(p => p.name === selectedPlanetName);
        const distance = selectedPlanet && currentPlanet
            ? calculateDistance(currentPlanet.coordinates, selectedPlanet.coordinates)
            : 0;
        return selectedPlanet ? (
             <PlanetInfoScreen planet={selectedPlanet} distance={distance} />
        ) : (
             <div>Error: No planet selected</div>
        );
      default:
        return null;
    }
  };

  // --- Render ---
  const gm = gameManagerRef.current;
  const assets = gm?.assets; // Assets config might change

  return (
    <div id="container">
      <Canvas
        // Keep camera settings, R3F components will use this default camera
        camera={{ fov: 75, near: 0.1, far: 10_000_000, position: [0, 0, 15] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        // onCreated={({ gl, scene, camera }) => {
        //   // If GameManager needs access AFTER canvas creation (less ideal now)
        //   // if (gameManagerRef.current) {
        //   //   gameManagerRef.current.scene = scene;
        //   //   gameManagerRef.current.camera = camera as THREE.PerspectiveCamera;
        //   //   gameManagerRef.current.renderer = gl;
        //   // }
        // }}
      >
         <Suspense fallback={null}>
            {/* Basic lighting - Keep */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />

            {/* Game Loop Runner - Keep */}
            <GameLoop gameManager={gm} />

            {/* --- Conditional Rendering of R3F Scene Content --- */}

            {/* Space Flight Scene (includes Planet, Station, Pirates) */}
            {gameState === 'space_flight' && gm && (
              <SpaceFlightScreen
                gameManager={gm} // Pass GameManager instance
                // Pass necessary props for HUD if not handled internally
                speed={speed}
                roll={roll}
                pitch={pitch}
                altitude={altitude}
                laserHeat={laserHeat}
                stationDirection={stationDirection}
                radarPosition={radarPositions}
              />
            )}

            {/* Title Ships - Keep rendering here if specific to title screen */}
            {gameState === 'title' && assets?.titleShips && assets.titleShips.map((ship, index) => (
              <ShipComponent // Use re-imported ShipComponent
                key={`title-ship-${index}`}
                modelPath={ship.modelPath}
                initialScale={SHIP_SCALE}
                wireframeColor={0x00ffff}
                visible={true} // Visibility handled by conditional rendering above
                // Position/animation handled by useTitleLogic or ShipComponent itself
              />
            ))}

            {/* Undocking Squares - Keep rendering here */}
            {gameState === 'undocking' && <UndockingSquares />}

            {/* Add other state-specific R3F components here if needed */}

         </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="overlay" style={{ zIndex: 1, position: 'relative' }}>
        {renderSceneUIComponent()} {/* Render the UI overlay */}
      </div>

      {/* Audio Elements & Coordinates Display */}
      {gameState === "space_flight" && (
        <CoordinatesDisplay coordinates={coordinates} />
      )}
      {/* ... keep audio elements ... */}
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