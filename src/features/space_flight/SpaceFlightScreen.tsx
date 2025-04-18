import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import BottomHud from "@/components/hud/BottomHud";
import { RadarPosition, IGameManager } from "@/types"; // Assuming IGameManager is needed for setters/state switching
import * as Constants from "@/constants";
import { useGameState } from "@/features/common/useGameState";
import { usePlanetInfos } from "../common/usePlanetInfos"; // Import planet state hook

// Import R3F Entity Components (now rendered here)
import PlanetComponent from "@/components/r3f/PlanetComponent";
import SpaceStationComponent from "@/components/r3f/SpaceStationComponent";
import ShipComponent from "@/components/r3f/ShipComponent";

// Define radar range constant
const RADAR_DISTANCE = 10000;

// Define a type for pirate state managed within this component
interface PirateState {
  id: number;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  visible: boolean;
  modelPath: string; // Assuming model path comes from GameManager assets config
  health: number; // Add health
}

interface SpaceFlightScreenProps {
  gameManager: IGameManager;
  // Receive HUD state from App.tsx as props
  speed: number;
  roll: number;
  pitch: number;
  laserHeat: number;
  altitude: number;
  stationDirection: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null;
  radarPosition: RadarPosition[];
}

const SpaceFlightScreen: React.FC<SpaceFlightScreenProps> = ({
  gameManager,
  // Destructure HUD props
  speed,
  roll,
  pitch,
  laserHeat,
  altitude,
  stationDirection,
  radarPosition,
}) => {
  const { camera } = useThree();
  const { setGameState } = useGameState();
  const { getCurrentPlanet } = usePlanetInfos(); // Get current planet info

  // --- Refs ---
  const laserBeamRef = useRef<THREE.LineSegments>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const pirateShipRefs = useRef<Record<number, THREE.Group | null>>({}); // Use record for ID mapping

  // --- State ---
  // Internal physics state, potentially redundant if GM setters update props correctly
  const [velocity, setVelocity] = useState(0);
  const [rollRate, setRollRate] = useState(0);
  const [pitchRate, setPitchRate] = useState(0);
  const [isHyperspaceActive, setIsHyperspaceActive] = useState(false);
  const [currentLaserHeat, setCurrentLaserHeat] = useState(0);
  const [laserCooldownTimer, setLaserCooldownTimer] = useState(0);
  const [wantsToFire, setWantsToFire] = useState(false);
  const [laserBeamHideTimer, setLaserBeamHideTimer] = useState(0);

  // Object Positions/Rotations (Managed by R3F components or state here)
  const [pirateStates, setPirateStates] = useState<PirateState[]>([]);
  const [planetPosition, setPlanetPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, -camera.far * 0.8)
  );
  const [stationPosition, setStationPosition] = useState<THREE.Vector3>(
    new THREE.Vector3(1000, 1000, -5000)
  ); // Example fixed position

  // --- Temporary Objects for Calculations ---
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const raycaster = useRef(new THREE.Raycaster()).current;

  // --- Asset Configuration (from GameManager) ---
  const planetAsset = gameManager.assets.planet;
  const stationAsset = gameManager.assets.spaceStation;
  const pirateAssetConfigs = gameManager.assets.pirateShips; // Array of { modelPath: string }

  // --- Positioning Logic Helper ---
  const positionObjectRandomly = useCallback(
    (
      baseDistance: number,
      offsetRange: THREE.Vector2 = new THREE.Vector2(0.8, 1.2),
      relativeTo: THREE.Vector3 = camera.position // Use camera position directly
    ): { position: THREE.Vector3; quaternion: THREE.Quaternion } => {
      const distance =
        baseDistance *
        THREE.MathUtils.lerp(offsetRange.x, offsetRange.y, Math.random());
      const angle = Math.random() * Math.PI * 2;
      const elevationAngle = (Math.random() - 0.5) * Math.PI;
      const x =
        relativeTo.x + distance * Math.sin(angle) * Math.cos(elevationAngle);
      const y = relativeTo.y + distance * Math.sin(elevationAngle);
      const z =
        relativeTo.z - distance * Math.cos(angle) * Math.cos(elevationAngle);

      const position = new THREE.Vector3(x, y, z);
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        )
      );
      return { position, quaternion };
    },
    [camera.position] // Depends on camera position if used as default relativeTo
  );

  // --- Initialization (Equivalent to SpaceFlightSceneLogic.enter) ---
  useEffect(() => {
    console.log(
      "[SpaceFlightScreen.useEffect.enter] Mounting SpaceFlightScreen"
    );

    // Reset player state
    setVelocity(0);
    setRollRate(0);
    setPitchRate(0);
    keysPressed.current.clear();
    camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 0); // Player starts at origin
    setIsHyperspaceActive(false);
    setCurrentLaserHeat(0);
    setLaserCooldownTimer(0);
    setWantsToFire(false);
    setLaserBeamHideTimer(0);

    // Position Planet (relative to player start or absolute)
    // Example: Place it far away based on player start
    const planetStartPos = new THREE.Vector3(0, 0, -camera.far * 0.8);
    setPlanetPosition(planetStartPos);

    // Position Station (relative to planet or absolute)
    // Example: Offset from planet
    const stationStartPos = planetStartPos
      .clone()
      .add(
        new THREE.Vector3(
          Constants.STATION_PLANET_OFFSET_MAX,
          Constants.STATION_PLANET_OFFSET_MAX,
          0
        )
      );
    setStationPosition(stationStartPos);

    // Initialize Pirate States
    const initialPirates = pirateAssetConfigs.map((config, index) => {
      const { position, quaternion } = positionObjectRandomly(
        Constants.PIRATE_BASE_DISTANCE,
        Constants.PIRATE_POSITION_OFFSET_RANGE,
        camera.position // Relative to camera start (0,0,0)
      );
      console.log(
        `[SpaceFlightScreen.useEffect.enter] Pirate ${index} positioned at ${position
          .toArray()
          .map((p) => p.toFixed(0))}. Visible: true`
      );
      return {
        id: index,
        position: position,
        quaternion: quaternion,
        visible: true, // Start visible
        modelPath: config.modelPath,
        health: 5, // Example health
      };
    });
    setPirateStates(initialPirates);
    pirateShipRefs.current = {}; // Reset refs map

    // Setup laser beam geometry (will be added/removed dynamically or visibility toggled)

    // --- Input Handlers ---
    const handleKeyDown = (event: KeyboardEvent) => {
      let keyIdentifier = event.code;
      if (event.key === "/") keyIdentifier = "Slash";
      else if (event.key === ".") keyIdentifier = "Period";
      else if (event.key === ",") keyIdentifier = "Comma";
      else if (event.key === " ") keyIdentifier = "Space";
      else if (event.key === "j" || event.key === "J") keyIdentifier = "KeyJ";
      else if (event.key === "n" || event.key === "N") keyIdentifier = "KeyN"; // Chart key

      // Handle J key specifically for hyperspace toggle
      if (keyIdentifier === "KeyJ") {
        setIsHyperspaceActive((prev) => {
          const next = !prev;
          console.log(`Hyperspace Toggled: ${next}`);
          if (!next) {
            // Clamp speed immediately when turning off using GM setter
            const currentSpeed = gameManager.reactSetters.setSpeed
              ? velocity
              : 0; // Need way to get current speed if not prop
            gameManager.reactSetters.setSpeed(
              Math.min(currentSpeed, Constants.MAX_SPEED)
            );
          }
          return next;
        });
        return; // Prevent adding J to keysPressed
      }
      // Handle N key for short range chart
      if (keyIdentifier === "KeyN") {
        setGameState("short_range_chart");
        return; // Prevent adding N to keysPressed
      }

      keysPressed.current.add(keyIdentifier);
      if (keyIdentifier === "Space") setWantsToFire(true); // Update state for firing
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let keyIdentifier = event.code;
      if (event.key === "/") keyIdentifier = "Slash";
      else if (event.key === ".") keyIdentifier = "Period";
      else if (event.key === ",") keyIdentifier = "Comma";
      else if (event.key === " ") keyIdentifier = "Space";
      else if (event.key === "j" || event.key === "J")
        keyIdentifier = "KeyJ"; // Ensure J is removed
      else if (event.key === "n" || event.key === "N") keyIdentifier = "KeyN"; // Ensure N is removed

      keysPressed.current.delete(keyIdentifier);
      if (keyIdentifier === "Space") setWantsToFire(false); // Update state for firing
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    console.log("[SpaceFlightScreen.useEffect.enter] Key listeners added");

    // --- Cleanup (Equivalent to SpaceFlightSceneLogic.exit) ---
    return () => {
      console.log(
        "[SpaceFlightScreen.useEffect.exit] Unmounting SpaceFlightScreen"
      );
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      keysPressed.current.clear();
      setIsHyperspaceActive(false);
      setWantsToFire(false);

      // Reset HUD via GameManager setters (optional, as App might reset on state change anyway)
      gameManager.reactSetters.setCoordinates([0, 0, 0]);
      gameManager.reactSetters.setSpeed(0);
      gameManager.reactSetters.setRoll(0);
      gameManager.reactSetters.setPitch(0);
      gameManager.reactSetters.setLaserHeat(0);
      gameManager.reactSetters.setAltitude(0);
      gameManager.reactSetters.setStationDirection(null);
      gameManager.reactSetters.setRadarPositions([]);

      // Laser beam cleanup is handled by R3F unmounting the component
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, gameManager, positionObjectRandomly, setGameState]); // Dependencies

  // --- Game Loop Logic (Equivalent to SpaceFlightSceneLogic.update) ---
  useFrame((_, delta) => {
    // --- Update Timers ---
    setLaserCooldownTimer((prev) => Math.max(0, prev - delta));
    setLaserBeamHideTimer((prev) => Math.max(0, prev - delta));

    // --- Handle Input ---
    let accelerate = false,
      decelerate = false,
      rollLeft = false,
      rollRight = false,
      pitchUp = false, // ArrowDown -> Pitch Nose Up
      pitchDown = false; // ArrowUp -> Pitch Nose Down

    if (keysPressed.current.has("KeyA")) accelerate = true;
    if (keysPressed.current.has("KeyZ")) decelerate = true;
    if (keysPressed.current.has("ArrowLeft")) rollLeft = true;
    if (keysPressed.current.has("ArrowRight")) rollRight = true;
    if (keysPressed.current.has("ArrowUp")) pitchDown = true;
    if (keysPressed.current.has("ArrowDown")) pitchUp = true;

    // --- Laser Cooling ---
    let nextLaserHeat = currentLaserHeat;
    if (!wantsToFire && currentLaserHeat > 0) {
      nextLaserHeat = Math.max(
        0,
        currentLaserHeat - Constants.LASER_HEAT_DECREASE_RATE * delta
      );
    }

    // --- Laser Firing ---
    const laserBeam = laserBeamRef.current;
    let hitTargetId: number | null = null; // Track hit ID
    if (
      wantsToFire &&
      laserCooldownTimer <= 0 &&
      nextLaserHeat < Constants.LASER_MAX_HEAT &&
      laserBeam // Ensure laserBeamRef is populated
    ) {
      setLaserCooldownTimer(Constants.LASER_COOLDOWN);
      nextLaserHeat = Math.min(
        Constants.LASER_MAX_HEAT,
        nextLaserHeat + Constants.LASER_HEAT_INCREASE
      );

      // Raycasting
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      // Get currently visible pirate meshes using refs
      const visiblePirateMeshes = Object.values(pirateShipRefs.current).filter(
        (ref) => ref?.visible
      ) as THREE.Object3D[];

      let hitDistance = Constants.LASER_RANGE;
      if (visiblePirateMeshes.length > 0) {
        const intersects = raycaster.intersectObjects(
          visiblePirateMeshes,
          true
        ); // Recursive check

        if (intersects.length > 0) {
          const closestHit = intersects[0];
          if (closestHit.distance <= Constants.LASER_RANGE) {
            hitDistance = closestHit.distance;

            // Find which pirate Ship corresponds to the hit mesh
            let hitMesh = closestHit.object;
            // Traverse up to find the group with pirateId in userData
            while (hitMesh.parent && !(hitMesh.userData?.pirateId >= 0)) {
              hitMesh = hitMesh.parent;
            }
            const foundPirateId = hitMesh.userData?.pirateId;
            if (foundPirateId !== undefined && foundPirateId >= 0) {
              hitTargetId = foundPirateId; // Store the ID of the hit pirate
              console.log(
                `Hit Pirate ID: ${hitTargetId}! Distance: ${hitDistance.toFixed(
                  0
                )}`
              );
              // Damage will be applied later when updating pirate states
            } else {
              console.warn(
                "Laser hit a mesh, but couldn't find pirateId in userData.",
                hitMesh
              );
            }
          }
        }
      }

      // Visualize Laser Beam
      const startPoint = camera.position.clone();
      const direction = tempVector
        .set(0, 0, -1)
        .applyQuaternion(camera.quaternion);
      startPoint.addScaledVector(direction, 5.0); // Offset slightly from camera
      const endPoint = tempVector2
        .copy(startPoint)
        .addScaledVector(direction, hitDistance);

      // Offset for thickness simulation (doesn't really work with LineBasicMaterial)
      const offset = new THREE.Vector3(0.1, 0.1, 0).applyQuaternion(
        camera.quaternion
      );
      const startPoint2 = startPoint.clone().add(offset);
      const endPoint2 = endPoint.clone().add(offset);

      const positions = laserBeam.geometry.attributes
        .position as THREE.BufferAttribute;
      positions.setXYZ(0, startPoint.x, startPoint.y, startPoint.z);
      positions.setXYZ(1, endPoint.x, endPoint.y, endPoint.z);
      positions.setXYZ(2, startPoint2.x, startPoint2.y, startPoint2.z); // Not used by LineSegments
      positions.setXYZ(3, endPoint2.x, endPoint2.y, endPoint2.z); // Not used by LineSegments
      positions.needsUpdate = true;
      laserBeam.geometry.computeBoundingSphere(); // Update bounds

      laserBeam.visible = true;
      setLaserBeamHideTimer(Constants.LASER_DURATION);
    } else if (laserBeam && laserBeamHideTimer <= 0 && laserBeam.visible) {
      laserBeam.visible = false;
    }
    // Update laser heat state after calculations
    setCurrentLaserHeat(nextLaserHeat);

    // --- Update Velocity & Movement ---
    let currentVelocity = velocity;
    if (accelerate) currentVelocity += Constants.ACCELERATION * delta;
    else if (decelerate) currentVelocity -= Constants.ACCELERATION * delta;
    else {
      currentVelocity *= 1 - Constants.LINEAR_DAMPING * delta;
      if (Math.abs(currentVelocity) < 0.01) currentVelocity = 0;
    }

    currentVelocity = isHyperspaceActive
      ? Constants.HYPERSPACE_SPEED
      : THREE.MathUtils.clamp(
          currentVelocity,
          Constants.MIN_SPEED,
          Constants.MAX_SPEED
        );
    setVelocity(currentVelocity); // Update internal state

    // Update Roll Rate
    let currentRollRate = rollRate;
    if (rollLeft) currentRollRate += Constants.ROLL_ACCELERATION * delta;
    else if (rollRight) currentRollRate -= Constants.ROLL_ACCELERATION * delta;
    else {
      currentRollRate *= 1 - Constants.ANGULAR_DAMPING * delta;
      if (Math.abs(currentRollRate) < 0.01) currentRollRate = 0;
    }
    setRollRate(currentRollRate); // Update internal state

    // Update Pitch Rate
    let currentPitchRate = pitchRate;
    if (pitchDown) currentPitchRate -= Constants.PITCH_ACCELERATION * delta;
    else if (pitchUp) currentPitchRate += Constants.PITCH_ACCELERATION * delta;
    else {
      currentPitchRate *= 1 - Constants.ANGULAR_DAMPING * delta;
      if (Math.abs(currentPitchRate) < 0.01) currentPitchRate = 0;
    }
    setPitchRate(currentPitchRate); // Update internal state

    // Apply Movement and Rotation to Camera
    const moveDirection = tempVector
      .set(0, 0, -1)
      .applyQuaternion(camera.quaternion);
    camera.position.addScaledVector(moveDirection, currentVelocity * delta);
    camera.rotateX(currentPitchRate * delta); // Pitch around camera's X-axis
    camera.rotateZ(currentRollRate * delta); // Roll around camera's Z-axis

    // --- Check planet collision ---
    if (planetAsset) {
      const distanceToPlanet = camera.position.distanceTo(planetPosition);
      const planetRadius = planetAsset.radius;
      const collisionBuffer = 50; // Small buffer
      if (distanceToPlanet < planetRadius + collisionBuffer) {
        console.log("COLLISION: Hit planet surface!");
        // TODO: Add explosion effect?
        setGameState("title"); // Return to title screen on collision
        return; // Stop further updates this frame
      }
    }

    // --- Update HUD via GameManager Setters ---
    const { x, y, z } = camera.position;
    gameManager.reactSetters.setCoordinates([x, y, z]);

    const normalizedSpeed = THREE.MathUtils.clamp(
      (currentVelocity / Constants.MAX_SPEED) * 100,
      0,
      100
    );
    // Normalize roll/pitch based on *rate*, not absolute rotation
    const normalizedRoll = THREE.MathUtils.clamp(
      currentRollRate / Constants.MAX_VISUAL_ROLL_RATE,
      -1,
      1
    );
    const normalizedPitch = THREE.MathUtils.clamp(
      currentPitchRate / Constants.MAX_VISUAL_PITCH_RATE,
      -1,
      1
    );
    const normalizedLaserHeat = THREE.MathUtils.clamp(
      (nextLaserHeat / Constants.LASER_MAX_HEAT) * 100,
      0,
      100
    ); // Use nextLaserHeat

    gameManager.reactSetters.setSpeed(normalizedSpeed);
    gameManager.reactSetters.setRoll(normalizedRoll);
    gameManager.reactSetters.setPitch(normalizedPitch);
    gameManager.reactSetters.setLaserHeat(normalizedLaserHeat);

    // --- Calculate altitude (distance to planet surface) ---
    let normalizedAltitude = 0;
    if (planetAsset) {
      const distanceToPlanetCenter = camera.position.distanceTo(planetPosition);
      const altitudeRaw = distanceToPlanetCenter - planetAsset.radius;
      const MAX_ALTITUDE_DISPLAY = 50000; // Max distance shown on gauge
      normalizedAltitude = THREE.MathUtils.clamp(
        (altitudeRaw / MAX_ALTITUDE_DISPLAY) * 100,
        0,
        100
      );
    }
    gameManager.reactSetters.setAltitude(normalizedAltitude);

    // --- Station Proximity Check & Direction ---
    if (stationAsset) {
      const distanceToStation = camera.position.distanceTo(stationPosition);
      if (distanceToStation < Constants.STATION_DOCKING_RADIUS) {
        console.log("Reached space station!");
        // TODO: Play docking sequence/sound?
        setGameState("title"); // Return to title for now
        gameManager.reactSetters.setStationDirection(null);
      } else {
        // Calculate relative direction for HUD indicator
        const worldDirToStation = tempVector
          .subVectors(stationPosition, camera.position)
          .normalize();
        const cameraInverse = tempQuaternion.copy(camera.quaternion).invert();
        const relativeDir = tempVector2
          .copy(worldDirToStation)
          .applyQuaternion(cameraInverse);
        const isStationInFrontOfCamera = relativeDir.z < 0;

        // Calculate angle off center
        // Use the actual direction vector, not just the forward vector
        const angleBetween = new THREE.Vector3(0, 0, -1).angleTo(relativeDir); // Angle from camera forward
        const halfFOV = THREE.MathUtils.degToRad(camera.fov) / 2;
        const offCenterAmount = THREE.MathUtils.clamp(
          angleBetween / halfFOV,
          0,
          1
        );

        const stationDirectionData = {
          x: relativeDir.x,
          y: relativeDir.y,
          offCenterAmount: offCenterAmount,
          isInFront: isStationInFrontOfCamera,
        };
        gameManager.reactSetters.setStationDirection(stationDirectionData);
      }
    } else {
      gameManager.reactSetters.setStationDirection(null);
    }

    // --- Pirate AI ---
    const playerPos = camera.position;
    const updatedPirateStates = pirateStates.map((pirate) => {
      if (!pirate.visible) return pirate; // Skip inactive

      let { health, position, quaternion, ...rest } = pirate; // Destructure

      // Apply damage from laser hit this frame
      if (hitTargetId === pirate.id) {
        health -= 1; // Decrease health
        console.log(`Pirate ${pirate.id} health: ${health}`);
        if (health <= 0) {
          console.log(`Pirate ${pirate.id} destroyed!`);
          // TODO: Add explosion effect at pirate.position
          return { ...pirate, visible: false, health: 0 }; // Mark as destroyed
        }
      }

      const distanceToPlayer = playerPos.distanceTo(position);
      let newPosition = position.clone();
      let newQuaternion = quaternion.clone();

      if (distanceToPlayer < Constants.PIRATE_ATTACK_RANGE) {
        // Attack Behavior
        // 1. Turn towards player
        const directionToPlayer = tempVector
          .subVectors(playerPos, newPosition)
          .normalize();
        // Calculate target quaternion assuming model's forward is +Z
        const targetQuaternion = tempQuaternion.setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          directionToPlayer
        );
        // Slerp towards target rotation
        newQuaternion.rotateTowards(
          targetQuaternion,
          Constants.PIRATE_TURN_RATE * delta
        );

        // 2. Move towards player (based on new orientation)
        const forward = tempVector2.set(0, 0, 1).applyQuaternion(newQuaternion);
        newPosition.addScaledVector(forward, Constants.PIRATE_SPEED * delta);
      } else {
        // Idle/Patrol Behavior (Optional - e.g., slow drift)
        const randomDrift = tempVector
          .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
          .normalize();
        newPosition.addScaledVector(
          randomDrift,
          Constants.PIRATE_SPEED * 0.1 * delta
        ); // Slow drift
        // Optional slow random rotation
        const randomRotation = new THREE.Euler(
          0,
          (Math.random() - 0.5) * 0.1 * delta,
          0
        );
        newQuaternion.multiply(tempQuaternion.setFromEuler(randomRotation));
      }

      return {
        ...rest,
        health,
        position: newPosition,
        quaternion: newQuaternion,
        visible: true,
      }; // Return updated state
    });
    setPirateStates(updatedPirateStates); // Update state triggering re-render of pirates

    // --- Update pirate positions for radar ---
    const currentRadarPositions: RadarPosition[] = updatedPirateStates
      .filter((pirate) => pirate.visible) // Only show visible pirates
      .map((pirate) => {
        const piratePos = pirate.position;
        const distance = playerPos.distanceTo(piratePos);

        if (distance > RADAR_DISTANCE) return null; // Outside radar range

        const worldDir = tempVector
          .subVectors(piratePos, playerPos)
          .normalize();
        const cameraInverse = tempQuaternion.copy(camera.quaternion).invert();
        const relativeDir = tempVector2
          .copy(worldDir)
          .applyQuaternion(cameraInverse);

        // Clamp values to -1 to 1 range for HUD display
        return {
          x: THREE.MathUtils.clamp(relativeDir.x, -1, 1),
          y: THREE.MathUtils.clamp(relativeDir.y, -1, 1),
          z: THREE.MathUtils.clamp(relativeDir.z, -1, 1),
        };
      })
      .filter((p): p is RadarPosition => p !== null); // Filter out null entries

    gameManager.reactSetters.setRadarPositions(currentRadarPositions);
  }); // End useFrame

  // --- Render ---
  return (
    <>
      {/* --- R3F Scene Components --- */}

      {/* Planet */}
      {planetAsset && (
        <PlanetComponent
          radius={planetAsset.radius}
          color={planetAsset.color}
          rotationSpeed={0.005}
          position={planetPosition.toArray()} // Use state for position
          visible={true}
        />
      )}

      {/* Space Station */}
      {stationAsset && (
        <SpaceStationComponent
          modelPath={stationAsset.modelPath}
          initialScale={Constants.SHIP_SCALE * 1.5}
          wireframeColor={0xffff00}
          rotationSpeed={0.02}
          position={stationPosition.toArray()} // Use state for position
          visible={true}
        />
      )}

      {/* Pirate Ships */}
      {pirateStates.map((pirate) => (
        <ShipComponent
          key={`pirate-ship-${pirate.id}`}
          // Assign ref using the pirate's ID as the key
          ref={(el: THREE.Group | null) =>
            (pirateShipRefs.current[pirate.id] = el)
          }
          modelPath={pirate.modelPath}
          initialScale={Constants.SHIP_SCALE}
          wireframeColor={0xff0000} // Red for pirates
          position={pirate.position} // Pass Vector3 directly
          quaternion={pirate.quaternion} // Pass Quaternion directly
          visible={pirate.visible} // Use state for visibility
          userData={{ pirateId: pirate.id }} // Add ID for raycasting hit detection
        />
      ))}

      {/* Laser Beam */}
      <lineSegments
        ref={laserBeamRef}
        frustumCulled={false}
        renderOrder={999}
        visible={false}
      >
        <bufferGeometry attach="geometry">
          {/* Use 2 points for a line segment */}
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([0, 0, 0, 0, 0, -1]), // Initial dummy points array (2 points)
              3, // itemSize
            ]}
            count={2} // 2 points
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={Constants.LASER_COLOR}
          linewidth={3} // Note: linewidth > 1 might not work reliably
          transparent={true}
          opacity={1}
        />
      </lineSegments>

      {/* --- HUD Overlay (Rendered via React DOM, using props from App) --- */}
      <div className="top-bar">
        <span id="bounty-text"> BOUNTY: 5.0 Cr </span> {/* Placeholder */}
        <span id="view-text" style={{ marginLeft: "20px" }}>
          {" "}
          Front View{" "}
        </span>
      </div>

      <div className="center-text" style={{ visibility: "hidden" }}></div>

      <BottomHud
        // Pass props received from App component
        speed={speed}
        roll={roll}
        pitch={pitch}
        laserHeat={laserHeat}
        altitude={altitude}
        stationDirection={stationDirection}
        radarPosition={radarPosition}
      />
    </>
  );
};

export default SpaceFlightScreen;
