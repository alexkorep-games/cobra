// src/atoms/inputAtoms.ts
import { atom } from "jotai";
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
  // Add others as needed
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
