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
  const wantsToFire = useRef(false); // Assuming this gets set by input later
  const laserBeamHideTimer = useRef(0);
  const laserBeamPoints = useRef([
    new THREE.Vector3(0, 0, 1), // Start slightly in front? Or origin?
    new THREE.Vector3(0, 0, 1 - Constants.LASER_LENGTH), // End point
  ]).current;
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null);
  const stationRef = useRef<THREE.Group>(null);
  const initialPlayerPositionRef = useRef<THREE.Vector3>(new THREE.Vector3()); // Ref to store initial position

  // --- Temporary Objects for Calculations ---
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  // Removed fixed forward/right vectors - we calculate local ones now

  useEffect(() => {
    if (!assets) {
      console.error("[SpaceFlightSceneR3F] Assets not loaded!");
      return;
    }

    if (!currentPlanet) {
      console.error("[SpaceFlightSceneR3F] Current planet not found!");
      // Optionally handle this case, maybe return to title or show error
      // setGameState("title");
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
    camera.rotation.set(0, 0, 0); // Reset Euler angles
    camera.quaternion.identity(); // Reset Quaternion

    currentLaserHeat.current = 0;
    laserCooldownTimer.current = 0;
    wantsToFire.current = shipControls.fire; // Initialize based on current input state maybe?
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

    console.log("[SpaceFlightSceneR3F] Scene Initialized/Reset");

    // Set initial laser geometry points
    if (laserGeometryRef.current) {
      laserGeometryRef.current.setFromPoints(laserBeamPoints);
    }
    // Make sure fire state is updated based on input hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, currentPlanet, setGameState]); // Depend on currentPlanet too

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
    if (!assets || !currentPlanet) return; // Guard against missing assets/planet
    ////////////////////////////////////////////////////////////////////////
    // ... inside useFrame ...

    const { camera: currentCamera } = state; // Use destructured camera from state for clarity
    const dt = Math.min(delta, 0.05); // Clamp delta time

    // --- Input Check ---
    // Update wantsToFire based on the latest input state
    wantsToFire.current = shipControls.fire;

    let targetRollRate = 0;
    let targetPitchRate = 0;
    let accelerationInput = 0;
    let decelerationInput = 0;

    // Map input controls to target rates and acceleration
    if (shipControls.rollLeft) targetRollRate = Constants.ROLL_ACCELERATION; // Positive roll right convention often used
    if (shipControls.rollRight) targetRollRate = -Constants.ROLL_ACCELERATION;// Negative roll left
    if (shipControls.pitchUp) targetPitchRate = Constants.PITCH_ACCELERATION; // Positive pitch up
    if (shipControls.pitchDown) targetPitchRate = -Constants.PITCH_ACCELERATION; // Negative pitch down
    if (shipControls.accelerate) accelerationInput = Constants.ACCELERATION;
    if (shipControls.brake) decelerationInput = Constants.DECELERATION;

    // --- Player Ship Physics & Rotation ---

    // Smoothly damp angular velocities towards target or zero
    // Note: We apply acceleration directly, then damp towards zero if no input.
    // Alternatively, damp towards a target max rate. Let's use the latter for smoother control.
    rollRate.current = THREE.MathUtils.damp(
      rollRate.current,
      targetRollRate !== 0
        ? Math.sign(targetRollRate) * Constants.MAX_VISUAL_ROLL_RATE // Target Max Rate
        : 0, // Target Zero
      Constants.ANGULAR_DAMPING, // Smoothing factor
      dt
    );

    pitchRate.current = THREE.MathUtils.damp(
      pitchRate.current,
      targetPitchRate !== 0
        ? Math.sign(targetPitchRate) * Constants.MAX_VISUAL_PITCH_RATE // Target Max Rate
        : 0, // Target Zero
      Constants.ANGULAR_DAMPING, // Smoothing factor
      dt
    );

    // Calculate rotation amounts for this frame
    const rollAmount = rollRate.current * dt;
    const pitchAmount = pitchRate.current * dt;

    // --- Apply Rotations using Quaternions (FIXED HERE) ---
    // Get the camera's current local axes
    const localRight = tempVector.set(1, 0, 0).applyQuaternion(currentCamera.quaternion);
    const localForward = tempVector2.set(0, 0, -1).applyQuaternion(currentCamera.quaternion); // Reuse tempVector2

    // Create incremental rotation quaternions
    const rollQuaternion = tempQuaternion.setFromAxisAngle(localForward, rollAmount);
    console.log("Roll Quaternion: ", rollQuaternion);
    const pitchQuaternion = tempQuaternion.setFromAxisAngle(localRight, pitchAmount); // Reuse tempQuaternion

    currentCamera.quaternion.multiply(pitchQuaternion);
    currentCamera.quaternion.multiply(rollQuaternion);

    // Normalize the quaternion to prevent floating-point drift accumulating errors
    currentCamera.quaternion.normalize();

    // --- Movement ---
    // Get the world forward direction based on the *updated* quaternion
    const worldForward = tempVector.set(0, 0, -1).applyQuaternion(currentCamera.quaternion);
    velocity.current.addScaledVector(worldForward, accelerationInput * dt);

    // Apply braking force (opposite to velocity direction)
    if (decelerationInput > 0) {
      const brakeForceMagnitude = decelerationInput * dt;
      if (velocity.current.lengthSq() > brakeForceMagnitude * brakeForceMagnitude) {
        // Only apply brake if speed is greater than the brake amount for this frame
        tempVector2.copy(velocity.current).normalize().multiplyScalar(-brakeForceMagnitude);
        velocity.current.add(tempVector2);
      } else {
        // If brake force is enough to stop, set velocity to zero
        velocity.current.set(0, 0, 0);
      }
    }

    // Apply linear damping (general slowdown when not accelerating/braking hard)
    // Use exponential decay for smoother damping
    velocity.current.multiplyScalar(Math.pow(1 - Constants.LINEAR_DAMPING, dt));


    // Clamp speed
    const currentSpeed = velocity.current.length();
    if (currentSpeed > Constants.MAX_SPEED) {
      velocity.current.normalize().multiplyScalar(Constants.MAX_SPEED);
    } else if (currentSpeed < Constants.MIN_SPEED && currentSpeed > 1e-4) {
      // Optional: Snap to zero if very slow and not accelerating
      if (accelerationInput <= 0) {
         // If coasting or braking below min speed threshold, allow stopping completely?
         // Or maintain MIN_SPEED unless braking? Let's allow stopping for now.
         // If you want a hard floor unless braking:
         // if (decelerationInput === 0) {
         //   velocity.current.normalize().multiplyScalar(Constants.MIN_SPEED);
         // } else if (velocity.current.lengthSq() < 1e-4) {
             velocity.current.set(0,0,0); // Snap to zero if very slow
         // }
      }
    } else if (currentSpeed <= 1e-4 && accelerationInput <= 0) {
       velocity.current.set(0,0,0); // Ensure it stays zero if stopped
    }

    // Update camera position
    currentCamera.position.addScaledVector(velocity.current, dt);

    // --- Laser Logic ---
    laserCooldownTimer.current = Math.max(0, laserCooldownTimer.current - dt);
    laserBeamHideTimer.current = Math.max(0, laserBeamHideTimer.current - dt);

    if (
      wantsToFire.current && // Check the ref updated from input
      currentLaserHeat.current < Constants.LASER_MAX_HEAT &&
      laserCooldownTimer.current <= 0
    ) {
      currentLaserHeat.current = Math.min(
        Constants.LASER_MAX_HEAT,
        currentLaserHeat.current + Constants.LASER_HEAT_INCREASE
      );
      laserCooldownTimer.current = Constants.LASER_COOLDOWN;
      laserBeamHideTimer.current = Constants.LASER_DURATION;
      // TODO: Laser hit detection logic would go here
      // console.log("FIRE!"); // Debug laser fire
    } else {
      // Cooldown laser heat
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - Constants.LASER_HEAT_DECREASE_RATE * dt
      );
    }

    // Update laser beam visibility and position/orientation
    if (laserBeamRef.current) {
      const isLaserVisible = laserBeamHideTimer.current > 0;
      laserBeamRef.current.visible = isLaserVisible;
      if (isLaserVisible) {
        // Position the laser relative to the camera
        laserBeamRef.current.position.copy(currentCamera.position);
        laserBeamRef.current.quaternion.copy(currentCamera.quaternion);
        // Optional: Add a small forward offset if needed
        // tempVector.set(0, 0, -1).applyQuaternion(currentCamera.quaternion).multiplyScalar(0.5);
        // laserBeamRef.current.position.add(tempVector);
      }
    }

    // --- Docking Check ---
    if (stationRef.current) {
      const distanceToStationSq = currentCamera.position.distanceToSquared(
        stationRef.current.position
      );
      const dockingRadiusSq = Constants.STATION_DOCKING_RADIUS * Constants.STATION_DOCKING_RADIUS;
      if (distanceToStationSq < dockingRadiusSq) {
        console.log(
          "[SpaceFlightSceneR3F] Docking range entered. Returning to title."
        );
        setGameState("title"); // Change game state
        velocity.current.set(0, 0, 0); // Stop the ship
        // Perform any other cleanup needed before state transition
      }
    }

    // --- HUD Updates ---
    // Use the final calculated speed
    const finalSpeed = velocity.current.length();
    // Normalize roll/pitch rates for the HUD markers (-1 to 1)
    const normalizedRoll = THREE.MathUtils.clamp(
      rollRate.current / Constants.MAX_VISUAL_ROLL_RATE, // Use the correct sign based on input mapping
      -1,
      1
    );
    const normalizedPitch = THREE.MathUtils.clamp(
      pitchRate.current / Constants.MAX_VISUAL_PITCH_RATE, // Use the correct sign
      -1,
      1
    );

    // Update HUD state atoms
    setSpeed(Math.min(100, (finalSpeed / Constants.MAX_SPEED) * 100));
    setRoll(normalizedRoll); // HUD expects -1 left, +1 right
    setPitch(normalizedPitch); // HUD expects -1 dive, +1 climb
    setLaserHeat((currentLaserHeat.current / Constants.LASER_MAX_HEAT) * 100);
    setCoordinates([
      currentCamera.position.x,
      currentCamera.position.y,
      currentCamera.position.z,
    ]);

    // --- Combined Radar Calculation ---
    const combinedRadarPositions: RadarPosition[] = [];
    const cameraMatrix = currentCamera.matrixWorldInverse; // Get camera's inverse matrix

    // Station Radar
    let stationDirData = null; // Keep track of station direction separately
    if (stationRef.current) {
      // Transform station position into camera's view space
      tempVector.copy(stationRef.current.position).applyMatrix4(cameraMatrix);
      const distToStation = tempVector.length();

      if (distToStation < Constants.RADAR_DISTANCE) {
        // Normalize the direction vector in camera space
        const normalizedStationDir = tempVector2.copy(tempVector).normalize(); // Use tempVector2
        combinedRadarPositions.push({
          x: normalizedStationDir.x,
          y: normalizedStationDir.y,
          z: normalizedStationDir.z, // z < 0 is front, z > 0 is behind
        });
        // Data for the direction indicator dot
        stationDirData = {
          x: normalizedStationDir.x, // Horizontal position (-1 to 1)
          y: normalizedStationDir.y, // Vertical position (-1 to 1)
          offCenterAmount: Math.min(
            1,
            Math.sqrt(normalizedStationDir.x ** 2 + normalizedStationDir.y ** 2)
          ), // How far from center (0 to 1)
          isInFront: normalizedStationDir.z < 0, // True if in front half
        };
      }
    }
    // Update the dedicated station direction atom
    setStationDirection(stationDirData);

    // Add Pirate Radar Positions (received via callback from PiratesComponent)
    // These are already calculated relative to the camera within PiratesComponent
    combinedRadarPositions.push(...pirateRadarPositions);

    // Update the HUD with combined list of *all* radar objects
    // NOTE: Consider optimizing this comparison if radar updates become a bottleneck.
    // Could compare current combined list with previous before setting state.
    setRadarPositions(combinedRadarPositions);


  }); // End useFrame

  // --- Render 3D Components ---
  // Add guards for assets and currentPlanet before rendering dependent components
  if (!assets || !currentPlanet) return null;

  return (
    <>
      {/* Planet - Position relative to origin or based on system data? */}
      {/* Let's assume planet is at a fixed large offset for visual background */}
      {assets.planet && (
        <PlanetComponent
          radius={assets.planet.radius}
          color={assets.planet.color}
          // Position far away, maybe below the station/origin? Adjust as needed.
          position={[0, -assets.planet.radius - 15000, -30000]}
          visible={true}
        />
      )}

      {/* Space Station - Position at origin [0,0,0] for simplicity */}
      {assets.spaceStation && (
        // Wrap in a Group to apply the ref correctly to the station's root
        <group ref={stationRef} position={[0, 0, 0]} name="SpaceStationGroup">
          <SpaceStationComponent
            modelPath={assets.spaceStation.modelPath}
            initialScale={Constants.SHIP_SCALE * 2} // Make station larger
            wireframeColor={0xffff00} // Yellow
            rotationSpeed={0.01} // Slow rotation
            visible={true}
            // Position/rotation is handled by the parent group
          />
        </group>
      )}

      {/* Pirates - Use the dedicated component */}
      {assets.pirateShips && assets.pirateShips.length > 0 && (
        <PiratesComponent
          playerCamera={camera} // Pass the R3F camera object
          pirateConfigs={assets.pirateShips}
          initialPlayerPosition={initialPlayerPositionRef.current} // Pass the stored initial position
          onPirateRadarUpdate={handlePirateRadarUpdate} // Pass the callback
        />
      )}

      {/* Laser Beam - Attached to camera space implicitly by useFrame logic */}
      <lineSegments ref={laserBeamRef} visible={false} frustumCulled={false}>
        <bufferGeometry ref={laserGeometryRef} attach="geometry">
          {/* Geometry points are updated via ref if needed, or set initially */}
          <bufferAttribute
              attach="attributes-position"
              count={laserBeamPoints.length}
              array={new Float32Array(laserBeamPoints.flatMap(p => p.toArray()))}
              itemSize={3}
           />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={Constants.LASER_COLOR}
          linewidth={Constants.LASER_LINE_WIDTH} // Note: linewidth > 1 may not work on all GPUs/drivers
          transparent
          opacity={0.8} // Slightly transparent laser
        />
      </lineSegments>

      {/* Add Stars / Skybox etc. here if desired */}
      {/* Example: <Stars radius={3000} depth={60} count={15000} factor={7} saturation={0} fade={true} /> */}
    </>
  );
};

export default SpaceFlightSceneR3F;