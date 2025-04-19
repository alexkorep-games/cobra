// src/hooks/useInput.ts
import { useAtomValue } from "jotai";
import {
  InputState,
  keysPressedAtom,
  isTouchedAtom,
  isAnyInputActiveAtom,
  isAnyKeyPressedRawAtom,
  shipControlsAtom,
  uiControlsAtom,
} from "@/atoms/inputAtoms";

/**
 * Hook to consume the current input state derived from Jotai atoms.
 * @returns The current InputState object.
 */
export function useInput(): InputState {
  // Read values from individual atoms:
  const keysPressed = useAtomValue(keysPressedAtom);
  const isTouched = useAtomValue(isTouchedAtom);
  const isAnyInputActive = useAtomValue(isAnyInputActiveAtom);
  const isAnyKeyPressedRaw = useAtomValue(isAnyKeyPressedRawAtom);
  const shipControls = useAtomValue(shipControlsAtom);
  const uiControls = useAtomValue(uiControlsAtom);

  return {
    keysPressed,
    isTouched,
    isAnyInputActive,
    isAnyKeyPressedRaw,
    shipControls,
    uiControls,
  };
}
