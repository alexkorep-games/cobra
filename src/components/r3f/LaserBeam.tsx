// src/components/r3f/LaserBeam.tsx
import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useInput } from "@/hooks/useInput";

// Laser Constants
const LASER_RANGE = 2000; // Max distance the laser travels
const LASER_COOLDOWN = 0.15; // Seconds between shots
const LASER_HEAT_INCREASE = 10; // Heat added per shot
const LASER_HEAT_DECREASE_RATE = 20; // Heat lost per second when not firing
const LASER_MAX_HEAT = 100; // Max heat before overheating
const LASER_COLOR = 0xff0000; // Red laser
const LASER_DURATION = 0.1; // How long the beam is visible per shot
const LASER_LENGTH = 40; // Visual length of the beam
const LASER_LINE_WIDTH = 1; // Width of the laser beam
const LASER_SIDE_OFFSET = 0.4; // Horizontal distance from center for laser origin

interface LaserBeamProps {
  camera: THREE.Camera; // Pass the main camera
  onHeatUpdate: (heatPercentage: number) => void; // Callback to update HUD
}

const LaserBeam: React.FC<LaserBeamProps> = ({ camera, onHeatUpdate }) => {
  const leftLaserRef = useRef<THREE.LineSegments>(null);
  const rightLaserRef = useRef<THREE.LineSegments>(null);
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null); // Share geometry
  const laserMaterialRef = useRef<THREE.LineBasicMaterial>(null); // Share material

  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  const leftLaserHideTimer = useRef(0);
  const rightLaserHideTimer = useRef(0);
  const nextLaserSide = useRef<"left" | "right">("left"); // Track which side fires next
  const { shipControls } = useInput();
  const fireInput = shipControls.fire;

  // Define laser beam points using useMemo to avoid recreation on every render
  const laserBeamPoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0), // Start at the object's origin
      new THREE.Vector3(0, 0, -LASER_LENGTH), // Extend along local -Z
    ],
    []
  );

  // Convert points to a flat Float32Array, also memoized
  const laserPositionsArray = useMemo(
    () => new Float32Array(laserBeamPoints.flatMap((p) => p.toArray())),
    [laserBeamPoints]
  );

  // Define the offset positions for the laser origins relative to the camera center
  // X is horizontal, Y is vertical, Z is depth (negative is forward)
  // Adjust Y offset slightly if needed, e.g., -0.1 to be slightly below center.
  const leftOffset = useMemo(
    () => new THREE.Vector3(-LASER_SIDE_OFFSET, -0.1, -1),
    []
  );
  const rightOffset = useMemo(
    () => new THREE.Vector3(LASER_SIDE_OFFSET, -0.1, -1),
    []
  );

  // Temp vectors for calculations
  const tempWorldPos = useMemo(() => new THREE.Vector3(), []);
  const tempWorldOffset = useMemo(() => new THREE.Vector3(), []);

  // Initialize geometry only once
  useEffect(() => {
    if (laserGeometryRef.current) {
      laserGeometryRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(laserPositionsArray, 3)
      );
    }
    // Set initial heat
    onHeatUpdate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laserPositionsArray]); // Rerun if positions array changes

  useFrame((_state, delta) => {
    // Clamp delta time
    const dt = Math.min(delta, 0.05);

    // --- Laser Logic ---
    laserCooldownTimer.current = Math.max(0, laserCooldownTimer.current - dt);
    leftLaserHideTimer.current = Math.max(0, leftLaserHideTimer.current - dt);
    rightLaserHideTimer.current = Math.max(0, rightLaserHideTimer.current - dt);

    let heatChanged = false;

    if (
      fireInput && // Use prop for fire input
      currentLaserHeat.current < LASER_MAX_HEAT &&
      laserCooldownTimer.current <= 0
    ) {
      // Fire laser
      const prevHeat = currentLaserHeat.current;
      currentLaserHeat.current = Math.min(
        LASER_MAX_HEAT,
        currentLaserHeat.current + LASER_HEAT_INCREASE
      );
      if (nextLaserSide.current === "left") {
        leftLaserHideTimer.current = LASER_DURATION; // Make left beam visible
        nextLaserSide.current = "right"; // Alternate
      } else {
        rightLaserHideTimer.current = LASER_DURATION; // Make right beam visible
        nextLaserSide.current = "left"; // Alternate
      }
      laserCooldownTimer.current = LASER_COOLDOWN;
      if (currentLaserHeat.current !== prevHeat) heatChanged = true;

      // TODO: Add actual laser collision detection/effects here (could involve emitting an event)
    } else {
      // Cool down laser
      const prevHeat = currentLaserHeat.current;
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - LASER_HEAT_DECREASE_RATE * dt
      );
      if (currentLaserHeat.current !== prevHeat) heatChanged = true;
    }

    // Update laser beam visibility and position/orientation
    // Left Laser
    if (leftLaserRef.current) {
      const isVisible = leftLaserHideTimer.current > 0;
      leftLaserRef.current.visible = isVisible;
      if (isVisible) {
        // Calculate world position and orientation
        tempWorldOffset.copy(leftOffset).applyQuaternion(camera.quaternion);
        tempWorldPos.copy(camera.position).add(tempWorldOffset);

        leftLaserRef.current.position.copy(tempWorldPos);
        leftLaserRef.current.quaternion.copy(camera.quaternion);
      }
    }

    // Right Laser
    if (rightLaserRef.current) {
      const isVisible = rightLaserHideTimer.current > 0;
      rightLaserRef.current.visible = isVisible;
      if (isVisible) {
        // Calculate world position and orientation
        tempWorldOffset.copy(rightOffset).applyQuaternion(camera.quaternion);
        tempWorldPos.copy(camera.position).add(tempWorldOffset);

        rightLaserRef.current.position.copy(tempWorldPos);
        rightLaserRef.current.quaternion.copy(camera.quaternion);
      }
    }

    // Report heat update if it changed
    if (heatChanged) {
      const heatPercentage =
        (currentLaserHeat.current / LASER_MAX_HEAT) * 100;
      onHeatUpdate(heatPercentage);
    }
  }); // End useFrame

  return (
    <>
      {/* Shared Geometry */}
      <bufferGeometry ref={laserGeometryRef} attach="geometry" />
      {/* Shared Material */}
      <lineBasicMaterial
        ref={laserMaterialRef}
        attach="material"
        color={LASER_COLOR}
        linewidth={LASER_LINE_WIDTH}
        transparent
        opacity={0.9} // Slightly less transparent
      />
      {/* Left Laser Beam */}
      <lineSegments
        ref={leftLaserRef}
        visible={false}
        frustumCulled={false} // Ensures laser isn't culled when originating near camera
        geometry={laserGeometryRef.current!} // Use shared geometry
        material={laserMaterialRef.current!} // Use shared material
      />
      {/* Right Laser Beam */}
      <lineSegments
        ref={rightLaserRef}
        visible={false}
        frustumCulled={false} // Ensures laser isn't culled
        geometry={laserGeometryRef.current!} // Use shared geometry
        material={laserMaterialRef.current!} // Use shared material
      />
    </>
  );
};

export default LaserBeam;
