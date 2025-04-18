import * as THREE from "three";
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager, RadarPosition } from "../../types";
import * as Constants from "../../constants";
import { EntityBase } from "../../game/entities/EntityBase";
import { Ship } from "../../game/entities/Ship"; // Import Ship

// Define radar range constant
const RADAR_DISTANCE = 10000;

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
  private tempVector2 = new THREE.Vector3(); // Another reusable vector
  // Add a third temporary vector if needed, or create inline
  // private tempVector3 = new THREE.Vector3();

  // Laser state
  private laserHeat: number = 0;
  private laserCooldownTimer: number = 0;
  private wantsToFire: boolean = false;
  private laserBeam: THREE.Line | null = null;
  private laserBeamHideTimer: number = 0;
  private raycaster = new THREE.Raycaster();

  constructor(game: IGameManager) {
    super(game);
    console.log("SpaceFlightSceneLogic constructor");
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
    const x =
      relativeTo.x + distance * Math.sin(angle) * Math.cos(elevationAngle);
    const y = relativeTo.y + distance * Math.sin(elevationAngle);
    const z =
      relativeTo.z - distance * Math.cos(angle) * Math.cos(elevationAngle); // Usually move along negative Z

    entity.setPosition(x, y, z);
    entity.setRotation(
      // Random orientation
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    entity.setVisible(true);
    console.log(
      `${
        entity.mesh.name || "Object"
      } positioned at distance: ${distance.toFixed(
        0
      )} from ${relativeTo.toArray()}`
    );
  }

  enter(previousState?: GameState): void {
    console.log("Entering SpaceFlightSceneLogic scene");
    super.enter(previousState); // Resets common visibility

    // Position planet far away
    if (this.gameManager.assets.planet && this.gameManager.camera) {
      this.positionObjectRandomly(
        this.gameManager.assets.planet,
        this.gameManager.camera.far * 0.8
      );
      //(this.gameManager.assets.planet.mesh?.material as THREE.Material).needsUpdate = true;
    }

    // Position station relative to the planet
    if (this.gameManager.assets.spaceStation && this.gameManager.assets.planet?.mesh) {
      // Check planet mesh exists
      const planetPos = this.gameManager.assets.planet.getPosition(); // Use entity method
      const offsetDist = THREE.MathUtils.randFloat(
        Constants.STATION_PLANET_OFFSET_MIN,
        Constants.STATION_PLANET_OFFSET_MAX
      );
      const randomOffset = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(offsetDist);
      const stationPos = planetPos.add(randomOffset);

      this.gameManager.assets.spaceStation.setPosition(
        stationPos.x,
        stationPos.y,
        stationPos.z
      );
      this.gameManager.assets.spaceStation.setRotation(
        // Random orientation
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      this.gameManager.assets.spaceStation.setVisible(true);

      console.log(
        `Station positioned near planet at offset: ${offsetDist.toFixed(0)}`
      );
    } else {
      console.warn(
        "Could not position station relative to planet (planet missing?)."
      );
    }

    // Position Pirates randomly around the player's starting position
    const playerStartPosition =
      this.gameManager.camera?.position ?? new THREE.Vector3(0, 0, 0);
    this.gameManager.assets.pirateShips.forEach((pirate) => {
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
    if (this.gameManager.camera) {
      this.gameManager.camera.rotation.set(0, 0, 0);
      this.gameManager.camera.position.set(0, 0, 0);
      // Log camera clipping planes
      console.log(
        `Camera Clipping Planes: Near=${this.gameManager.camera.near}, Far=${this.gameManager.camera.far}`
      );
    }
    this.isHyperspaceActive = false; // Start with hyperspace off

    this.laserHeat = 0;
    this.laserCooldownTimer = 0;
    this.wantsToFire = false;
    this.laserBeamHideTimer = 0;

    // Initialize laser beam object
    if (this.laserBeam) {
      this.gameManager.scene?.remove(this.laserBeam);
      this.laserBeam.geometry.dispose();
      (this.laserBeam.material as THREE.Material).dispose();
    }
    const laserMaterial = new THREE.LineBasicMaterial({
      color: Constants.LASER_COLOR,
      linewidth: 5,
      transparent: true,
      opacity: 1,
    });

    // Create two slightly offset lines to make the beam more visible
    const points1 = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)];
    const points2 = [
      new THREE.Vector3(0.1, 0.1, 0),
      new THREE.Vector3(0.1, 0.1, -1),
    ];
    const allPoints = [...points1, ...points2];
    const laserGeometry = new THREE.BufferGeometry().setFromPoints(allPoints);
    this.laserBeam = new THREE.LineSegments(laserGeometry, laserMaterial);
    this.laserBeam.visible = false;
    this.laserBeam.frustumCulled = false;
    this.laserBeam.renderOrder = 999;
    if (this.gameManager.scene) {
      console.log("Adding laser beam to scene");
      this.gameManager.scene.add(this.laserBeam);
    }

    // Make sure event listeners are properly bound
    window.removeEventListener("keydown", this.boundHandleKeyDown); // Remove first in case
    window.removeEventListener("keyup", this.boundHandleKeyUp);
    window.addEventListener("keydown", this.boundHandleKeyDown);
    window.addEventListener("keyup", this.boundHandleKeyUp);
    console.log("Key event listeners bound");
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    this.resetHud();
    window.removeEventListener("keydown", this.boundHandleKeyDown);
    window.removeEventListener("keyup", this.boundHandleKeyUp);
    this.keysPressed.clear();
    this.isHyperspaceActive = false; // Reset hyperspace state on exit

    // Hide planet, station, and pirates
    this.gameManager.assets.planet?.setVisible(false);
    this.gameManager.assets.spaceStation?.setVisible(false);
    this.gameManager.assets.pirateShips.forEach((pirate) => pirate.setVisible(false));

    this.wantsToFire = false; // Ensure firing stops on exit
    if (this.laserBeam) {
      this.laserBeam.visible = false;
      this.gameManager.scene?.remove(this.laserBeam); // Remove from scene
      this.laserBeam.geometry.dispose();
      (this.laserBeam.material as THREE.Material).dispose();
      this.laserBeam = null;
    }
  }

  update(deltaTime: number): void {
    if (!this.gameManager.camera || !this.laserBeam) return;

    // --- Update Timers ---
    this.laserCooldownTimer = Math.max(0, this.laserCooldownTimer - deltaTime);
    this.laserBeamHideTimer = Math.max(0, this.laserBeamHideTimer - deltaTime);

    // --- Handle Input ---
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

    // Read firing key
    this.wantsToFire = this.keysPressed.has("Space"); // Use Spacebar to fire
    if (this.wantsToFire) {
      console.log("Space pressed - wants to fire");
      console.log(
        `Cooldown: ${this.laserCooldownTimer}, Heat: ${this.laserHeat}`
      );
    }

    // --- Laser Cooling ---
    if (!this.wantsToFire && this.laserHeat > 0) {
      this.laserHeat = Math.max(
        0,
        this.laserHeat - Constants.LASER_HEAT_DECREASE_RATE * deltaTime
      );
    }

    // --- Laser Firing ---
    if (
      this.wantsToFire &&
      this.laserCooldownTimer <= 0 &&
      this.laserHeat < Constants.LASER_MAX_HEAT
    ) {
      console.log("=== LASER FIRING ===");
      console.log(`LaserBeam exists: ${this.laserBeam !== null}`);
      console.log(
        `LaserBeam in scene: ${this.gameManager.scene?.children.includes(
          this.laserBeam!
        )}`
      );
      console.log(
        `Heat: ${this.laserHeat}, Cooldown: ${this.laserCooldownTimer}`
      );

      this.laserCooldownTimer = Constants.LASER_COOLDOWN;
      this.laserHeat = Math.min(
        Constants.LASER_MAX_HEAT,
        this.laserHeat + Constants.LASER_HEAT_INCREASE
      );

      // --- Re-enable Raycasting ---
      // Set raycaster from camera center
      this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.gameManager.camera); // Ray from screen center

      // Prepare list of pirate meshes to check against
      const pirateMeshes: THREE.Object3D[] = this.gameManager.assets.pirateShips
        .map((p) => p.mesh) // Get the mesh from each Ship entity
        .filter(
          (mesh): mesh is THREE.Object3D => mesh !== null && mesh.visible
        ); // Filter out null or invisible meshes

      const intersects = this.raycaster.intersectObjects(pirateMeshes, true); // Check recursively

      let hitDistance = Constants.LASER_RANGE; // Default range
      let hitTarget: Ship | null = null;

      if (intersects.length > 0) {
        // Find the closest intersection
        const closestHit = intersects[0];
        if (closestHit.distance <= Constants.LASER_RANGE) {
          hitDistance = closestHit.distance;
          console.log(`Raycast hit distance: ${hitDistance.toFixed(0)}`); // Keep log

          // Find which pirate Ship entity corresponds to the hit mesh
          let hitMesh = closestHit.object;
          while (hitMesh.parent && !(hitMesh.userData.entity instanceof Ship)) {
            hitMesh = hitMesh.parent; // Traverse up if we hit a child mesh
          }
          if (hitMesh.userData.entity instanceof Ship) {
            hitTarget = hitMesh.userData.entity;
            console.log(
              `Hit Pirate: ${
                hitTarget?.mesh?.name
              }! Distance: ${hitDistance.toFixed(0)}`
            ); // Keep log
            // TODO: Apply damage to hitTarget
          } else {
            console.log(
              `Hit something, but couldn't identify pirate. Distance: ${hitDistance.toFixed(
                0
              )}`
            ); // Keep log
          }
        }
      }
      // --- End Re-enabled Raycasting ---

      // Visualize Laser Beam
      const startPoint = this.gameManager.camera.position.clone();
      const direction = this.tempVector
        .set(0, 0, -1)
        .applyQuaternion(this.gameManager.camera.quaternion);
      startPoint.addScaledVector(direction, 10.0); // Offset in front of camera
      const endPoint = this.tempVector2
        .copy(startPoint)
        .addScaledVector(direction, hitDistance);

      // Offset for the second line (for thickness effect)
      const offset = new THREE.Vector3(0.1, 0.1, 0).applyQuaternion(
        this.gameManager.camera.quaternion
      );
      const startPoint2 = startPoint.clone().add(offset);
      const endPoint2 = endPoint.clone().add(offset);

      const positions = this.laserBeam.geometry.attributes
        .position as THREE.BufferAttribute;
      positions.setXYZ(0, startPoint.x, startPoint.y, startPoint.z);
      positions.setXYZ(1, endPoint.x, endPoint.y, endPoint.z);
      positions.setXYZ(2, startPoint2.x, startPoint2.y, startPoint2.z);
      positions.setXYZ(3, endPoint2.x, endPoint2.y, endPoint2.z);
      positions.needsUpdate = true;
      this.laserBeam.geometry.computeBoundingSphere(); // Update bounds

      console.log("Setting laser beam visible..."); // Keep pre-visibility log
      this.laserBeam.visible = true;
      this.laserBeamHideTimer = Constants.LASER_DURATION;
      console.log(
        `Laser visible: ${this.laserBeam.visible}, Hide timer: ${this.laserBeamHideTimer}`
      ); // Keep final log
    } else if (this.laserBeamHideTimer <= 0 && this.laserBeam.visible) {
      // Hide laser beam if timer expired
      this.laserBeam.visible = false;
      console.log("Laser hidden by timer.");
    }

    // --- Update Velocity & Movement (existing code) ---
    // ... (velocity update logic remains the same) ...
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
    if (pitchDown) this.pitchRate -= Constants.PITCH_ACCELERATION * deltaTime;
    // Pitch nose down is negative rotation around X
    else if (pitchUp)
      this.pitchRate += Constants.PITCH_ACCELERATION * deltaTime;
    // Pitch nose up is positive rotation around X
    else {
      // Apply angular damping only if not pitching
      this.pitchRate *= 1 - Constants.ANGULAR_DAMPING * deltaTime;
      if (Math.abs(this.pitchRate) < 0.01) this.pitchRate = 0;
    }

    // Apply Movement and Rotation to Camera
    const moveDirection = new THREE.Vector3(0, 0, -1); // Move along camera's local Z
    moveDirection.applyQuaternion(this.gameManager.camera.quaternion);
    this.gameManager.camera.position.addScaledVector(
      moveDirection,
      this.velocity * deltaTime
    );

    // Apply rotation. Order matters (e.g., pitch then roll relative to new pitch)
    // Typically, you'd apply pitch around the camera's local X axis,
    // and roll around the camera's local Z axis.
    this.gameManager.camera.rotateX(this.pitchRate * deltaTime); // Rotate around local X axis
    this.gameManager.camera.rotateZ(this.rollRate * deltaTime); // Rotate around local Z axis

    // --- Check planet collision ---
    if (this.gameManager.assets.planet?.visible) {
      const playerPos = this.gameManager.camera.position;
      const planetPos = this.gameManager.assets.planet.getPosition();
      const distanceToPlanet = playerPos.distanceTo(planetPos);
      
      // We need to get the planet's radius or approximate size
      // Since we don't have a specific constant for it, we'll use an estimated value
      // based on the model or a reasonable fraction of the camera's far plane
      const planetRadius = this.gameManager.camera.far * 0.05; // Estimate planet radius as 5% of camera's far plane
      const collisionBuffer = 50; // Additional buffer to account for ship size
      
      if (distanceToPlanet < planetRadius + collisionBuffer) {
        console.log("COLLISION: Hit planet surface!");
        // Play crash sound or visual effect if desired
        
        // Return to title screen after planet collision
        this.gameManager.switchState("title");
        return; // Exit update loop early after collision
      }
    }

    // --- Update HUD ---
    // Crosshair: This is typically a static overlay element in the center of the HUD UI (React component).
    // The raycast logic above effectively uses the center of the screen as the aiming point.
    const { x, y, z } = this.gameManager.camera.position;
    this.gameManager.reactSetters.setCoordinates([x, y, z]);

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
    const normalizedLaserHeat = THREE.MathUtils.clamp(
      (this.laserHeat / Constants.LASER_MAX_HEAT) * 100,
      0,
      100
    );

    this.gameManager.reactSetters.setSpeed(normalizedSpeed);
    this.gameManager.reactSetters.setRoll(normalizedRoll);
    this.gameManager.reactSetters.setPitch(normalizedPitch); // Pass the possibly inverted pitch for HUD
    this.gameManager.reactSetters.setLaserHeat(normalizedLaserHeat); // Update laser heat on HUD

    // --- Calculate altitude (distance to planet) ---
    if (this.gameManager.assets.planet?.visible) {
      const playerPos = this.gameManager.camera.position;
      const planetPos = this.gameManager.assets.planet.getPosition();
      const distanceToPlanet = playerPos.distanceTo(planetPos);
      
      // Normalize altitude as a percentage of the max value (10000000)
      const MAX_ALTITUDE = 10000000; // Max altitude in units
      const normalizedAltitude = THREE.MathUtils.clamp(
        (distanceToPlanet / MAX_ALTITUDE) * 100,
        0,
        100
      );
      
      this.gameManager.reactSetters.setAltitude(normalizedAltitude);
    } else {
      // No planet visible
      this.gameManager.reactSetters.setAltitude(0);
    }

    // --- Station Proximity Check & Direction ---
    if (this.gameManager.assets.spaceStation?.visible && this.gameManager.camera) {
      // Check station is visible
      const playerPos = this.gameManager.camera.position;
      const stationPos = this.gameManager.assets.spaceStation.getPosition(); // Use entity method
      const distanceToStation = playerPos.distanceTo(stationPos);

      if (distanceToStation < Constants.STATION_DOCKING_RADIUS) {
        console.log("Reached space station!");
        this.gameManager.switchState("title"); // Go back to title screen
        this.gameManager.reactSetters.setStationDirection(null); // Clear direction on docking
      } else {
        // Calculate direction for HUD
        // Use tempVector for worldDir
        const worldDir = this.tempVector
          .subVectors(stationPos, playerPos)
          .normalize();

        // Project onto camera's local coordinate system
        const cameraInverse = this.tempQuaternion
          .copy(this.gameManager.camera?.quaternion || new THREE.Quaternion())
          .invert();
        const relativeDir = this.tempVector2
          .copy(worldDir)
          .applyQuaternion(cameraInverse);

        const isStationInFrontOfCamera = relativeDir.z < 0;
        const vector = isStationInFrontOfCamera
          ? new THREE.Vector3(0, 0, -1)
          : new THREE.Vector3(0, 0, 1);
        const cameraLine = vector.applyQuaternion(this.gameManager.camera.quaternion);

        const angleBetween = cameraLine.angleTo(worldDir);

        const currentFOV = this.gameManager.camera.fov || 75;
        const halfFOV = THREE.MathUtils.degToRad(currentFOV) / 2;
        const offCenterAmount = THREE.MathUtils.clamp(
          angleBetween / halfFOV,
          0,
          1
        );

        // Pass the projected X/Y for angle, and offCenterAmount for distance
        this.gameManager.reactSetters.setStationDirection({
          x: relativeDir.x,
          y: relativeDir.y,
          offCenterAmount: offCenterAmount,
          isInFront: isStationInFrontOfCamera
        });
      }
    } else {
      // No station visible or loaded
      this.gameManager.reactSetters.setStationDirection(null);
    }

    // --- Pirate AI ---
    const playerPos = this.gameManager.camera.position;
    this.gameManager.assets.pirateShips.forEach((pirate) => {
      if (!pirate.mesh || !pirate.visible) return; // Skip inactive pirates

      const piratePos = pirate.getPosition();
      const distanceToPlayer = playerPos.distanceTo(piratePos);

      if (distanceToPlayer < Constants.PIRATE_ATTACK_RANGE) {
        // --- Attack Behavior ---

        // 1. Turn towards player
        const directionToPlayer = this.tempVector
          .subVectors(playerPos, piratePos)
          .normalize();
        // Ensure pirate mesh has userData.entity set if not already
        if (!pirate.mesh.userData.entity) pirate.mesh.userData.entity = pirate;

        const targetQuaternion = this.tempQuaternion.setFromUnitVectors(
          new THREE.Vector3(0, 0, 1), // Assuming pirate model faces +Z
          directionToPlayer
        );

        // Smoothly rotate towards the target orientation
        pirate.mesh.quaternion.rotateTowards(
          targetQuaternion,
          Constants.PIRATE_TURN_RATE * deltaTime
        );

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

    // --- Update pirate positions for radar ---
    const piratePositions: RadarPosition[] = this.gameManager.assets.pirateShips
      .filter(pirate => pirate.mesh && pirate.visible)
      .map(pirate => {
        const piratePos = pirate.getPosition();
        const distance = playerPos.distanceTo(piratePos);

        // Only include pirates within radar range
        if (distance > RADAR_DISTANCE) {
          return null; // Exclude pirates outside radar range
        }

        // Get direction vector from player to pirate
        const worldDir = this.tempVector
          .subVectors(piratePos, playerPos)
          .normalize(); // Normalize to get direction only

        // Project onto camera's local coordinate system
        const cameraInverse = this.tempQuaternion
          .copy(this.gameManager.camera?.quaternion || new THREE.Quaternion())
          .invert();
        const relativeDir = this.tempVector2
          .copy(worldDir)
          .applyQuaternion(cameraInverse);

        // Use the components of the relative direction vector, clamped to -1..1
        const relativeX = THREE.MathUtils.clamp(relativeDir.x, -1, 1);
        const relativeY = THREE.MathUtils.clamp(relativeDir.y, -1, 1);
        // Z component indicates forward/backward direction relative to camera view
        const relativeZ = THREE.MathUtils.clamp(relativeDir.z, -1, 1); 

        return {
          x: relativeX,
          y: relativeY,
          z: relativeZ,
        };
      })
      .filter((p): p is RadarPosition => p !== null); // Filter out null entries

    // Update radar with pirate positions
    this.gameManager.reactSetters.setRadarPositions(piratePositions);
  }

  // --- Input Handlers ---
  private handleKeyDown(event: KeyboardEvent): void {
    let keyIdentifier = event.code;
    // Handle specific keys needing mapping
    if (event.key === "/") keyIdentifier = "Slash"; // Pitch Up (Alternative)
    if (event.key === ".") keyIdentifier = "Period"; // Roll Right (Alternative)
    if (event.key === ",") keyIdentifier = "Comma"; // Roll Left (Alternative)
    // Map Spacebar explicitly if needed, though event.code should be "Space"
    if (event.key === " ") keyIdentifier = "Space";

    console.log(`Key pressed: ${keyIdentifier}`);

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
    if (event.key === " ") keyIdentifier = "Space";

    console.log(`Key released: ${keyIdentifier}`);
    // Remove the identified key from the set
    this.keysPressed.delete(keyIdentifier);
    console.log(
      `Keys still pressed: ${Array.from(this.keysPressed).join(", ")}`
    );
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

  private resetHud(): void {
    // Reset HUD displays when exiting the scene
    this.gameManager.reactSetters.setCoordinates([0, 0, 0]);
    this.gameManager.reactSetters.setSpeed(0);
    this.gameManager.reactSetters.setRoll(0);
    this.gameManager.reactSetters.setPitch(0);
    this.gameManager.reactSetters.setLaserHeat(0);
    this.gameManager.reactSetters.setAltitude(0);
    this.gameManager.reactSetters.setStationDirection(null);
    this.gameManager.reactSetters.setRadarPositions([]); // Ensure radar is cleared
  }

   // Update coordinate display in React UI
   protected updateCoordinates(coords: [number, number, number]): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setCoordinates(coords);
  }

  // Update speed display in React UI
  protected updateSpeed(speed: number): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setSpeed(speed);
  }

  // Update roll indicator in React UI
  protected updateRoll(roll: number): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setRoll(roll);
  }

  // Update pitch indicator in React UI
  protected updatePitch(pitch: number): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setPitch(pitch);
  }

  // Update space station direction indicator in React UI
  protected updateStationDirection(direction: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setStationDirection(direction);
  }

  // Update pirate ship positions for radar display
  protected updatePiratePositions(positions: RadarPosition[]): void {
    if (!this.isActive) return;
    this.gameManager.reactSetters.setRadarPositions(positions);
  }

  // Common utility for switching to different scenes
  protected switchToScene(scene: string): void {
    if (!this.isActive) return;
    this.gameManager.switchState(scene as any); // GameState is string union type
  }
}
