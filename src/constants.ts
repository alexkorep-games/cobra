import * as THREE from "three";

export const SHIP_DISPLAY_DURATION = 10.0; // Seconds

// Constants previously within gameLogic for Title scene animation
export const FLY_IN_DURATION = 0.5;
export const FLY_OUT_DURATION = 0.5;
export const HOLD_DURATION = Math.max(
  0,
  SHIP_DISPLAY_DURATION - FLY_IN_DURATION - FLY_OUT_DURATION
);
export const TOTAL_CYCLE_DURATION = SHIP_DISPLAY_DURATION;
export const START_Z = -150;
export const TARGET_POS = new THREE.Vector3(-3, 0, 0);

export const HYPERSPACE_SPEED = 500000.0;
export const MAX_SPEED = 500.0;
export const MIN_SPEED = 0.0;
export const ACCELERATION = 150.0; // Units per second^2
export const DECELERATION = 100.0; // Deceleration when no key pressed (used by specific key)
export const ROLL_ACCELERATION = Math.PI * 0.8; // Radians per second^2
export const PITCH_ACCELERATION = Math.PI * 0.5; // Radians per second^2
export const ANGULAR_DAMPING = 3.0; // Factor to reduce rotation speed when no input
export const LINEAR_DAMPING = 0.5; // Factor to reduce speed when no acceleration key
export const MAX_VISUAL_ROLL_RATE = Math.PI * 0.5; // Radians/sec (Used for HUD Normalization)
export const MAX_VISUAL_PITCH_RATE = Math.PI * 0.3; // Radians/sec (Used for HUD Normalization)

// Space Station Constants
export const STATION_PLANET_OFFSET_MIN = 1000; // Min distance from planet surface/center
export const STATION_PLANET_OFFSET_MAX = 5000; // Max distance from planet surface/center
export const STATION_DOCKING_RADIUS = 10; // Distance to trigger docking/return to title

// Pirate Constants
export const PIRATE_COUNT = 3;
export const PIRATE_BASE_DISTANCE = 5000; // Base distance from player start
export const PIRATE_POSITION_OFFSET_RANGE = new THREE.Vector2(0.5, 2.0); // Randomness factor
export const PIRATE_ATTACK_RANGE = 1500; // Distance within which pirates attack
export const PIRATE_SPEED = 25.0; // Speed when attacking
export const PIRATE_TURN_RATE = 0.5; // Radians per second towards player

// Laser Constants
export const LASER_RANGE = 2000; // Max distance the laser travels
export const LASER_COOLDOWN = 0.15; // Seconds between shots
export const LASER_HEAT_INCREASE = 15; // Heat added per shot
export const LASER_HEAT_DECREASE_RATE = 20; // Heat lost per second when not firing
export const LASER_MAX_HEAT = 100; // Max heat before overheating
export const LASER_COLOR = 0xff0000; // Red laser
export const LASER_DURATION = 0.1; // How long the beam is visible per shot
export const LASER_LENGTH = 40; // Visual length of the beam
export const LASER_LINE_WIDTH = 1; // Width of the laser beam


// Planets
export const PLANET_COUNT = 100; // Number of planets to generate
export const PLANET_SEED = 73791;
export const JUMP_RANGE = 7.0; // Max jump distance in Light Years (example)
export const INITIAL_PLANET_INDEX = 0; // Start at the first planet

export const SHIP_SCALE = 6;
export const CAMERA_FAR_PLANE = 10_000_000; //
export const RADAR_DISTANCE = 2000; // Distance to show objects on radar, meters?
