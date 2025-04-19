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
// import ShipComponent from "@/components/r3f/ShipComponent"; // No longer directly needed here
import PiratesComponent from "@/components/r3f/PiratesComponent"; // Import the new component
import { useAssets } from "@/hooks/useAssets";
import { usePlanetInfos } from "../common/usePlanetInfos";

const SpaceFlightSceneR3F: React.FC = () => {
  const { assets } = useAssets();
  const { camera } = useThree();
  const { shipControls } = useInput();
  const { setGameState } = useGameState();
  const {
    setCoordinates,
    setSpeed,
    setRoll,
    setPitch,
    setLaserHeat,
    setStationDirection,
    setRadarPositions, // Still needed for combined radar
  } = useHudState();
  const { getCurrentPlanet } = usePlanetInfos();
  const currentPlanet = getCurrentPlanet();

  // --- Refs ---
  const laserBeamRef = useRef<THREE.LineSegments>(null);
  // const pirateShipRefs = useRef<(THREE.Group | null)[]>([]); // Removed

  // --- State ---
  const velocity = useRef(new THREE.Vector3());
  const rollRate = useRef(0);
  const pitchRate = useRef(0);
  const [pirateRadarPositions, setPirateRadarPositions] = useState<
    RadarPosition[]
  >([]);
  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  const wantsToFire = useRef(false);
  const laserBeamHideTimer = useRef(0);
  const laserBeamPoints = useRef([
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 1 - Constants.LASER_LENGTH),
  ]).current;
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null);
  const stationRef = useRef<THREE.Group>(null);
  const initialPlayerPositionRef = useRef<THREE.Vector3>(new THREE.Vector3()); // Ref to store initial position

  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const forwardVector = useRef(new THREE.Vector3(0, 0, -1)).current;
  const rightVector = useRef(new THREE.Vector3(1, 0, 0)).current;

  useEffect(() => {
    if (!assets) {
      console.error("[SpaceFlightSceneR3F] Assets not loaded!");
      return;
    }

    if (!currentPlanet) {
      console.error("[SpaceFlightSceneR3F] Current planet not found!");
      return;
    }

    // Reset player state
    velocity.current.set(0, 0, 0);
    rollRate.current = 0;
    pitchRate.current = 0;
    const pos = currentPlanet.playerSpawnPosition;
    const startPos = new THREE.Vector3(pos.x, pos.y, pos.z);
    initialPlayerPositionRef.current.copy(startPos); // Store initial position
    camera.position.copy(startPos); // Use stored value
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
    setLaserHeat(0);
    setStationDirection(null);
    setRadarPositions([]); // Reset combined radar
    setPirateRadarPositions([]); // Reset pirate specific radar

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, setGameState]); // camera doesn't need to be a dependency here

  // --- Positioning Logic Helper - REMOVED (Moved to PiratesComponent) ---

  // --- Callback for Pirate Radar Updates ---
  const handlePirateRadarUpdate = useCallback(
    (positions: RadarPosition[]) => {
      // Simple check to avoid unnecessary state updates if the array content is identical
      // This isn't a deep comparison, but good enough for simple radar updates.
      if (JSON.stringify(positions) !== JSON.stringify(pirateRadarPositions)) {
        setPirateRadarPositions(positions);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [pirateRadarPositions]
  ); // Recreate only if pirateRadarPositions state changes

  // --- Game Loop Logic (useFrame) ---
  useFrame((state, delta) => {
    if (!assets) return;
    ////////////////////////////////////////////////////////////////////////
    // ... inside useFrame ...

    const { camera: currentCamera } = state; // Use destructured camera from state for clarity
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

    // Reuse tempQuaternion for incremental rotations
    const rotationDelta = tempQuaternion; // Reuse existing ref for efficiency

    // Calculate rotation axes based on the *current* camera orientation
    const localRight = tempVector
      .set(1, 0, 0)
      .applyQuaternion(currentCamera.quaternion);
    const localForward = tempVector2
      .set(0, 0, -1)
      .applyQuaternion(currentCamera.quaternion); // Use tempVector2

    // Apply Roll around the camera's local forward (Z) axis
    if (Math.abs(rollRate.current) > 1e-5) {
      // Add tolerance check
      rotationDelta.setFromAxisAngle(localForward, rollRate.current * dt);
      currentCamera.quaternion.multiply(rotationDelta); // Use multiply for local rotation
    }

    // Apply Pitch around the camera's local right (X) axis
    if (Math.abs(pitchRate.current) > 1e-5) {
      // Add tolerance check
      rotationDelta.setFromAxisAngle(localRight, pitchRate.current * dt);
      currentCamera.quaternion.multiply(rotationDelta); // Use multiply for local rotation
    }

    currentCamera.quaternion.normalize();

    const worldForward = tempVector
      .set(0, 0, -1)
      .applyQuaternion(currentCamera.quaternion);
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
    } else if (currentSpeed > 0 && currentSpeed < Constants.MIN_SPEED) {
      // Check if trying to move below min speed (but not braking to zero)
      if (accelerationInput > 0 || decelerationInput === 0) {
        // Optional: If accelerating or coasting below min speed, clamp up to min speed?
        // Or let it decay naturally via damping as currently implemented.
        // If you want a hard floor unless braking:
        // velocity.current.normalize().multiplyScalar(Constants.MIN_SPEED);
      } else if (
        velocity.current.lengthSq() <
        Constants.MIN_SPEED * Constants.MIN_SPEED * 0.25
      ) {
        // Allow braking to fully stop
        velocity.current.set(0, 0, 0); // Snap to zero if very slow and braking/coasting
      }
    }

    currentCamera.position.addScaledVector(velocity.current, dt);

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
        laserBeamRef.current.position.copy(currentCamera.position);
        laserBeamRef.current.quaternion.copy(currentCamera.quaternion);
      }
    }

    // --- Docking Check ---
    if (stationRef.current) {
      const distanceToStationSq = currentCamera.position.distanceToSquared(
        stationRef.current.position
      );
      const r = Constants.STATION_DOCKING_RADIUS;
      if (distanceToStationSq < r * r) {
        console.log(
          "[SpaceFlightSceneR3F] Docking range entered. Returning to title."
        );
        setGameState("title");
        velocity.current.set(0, 0, 0);
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
    setCoordinates([
      currentCamera.position.x,
      currentCamera.position.y,
      currentCamera.position.z,
    ]);

    // --- Combined Radar Calculation ---
    const combinedRadarPositions: RadarPosition[] = [];
    const cameraMatrix = currentCamera.matrixWorldInverse;

    // Station Radar
    let stationDirData = null; // Keep track of station direction separately
    if (stationRef.current) {
      tempVector.copy(stationRef.current.position).applyMatrix4(cameraMatrix);
      const distToStation = tempVector.length();

      if (distToStation < Constants.RADAR_DISTANCE) {
        const normalizedStationDir = tempVector2.copy(tempVector).normalize(); // Use tempVector2
        combinedRadarPositions.push({
          x: normalizedStationDir.x,
          y: normalizedStationDir.y,
          z: normalizedStationDir.z,
        });
        stationDirData = {
          x: normalizedStationDir.x,
          y: normalizedStationDir.y,
          offCenterAmount: Math.min(
            1,
            Math.sqrt(normalizedStationDir.x ** 2 + normalizedStationDir.y ** 2)
          ),
          isInFront: normalizedStationDir.z < 0,
        };
      }
    }
    setStationDirection(stationDirData); // Update station direction HUD element

    // Add Pirate Radar Positions (received via callback)
    combinedRadarPositions.push(...pirateRadarPositions);

    // Update the HUD with combined list
    // NOTE: Consider optimizing this if radar updates become a bottleneck.
    // Could compare current combined list with previous before setting state.
    setRadarPositions(combinedRadarPositions);
  }); // End useFrame

  // --- Render 3D Components ---
  if (!assets) return null;

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

      {/* Pirates - Use the new component */}
      {assets.pirateShips && assets.pirateShips.length > 0 && (
        <PiratesComponent
          playerCamera={camera} // Pass the R3F camera object
          pirateConfigs={assets.pirateShips}
          initialPlayerPosition={initialPlayerPositionRef.current} // Pass the stored initial position
          onPirateRadarUpdate={handlePirateRadarUpdate} // Pass the callback
        />
      )}

      {/* Laser Beam */}
      <lineSegments ref={laserBeamRef} visible={false} frustumCulled={false}>
        <bufferGeometry ref={laserGeometryRef} attach="geometry">
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
          linewidth={Constants.LASER_LINE_WIDTH}
          transparent
          opacity={0.8}
        />
      </lineSegments>

      {/* Add Stars / Skybox etc. here */}
    </>
  );
};

export default SpaceFlightSceneR3F;
