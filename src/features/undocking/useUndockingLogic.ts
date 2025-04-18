// src/features/undocking/useUndockingLogic.ts
import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three'; // Needed for LineLoop type
import { IGameManager, GameState } from "@/types";
import { useGameState } from '@/features/common/useGameState';

const UNDOCKING_DURATION = 4000; // ms
const SQUARE_SPEED = 20.0; // Units per second

export function useUndockingLogic(gameManager: IGameManager | null, isActive: boolean) {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { setGameState } = useGameState();

  // --- Update Logic (Called by GameManager) ---
  const updateUndockingAnimation = useCallback((deltaTime: number) => {
    if (!isActive || !gameManager) return; // Should not happen if registered correctly

    const speed = SQUARE_SPEED;
    // Access undocking squares directly from GameManager assets
    gameManager.assets.undockingSquares.forEach((square: THREE.LineLoop) => {
       if (square.visible) { // Only move visible squares
           square.position.z += speed * deltaTime;
           // Optional: Hide squares that move too far past the camera
           if (square.position.z > 10) { // Adjust threshold as needed
               square.visible = false;
           }
       }
    });
  }, [isActive, gameManager]); // Dependencies

  // --- Effect for Setup, Cleanup, Registration ---
  useEffect(() => {
    if (isActive && gameManager) {
      console.log('Activating Undocking Logic Hook');

      // Reset square positions and visibility
      gameManager.assets.undockingSquares.forEach((square, i) => {
        square.position.z = -i * 5; // Reset initial position
        square.visible = true;     // Make visible
      });

      // Play undocking sound
      gameManager.undockSoundRef.current?.play().catch(e => console.warn("Undock sound play failed:", e));

      // Clear previous timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Set timeout to switch to space flight
      timeoutIdRef.current = setTimeout(() => {
        if (isActive && gameManager) { // Check state again in timeout
          console.log('Undocking finished, switching to space flight...');
          setGameState('space_flight');
        }
        timeoutIdRef.current = null;
      }, UNDOCKING_DURATION);

      // Register update function with GameManager
      gameManager.registerSceneUpdate('undocking', updateUndockingAnimation);

      // Cleanup function
      return () => {
        console.log('Deactivating Undocking Logic Hook');
        // Unregister update function
        gameManager.unregisterSceneUpdate('undocking');

        // Clear timeout
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }

        // Hide squares
        gameManager.assets.undockingSquares.forEach(s => (s.visible = false));

        // Stop and reset sound
        if (gameManager.undockSoundRef.current) {
          gameManager.undockSoundRef.current.pause();
          gameManager.undockSoundRef.current.currentTime = 0;
        }
      };
    }
  }, [isActive, gameManager, updateUndockingAnimation]); // Add dependencies

  // No input handling needed for this scene
}