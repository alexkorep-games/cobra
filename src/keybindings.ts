// src/keybindings.ts
export const KEYBINDINGS = {
  SHIP: {
    ACCELERATE: ["a"],
    BRAKE: ["z"],
    ROLL_LEFT: ["arrowleft"],
    ROLL_RIGHT: ["arrowright"],
    PITCH_UP: ["arrowup"],
    PITCH_DOWN: ["arrowdown"],
    FIRE: [" "], // Space bar
    JUMP_SPEED: ["j"], // <<<<<<<<<<<< ADDED JUMP_SPEED binding <<<<<<<<<<<<
  },
  UI: {
    UP: ["arrowup", "w"],
    DOWN: ["arrowdown", "s"],
    LEFT: ["arrowleft", "a"],
    RIGHT: ["arrowright", "d"],
    CONFIRM: ["enter", " "], // Removed 'j' from UI confirm
    CANCEL: ["escape", "n"], // Escape, N
    NEXT_WEAPON: ["m"], // Example
    PREV_WEAPON: [","], // Example
    TOGGLE_CHART: ["n"], // N key used in multiple contexts
    // JUMP: ["j"], // Removed UI.JUMP, 'J' is now SHIP.JUMP_SPEED
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
