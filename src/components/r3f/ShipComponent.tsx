import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Ship } from '../../game/entities/Ship'; // Adjust path as needed

interface ShipComponentProps {
  ship: Ship; // Pass the loaded Ship entity instance
  visible?: boolean; // Control visibility via props
}

const ShipComponent: React.FC<ShipComponentProps> = ({ ship, visible = true }) => {
  const meshRef = React.useRef<THREE.Group>(null!); // Ref to access the primitive's object

  // Use useFrame for updates
  useFrame((_, delta) => { // Changed state to _
    if (ship && ship.mesh && meshRef.current) {
      // Call the entity's update method (if it has any logic)
      ship.update(delta);

      // Sync R3F object properties with the entity's mesh properties
      meshRef.current.position.copy(ship.mesh.position);
      meshRef.current.rotation.copy(ship.mesh.rotation);
      meshRef.current.scale.copy(ship.mesh.scale);
      meshRef.current.visible = ship.visible;
    }
  });

  // Only render if the ship and its mesh exist
  if (!ship || !ship.mesh) {
    return null;
  }

  // Set initial visibility based on prop
  ship.setVisible(visible);

  return <primitive object={ship.mesh} ref={meshRef} visible={visible} />;
};

export default ShipComponent;
