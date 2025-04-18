import { atom, useAtom } from 'jotai';
import { GameState } from '@/types';

// Atom to manage the game state
export const gameStateAtom = atom<GameState>('loading');

// Hook to use and update the game state
export function useGameState() {
  const [gameState, setGameState] = useAtom(gameStateAtom);

  return {
    gameState,
    setGameState,
  };
}