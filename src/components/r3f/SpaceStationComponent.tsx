import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SpaceStation } from '../../game/entities/SpaceStation'; // Adjust path as needed

interface SpaceStationComponentProps {
  station: SpaceStation; // Pass the loaded SpaceStation entity instance
  visible?: boolean; // Control visibility via props
}

const SpaceStationComponent: React.FC<SpaceStationComponentProps> = ({ station, visible = true }) => {
  const meshRef = React.useRef<THREE.Group>(null!); // Ref to access the primitive's object

  // Use useFrame for updates (like rotation) previously handled in entity.update()
  useFrame((_, delta) => { // Changed state to _
    if (station && station.mesh && meshRef.current) {
      // Apply updates from the entity's logic if needed, or handle directly here
      station.update(delta); // Call the entity's update method

      // Sync R3F object properties with the entity's mesh properties
      meshRef.current.position.copy(station.mesh.position);
      meshRef.current.rotation.copy(station.mesh.rotation);
      meshRef.current.scale.copy(station.mesh.scale);
      meshRef.current.visible = station.visible;
    }
  });

  // Render the loaded mesh using <primitive>
  // Only render if the station and its mesh exist
  if (!station || !station.mesh) {
    return null;
  }

  // Set initial visibility based on prop
  station.setVisible(visible);

  return <primitive object={station.mesh} ref={meshRef} visible={visible} />;
};

export default SpaceStationComponent;
