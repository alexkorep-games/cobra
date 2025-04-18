import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Planet } from '../../game/entities/Planet'; // Adjust path as needed

interface PlanetComponentProps {
  planet: Planet; // Pass the loaded Planet entity instance
  visible?: boolean; // Control visibility via props
}

const PlanetComponent: React.FC<PlanetComponentProps> = ({ planet, visible = true }) => {
  const meshRef = React.useRef<THREE.Mesh>(null!); // Ref to access the primitive's object

  // Use useFrame for updates (like rotation)
  useFrame((_, delta) => { // Changed state to _
    if (planet && planet.mesh && meshRef.current) {
      // Call the entity's update method
      planet.update(delta);

      // Sync R3F object properties with the entity's mesh properties
      meshRef.current.position.copy(planet.mesh.position);
      meshRef.current.rotation.copy(planet.mesh.rotation);
      meshRef.current.scale.copy(planet.mesh.scale);
      meshRef.current.visible = planet.visible;
    }
  });

  // Only render if the planet and its mesh exist
  if (!planet || !planet.mesh) {
    return null;
  }

  // Set initial visibility based on prop
  planet.setVisible(visible);

  return <primitive object={planet.mesh} ref={meshRef} visible={visible} />;
};

export default PlanetComponent;
