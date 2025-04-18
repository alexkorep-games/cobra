import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PlanetComponentProps {
  radius: number;
  color?: THREE.ColorRepresentation;
  rotationSpeed?: number;
  position?: [number, number, number]; // Use tuple for position
  visible?: boolean;
}

const PlanetComponent: React.FC<PlanetComponentProps> = ({
  radius,
  color = 0xff0000, // Default color
  rotationSpeed = 0.005, // Default rotation speed
  position = [0, 0, 0], // Default position
  visible = true,
}) => {
  const meshRef = useRef<THREE.Mesh>(null!); // Ref to access the mesh

  // Memoize geometry and material to prevent recreation on re-renders
  const geometry = useMemo(() => new THREE.SphereGeometry(radius, 128, 64), [radius]);
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0.1,
  }), [color]);

  // Use useFrame for updates (like rotation)
  useFrame((_, delta) => {
    if (meshRef.current) {
      // Apply rotation based on delta time
      meshRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      material={material}
      visible={visible}
      name="Planet" // Optional: Set name directly
    />
  );
};

export default PlanetComponent;
