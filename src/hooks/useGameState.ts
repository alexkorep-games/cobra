import { atom, useAtom } from "jotai";
import { GameState } from "@/types";
import { useCallback } from "react";

// Atom to manage the game state
export const gameStateAtom = atom<GameState>("loading");
// Atom to track the *previous* game state (useful for transitions)
export const previousGameStateAtom = atom<GameState | null>(null);

// Hook to use and update the game state
export function useGameState() {
  const [gameState, _setGameState] = useAtom(gameStateAtom);
  const [previousGameState, setPreviousGameState] = useAtom(
    previousGameStateAtom
  );

  // Wrap the setter to also update the previous state
  const setGameState = useCallback(
    (newState: GameState) => {
      // Only update previous state if the new state is actually different
      if (newState !== gameState) {
        setPreviousGameState(gameState); // Store the *current* state as the previous one
        _setGameState(newState); // Set the new state
      }
    },
    [gameState, setPreviousGameState, _setGameState]
  );

  return {
    gameState,
    setGameState,
    previousGameState, // Expose the previous state
  };
}
