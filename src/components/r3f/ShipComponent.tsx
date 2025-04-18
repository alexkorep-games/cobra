import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei"; // Import useGLTF

interface ShipComponentProps {
  modelPath: string;
  initialScale?: number;
  wireframeColor?: THREE.ColorRepresentation;
  position?: [number, number, number] | THREE.Vector3; // Allow Vector3
  rotation?: [number, number, number] | THREE.Euler; // Allow Euler
  quaternion?: THREE.Quaternion; // Allow Quaternion
  visible?: boolean;
  userData?: { [key: string]: any }; // Allow userData for things like IDs
  // Add any other props needed for ship behavior, e.g., animation state
}

const ShipComponent = React.forwardRef<THREE.Group, ShipComponentProps>(
  (
    {
      modelPath,
      initialScale = 1,
      wireframeColor = 0xffff00,
      position = [0, 0, 0],
      rotation, // Optional Euler array [x, y, z]
      quaternion, // Optional Quaternion
      visible = true,
      userData,
    },
    forwardedRef
  ) => {
    // Load the GLTF model
    const { scene } = useGLTF(modelPath); // scene is the THREE.Group containing the model

    // Memoize the wireframe material
    const wireframeMaterial = useMemo(
      () =>
        new THREE.MeshBasicMaterial({
          color: wireframeColor,
          wireframe: true,
        }),
      [wireframeColor]
    );

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
                mesh.material.forEach((m) => m.dispose());
              } else {
                mesh.material.dispose();
              }
            }
            // Apply the memoized wireframe material
            mesh.material = wireframeMaterial;
            mesh.material.needsUpdate = true; // Ensure material update
          }
        });
        if (userData) {
          Object.assign(scene.userData, userData);
        }
      }
      // Cleanup function for the material when component unmounts or deps change
      return () => {
        wireframeMaterial.dispose();
      };
    }, [scene, initialScale, wireframeMaterial, userData]); // Re-run if scene, scale, material, or userData changes

    // Use a default ref if none is forwarded
    const internalRef = useRef<THREE.Group>(null!);
    const groupRef = forwardedRef || internalRef;

    // Prepare props for primitive, handling different position/rotation types
    const primitiveProps: any = {
      ref: groupRef,
      object: scene,
      visible: visible,
    };

    if (position instanceof THREE.Vector3) {
      primitiveProps.position = position;
    } else {
      primitiveProps.position = position; // Assume array [x,y,z]
    }

    if (quaternion instanceof THREE.Quaternion) {
      primitiveProps.quaternion = quaternion;
    } else if (rotation instanceof THREE.Euler) {
      primitiveProps.rotation = rotation;
    } else if (Array.isArray(rotation)) {
      primitiveProps.rotation = rotation; // Assume Euler array [x,y,z]
    }

    // Render the loaded scene using primitive
    return <primitive {...primitiveProps} />;
  }
);

ShipComponent.displayName = "ShipComponent"; // Add display name for React DevTools

// Optional: Export useGLTF.preload if you want to preload assets globally
export { useGLTF };

export default ShipComponent;
