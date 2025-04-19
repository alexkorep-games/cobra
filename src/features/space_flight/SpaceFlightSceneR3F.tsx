import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameState } from "@/features/common/useGameState";
import { useHudState } from "@/features/common/useHudState";
import { RadarPosition } from "@/types";
import * as Constants from "@/constants";
import { useInput } from "@/hooks/useInput";
import PlanetComponent from "@/components/r3f/PlanetComponent";
import SpaceStationComponent from "@/components/r3f/SpaceStationComponent";
import PiratesComponent from "@/components/r3f/PiratesComponent";
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
    setRadarPositions,
  } = useHudState();
  const { getCurrentPlanet } = usePlanetInfos();
  const currentPlanet = getCurrentPlanet();

  const laserBeamRef = useRef<THREE.LineSegments>(null);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const rollRate = useRef(0); // Radians per second
  const pitchRate = useRef(0); // Radians per second
  const [pirateRadarPositions, setPirateRadarPositions] = useState<
    RadarPosition[]
  >([]);
  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  const wantsToFire = useRef(false);
  const laserBeamHideTimer = useRef(0);
  const laserBeamPoints = useRef([
    new THREE.Vector3(0, 0, -1), // Start slightly in front of camera
    new THREE.Vector3(0, 0, -1 - Constants.LASER_LENGTH), // Extend forward
  ]).current;
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null);
  const stationRef = useRef<THREE.Group>(null);
  const initialPlayerPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // --- Temporary Objects for Calculations (useRef for reuse) ---
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const forwardVector = useRef(new THREE.Vector3()).current;
  const rightVector = useRef(new THREE.Vector3()).current;
  const upVector = useRef(new THREE.Vector3()).current; // Although we use world up for pitch usually? Let's use rightVector for pitch axis.

  useEffect(() => {
    if (!assets) {
      console.error("[SpaceFlightSceneR3F] Assets not loaded!");
      return;
    }

    if (!currentPlanet) {
      console.error("[SpaceFlightSceneR3F] Current planet not found!");
      // Maybe set a default state or return to title?
      // setGameState('title'); // Example recovery
      return;
    }

    // --- Reset State on Entering Space Flight ---
    console.log("[SpaceFlightSceneR3F] Initializing flight state.");
    velocity.current.set(0, 0, 0);
    rollRate.current = 0;
    pitchRate.current = 0;

    // Set initial position and rotation based on planet data
    const pos = currentPlanet.playerSpawnPosition;
    const startPos = new THREE.Vector3(pos.x, pos.y, pos.z);
    initialPlayerPositionRef.current.copy(startPos);
    camera.position.copy(startPos);
    camera.rotation.set(0, 0, 0); // Reset rotation
    camera.quaternion.identity(); // Ensure quaternion is reset

    // Reset other state variables
    currentLaserHeat.current = 0;
    laserCooldownTimer.current = 0;
    wantsToFire.current = false; // Reset fire intention
    laserBeamHideTimer.current = 0;

    // Reset HUD
    setCoordinates([camera.position.x, camera.position.y, camera.position.z]);
    setSpeed(0);
    setRoll(0);
    setPitch(0);
    setLaserHeat(0);
    setStationDirection(null);
    setRadarPositions([]);
    setPirateRadarPositions([]); // Reset pirate radar data specifically

    // Update laser geometry if needed (points are fixed, but ensures it's set)
    if (laserGeometryRef.current) {
      laserGeometryRef.current.setFromPoints(laserBeamPoints);
      laserGeometryRef.current.attributes.position.needsUpdate = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, currentPlanet, setGameState]); // Rerun ONLY when assets or current planet changes

  const handlePirateRadarUpdate = useCallback(
    (positions: RadarPosition[]) => {
      // Simple string comparison to avoid unnecessary updates if array content is identical
      if (JSON.stringify(positions) !== JSON.stringify(pirateRadarPositions)) {
        setPirateRadarPositions(positions);
      }
    },
    [pirateRadarPositions] // Dependency is the state itself
  );

  useFrame((state, delta) => {
    if (!assets || !currentPlanet) return; // Ensure assets and planet are loaded

    const { camera: currentCamera } = state;
    // Clamp delta time to prevent physics instability with large frame drops
    const dt = Math.min(delta, 0.05); // Max 50ms step

    // --- Get Input ---
    wantsToFire.current = shipControls.fire; // Update fire intention

    // --- Calculate Target Angular Rates based on Input ---
    const rollAccelInput = shipControls.rollLeft
      ? Constants.ROLL_ACCELERATION
      : shipControls.rollRight
      ? -Constants.ROLL_ACCELERATION
      : 0;
    const pitchAccelInput = shipControls.pitchUp
      ? Constants.PITCH_ACCELERATION
      : shipControls.pitchDown
      ? -Constants.PITCH_ACCELERATION
      : 0;

    // --- Update Angular Velocity (Roll/Pitch Rates) ---
    rollRate.current += rollAccelInput * dt;
    pitchRate.current += pitchAccelInput * dt;

    // Apply angular damping if there's no input for that axis
    const dampingFactor = Math.exp(-Constants.ANGULAR_DAMPING * dt);
    if (rollAccelInput === 0) {
      rollRate.current *= dampingFactor;
      if (Math.abs(rollRate.current) < 0.005) rollRate.current = 0; // Snap to zero
    }
    if (pitchAccelInput === 0) {
      pitchRate.current *= dampingFactor;
      if (Math.abs(pitchRate.current) < 0.005) pitchRate.current = 0; // Snap to zero
    }

    // --- Update Linear Velocity ---
    forwardVector.set(0, 0, -1).applyQuaternion(currentCamera.quaternion); // Get current forward direction

    // Apply acceleration
    if (shipControls.accelerate) {
      velocity.current.addScaledVector(
        forwardVector,
        Constants.ACCELERATION * dt
      );
    }

    // Apply braking
    if (shipControls.brake) {
      const speed = velocity.current.length();
      if (speed > 0.1) {
        // Only brake if moving significantly
        // Calculate deceleration magnitude, ensuring it doesn't exceed stopping in one frame
        const brakeDecel = Math.min(speed / dt, Constants.DECELERATION);
        tempVector2
          .copy(velocity.current)
          .normalize()
          .multiplyScalar(-brakeDecel); // Brake vector opposes velocity
        velocity.current.addScaledVector(tempVector2, dt);
      } else if (speed > 0) {
        velocity.current.set(0, 0, 0); // Stop completely if braking at very low speed
      }
    }

    // Apply linear damping if coasting (no acceleration or braking)
    if (!shipControls.accelerate && !shipControls.brake) {
      const dampingFactorLinear = Math.exp(-Constants.LINEAR_DAMPING * dt);
      velocity.current.multiplyScalar(dampingFactorLinear);
      if (velocity.current.lengthSq() < 0.01) {
        // Snap to zero if very slow
        velocity.current.set(0, 0, 0);
      }
    }

    // Clamp speed to MAX_SPEED
    const currentSpeed = velocity.current.length();
    if (currentSpeed > Constants.MAX_SPEED) {
      velocity.current.normalize().multiplyScalar(Constants.MAX_SPEED);
    }

    // --- Apply Rotation to Camera ---
    // Get local right axis for pitching
    rightVector.set(1, 0, 0).applyQuaternion(currentCamera.quaternion);

    // Apply pitch rotation around the local right axis
    tempQuaternion.setFromAxisAngle(rightVector, pitchRate.current * dt);
    currentCamera.quaternion.premultiply(tempQuaternion);

    // Get local forward axis for rolling (or use world Z if preferred - using local Z here)
    // Re-calculate forwardVector as it might have changed due to pitch
    forwardVector.set(0, 0, -1).applyQuaternion(currentCamera.quaternion);
    tempQuaternion.setFromAxisAngle(forwardVector, rollRate.current * dt);
    currentCamera.quaternion.premultiply(tempQuaternion);

    // Normalize quaternion to prevent floating point errors accumulating
    currentCamera.quaternion.normalize();

    // --- Apply Velocity to Camera Position ---
    currentCamera.position.addScaledVector(velocity.current, dt);

    // --- Laser Logic ---
    laserCooldownTimer.current = Math.max(0, laserCooldownTimer.current - dt);
    laserBeamHideTimer.current = Math.max(0, laserBeamHideTimer.current - dt);

    if (
      wantsToFire.current &&
      currentLaserHeat.current < Constants.LASER_MAX_HEAT &&
      laserCooldownTimer.current <= 0
    ) {
      // Fire laser
      currentLaserHeat.current = Math.min(
        Constants.LASER_MAX_HEAT,
        currentLaserHeat.current + Constants.LASER_HEAT_INCREASE
      );
      laserCooldownTimer.current = Constants.LASER_COOLDOWN;
      laserBeamHideTimer.current = Constants.LASER_DURATION; // Make beam visible

      // TODO: Add actual laser collision detection/effects here
    } else {
      // Cool down laser
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
        // Position the laser slightly in front of the camera and align it
        laserBeamRef.current.position.copy(currentCamera.position);
        laserBeamRef.current.quaternion.copy(currentCamera.quaternion);
        // Note: Frustum culling is disabled for the laser line,
        // so it should render even if technically outside the camera frustum.
      }
    }

    // --- Docking Check ---
    if (stationRef.current) {
      const distanceToStationSq = currentCamera.position.distanceToSquared(
        stationRef.current.position
      );
      const dockingRadiusSq =
        Constants.STATION_DOCKING_RADIUS * Constants.STATION_DOCKING_RADIUS;

      if (distanceToStationSq < dockingRadiusSq) {
        console.log("Docking proximity detected. Returning to title.");
        setGameState("title"); // Transition back to title screen
        velocity.current.set(0, 0, 0); // Stop the ship immediately
        // Additional reset logic might be needed here or handled by useEffect on state change
      }
    }

    // --- Update HUD State ---
    const speedValue = velocity.current.length();
    const normalizedSpeed = Math.min(
      100,
      (speedValue / Constants.MAX_SPEED) * 100
    );
    const normalizedRoll = THREE.MathUtils.clamp(
      // Invert roll display if needed: -rollRate.current
      rollRate.current / Constants.MAX_VISUAL_ROLL_RATE,
      -1,
      1
    );
    const normalizedPitch = THREE.MathUtils.clamp(
      // Invert pitch display if needed: -pitchRate.current
      pitchRate.current / Constants.MAX_VISUAL_PITCH_RATE,
      -1,
      1
    );

    setCoordinates([
      currentCamera.position.x,
      currentCamera.position.y,
      currentCamera.position.z,
    ]);
    setSpeed(normalizedSpeed);
    setRoll(normalizedRoll);
    setPitch(normalizedPitch);
    setLaserHeat((currentLaserHeat.current / Constants.LASER_MAX_HEAT) * 100); // As percentage

    // --- Radar and Direction Indicator ---
    const combinedRadarPositions: RadarPosition[] = [];
    const cameraMatrix = currentCamera.matrixWorldInverse; // Get camera's view matrix

    let stationDirData = null;
    if (stationRef.current) {
      // Calculate station position relative to camera
      tempVector.copy(stationRef.current.position).applyMatrix4(cameraMatrix);
      const distToStation = tempVector.length();

      // Check if station is within radar range
      if (distToStation < Constants.RADAR_DISTANCE) {
        // Normalize the direction vector for radar display
        const normalizedStationDir = tempVector2.copy(tempVector).normalize();
        // Add to combined radar positions
        combinedRadarPositions.push({
          x: normalizedStationDir.x,
          y: normalizedStationDir.y,
          z: normalizedStationDir.z,
        });

        // Calculate data for the direction indicator HUD element
        stationDirData = {
          x: normalizedStationDir.x, // Left/Right projection
          y: normalizedStationDir.y, // Up/Down projection
          // How far off-center in the X/Y plane (0=center, 1=edge)
          offCenterAmount: Math.min(
            1,
            Math.sqrt(normalizedStationDir.x ** 2 + normalizedStationDir.y ** 2)
          ),
          // Is the station in front (z<0) or behind (z>0) the camera?
          isInFront: normalizedStationDir.z < 0,
        };
      }
    }
    setStationDirection(stationDirData); // Update station direction state

    // Add pirate positions (updated via callback) to the combined list
    combinedRadarPositions.push(...pirateRadarPositions);

    // Update the radar positions state (used by BottomHud)
    // Simple optimization: Check if the array content changed before setting
    // (This might require a deeper comparison if object references change frequently)
    // For now, just set it every frame. Could optimize later if performance requires.
    setRadarPositions(combinedRadarPositions);
  }); // End useFrame

  // --- Render Scene Content ---
  if (!assets || !currentPlanet) return null; // Don't render if assets/planet not ready

  return (
    <>
      {/* Planet */}
      {assets.planet && (
        <PlanetComponent
          radius={assets.planet.radius}
          color={assets.planet.color}
          // Example fixed position relative to origin (or could use currentPlanet.coordinates?)
          // For space flight, planets are usually very far away unless approaching
          position={[0, -assets.planet.radius - 15000, -30000]} // Example distant position
          visible={true} // Always visible in space flight? Or based on distance?
        />
      )}

      {/* Space Station */}
      {assets.spaceStation && (
        // Wrap station in a group to easily access its world position via ref
        <group ref={stationRef} position={[0, 0, 0]} name="SpaceStationGroup">
          <SpaceStationComponent
            modelPath={assets.spaceStation.modelPath}
            initialScale={Constants.SHIP_SCALE * 2} // Make station larger
            wireframeColor={0xffff00} // Yellow
            rotationSpeed={0.01} // Slow rotation
            visible={true}
          />
        </group>
      )}

      {/* Pirates */}
      {assets.pirateShips && assets.pirateShips.length > 0 && (
        <PiratesComponent
          playerCamera={camera} // Pass the R3F camera object
          pirateConfigs={assets.pirateShips}
          initialPlayerPosition={initialPlayerPositionRef.current} // Pass initial player position
          onPirateRadarUpdate={handlePirateRadarUpdate} // Pass callback
        />
      )}

      {/* Laser Beam */}
      <lineSegments
        ref={laserBeamRef}
        visible={false} // Initially hidden
        frustumCulled={false} // Don't cull based on camera frustum
      >
        <bufferGeometry ref={laserGeometryRef} attach="geometry">
          {/* Define geometry using the points */}
          <bufferAttribute
            attach="attributes-position"
            count={laserBeamPoints.length}
            array={
              // Convert Vector3 array to flat Float32Array
              new Float32Array(laserBeamPoints.flatMap((p) => p.toArray()))
            }
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={Constants.LASER_COLOR}
          linewidth={Constants.LASER_LINE_WIDTH}
          transparent // Allow transparency
          opacity={0.8} // Slightly transparent
        />
      </lineSegments>
    </>
  );
};

export default SpaceFlightSceneR3F;
