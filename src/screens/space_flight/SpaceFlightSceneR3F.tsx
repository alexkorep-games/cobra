// src/screens/space_flight/SpaceFlightSceneR3F.tsx
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameState } from "@/hooks/useGameState";
import { useHudState } from "@/hooks/useHudState";
import { RadarPosition } from "@/types";
import * as Constants from "@/constants";
import { useInput, jumpSpeedButtonTriggerAtom } from "@/hooks/useInput"; // << Import jumpSpeedButtonTriggerAtom
import PlanetComponent from "@/components/r3f/PlanetComponent";
import SpaceStationComponent from "@/components/r3f/SpaceStationComponent";
import PiratesComponent from "@/components/r3f/PiratesComponent";
import { useAssets } from "@/hooks/useAssets";
import { usePlanetInfos } from "../../hooks/usePlanetInfos";
import LaserBeam from "@/components/r3f/LaserBeam";
import { useAtomValue } from "jotai"; // << Import useAtomValue

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
    setIsJumpSpeedActive,
  } = useHudState();
  const { getCurrentPlanet } = usePlanetInfos();
  const currentPlanet = getCurrentPlanet();

  // --- Jump Speed State ---
  const jumpButtonTrigger = useAtomValue(jumpSpeedButtonTriggerAtom); // << Read the trigger atom
  const lastJumpButtonTriggerRef = useRef(jumpButtonTrigger); // << Track last trigger value

  // --- FOV Effect State ---
  const originalFovRef = useRef(camera.fov); // Store initial FOV
  const targetFovRef = useRef(camera.fov); // Target FOV for interpolation
  const fovResetTimerRef = useRef(0); // Timer for effect duration

  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const rollRate = useRef(0); // Radians per second
  const pitchRate = useRef(0); // Radians per second
  const [pirateRadarPositions, setPirateRadarPositions] = useState<
    RadarPosition[]
  >([]);
  const stationRef = useRef<THREE.Group>(null);
  const initialPlayerPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const isInitializedRef = useRef(false);

  const stationPosition = useMemo(() => {
    if (assets?.planet) {
      console.log('assets.planet.radius', assets.planet.radius);
      return new THREE.Vector3(0, 0, assets.planet.radius * 4);
    }
    return new THREE.Vector3(0, 0, 10000);
  }, [assets?.planet]);

  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const forwardVector = useRef(new THREE.Vector3()).current;
  const rightVector = useRef(new THREE.Vector3()).current;

  useEffect(() => {
    if (gameState !== "space_flight") {
      isInitializedRef.current = false;
      // Reset FOV when leaving flight state
      camera.fov = originalFovRef.current;
      targetFovRef.current = originalFovRef.current;
      camera.updateProjectionMatrix();
      fovResetTimerRef.current = 0;
      return;
    }

    if (!assets || !currentPlanet) {
      console.warn(
        "[SpaceFlightSceneR3F] Assets or planet not ready for initialization."
      );
      isInitializedRef.current = false;
      return;
    }

    if (isInitializedRef.current) return;

    console.log(
      `[SpaceFlightSceneR3F] Initializing flight state (Previous: ${previousGameState})`
    );

    velocity.current.set(0, 0, 0);
    rollRate.current = 0;
    pitchRate.current = 0;
    camera.rotation.set(0, 0, 0);
    camera.quaternion.identity();

    let startPos: THREE.Vector3;
    let startLookAt: THREE.Vector3 | null = null;

    if (previousGameState === "undocking") {
      const undockOffset = new THREE.Vector3(0, 0, Constants.UNDOCK_DISTANCE);
      startPos = new THREE.Vector3().copy(stationPosition).add(undockOffset);
      startLookAt = new THREE.Vector3()
        .copy(startPos)
        .add(new THREE.Vector3(0, 0, 1));
      console.log(
        `Initializing after undock. Pos: ${startPos.toArray()}, LookAt: ${startLookAt?.toArray()}`
      );
    } else if (previousGameState === "hyperspace_jump") {
      const spawnPosData = currentPlanet.playerSpawnPosition;
      startPos = new THREE.Vector3(
        spawnPosData.x,
        spawnPosData.y,
        spawnPosData.z
      );
      startLookAt = new THREE.Vector3(0, 0, 0);
      console.log(
        `Initializing after hyperspace. Pos: ${startPos.toArray()}, LookAt: ${startLookAt?.toArray()}`
      );
    } else {
      if (currentPlanet.playerSpawnPosition) {
        const spawnPosData = currentPlanet.playerSpawnPosition;
        startPos = new THREE.Vector3(
          spawnPosData.x,
          spawnPosData.y,
          spawnPosData.z
        );
        startLookAt = new THREE.Vector3(0, 0, 0);
        console.log(
          `Initializing default. Pos: ${startPos.toArray()}, LookAt: ${startLookAt?.toArray()}`
        );
      } else {
        console.error(
          "Cannot initialize default position: currentPlanet.playerSpawnPosition is missing!"
        );
        startPos = new THREE.Vector3(0, 0, 5000);
        startLookAt = new THREE.Vector3(0, 0, 0);
      }
    }

    camera.position.copy(startPos);
    initialPlayerPositionRef.current.copy(startPos);

    if (startLookAt) {
      camera.lookAt(startLookAt);
    } else {
      camera.rotation.set(0, 0, 0);
      camera.quaternion.identity();
    }

    // Store original FOV on init
    originalFovRef.current = camera.fov;
    targetFovRef.current = camera.fov;
    fovResetTimerRef.current = 0;

    setCoordinates([camera.position.x, camera.position.y, camera.position.z]);
    setSpeed(0);
    setRoll(0);
    setPitch(0);
    setStationDirection(null);
    setRadarPositions([]);
    setPirateRadarPositions([]);
    setLaserHeat(0);
    setIsJumpSpeedActive(false);

    isInitializedRef.current = true;

    return () => {
      console.log("[SpaceFlightSceneR3F] Cleaning up initialization flag.");
      isInitializedRef.current = false;
      // Reset FOV on cleanup
      camera.fov = originalFovRef.current;
      targetFovRef.current = originalFovRef.current;
      camera.updateProjectionMatrix();
      fovResetTimerRef.current = 0;
      setIsJumpSpeedActive(false);
    };
  }, [
    gameState,
    assets,
    currentPlanet,
    previousGameState,
    camera,
    stationPosition,
    setGameState,
    setCoordinates,
    setSpeed,
    setRoll,
    setPitch,
    setLaserHeat,
    setStationDirection,
    setRadarPositions,
    setIsJumpSpeedActive,
  ]);

  const handlePirateRadarUpdate = useCallback(
    (positions: RadarPosition[]) => {
      if (JSON.stringify(positions) !== JSON.stringify(pirateRadarPositions)) {
        setPirateRadarPositions(positions);
      }
    },
    [pirateRadarPositions]
  );

  const handleLaserHeatUpdate = useCallback(
    (heatPercentage: number) => {
      setLaserHeat(heatPercentage);
    },
    [setLaserHeat]
  );

  useFrame((state, delta) => {
    if (
      gameState !== "space_flight" ||
      !assets ||
      !currentPlanet ||
      !isInitializedRef.current
    )
      return;

    const { camera: currentCamera } = state;
    const dt = Math.min(delta, 0.05);

    // --- Jump Speed Trigger Check ---
    let jumpSpeedEngaged = false;
    if (shipControls.jumpSpeed) {
      // Check keyboard first
      jumpSpeedEngaged = true;
      // Reset trigger ref if key is pressed to avoid double trigger
      lastJumpButtonTriggerRef.current = jumpButtonTrigger;
    } else if (jumpButtonTrigger !== lastJumpButtonTriggerRef.current) {
      // Check button trigger
      console.log("Jump speed triggered by button");
      jumpSpeedEngaged = true;
      lastJumpButtonTriggerRef.current = jumpButtonTrigger; // Update ref
    }

    // --- Apply Jump Speed and Visual Effect ---
    if (jumpSpeedEngaged) {
      console.log(`Engaging Jump Speed: ${Constants.JUMP_SPEED}`);
      forwardVector.set(0, 0, -1).applyQuaternion(currentCamera.quaternion);
      velocity.current.copy(forwardVector).multiplyScalar(Constants.JUMP_SPEED);

      // Trigger FOV effect
      targetFovRef.current =
        originalFovRef.current + Constants.JUMP_FOV_INCREASE;
      fovResetTimerRef.current = Constants.JUMP_FOV_DURATION;
      // Stop angular rotation when jumping
      rollRate.current = 0;
      pitchRate.current = 0;
      // Update HUD state
      setIsJumpSpeedActive(true);
    } else {
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
        if (Math.abs(rollRate.current) < 0.005) rollRate.current = 0;
      }
      if (pitchAccelInput === 0) {
        pitchRate.current *= dampingFactor;
        if (Math.abs(pitchRate.current) < 0.005) pitchRate.current = 0;
      }

      // --- Update Linear Velocity ---
      forwardVector.set(0, 0, -1).applyQuaternion(currentCamera.quaternion);

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
          const brakeDecel = Math.min(speed / dt, Constants.DECELERATION);
          tempVector2
            .copy(velocity.current)
            .normalize()
            .multiplyScalar(-brakeDecel);
          velocity.current.addScaledVector(tempVector2, dt);
        } else if (speed > 0) {
          velocity.current.set(0, 0, 0);
        }
      }

      // Apply linear damping if coasting
      if (!shipControls.accelerate && !shipControls.brake) {
        const dampingFactorLinear = Math.exp(-Constants.LINEAR_DAMPING * dt);
        velocity.current.multiplyScalar(dampingFactorLinear);
        if (velocity.current.lengthSq() < 0.01) {
          velocity.current.set(0, 0, 0);
        }
      }

      // Clamp speed to MAX_SPEED
      const currentSpeed = velocity.current.length();
      if (currentSpeed > Constants.MAX_SPEED) {
        velocity.current.normalize().multiplyScalar(Constants.MAX_SPEED);
      }

      // --- Apply Rotation to Camera ---
      rightVector.set(1, 0, 0).applyQuaternion(currentCamera.quaternion);
      tempQuaternion.setFromAxisAngle(rightVector, pitchRate.current * dt);
      currentCamera.quaternion.premultiply(tempQuaternion);

      forwardVector.set(0, 0, -1).applyQuaternion(currentCamera.quaternion); // Re-calculate forward
      tempQuaternion.setFromAxisAngle(forwardVector, rollRate.current * dt);
      currentCamera.quaternion.premultiply(tempQuaternion);

      currentCamera.quaternion.normalize();
    }

    // --- Apply Velocity to Camera Position ---
    currentCamera.position.addScaledVector(velocity.current, dt);

    // --- FOV Effect Update ---
    if (fovResetTimerRef.current > 0) {
      fovResetTimerRef.current -= dt;
      if (fovResetTimerRef.current <= 0) {
        targetFovRef.current = originalFovRef.current; // Start returning to normal
      }
    }

    // Interpolate current FOV towards target FOV
    const fovNeedsUpdate =
      Math.abs(currentCamera.fov - targetFovRef.current) > 0.01;
    if (fovNeedsUpdate) {
      currentCamera.fov = THREE.MathUtils.lerp(
        currentCamera.fov,
        targetFovRef.current,
        dt * Constants.JUMP_FOV_LERP_SPEED // Lerp speed
      );
      currentCamera.updateProjectionMatrix(); // IMPORTANT: Update projection matrix after FOV change
    }

    // --- Docking Check ---
    if (stationRef.current) {
      const distanceToStationSq =
        currentCamera.position.distanceToSquared(stationPosition);
      const dockingRadiusSq =
        Constants.STATION_DOCKING_RADIUS * Constants.STATION_DOCKING_RADIUS;
      if (distanceToStationSq < dockingRadiusSq) {
        console.log("Docking proximity detected. Returning to stats screen.");
        setGameState("stats");
        velocity.current.set(0, 0, 0);
        isInitializedRef.current = false;
      }
    }

    // --- Update HUD State ---
    const speedValue = velocity.current.length();
    // Normalize speed based on MAX_SPEED for the regular bar display
    const normalizedSpeed = Math.min(
      100,
      (speedValue / Constants.MAX_SPEED) * 100
    );
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

    setCoordinates([
      currentCamera.position.x,
      currentCamera.position.y,
      currentCamera.position.z,
    ]);
    setSpeed(normalizedSpeed);
    setRoll(normalizedRoll);
    setPitch(normalizedPitch);

    // Ensure jump speed state is false if not actively jumping
    if (!jumpSpeedEngaged) {
      setIsJumpSpeedActive(false);
    }

    // --- Radar and Direction Indicator ---
    const combinedRadarPositions: RadarPosition[] = [];
    const cameraMatrix = currentCamera.matrixWorldInverse;
    let stationDirData = null;
    if (stationRef.current) {
      tempVector.copy(stationPosition).applyMatrix4(cameraMatrix);
      const distToStation = tempVector.length();
      if (distToStation < Constants.RADAR_DISTANCE) {
        const normalizedStationDir = tempVector2.copy(tempVector).normalize();
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
    setStationDirection(stationDirData);
    combinedRadarPositions.push(...pirateRadarPositions);
    setRadarPositions(combinedRadarPositions);
  }); // End useFrame

  if (!assets) return null;

  return (
    <>
      {/* Planet */}
      {assets.planet && (
        <PlanetComponent
          radius={assets.planet.radius}
          color={assets.planet.color}
          position={[0, 0, 0]}
          visible={true}
        />
      )}

      {/* Space Station */}
      {assets.spaceStation && assets.planet && (
        <group
          ref={stationRef}
          position={stationPosition}
          name="SpaceStationGroup"
        >
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
      {assets.pirateShips &&
        assets.pirateShips.length > 0 &&
        isInitializedRef.current && (
          <PiratesComponent
            playerCamera={camera}
            pirateConfigs={assets.pirateShips}
            initialPlayerPosition={initialPlayerPositionRef.current}
            onPirateRadarUpdate={handlePirateRadarUpdate}
          />
        )}

      {/* Laser Beam */}
      <LaserBeam camera={camera} onHeatUpdate={handleLaserHeatUpdate} />
    </>
  );
};

export default SpaceFlightSceneR3F;
