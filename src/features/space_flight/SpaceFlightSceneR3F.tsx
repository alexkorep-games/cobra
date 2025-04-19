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
  const initialPlayerPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());

  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;
  const tempQuaternion = useRef(new THREE.Quaternion()).current;

  useEffect(() => {
    if (!assets) {
      console.error("[SpaceFlightSceneR3F] Assets not loaded!");
      return;
    }

    if (!currentPlanet) {
      console.error("[SpaceFlightSceneR3F] Current planet not found!");
      return;
    }

    velocity.current.set(0, 0, 0);
    rollRate.current = 0;
    pitchRate.current = 0;
    const pos = currentPlanet.playerSpawnPosition;
    const startPos = new THREE.Vector3(pos.x, pos.y, pos.z);
    initialPlayerPositionRef.current.copy(startPos);
    camera.position.copy(startPos);
    camera.rotation.set(0, 0, 0);
    camera.quaternion.identity();

    currentLaserHeat.current = 0;
    laserCooldownTimer.current = 0;
    wantsToFire.current = shipControls.fire;
    laserBeamHideTimer.current = 0;

    setCoordinates([camera.position.x, camera.position.y, camera.position.z]);
    setSpeed(0);
    setRoll(0);
    setPitch(0);
    setLaserHeat(0);
    setStationDirection(null);
    setRadarPositions([]);
    setPirateRadarPositions([]);

    if (laserGeometryRef.current) {
      laserGeometryRef.current.setFromPoints(laserBeamPoints);
    }
  }, [assets, currentPlanet, setGameState]);

  const handlePirateRadarUpdate = useCallback(
    (positions: RadarPosition[]) => {
      if (JSON.stringify(positions) !== JSON.stringify(pirateRadarPositions)) {
        setPirateRadarPositions(positions);
      }
    },
    [pirateRadarPositions]
  );

  useFrame((state, delta) => {
    if (!assets || !currentPlanet) return;

    const { camera: currentCamera } = state;
    const dt = Math.min(delta, 0.05);

    wantsToFire.current = shipControls.fire;

    let targetRollRate = 0;
    let targetPitchRate = 0;
    let accelerationInput = 0;
    let decelerationInput = 0;

    if (shipControls.rollLeft) targetRollRate = Constants.ROLL_ACCELERATION;
    if (shipControls.rollRight) targetRollRate = -Constants.ROLL_ACCELERATION;
    if (shipControls.pitchUp) targetPitchRate = Constants.PITCH_ACCELERATION;
    if (shipControls.pitchDown) targetPitchRate = -Constants.PITCH_ACCELERATION;
    if (shipControls.accelerate) accelerationInput = Constants.ACCELERATION;
    if (shipControls.brake) decelerationInput = Constants.DECELERATION;

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

    const rollAmount = rollRate.current * dt;
    const pitchAmount = pitchRate.current * dt;

    const localRight = tempVector
      .set(1, 0, 0)
      .applyQuaternion(currentCamera.quaternion);
    const localForward = tempVector2
      .set(0, 0, -1)
      .applyQuaternion(currentCamera.quaternion);

    const rollQuaternion = tempQuaternion.setFromAxisAngle(
      localForward,
      rollAmount
    );
    const pitchQuaternion = tempQuaternion.setFromAxisAngle(
      localRight,
      pitchAmount
    );

    currentCamera.quaternion.multiply(pitchQuaternion);
    currentCamera.quaternion.multiply(rollQuaternion);

    currentCamera.quaternion.normalize();

    const worldForward = tempVector
      .set(0, 0, -1)
      .applyQuaternion(currentCamera.quaternion);
    velocity.current.addScaledVector(worldForward, accelerationInput * dt);

    if (decelerationInput > 0) {
      const brakeForceMagnitude = decelerationInput * dt;
      if (
        velocity.current.lengthSq() >
        brakeForceMagnitude * brakeForceMagnitude
      ) {
        tempVector2
          .copy(velocity.current)
          .normalize()
          .multiplyScalar(-brakeForceMagnitude);
        velocity.current.add(tempVector2);
      } else {
        velocity.current.set(0, 0, 0);
      }
    }

    velocity.current.multiplyScalar(Math.pow(1 - Constants.LINEAR_DAMPING, dt));

    const currentSpeed = velocity.current.length();
    if (currentSpeed > Constants.MAX_SPEED) {
      velocity.current.normalize().multiplyScalar(Constants.MAX_SPEED);
    } else if (currentSpeed < Constants.MIN_SPEED && currentSpeed > 1e-4) {
      velocity.current.set(0, 0, 0);
    } else if (currentSpeed <= 1e-4 && accelerationInput <= 0) {
      velocity.current.set(0, 0, 0);
    }

    currentCamera.position.addScaledVector(velocity.current, dt);

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
    } else {
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - Constants.LASER_HEAT_DECREASE_RATE * dt
      );
    }

    if (laserBeamRef.current) {
      const isLaserVisible = laserBeamHideTimer.current > 0;
      laserBeamRef.current.visible = isLaserVisible;
      if (isLaserVisible) {
        laserBeamRef.current.position.copy(currentCamera.position);
        laserBeamRef.current.quaternion.copy(currentCamera.quaternion);
      }
    }

    if (stationRef.current) {
      const distanceToStationSq = currentCamera.position.distanceToSquared(
        stationRef.current.position
      );
      const dockingRadiusSq =
        Constants.STATION_DOCKING_RADIUS * Constants.STATION_DOCKING_RADIUS;
      if (distanceToStationSq < dockingRadiusSq) {
        setGameState("title");
        velocity.current.set(0, 0, 0);
      }
    }

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

    const combinedRadarPositions: RadarPosition[] = [];
    const cameraMatrix = currentCamera.matrixWorldInverse;

    let stationDirData = null;
    if (stationRef.current) {
      tempVector.copy(stationRef.current.position).applyMatrix4(cameraMatrix);
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
  });

  if (!assets || !currentPlanet) return null;

  return (
    <>
      {assets.planet && (
        <PlanetComponent
          radius={assets.planet.radius}
          color={assets.planet.color}
          position={[0, -assets.planet.radius - 15000, -30000]}
          visible={true}
        />
      )}

      {assets.spaceStation && (
        <group ref={stationRef} position={[0, 0, 0]} name="SpaceStationGroup">
          <SpaceStationComponent
            modelPath={assets.spaceStation.modelPath}
            initialScale={Constants.SHIP_SCALE * 2}
            wireframeColor={0xffff00}
            rotationSpeed={0.01}
            visible={true}
          />
        </group>
      )}

      {assets.pirateShips && assets.pirateShips.length > 0 && (
        <PiratesComponent
          playerCamera={camera}
          pirateConfigs={assets.pirateShips}
          initialPlayerPosition={initialPlayerPositionRef.current}
          onPirateRadarUpdate={handlePirateRadarUpdate}
        />
      )}

      <lineSegments ref={laserBeamRef} visible={false} frustumCulled={false}>
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
        <lineBasicMaterial
          attach="material"
          color={Constants.LASER_COLOR}
          linewidth={Constants.LASER_LINE_WIDTH}
          transparent
          opacity={0.8}
        />
      </lineSegments>
    </>
  );
};

export default SpaceFlightSceneR3F;
