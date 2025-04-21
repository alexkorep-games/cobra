// src/components/r3f/StarsSphere.tsx
// (Keep this component largely the same, maybe revert position generation
// to be on the surface if you prefer, or keep volume - visually similar effect now)

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import * as Constants from "@/constants";

interface StarsSphereProps {
  radius?: number;
  count?: number;
  size?: number;
  color?: THREE.ColorRepresentation;
}

export const StarsSphere: React.FC<StarsSphereProps> = ({
  radius = Constants.STARS_RADIUS, // Or camera.far / 2, doesn't matter hugely
  count = 1000,
  size = 1,
  color = 0xffffff,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const { camera } = useThree(); // Get the default camera

  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const vec = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
        // Get a random point on the surface
        vec.set(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
        );
        vec.normalize().multiplyScalar(radius); // Normalize to get direction, scale by radius

        posArray[i * 3] = vec.x;
        posArray[i * 3 + 1] = vec.y;
        posArray[i * 3 + 2] = vec.z;
    }

    return posArray;
  }, [count, radius]);

  // --- Geometry ---
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: color,
      size: size,
      sizeAttenuation: false, // Important: Keep size constant
      depthWrite: false,     // Important: Don't block objects behind
      depthTest: false,      // Important: Render regardless of depth buffer
      blending: THREE.AdditiveBlending,
    });
  }, [color, size]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.position.copy(camera.position);
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      renderOrder={-1} // Render early, but depthTest=false ensures it's behind
      frustumCulled={false} // Still useful
    />
  );
};
