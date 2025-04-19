// src/keybindings.ts
export const KEYBINDINGS = {
  SHIP: {
    ACCELERATE: ["z", "shift"],
    BRAKE: ["x"],
    ROLL_LEFT: ["a"],
    ROLL_RIGHT: ["d"],
    PITCH_UP: ["w"],
    PITCH_DOWN: ["s"],
    FIRE: [" "], // Space bar
  },
  UI: {
    UP: ["arrowup", "w"],
    DOWN: ["arrowdown", "s"],
    LEFT: ["arrowleft", "a"],
    RIGHT: ["arrowright", "d"],
    CONFIRM: ["enter", " ", "j"], // Space, Enter, J
    CANCEL: ["escape", "n"], // Escape, N
    NEXT_WEAPON: ["m"], // Example
    PREV_WEAPON: [","], // Example
    TOGGLE_CHART: ["n"], // N key used in multiple contexts
    JUMP: ["j"], // J key used in multiple contexts
  },
  GENERAL: {
    ANY_KEY_IGNORE: ["shift", "control", "alt", "meta"], // Keys ignored by 'any key' press
  },
};

// Helper function to check if a key matches any binding in an array
export function checkBinding(
  pressedKeys: Set<string>,
  bindings: string[]
): boolean {
  for (const key of pressedKeys) {
    if (bindings.includes(key)) {
      return true;
    }
  }
  return false;
}
