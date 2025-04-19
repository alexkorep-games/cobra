// src/features/space_flight/SpaceFlightSceneR3F.tsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameState } from "@/features/common/useGameState";
import { useHudState } from "@/features/common/useHudState";
import { RadarPosition } from "@/types";
import * as Constants from "@/constants";
import { useInput } from "@/hooks/useInput";

// Import R3F Entity Components
import PlanetComponent from "@/components/r3f/PlanetComponent";
import SpaceStationComponent from "@/components/r3f/SpaceStationComponent";
import ShipComponent from "@/components/r3f/ShipComponent";
import { useAssets } from "@/hooks/useAssets";

interface PirateState {
  id: number;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  visible: boolean;
  modelPath: string;
  velocity: THREE.Vector3; // Make velocity non-optional for easier handling
  // Add health etc. later if needed
}

// Helper function for deep comparison of relevant pirate properties
// (You might want a more robust deep comparison if state gets complex)
const havePiratePropsChanged = (p1: PirateState, p2: PirateState): boolean => {
  if (!p1.position.equals(p2.position)) return true;
  if (!p1.quaternion.equals(p2.quaternion)) return true;
  if (!p1.velocity.equals(p2.velocity)) return true;
  if (p1.visible !== p2.visible) return true;
  // Add checks for health, etc. if they are added later
  return false;
};

