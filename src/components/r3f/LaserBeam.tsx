import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import * as Constants from "@/constants"; // Assuming constants are here
import { useInput } from "@/hooks/useInput";

interface LaserBeamProps {
  camera: THREE.Camera; // Pass the main camera
  onHeatUpdate: (heatPercentage: number) => void; // Callback to update HUD
}

const LaserBeam: React.FC<LaserBeamProps> = ({ camera, onHeatUpdate }) => {
  const laserBeamRef = useRef<THREE.LineSegments>(null);
  const currentLaserHeat = useRef(0);
  const laserCooldownTimer = useRef(0);
  const laserBeamHideTimer = useRef(0);
  const laserGeometryRef = useRef<THREE.BufferGeometry>(null);
  const { shipControls } = useInput();
  const fireInput = shipControls.fire;

  // Define laser beam points using useMemo to avoid recreation on every render
  const laserBeamPoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, -1), // Start slightly in front of camera origin
      new THREE.Vector3(0, 0, -1 - Constants.LASER_LENGTH), // Extend forward
    ],
    []
  );

  // Convert points to a flat Float32Array, also memoized
  const laserPositionsArray = useMemo(
    () => new Float32Array(laserBeamPoints.flatMap((p) => p.toArray())),
    [laserBeamPoints]
  );

  // Initialize geometry only once
  useEffect(() => {
    if (laserGeometryRef.current) {
      laserGeometryRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(laserPositionsArray, 3)
      );
      // No need to update geometry points later unless LASER_LENGTH changes dynamically
    }
  }, [laserPositionsArray]);

  useFrame((_state, delta) => {
    // Clamp delta time
    const dt = Math.min(delta, 0.05);

    // --- Laser Logic ---
    laserCooldownTimer.current = Math.max(0, laserCooldownTimer.current - dt);
    laserBeamHideTimer.current = Math.max(0, laserBeamHideTimer.current - dt);

    let heatChanged = false;

    if (
      fireInput && // Use prop for fire input
      currentLaserHeat.current < Constants.LASER_MAX_HEAT &&
      laserCooldownTimer.current <= 0
    ) {
      // Fire laser
      const prevHeat = currentLaserHeat.current;
      currentLaserHeat.current = Math.min(
        Constants.LASER_MAX_HEAT,
        currentLaserHeat.current + Constants.LASER_HEAT_INCREASE
      );
      laserCooldownTimer.current = Constants.LASER_COOLDOWN;
      laserBeamHideTimer.current = Constants.LASER_DURATION; // Make beam visible
      if (currentLaserHeat.current !== prevHeat) heatChanged = true;

      // TODO: Add actual laser collision detection/effects here (could involve emitting an event)
    } else {
      // Cool down laser
      const prevHeat = currentLaserHeat.current;
      currentLaserHeat.current = Math.max(
        0,
        currentLaserHeat.current - Constants.LASER_HEAT_DECREASE_RATE * dt
      );
      if (currentLaserHeat.current !== prevHeat) heatChanged = true;
    }

    // Update laser beam visibility and position/orientation
    if (laserBeamRef.current) {
      const isLaserVisible = laserBeamHideTimer.current > 0;
      laserBeamRef.current.visible = isLaserVisible;

      if (isLaserVisible) {
        // Position the laser slightly in front of the camera and align it
        // The laser geometry is defined relative to its origin (0,0,0)
        // So, we just need to place the LineSegments object at the camera's position
        // and match its orientation.
        laserBeamRef.current.position.copy(camera.position);
        laserBeamRef.current.quaternion.copy(camera.quaternion);
        // Note: Frustum culling is disabled below
      }
    }

    // Report heat update if it changed
    if (heatChanged) {
      const heatPercentage =
        (currentLaserHeat.current / Constants.LASER_MAX_HEAT) * 100;
      onHeatUpdate(heatPercentage);
    }
  }); // End useFrame

  // Initial heat update
  useEffect(() => {
    onHeatUpdate(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return (
    <lineSegments
      ref={laserBeamRef}
      visible={false}
      frustumCulled={false}
    >
      <bufferGeometry ref={laserGeometryRef} attach="geometry">
      </bufferGeometry>
      <lineBasicMaterial
        attach="material"
        color={Constants.LASER_COLOR}
        linewidth={Constants.LASER_LINE_WIDTH}
        transparent
        opacity={0.8}
      />
    </lineSegments>
  );
};

export default LaserBeam;
