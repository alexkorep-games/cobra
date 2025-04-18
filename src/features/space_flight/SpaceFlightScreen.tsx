import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import BottomHud from "../../components/hud/BottomHud";
import { RadarPosition, IGameManager } from "../../types"; // Assuming IGameManager is needed for setters/state switching
import * as Constants from "../../constants";

// Import R3F Entity Components (now rendered here)
import PlanetComponent from "../../components/r3f/PlanetComponent";
import SpaceStationComponent from "../../components/r3f/SpaceStationComponent";
import ShipComponent from "../../components/r3f/ShipComponent";

// Define radar range constant
const RADAR_DISTANCE = 10000;

// Define a type for pirate state managed within this component
interface PirateState {
  id: number;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  visible: boolean;
  modelPath: string; // Assuming model path comes from GameManager assets config
  // Add other pirate-specific state if needed (e.g., health)
}

interface SpaceFlightScreenProps {
  // Props passed down for HUD display (might be redundant if logic here updates GM state)
  speed: number;
  roll: number;
  pitch: number;
  laserHeat?: number;
  altitude?: number;
  stationDirection: {
    x: number;
    y: number;
    offCenterAmount: number;
    isInFront: boolean;
  } | null;
  radarPosition?: RadarPosition[];

  // Pass GameManager instance or necessary setters/state switch function
  gameManager: IGameManager;
}

