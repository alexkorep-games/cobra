// src/scenes/SpaceFlightScene.ts
import * as THREE from "three";
import { SceneLogic } from "../game/SceneLogic";
import { GameState, IGameManager } from "../types";
import * as Constants from "../constants"; // Import constants

export class SpaceFlightScene extends SceneLogic {
  private velocity: number = 0;
  private rollRate: number = 0; // Radians per second
  private pitchRate: number = 0; // Radians per second

  // Input state
  private keysPressed: Set<string> = new Set();

  // Bound event handlers
  private boundHandleKeyDown: (event: KeyboardEvent) => void;
  private boundHandleKeyUp: (event: KeyboardEvent) => void;

  constructor(game: IGameManager) {
    super(game);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);

    // Set up initial scene elements visibility/position
    if (this.game.assets.planet) {
      this.game.assets.planet.position.set(0, 15, -60);
      this.game.assets.planet.scale.set(5, 5, 5);
      this.game.assets.planet.visible = true;
    }
    if (this.game.assets.stars) {
      this.game.assets.stars.visible = true;
    }
    console.log("Entered Space Flight Scene. Intro sequence complete.");

    // Reset ship state
    this.velocity = 0;
    this.rollRate = 0;
    this.pitchRate = 0;
    this.keysPressed.clear();
    if (this.game.camera) {
      // Optional: Reset camera orientation if needed
      // this.game.camera.rotation.set(0, 0, 0);
      // Ensure camera starts looking forward
      this.game.camera.lookAt(0, 0, -1);
    }

    // Add specific listeners for this scene
    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("keyup", this.boundHandleKeyUp);

    // Potentially start game music, etc.
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    this.resetHud(); // Reset speed/roll/pitch indicators on exit
    // Remove specific listeners for this scene
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("keyup", this.boundHandleKeyUp);

