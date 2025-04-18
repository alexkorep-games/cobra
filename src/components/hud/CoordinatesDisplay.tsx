import React from 'react';

interface CoordinatesDisplayProps {
  coordinates: [number, number, number];
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({ coordinates }) => {
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