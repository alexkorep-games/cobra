// src/hooks/useInput.ts
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useCallback, useRef } from "react";
import { KEYBINDINGS, checkBinding } from "@/keybindings";

// --- Interfaces ---
export interface ShipControlState {
  accelerate: boolean;
  brake: boolean;
  rollLeft: boolean;
  rollRight: boolean;
  pitchUp: boolean;
  pitchDown: boolean;
  fire: boolean;
  jumpSpeed: boolean;
  touchRoll?: number;
  touchPitch?: number;
}

export interface UIControlState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  confirm: boolean;
  cancel: boolean;
  toggleChart: boolean;
}

export interface InputState {
  shipControls: ShipControlState;
  uiControls: UIControlState;
}

// --- Primitive Atoms ---
export const keysPressedAtom = atom<Set<string>>(new Set<string>());
export const isTouchedAtom = atom<boolean>(false);
export const jumpSpeedButtonTriggerAtom = atom(0);
const inputActivityTriggerAtom = atom(0);

// --- Intermediate Atom for Touch Controls ---
// Initialize all flags to false/zero
const touchControlStateAtom = atom<Partial<ShipControlState>>({
  accelerate: false,
  brake: false,
  fire: false,
  jumpSpeed: false, // Keep jump speed here if you plan a touch button later
  touchPitch: 0,
  touchRoll: 0,
});

// --- Derived Atoms ---

// Combine keyboard and touch inputs for Ship Controls (Unchanged from previous update)
export const shipControlsAtom = atom<ShipControlState>((get) => {
  const keys = get(keysPressedAtom);
  const touchState = get(touchControlStateAtom);

  const keyboardAccelerate = checkBinding(keys, KEYBINDINGS.SHIP.ACCELERATE);
  const keyboardBrake = checkBinding(keys, KEYBINDINGS.SHIP.BRAKE);
  const keyboardRollLeft = checkBinding(keys, KEYBINDINGS.SHIP.ROLL_LEFT);
  const keyboardRollRight = checkBinding(keys, KEYBINDINGS.SHIP.ROLL_RIGHT);
  const keyboardPitchUp = checkBinding(keys, KEYBINDINGS.SHIP.PITCH_UP);
  const keyboardPitchDown = checkBinding(keys, KEYBINDINGS.SHIP.PITCH_DOWN);
  const keyboardFire = checkBinding(keys, KEYBINDINGS.SHIP.FIRE);
  const keyboardJumpSpeed = checkBinding(keys, KEYBINDINGS.SHIP.JUMP_SPEED);

  const touchRollThreshold = 0.15;
  const touchPitchThreshold = 0.15;
  const touchRoll = touchState.touchRoll ?? 0;
  const touchPitch = touchState.touchPitch ?? 0;

  return {
    accelerate: keyboardAccelerate || !!touchState.accelerate,
    brake: keyboardBrake || !!touchState.brake,
    rollLeft: keyboardRollLeft || touchRoll < -touchRollThreshold,
    rollRight: keyboardRollRight || touchRoll > touchRollThreshold,
    pitchUp: keyboardPitchUp || touchPitch < -touchPitchThreshold,
    pitchDown: keyboardPitchDown || touchPitch > touchPitchThreshold,
    fire: keyboardFire || !!touchState.fire,
    jumpSpeed: keyboardJumpSpeed || !!touchState.jumpSpeed,
    touchRoll: touchRoll,
    touchPitch: touchPitch,
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
  };
});

type UseInputCallbacks = {
  onInputStart?: () => void;
};

export function useInput(callbacks?: UseInputCallbacks): InputState {
  const shipControls = useAtomValue(shipControlsAtom);
  const uiControls = useAtomValue(uiControlsAtom);
  const trigger = useAtomValue(inputActivityTriggerAtom);
  const prevTriggerRef = useRef(trigger);
  const onInputStart = callbacks?.onInputStart;

  useEffect(() => {
    if (trigger !== prevTriggerRef.current) {
      if (onInputStart) {
        onInputStart();
      }
      prevTriggerRef.current = trigger;
    }
  }, [trigger, onInputStart]);

  return {
    shipControls,
    uiControls,
  };
}

// --- Define Right-Side Vertical Zones ---
const ACCELERATE_ZONE_TOP = 0.0; // 0% from top
const ACCELERATE_ZONE_BOTTOM = 0.4; // 40% from top
const FIRE_ZONE_TOP = ACCELERATE_ZONE_BOTTOM; // 40% from top
const FIRE_ZONE_BOTTOM = 0.6; // 60% from top
const BRAKE_ZONE_TOP = FIRE_ZONE_BOTTOM; // 60% from top
const BRAKE_ZONE_BOTTOM = 1.0; // 100% from top

// Define type for active touch data
type ActiveTouchInfo = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  zone: "left" | "right-accel" | "right-fire" | "right-brake" | "none";
  isTapCandidate: boolean;
};

