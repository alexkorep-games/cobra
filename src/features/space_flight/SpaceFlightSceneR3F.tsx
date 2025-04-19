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
  velocity?: THREE.Vector3;
  // Add health etc. later if needed
}

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
    camera.lookAt(0, 0, 0); // Look towards origin (where station might be)

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
  }, [assets, setGameState]); // Re-run initialization if assets load *after* mount

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

    // Rotation Input -> Target Rates
    if (shipControls.rollLeft) targetRollRate = -Constants.ROLL_ACCELERATION;
    if (shipControls.rollRight) targetRollRate = Constants.ROLL_ACCELERATION;
    if (shipControls.pitchUp) targetPitchRate = -Constants.PITCH_ACCELERATION;
    if (shipControls.pitchDown) targetPitchRate = Constants.PITCH_ACCELERATION;

    // Thrust/Brake Input
    if (shipControls.accelerate) {
      accelerationInput = Constants.ACCELERATION;
    }
    if (shipControls.brake) {
      decelerationInput = Constants.DECELERATION;
    }

    // Cleanup logic for keysPressed is no longer needed as useInput handles it.
    console.log("[SpaceFlightSceneR3F] Unmounting & Cleaning Up");

    // Interpolate current rates towards target rates (simulates inertia/response time)
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

    // Apply rotation deltas based on current rates
    // Rotate around local Z axis for roll
    tempQuaternion.setFromAxisAngle(
      forwardVector.set(0, 0, -1),
      rollRate.current * dt
    );
    camera.quaternion.premultiply(tempQuaternion); // Premultiply for local rotation

    // Rotate around local X axis for pitch
    tempQuaternion.setFromAxisAngle(
      rightVector.set(1, 0, 0),
      pitchRate.current * dt
    );
    camera.quaternion.premultiply(tempQuaternion);

    // Normalize quaternion to prevent drift
    camera.quaternion.normalize();

    // --- Linear Movement ---
    // Get current forward direction in world space
    const worldForward = tempVector
      .set(0, 0, -1)
      .applyQuaternion(camera.quaternion);

    // Apply acceleration
    velocity.current.addScaledVector(worldForward, accelerationInput * dt);

    // Apply explicit deceleration (braking)
    if (decelerationInput > 0) {
      const brakeForce = tempVector2
        .copy(velocity.current)
        .normalize()
        .multiplyScalar(-decelerationInput * dt);
      // Prevent braking from reversing direction if speed is low
      if (velocity.current.lengthSq() > brakeForce.lengthSq()) {
        velocity.current.add(brakeForce);
      } else {
        velocity.current.set(0, 0, 0); // Stop completely
      }
    }

    // Apply linear damping (friction/drag)
    velocity.current.multiplyScalar(Math.pow(1 - Constants.LINEAR_DAMPING, dt)); // Frame-rate independent damping

    // Clamp speed
    const currentSpeed = velocity.current.length();
    if (currentSpeed > Constants.MAX_SPEED) {
      velocity.current.normalize().multiplyScalar(Constants.MAX_SPEED);
    } else if (currentSpeed < Constants.MIN_SPEED) {
      velocity.current.set(0, 0, 0); // Ensure minimum speed is respected
    }

    // Update camera position
    camera.position.addScaledVector(velocity.current, dt);

    // --- Laser Logic ---
    laserCooldownTimer.current = Math.max(0, laserCooldownTimer.current - dt);
    laserBeamHideTimer.current = Math.max(0, laserBeamHideTimer.current - dt);

    // Firing condition
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
      laserBeamHideTimer.current = Constants.LASER_DURATION; // Use correct constant
      // TODO: Add laser hit detection logic here if needed
    } else {
      // Cool down
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - Constants.LASER_HEAT_DECREASE_RATE * dt
      );
    }

    // Update laser beam visibility and position/orientation
    if (laserBeamRef.current) {
      laserBeamRef.current.visible = laserBeamHideTimer.current > 0;
      if (laserBeamRef.current.visible) {
        // Position beam relative to camera
        laserBeamRef.current.position.copy(camera.position);
        laserBeamRef.current.quaternion.copy(camera.quaternion);
        // Need to update geometry if points change, but they don't here.
      }
    }

    // --- Pirate Logic ---
    const updatedPirateStates = pirateStates.map((pirate, index) => {
      const pirateRef = pirateShipRefs.current[index];
      if (!pirateRef || !pirate.velocity) return pirate; // Skip if ref or velocity missing

      // Simple AI: Move towards player if within attack range, otherwise wander slowly?
      const distanceToPlayerSq = pirate.position.distanceToSquared(
        camera.position
      );

      if (
        distanceToPlayerSq <
        Constants.PIRATE_ATTACK_RANGE * Constants.PIRATE_ATTACK_RANGE
      ) {
        // Attack: Move towards player
        tempVector.copy(camera.position).sub(pirate.position).normalize();
        pirate.velocity.lerp(
          tempVector.multiplyScalar(Constants.PIRATE_SPEED),
          dt * 1.5
        ); // Adjust lerp factor for responsiveness

        // Aim towards player
        tempVector2.copy(pirate.position).add(pirate.velocity); // Look ahead slightly
        pirateRef.lookAt(camera.position);
        pirate.quaternion.copy(pirateRef.quaternion); // Update state quaternion from looked-at ref
      } else {
        // Wander or idle (e.g., slow down)
        pirate.velocity.lerp(tempVector.set(0, 0, 0), dt * 0.5); // Slow down if far away
      }

      pirate.position.addScaledVector(pirate.velocity, dt);

      // TODO: Add pirate firing logic?

      return { ...pirate }; // Return updated state
    });
    if (updatedPirateStates.some((p, i) => p !== pirateStates[i])) {
      setPirateStates(updatedPirateStates); // Update state only if changed
    }

    // --- Docking Check ---
    if (stationRef.current) {
      const distanceToStationSq = camera.position.distanceToSquared(
        stationRef.current.position
      );
      if (
        distanceToStationSq <
        Constants.STATION_DOCKING_RADIUS * Constants.STATION_DOCKING_RADIUS
      ) {
        console.log(
          "[SpaceFlightSceneR3F] Docking range entered. Returning to title."
        );
        // TODO: Add a smoother transition? Docking sequence state?
        setGameState("title"); // Or maybe "docked_menu"?
        // Reset speed etc. ?
        velocity.current.set(0, 0, 0);
      }
    }

    // --- HUD Updates ---
    const finalSpeed = velocity.current.length();
    // Normalize roll/pitch rates for HUD (-1 to 1 based on max visual rates)
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

    setSpeed(Math.min(100, (finalSpeed / Constants.MAX_SPEED) * 100)); // Speed as % of max
    setRoll(normalizedRoll); // Use normalized value for HUD bar marker
    setPitch(normalizedPitch); // Use normalized value for HUD bar marker
    setLaserHeat((currentLaserHeat.current / Constants.LASER_MAX_HEAT) * 100); // Heat as %
    setCoordinates([camera.position.x, camera.position.y, camera.position.z]);
    // setAltitude(...) // Implement altitude calculation later

    // --- Radar Calculation ---
    const radarPositionsData: RadarPosition[] = [];
    const cameraMatrix = camera.matrixWorldInverse;

    // Station Radar
    if (stationRef.current) {
      tempVector.copy(stationRef.current.position).applyMatrix4(cameraMatrix); // World to Camera space
      const distToStation = tempVector.length();

      if (distToStation < Constants.RADAR_DISTANCE) {
        tempVector.normalize();
        radarPositionsData.push({
          x: tempVector.x,
          y: tempVector.y,
          z: tempVector.z,
        });
        // Update station direction indicator
        setStationDirection({
          x: tempVector.x,
          y: tempVector.y,
          offCenterAmount: Math.min(
            1,
            Math.sqrt(tempVector.x ** 2 + tempVector.y ** 2)
          ), // Clamp amount 0-1
          isInFront: tempVector.z < 0, // Z is negative when in front in camera space
        });
      } else {
        setStationDirection(null); // Out of radar range
      }
    } else {
      setStationDirection(null); // Station not rendered/found
    }

    // Pirate Radar
    pirateStates.forEach((pirate) => {
      if (pirate.visible) {
        tempVector.copy(pirate.position).applyMatrix4(cameraMatrix);
        if (
          tempVector.lengthSq() <
          Constants.RADAR_DISTANCE * Constants.RADAR_DISTANCE
        ) {
          tempVector.normalize();
          radarPositionsData.push({
            x: tempVector.x,
            y: tempVector.y,
            z: tempVector.z,
          });
        }
      }
    });
    setRadarPositions(radarPositionsData); // Update HUD state
  }); // End useFrame

  // --- Render 3D Components ---
  if (!assets) return null; // Don't render if assets aren't loaded

  return (
    <>
      {/* Planet (Example placement) */}
      {assets.planet && (
        <PlanetComponent
          radius={assets.planet.radius}
          color={assets.planet.color}
          position={[0, -assets.planet.radius - 5000, -15000]} // Below and behind station
          visible={true}
        />
      )}

      {/* Space Station (Placed at origin for simplicity) */}
      {assets.spaceStation && (
        <group ref={stationRef} position={[0, 0, 0]}>
          {" "}
          {/* Use group to easily get station world position */}
          <SpaceStationComponent
            modelPath={assets.spaceStation.modelPath}
            initialScale={Constants.SHIP_SCALE * 2} // Make station bigger
            wireframeColor={0xffff00}
            rotationSpeed={0.01}
            visible={true}
            // Position/rotation are relative to the parent group now (which is at 0,0,0)
          />
        </group>
      )}

      {/* Pirates */}
      {pirateStates.map((pirate, index) => (
        <ShipComponent
          key={pirate.id}
          ref={(el) => (pirateShipRefs.current[index] = el)}
          modelPath={pirate.modelPath}
          initialScale={Constants.SHIP_SCALE}
          wireframeColor={0xff0000} // Red pirates
          visible={pirate.visible}
          position={pirate.position}
          quaternion={pirate.quaternion} // Use quaternion for smooth rotation from AI
        />
      ))}

      {/* Laser Beam */}
      <lineSegments ref={laserBeamRef} visible={false} frustumCulled={false}>
        <bufferGeometry ref={laserGeometryRef} attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={laserBeamPoints.length}
            array={
              new Float32Array(laserBeamPoints.flatMap((p) => p.toArray()))
            }
            itemSize={3}
            usage={THREE.DynamicDrawUsage} // Not strictly needed as points don't change, but good practice if they might
          />
        </bufferGeometry>
        {/* Use LineBasicMaterial for simple lines */}
        <lineBasicMaterial
          attach="material"
          color={Constants.LASER_COLOR}
          linewidth={2}
          transparent
          opacity={0.8}
        />
      </lineSegments>

      {/* Add Stars / Skybox etc. here */}
    </>
  );
};

export default SpaceFlightSceneR3F;
