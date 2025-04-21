// src/components/r3f/StarsSphere.tsx
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import * as Constants from "@/constants"; // Import constants

interface StarsSphereProps {
  radius?: number;
  count?: number;
  size?: number;
  color?: THREE.ColorRepresentation;
}

export const StarsSphere: React.FC<StarsSphereProps> = ({
  radius = Constants.STARS_RADIUS, // Use constant for radius
  count = 5000, // Number of stars
  size = 0.5, // Size of each star point
  color = 0xffffff, // White stars
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Memoize the positions array generation
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Generate points on the surface of a sphere
      const phi = Math.acos(-1 + (2 * i) / count); // Distribute points more evenly
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;
    }
    return posArray;
  }, [count, radius]);

  // Memoize geometry and material
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: color,
      size: size,
      sizeAttenuation: false, // Stars should have a constant size regardless of distance
      depthWrite: false, // Render behind opaque objects
      blending: THREE.AdditiveBlending, // Make stars brighter when overlapping
      transparent: true, // Needed for additive blending usually
      opacity: 0.8, // Slight transparency
    });
  }, [color, size]);

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      renderOrder={-1} // Hint to render early (behind other things)
      frustumCulled={false} // Ensure stars are always rendered, even if camera is inside the sphere bounds slightly
    />
  );
};
