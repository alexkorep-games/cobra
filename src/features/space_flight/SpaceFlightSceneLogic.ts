import * as THREE from "three";
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";
import * as Constants from "../../constants";
import { EntityBase } from "../../game/entities/EntityBase";

export class SpaceFlightSceneLogic extends SceneLogicBase {
  private velocity: number = 0;
  private rollRate: number = 0;
  private pitchRate: number = 0;
  private keysPressed: Set<string> = new Set();
  private boundHandleKeyDown: (event: KeyboardEvent) => void;
  private boundHandleKeyUp: (event: KeyboardEvent) => void;
  private isHyperspaceActive: boolean = false;
  private tempQuaternion = new THREE.Quaternion(); // Reusable quaternion for calculations
  private tempVector = new THREE.Vector3(); // Reusable vector for calculations

  constructor(game: IGameManager) {
    super(game);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
  }

  // Positioning logic used by both planet and station
  private positionObjectRandomly(
    entity: EntityBase | null,
    baseDistance: number,
    offsetRange: THREE.Vector2 = new THREE.Vector2(0.8, 1.2),
    relativeTo: THREE.Vector3 = new THREE.Vector3(0, 0, 0) // Optional origin
  ) {
    if (!entity?.mesh) return; // Check if entity and mesh exist

    const distance =
      baseDistance *
      THREE.MathUtils.lerp(offsetRange.x, offsetRange.y, Math.random());
    const angle = Math.random() * Math.PI * 2;
    const elevationAngle = (Math.random() - 0.5) * Math.PI; // Wider elevation range
    const x = relativeTo.x + distance * Math.sin(angle) * Math.cos(elevationAngle);
    const y = relativeTo.y + distance * Math.sin(elevationAngle);
    const z = relativeTo.z - distance * Math.cos(angle) * Math.cos(elevationAngle); // Usually move along negative Z

    entity.setPosition(x, y, z);
    entity.setRotation( // Random orientation
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    entity.setVisible(true);
    console.log(
      `${
        entity.mesh.name || "Object"
      } positioned at distance: ${distance.toFixed(0)} from ${relativeTo.toArray()}`
    );
  }

  enter(previousState?: GameState): void {
    super.enter(previousState); // Resets common visibility

    // Position planet far away
    if (this.game.assets.planet && this.game.camera) {
      this.positionObjectRandomly(
        this.game.assets.planet,
        this.game.camera.far * 0.8
      );
      //(this.game.assets.planet.mesh?.material as THREE.Material).needsUpdate = true;
    }

    // Position station relative to the planet
    if (this.game.assets.spaceStation && this.game.assets.planet?.mesh) {
      // Check planet mesh exists
      const planetPos = this.game.assets.planet.getPosition(); // Use entity method
      const offsetDist = THREE.MathUtils.randFloat(
        Constants.STATION_PLANET_OFFSET_MIN,
        Constants.STATION_PLANET_OFFSET_MAX
      );
      const randomOffset = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(offsetDist);
      const stationPos = planetPos.add(randomOffset);

      this.game.assets.spaceStation.setPosition(
        stationPos.x,
        stationPos.y,
        stationPos.z
      );
      this.game.assets.spaceStation.setRotation(
        // Random orientation
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.game.assets.spaceStation.setVisible(true);

      console.log(
        `Station positioned near planet at offset: ${offsetDist.toFixed(0)}`
      );
    } else {
      console.warn(
        "Could not position station relative to planet (planet missing?)."
      );
    }

    // Position Pirates randomly around the player's starting position
    const playerStartPosition = this.game.camera?.position ?? new THREE.Vector3(0,0,0);
    this.game.assets.pirateShips.forEach(pirate => {
        this.positionObjectRandomly(
            pirate,
            Constants.PIRATE_BASE_DISTANCE,
            Constants.PIRATE_POSITION_OFFSET_RANGE,
            playerStartPosition
        );
    });

    console.log("Entered Space Flight Scene.");

    // Reset player state
    this.velocity = 0;
    this.rollRate = 0;
    this.pitchRate = 0;
    this.keysPressed.clear();
    if (this.game.camera) {
      this.game.camera.rotation.set(0, 0, 0);
      this.game.camera.position.set(0, 0, 0);
    }
    this.isHyperspaceActive = false; // Start with hyperspace off

    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("keyup", this.boundHandleKeyUp);
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    this.resetHud();
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("keyup", this.boundHandleKeyUp);
    this.keysPressed.clear();
    this.isHyperspaceActive = false; // Reset hyperspace state on exit

    // Hide planet, station, and pirates
    this.game.assets.planet?.setVisible(false);
    this.game.assets.spaceStation?.setVisible(false);
    this.game.assets.pirateShips.forEach(pirate => pirate.setVisible(false));
  }

  update(deltaTime: number): void {
    if (!this.game.camera) return;

    let accelerate = false,
      decelerate = false,
      rollLeft = false,
      rollRight = false,
      pitchUp = false,
      pitchDown = false;

    // Read movement keys
    if (this.keysPressed.has("KeyA")) accelerate = true;
    if (this.keysPressed.has("KeyZ")) decelerate = true;
    if (this.keysPressed.has("ArrowLeft")) rollLeft = true;
    if (this.keysPressed.has("ArrowRight")) rollRight = true;
    if (this.keysPressed.has("ArrowUp")) pitchDown = true; // ArrowUp -> Pitch Nose Down
    if (this.keysPressed.has("ArrowDown")) pitchUp = true; // ArrowDown -> Pitch Nose Up

    // Update Velocity
    if (accelerate) this.velocity += Constants.ACCELERATION * deltaTime;
    else if (decelerate) this.velocity -= Constants.ACCELERATION * deltaTime;
    else {
      // Apply linear damping only if not accelerating or decelerating
      this.velocity *= 1 - Constants.LINEAR_DAMPING * deltaTime;
      if (Math.abs(this.velocity) < 0.01) this.velocity = 0;
    }

    // Clamp velocity based on hyperspace status
    this.velocity = this.isHyperspaceActive
      ? Constants.HYPERSPACE_SPEED // If hyperspace, set to max hyperspace speed
      : THREE.MathUtils.clamp(
          // Otherwise, clamp to normal min/max
          this.velocity,
          Constants.MIN_SPEED,
          Constants.MAX_SPEED
        );

    // Update Roll Rate
    if (rollLeft) this.rollRate += Constants.ROLL_ACCELERATION * deltaTime;
    else if (rollRight)
      this.rollRate -= Constants.ROLL_ACCELERATION * deltaTime;
    else {
      // Apply angular damping only if not rolling
      this.rollRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.rollRate) < 0.01) this.rollRate = 0;
    }

    // Update Pitch Rate
    if (pitchDown)
      this.pitchRate -=
        Constants.PITCH_ACCELERATION *
        deltaTime; // Pitch nose down is negative rotation around X
    else if (pitchUp)
      this.pitchRate +=
        Constants.PITCH_ACCELERATION *
        deltaTime; // Pitch nose up is positive rotation around X
    else {
      // Apply angular damping only if not pitching
      this.pitchRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.pitchRate) < 0.01) this.pitchRate = 0;
    }

    // Apply Movement and Rotation to Camera
    const moveDirection = new THREE.Vector3(0, 0, -1); // Move along camera's local Z
    moveDirection.applyQuaternion(this.game.camera.quaternion);
    this.game.camera.position.addScaledVector(
      moveDirection,
      this.velocity * deltaTime
    );

    // Apply rotation. Order matters (e.g., pitch then roll relative to new pitch)
    // Typically, you'd apply pitch around the camera's local X axis,
    // and roll around the camera's local Z axis.
    this.game.camera.rotateX(this.pitchRate * deltaTime); // Rotate around local X axis
    this.game.camera.rotateZ(this.rollRate * deltaTime); // Rotate around local Z axis

    // --- Update HUD ---
    const { x, y, z } = this.game.camera.position;
    this.game.reactSetCoordinates([x, y, z]);

    const normalizedSpeed = THREE.MathUtils.clamp(
      (this.velocity / Constants.MAX_SPEED) * 100,
      0,
      100
    );
    const normalizedRoll = THREE.MathUtils.clamp(
      this.rollRate / Constants.MAX_VISUAL_ROLL_RATE,
      -1,
      1
    );
    // Invert pitch for HUD: positive pitch rate (nose up) should move marker right (positive direction)
    const normalizedPitch = THREE.MathUtils.clamp(
      this.pitchRate / Constants.MAX_VISUAL_PITCH_RATE,
      -1,
      1
    );

    this.game.reactSetSpeed(normalizedSpeed);
    this.game.reactSetRoll(normalizedRoll);
    this.game.reactSetPitch(normalizedPitch); // Pass the possibly inverted pitch for HUD

    // --- Station Proximity Check & Direction ---
    if (this.game.assets.spaceStation?.visible && this.game.camera) {
      // Check station is visible
      const playerPos = this.game.camera.position;
      const stationPos = this.game.assets.spaceStation.getPosition(); // Use entity method
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
    } else {
      // No station visible or loaded, clear direction indicator
      this.game.reactSetStationDirection(null);
    }

    // --- Pirate AI ---
    const playerPos = this.game.camera.position;
    this.game.assets.pirateShips.forEach(pirate => {
        if (!pirate.mesh || !pirate.visible) return; // Skip inactive pirates

        const piratePos = pirate.getPosition();
        const distanceToPlayer = playerPos.distanceTo(piratePos);

        if (distanceToPlayer < Constants.PIRATE_ATTACK_RANGE) {
            // --- Attack Behavior ---

            // 1. Turn towards player
            const directionToPlayer = this.tempVector.subVectors(playerPos, piratePos).normalize();
            const targetQuaternion = this.tempQuaternion.setFromUnitVectors(
                new THREE.Vector3(0, 0, 1), // Assuming pirate model faces +Z
                directionToPlayer
            );

            // Smoothly rotate towards the target orientation
            pirate.mesh.quaternion.rotateTowards(targetQuaternion, Constants.PIRATE_TURN_RATE * deltaTime);

            // 2. Move towards player
            // Get the pirate's forward direction based on its current rotation
            const forward = new THREE.Vector3(0, 0, 1);
            forward.applyQuaternion(pirate.mesh.quaternion);

            // Move along the forward vector
            piratePos.addScaledVector(forward, Constants.PIRATE_SPEED * deltaTime);
            pirate.setPosition(piratePos.x, piratePos.y, piratePos.z);

            // (Future: Add firing logic here)
            // console.log(`Pirate ${pirate.mesh.name} attacking! Dist: ${distanceToPlayer.toFixed(0)}`);

        } else {
            // --- Idle/Patrol Behavior (Optional) ---
            // For now, pirates do nothing if player is out of range.
            // Could add simple patrolling logic here later.
        }
    });

    // --- Collision Detection (Placeholder) ---
    // ... (Add basic collision checks later if needed) ...
  }

  // --- Input Handlers ---
  private handleKeyDown(event: KeyboardEvent): void {
    let keyIdentifier = event.code;
    // Handle specific keys needing mapping
    if (event.key === "/") keyIdentifier = "Slash"; // Pitch Up (Alternative)
    if (event.key === ".") keyIdentifier = "Period"; // Roll Right (Alternative)
    if (event.key === ",") keyIdentifier = "Comma"; // Roll Left (Alternative)

    // Handle J key specifically for hyperspace toggle
    if (keyIdentifier === "KeyJ") {
      this.toggleHyperspace();
      return; // Don't add 'J' to the general keysPressed set
    }
    // Add the identified key to the set
    this.keysPressed.add(keyIdentifier);
  }

  private handleKeyUp(event: KeyboardEvent): void {
    let keyIdentifier = event.code;
    // Handle specific keys needing mapping
    if (event.key === "/") keyIdentifier = "Slash";
    if (event.key === ".") keyIdentifier = "Period";
    if (event.key === ",") keyIdentifier = "Comma";

    // Remove the identified key from the set
    this.keysPressed.delete(keyIdentifier);
  }

  private toggleHyperspace(): void {
    this.isHyperspaceActive = !this.isHyperspaceActive;
    console.log(`Hyperspace Toggled: ${this.isHyperspaceActive}`);
    if (!this.isHyperspaceActive) {
      // When turning hyperspace OFF, clamp speed back to normal max immediately
      this.velocity = Math.min(this.velocity, Constants.MAX_SPEED);
    } else {
      // When turning hyperspace ON, velocity will be set in the update loop
    }
  }
}