const SpaceFlightSceneR3F: React.FC = () => {
  const { assets } = useAssets(); // Get assets via hook
  const { camera } = useThree();
  const { shipControls } = useInput();
  const { setGameState } = useGameState();
  const {
    setCoordinates,
    setSpeed,
    setRoll,
    setPitch,
    // setAltitude, // Altitude calculation not implemented yet
    setLaserHeat,
    setStationDirection,
    setRadarPositions,
  } = useHudState();

  // --- Refs ---
  const laserBeamRef = useRef<THREE.LineSegments>(null);
  const pirateShipRefs = useRef<(THREE.Group | null)[]>([]);

  // --- State ---
  const velocity = useRef(new THREE.Vector3());
  const rollRate = useRef(0); // Current angular velocity for roll
  const pitchRate = useRef(0); // Current angular velocity for pitch
  const [pirateStates, setPirateStates] = useState<PirateState[]>([]);
  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  const wantsToFire = useRef(false);
  const laserBeamHideTimer = useRef(0);
  const laserBeamPoints = useRef([
    new THREE.Vector3(0, 0, 1), // Start slightly ahead of camera origin
    new THREE.Vector3(0, 0, 1 - Constants.LASER_LENGTH), // Extend forward
  ]).current;
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null);
  const stationRef = useRef<THREE.Group>(null); // Ref for the station group

  // --- Temporary Vectors for Calculations ---
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const forwardVector = useRef(new THREE.Vector3(0, 0, -1)).current; // Local forward
  const rightVector = useRef(new THREE.Vector3(1, 0, 0)).current; // Local right
  // const raycaster = useRef(new THREE.Raycaster()).current; // Keep if needed for laser hits

  // --- Initialization ---
  useEffect(() => {
    console.log("[SpaceFlightSceneR3F] Mounting & Initializing State");
    if (!assets) {
      console.error("[SpaceFlightSceneR3F] Assets not loaded!");
      return; // Don't initialize if assets aren't ready
    }

    // Reset player state
    velocity.current.set(0, 0, 0);
    rollRate.current = 0;
    pitchRate.current = 0;
    camera.position.set(0, 0, Constants.STATION_DOCKING_RADIUS * 1.5); // Start just outside docking radius
    camera.rotation.set(0, 0, 0);
    camera.quaternion.identity();

    currentLaserHeat.current = 0;
    laserCooldownTimer.current = 0;
    wantsToFire.current = false;
    laserBeamHideTimer.current = 0;

    // Reset HUD
    setCoordinates([camera.position.x, camera.position.y, camera.position.z]);
    setSpeed(0);
    setRoll(0);
    setPitch(0);
    // setAltitude(0); // Reset altitude if/when implemented
    setLaserHeat(0);
    setStationDirection(null);
    setRadarPositions([]);

    // Initialize Pirate States
    const initialPirates = assets.pirateShips.map((config, index) => {
      const pirate: PirateState = {
        id: index,
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
        visible: true,
        modelPath: config.modelPath,
        velocity: new THREE.Vector3(),
      };
      // Position Pirates relative to player start
      positionObjectRandomly(
        pirate.position,
        pirate.quaternion,
        Constants.PIRATE_BASE_DISTANCE,
        Constants.PIRATE_POSITION_OFFSET_RANGE,
        camera.position // Relative to camera's starting position
      );
      console.log(
        `[SpaceFlightSceneR3F] Pirate ${index} positioned at ${pirate.position.toArray()}`
      );
      return pirate;
    });
    setPirateStates(initialPirates);
    pirateShipRefs.current = initialPirates.map(() => null);

    // --- Input Handlers Setup ---
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      // Handle single press actions
      if (key === "n") {
        console.log("[SpaceFlightSceneR3F] Switching to Short Range Chart");
        setGameState("short_range_chart");
      }
      if (key === " ") {
        wantsToFire.current = true;
      }
      // Add other single-press actions here (e.g., hyperspace 'h')
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === " ") {
        wantsToFire.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup
    return () => {
      console.log("[SpaceFlightSceneR3F] Unmounting & Cleaning Up");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      // No need to reset HUD here, maybe on next state entry?
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, setGameState]);

  // --- Positioning Logic Helper ---
  const positionObjectRandomly = useCallback(
    (
      position: THREE.Vector3,
      quaternion: THREE.Quaternion,
      baseDistance: number,
      offsetRange: THREE.Vector2, // Now using the constant directly
      relativeTo: THREE.Vector3
    ) => {
      const distance =
        baseDistance *
        THREE.MathUtils.lerp(offsetRange.x, offsetRange.y, Math.random());
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(Math.random() * 2 - 1);

      position.set(
        distance * Math.sin(theta) * Math.cos(phi),
        distance * Math.sin(theta) * Math.sin(phi),
        distance * Math.cos(theta)
      );
      position.add(relativeTo); // Add the relative offset
      quaternion.random();
    },
    []
  );

  // --- Game Loop Logic (useFrame) ---
  useFrame((state, delta) => {
    // Ensure assets are loaded before running game loop logic
    if (!assets) return;

    const { camera } = state;
    // Clamp delta to prevent physics glitches if frame rate tanks
    const dt = Math.min(delta, 0.05);

    let targetRollRate = 0;
    let targetPitchRate = 0;
    let accelerationInput = 0;
    let decelerationInput = 0;

    if (shipControls.rollLeft) targetRollRate = -Constants.ROLL_ACCELERATION;
    if (shipControls.rollRight) targetRollRate = Constants.ROLL_ACCELERATION;
    if (shipControls.pitchUp) targetPitchRate = -Constants.PITCH_ACCELERATION;
    if (shipControls.pitchDown) targetPitchRate = Constants.PITCH_ACCELERATION;
    if (shipControls.accelerate) accelerationInput = Constants.ACCELERATION;
    if (shipControls.brake) decelerationInput = Constants.DECELERATION;

    // --- Player Ship Physics & Movement ---

    // Interpolate current rates towards target rates
    rollRate.current = THREE.MathUtils.damp(
      rollRate.current,
      targetRollRate !== 0
        ? Math.sign(targetRollRate) * Constants.MAX_VISUAL_ROLL_RATE
        : 0,
      Constants.ANGULAR_DAMPING,
      dt
    );
    pitchRate.current = THREE.MathUtils.damp(
      pitchRate.current,
      targetPitchRate !== 0
        ? Math.sign(targetPitchRate) * Constants.MAX_VISUAL_PITCH_RATE
        : 0,
      Constants.ANGULAR_DAMPING,
      dt
    );

    // Apply rotation deltas
    tempQuaternion.setFromAxisAngle(
      forwardVector.set(0, 0, -1),
      rollRate.current * dt
    );
    camera.quaternion.premultiply(tempQuaternion);
    tempQuaternion.setFromAxisAngle(
      rightVector.set(1, 0, 0),
      pitchRate.current * dt
    );
    camera.quaternion.premultiply(tempQuaternion);
    camera.quaternion.normalize();

    // Linear Movement
    const worldForward = tempVector
      .set(0, 0, -1)
      .applyQuaternion(camera.quaternion);
    velocity.current.addScaledVector(worldForward, accelerationInput * dt);

    if (decelerationInput > 0) {
      const brakeForce = tempVector2
        .copy(velocity.current)
        .normalize()
        .multiplyScalar(-decelerationInput * dt);
      if (velocity.current.lengthSq() > brakeForce.lengthSq()) {
        velocity.current.add(brakeForce);
      } else {
        velocity.current.set(0, 0, 0);
      }
    }

    velocity.current.multiplyScalar(Math.pow(1 - Constants.LINEAR_DAMPING, dt));

    const currentSpeed = velocity.current.length();
    if (currentSpeed > Constants.MAX_SPEED) {
      velocity.current.normalize().multiplyScalar(Constants.MAX_SPEED);
    } else if (currentSpeed < Constants.MIN_SPEED && currentSpeed > 0) {
      // Apply min speed threshold only if moving slightly
      if (
        velocity.current.lengthSq() <
        Constants.MIN_SPEED * Constants.MIN_SPEED
      ) {
        velocity.current.set(0, 0, 0); // Come to a full stop if below min speed threshold after damping/braking
      }
    }

    // Update camera position
    camera.position.addScaledVector(velocity.current, dt);

    // --- Laser Logic ---
    laserCooldownTimer.current = Math.max(0, laserCooldownTimer.current - dt);
    laserBeamHideTimer.current = Math.max(0, laserBeamHideTimer.current - dt);

    if (
      wantsToFire.current &&
      currentLaserHeat.current < Constants.LASER_MAX_HEAT &&
      laserCooldownTimer.current <= 0
    ) {
      currentLaserHeat.current = Math.min(
        Constants.LASER_MAX_HEAT,
        currentLaserHeat.current + Constants.LASER_HEAT_INCREASE
      );
      laserCooldownTimer.current = Constants.LASER_COOLDOWN;
      laserBeamHideTimer.current = Constants.LASER_DURATION;
      // TODO: Laser hit detection
    } else {
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - Constants.LASER_HEAT_DECREASE_RATE * dt
      );
    }

    if (laserBeamRef.current) {
      laserBeamRef.current.visible = laserBeamHideTimer.current > 0;
      if (laserBeamRef.current.visible) {
        laserBeamRef.current.position.copy(camera.position);
        laserBeamRef.current.quaternion.copy(camera.quaternion);
      }
    }

    // --- Pirate Logic (FIXED) ---
    let hasAnyPirateStateChanged = false; // Flag to check if we need to call setPirateStates

    const nextPirateStates = pirateStates.map((pirate, index) => {
      const pirateRef = pirateShipRefs.current[index];
      // Skip update if ref isn't ready or pirate isn't visible (optimization)
      if (!pirateRef || !pirate.visible) {
        return pirate; // Return the original object if no update needed
      }

      // Create temporary variables to store potential new state
      const nextPosition = pirate.position.clone();
      const nextQuaternion = pirate.quaternion.clone();
      const nextVelocity = pirate.velocity.clone(); // Clone velocity too!

      // --- Calculate AI based updates ---
      const distanceToPlayerSq = nextPosition.distanceToSquared(
        camera.position
      );

      if (distanceToPlayerSq < Constants.PIRATE_ATTACK_RANGE_SQUARED) {
        // Use squared constant
        // Attack: Move towards player
        tempVector.copy(camera.position).sub(nextPosition).normalize(); // Direction to player
        nextVelocity.lerp(
          tempVector.multiplyScalar(Constants.PIRATE_SPEED),
          dt * 1.5 // Responsiveness factor
        );

        // Aim towards player - modifies the Ref directly
        pirateRef.lookAt(camera.position);
        // Capture the orientation from the ref AFTER lookAt
        nextQuaternion.copy(pirateRef.quaternion);
      } else {
        // Wander/Idle: Slow down
        nextVelocity.lerp(tempVector.set(0, 0, 0), dt * 0.5);
        // Optionally add some random turning when idle later
      }

      // Apply velocity to calculate next position
      nextPosition.addScaledVector(nextVelocity, dt);

      // --- Check if state actually changed ---
      const positionChanged = !nextPosition.equals(pirate.position);
      const quaternionChanged = !nextQuaternion.equals(pirate.quaternion);
      const velocityChanged = !nextVelocity.equals(pirate.velocity);
      // Add checks for 'visible' or other properties if they can change here

      // If any relevant property changed for THIS pirate...
      if (
        positionChanged ||
        quaternionChanged ||
        velocityChanged /* || visibilityChanged etc. */
      ) {
        hasAnyPirateStateChanged = true; // Mark that a state update is needed
        // Return a NEW object with the updated values
        return {
          ...pirate, // Keep id, modelPath etc.
          position: nextPosition,
          quaternion: nextQuaternion,
          velocity: nextVelocity,
          // visible: nextVisible // example if visibility could change
        };
      } else {
        // If nothing changed for THIS pirate, return the ORIGINAL object reference
        return pirate;
      }
    });

    // Only call setPirateStates if at least one pirate's state truly changed
    if (hasAnyPirateStateChanged) {
      // console.log("Updating Pirate States"); // Optional: Log only when actual updates occur
      setPirateStates(nextPirateStates);
    }

    // --- Docking Check ---
    if (stationRef.current) {
      const distanceToStationSq = camera.position.distanceToSquared(
        stationRef.current.position // Position of the group wrapper
      );
      if (distanceToStationSq < Constants.STATION_DOCKING_RANGE_SQUARED) {
        // Use squared constant
        console.log(
          "[SpaceFlightSceneR3F] Docking range entered. Returning to title."
        );
        setGameState("title");
        velocity.current.set(0, 0, 0); // Stop the ship upon docking
      }
    }

    // --- HUD Updates ---
    const finalSpeed = velocity.current.length();
    const normalizedRoll = THREE.MathUtils.clamp(
      rollRate.current / Constants.MAX_VISUAL_ROLL_RATE,
      -1,
      1
    );
    const normalizedPitch = THREE.MathUtils.clamp(
      pitchRate.current / Constants.MAX_VISUAL_PITCH_RATE,
      -1,
      1
    );

    setSpeed(Math.min(100, (finalSpeed / Constants.MAX_SPEED) * 100));
    setRoll(normalizedRoll);
    setPitch(normalizedPitch);
    setLaserHeat((currentLaserHeat.current / Constants.LASER_MAX_HEAT) * 100);
    setCoordinates([camera.position.x, camera.position.y, camera.position.z]);

    // --- Radar Calculation ---
    const radarPositionsData: RadarPosition[] = [];
    const cameraMatrix = camera.matrixWorldInverse;

    // Station Radar
    if (stationRef.current) {
      tempVector.copy(stationRef.current.position).applyMatrix4(cameraMatrix); // World to Camera space
      const distToStation = tempVector.length();

      if (distToStation < Constants.RADAR_DISTANCE) {
        // Make a copy before normalize if you need the original camera-space vector later
        const normalizedStationDir = tempVector2.copy(tempVector).normalize();
        radarPositionsData.push({
          x: normalizedStationDir.x,
          y: normalizedStationDir.y,
          z: normalizedStationDir.z,
        });
        setStationDirection({
          x: normalizedStationDir.x,
          y: normalizedStationDir.y,
          offCenterAmount: Math.min(
            1,
            Math.sqrt(normalizedStationDir.x ** 2 + normalizedStationDir.y ** 2)
          ),
          isInFront: normalizedStationDir.z < 0,
        });
      } else {
        setStationDirection(null);
      }
    } else {
      setStationDirection(null);
    }

    // Pirate Radar
    pirateStates.forEach((pirate) => {
      if (pirate.visible) {
        // Use pirate state visibility
        tempVector.copy(pirate.position).applyMatrix4(cameraMatrix);
        if (tempVector.lengthSq() < Constants.RADAR_DISTANCE_SQUARED) {
          // Use squared constant
          tempVector.normalize(); // Normalize for direction only
          radarPositionsData.push({
            x: tempVector.x,
            y: tempVector.y,
            z: tempVector.z,
          });
        }
      }
    });
    // NOTE: Consider optimizing radar updates. Calling setRadarPositions every frame
    // might be okay, but if performance becomes an issue, you could compare the
    // new radarPositionsData with the previous one before setting state.
    setRadarPositions(radarPositionsData);
  }); // End useFrame

  // --- Render 3D Components ---
  if (!assets) return null; // Don't render if assets aren't loaded

  return (
    <>
      {/* Planet */}
      {assets.planet && (
        <PlanetComponent
          radius={assets.planet.radius}
          color={assets.planet.color}
          position={[0, -assets.planet.radius - 5000, -15000]}
          visible={true}
        />
      )}

      {/* Space Station */}
      {assets.spaceStation && (
        <group ref={stationRef} position={[0, 0, 0]}>
          <SpaceStationComponent
            modelPath={assets.spaceStation.modelPath}
            initialScale={Constants.SHIP_SCALE * 2}
            wireframeColor={0xffff00}
            rotationSpeed={0.01}
            visible={true}
          />
        </group>
      )}

      {/* Pirates */}
      {pirateStates.map((pirate, index) => (
        <ShipComponent
          key={pirate.id} // Use stable key
          ref={(el) => (pirateShipRefs.current[index] = el)} // Assign ref
          modelPath={pirate.modelPath}
          initialScale={Constants.SHIP_SCALE}
          wireframeColor={0xff0000}
          visible={pirate.visible} // Controlled by state
          // IMPORTANT: Apply state changes directly here. The ShipComponent should use these props.
          position={pirate.position}
          quaternion={pirate.quaternion}
        />
      ))}

      {/* Laser Beam */}
      <lineSegments ref={laserBeamRef} visible={false} frustumCulled={false}>
        <bufferGeometry ref={laserGeometryRef} attach="geometry">
          {/* Use BufferAttribute constructor directly */}
          <primitive
            object={
              new THREE.BufferAttribute(
                new Float32Array(laserBeamPoints.flatMap((p) => p.toArray())),
                3
              )
            }
            attach="attributes-position"
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={Constants.LASER_COLOR}
          linewidth={Constants.LASER_LINE_WIDTH} // Use constant
          transparent
          opacity={0.8}
        />
      </lineSegments>

      {/* Add Stars / Skybox etc. here */}
    </>
  );
};

export default SpaceFlightSceneR3F;
