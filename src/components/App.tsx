import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { GameState } from "../types"; // Import GameState type
import { GameManager } from "../game/GameManager"; // Import GameManager

// Removed constants and game logic object from here

const App: React.FC = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>("loading");
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isReadyToContinue, setIsReadyToContinue] = useState(false); // For loader screen prompt

  // --- Refs ---
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameManagerRef = useRef<GameManager | null>(null); // Ref to hold the GameManager instance
  const introMusicRef = useRef<HTMLAudioElement>(null);
  const undockSoundRef = useRef<HTMLAudioElement>(null);

  // --- Game Logic Initialization Effect ---
  useEffect(() => {
    // Ensure canvas is available
    if (!mountRef.current || !canvasRef.current) {
      console.error("Mount point or canvas not found");
      return;
    }
    // Prevent multiple initializations (e.g., React StrictMode)
    if (gameManagerRef.current) {
      console.log(
        "GameManager instance already exists, skipping init (Strict Mode double render likely)."
      );
      return;
    }

    console.log("Initializing GameManager...");

    // Create the GameManager instance, passing React's state setter and refs
    const gameManager = new GameManager(
        setGameState, // Pass the state setter function
        introMusicRef,
        undockSoundRef
    );

    // Define the callback for when asset loading is finished
    const handleLoadingComplete = () => {
        console.log("React notified that loading is complete.");
        setIsLoadingComplete(true); // Update React state
    };

    // Initialize the game manager with the canvas and the callback
    gameManager.init(canvasRef.current, handleLoadingComplete);

    // Store the instance in the ref
    gameManagerRef.current = gameManager;

    // --- Cleanup Function ---
    return () => {
      // Only dispose if this is the currently active instance
      if (gameManagerRef.current === gameManager) {
        console.log("Cleaning up active GameManager instance.");
        gameManagerRef.current?.dispose();
        gameManagerRef.current = null; // Clear the ref
      } else {
         // This might happen in StrictMode if an instance was created but quickly replaced
         console.log("Cleaning up potentially orphaned GameManager instance.");
         gameManager.dispose(); // Still attempt to clean up the instance created in this effect run
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Effect for Loader Prompt ---
  useEffect(() => {
    // Reset flag when not loading or loading not complete
    setIsReadyToContinue(false);

    if (gameState === "loading" && isLoadingComplete) {
      // Add a small delay before showing "Press Key" to avoid flash
      const timer = setTimeout(() => {
        // Double check state hasn't changed during the timeout
        if (gameState === 'loading' && isLoadingComplete) {
            setIsReadyToContinue(true);
        }
      }, 100); // 100ms delay
      return () => clearTimeout(timer);
    }
  }, [gameState, isLoadingComplete]);

  // --- Render ---
  // The render logic remains the same, conditionally displaying UI based on gameState
  return (
    <div ref={mountRef} id="container">
      <canvas ref={canvasRef} id="eliteCanvas"></canvas>

      <div className="overlay">
        {/* Top Bar */}
        <div className="top-bar">
          {gameState !== "loading" &&
            gameState !== "undocking" &&
            gameState !== "space_flight" && (
              <span id="title-text">--- PROJECT COBRA ---</span>
            )}
          {gameState === "space_flight" && (
            <span id="bounty-text"> BOUNTY: 5.0 Cr </span>
          )}
          {(gameState === "undocking" || gameState === "space_flight") && (
            <span id="view-text">Front View</span>
          )}
        </div>

        {/* Center Content */}
        {gameState === "loading" && (
          <div id="loader-screen" className="center-text">
            {!isReadyToContinue && <p id="loader-progress-text">LOADING...</p>}
            {isReadyToContinue && (
              <p id="loader-continue-text">
                {" "}
                GAME LOADED
                <br /> PRESS ANY KEY TO CONTINUE{" "}
              </p>
            )}
          </div>
        )}
        {gameState === "title" && (
          <div id="press-key-text" className="center-text">
            {" "}
            Press any key to start game{" "}
          </div>
        )}
        {gameState === "credits" && (
          <div id="credits-text" className="center-text small">
            Game Copyright:-
            <br />
            Bell & Braben
            <br />
            Code Copyright:-
            <br />
            Realtime Games
            <br />
            Software Ltd
            <br />
            Written by:-
            <br />
            Andy Onions
            <br />
            Cracked by:-
            <br />
            Key Software
          </div>
        )}
        {gameState === "stats" && (
          <div id="stats-screen" className="center-text small">
            <h2>COMMANDER JAMESON</h2>
            <p>
              <strong>System:</strong> LAVE
            </p>{" "}
            <p>
              <strong>Hypersystem:</strong> LAVE
            </p>{" "}
            <p>
              <strong>Fuel:</strong> 7.0 Light Years
            </p>{" "}
            <p>
              <strong>Cash:</strong> 100.0 Credits
            </p>{" "}
            <p>
              <strong>Legal Status:</strong> Clean
            </p>{" "}
            <p>
              <strong>Rating:</strong> Harmless
            </p>{" "}
            <p className="equipment">
              <strong>EQUIPMENT:</strong>
            </p>{" "}
            <p>Missile (3)</p> <p>Pulse Laser (Fore)</p>
          </div>
        )}
        {gameState === "undocking" && (
          <div id="leaving-text" className="center-text small">
            {" "}
            Leaving Space Station{" "}
          </div>
        )}
         {/* Optional: Add placeholder for Space Flight UI */}
         {/* {gameState === "space_flight" && (
            <div id="space-flight-info" className="center-text small">
                SPACE FLIGHT ACTIVE
            </div>
         )} */}


        {/* Bottom HUD (conditionally rendered) */}
        {gameState !== "loading" && (
          <div className="bottom-bar">
            {/* Left HUD */}
            <div className="hud-left">
              <div className="hud-item"> <span className="hud-label">FORE-SHIELD</span> <div className="hud-bar"><div id="fore-shield-fill" className="hud-bar-fill" style={{ width: "80%" }}></div></div> </div>
              <div className="hud-item"> <span className="hud-label">AFT-SHIELD</span> <div className="hud-bar"><div id="aft-shield-fill" className="hud-bar-fill" style={{ width: "80%" }}></div></div> </div>
              <div className="hud-item"> <span className="hud-label">FUEL</span> <div className="hud-bar"><div id="fuel-fill" className="hud-bar-fill" style={{ width: "100%" }}></div></div> </div>
              <div className="hud-item"> <span className="hud-label">CABIN TEMP</span> <div className="hud-bar"><div id="cabin-temp-fill" className="hud-bar-fill" style={{ width: "10%" }}></div></div> </div>
              <div className="hud-item"> <span className="hud-label">LASER TEMP</span> <div className="hud-bar"><div id="laser-temp-fill" className="hud-bar-fill red" style={{ width: "5%" }}></div></div> </div>
              <div className="hud-item"> <span className="hud-label">ALTITUDE</span> <div className="hud-bar"></div> </div>
              <div className="hud-item"> <span className="hud-label">MISSILES</span><span className="hud-value"> M M M M</span> </div>
            </div>
            {/* Center HUD */}
            <div className="hud-center">
              <div className="scanner-shape"></div> {/* Placeholder for scanner */}
            </div>
            {/* Right HUD */}
            <div className="hud-right">
               <div className="hud-item"> <span className="hud-label">SPEED</span> <div className="hud-bar"><div className="hud-bar-fill" style={{ width: "10%" }}></div></div> </div>
               <div className="hud-item"> <span className="hud-label">ROLL</span> <div className="hud-bar"><div className="hud-bar-fill" style={{ width: "50%" }}></div></div> </div>
               <div className="hud-item"> <span className="hud-label">DIVE/CLIMB</span> <div className="hud-bar"><div className="hud-bar-fill" style={{ width: "50%" }}></div></div> </div>
               <div className="hud-item" style={{ justifyContent: "center", marginTop: "5px" }}>
                   <span style={{ border: "1px solid #00ff00", padding: "2px 5px" }}>1</span>
                   <span style={{ border: "1px solid #00ff00", padding: "2px 5px", margin: "0 5px" }}>2</span>
                   <span style={{ border: "1px solid #00ff00", padding: "2px 5px" }}>3</span>
                   <span style={{ border: "1px solid #ffff00", borderRadius: "50%", width: "15px", height: "15px", display: "inline-block", marginLeft: "10px" }}></span> {/* ECM Indicator? */}
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Audio Elements */}
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