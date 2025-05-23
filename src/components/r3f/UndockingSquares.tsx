import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface UndockingSquaresProps {
  count?: number;
  color?: THREE.ColorRepresentation;
  initialScale?: number;
  scaleFactor?: number;
  zSpacing?: number;
  animationSpeed?: number;
  // Added visibility control via prop, managed by the hook
  visible?: boolean;
}

const UndockingSquares: React.FC<UndockingSquaresProps> = ({
  count = 20,
  color = 0x00ff00, // Green
  initialScale = 2,
  scaleFactor = 2,
  zSpacing = 5,
  animationSpeed = 50, // Controls how fast squares move towards camera
  visible = false, // Default to hidden, hook will control this
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree(); // Get camera object

  // Define the square geometry vertices once
  const squareVertices = useMemo(() => {
    return new Float32Array([
      -0.5,
      -0.5,
      0,
      0.5,
      -0.5,
      0,
      0.5,
      0.5,
      0,
      -0.5,
      0.5,
      0,
      -0.5,
      -0.5,
      0, // Close the loop
    ]);
  }, []);

  // Create the squares - useMemo should update if visibility changes, but we control via group
  const squares = useMemo(() => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const scale = initialScale + i * scaleFactor;
      // Initial position Z doesn't need to be stateful, hook resets it
      const positionZ = -i * zSpacing;
      lines.push(
        <line key={i} position-z={positionZ} scale={scale}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={squareVertices.length / 3}
              array={squareVertices}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={color} />
        </line>
      );
    }
    return lines;
  }, [count, color, initialScale, scaleFactor, zSpacing, squareVertices]);

  // Animation using useFrame - only runs if visible
  useFrame((_, delta) => {
    if (groupRef.current && visible) {
      // Only animate if visible
      // Move the entire group towards the camera
      groupRef.current.position.z += animationSpeed * delta;

      // The hook/UndockingScreen component will handle hiding/resetting
      // when the state changes. We don't need complex reset logic here.
    }
  });

  // Control group visibility, reset its position, AND RESET CAMERA ORIENTATION
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.visible = visible;
      if (visible) {
        // Reset squares group position relative to camera's new forward
        groupRef.current.position.set(0, 0, 0); // Squares start relative to camera origin

        // *** Reset Camera Position & Orientation ***
        console.log(
          "UndockingSquares visible: Resetting camera position and orientation."
        );
        // Position camera slightly behind origin, looking forward
        camera.position.set(0, 0, 5); // Start slightly back
        // Reset rotation/look direction (identity quaternion looks down -Z)
        camera.quaternion.set(0, 0, 0, 1);
        // Also reset Euler rotation just in case it was used elsewhere
        camera.rotation.set(0, 0, 0);
        // Ensure the camera's matrix is updated if other components rely on it immediately
        camera.updateMatrixWorld(true);
      }
    }
  }, [visible, camera]);

  return (
    <group ref={groupRef} visible={visible}>
      {squares}
    </group>
  );
};

export default UndockingSquares;
