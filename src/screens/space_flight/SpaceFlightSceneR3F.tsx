/* src/screens/space_flight/SpaceFlightSceneR3F.tsx */
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameState } from "@/hooks/useGameState";
import { useHudState } from "@/hooks/useHudState";
import { RadarPosition } from "@/types";
import * as Constants from "@/constants";
import { useInput } from "@/hooks/useInput";
import PlanetComponent from "@/components/r3f/PlanetComponent";
import SpaceStationComponent from "@/components/r3f/SpaceStationComponent";
import PiratesComponent from "@/components/r3f/PiratesComponent";
import { useAssets } from "@/hooks/useAssets";
import { usePlanetInfos } from "../../hooks/usePlanetInfos";
import LaserBeam from "@/components/r3f/LaserBeam";

const SpaceFlightSceneR3F: React.FC = () => {
  const { assets } = useAssets();
  const { camera } = useThree();
  const { shipControls } = useInput();
  const { gameState, setGameState, previousGameState } = useGameState();
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

  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const rollRate = useRef(0); // Radians per second
  const pitchRate = useRef(0); // Radians per second
  const [pirateRadarPositions, setPirateRadarPositions] = useState<
    RadarPosition[]
  >([]);
  const stationRef = useRef<THREE.Group>(null);
  const initialPlayerPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const isInitializedRef = useRef(false); // Track if initialization has run for this activation

  // --- Temporary Objects for Calculations (useRef for reuse) ---
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const forwardVector = useRef(new THREE.Vector3()).current;
  const rightVector = useRef(new THREE.Vector3()).current;

  useEffect(() => {
    // Explicitly check if we are in the correct game state
    if (gameState !== "space_flight") {
      // If we're not in space flight, ensure the initialized flag is false
      // so that initialization runs when we *do* enter space_flight.
      isInitializedRef.current = false;
      return; // Don't run initialization logic if not in space flight
    }

    // This effect now manages initialization based on how we entered the space_flight state
    if (!assets || !currentPlanet) {
      console.warn(
        "[SpaceFlightSceneR3F] Assets or planet not ready for initialization."
      );
      isInitializedRef.current = false; // Mark as not initialized
      return;
    }

    // Prevent re-initialization if already done for this activation
    if (isInitializedRef.current) return;

    console.log(
      `[SpaceFlightSceneR3F] Initializing flight state (Previous: ${previousGameState})`
    ); // Line 64

    // --- Reset Common State ---
    velocity.current.set(0, 0, 0);
    rollRate.current = 0;
    pitchRate.current = 0;
    camera.rotation.set(0, 0, 0); // Reset rotation euler first
    camera.quaternion.identity(); // Ensure quaternion is reset

    // --- Determine Initial Position/Rotation ---
    let startPos: THREE.Vector3;
    let startLookAt: THREE.Vector3 | null = null;

    if (previousGameState === "undocking") {
      // Position 10km behind the station
      const undockOffset = new THREE.Vector3(0, 0, Constants.UNDOCK_DISTANCE); // Assuming station back is +Z
      startPos = new THREE.Vector3()
        .copy(Constants.STATION_POSITION)
        .add(undockOffset);
      // Look away from the station (e.g., towards +Z from the new position)
      startLookAt = new THREE.Vector3()
        .copy(startPos)
        .add(new THREE.Vector3(0, 0, 1));
      console.log(
        `Initializing after undock. Pos: ${startPos.toArray()}, LookAt: ${startLookAt?.toArray()}`
      ); // Line 92
    } else if (previousGameState === "hyperspace_jump") {
      // Position at the planet's designated spawn point
      const spawnPosData = currentPlanet.playerSpawnPosition;
      startPos = new THREE.Vector3(
        spawnPosData.x,
        spawnPosData.y,
        spawnPosData.z
      );
      // Default look direction (e.g., towards origin)
      startLookAt = new THREE.Vector3(0, 0, 0); // Look towards system origin after jump
      console.log(
        `Initializing after hyperspace. Pos: ${startPos.toArray()}, LookAt: ${startLookAt?.toArray()}`
      );
    } else {
      // Default/Initial Load: Use planet's spawn point (if currentPlanet exists)
      // This case might need adjustment if there's no initial planet on first load yet
      if (currentPlanet.playerSpawnPosition) {
        const spawnPosData = currentPlanet.playerSpawnPosition;
        startPos = new THREE.Vector3(
          spawnPosData.x,
          spawnPosData.y,
          spawnPosData.z
        );
        startLookAt = new THREE.Vector3(0, 0, 0); // Look towards system origin
        console.log(
          `Initializing default. Pos: ${startPos.toArray()}, LookAt: ${startLookAt?.toArray()}`
        );
      } else {
        console.error(
          "Cannot initialize default position: currentPlanet.playerSpawnPosition is missing!"
        );
        startPos = new THREE.Vector3(0, 0, 5000); // Fallback position
        startLookAt = new THREE.Vector3(0, 0, 0);
      }
    }

    camera.position.copy(startPos);
    initialPlayerPositionRef.current.copy(startPos); // Store for pirates

    // Apply lookAt if defined
    if (startLookAt) {
      camera.lookAt(startLookAt);
    } else {
      // Default orientation if no lookAt is specified
      camera.rotation.set(0, 0, 0);
      camera.quaternion.identity();
    }

    // --- Reset HUD State ---
    setCoordinates([camera.position.x, camera.position.y, camera.position.z]);
    setSpeed(0);
    setRoll(0);
    setPitch(0);
    setStationDirection(null);
    setRadarPositions([]);
    setPirateRadarPositions([]); // Reset pirate radar data specifically
    setLaserHeat(0); // Reset laser heat

    isInitializedRef.current = true; // Mark as initialized for this activation

    // Cleanup function to reset the initialization flag when leaving the state
    return () => {
      console.log("[SpaceFlightSceneR3F] Cleaning up initialization flag."); // Line 148
      isInitializedRef.current = false;
    };
    // *** REDUCED DEPENDENCIES ***
    // Only re-run initialization if the game state changes,
    // assets load, the current planet changes, or the previous state changes.
    // Camera and HUD setters are removed as dependencies for *initialization*.
  }, [
    gameState,
    assets,
    currentPlanet,
    previousGameState,
    camera,
    setGameState,
    setCoordinates,
    setSpeed,
    setRoll,
    setPitch,
    setLaserHeat,
    setStationDirection,
    setRadarPositions,
  ]); // Keep setters needed *inside* the effect

  const handlePirateRadarUpdate = useCallback(
    (positions: RadarPosition[]) => {
      // Simple string comparison to avoid unnecessary updates if array content is identical
      if (JSON.stringify(positions) !== JSON.stringify(pirateRadarPositions)) {
        setPirateRadarPositions(positions);
      }
    },
    [pirateRadarPositions] // Dependency is the state itself
  );

  // Callback for the LaserBeam component to update the HUD state
  const handleLaserHeatUpdate = useCallback(
    (heatPercentage: number) => {
      setLaserHeat(heatPercentage);
    },
    [setLaserHeat]
  ); // Dependency on the setter function

  useFrame((state, delta) => {
    // Ensure initialization has run before starting frame updates
    // Also check gameState ensures updates stop if we leave space_flight
    if (
      gameState !== "space_flight" ||
      !assets ||
      !currentPlanet ||
      !isInitializedRef.current
    )
      return;

    const { camera: currentCamera } = state;
    // Clamp delta time to prevent physics instability with large frame drops
    const dt = Math.min(delta, 0.05); // Max 50ms step

    // --- Calculate Target Angular Rates based on Input ---
    const rollAccelInput = shipControls.rollLeft
      ? -Constants.ROLL_ACCELERATION
      : shipControls.rollRight
      ? Constants.ROLL_ACCELERATION
      : 0;
    const pitchAccelInput = shipControls.pitchUp
      ? -Constants.PITCH_ACCELERATION
      : shipControls.pitchDown
      ? Constants.PITCH_ACCELERATION
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

    // --- Docking Check ---
    if (stationRef.current) {
      const distanceToStationSq = currentCamera.position.distanceToSquared(
        Constants.STATION_POSITION // Station position is now hardcoded in constants
      );
      const dockingRadiusSq =
        Constants.STATION_DOCKING_RADIUS * Constants.STATION_DOCKING_RADIUS;

      if (distanceToStationSq < dockingRadiusSq) {
        console.log("Docking proximity detected. Returning to stats screen.");
        setGameState("stats"); // Transition back to stats (docked) screen
        velocity.current.set(0, 0, 0); // Stop the ship immediately
        // Reset initialization flag so next flight starts fresh
        isInitializedRef.current = false;
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

    // --- Radar and Direction Indicator ---
    const combinedRadarPositions: RadarPosition[] = [];
    const cameraMatrix = currentCamera.matrixWorldInverse; // Get camera's view matrix

    let stationDirData = null;
    if (stationRef.current) {
      // Calculate station position relative to camera
      tempVector.copy(Constants.STATION_POSITION).applyMatrix4(cameraMatrix);
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
    setRadarPositions(combinedRadarPositions);
  }); // End useFrame

  // --- Render Scene Content ---
  // Render only if assets are loaded
  if (!assets) return null;

  return (
    <>
      {/* Planet - Render only if far away or based on other logic */}
      {assets.planet &&
        camera.position.lengthSq() > 10000 * 10000 && ( // Example: Only render if >10k units away
          <PlanetComponent
            radius={assets.planet.radius}
            color={assets.planet.color}
            // Use a fixed position very far away, relative to the system origin (0,0,0)
            position={[0, -assets.planet.radius - 50000, -100000]} // Example very distant position
            visible={true} // Controls whether to render at all
          />
        )}

      {/* Space Station */}
      {assets.spaceStation && (
        // Use a group to apply the constant station position
        <group
          ref={stationRef}
          position={Constants.STATION_POSITION}
          name="SpaceStationGroup"
        >
          <SpaceStationComponent
            modelPath={assets.spaceStation.modelPath}
            initialScale={Constants.SHIP_SCALE * 2} // Make station larger
            wireframeColor={0xffff00} // Yellow
            rotationSpeed={0.01} // Slow rotation
            visible={true}
            // Position and rotation are handled by the parent group now
          />
        </group>
      )}

      {/* Pirates */}
      {/* Conditionally render pirates only after initialization */}
      {assets.pirateShips &&
        assets.pirateShips.length > 0 &&
        isInitializedRef.current && (
          <PiratesComponent
            playerCamera={camera} // Pass the R3F camera object
            pirateConfigs={assets.pirateShips}
            initialPlayerPosition={initialPlayerPositionRef.current} // Use the stored initial position
            onPirateRadarUpdate={handlePirateRadarUpdate} // Pass callback
          />
        )}

      {/* Laser Beam Component */}
      <LaserBeam camera={camera} onHeatUpdate={handleLaserHeatUpdate} />
    </>
  );
};

export default SpaceFlightSceneR3F;
