// src/constants.ts
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

// ALL UNITS ARE KILOMETERS

// Flight Dynamics
export const JUMP_SPEED = 500000.0;
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
export const STATION_DOCKING_RADIUS = 10; // Distance to trigger docking/return to title
export const UNDOCK_DISTANCE = 10;

// Pirate Constants
export const PIRATE_COUNT = 3;
export const PIRATE_BASE_DISTANCE = 5000; // Base distance from player start
export const PIRATE_POSITION_OFFSET_RANGE = new THREE.Vector2(0.5, 2.0); // Randomness factor
export const PIRATE_ATTACK_RANGE = 1500; // Distance within which pirates attack
export const PIRATE_ATTACK_RANGE_SQUARED =
  PIRATE_ATTACK_RANGE * PIRATE_ATTACK_RANGE;
export const PIRATE_SPEED = 25.0; // Speed when attacking
export const PIRATE_TURN_RATE = 0.5; // Radians per second towards player

// Planets
export const PLANET_COUNT = 100; // Number of planets to generate
export const PLANET_SEED = 73791;
export const JUMP_RANGE = 7.0; // Max jump distance in Light Years (example)
export const INITIAL_PLANET_INDEX = 0; // Start at the first planet

// Rendering & Radar
export const SHIP_SCALE = 6;
export const CAMERA_FAR_PLANE = 10_000_000;
export const RADAR_DISTANCE = 2000; // Distance to show objects on radar, meters?
export const RADAR_DISTANCE_SQUARED = RADAR_DISTANCE * RADAR_DISTANCE;

// Lasers
export const LASER_MAX_HEAT = 100;

// Jump Effect
export const JUMP_FOV_INCREASE = 20; // How much FOV increases during jump speed engage
export const JUMP_FOV_DURATION = 0.2; // Duration of the FOV effect in seconds
export const JUMP_FOV_LERP_SPEED = 8; // How fast FOV interpolates back to normal

// Particles
export const PARTICLE_COUNT = 10; // Number of particles (Adjust for performance/density)
export const PARTICLE_CLOUD_SIZE = 200; // Size (width, height, depth) of the cloud volume around the player (in world units - km)
export const PARTICLE_RESPAWN_MARGIN = PARTICLE_CLOUD_SIZE / 20; // How far ahead (in -Z) to respawn particles
export const PARTICLE_SIZE = 1.5; // Visual size of each particle (adjust based on visuals)
export const PARTICLE_COLOR = 0xaaaaaa; // Color (dim white/grey)

// Stars
export const STARS_RADIUS = CAMERA_FAR_PLANE * 0.9; // Keep stars well within the far plane but very large
export const STARS_COUNT = 8000; // Number 