const SpaceFlightScreen: React.FC<SpaceFlightScreenProps> = ({
  // Destructure props, including gameManager
  gameManager,
}) => {
  const { camera } = useThree(); // Removed unused scene

  // --- Refs ---
  const laserBeamRef = useRef<THREE.LineSegments>(null);
  const keysPressed = useRef<Set<string>>(new Set());
  const pirateShipRefs = useRef<(THREE.Group | null)[]>([]); // Refs for pirate meshes

  // --- State ---
  const [velocity, setVelocity] = useState(0);
  const [rollRate, setRollRate] = useState(0);
  const [pitchRate, setPitchRate] = useState(0);
  const [isHyperspaceActive, setIsHyperspaceActive] = useState(false);
  const [currentLaserHeat, setCurrentLaserHeat] = useState(0);
  const [laserCooldownTimer, setLaserCooldownTimer] = useState(0);
  const [wantsToFire, setWantsToFire] = useState(false);
  const [laserBeamHideTimer, setLaserBeamHideTimer] = useState(0);

  // --- Object Positions/Rotations (Managed by R3F components or state here) ---
  // Planet position/visibility can be managed by PlanetComponent based on props/context
  // Station position/visibility can be managed by SpaceStationComponent
  // Pirate positions/rotations need state management here
  const [pirateStates, setPirateStates] = useState<PirateState[]>([]);

  // --- Temporary Objects for Calculations ---
  const tempQuaternion = useRef(new THREE.Quaternion()).current;
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const raycaster = useRef(new THREE.Raycaster()).current;

  // --- Asset Configuration (from GameManager) ---
  // Assuming GameManager provides asset configurations needed here
  const planetAsset = gameManager.assets.planet;
  const stationAsset = gameManager.assets.spaceStation;
  const pirateAssetConfigs = gameManager.assets.pirateShips; // Array of { modelPath: string }

  // --- Initialization (Equivalent to SpaceFlightSceneLogic.enter) ---
  useEffect(() => {
    console.log("[SpaceFlightScreen.useEffect.enter] Mounting SpaceFlightScreen");

    // Reset player state
    setVelocity(0);
    setRollRate(0);
    setPitchRate(0);
    keysPressed.current.clear();
    camera.rotation.set(0, 0, 0);
    camera.position.set(0, 0, 0);
    setIsHyperspaceActive(false);
    setCurrentLaserHeat(0);
    setLaserCooldownTimer(0);
    setWantsToFire(false);
    setLaserBeamHideTimer(0);

    // Initialize Pirate States
    const initialPirates = pirateAssetConfigs.map((config, index) => {
        const pirate = {
            id: index,
            position: new THREE.Vector3(),
            quaternion: new THREE.Quaternion(),
            visible: true, // Start visible
            modelPath: config.modelPath,
        };
        // Position Pirates randomly around the player's starting position
        positionObjectRandomly(
            pirate.position,
            pirate.quaternion,
            Constants.PIRATE_BASE_DISTANCE,
            Constants.PIRATE_POSITION_OFFSET_RANGE,
            camera.position // Relative to camera start
        );
        console.log(`[SpaceFlightScreen.useEffect.enter] Pirate ${index} positioned. Visible: ${pirate.visible}`);
        return pirate;
    });
    setPirateStates(initialPirates);
    pirateShipRefs.current = initialPirates.map(() => null); // Initialize refs array

    // Setup laser beam geometry (will be added/removed dynamically or visibility toggled)
    // Geometry setup can happen here or within the return statement's JSX

    // --- Input Handlers ---
    const handleKeyDown = (event: KeyboardEvent) => {
      let keyIdentifier = event.code;
      if (event.key === "/") keyIdentifier = "Slash";
      if (event.key === ".") keyIdentifier = "Period";
      if (event.key === ",") keyIdentifier = "Comma";
      if (event.key === " ") keyIdentifier = "Space";

      // Handle J key specifically for hyperspace toggle
      if (keyIdentifier === "KeyJ") {
        setIsHyperspaceActive(prev => {
            const next = !prev;
            console.log(`Hyperspace Toggled: ${next}`);
            if (!next) {
                // Clamp speed immediately when turning off
                setVelocity(v => Math.min(v, Constants.MAX_SPEED));
            }
            return next;
        });
        return;
      }
      keysPressed.current.add(keyIdentifier);
      if (keyIdentifier === "Space") setWantsToFire(true); // Update state for firing
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      let keyIdentifier = event.code;
      if (event.key === "/") keyIdentifier = "Slash";
      if (event.key === ".") keyIdentifier = "Period";
      if (event.key === ",") keyIdentifier = "Comma";
      if (event.key === " ") keyIdentifier = "Space";

      keysPressed.current.delete(keyIdentifier);
      if (keyIdentifier === "Space") setWantsToFire(false); // Update state for firing
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    console.log("[SpaceFlightScreen.useEffect.enter] Key listeners added");

    // --- Cleanup (Equivalent to SpaceFlightSceneLogic.exit) ---
    return () => {
      console.log("[SpaceFlightScreen.useEffect.exit] Unmounting SpaceFlightScreen");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      keysPressed.current.clear();
      setIsHyperspaceActive(false);
      setWantsToFire(false);

      // Reset HUD via GameManager setters
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
  }, [camera, gameManager]); // Dependencies: camera, gameManager

  // --- Positioning Logic Helper ---
  const positionObjectRandomly = useCallback(
    (
      position: THREE.Vector3, // Target position to modify
      quaternion: THREE.Quaternion, // Target quaternion to modify
      baseDistance: number,
      offsetRange: THREE.Vector2 = new THREE.Vector2(0.8, 1.2),
      relativeTo: THREE.Vector3 = camera.position // Use camera position directly
    ) => {
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

      position.set(x, y, z);
      quaternion.setFromEuler(
        new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        )
      );
    },
    [camera.position] // Depends on camera position if used as default relativeTo
  );


  // --- Game Loop Logic (Equivalent to SpaceFlightSceneLogic.update) ---
  useFrame((_, delta) => { // Changed state to _
    // --- Update Timers ---
    setLaserCooldownTimer(prev => Math.max(0, prev - delta));
    setLaserBeamHideTimer(prev => Math.max(0, prev - delta));

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
    // wantsToFire state is updated directly by key handlers

    // --- Laser Cooling ---
    if (!wantsToFire && currentLaserHeat > 0) {
      setCurrentLaserHeat(prev =>
        Math.max(0, prev - Constants.LASER_HEAT_DECREASE_RATE * delta)
      );
    }

    // --- Laser Firing ---
    const laserBeam = laserBeamRef.current;
    if (
      wantsToFire &&
      laserCooldownTimer <= 0 &&
      currentLaserHeat < Constants.LASER_MAX_HEAT &&
      laserBeam // Ensure laserBeamRef is populated
    ) {
      setLaserCooldownTimer(Constants.LASER_COOLDOWN);
      setCurrentLaserHeat(prev =>
        Math.min(Constants.LASER_MAX_HEAT, prev + Constants.LASER_HEAT_INCREASE)
      );

      // Raycasting
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const pirateMeshes = pirateShipRefs.current.filter(ref => ref && ref.visible) as THREE.Object3D[];

      const intersects = raycaster.intersectObjects(pirateMeshes, true);
      let hitDistance = Constants.LASER_RANGE;
      let hitTarget: PirateState | null = null; // Track which pirate state was hit

      if (intersects.length > 0) {
        const closestHit = intersects[0];
        if (closestHit.distance <= Constants.LASER_RANGE) {
          hitDistance = closestHit.distance;

          // Find which pirate Ship corresponds to the hit mesh
          let hitMesh = closestHit.object;
          while (hitMesh.parent && !(hitMesh.userData?.pirateId >= 0)) { // Check for pirateId in userData
            hitMesh = hitMesh.parent;
          }
          const hitPirateId = hitMesh.userData?.pirateId;
          if (hitPirateId >= 0) {
             hitTarget = pirateStates.find(p => p.id === hitPirateId) || null;
             if (hitTarget) {
                console.log(`Hit Pirate ID: ${hitTarget.id}! Distance: ${hitDistance.toFixed(0)}`);
                // TODO: Apply damage to hitTarget state (e.g., reduce health)
                // setPirateStates(currentPirates => currentPirates.map(p => p.id === hitPirateId ? {...p, health: p.health - 1} : p));
             }
          }
        }
      }

      // Visualize Laser Beam
      const startPoint = camera.position.clone();
      const direction = tempVector.set(0, 0, -1).applyQuaternion(camera.quaternion);
      startPoint.addScaledVector(direction, 10.0); // Offset
      const endPoint = tempVector2.copy(startPoint).addScaledVector(direction, hitDistance);

      // Offset for thickness
      const offset = new THREE.Vector3(0.1, 0.1, 0).applyQuaternion(camera.quaternion);
      const startPoint2 = startPoint.clone().add(offset);
      const endPoint2 = endPoint.clone().add(offset);

      const positions = laserBeam.geometry.attributes.position as THREE.BufferAttribute;
      positions.setXYZ(0, startPoint.x, startPoint.y, startPoint.z);
      positions.setXYZ(1, endPoint.x, endPoint.y, endPoint.z);
      positions.setXYZ(2, startPoint2.x, startPoint2.y, startPoint2.z);
      positions.setXYZ(3, endPoint2.x, endPoint2.y, endPoint2.z);
      positions.needsUpdate = true;
      laserBeam.geometry.computeBoundingSphere();

      laserBeam.visible = true;
      setLaserBeamHideTimer(Constants.LASER_DURATION);
    } else if (laserBeam && laserBeamHideTimer <= 0 && laserBeam.visible) {
      laserBeam.visible = false;
    }

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
      : THREE.MathUtils.clamp(currentVelocity, Constants.MIN_SPEED, Constants.MAX_SPEED);
    setVelocity(currentVelocity); // Update state

    // Update Roll Rate
    let currentRollRate = rollRate;
    if (rollLeft) currentRollRate += Constants.ROLL_ACCELERATION * delta;
    else if (rollRight) currentRollRate -= Constants.ROLL_ACCELERATION * delta;
    else {
      currentRollRate *= 1 - Constants.ANGULAR_DAMPING * delta;
      if (Math.abs(currentRollRate) < 0.01) currentRollRate = 0;
    }
    setRollRate(currentRollRate); // Update state

    // Update Pitch Rate
    let currentPitchRate = pitchRate;
    if (pitchDown) currentPitchRate -= Constants.PITCH_ACCELERATION * delta;
    else if (pitchUp) currentPitchRate += Constants.PITCH_ACCELERATION * delta;
    else {
      currentPitchRate *= 1 - Constants.ANGULAR_DAMPING * delta;
      if (Math.abs(currentPitchRate) < 0.01) currentPitchRate = 0;
    }
    setPitchRate(currentPitchRate); // Update state

    // Apply Movement and Rotation to Camera
    const moveDirection = tempVector.set(0, 0, -1).applyQuaternion(camera.quaternion);
    camera.position.addScaledVector(moveDirection, currentVelocity * delta);
    camera.rotateX(currentPitchRate * delta);
    camera.rotateZ(currentRollRate * delta);

    // --- Check planet collision ---
    // PlanetComponent needs to expose its position or be queryable
    // For now, assume planet position is fixed or managed elsewhere
    // if (planetAsset && planetAsset.visible) { // Need a way to get planet position
    //   const planetPos = new THREE.Vector3(0, 0, -camera.far * 0.8); // Placeholder
    //   const distanceToPlanet = camera.position.distanceTo(planetPos);
    //   const planetRadius = camera.far * 0.05; // Estimate
    //   const collisionBuffer = 50;
    //   if (distanceToPlanet < planetRadius + collisionBuffer) {
    //     console.log("COLLISION: Hit planet surface!");
    //     gameManager.switchState("title");
    //     return;
    //   }
    // }

    // --- Update HUD ---
    const { x, y, z } = camera.position;
    gameManager.reactSetters.setCoordinates([x, y, z]);

    const normalizedSpeed = THREE.MathUtils.clamp((currentVelocity / Constants.MAX_SPEED) * 100, 0, 100);
    const normalizedRoll = THREE.MathUtils.clamp(currentRollRate / Constants.MAX_VISUAL_ROLL_RATE, -1, 1);
    const normalizedPitch = THREE.MathUtils.clamp(currentPitchRate / Constants.MAX_VISUAL_PITCH_RATE, -1, 1);
    const normalizedLaserHeat = THREE.MathUtils.clamp((currentLaserHeat / Constants.LASER_MAX_HEAT) * 100, 0, 100);

    gameManager.reactSetters.setSpeed(normalizedSpeed);
    gameManager.reactSetters.setRoll(normalizedRoll);
    gameManager.reactSetters.setPitch(normalizedPitch);
    gameManager.reactSetters.setLaserHeat(normalizedLaserHeat);

    // --- Calculate altitude (distance to planet) ---
    // Needs planet position similar to collision check
    // if (planetAsset && planetAsset.visible) {
    //   const planetPos = new THREE.Vector3(0, 0, -camera.far * 0.8); // Placeholder
    //   const distanceToPlanet = camera.position.distanceTo(planetPos);
    //   const MAX_ALTITUDE = 10000000;
    //   const normalizedAltitude = THREE.MathUtils.clamp((distanceToPlanet / MAX_ALTITUDE) * 100, 0, 100);
    //   gameManager.reactSetters.setAltitude(normalizedAltitude);
    // } else {
    //   gameManager.reactSetters.setAltitude(0);
    // }

    // --- Station Proximity Check & Direction ---
    // Needs station position, managed by SpaceStationComponent
    // if (stationAsset && stationAsset.visible) { // Need station position
    //   const stationPos = new THREE.Vector3(1000, 1000, -5000); // Placeholder
    //   const distanceToStation = camera.position.distanceTo(stationPos);
    //   if (distanceToStation < Constants.STATION_DOCKING_RADIUS) {
    //     console.log("Reached space station!");
    //     gameManager.switchState("title");
    //     gameManager.reactSetters.setStationDirection(null);
    //   } else {
    //     const worldDir = tempVector.subVectors(stationPos, camera.position).normalize();
    //     const cameraInverse = tempQuaternion.copy(camera.quaternion).invert();
    //     const relativeDir = tempVector2.copy(worldDir).applyQuaternion(cameraInverse);
    //     const isStationInFrontOfCamera = relativeDir.z < 0;
    //     const vector = isStationInFrontOfCamera ? new THREE.Vector3(0, 0, -1) : new THREE.Vector3(0, 0, 1);
    //     const cameraLine = vector.applyQuaternion(camera.quaternion);
    //     const angleBetween = cameraLine.angleTo(worldDir);
    //     const halfFOV = THREE.MathUtils.degToRad(camera.fov) / 2;
    //     const offCenterAmount = THREE.MathUtils.clamp(angleBetween / halfFOV, 0, 1);
    //     const stationDirectionData = { x: relativeDir.x, y: relativeDir.y, offCenterAmount: offCenterAmount, isInFront: isStationInFrontOfCamera };
    //     gameManager.reactSetters.setStationDirection(stationDirectionData);
    //   }
    // } else {
    //   gameManager.reactSetters.setStationDirection(null);
    // }

    // --- Pirate AI ---
    const playerPos = camera.position;
    const updatedPirateStates = pirateStates.map(pirate => {
        if (!pirate.visible) return pirate; // Skip inactive

        const piratePos = pirate.position; // Current position from state
        const distanceToPlayer = playerPos.distanceTo(piratePos);
        let newPosition = pirate.position.clone();
        let newQuaternion = pirate.quaternion.clone();

        if (distanceToPlayer < Constants.PIRATE_ATTACK_RANGE) {
            // Attack Behavior
            // 1. Turn towards player
            const directionToPlayer = tempVector.subVectors(playerPos, piratePos).normalize();
            const targetQuaternion = tempQuaternion.setFromUnitVectors(
                new THREE.Vector3(0, 0, 1), // Assuming pirate model faces +Z
                directionToPlayer
            );
            newQuaternion.rotateTowards(targetQuaternion, Constants.PIRATE_TURN_RATE * delta);

            // 2. Move towards player (based on new orientation)
            const forward = tempVector2.set(0, 0, 1).applyQuaternion(newQuaternion);
            newPosition.addScaledVector(forward, Constants.PIRATE_SPEED * delta);

        } else {
            // Idle/Patrol Behavior (Optional)
        }

        return { ...pirate, position: newPosition, quaternion: newQuaternion };
    });
    setPirateStates(updatedPirateStates); // Update state triggering re-render of pirates

    // --- Update pirate positions for radar ---
    const currentRadarPositions: RadarPosition[] = updatedPirateStates
      .filter(pirate => pirate.visible)
      .map(pirate => {
        const piratePos = pirate.position;
        const distance = playerPos.distanceTo(piratePos);

        if (distance > RADAR_DISTANCE) return null;

        const worldDir = tempVector.subVectors(piratePos, playerPos).normalize();
        const cameraInverse = tempQuaternion.copy(camera.quaternion).invert();
        const relativeDir = tempVector2.copy(worldDir).applyQuaternion(cameraInverse);

        return {
          x: THREE.MathUtils.clamp(relativeDir.x, -1, 1),
          y: THREE.MathUtils.clamp(relativeDir.y, -1, 1),
          z: THREE.MathUtils.clamp(relativeDir.z, -1, 1),
        };
      })
      .filter((p): p is RadarPosition => p !== null);

    gameManager.reactSetters.setRadarPositions(currentRadarPositions);

  }); // End useFrame

  // --- Calculate derived state for HUD ---
  const hudSpeed = (velocity / Constants.MAX_SPEED) * 100;
  const hudRoll = rollRate / Constants.MAX_VISUAL_ROLL_RATE;
  const hudPitch = pitchRate / Constants.MAX_VISUAL_PITCH_RATE;
  const hudLaserHeat = (currentLaserHeat / Constants.LASER_MAX_HEAT) * 100;
  // Altitude and Station Direction need positions from components/context
  const hudAltitude = 0; // Placeholder
  const hudStationDirection = null; // Placeholder
  const hudRadarPosition = gameManager.reactSetters.setRadarPositions ? [] : []; // Placeholder, updated in useFrame

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
          // Position needs to be determined, e.g., far away initially
          // This might require passing position state or using refs
          position={[0, 0, -camera.far * 0.8]} // Example initial position
          visible={true} // Always visible in this screen
        />
      )}

      {/* Space Station */}
      {stationAsset && (
        <SpaceStationComponent
          modelPath={stationAsset.modelPath}
          initialScale={Constants.SHIP_SCALE * 1.5}
          wireframeColor={0xffff00}
          rotationSpeed={0.02}
          // Position needs to be determined, relative to planet or player start
          // Example: position={[1000, 1000, -5000]}
          visible={true} // Always visible in this screen
        />
      )}

      {/* Pirate Ships */}
      {pirateStates.map((pirate, index) => (
        <ShipComponent
          key={`pirate-ship-${pirate.id}`}
          ref={(el: THREE.Group | null) => pirateShipRefs.current[index] = el} // Assign ref with type
          modelPath={pirate.modelPath}
          initialScale={Constants.SHIP_SCALE}
          wireframeColor={0xff0000}
          position={pirate.position.toArray()} // Convert Vector3 to array
          quaternion={pirate.quaternion} // Use state for rotation
          visible={pirate.visible} // Use state for visibility
          userData={{ pirateId: pirate.id }} // Add ID for raycasting hit detection
        />
      ))}

      {/* Laser Beam */}
      <lineSegments ref={laserBeamRef} frustumCulled={false} renderOrder={999} visible={false}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array([0,0,0, 0,0,-1, 0.1,0.1,0, 0.1,0.1,-1]), // Initial dummy points array
              3 // itemSize
            ]}
            count={4} // 2 points for line 1, 2 points for line 2
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={Constants.LASER_COLOR}
          linewidth={5} // Note: linewidth might not work on all systems
          transparent={true}
          opacity={1}
        />
      </lineSegments>


      {/* --- HUD Overlay (Rendered via React DOM, not R3F) --- */}
      {/* Top bar */}
      <div className="top-bar">
        <span id="bounty-text"> BOUNTY: 5.0 Cr </span> {/* Placeholder */}
        <span id="view-text" style={{ marginLeft: "20px" }}> Front View </span>
      </div>

      {/* Center text area */}
      <div className="center-text" style={{ visibility: "hidden" }}></div>

      {/* Bottom HUD */}
      <BottomHud
        // Pass internal state or props derived from internal state
        speed={hudSpeed}
        roll={hudRoll}
        pitch={hudPitch}
        laserHeat={hudLaserHeat}
        altitude={hudAltitude} // Use derived placeholder
        stationDirection={hudStationDirection} // Use derived placeholder
        radarPosition={hudRadarPosition} // Use derived placeholder (updated via setter in useFrame)
      />
    </>
  );
};

export default SpaceFlightScreen;