// src/components/r3f/LaserBeam.tsx
import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { Line2 } from "three/examples/jsm/lines/Line2"; // Note the import!
import { useInput } from "@/hooks/useInput";

// --- Laser Constants Adjusted ---
const LASER_COOLDOWN = 0.12;
const LASER_HEAT_INCREASE = 6;
const LASER_HEAT_DECREASE_RATE = 25;
const LASER_MAX_HEAT = 100;
const LASER_COLOR_1 = 0xff4040;
const LASER_COLOR_2 = 0xddee40;
const LASER_DURATION = 0.06;
const LASER_LENGTH = 180;
const LASER_LINE_WIDTH = 2;
const LASER_SIDE_OFFSET = 0.4;
const LASER_VERTICAL_OFFSET = -0.1;
const LASER_PAIR_OFFSET = 0.02;

interface LaserBeamProps {
  camera: THREE.Camera;
  onHeatUpdate: (heatPercentage: number) => void;
}

// Extend THREE namespace for JSX components (if using TypeScript)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      line2: React.DetailedHTMLProps<any, Line2>;
      lineGeometry: React.DetailedHTMLProps<any, LineGeometry>;
      lineMaterial: React.DetailedHTMLProps<any, LineMaterial>;
    }
  }
}

const LaserBeam: React.FC<LaserBeamProps> = ({ camera, onHeatUpdate }) => {
  // Get viewport size for LineMaterial resolution
  const { size } = useThree(); // Get width/height

  // Refs for FOUR laser beams (now Line2)
  const leftLaserRef1 = useRef<Line2>(null);
  const leftLaserRef2 = useRef<Line2>(null);
  const rightLaserRef1 = useRef<Line2>(null);
  const rightLaserRef2 = useRef<Line2>(null);

  // SHARED geometry (now LineGeometry)
  const laserGeometryRef = useRef<LineGeometry>(null);
  // TWO materials (now LineMaterial)
  const laserMaterialRef1 = useRef<LineMaterial>(null);
  const laserMaterialRef2 = useRef<LineMaterial>(null);

  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  const leftPairHideTimer = useRef(0);
  const rightPairHideTimer = useRef(0);
  const nextLaserSide = useRef<"left" | "right">("left");
  const { shipControls } = useInput();
  const fireInput = shipControls.fire;

  // --- Geometry Points (for LineGeometry) ---
  // LineGeometry expects a flat array: [x1, y1, z1, x2, y2, z2, ...]
  const laserPositionsArray = useMemo(() => [0, 0, 0, 0, 0, -LASER_LENGTH], []);

  // --- Offset Positions ---
  const leftOffsetBase = useMemo(
    () => new THREE.Vector3(-LASER_SIDE_OFFSET, LASER_VERTICAL_OFFSET, -1),
    []
  );
  const rightOffsetBase = useMemo(
    () => new THREE.Vector3(LASER_SIDE_OFFSET, LASER_VERTICAL_OFFSET, -1),
    []
  );
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

  // Initialize geometry
  useEffect(() => {
    if (laserGeometryRef.current) {
      // Set positions for LineGeometry
      laserGeometryRef.current.setPositions(laserPositionsArray);
    }
    onHeatUpdate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laserPositionsArray]);

  // Update material resolution if canvas size changes
  useEffect(() => {
    if (laserMaterialRef1.current) {
      laserMaterialRef1.current.resolution.set(size.width, size.height);
    }
    if (laserMaterialRef2.current) {
      laserMaterialRef2.current.resolution.set(size.width, size.height);
    }
  }, [size]);

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

          // Assign geometry AND material (needed for Line2)
          leftLaserRef1.current.geometry = laserGeometryRef.current!;
          leftLaserRef1.current.material = laserMaterialRef1.current; // Assign Color 1
          leftLaserRef1.current.position.copy(tempWorldPos1);
          leftLaserRef1.current.quaternion.copy(camera.quaternion);
          leftLaserRef1.current.visible = true;
          leftLaserRef1.current.computeLineDistances(); // Important for Line2

          leftLaserRef2.current.geometry = laserGeometryRef.current!;
          leftLaserRef2.current.material = laserMaterialRef1.current; // Assign Color 1
          leftLaserRef2.current.position.copy(tempWorldPos2); // Use slightly offset position
          leftLaserRef2.current.quaternion.copy(camera.quaternion);
          leftLaserRef2.current.visible = true;
          leftLaserRef2.current.computeLineDistances(); // Important for Line2
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

          rightLaserRef1.current.geometry = laserGeometryRef.current!;
          rightLaserRef1.current.material = laserMaterialRef2.current; // Assign Color 2
          rightLaserRef1.current.position.copy(tempWorldPos1);
          rightLaserRef1.current.quaternion.copy(camera.quaternion);
          rightLaserRef1.current.visible = true;
          rightLaserRef1.current.computeLineDistances(); // Important for Line2

          rightLaserRef2.current.geometry = laserGeometryRef.current!;
          rightLaserRef2.current.material = laserMaterialRef2.current; // Assign Color 2
          rightLaserRef2.current.position.copy(tempWorldPos2); // Use slightly offset position
          rightLaserRef2.current.quaternion.copy(camera.quaternion);
          rightLaserRef2.current.visible = true;
          rightLaserRef2.current.computeLineDistances(); // Important for Line2
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
      {/* SHARED Geometry (use <lineGeometry>, args for constructor if needed) */}
      <lineGeometry ref={laserGeometryRef} attach="geometry" />

      {/* TWO Materials (use <lineMaterial>) */}
      <lineMaterial
        ref={laserMaterialRef1}
        attach="material" // Attach if it's the direct child of the mesh
        color={LASER_COLOR_1}
        linewidth={LASER_LINE_WIDTH} // This will work now!
        resolution={[size.width, size.height]} // Pass resolution
        // worldUnits={false} // Default: width is in screen pixels
        // worldUnits={true} // Alternative: width is in world units
        dashed={false} // Add other LineMaterial props if needed
      />
      <lineMaterial
        ref={laserMaterialRef2}
        attach="material"
        color={LASER_COLOR_2}
        linewidth={LASER_LINE_WIDTH}
        resolution={[size.width, size.height]}
        dashed={false}
      />

      {/* FOUR Laser Beams (use <line2>) */}
      {/* We assign geometry/material dynamically, so don't attach here */}
      <line2
        ref={leftLaserRef1}
        visible={false}
        frustumCulled={false}
        // Geometry and Material assigned in useFrame
      />
      <line2
        ref={leftLaserRef2}
        visible={false}
        frustumCulled={false}
        // Geometry and Material assigned in useFrame
      />
      <line2
        ref={rightLaserRef1}
        visible={false}
        frustumCulled={false}
        // Geometry and Material assigned in useFrame
      />
      <line2
        ref={rightLaserRef2}
        visible={false}
        frustumCulled={false}
        // Geometry and Material assigned in useFrame
      />
    </>
  );
};

export default LaserBeam;
