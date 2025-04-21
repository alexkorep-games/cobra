import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile"; // Import the mobile detection hook
import "./TouchControlsOverlay.css"; // Import the CSS

const TouchControlsOverlay: React.FC = () => {
  const isMobile = useIsMobile();

  // Use CSS class to control visibility based on mobile detection
  const containerClass = `touch-overlay-container ${isMobile ? "visible" : ""}`;

  if (!isMobile) {
    return null;
  }

  return (
    <div className={containerClass}>
      {/* Steering Zone (Left) */}
      <div className="touch-zone steering-zone"></div>

      {/* Action Zones (Right) */}
      <div className="touch-zone action-zone accel-zone"></div>
      <div className="touch-zone action-zone fire-zone"></div>
      <div className="touch-zone action-zone brake-zone"></div>
    </div>
  );
};

export default TouchControlsOverlay;
