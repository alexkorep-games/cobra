// src/constants.ts
import * as THREE from "three";

export const SHIP_DISPLAY_DURATION = 10.0; // Seconds

// Constants previously within gameLogic for Title scene animation
export const FLY_IN_DURATION = 0.5;
export const FLY_OUT_DURATION = 0.5;
export const HOLD_DURATION = Math.max(0, SHIP_DISPLAY_DURATION - FLY_IN_DURATION - FLY_OUT_DURATION);
export const TOTAL_CYCLE_DURATION = SHIP_DISPLAY_DURATION;
export const START_Z = -150;
export const TARGET_POS = new THREE.Vector3(-3, 0, 0);

// Space Flight Constants
export const MAX_SPEED = 50.0;
export const MIN_SPEED = 0.0;
export const ACCELERATION = 15.0; // Units per second^2
export const DECELERATION = 10.0; // Deceleration when no key pressed (used by specific key)
export const ROLL_ACCELERATION = Math.PI * 0.8; // Radians per second^2
export const PITCH_ACCELERATION = Math.PI * 0.5; // Radians per second^2
export const ANGULAR_DAMPING = 3.0; // Factor to reduce rotation speed when no input
export const LINEAR_DAMPING = 0.5; // Factor to reduce speed when no acceleration key
export const MAX_VISUAL_ROLL_RATE = Math.PI * 0.5; // Radians/sec (Used for HUD Normalization)
export const MAX_VISUAL_PITCH_RATE = Math.PI * 0.3; // Radians/sec (Used for HUD Normalization)