export function useInputSetup(): void {
  const setKeysPressed = useSetAtom(keysPressedAtom);
  const setTouchControls = useSetAtom(touchControlStateAtom);
  const setIsTouchedGlobal = useSetAtom(isTouchedAtom);
  const triggerInputActivity = useSetAtom(inputActivityTriggerAtom);

  const activeTouches = useRef<{ [id: number]: ActiveTouchInfo }>({});
  const screenWidthRef = useRef(window.innerWidth);
  const screenHeightRef = useRef(window.innerHeight);
  const steeringTouchId = useRef<number | null>(null);

  // --- Keyboard Handlers (Unchanged) ---
  const handleKeyDown = useCallback(
    /* ... unchanged ... */
    (event: KeyboardEvent) => {
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      if (!KEYBINDINGS.GENERAL.ANY_KEY_IGNORE.includes(key)) {
        triggerInputActivity((c) => c + 1);
      }
      setKeysPressed((prevKeys) => {
        if (prevKeys.has(key)) return prevKeys;
        const newKeys = new Set(prevKeys);
        newKeys.add(key);
        return newKeys;
      });
    },
    [setKeysPressed, triggerInputActivity]
  );
  const handleKeyUp = useCallback(
    /* ... unchanged ... */
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

  // --- Mouse Handlers (Unchanged) ---
  const handleMouseDown = useCallback(
    /* ... unchanged ... */
    () => {
      setIsTouchedGlobal(true);
      triggerInputActivity((c) => c + 1);
    },
    [setIsTouchedGlobal, triggerInputActivity]
  );
  const handleMouseUp = useCallback(
    /* ... unchanged ... */
    () => {
      setIsTouchedGlobal(false);
    },
    [setIsTouchedGlobal]
  );

  // --- Touch Handlers ---
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      screenWidthRef.current = window.innerWidth;
      screenHeightRef.current = window.innerHeight;
      setIsTouchedGlobal(true);
      triggerInputActivity((c) => c + 1);

      const touches = event.changedTouches;
      let needsUpdate = false;
      const nextTouchStatePatch: Partial<ShipControlState> = {};

      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const touchId = touch.identifier;
        const touchX = touch.clientX;
        const touchY = touch.clientY;
        const yRatio = touchY / screenHeightRef.current; // Normalize Y position (0=top, 1=bottom)

        let determinedZone: ActiveTouchInfo["zone"] = "none";

        if (touchX < screenWidthRef.current / 2) {
          // Left Zone (Steering)
          if (steeringTouchId.current === null) {
            steeringTouchId.current = touchId;
            determinedZone = "left";
            nextTouchStatePatch.touchPitch = 0;
            nextTouchStatePatch.touchRoll = 0;
            needsUpdate = true;
            console.log(`Touch ${touchId} START assigned to STEERING`);
          } else {
            console.log(
              `Touch ${touchId} START ignored in LEFT (another touch is steering)`
            );
          }
        } else {
          // Right Zone (Actions)
          if (
            yRatio >= ACCELERATE_ZONE_TOP &&
            yRatio < ACCELERATE_ZONE_BOTTOM
          ) {
            determinedZone = "right-accel";
            nextTouchStatePatch.accelerate = true; // Activate accelerate on hold start
            needsUpdate = true;
            console.log(`Touch ${touchId} START in ACCEL zone`);
          } else if (yRatio >= FIRE_ZONE_TOP && yRatio < FIRE_ZONE_BOTTOM) {
            determinedZone = "right-fire"; // Potential tap
            console.log(`Touch ${touchId} START in FIRE zone (potential tap)`);
          } else if (yRatio >= BRAKE_ZONE_TOP && yRatio <= BRAKE_ZONE_BOTTOM) {
            determinedZone = "right-brake";
            nextTouchStatePatch.brake = true; // Activate brake on hold start
            needsUpdate = true;
            console.log(`Touch ${touchId} START in BRAKE zone`);
          }
        }

        // Store touch info regardless of assignment success for cleanup
        activeTouches.current[touchId] = {
          startX: touch.clientX,
          startY: touch.clientY,
          currentX: touch.clientX,
          currentY: touch.clientY,
          zone: determinedZone,
          isTapCandidate: determinedZone === "right-fire", // Only fire zone is tap candidate initially
        };
      }

      if (needsUpdate) {
        setTouchControls((prevState) => ({
          ...prevState,
          ...nextTouchStatePatch,
        }));
      }
    },
    [setTouchControls, triggerInputActivity, setIsTouchedGlobal]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      const touches = event.changedTouches;
      let needsUpdate = false;
      const nextTouchStatePatch: Partial<ShipControlState> = {};

      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const touchId = touch.identifier;
        const activeTouch = activeTouches.current[touchId];

        if (activeTouch) {
          activeTouch.currentX = touch.clientX;
          activeTouch.currentY = touch.clientY;

          const deltaX = activeTouch.currentX - activeTouch.startX;
          const deltaY = activeTouch.currentY - activeTouch.startY;
          const movedDistanceSq = deltaX * deltaX + deltaY * deltaY;
          const tapThresholdSq = 20 * 20; // Moved more than 20px - not a tap

          if (movedDistanceSq > tapThresholdSq) {
            activeTouch.isTapCandidate = false;
          }

          // Process movement only for the designated steering touch
          if (
            touchId === steeringTouchId.current &&
            activeTouch.zone === "left"
          ) {
            const maxDelta = screenWidthRef.current * 0.2;
            const rawRoll = deltaX / maxDelta;
            const rawPitch = deltaY / maxDelta;
            const deadZone = 0.1;
            const rollInput =
              Math.abs(rawRoll) < deadZone
                ? 0
                : Math.max(-1, Math.min(1, rawRoll));
            const pitchInput =
              Math.abs(rawPitch) < deadZone
                ? 0
                : Math.max(-1, Math.min(1, rawPitch));

            // Get the *current* touch state from the atom before patching
            const currentTouchState = touchControlStateAtom.init; // Use .init to get value outside react
            if (
              Math.abs(rollInput - (currentTouchState.touchRoll ?? 0)) > 0.01 ||
              Math.abs(pitchInput - (currentTouchState.touchPitch ?? 0)) > 0.01
            ) {
              nextTouchStatePatch.touchRoll = rollInput;
              nextTouchStatePatch.touchPitch = pitchInput;
              needsUpdate = true;
            }
          }
          // No state changes needed on move for accel/brake/fire zones in this logic
        }
      }

      if (needsUpdate) {
        setTouchControls((prevState) => ({
          ...prevState,
          ...nextTouchStatePatch,
        }));
      }
    },
    [setTouchControls]
  ); // Removed dependency on touchControlStateAtom directly here

  const handleTouchEndOrCancel = useCallback(
    (event: TouchEvent) => {
      const touches = event.changedTouches;
      let needsUpdate = false;
      const nextTouchStatePatch: Partial<ShipControlState> = {};

      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const touchId = touch.identifier;
        const endedTouch = activeTouches.current[touchId];

        if (endedTouch) {
          console.log(
            `Touch ${touchId} END/CANCEL in zone: ${endedTouch.zone}`
          );

          // If the steering touch ended, reset pitch/roll
          if (touchId === steeringTouchId.current) {
            if (
              nextTouchStatePatch.touchPitch !== 0 ||
              nextTouchStatePatch.touchRoll !== 0
            ) {
              needsUpdate = true; // Only flag update if values actually change to 0
            }
            nextTouchStatePatch.touchPitch = 0;
            nextTouchStatePatch.touchRoll = 0;
            steeringTouchId.current = null;
            console.log(`Touch ${touchId} released STEERING`);
          }
          // If touch ended in Accel zone, turn off accelerate flag
          else if (endedTouch.zone === "right-accel") {
            if (nextTouchStatePatch.accelerate !== false) needsUpdate = true;
            nextTouchStatePatch.accelerate = false;
            console.log(`Touch ${touchId} released ACCEL zone`);
          }
          // If touch ended in Brake zone, turn off brake flag
          else if (endedTouch.zone === "right-brake") {
            if (nextTouchStatePatch.brake !== false) needsUpdate = true;
            nextTouchStatePatch.brake = false;
            console.log(`Touch ${touchId} released BRAKE zone`);
          }
          // If a touch ended in the Fire zone AND it was a tap
          else if (
            endedTouch.zone === "right-fire" &&
            endedTouch.isTapCandidate
          ) {
            console.log(
              `Touch ${touchId} detected as TAP in FIRE zone - Firing`
            );
            nextTouchStatePatch.fire = true; // Activate fire
            needsUpdate = true;
            // Schedule fire deactivation
            setTimeout(() => {
              setTouchControls((prev) => ({ ...prev, fire: false }));
            }, 60); // Slightly longer pulse for tap
          }

          // Clean up the ended touch reference
          delete activeTouches.current[touchId];
        }
      }

      // If no touches remain active, update global touched state
      if (Object.keys(activeTouches.current).length === 0) {
        setIsTouchedGlobal(false);
      }

      // Apply the batched state updates
      if (needsUpdate) {
        setTouchControls((prevState) => ({
          ...prevState,
          ...nextTouchStatePatch,
        }));
      }
    },
    [setTouchControls, setIsTouchedGlobal]
  );

  // --- Setup Effect (Unchanged - includes all handlers now) ---
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEndOrCancel, {
      passive: true,
    });
    window.addEventListener("touchcancel", handleTouchEndOrCancel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEndOrCancel);
      window.removeEventListener("touchcancel", handleTouchEndOrCancel);
    };
  }, [
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEndOrCancel,
  ]);
}
