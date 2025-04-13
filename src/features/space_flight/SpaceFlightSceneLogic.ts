import * as THREE from "three";
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";
import * as Constants from "../../constants";

export class SpaceFlightSceneLogic extends SceneLogicBase {
  private velocity: number = 0;
  private rollRate: number = 0;
  private pitchRate: number = 0;
  private keysPressed: Set<string> = new Set();
  private boundHandleKeyDown: (event: KeyboardEvent) => void;
  private boundHandleKeyUp: (event: KeyboardEvent) => void;
  private isHyperspaceActive: boolean = false;

  constructor(game: IGameManager) {
    super(game);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
  }

  // Positioning logic used by both planet and station
  private positionObjectRandomly(
    object: THREE.Object3D,
    baseDistance: number,
    offsetRange: THREE.Vector2 = new THREE.Vector2(0.8, 1.2)
  ) {
    const distance =
      baseDistance *
      THREE.MathUtils.lerp(offsetRange.x, offsetRange.y, Math.random());
    const angle = Math.random() * Math.PI * 2;
    const elevationAngle = (Math.random() - 0.5) * Math.PI * 0.5; // Limit elevation slightly
    const radius = distance * Math.cos(elevationAngle);
    const x = distance * Math.sin(angle) * Math.cos(elevationAngle);
    const y = distance * Math.sin(elevationAngle);
    const z = -distance * Math.cos(angle) * Math.cos(elevationAngle);

    object.position.set(x, y, z);
    object.visible = true;
    console.log(
      `${object.name || "Object"} positioned at distance: ${distance.toFixed(
        0
      )}`
    );
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);

    if (this.game.assets.planet && this.game.camera) {
      // Position planet far away
      this.positionObjectRandomly(
        this.game.assets.planet,
        this.game.camera.far * 0.8
      );
      (this.game.assets.planet.material as THREE.Material).needsUpdate = true;
    }

    if (this.game.assets.stars) {
      this.game.assets.stars.visible = true;
    }
    // Ensure hyperspace stars are initially hidden
    if (this.game.assets.hyperStars) {
      this.game.assets.hyperStars.visible = false;
    }

