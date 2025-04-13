// src/scenes/SpaceFlightScene.ts
import * as THREE from "three";
import { SceneLogic } from "../game/SceneLogic";
import { GameState, IGameManager } from "../types";
import * as Constants from "../constants";

export class SpaceFlightScene extends SceneLogic {
  private velocity: number = 0;
  private rollRate: number = 0;
  private pitchRate: number = 0;
  private keysPressed: Set<string> = new Set();
  private boundHandleKeyDown: (event: KeyboardEvent) => void;
  private boundHandleKeyUp: (event: KeyboardEvent) => void;

  constructor(game: IGameManager) {
    super(game);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);

    if (this.game.assets.planet && this.game.camera) {
      // Calculate distance based on the *current* camera.far value
      const distance = this.game.camera.far * 0.8; // 80% of the far plane distance
      // Randomize position slightly each time for variety (optional)
      const angle = Math.random() * Math.PI * 2;
      const elevationAngle = (Math.random() - 0.5) * Math.PI * 0.2; // +/- ~5.7 degrees elevation
      const x = distance * Math.sin(angle) * Math.cos(elevationAngle);
      const y = distance * Math.sin(elevationAngle); // Adjust y based on elevation
      const z = -distance * Math.cos(angle) * Math.cos(elevationAngle); // Adjust z based on elevation and angle

      this.game.assets.planet.position.set(x, y, z);
      this.game.assets.planet.scale.set(1, 1, 1); // Use the large base geometry size
      this.game.assets.planet.visible = true;
      // Ensure material compatibility with logarithmic depth buffer
      (this.game.assets.planet.material as THREE.Material).needsUpdate = true;
      console.log(`Planet positioned at distance: ${distance.toFixed(0)}`);
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
      this.game.camera.rotation.set(0, 0, 0);
      this.game.camera.position.set(0, 0, 0); // Start at origin
    }

    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("keyup", this.boundHandleKeyUp);
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    this.resetHud();
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("keyup", this.boundHandleKeyUp);
    this.keysPressed.clear();
    if (this.game.assets.planet) this.game.assets.planet.visible = false;
    if (this.game.assets.stars) this.game.assets.stars.visible = false;
  }

  update(deltaTime: number): void {
    if (!this.game.camera) return;

    // Update Starfield Position to Match Camera (for infinite distance feel)
    if (this.game.assets.stars) {
      this.game.assets.stars.position.copy(this.game.camera.position);
    }
    // Update Planet Rotation (optional visual flair)
    if (this.game.assets.planet) {
      this.game.assets.planet.rotation.y += 0.005 * deltaTime;
    }

    // --- Input Handling & Physics (No changes from previous step) ---
    let accelerate = false,
      decelerate = false,
      rollLeft = false,
      rollRight = false,
      pitchUp = false,
      pitchDown = false;
    if (this.keysPressed.has("KeyA")) accelerate = true;
    if (this.keysPressed.has("KeyZ")) decelerate = true;
    if (this.keysPressed.has("ArrowLeft")) rollLeft = true;
    if (this.keysPressed.has("ArrowRight")) rollRight = true;
    if (this.keysPressed.has("ArrowUp")) pitchDown = true;
    if (this.keysPressed.has("ArrowDown")) pitchUp = true;

    // Velocity
    if (accelerate) this.velocity += Constants.ACCELERATION * deltaTime;
    else if (decelerate) this.velocity -= Constants.ACCELERATION * deltaTime;
    else {
      this.velocity *= 1 - Constants.LINEAR_DAMPING * deltaTime;
      if (Math.abs(this.velocity) < 0.01) this.velocity = 0;
    }
    this.velocity = THREE.MathUtils.clamp(
      this.velocity,
      Constants.MIN_SPEED,
      Constants.MAX_SPEED
    );

    // Roll Rate
    if (rollLeft) this.rollRate += Constants.ROLL_ACCELERATION * deltaTime;
    else if (rollRight)
      this.rollRate -= Constants.ROLL_ACCELERATION * deltaTime;
    else {
      this.rollRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.rollRate) < 0.01) this.rollRate = 0;
    }

    // Pitch Rate
    if (pitchDown) this.pitchRate -= Constants.PITCH_ACCELERATION * deltaTime;
    else if (pitchUp)
      this.pitchRate += Constants.PITCH_ACCELERATION * deltaTime;
    else {
      this.pitchRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.pitchRate) < 0.01) this.pitchRate = 0;
    }

    // --- Apply Movement and Rotation (No changes from previous step) ---
    const moveDirection = new THREE.Vector3(0, 0, -1);
    moveDirection.applyQuaternion(this.game.camera.quaternion);
    this.game.camera.position.addScaledVector(
      moveDirection,
      this.velocity * deltaTime
    );
    this.game.camera.rotateX(this.pitchRate * deltaTime);
    this.game.camera.rotateZ(this.rollRate * deltaTime);

    // --- Update HUD (No changes from previous step) ---
    const { x, y, z } = this.game.camera.position;
    this.game.reactSetCoordinates([x, y, z]);
    const normalizedSpeed = (this.velocity / Constants.MAX_SPEED) * 100;
    const normalizedRoll = THREE.MathUtils.clamp(
      this.rollRate / Constants.MAX_VISUAL_ROLL_RATE,
      -1,
      1
    );
    const normalizedPitch = THREE.MathUtils.clamp(
      this.pitchRate / Constants.MAX_VISUAL_PITCH_RATE,
      -1,
      1
    );
    this.game.reactSetSpeed(normalizedSpeed);
    this.game.reactSetRoll(normalizedRoll);
    this.game.reactSetPitch(normalizedPitch);
  }

  // --- Key Handlers (No changes from previous step) ---
  private handleKeyDown(event: KeyboardEvent): void {
    let keyIdentifier = event.code;
    if (event.key === "/") keyIdentifier = "Slash";
    if (event.key === ".") keyIdentifier = "Period";
    if (event.key === ",") keyIdentifier = "Comma";
    if (event.code === "KeyA") keyIdentifier = "KeyA";
    this.keysPressed.add(keyIdentifier);
  }

  private handleKeyUp(event: KeyboardEvent): void {
    let keyIdentifier = event.code;
    if (event.key === "/") keyIdentifier = "Slash";
    if (event.key === ".") keyIdentifier = "Period";
    if (event.key === ",") keyIdentifier = "Comma";
    if (event.code === "KeyA") keyIdentifier = "KeyA";
    this.keysPressed.delete(keyIdentifier);
  }
}
