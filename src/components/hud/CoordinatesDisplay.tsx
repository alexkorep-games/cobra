import React from 'react';
import '../App.css'; // Ensure styles are imported

interface CoordinatesDisplayProps {
  coordinates: [number, number, number];
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({ coordinates }) => {
  const [x, y, z] = coordinates;

  return (
    <div className="top-left-coords">
      <span>X: {x.toFixed(0)}</span><br/>
      <span>Y: {y.toFixed(0)}</span><br/>
      <span>Z: {z.toFixed(0)}</span>
    </div>
  );
};

export default CoordinatesDisplay;