    if (this.game.assets.spaceStation && this.game.assets.planet) {
      // Position station relative to the planet
      const planetPos = this.game.assets.planet.position;
      const offsetDist = THREE.MathUtils.randFloat(
        Constants.STATION_PLANET_OFFSET_MIN,
        Constants.STATION_PLANET_OFFSET_MAX
      );
      const randomOffset = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(offsetDist);
      this.game.assets.spaceStation.position.copy(planetPos).add(randomOffset);
      this.game.assets.spaceStation.visible = true;
      this.game.assets.spaceStation.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ); // Random orientation
      console.log(
        `Station positioned near planet at offset: ${offsetDist.toFixed(0)}`
      );
    }
    console.log("Entered Space Flight Scene. Intro sequence complete.");

    this.velocity = 0;
    this.rollRate = 0;
    this.pitchRate = 0;
    this.keysPressed.clear();
    if (this.game.camera) {
      this.game.camera.rotation.set(0, 0, 0);
      this.game.camera.position.set(0, 0, 0);
    }

    this.isHyperspaceActive = false;
    this.game.toggleHyperSpaceVisuals(false);

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
    if (this.game.assets.hyperStars) this.game.assets.hyperStars.visible = false; // Hide hyperspace stars on exit
    if (this.game.assets.spaceStation) {
      this.game.assets.spaceStation.visible = false;
    }
    this.isHyperspaceActive = false; // Ensure reset on exit
  }

  update(deltaTime: number): void {
    if (!this.game.camera) return;

    // Update starfield position to follow camera
    // Needs to happen for both normal and hyper stars
    if (this.game.assets.stars) {
      this.game.assets.stars.position.copy(this.game.camera.position);
    }
    if (this.game.assets.planet) {
      this.game.assets.planet.rotation.y += 0.005 * deltaTime;
    }

    // Update hyperspace star position as well
    if (this.game.assets.hyperStars) {
      this.game.assets.hyperStars.position.copy(this.game.camera.position);
    }

    // Rotate station slowly
    if (
      this.game.assets.spaceStation &&
      this.game.assets.spaceStation.visible
    ) {
      this.game.assets.spaceStation.rotation.y += 0.02 * deltaTime;
    }

    let accelerate = false,
      decelerate = false,
      rollLeft = false,
      rollRight = false,
      pitchUp = false,
      pitchDown = false;

    // Read movement keys (Hyperspace doesn't change controls, just speed limit)
    if (this.keysPressed.has("KeyA")) accelerate = true;
    if (this.keysPressed.has("KeyZ")) decelerate = true;
    if (this.keysPressed.has("ArrowLeft")) rollLeft = true;
    if (this.keysPressed.has("ArrowRight")) rollRight = true;
    if (this.keysPressed.has("ArrowUp")) pitchDown = true;
    if (this.keysPressed.has("ArrowDown")) pitchUp = true;
    if (accelerate) this.velocity += Constants.ACCELERATION * deltaTime;
    else if (decelerate) this.velocity -= Constants.ACCELERATION * deltaTime;
    else {
      this.velocity *= 1 - Constants.LINEAR_DAMPING * deltaTime;
      if (Math.abs(this.velocity) < 0.01) this.velocity = 0;
    }

    // Clamp speed based on whether hyperspace is active
    const currentMaxSpeed = this.isHyperspaceActive
      ? Constants.HYPERSPACE_SPEED
      : Constants.MAX_SPEED;
    this.velocity = THREE.MathUtils.clamp(
      this.velocity,
      Constants.MIN_SPEED,
      currentMaxSpeed
    );

    if (rollLeft) this.rollRate += Constants.ROLL_ACCELERATION * deltaTime;
    else if (rollRight)
      this.rollRate -= Constants.ROLL_ACCELERATION * deltaTime;
    else {
      this.rollRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.rollRate) < 0.01) this.rollRate = 0;
    }

    if (pitchDown) this.pitchRate -= Constants.PITCH_ACCELERATION * deltaTime;
    else if (pitchUp)
      this.pitchRate += Constants.PITCH_ACCELERATION * deltaTime;
    else {
      this.pitchRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.pitchRate) < 0.01) this.pitchRate = 0;
    }

    const moveDirection = new THREE.Vector3(0, 0, -1);
    moveDirection.applyQuaternion(this.game.camera.quaternion);
    this.game.camera.position.addScaledVector(
      moveDirection,
      this.velocity * deltaTime
    );
    this.game.camera.rotateX(this.pitchRate * deltaTime);
    this.game.camera.rotateZ(this.rollRate * deltaTime);

    const { x, y, z } = this.game.camera.position;
    this.game.reactSetCoordinates([x, y, z]);

    // Normalize speed for HUD based on *normal* max speed, even in hyperspace
    // The HUD bar will just stay full during hyperspace.
    const normalizedSpeed = THREE.MathUtils.clamp(
      (this.velocity / Constants.MAX_SPEED) * 100, 0, 100
    );
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

    // --- Station Proximity Check & Direction ---
    if (
      this.game.assets.spaceStation &&
      this.game.assets.spaceStation.visible &&
      this.game.camera
    ) {
      const playerPos = this.game.camera.position;
      const stationPos = this.game.assets.spaceStation.position;
      const distanceToStation = playerPos.distanceTo(stationPos);

      if (distanceToStation < Constants.STATION_DOCKING_RADIUS) {
        console.log("Reached space station!");
        this.game.switchState("title"); // Go back to title screen
      } else {
        // Calculate direction for HUD
        const worldDir = new THREE.Vector3().subVectors(stationPos, playerPos);
        // Project direction onto camera's local XY plane
        const cameraInverse = this.game.camera.quaternion.clone().invert();
        const relativeDir = worldDir.applyQuaternion(cameraInverse).normalize();
        // atan2(y, x) gives angle from positive X axis
        const angle = Math.atan2(relativeDir.y, relativeDir.x);
        this.game.reactSetStationDirection(angle);
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    let keyIdentifier = event.code;
    if (event.key === "/") keyIdentifier = "Slash";
    if (event.key === ".") keyIdentifier = "Period";
    // Handle J key specifically for hyperspace toggle
    if (keyIdentifier === "KeyJ") {
      this.toggleHyperspace();
      return; // Don't add 'J' to the general keysPressed set
    }
    if (event.key === ",") keyIdentifier = "Comma";
    if (event.code === "KeyA") keyIdentifier = "KeyA"; // Keep handling KeyA for acceleration
    this.keysPressed.add(keyIdentifier);
  }


  private handleKeyUp(event: KeyboardEvent): void {
    // No special handling needed for 'J' on key up
    let keyIdentifier = event.code;
    if (event.key === "/") keyIdentifier = "Slash";
    if (event.key === ".") keyIdentifier = "Period";
    if (event.key === ",") keyIdentifier = "Comma";
    if (event.code === "KeyA") keyIdentifier = "KeyA";
    this.keysPressed.delete(keyIdentifier);
  }

  private toggleHyperspace(): void {
    this.isHyperspaceActive = !this.isHyperspaceActive;
    console.log(`Hyperspace Toggled: ${this.isHyperspaceActive}`);
    this.game.toggleHyperSpaceVisuals(this.isHyperspaceActive);
    // Note: Speed limit change is handled in the update loop.
  }
}