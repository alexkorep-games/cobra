import React from 'react';
import { useHudState } from '@/hooks/useHudState'; // Import the hook

const CoordinatesDisplay: React.FC = () => {
  // Get coordinates from the hook
  const { coordinates } = useHudState();
  const [x, y, z] = coordinates;

  return (
    <div className="top-left-coords">
      <span>X: {x.toFixed(1)}</span><br/> {/* Increased precision slightly */}
      <span>Y: {y.toFixed(1)}</span><br/>
      <span>Z: {z.toFixed(1)}</span>
    </div>
  );
};

export default CoordinatesDisplay;