    // Reset keys pressed just in case
    this.keysPressed.clear();
    // Cleanup specific to space flight if needed (e.g., stop game music)
  }

  update(deltaTime: number): void {
    if (!this.game.camera) return;

    // 1. Update Rates based on Input & Damping
    let accelerate = false;
    let decelerate = false; // Specific key for decelerate
    let rollLeft = false;
    let rollRight = false;
    let pitchUp = false;
    let pitchDown = false;

    // Check Elite Controls
    if (this.keysPressed.has("KeyA")) accelerate = true; // 'A' = Accelerate
    if (this.keysPressed.has("KeyZ")) decelerate = true; // 'Z' = Decelerate
    if (this.keysPressed.has("ArrowLeft")) rollLeft = true; // Left Arrow = Roll Left
    if (this.keysPressed.has("ArrowRight")) rollRight = true; // Right Arrow = Roll Right
    if (this.keysPressed.has("ArrowUp")) pitchDown = true;
    if (this.keysPressed.has("ArrowDown")) pitchUp = true;


    // Update Velocity
    if (accelerate) {
      this.velocity += Constants.ACCELERATION * deltaTime;
    } else if (decelerate) {
      // Using acceleration value for deceleration as well for symmetry, adjust if needed
      this.velocity -= Constants.ACCELERATION * deltaTime; // Using ACCELERATION for symmtery, could use DECELERATION
    } else {
      // Apply linear damping if no acceleration/deceleration input
      this.velocity *= 1 - Constants.LINEAR_DAMPING * deltaTime;
      // Prevent drifting backwards slowly if speed is near zero
      if (Math.abs(this.velocity) < 0.01) {
        this.velocity = 0;
      }
    }
    this.velocity = THREE.MathUtils.clamp(
      this.velocity,
      Constants.MIN_SPEED,
      Constants.MAX_SPEED
    );

    // Update Roll Rate
    if (rollLeft) {
      this.rollRate += Constants.ROLL_ACCELERATION * deltaTime;
    } else if (rollRight) {
      this.rollRate -= Constants.ROLL_ACCELERATION * deltaTime;
    } else {
      // Apply angular damping
      this.rollRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.rollRate) < 0.01) {
        // Prevent tiny residual rotation
        this.rollRate = 0;
      }
    }

    // Update Pitch Rate
    if (pitchDown) {
      // '/' is Dive (pitch down)
      this.pitchRate -= Constants.PITCH_ACCELERATION * deltaTime;
    } else if (pitchUp) {
      // '*' or 'A' is Climb (pitch up)
      this.pitchRate += Constants.PITCH_ACCELERATION * deltaTime;
    } else {
      // Apply angular damping to pitch
      this.pitchRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.pitchRate) < 0.01) {
        // Prevent tiny residual rotation
        this.pitchRate = 0;
      }
    }

    // Clamp rates (optional, but good practice)
    // const maxRollRate = Math.PI; // Example clamp
    // const maxPitchRate = Math.PI / 2; // Example clamp
    // this.rollRate = THREE.MathUtils.clamp(this.rollRate, -maxRollRate, maxRollRate);
    // this.pitchRate = THREE.MathUtils.clamp(this.pitchRate, -maxPitchRate, maxPitchRate);

    // 2. Apply Movement and Rotation
    const moveDirection = new THREE.Vector3(0, 0, -1); // Move forward in local Z
    moveDirection.applyQuaternion(this.game.camera.quaternion); // Align with camera's current direction
    this.game.camera.position.addScaledVector(
      moveDirection,
      this.velocity * deltaTime
    );

    // Apply pitch (rotation around local X axis)
    this.game.camera.rotateX(this.pitchRate * deltaTime);

    // Apply roll (rotation around local Z axis)
    this.game.camera.rotateZ(this.rollRate * deltaTime);

    // 3. Update Coordinates Display (via React state)
    const { x, y, z } = this.game.camera.position;
    // Don't round here, let the display component format it
    this.game.reactSetCoordinates([x, y, z]);

    // 4. Update HUD Indicators (Speed, Roll, Pitch)
    const normalizedSpeed = (this.velocity / Constants.MAX_SPEED) * 100;
    // Clamp and normalize roll rate for the HUD marker (-1 to 1)
    // Note: Roll rate is positive for left roll, negative for right roll. We want the HUD marker to move left for left roll.
    const normalizedRoll = THREE.MathUtils.clamp(
      this.rollRate / Constants.MAX_VISUAL_ROLL_RATE,
      -1,
      1
    );
    // Clamp and normalize pitch rate for the HUD marker (-1 to 1)
    // Note: Pitch rate is positive for up (climb), negative for down (dive). We want the HUD marker to move right for climb.
    const normalizedPitch = THREE.MathUtils.clamp(
      this.pitchRate / Constants.MAX_VISUAL_PITCH_RATE,
      -1,
      1
    );
    this.game.reactSetSpeed(normalizedSpeed);
    this.game.reactSetRoll(normalizedRoll); // Positive roll (left) moves marker right in original setup, need to flip for convention? Let's test. If marker moves right for left roll, flip sign: -normalizedRoll
    this.game.reactSetPitch(normalizedPitch); // Positive pitch (climb) moves marker right. Negative pitch (dive) moves marker left. This seems correct.

    // 5. Starfield remains static (no rotation update here)
    // The line `this.game.assets.stars.rotation.y += ...` has been removed.
  }

  // We use specific handlers now, base handleInput is not used for flight controls
  // handleInput(event: KeyboardEvent | MouseEvent): void { }

  private handleKeyDown(event: KeyboardEvent): void {
    // Normalize key codes if needed (e.g., Numpad vs main keys)
    // For simplicity, we'll use event.code which is layout independent
    let keyIdentifier = event.code;

    // Alternative mapping for '*' if Shift+8 is preferred (can be less reliable)
    // if (event.shiftKey && event.code === 'Digit8') {
    //      keyIdentifier = 'ShiftDigit8';
    // }

    // Map '/' key regardless of Shift state on some keyboards
    if (event.key === "/") {
      keyIdentifier = "Slash"; // Use a consistent identifier
    }
    // Map '.' key regardless of Shift state on some keyboards
    if (event.key === ".") {
      keyIdentifier = "Period"; // Use a consistent identifier
    }
    // Map ',' key regardless of Shift state on some keyboards
    if (event.key === ",") {
      keyIdentifier = "Comma"; // Use a consistent identifier
    }

    // Using 'KeyA' for climb as a more accessible alternative to NumpadMultiply/*
    if (event.code === "KeyA") {
      keyIdentifier = "KeyA";
    }

    this.keysPressed.add(keyIdentifier);
    // console.log("Key Down:", keyIdentifier, this.keysPressed); // For debugging
  }

  private handleKeyUp(event: KeyboardEvent): void {
    let keyIdentifier = event.code;

    // if (event.shiftKey && event.code === 'Digit8') {
    //     keyIdentifier = 'ShiftDigit8';
    // }

    // Consistent identifiers for release
    if (event.key === "/") keyIdentifier = "Slash";
    if (event.key === ".") keyIdentifier = "Period";
    if (event.key === ",") keyIdentifier = "Comma";
    if (event.code === "KeyA") keyIdentifier = "KeyA";

    // Handle Shift release if Shift+ combos were used more extensively
    // if (!event.shiftKey && (keyIdentifier === 'ShiftLeft' || keyIdentifier === 'ShiftRight')) {
    // If shift is released, remove any Shift+ combinations that might have been added
    // Example: this.keysPressed.delete('ShiftDigit8');
    // }

    this.keysPressed.delete(keyIdentifier);
    // console.log("Key Up:", keyIdentifier, this.keysPressed); // For debugging
  }
}
