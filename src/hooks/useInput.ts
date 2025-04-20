import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useCallback, useRef } from "react";
import { KEYBINDINGS, checkBinding } from "@/keybindings"; // Assuming this path is correct

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
  shipControls: ShipControlState;
  uiControls: UIControlState;
}

// --- Primitive Atoms ---
export const keysPressedAtom = atom<Set<string>>(new Set<string>());
export const isTouchedAtom = atom<boolean>(false);

const inputActivityTriggerAtom = atom(0);

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
  };
});

type UseInputCallbacks = {
  onInputStart?: () => void;
};

/**
 * Hook to consume the current input state derived from Jotai atoms
 * and optionally subscribe to input start events.
 * @param callbacks Optional callbacks for specific input events.
 * @returns The current InputState object.
 */
export function useInput(callbacks?: UseInputCallbacks): InputState {
  const shipControls = useAtomValue(shipControlsAtom);
  const uiControls = useAtomValue(uiControlsAtom);

  // --- Callback Logic ---
  const trigger = useAtomValue(inputActivityTriggerAtom);
  const prevTriggerRef = useRef(trigger);
  const onInputStart = callbacks?.onInputStart;

  useEffect(() => {
    // Check if the trigger value has changed since the last render
    if (trigger !== prevTriggerRef.current) {
      // If it changed, and a callback is provided, call it.
      if (onInputStart) {
        onInputStart();
      }
      // Update the ref to the current trigger value for the next render check
      prevTriggerRef.current = trigger;
    }
    // Depend on the trigger value and the callback reference
  }, [trigger, onInputStart]);

  return {
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
  const triggerInputActivity = useSetAtom(inputActivityTriggerAtom); // Get setter for trigger

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === " " || key.startsWith("arrow")) {
        event.preventDefault();
      }
      setKeysPressed((prevKeys) => {
        if (prevKeys.has(key)) {
          return prevKeys; // Key already pressed, do nothing extra
        }
        triggerInputActivity((c) => c + 1); // Increment trigger
        const newKeys = new Set(prevKeys);
        newKeys.add(key);
        return newKeys;
      });
    },
    [setKeysPressed, triggerInputActivity] // Add trigger setter to dependencies
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
    setIsTouched((prev) => {
      if (!prev) {
        triggerInputActivity((c) => c + 1); // Increment trigger
      }
      return true;
    });
  }, [setIsTouched, triggerInputActivity]); // Add trigger setter to dependencies

  const handleMouseUp = useCallback(() => {
    setIsTouched(false);
  }, [setIsTouched]);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      setIsTouched((prev) => {
        if (!prev) {
          triggerInputActivity((c) => c + 1); // Increment trigger
        }
        return true;
      });
    },
    [setIsTouched, triggerInputActivity]
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      setIsTouched(false);
    },
    [setIsTouched]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
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
