import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei'; // Import useGLTF

interface ShipComponentProps {
  modelPath: string;
  initialScale?: number;
  wireframeColor?: THREE.ColorRepresentation;
  position?: [number, number, number];
  rotation?: [number, number, number]; // Use Euler array [x, y, z]
  visible?: boolean;
  // Add any other props needed for ship behavior, e.g., animation state
}

const ShipComponent: React.FC<ShipComponentProps> = ({
  modelPath,
  initialScale = 1,
  wireframeColor = 0xffff00,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  visible = true,
}) => {
  // Load the GLTF model
  // useGLTF.preload(modelPath); // Optional: Preload if needed elsewhere
  const { scene } = useGLTF(modelPath); // scene is the THREE.Group containing the model

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
          // Dispose of original materials if necessary (useGLTF might handle some cases)
          if (mesh.material) {
             if (Array.isArray(mesh.material)) {
                 mesh.material.forEach(m => m.dispose());
             } else {
                 mesh.material.dispose();
             }
          }
          // Apply the memoized wireframe material
          mesh.material = wireframeMaterial;
          mesh.material.needsUpdate = true; // Ensure material update
        }
      });
    }
    // Cleanup function for the material when component unmounts or deps change
    return () => {
        wireframeMaterial.dispose();
    };
  }, [scene, initialScale, wireframeMaterial]); // Re-run if scene, scale, or material changes

  // Optional: useFrame for custom animations or logic specific to this component instance
  // useFrame((state, delta) => {
  //   // Example: Rotate the ship
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.5 * delta;
  //   }
  // });

  // Use a ref for the group if direct manipulation is needed (e.g., in useFrame)
  const groupRef = useRef<THREE.Group>(null!); // Ref is now typed as THREE.Group

  // Render the loaded scene using primitive
  // Pass position, rotation, visible props directly
  return (
    <primitive
      ref={groupRef} // Assign ref if needed
      object={scene} // Use the loaded scene directly
      position={position}
      rotation={rotation} // R3F handles Euler array conversion
      visible={visible}
      // name can be set here if needed, e.g., name={modelPath.split('/').pop()?.split('.')[0]}
    />
  );
};

// Optional: Export useGLTF.preload if you want to preload assets globally
// export { useGLTF };

export default ShipComponent;
