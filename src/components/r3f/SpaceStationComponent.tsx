import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'; // Import useGLTF
// Remove import of the old entity class
// import { SpaceStation } from '../../game/entities/SpaceStation';

interface SpaceStationComponentProps {
  // Replace entity instance with necessary props
  modelPath: string;
  initialScale?: number;
  wireframeColor?: THREE.ColorRepresentation;
  rotationSpeed?: number;
  position?: [number, number, number];
  rotation?: [number, number, number]; // Use Euler array [x, y, z]
  visible?: boolean;
}

const SpaceStationComponent: React.FC<SpaceStationComponentProps> = ({
  modelPath,
  initialScale = 1,
  wireframeColor = 0xffff00, // Default yellow
  rotationSpeed = 0.02, // Default rotation speed
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  visible = true,
}) => {
  // Load the GLTF model
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null!); // Ref for the group

  // Memoize the wireframe material
  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: wireframeColor,
    wireframe: true,
  }), [wireframeColor]);

  // Apply scale and wireframe material once the scene is loaded/changed
  useEffect(() => {
    if (scene) {
      scene.scale.set(initialScale, initialScale, initialScale);
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          // Dispose original materials
          if (mesh.material) {
             if (Array.isArray(mesh.material)) {
                 mesh.material.forEach(m => m.dispose());
             } else {
                 mesh.material.dispose();
             }
          }
          // Apply the memoized wireframe material
          mesh.material = wireframeMaterial;
          mesh.material.needsUpdate = true;
        }
      });
    }
    // Cleanup material
    return () => {
        wireframeMaterial.dispose();
    };
  }, [scene, initialScale, wireframeMaterial]);

  // Use useFrame for rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * delta;
    }
  });

  // Render the loaded scene using primitive
  return (
    <primitive
      ref={groupRef}
      object={scene}
      position={position}
      rotation={rotation} // R3F handles Euler array conversion
      visible={visible}
      name="SpaceStation" // Set name directly
    />
  );
};

export default SpaceStationComponent;
