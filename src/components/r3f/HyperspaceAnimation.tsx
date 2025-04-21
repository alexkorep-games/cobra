// src/components/r3f/HyperspaceAnimation.tsx
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface HyperspaceAnimationProps {
  count?: number;
  color?: THREE.ColorRepresentation;
  initialRadius?: number;
  radiusGrowth?: number;
  zSpacing?: number;
  animationSpeed?: number;
  visible?: boolean;
}

// Simple animation: Expanding and receding circles
const HyperspaceAnimation: React.FC<HyperspaceAnimationProps> = ({
  count = 30,
  color = 0xff00ff, // Magenta
  initialRadius = 0.5,
  radiusGrowth = 1.5,
  zSpacing = 8,
  animationSpeed = 80, // How fast circles move towards camera
  visible = false,
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Define circle geometry vertices (e.g., 32 segments)
  const circleSegments = 32;
  const circleVertices = useMemo(() => {
    const vertices = [];
    for (let i = 0; i <= circleSegments; i++) {
      const theta = (i / circleSegments) * Math.PI * 2;
      vertices.push(Math.cos(theta), Math.sin(theta), 0);
    }
    return new Float32Array(vertices);
  }, []);

  // Create the circles
  const circles = useMemo(() => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      const radius = initialRadius + i * radiusGrowth;
      const positionZ = -i * zSpacing; // Start further away
      lines.push(
        <lineLoop key={i} position-z={positionZ} scale={radius}>
          {" "}
          {/* Use lineLoop for circles */}
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={circleVertices.length / 3}
              array={circleVertices}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={color} linewidth={2} />
        </lineLoop>
      );
    }
    return lines;
  }, [count, color, initialRadius, radiusGrowth, zSpacing, circleVertices]);

  // Animation using useFrame
  useFrame((_, delta) => {
    if (groupRef.current && visible) {
      // Move the entire group towards the camera
      groupRef.current.position.z += animationSpeed * delta;

      // Optionally add rotation or pulsing effects to the circles
      groupRef.current.rotation.z += delta * 0.1;

      // The controlling hook (useHyperspaceLogic) will handle hiding/resetting
    }
  });

  // Control group visibility and reset position based on the prop
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.visible = visible;
      if (visible) {
        // Reset position when becoming visible
        groupRef.current.position.z = -50; // Start further back
        groupRef.current.rotation.z = 0;
      }
    }
  }, [visible]);

  return (
    <group ref={groupRef} visible={visible}>
      {circles}
    </group>
  );
};

export default HyperspaceAnimation;