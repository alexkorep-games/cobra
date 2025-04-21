// src/components/r3f/ParticleCloudSimple.tsx
import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface ParticleCloudProps {
  /** How many particles to render */
  count?: number;
  /** Closest / farthest spawn distance (units in front of the camera) */
  minDistance?: number;
  maxDistance?: number;
  /** Sideways & vertical scatter radius */
  spread?: number;
}

const up = new THREE.Vector3(0, 1, 0);
const fwd = new THREE.Vector3();
const right = new THREE.Vector3();
const tmp = new THREE.Vector3(); // scratch

const ParticleCloud: React.FC<ParticleCloudProps> = ({
  count = 500,
  minDistance = 10,
  maxDistance = 40,
  spread = 15,
}) => {
  const { camera } = useThree();
  const geometry = useRef<THREE.BufferGeometry>(null!);

  /* 1️⃣  allocate a single Float32Array once */
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  /* 2️⃣  helper to (re)position one particle somewhere in front */
  const respawn = (i: number) => {
    camera.getWorldDirection(fwd).normalize(); // camera forward
    right.copy(fwd).cross(up).normalize(); // sideways
    const upLocal = tmp.copy(right).cross(fwd).normalize();

    const d = THREE.MathUtils.randFloat(minDistance, maxDistance);
    const ofs = new THREE.Vector3()
      .addScaledVector(right, THREE.MathUtils.randFloatSpread(spread))
      .addScaledVector(upLocal, THREE.MathUtils.randFloatSpread(spread));

    const p = camera.position.clone().addScaledVector(fwd, d).add(ofs);

    const i3 = i * 3;
    positions[i3] = p.x;
    positions[i3 + 1] = p.y;
    positions[i3 + 2] = p.z;
  };

  /* 3️⃣  fill the buffer on mount */
  useEffect(() => {
    for (let i = 0; i < count; i++) respawn(i);
    geometry.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps

  /* 4️⃣  recycle anything that drifts behind the camera */
  useFrame(() => {
    camera.getWorldDirection(fwd).normalize();
    const camPos = camera.position;
    let dirty = false;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      tmp.set(positions[i3], positions[i3 + 1], positions[i3 + 2]).sub(camPos);

      if (fwd.dot(tmp) < 0) {
        // particle is behind us
        respawn(i);
        dirty = true;
      }
    }
    if (dirty) geometry.current.attributes.position.needsUpdate = true;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geometry} attach="geometry" />
      <pointsMaterial
        attach="material"
        color={0xffffff}
        size={0.15}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleCloud;
