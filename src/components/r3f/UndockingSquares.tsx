import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface UndockingSquaresProps {
  count?: number;
  color?: THREE.ColorRepresentation;
  initialScale?: number;
  scaleFactor?: number;
  zSpacing?: number;
  animationSpeed?: number;
}

const UndockingSquares: React.FC<UndockingSquaresProps> = ({
  count = 20,
  color = 0x00ff00, // Green
  initialScale = 2,
  scaleFactor = 2,
  zSpacing = 5,
  animationSpeed = 50, // Controls how fast squares move towards camera
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Define the square geometry vertices once
  const squareVertices = useMemo(() => {
    return new Float32Array([
      -0.5, -0.5, 0,
       0.5, -0.5, 0,
       0.5,  0.5, 0,
      -0.5,  0.5, 0,
      -0.5, -0.5, 0, // Close the loop
    ]);
  }, []);

  // Create the squares
  const squares = useMemo(() => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const scale = initialScale + i * scaleFactor;
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

  // Animation using useFrame
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Move the entire group towards the camera
      groupRef.current.position.z += animationSpeed * delta;

      // Optional: Reset position if squares go too far past the camera
      // This depends on the desired effect (continuous stream vs. one-shot)
      // Example reset condition:
      // if (groupRef.current.position.z > someThreshold) {
      //   groupRef.current.position.z = initialZPosition; // Reset to starting Z
      // }
    }
  });

  return <group ref={groupRef}>{squares}</group>;
};

export default UndockingSquares;
