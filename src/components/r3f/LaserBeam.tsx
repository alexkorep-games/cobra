// src/components/r3f/LaserBeam.tsx
import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInput } from "@/hooks/useInput";

// --- Laser Constants Adjusted ---
const LASER_COOLDOWN = 0.12; // Slightly faster cooldown might feel better with dual beams
const LASER_HEAT_INCREASE = 6; // Lower heat per shot since we fire pairs (adjust balance)
const LASER_HEAT_DECREASE_RATE = 25;
const LASER_MAX_HEAT = 100;
// --- Define the two alternating colors ---
const LASER_COLOR_1 = 0xff4040; // Reddish-Pink (adjust as needed)
const LASER_COLOR_2 = 0xddee40; // Yellowish-Green (adjust as needed)
const LASER_DURATION = 0.06; // Keep it very short
const LASER_LENGTH = 180;
const LASER_LINE_WIDTH = 400;
const LASER_SIDE_OFFSET = 0.4;
const LASER_VERTICAL_OFFSET = -0.1;
// Optional small offset for the second beam in each pair if desired
const LASER_PAIR_OFFSET = 0.02; // Tiny vertical separation for the pair

interface LaserBeamProps {
  camera: THREE.Camera;
  onHeatUpdate: (heatPercentage: number) => void;
}

