import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGameState } from "@/features/common/useGameState";
import { useHudState } from "@/features/common/useHudState"; // Import HUD state hook
import { GameAssets, RadarPosition } from "@/types"; // Use GameAssets
import * as Constants from "@/constants";

// Import R3F Entity Components (now rendered here)
import PlanetComponent from "@/components/r3f/PlanetComponent";
import SpaceStationComponent from "@/components/r3f/SpaceStationComponent";
import ShipComponent from "@/components/r3f/ShipComponent"; // For pirates
import { useAssets } from "@/hooks/useAssets";

// Define radar range constant
const RADAR_DISTANCE = 10000;

// Define a type for pirate state managed within this component
interface PirateState {
  id: number;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  visible: boolean;
  modelPath: string; // Get model path from assets prop
  // Add other pirate-specific state if needed (e.g., health, target)
  velocity?: THREE.Vector3; // Example: for movement
}

interface SpaceFlightScreenProps {
  assets: GameAssets; // Receive asset configurations
  // Remove HUD props like speed, roll etc. - use useHudState instead
}

const SpaceFlightScreen: React.FC = () => {
  const { assets } = useAssets();

  const { camera } = useThree();
  const { setGameState } = useGameState();
  // Get HUD setters from the hook
  const {
    setCoordinates,
    setSpeed,
    setRoll,
    setPitch,
    setAltitude,
    setLaserHeat,
    setStationDirection,
    setRadarPositions,
  } = useHudState();

  // --- Refs ---
  const laserBeamRef = useRef<THREE.LineSegments>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const pirateShipRefs = useRef<(THREE.Group | null)[]>([]); // Refs for pirate meshes

  // --- State ---
  // Player ship physics state
  const velocity = useRef(new THREE.Vector3()); // Use ref for velocity vector
  const rollRate = useRef(0);
  const pitchRate = useRef(0);

  // Pirate states
  const [pirateStates, setPirateStates] = useState<PirateState[]>([]);

  // Laser state
  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  const wantsToFire = useRef(false);
  const laserBeamHideTimer = useRef(0);
  const laserBeamPoints = useRef([
    new THREE.Vector3(),
    new THREE.Vector3(0, 0, -Constants.LASER_LENGTH),
  ]).current;
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null);

  // Hyperspace state (example)
  const [isHyperspaceActive, setIsHyperspaceActive] = useState(false);

  // --- Temporary Vectors for Calculations ---
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const forwardVector = useRef(new THREE.Vector3(0, 0, -1)).current;
  const upVector = useRef(new THREE.Vector3(0, 1, 0)).current;
  const rightVector = useRef(new THREE.Vector3(1, 0, 0)).current;
  const raycaster = useRef(new THREE.Raycaster()).current;

  // --- Asset Configuration (from props) ---
  const planetAsset = assets.planet;
  const stationAsset = assets.spaceStation;
  const pirateAssetConfigs = assets.pirateShips;

  // --- Initialization ---
  useEffect(() => {
    console.log(
      "[SpaceFlightScreen.useEffect.enter] Mounting SpaceFlightScreen"
    );

    // Reset player state
    velocity.current.set(0, 0, 0);
    rollRate.current = 0;
    pitchRate.current = 0;
    keysPressed.current.clear();
    camera.position.set(0, 0, 0); // Reset camera position
    camera.rotation.set(0, 0, 0); // Reset camera rotation
    camera.quaternion.identity(); // Reset camera quaternion

    setIsHyperspaceActive(false);
    currentLaserHeat.current = 0;
    laserCooldownTimer.current = 0;
    wantsToFire.current = false;
    laserBeamHideTimer.current = 0;

    // Reset HUD
    setCoordinates({ x: 0, y: 0, z: 0 });
    setSpeed(0);
    setRoll(0);
    setPitch(0);
    setAltitude(0); // Implement altitude calculation if needed
    setLaserHeat(0);
    setStationDirection(null);
    setRadarPositions([]);

    // Initialize Pirate States using assets prop
    const initialPirates = pirateAssetConfigs.map((config, index) => {
      const pirate: PirateState = {
        id: index,
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
        visible: true, // Start visible
        modelPath: config.modelPath, // Use path from assets
        velocity: new THREE.Vector3(), // Initialize velocity
      };
      // Position Pirates randomly around the player's starting position
      positionObjectRandomly(
        pirate.position,
        pirate.quaternion,
        Constants.PIRATE_BASE_DISTANCE,
        Constants.PIRATE_POSITION_OFFSET_RANGE,
        camera.position // Relative to camera start (which is 0,0,0 now)
      );
      console.log(
        `[SpaceFlightScreen.useEffect.enter] Pirate ${index} positioned. Visible: ${pirate.visible}`
      );
      return pirate;
    });
    setPirateStates(initialPirates);
    pirateShipRefs.current = initialPirates.map(() => null); // Initialize refs array

    // --- Input Handlers Setup ---
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current.add(event.key.toLowerCase());
      // Handle single press actions immediately if needed
      if (event.key.toLowerCase() === "h") {
        // Example: Hyperspace toggle
        setIsHyperspaceActive((prev) => !prev);
        console.log("Hyperspace toggled:", !isHyperspaceActive);
      }
      if (event.key.toLowerCase() === "n") {
        // Navigate key
        console.log("Switching to Short Range Chart");
        setGameState("short_range_chart");
      }
      if (event.key === " ") {
        // Fire laser (hold)
        wantsToFire.current = true;
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current.delete(event.key.toLowerCase());
      if (event.key === " ") {
        // Stop firing laser
        wantsToFire.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup
    return () => {
      console.log(
        "[SpaceFlightScreen.useEffect.exit] Unmounting SpaceFlightScreen"
      );
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      // Reset HUD state? Optional, depends on desired behavior when leaving flight.
      // setSpeed(0); setRoll(0); etc.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]); // Re-run if assets change (unlikely after initial load)

  // --- Positioning Logic Helper ---
  const positionObjectRandomly = useCallback(
    (
      position: THREE.Vector3, // Target position to modify
      quaternion: THREE.Quaternion, // Target quaternion to modify
      baseDistance: number,
      offsetRange: THREE.Vector2 = new THREE.Vector2(0.8, 1.2),
      relativeTo: THREE.Vector3 // Use camera position directly
    ) => {
      const distance =
        baseDistance *
        THREE.MathUtils.lerp(offsetRange.x, offsetRange.y, Math.random());
      // Random direction (spherical coordinates)
      const phi = Math.random() * Math.PI * 2; // Azimuthal angle
      const theta = Math.acos(Math.random() * 2 - 1); // Polar angle (uniform distribution)

      position.set(
        distance * Math.sin(theta) * Math.cos(phi),
        distance * Math.sin(theta) * Math.sin(phi),
        distance * Math.cos(theta)
      );
      // Add relative offset
      position.add(relativeTo);

      // Random orientation
      quaternion.random(); // Set to a random rotation
    },
    [] // No dependencies needed
  );

  // --- Game Loop Logic (useFrame) ---
  useFrame((state, delta) => {
    const { camera } = state;
    delta = Math.min(delta, 0.05); // Clamp delta time to prevent large jumps

    // --- Input Processing & Physics ---
    let currentRollRate = 0;
    let currentPitchRate = 0;
    let thrust = 0;

    // Rotation
    if (keysPressed.current.has("arrowleft") || keysPressed.current.has("a")) {
      currentRollRate = Constants.ROLL_SPEED;
    } else if (
      keysPressed.current.has("arrowright") ||
      keysPressed.current.has("d")
    ) {
      currentRollRate = -Constants.ROLL_SPEED;
    }
    if (keysPressed.current.has("arrowup") || keysPressed.current.has("w")) {
      currentPitchRate = Constants.PITCH_SPEED;
    } else if (
      keysPressed.current.has("arrowdown") ||
      keysPressed.current.has("s")
    ) {
      currentPitchRate = -Constants.PITCH_SPEED;
    }

    // Thrust
    if (keysPressed.current.has("shift") || keysPressed.current.has("z")) {
      // Assuming 'z' or Shift for thrust
      thrust = Constants.THRUST_POWER;
    }

    // Apply damping to rotation rates
    rollRate.current = THREE.MathUtils.lerp(
      rollRate.current,
      currentRollRate,
      delta * Constants.ROTATION_DAMPING
    );
    pitchRate.current = THREE.MathUtils.lerp(
      pitchRate.current,
      currentPitchRate,
      delta * Constants.ROTATION_DAMPING
    );

    // Apply rotation to camera quaternion
    tempQuaternion.setFromAxisAngle(forwardVector, rollRate.current * delta);
    camera.quaternion.multiplyQuaternions(tempQuaternion, camera.quaternion);
    tempQuaternion.setFromAxisAngle(rightVector, pitchRate.current * delta);
    camera.quaternion.multiplyQuaternions(tempQuaternion, camera.quaternion);
    camera.quaternion.normalize(); // Normalize after multiplication

    // Apply thrust
    forwardVector.set(0, 0, -1).applyQuaternion(camera.quaternion); // Get current forward direction
    tempVector.copy(forwardVector).multiplyScalar(thrust * delta);
    velocity.current.add(tempVector);

    // Apply drag/friction
    velocity.current.multiplyScalar(1 - Constants.DRAG_COEFFICIENT * delta);

    // Update camera position
    camera.position.addScaledVector(velocity.current, delta);

    // --- Laser Logic ---
    laserCooldownTimer.current = Math.max(
      0,
      laserCooldownTimer.current - delta
    );
    laserBeamHideTimer.current = Math.max(
      0,
      laserBeamHideTimer.current - delta
    );

    let fireLaser = false;
    if (
      wantsToFire.current &&
      currentLaserHeat.current < Constants.MAX_LASER_HEAT &&
      laserCooldownTimer.current <= 0
    ) {
      fireLaser = true;
      currentLaserHeat.current += Constants.LASER_HEAT_INCREASE * delta;
      laserCooldownTimer.current = Constants.LASER_COOLDOWN; // Reset cooldown
      laserBeamHideTimer.current = Constants.LASER_BEAM_DURATION; // Show beam
    } else {
      // Cool down laser
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - Constants.LASER_COOL_RATE * delta
      );
    }

    // Update laser beam visibility and position/orientation
    if (laserBeamRef.current) {
      laserBeamRef.current.visible = laserBeamHideTimer.current > 0;
      if (laserBeamRef.current.visible) {
        // Position beam slightly in front of camera and align with camera forward
        laserBeamRef.current.position
          .copy(camera.position)
          .addScaledVector(forwardVector, 2); // Adjust offset as needed
        laserBeamRef.current.quaternion.copy(camera.quaternion);
      }
    }

    // --- Pirate Logic (Example: Simple movement) ---
    const updatedPirateStates = pirateStates.map((pirate) => {
      // Simple AI: Move towards player slowly
      tempVector.copy(camera.position).sub(pirate.position).normalize();
      pirate.velocity?.lerp(
        tempVector.multiplyScalar(Constants.PIRATE_MAX_SPEED),
        delta * 0.5
      ); // Smoothly change velocity towards player
      if (pirate.velocity) {
        pirate.position.addScaledVector(pirate.velocity, delta);
      }
      // Make pirates look towards player (optional)
      tempVector2.copy(pirate.position).add(tempVector); // Look target
      tempQuaternion.setFromRotationMatrix(
        new THREE.Matrix4().lookAt(pirate.position, camera.position, upVector)
      );
      pirate.quaternion.slerp(tempQuaternion, delta * 1.0); // Smoothly rotate

      return { ...pirate }; // Return updated state
    });
    setPirateStates(updatedPirateStates); // Update state for re-render

    // --- HUD Updates ---
    const speedValue = velocity.current.length();
    const rollValue = camera.rotation.z; // Get roll from Euler angles (might need adjustment based on order)
    const pitchValue = camera.rotation.x; // Get pitch from Euler angles

    setSpeed(speedValue);
    setRoll(rollValue * (180 / Math.PI)); // Convert to degrees for HUD
    setPitch(pitchValue * (180 / Math.PI)); // Convert to degrees for HUD
    setLaserHeat(currentLaserHeat.current / Constants.MAX_LASER_HEAT); // Normalize heat 0-1
    setCoordinates({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    });
    // setAltitude(...) // Calculate altitude based on nearest planet/station if needed

    // --- Radar Calculation ---
    const radarPositionsData: RadarPosition[] = [];
    const cameraMatrix = camera.matrixWorldInverse; // Matrix to transform world to camera space

    // Station Radar
    // TODO: Need station position. Assume fixed or get from state if dynamic.
    const stationWorldPosition = new THREE.Vector3(1000, 1000, -5000); // Example fixed position
    tempVector.copy(stationWorldPosition).applyMatrix4(cameraMatrix); // To camera space
    if (tempVector.length() < RADAR_DISTANCE) {
      const distance = tempVector.length();
      tempVector.normalize();
      radarPositionsData.push({
        x: tempVector.x,
        y: tempVector.y,
        z: tempVector.z,
      }); // z indicates front/back
      // Update station direction HUD element
      setStationDirection({
        x: tempVector.x,
        y: tempVector.y,
        offCenterAmount: Math.sqrt(tempVector.x ** 2 + tempVector.y ** 2),
        isInFront: tempVector.z < 0,
      });
    } else {
      setStationDirection(null); // Station out of range
    }

    // Pirate Radar
    pirateStates.forEach((pirate) => {
      if (pirate.visible) {
        tempVector.copy(pirate.position).applyMatrix4(cameraMatrix); // To camera space
        if (tempVector.length() < RADAR_DISTANCE) {
          tempVector.normalize();
          radarPositionsData.push({
            x: tempVector.x,
            y: tempVector.y,
            z: tempVector.z,
          });
        }
      }
    });
    setRadarPositions(radarPositionsData);
  });

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
          // Position needs to be determined, e.g., far away initially or based on system layout
          position={[0, 0, -Constants.CAMERA_FAR_PLANE * 0.8]} // Example initial position
          visible={true} // Always visible in this screen? Or based on distance?
        />
      )}

      {/* Space Station */}
      {/* TODO: Determine station position dynamically or use fixed */}
      {stationAsset && (
        <SpaceStationComponent
          modelPath={stationAsset.modelPath}
          initialScale={Constants.SHIP_SCALE * 1.5}
          wireframeColor={0xffff00}
          rotationSpeed={0.02}
          position={[1000, 1000, -5000]} // Example fixed position
          visible={true} // Or based on distance?
        />
      )}

      {/* Pirates */}
      {pirateStates.map((pirate, index) => (
        <ShipComponent
          key={pirate.id}
          ref={(el) => (pirateShipRefs.current[index] = el)} // Assign ref
          modelPath={pirate.modelPath}
          initialScale={Constants.SHIP_SCALE}
          wireframeColor={0xff0000} // Red for pirates
          visible={pirate.visible}
          position={pirate.position} // Pass state position
          quaternion={pirate.quaternion} // Pass state quaternion
        />
      ))}

      {/* Laser Beam */}
      <lineSegments ref={laserBeamRef} visible={false}>
        <bufferGeometry ref={laserGeometryRef} attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={laserBeamPoints.length}
            array={
              new Float32Array(laserBeamPoints.flatMap((p) => p.toArray()))
            }
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color={0x00ff00} linewidth={2} />
      </lineSegments>

      {/* Add other effects like stars, hyperspace tunnel etc. */}
    </>
  );
};

export default SpaceFlightScreen;
