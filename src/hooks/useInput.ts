import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useCallback } from "react";
import { KEYBINDINGS, checkBinding } from "@/keybindings";

export interface ShipControlState {
  accelerate: boolean;
  brake: boolean;
  rollLeft: boolean;
  rollRight: boolean;
  pitchUp: boolean;
  pitchDown: boolean;
  fire: boolean;
}

export interface UIControlState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  confirm: boolean;
  cancel: boolean;
  toggleChart: boolean;
  jump: boolean;
}

export interface InputState {
  keysPressed: Set<string>;
  isTouched: boolean;
  isAnyInputActive: boolean;
  isAnyKeyPressedRaw: boolean;
  shipControls: ShipControlState;
  uiControls: UIControlState;
}

// --- Primitive Atoms ---
// These are directly updated by the listener hook
export const keysPressedAtom = atom<Set<string>>(new Set<string>());
export const isTouchedAtom = atom<boolean>(false);

// --- Derived Atoms ---
// These automatically recalculate when their dependencies (primitive atoms) change

export const shipControlsAtom = atom<ShipControlState>((get) => {
  const keys = get(keysPressedAtom);
  return {
    accelerate: checkBinding(keys, KEYBINDINGS.SHIP.ACCELERATE),
    brake: checkBinding(keys, KEYBINDINGS.SHIP.BRAKE),
    rollLeft: checkBinding(keys, KEYBINDINGS.SHIP.ROLL_LEFT),
    rollRight: checkBinding(keys, KEYBINDINGS.SHIP.ROLL_RIGHT),
    pitchUp: checkBinding(keys, KEYBINDINGS.SHIP.PITCH_UP),
    pitchDown: checkBinding(keys, KEYBINDINGS.SHIP.PITCH_DOWN),
    fire: checkBinding(keys, KEYBINDINGS.SHIP.FIRE),
  };
});

export const uiControlsAtom = atom<UIControlState>((get) => {
  const keys = get(keysPressedAtom);
  return {
    up: checkBinding(keys, KEYBINDINGS.UI.UP),
    down: checkBinding(keys, KEYBINDINGS.UI.DOWN),
    left: checkBinding(keys, KEYBINDINGS.UI.LEFT),
    right: checkBinding(keys, KEYBINDINGS.UI.RIGHT),
    confirm: checkBinding(keys, KEYBINDINGS.UI.CONFIRM),
    cancel: checkBinding(keys, KEYBINDINGS.UI.CANCEL),
    toggleChart: checkBinding(keys, KEYBINDINGS.UI.TOGGLE_CHART),
    jump: checkBinding(keys, KEYBINDINGS.UI.JUMP),
    // Add others here
  };
});

export const isAnyKeyPressedRawAtom = atom<boolean>(
  (get) => get(keysPressedAtom).size > 0
);

export const isAnyInputActiveAtom = atom<boolean>((get) => {
  const keys = get(keysPressedAtom);
  const touched = get(isTouchedAtom);

  if (touched) return true;

  if (keys.size > 0) {
    for (const key of keys) {
      if (!KEYBINDINGS.GENERAL.ANY_KEY_IGNORE.includes(key)) {
        return true; // Found a meaningful key press
      }
    }
  }
  return false; // No touch and no meaningful key press
});

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

/**
 * Sets up global input event listeners (keyboard, mouse, touch)
 * and updates the corresponding Jotai atoms.
 * This hook should be called ONCE at the top level of the application.
 * It does not return any state.
 */
export function useInputSetup(): void {
  const setKeysPressed = useSetAtom(keysPressedAtom);
  const setIsTouched = useSetAtom(isTouchedAtom);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === " " || key.startsWith("arrow")) {
        event.preventDefault();
      }
      setKeysPressed((prevKeys) => {
        if (prevKeys.has(key)) return prevKeys;
        const newKeys = new Set(prevKeys);
        newKeys.add(key);
        return newKeys;
      });
    },
    [setKeysPressed]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKeysPressed((prevKeys) => {
        if (!prevKeys.has(key)) return prevKeys;
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      });
    },
    [setKeysPressed]
  );

  const handleMouseDown = useCallback(() => {
    setIsTouched(true);
  }, [setIsTouched]);

  const handleMouseUp = useCallback(() => {
    setIsTouched(false);
  }, [setIsTouched]);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      setIsTouched(true);
    },
    [setIsTouched]
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      setIsTouched(false);
    },
    [setIsTouched]
  );

  // Add/Remove Listeners
  useEffect(() => {
    // console.log("[useInputSetup] Adding global listeners");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      // console.log("[useInputSetup] Removing global listeners");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  ]);
}
