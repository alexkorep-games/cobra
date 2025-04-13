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