const LaserBeam: React.FC<LaserBeamProps> = ({ camera, onHeatUpdate }) => {
  // Refs for FOUR laser beams
  const leftLaserRef1 = useRef<THREE.LineSegments>(null);
  const leftLaserRef2 = useRef<THREE.LineSegments>(null);
  const rightLaserRef1 = useRef<THREE.LineSegments>(null);
  const rightLaserRef2 = useRef<THREE.LineSegments>(null);

  // SHARED geometry
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null);
  // TWO materials for alternating colors
  const laserMaterialRef1 = useRef<THREE.LineBasicMaterial>(null);
  const laserMaterialRef2 = useRef<THREE.LineBasicMaterial>(null);

  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  // Timers now control pairs
  const leftPairHideTimer = useRef(0);
  const rightPairHideTimer = useRef(0);
  const nextLaserSide = useRef<"left" | "right">("left");
  const { shipControls } = useInput();
  const fireInput = shipControls.fire;

  // --- Geometry Points (Shared) ---
  const laserBeamPoints = useMemo(
    () => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -LASER_LENGTH)],
    []
  );
  const laserPositionsArray = useMemo(
    () => new Float32Array(laserBeamPoints.flatMap((p) => p.toArray())),
    [laserBeamPoints]
  );

  // --- Offset Positions ---
  // Base offsets
  const leftOffsetBase = useMemo(
    () => new THREE.Vector3(-LASER_SIDE_OFFSET, LASER_VERTICAL_OFFSET, -1),
    []
  );
  const rightOffsetBase = useMemo(
    () => new THREE.Vector3(LASER_SIDE_OFFSET, LASER_VERTICAL_OFFSET, -1),
    []
  );
  // Offsets for the second beam in each pair (optional slight separation)
  const leftOffsetPair = useMemo(
    () =>
      new THREE.Vector3(
        -LASER_SIDE_OFFSET,
        LASER_VERTICAL_OFFSET - LASER_PAIR_OFFSET,
        -1
      ),
    []
  );
  const rightOffsetPair = useMemo(
    () =>
      new THREE.Vector3(
        LASER_SIDE_OFFSET,
        LASER_VERTICAL_OFFSET - LASER_PAIR_OFFSET,
        -1
      ),
    []
  );

  // Temp vectors
  const tempWorldPos1 = useMemo(() => new THREE.Vector3(), []);
  const tempWorldPos2 = useMemo(() => new THREE.Vector3(), []);
  const tempWorldOffset1 = useMemo(() => new THREE.Vector3(), []);
  const tempWorldOffset2 = useMemo(() => new THREE.Vector3(), []);

  // Initialize geometry attributes
  useEffect(() => {
    if (laserGeometryRef.current) {
      laserGeometryRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(laserPositionsArray, 3)
      );
      laserGeometryRef.current.attributes.position.needsUpdate = true;
    }
    onHeatUpdate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laserPositionsArray]);

  useFrame((_state, delta) => {
    const dt = Math.min(delta, 0.05);

    // Update timers
    laserCooldownTimer.current = Math.max(0, laserCooldownTimer.current - dt);
    leftPairHideTimer.current = Math.max(0, leftPairHideTimer.current - dt);
    rightPairHideTimer.current = Math.max(0, rightPairHideTimer.current - dt);

    let heatChanged = false;

    // --- Firing ---
    if (
      fireInput &&
      currentLaserHeat.current < LASER_MAX_HEAT &&
      laserCooldownTimer.current <= 0
    ) {
      const prevHeat = currentLaserHeat.current;
      currentLaserHeat.current = Math.min(
        LASER_MAX_HEAT,
        currentLaserHeat.current + LASER_HEAT_INCREASE
      );

      if (nextLaserSide.current === "left") {
        leftPairHideTimer.current = LASER_DURATION; // Show left pair

        // Position and show left pair using Material 1
        if (
          leftLaserRef1.current &&
          leftLaserRef2.current &&
          laserMaterialRef1.current
        ) {
          tempWorldOffset1
            .copy(leftOffsetBase)
            .applyQuaternion(camera.quaternion);
          tempWorldPos1.copy(camera.position).add(tempWorldOffset1);
          tempWorldOffset2
            .copy(leftOffsetPair)
            .applyQuaternion(camera.quaternion);
          tempWorldPos2.copy(camera.position).add(tempWorldOffset2);

          leftLaserRef1.current.position.copy(tempWorldPos1);
          leftLaserRef1.current.quaternion.copy(camera.quaternion);
          leftLaserRef1.current.material = laserMaterialRef1.current; // Assign Color 1
          leftLaserRef1.current.visible = true;

          leftLaserRef2.current.position.copy(tempWorldPos2); // Use slightly offset position
          leftLaserRef2.current.quaternion.copy(camera.quaternion);
          leftLaserRef2.current.material = laserMaterialRef1.current; // Assign Color 1
          leftLaserRef2.current.visible = true;
        }
        nextLaserSide.current = "right"; // Alternate
      } else {
        // Fire right side
        rightPairHideTimer.current = LASER_DURATION; // Show right pair

        // Position and show right pair using Material 2
        if (
          rightLaserRef1.current &&
          rightLaserRef2.current &&
          laserMaterialRef2.current
        ) {
          tempWorldOffset1
            .copy(rightOffsetBase)
            .applyQuaternion(camera.quaternion);
          tempWorldPos1.copy(camera.position).add(tempWorldOffset1);
          tempWorldOffset2
            .copy(rightOffsetPair)
            .applyQuaternion(camera.quaternion);
          tempWorldPos2.copy(camera.position).add(tempWorldOffset2);

          rightLaserRef1.current.position.copy(tempWorldPos1);
          rightLaserRef1.current.quaternion.copy(camera.quaternion);
          rightLaserRef1.current.material = laserMaterialRef2.current; // Assign Color 2
          rightLaserRef1.current.visible = true;

          rightLaserRef2.current.position.copy(tempWorldPos2); // Use slightly offset position
          rightLaserRef2.current.quaternion.copy(camera.quaternion);
          rightLaserRef2.current.material = laserMaterialRef2.current; // Assign Color 2
          rightLaserRef2.current.visible = true;
        }
        nextLaserSide.current = "left"; // Alternate
      }

      laserCooldownTimer.current = LASER_COOLDOWN;
      if (currentLaserHeat.current !== prevHeat) heatChanged = true;
      // TODO: Sound effect
    }
    // --- Cooling ---
    else {
      const prevHeat = currentLaserHeat.current;
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - LASER_HEAT_DECREASE_RATE * dt
      );
      if (currentLaserHeat.current !== prevHeat) heatChanged = true;
    }

    // --- Visibility Update ---
    // Hide pairs if their timer runs out
    const leftVisible = leftPairHideTimer.current > 0;
    if (leftLaserRef1.current) leftLaserRef1.current.visible = leftVisible;
    if (leftLaserRef2.current) leftLaserRef2.current.visible = leftVisible;

    const rightVisible = rightPairHideTimer.current > 0;
    if (rightLaserRef1.current) rightLaserRef1.current.visible = rightVisible;
    if (rightLaserRef2.current) rightLaserRef2.current.visible = rightVisible;

    // Report heat update
    if (heatChanged) {
      onHeatUpdate((currentLaserHeat.current / LASER_MAX_HEAT) * 100);
    }
  }); // End useFrame

  return (
    <>
      {/* SHARED Geometry */}
      <bufferGeometry ref={laserGeometryRef} key={LASER_LENGTH}>
        {/* Attribute set in useEffect */}
      </bufferGeometry>

      {/* TWO Materials */}
      <lineBasicMaterial
        ref={laserMaterialRef1}
        color={LASER_COLOR_1}
        linewidth={LASER_LINE_WIDTH}
      />
      <lineBasicMaterial
        ref={laserMaterialRef2}
        color={LASER_COLOR_2}
        linewidth={LASER_LINE_WIDTH}
      />

      {/* FOUR Laser Beams (using shared geometry) */}
      <lineSegments
        ref={leftLaserRef1}
        visible={false}
        frustumCulled={false}
        geometry={laserGeometryRef.current!}
        // Material assigned dynamically
      />
      <lineSegments
        ref={leftLaserRef2}
        visible={false}
        frustumCulled={false}
        geometry={laserGeometryRef.current!}
        // Material assigned dynamically
      />
      <lineSegments
        ref={rightLaserRef1}
        visible={false}
        frustumCulled={false}
        geometry={laserGeometryRef.current!}
        // Material assigned dynamically
      />
      <lineSegments
        ref={rightLaserRef2}
        visible={false}
        frustumCulled={false}
        geometry={laserGeometryRef.current!}
        // Material assigned dynamically
      />
    </>
  );
};

export default LaserBeam;
